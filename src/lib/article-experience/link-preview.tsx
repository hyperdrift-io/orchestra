'use client';
import { useId, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { canPreviewLink, type LinkPreviewContent, type LinkPreviewEvent, type LinkPreviewLabels } from './link-preview-model';
import { useLinkPreview } from './use-link-preview';
export type { LinkPreviewContent, LinkPreviewEvent, LinkPreviewLabels } from './link-preview-model';
export interface LinkPreviewProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'content'> {
  href: string;
  children: ReactNode;
  content?: LinkPreviewContent;
  labels: LinkPreviewLabels;
  intent?: 'preview' | 'navigate';
  onPreviewEvent?: (event: LinkPreviewEvent) => void;
}
export function LinkPreview({ intent = 'preview', content, labels, onPreviewEvent, ...anchor }: LinkPreviewProps) {
  if (intent === 'navigate' || (anchor.download !== undefined && anchor.download !== false) || !canPreviewLink(anchor.href, content)) return <a {...anchor} />;
  return <PreviewLink {...anchor} content={content} labels={labels} onPreviewEvent={onPreviewEvent} />;
}
function PreviewLink({ content, labels, onPreviewEvent, onClick, onPointerEnter, onPointerLeave, children, ...anchor }: Omit<LinkPreviewProps, 'intent' | 'content'> & { content: LinkPreviewContent }) {
  const id = useId();
  const { panel, trigger, ready, expanded, prepared, activate, hover, cancelHover, open, close, openOriginal } = useLinkPreview(anchor.href, onPreviewEvent);
  return <span data-link-preview="">
    <a {...anchor} ref={trigger} data-link-preview-trigger="" aria-haspopup={ready ? 'dialog' : undefined} aria-expanded={ready ? expanded : undefined} aria-controls={ready ? id : undefined}
      onClick={event => { onClick?.(event); activate(event); }}
      onPointerEnter={event => { onPointerEnter?.(event); hover(event); }}
      onPointerLeave={event => { onPointerLeave?.(event); cancelHover(); }}>{children}</a>
    {ready && <button type="button" data-link-preview-touch="" data-testid="link-preview-touch" aria-haspopup="dialog" aria-expanded={expanded} aria-controls={id} aria-label={`${labels.preview}: ${content.title}`} onClick={event => open(event.currentTarget, true)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
    </button>}
    {ready && createPortal(<div ref={panel} id={id} popover="auto" data-link-preview-panel="" data-testid="link-preview-panel" role="dialog" aria-labelledby={`${id}-title`}>
      <header data-link-preview-header="">
        <span><small>{content.publisher}</small><strong id={`${id}-title`} data-link-preview-title="" data-testid="link-preview-title" tabIndex={-1}>{content.title}</strong></span>
        <span data-link-preview-actions=""><a data-testid="link-preview-original" href={anchor.href} target="_blank" rel="noopener noreferrer" onClick={openOriginal}>{labels.openOriginal} <span aria-hidden="true">↗</span></a><button data-testid="link-preview-close" type="button" onClick={close}>{labels.close}</button></span>
      </header>
      {(expanded || prepared) && <div data-link-preview-viewport="" data-testid="link-preview-viewport">
        {content.view.kind === 'content' ? <div data-link-preview-document="">{content.view.body}</div>
          : content.view.kind === 'unavailable' ? <p data-link-preview-unavailable="">{labels.unavailable}</p>
          : <><iframe loading="eager" data-testid="link-preview-frame" title={content.title} src={content.view.src} referrerPolicy="no-referrer" sandbox={content.view.kind === 'pdf' ? undefined : 'allow-scripts'} /><p data-link-preview-hint="">{labels.frameHint}</p></>}
      </div>}
    </div>, document.body)}
  </span>;
}
