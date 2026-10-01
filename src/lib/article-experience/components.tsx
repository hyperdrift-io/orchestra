'use client';
import { useId, type ReactNode } from 'react';
import type { ArticleEntry, ArticleLabels, SourceNote } from './model';
import { emitArticleInteraction } from './browser';
import { useAnchorCopy, useArticlePosition, useSourcePreview } from './hooks';
interface ContentsProps { entries: ArticleEntry[]; bodyId: string; label: string; children?: ReactNode }
export function ArticleContents({ entries, bodyId, label, children }: ContentsProps) {
  const active = useArticlePosition(bodyId, entries);
  return <aside data-article-contents=""><nav aria-label={label}><p>{label}</p><ol>{entries.map(entry => <li key={entry.id} data-depth={entry.depth}><a href={`#${entry.id}`} aria-current={active === entry.id ? 'location' : undefined} onClick={() => emitArticleInteraction({ action: 'article_section_opened', anchor: entry.id })}>{entry.title}</a></li>)}</ol></nav>{children}</aside>;
}
interface PermalinkProps { canonical: string; anchor: string; label: string; labels: ArticleLabels }
export function ArticlePermalink({ canonical, anchor, label, labels }: PermalinkProps) {
  const { copy, status, field, url } = useAnchorCopy(canonical, anchor);
  return <span data-article-permalink=""><a href={`#${anchor}`} onClick={copy} aria-label={label} title={label}>¶</a><span role="status">{status === 'copied' ? labels.copied : status === 'manual' ? labels.manualCopy : ''}</span>{status === 'manual' && <input ref={field} aria-label={labels.linkField} readOnly value={url} onFocus={event => event.currentTarget.select()} />}</span>;
}
interface SourceProps { href: string; children: ReactNode; note?: SourceNote; labels: ArticleLabels }
export function ArticleSourceLink({ href, children, note, labels }: SourceProps) {
  const id = useId();
  const { panel, trigger, close } = useSourcePreview(href);
  return <span data-article-citation=""><a href={href}>{children}</a>{note && <><button ref={trigger} type="button" popoverTarget={id} aria-label={`${labels.preview}: ${note.title}`}>{labels.preview}</button><span ref={panel} id={id} popover="auto" data-article-source="" role="region" aria-label={note.title}><span>{note.by}</span><strong>{note.title}</strong><span>{note.summary}</span>{note.editorial && <small>{labels.editorialSummary}{note.reviewedAt && <> · {labels.reviewed} {note.reviewedAt}</>}</small>}<span data-source-actions=""><a href={href} target="_blank" rel="noopener noreferrer" onClick={() => emitArticleInteraction({ action: 'article_source_opened', source: href })}>{labels.openOriginal} ↗</a><button type="button" popoverTarget={id} popoverTargetAction="hide" onClick={close}>{labels.close}</button></span></span></>}</span>;
}
