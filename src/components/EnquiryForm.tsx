'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { enquiryChoices } from '@/data/situations';
import { articles, articleBySlug } from '@/lib/article-catalogue';
import { useEnquiry } from '@/lib/use-enquiry';

function ContextFields({ articleSlug }: { articleSlug?: string }) {
  const query = useSearchParams();
  const article = articleBySlug(articleSlug || query.get('article'))?.slug || '';
  const situation = enquiryChoices.some((choice) => choice.value === query.get('situation')) ? query.get('situation')! : '';
  return <>
    {article && <label><span>About this article <small>Optional</small></span><select name="article" key={article} defaultValue={article}><option value="">A different question</option>{articles.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.title}</option>)}</select></label>}
    <label><span>Where you are <small>Optional</small></span><select name="situation" key={situation} defaultValue={situation}><option value="">Choose one, or leave it open</option>{enquiryChoices.map((choice) => <option key={choice.value} value={choice.value}>{choice.label}</option>)}</select></label>
  </>;
}

export function EnquiryForm({ articleSlug }: { articleSlug?: string }) {
  const { status, error, onFocus, onSubmit } = useEnquiry();
  return <form onSubmit={onSubmit} onFocus={onFocus} aria-label="Discuss your workflow">
    <fieldset disabled={status === 'sending'}>
      <Suspense fallback={articleSlug ? <input type="hidden" name="article" value={articleSlug} /> : null}><ContextFields articleSlug={articleSlug} /></Suspense>
      <label><span>Name</span><input name="name" required maxLength={120} autoComplete="name" /></label>
      <label><span>Email</span><input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
      <label><span>Company <small>Optional</small></span><input name="company" maxLength={200} autoComplete="organization" /></label>
      <label><span>What would you like to make easier?</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell us about the workflow, the tools involved, and what a useful result would look like." /></label>
      <p>We’ll use these details to reply to your enquiry.</p>
      <button type="submit">{status === 'sending' ? 'Sending…' : 'Start the conversation →'}</button>
    </fieldset>
    {status === 'sent' && <p role="status">Received. We’ll reply within one working day.</p>}
    {status === 'preview' && <p role="status">Preview enquiry saved locally. No email was sent.</p>}
    {status === 'error' && <p role="alert">{error}</p>}
  </form>;
}
