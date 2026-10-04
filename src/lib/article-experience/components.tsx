'use client';
import { useId, type ReactNode } from 'react';
import type { ArticleEntry, ArticleLabels, SourceNote } from './model';
import { LinkPreview } from './link-preview';
import { emitArticleInteraction } from './browser';
import { useAnchorCopy, useArticlePosition, useArticleShare } from './hooks';
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
  share: string; heading: string; copy: string; more: string; close: string;
  copied: string; manualCopy: string; linkField: string;
}
export interface ArticleShareAction { id: string; label: string; href: string; download?: string }
interface ArticleShareProps {
  canonical: string; title: string; text?: string; labels: ArticleShareLabels;
  actions?: ArticleShareAction[]; id?: string; placement?: string; children?: ReactNode;
}
/** One entry point. Destinations and editorial assets belong to the app adapter. */
export function ArticleShare({ canonical, title, text, labels, actions = [], id, placement, children }: ArticleShareProps) {
  const panelId = useId();
  const { copy, status, field, url, ready, canShare, share, busy, panel, trigger, close, expanded, chosen } = useArticleShare(canonical, title, text, placement);
  return <div id={id} data-article-share="">
    <button ref={trigger} type="button" data-testid="article-share-trigger" popoverTarget={panelId} aria-haspopup="dialog" aria-expanded={expanded} aria-controls={panelId}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V3m-4 4 4-4 4 4M5 13v7h14v-7" /></svg>{labels.share}
    </button>
    <a data-share-fallback="" href={url}>{labels.linkField}</a>
    <div ref={panel} id={panelId} popover="auto" data-article-share-panel="" data-testid="article-share-panel" role="dialog" aria-labelledby={`${panelId}-heading`}>
      <header><strong id={`${panelId}-heading`}>{labels.heading}</strong><button type="button" data-testid="article-share-close" popoverTarget={panelId} popoverTargetAction="hide" onClick={close} aria-label={labels.close}>×</button></header>
      {children}
      <div data-article-share-actions="">
        {actions.map(action => <a key={action.id} data-testid={`article-share-action-${action.id}`} href={action.href} download={action.download} target={action.download ? undefined : '_blank'} rel={action.download ? undefined : 'noopener noreferrer'} onClick={() => chosen(action.id, Boolean(action.download))}>{action.label}</a>)}
        <button data-testid="article-share-copy" type="button" onClick={copy} disabled={!ready}>{labels.copy}</button>
        {canShare && <button data-testid="article-share-native" type="button" onClick={share} disabled={busy}>{labels.more}</button>}
      </div>
      <p role="status" data-testid="article-share-status">{status === 'copied' ? labels.copied : status === 'manual' ? labels.manualCopy : ''}</p>
      {status === 'manual' && <input data-testid="article-share-link" ref={field} aria-label={labels.linkField} readOnly value={url} onFocus={event => event.currentTarget.select()} />}
      <noscript><p><a href={url}>{url}</a></p></noscript>
    </div>
  </div>;
}
interface SourceProps { href: string; children: ReactNode; note?: SourceNote; body?: ReactNode; labels: ArticleLabels }
export function ArticleSourceLink({ href, children, note, body, labels }: SourceProps) {
  return <LinkPreview href={href} labels={labels} content={note && {
    title: note.title, publisher: note.by,
    view: body ? { kind: 'content', body } : note.preview === 'unavailable' ? { kind: 'unavailable' } : { kind: note.preview === 'pdf' ? 'pdf' : 'page', src: href },
  }} onPreviewEvent={({ action }) => emitArticleInteraction({
    action: action === 'opened' ? 'article_source_preview_opened' : action === 'closed' ? 'article_source_preview_closed' : 'article_source_opened', source: href,
  })}>{children}</LinkPreview>;
}
