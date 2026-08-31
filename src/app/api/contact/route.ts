import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';

export const runtime = 'nodejs';

// Enquiries relay through the flagship's contact endpoint: one mail transport
// for the fleet, monitored by the hyperdrift deploy health check, instead of
// per-app SMTP/Resend credentials that silently rot.
const RELAY_URL = process.env.CONTACT_RELAY_URL ?? 'https://hyperdrift.io/api/contact';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid submission', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, company, message } = parsed.data;
  try {
    const relay = await fetch(RELAY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message: company ? `Company: ${company}\n\n${message}` : message,
        source: 'orchestra_ai',
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!relay.ok) {
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
