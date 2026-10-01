'use client';
import { useId, type ReactNode } from 'react';
import type { ArticleEntry, ArticleLabels, SourceNote } from './model';
import { emitArticleInteraction } from './browser';
import { useAnchorCopy, useArticlePosition, useArticleShare, useSourcePreview } from './hooks';
interface ContentsProps { entries: ArticleEntry[]; bodyId: string; label: string; children?: ReactNode }
export function ArticleContents({ entries, bodyId, label, children }: ContentsProps) {
  const active = useArticlePosition(bodyId, entries);
  return <aside id={`${bodyId}-contents`} tabIndex={-1} data-article-contents=""><nav aria-label={label}><p>{label}</p><ol>{entries.map(entry => <li key={entry.id} data-depth={entry.depth}><a href={`#${entry.id}`} aria-current={active === entry.id ? 'location' : undefined} onClick={() => emitArticleInteraction({ action: 'article_section_opened', anchor: entry.id })}>{entry.title}</a></li>)}</ol></nav>{children}</aside>;
}
interface PermalinkProps { canonical: string; anchor: string; label: string; labels: ArticleLabels }
export function ArticlePermalink({ canonical, anchor, label, labels }: PermalinkProps) {
  const { copy, status, field, url } = useAnchorCopy(canonical, anchor);
  return <span data-article-permalink=""><a data-testid="article-permalink-copy" href={`#${anchor}`} onClick={copy} aria-label={label} title={label}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m10 13 4-4m-5-2 2-2a5 5 0 0 1 7 7l-2 2M8 10l-2 2a5 5 0 0 0 7 7l2-2" /></svg></a><span role="status" data-testid="article-permalink-status">{status === 'copied' ? labels.copied : status === 'manual' ? labels.manualCopy : ''}</span>{status === 'manual' && <input data-testid="article-permalink-link" ref={field} aria-label={labels.linkField} readOnly value={url} onFocus={event => event.currentTarget.select()} />}</span>;
}
export interface ArticleShareLabels {
  heading: string; copy: string; more: string; email: string;
  copied: string; manualCopy: string; linkField: string;
}
export function ArticleShare({ canonical, title, labels }: { canonical: string; title: string; labels: ArticleShareLabels }) {
  const { copy, status, field, url, canShare, share, email } = useArticleShare(canonical, title);
  return <section id="article-share" tabIndex={-1} data-article-share="" aria-labelledby="article-share-heading">
    <h2 id="article-share-heading">{labels.heading}</h2>
    <div data-article-share-actions="">
      <button data-testid="article-share-copy" type="button" onClick={copy}>{labels.copy}</button>
      {canShare && <button data-testid="article-share-native" type="button" onClick={share}>{labels.more}</button>}
      <a data-testid="article-share-email" href={email}>{labels.email}</a>
    </div>
    <p role="status" data-testid="article-share-status">{status === 'copied' ? labels.copied : status === 'manual' ? labels.manualCopy : ''}</p>
    {status === 'manual' && <input data-testid="article-share-link" ref={field} aria-label={labels.linkField} readOnly value={url} onFocus={event => event.currentTarget.select()} />}
    <noscript><p><a href={url}>{url}</a></p></noscript>
  </section>;
}
interface SourceProps { href: string; children: ReactNode; note?: SourceNote; labels: ArticleLabels }
export function ArticleSourceLink({ href, children, note, labels }: SourceProps) {
  const id = useId();
  const { panel, trigger, close } = useSourcePreview(href);
  return <span data-article-citation=""><a href={href}>{children}</a>{note && <><button ref={trigger} type="button" popoverTarget={id} aria-label={`${labels.preview}: ${note.title}`}>{labels.preview}</button><span ref={panel} id={id} popover="auto" data-article-source="" role="region" aria-label={note.title}><span>{note.by}</span><strong>{note.title}</strong><span>{note.summary}</span>{note.editorial && <small>{labels.editorialSummary}{note.reviewedAt && <> · {labels.reviewed} {note.reviewedAt}</>}</small>}<span data-source-actions=""><a href={href} target="_blank" rel="noopener noreferrer" onClick={() => emitArticleInteraction({ action: 'article_source_opened', source: href })}>{labels.openOriginal} ↗</a><button type="button" popoverTarget={id} popoverTargetAction="hide" onClick={close}>{labels.close}</button></span></span></>}</span>;
}
