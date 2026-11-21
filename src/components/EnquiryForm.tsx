'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { enquiryChoices } from '@/data/situations';
import { articleBySlug } from '@/lib/article-catalogue';
import { useEnquiry } from '@/lib/use-enquiry';
import { parseEnquiryHandoff } from '@/lib/enquiry-handoff';
import type { ContactPrefill } from '@/lib/contact-schema';
import { trialAppFrom } from '@/lib/campaign';

function ContextFields({ articleSlug, situation: preset }: { articleSlug?: string; situation?: string }) {
  const query = useSearchParams();
  const article = articleBySlug(articleSlug || query.get('article'))?.slug || '';
  const wanted = preset || query.get('situation') || '';
  const situation = enquiryChoices.some((choice) => choice.value === wanted) ? wanted : '';
  const handoff = parseEnquiryHandoff(new URLSearchParams(query.toString()));
  const example = query.get('example') || '';
  return <>
    {['pipeline','crm','delivery','market','learning'].includes(example) && <><input type="hidden" name="workflow_example" value={example}/><p>About the {example === 'crm' ? 'customer conversations' : example} workflow. You can add context in your message.</p></>}
    {handoff && <p>Continuing from <a href={`https://hyperdrift.io${handoff.source_path}`}>Hyperdrift</a>. The page you came from will accompany your enquiry.</p>}
    {article && <input type="hidden" name="article" value={article} />}
    {situation && <input type="hidden" name="situation" value={situation} />}
  </>;
}

function BoardContext() {
  const query = useSearchParams();
  const board = trialAppFrom(query.get('from') || undefined);
  return board ? <><input type="hidden" name="traction_board" value={board} /><p>Your message will mention the Traction board you came from. It does not grant access.</p></> : null;
}

/** Every door asks for the reason, a name and an email. The page supplies the article and situation as hidden context.
 *  `introduce` is the Traction door: the same fields and delivery, with the open field asking for the app.
 *  `quote` is the subscription's door: the request is the ask, so the open field is optional. */
export function EnquiryForm({ articleSlug, situation, firstRead = false, introduce = false, quote = false, contact, paused = false }: { articleSlug?: string; situation?: string; firstRead?: boolean; introduce?: boolean; quote?: boolean; contact?: ContactPrefill; paused?: boolean }) {
  const { status, error, onFocus, onSubmit } = useEnquiry();
  return <form onSubmit={onSubmit} onFocus={onFocus} aria-label="Contact us">
    {paused && <p role="status">This form is paused for review. No enquiry can be sent from this preview.</p>}
    <fieldset disabled={paused || status === 'sending'} hidden={status === 'sent' || status === 'preview'}>
      {firstRead || introduce || quote || contact ? <><input type="hidden" name="situation" value={firstRead ? 'traction' : quote ? 'subscription' : 'partnership'} />{articleSlug && <input type="hidden" name="article" value={articleSlug} />}</> : <Suspense fallback={articleSlug ? <input type="hidden" name="article" value={articleSlug} /> : null}><ContextFields articleSlug={articleSlug} situation={situation} /></Suspense>}
      <Suspense fallback={null}><BoardContext /></Suspense>
      {/* Honeypot: people never see or reach it; an automated filler that completes it is dropped. */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap' }}><label><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {firstRead
        ? <label><span>Your app’s website</span><input name="message" type="url" required minLength={10} maxLength={5000} placeholder="https://your-app.com" /></label>
        : introduce
          ? <label><span>Your app <small>The link, who it’s for and what you want next</small></span><textarea name="message" required minLength={10} maxLength={5000} rows={5} /></label>
          : quote
            ? <label><span>What you’d like Traction to do <small>Optional</small></span><textarea name="message" maxLength={5000} rows={4} /></label>
            : <label><span>Message</span><textarea name="message" required minLength={10} maxLength={5000} rows={4} /></label>}
      <div data-contact-details="">
        <label><span>Name</span><input name="name" defaultValue={contact?.name} required maxLength={120} autoComplete="name" /></label>
        <label><span>Email</span><input name="email" type="email" defaultValue={contact?.email} required maxLength={254} autoComplete="email" /></label>
      </div>
      {!firstRead && contact?.company && <label><span>Company <small>Optional</small></span><input name="company" defaultValue={contact.company} maxLength={200} autoComplete="organization" /></label>}
      <div data-contact-actions="">
        <button type="submit">{status === 'sending' ? 'Sending…' : firstRead ? 'Ask for a first impression →' : introduce ? 'Introduce my app →' : quote ? 'Ask for a quote →' : 'Send message →'}</button>
        <p>We’ll use these details to reply to your enquiry.</p>
      </div>
    </fieldset>
    {status === 'sent' && <p role="status">Received. We’ll reply within one working day.</p>}
    {status === 'preview' && <p role="status">Preview enquiry saved locally. No email was sent.</p>}
    {status === 'error' && <p role="alert">{error}</p>}
  </form>;
}
