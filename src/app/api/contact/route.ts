import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { getContactRoutes, getResendClient } from '@/lib/resend';

export const runtime = 'nodejs';

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
  const routes = getContactRoutes();
  const resend = getResendClient();

  const { error } = await resend.emails.send({
    to: routes.to,
    from: routes.from,
    replyTo: email,
    subject: `Orchestra AI — new enquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n'),
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
