'use client';

import { enquiryCopy, type EnquiryLanguage } from '@/data/enquiry-copy';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { enquiryChoices } from '@/data/situations';
import { articleBySlug } from '@/lib/article-catalogue';
import { useEnquiry } from '@/lib/use-enquiry';
import { parseEnquiryHandoff } from '@/lib/enquiry-handoff';
import type { ContactPrefill } from '@/lib/contact-schema';
import { trialAppFrom } from '@/lib/campaign';

function ContextFields({ articleSlug, situation: preset, language }: { language: EnquiryLanguage; articleSlug?: string; situation?: string }) {
  const query = useSearchParams();
  const t = enquiryCopy[language];
  const article = articleBySlug(articleSlug || query.get('article'))?.slug || '';
  const wanted = preset || query.get('situation') || '';
  const situation = enquiryChoices.some((choice) => choice.value === wanted) ? wanted : '';
  const handoff = parseEnquiryHandoff(new URLSearchParams(query.toString()));
  const example = query.get('example') || '';
  return <>
    {['pipeline','crm','delivery','market','learning'].includes(example) && <><input type="hidden" name="workflow_example" value={example}/><p>{t.workflow(example)}</p></>}
    {handoff && <p>{t.from} <a href={`https://hyperdrift.io${handoff.source_path}`}>Hyperdrift</a>. {t.context}</p>}
    {article && <input type="hidden" name="article" value={article} />}
    {situation && <input type="hidden" name="situation" value={situation} />}
  </>;
}

function BoardContext({ language }: {language: EnquiryLanguage}) {
  const query = useSearchParams();
  const board = trialAppFrom(query.get('from') || undefined);
  return board ? <><input type="hidden" name="traction_board" value={board} /><p>{enquiryCopy[language].board}</p></> : null;
}

/** Every door asks for the reason, a name and an email. The page supplies the article and situation as hidden context.
 *  `introduce` is the Traction door: the same fields and delivery, with the open field asking for the app.
 *  `quote` is the subscription's door: the request is the ask, so the open field is optional. */
export function EnquiryForm({ language = 'en', articleSlug, situation, firstRead = false, introduce = false, quote = false, contact, paused = false }: { language?: EnquiryLanguage; articleSlug?: string; situation?: string; firstRead?: boolean; introduce?: boolean; quote?: boolean; contact?: ContactPrefill; paused?: boolean }) {
  const t = enquiryCopy[language];
  const { status, error, onFocus, onSubmit } = useEnquiry(language);
  return <form onSubmit={onSubmit} onFocus={onFocus} aria-label={t.contact}>
    {paused && <p role="status">{t.paused}</p>}
    <fieldset disabled={paused || status === 'sending'} hidden={status === 'sent' || status === 'preview'}>
      {firstRead || introduce || quote || contact ? <><input type="hidden" name="situation" value={firstRead ? 'traction' : quote ? 'subscription' : 'partnership'} />{articleSlug && <input type="hidden" name="article" value={articleSlug} />}</> : <Suspense fallback={articleSlug ? <input type="hidden" name="article" value={articleSlug} /> : null}><ContextFields language={language} articleSlug={articleSlug} situation={situation} /></Suspense>}
      <Suspense fallback={null}><BoardContext language={language} /></Suspense>
      {/* Honeypot: people never see or reach it; an automated filler that completes it is dropped. */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap' }}><label><span>{t.website}</span><input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {firstRead
        ? <label><span>{t.appWebsite}</span><input name="message" type="url" required minLength={10} maxLength={5000} placeholder="https://your-app.com" /></label>
        : introduce
          ? <label><span>{t.app} <small>{t.appHint}</small></span><textarea name="message" required minLength={10} maxLength={5000} rows={5} /></label>
          : quote
            ? <label><span>{t.quoteField} <small>{t.optional}</small></span><textarea name="message" maxLength={5000} rows={4} /></label>
            : <label><span>{t.message}</span><textarea name="message" required minLength={10} maxLength={5000} rows={4} /></label>}
      <div data-contact-details="">
        <label><span>{t.name}</span><input name="name" defaultValue={contact?.name} required maxLength={120} autoComplete="name" /></label>
        <label><span>{t.email}</span><input name="email" type="email" defaultValue={contact?.email} required maxLength={254} autoComplete="email" /></label>
      </div>
      {!firstRead && contact?.company && <label><span>{t.company} <small>{t.optional}</small></span><input name="company" defaultValue={contact.company} maxLength={200} autoComplete="organization" /></label>}
      <div data-contact-actions="">
        <button type="submit">{status === 'sending' ? t.sending : (firstRead ? t.firstRead : introduce ? t.sendIntro : quote ? t.quote : t.send) + ' →'}</button>
        <p>{t.purpose}</p>
      </div>
    </fieldset>
    {status === 'sent' && <p role="status">{t.sent}</p>}
    {status === 'preview' && <p role="status">{t.preview}</p>}
    {status === 'error' && <p role="alert">{error}</p>}
  </form>;
}
