'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { enquiryChoices } from '@/data/situations';
import { articles, articleBySlug } from '@/lib/article-catalogue';
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
  return <>
    {handoff && <p>Continuing from <a href={`https://hyperdrift.io${handoff.source_path}`}>Hyperdrift</a>. The page you came from will accompany your enquiry.</p>}
    {article && <label><span>About this article <small>Optional</small></span><select name="article" key={article} defaultValue={article}><option value="">A different question</option>{articles.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.title}</option>)}</select></label>}
    <label><span>Where you are <small>Optional</small></span><select name="situation" key={situation} defaultValue={situation}><option value="">Choose one, or leave it open</option>{enquiryChoices.map((choice) => <option key={choice.value} value={choice.value}>{choice.label}</option>)}</select></label>
  </>;
}

function BoardContext() {
  const query = useSearchParams();
  const board = trialAppFrom(query.get('from') || undefined);
  return board ? <label><span>Traction board <small>Optional</small></span><input name="traction_board" defaultValue={board} maxLength={64} /><small>This links the conversation to the board you came from. It does not grant access.</small></label> : null;
}

/** `introduce` is the Traction door: the same fields and delivery, with the open field asking for the app. */
export function EnquiryForm({ articleSlug, situation, firstRead = false, introduce = false, contact }: { articleSlug?: string; situation?: string; firstRead?: boolean; introduce?: boolean; contact?: ContactPrefill }) {
  const { status, error, onFocus, onSubmit } = useEnquiry();
  return <form onSubmit={onSubmit} onFocus={onFocus} aria-label="Contact us">
    <fieldset disabled={status === 'sending'} hidden={status === 'sent' || status === 'preview'}>
      {firstRead || introduce || contact ? <><input type="hidden" name="situation" value={firstRead ? 'traction' : 'partnership'} />{articleSlug && <input type="hidden" name="article" value={articleSlug} />}</> : <Suspense fallback={articleSlug ? <input type="hidden" name="article" value={articleSlug} /> : null}><ContextFields articleSlug={articleSlug} situation={situation} /></Suspense>}
      <Suspense fallback={null}><BoardContext /></Suspense>
      <div data-contact-details="">
        <label><span>Name</span><input name="name" defaultValue={contact?.name} required maxLength={120} autoComplete="name" /></label>
        <label><span>Email</span><input name="email" type="email" defaultValue={contact?.email} required maxLength={254} autoComplete="email" /></label>
      </div>
      {/* Honeypot: people never see or reach it; an automated filler that completes it is dropped. */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap' }}><label><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {!firstRead && <label><span>Company <small>Optional</small></span><input name="company" defaultValue={contact?.company} maxLength={200} autoComplete="organization" /></label>}
      {firstRead
        ? <label><span>Your app’s website</span><input name="message" type="url" required minLength={10} maxLength={5000} placeholder="https://your-app.com" /></label>
        : introduce
          ? <label><span>Your app <small>The link, who it’s for and what you want next</small></span><textarea name="message" required minLength={10} maxLength={5000} rows={5} /></label>
          : <label><span>Message</span><textarea name="message" required minLength={10} maxLength={5000} rows={4} /></label>}
      <div data-contact-actions="">
        <button type="submit">{status === 'sending' ? 'Sending…' : firstRead ? 'Ask for a first impression →' : introduce ? 'Introduce my app →' : 'Send message →'}</button>
        <p>We’ll use these details to reply to your enquiry.</p>
      </div>
    </fieldset>
    {status === 'sent' && <p role="status">Received. We’ll reply within one working day.</p>}
    {status === 'preview' && <p role="status">Preview enquiry saved locally. No email was sent.</p>}
    {status === 'error' && <p role="alert">{error}</p>}
  </form>;
}
