import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { articleBySlug, articleUrl } from '@/lib/article-catalogue';
import { saveEnquiry, recordArticleEvent } from '@/lib/enquiry-storage';
import { createRateGate, reservedEmailDomain } from '@/lib/contact-guard';

import { trackEnquiry } from '@/lib/analytics-server';

export const runtime = 'nodejs';

// Enquiries relay through the flagship's contact endpoint: one mail transport
// for the fleet, monitored by the hyperdrift deploy health check, instead of
// per-app SMTP/Resend credentials that silently rot.
const RELAY_URL = process.env.CONTACT_RELAY_URL ?? 'https://hyperdrift.io/api/contact';

// A scanner sent about 80 enquiries in five minutes on 2 Nov 2026. Every post counts against its
// connection; only enquiries that would reach the inbox count against the hourly ceiling.
const perConnection = createRateGate({ windowMs: 10 * 60_000, perClient: 5, total: Infinity });
const deliveries = createRateGate({ windowMs: 60 * 60_000, perClient: Infinity, total: 30 });
const tooMany = () => NextResponse.json({ error: 'Too many messages. Please try again in a few minutes.' }, { status: 429 });

export async function POST(req: Request) {
  if (!perConnection(req)) return tooMany();
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  // The client shows only `error`; the field list stays out of a scanner's reach.
  if (!parsed.success) return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });

  const { name, email, company, situation, message, article, session, campaign, handoff, product_url, website, traction_board } = parsed.data;
  const id = crypto.randomUUID();
  // A filled honeypot, or a real delivery from a domain no one receives mail at, gets the normal
  // answer and goes nowhere: no record, no relay, no mail.
  if (website) return NextResponse.json({ ok: true, id });
  const preview = process.env.CONTACT_DELIVERY === 'preview';
  if (preview && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Contact delivery is not configured' }, { status: 503 });
  }
  if (!preview && reservedEmailDomain(email)) return NextResponse.json({ ok: true, id });
  if (!preview && !deliveries(req)) return tooMany();
  try { await saveEnquiry(id, parsed.data, preview ? 'preview' : 'pending'); }
  catch { await trackEnquiry('enquiry_failed', parsed.data, id, 'storage'); return NextResponse.json({ error: 'We could not save your enquiry. Please try again.' }, { status: 503 }); }
  if (preview) {
    if (article) await recordArticleEvent({ event: 'enquiry_preview_saved', article, session: session || '', enquiryId: id }).catch(() => {});
    return NextResponse.json({ ok: true, preview: true, id });
  }
  // Context the visitor chose travels inside the message: the relay's contract stays name/email/message.
  const context = [
    `Enquiry ID: ${id}`,
    article && `Article: ${articleBySlug(article)!.title}\n${articleUrl(article)}`,
    situation && `Where you are: ${situation}`,
    handoff && `From Hyperdrift: https://hyperdrift.io${handoff.source_path}`,
    handoff?.source_project && `Project: ${handoff.source_project}`,
    handoff?.referring_domain && `Original referring domain: ${handoff.referring_domain}`,
    company && `Company: ${company}`,
    product_url && `Product: ${product_url}`,
    traction_board && `Traction board (visitor supplied): ${traction_board}`,
    ...(campaign ? Object.entries(campaign).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`) : []),
  ].filter(Boolean);
  try {
    const relay = await fetch(RELAY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(process.env.CONTACT_RELAY_KEY ? { 'x-contact-relay-key': process.env.CONTACT_RELAY_KEY } : {}) },
      body: JSON.stringify({
        name: name || 'Website enquiry',
        email,
        message: [context.join('\n'), message].filter(Boolean).join('\n\n'),
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
