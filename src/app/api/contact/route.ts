import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { articleBySlug, articleUrl } from '@/lib/article-catalogue';
import { saveEnquiry, recordArticleEvent } from '@/lib/enquiry-storage';

import { trackEnquiry } from '@/lib/analytics-server';

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

  const { name, email, company, situation, message, article, session } = parsed.data;
  const id = crypto.randomUUID();
  const preview = process.env.CONTACT_DELIVERY === 'preview';
  if (preview && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Contact delivery is not configured' }, { status: 503 });
  }
  try { await saveEnquiry(id, parsed.data, preview ? 'preview' : 'pending'); }
  catch { await trackEnquiry('enquiry_failed', parsed.data, id, 'storage'); return NextResponse.json({ error: 'We could not save your enquiry. Please try again.' }, { status: 503 }); }
  if (preview) {
    if (article) await recordArticleEvent({ event: 'enquiry_preview_saved', article, session: session || '', enquiryId: id }).catch(() => {});
    return NextResponse.json({ ok: true, preview: true, id });
  }
  // Context the visitor chose travels inside the message: the relay's contract stays name/email/message.
  const context = [article && `Article: ${articleBySlug(article)!.title}\n${articleUrl(article)}`, situation && `Where you are: ${situation}`, company && `Company: ${company}`].filter(Boolean);
  try {
    const relay = await fetch(RELAY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message: context.length ? `${context.join('\n')}\n\n${message}` : message,
        source: 'orchestra_ai',
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!relay.ok) {
      await saveEnquiry(id, parsed.data, 'failed').catch(() => {});
      await trackEnquiry('enquiry_failed', parsed.data, id, 'relay');
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
    }
  } catch {
    await saveEnquiry(id, parsed.data, 'failed').catch(() => {});
    await trackEnquiry('enquiry_failed', parsed.data, id, 'relay');
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
  }

  // Email acceptance is the success boundary; follow-up must not cause a duplicate retry.
  await saveEnquiry(id, parsed.data, 'sent').catch(() => console.error('Could not update enquiry delivery', id));
  if (article) await recordArticleEvent({ event: 'enquiry_submitted', article, session: session || '', enquiryId: id }).catch(() => console.error('Could not record enquiry attribution', id));
  await trackEnquiry('enquiry_submitted', parsed.data, id, 'relay_accepted');
  return NextResponse.json({ ok: true, id });
}
