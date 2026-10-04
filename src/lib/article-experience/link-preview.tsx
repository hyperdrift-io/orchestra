'use client';
import { useId, type AnchorHTMLAttributes, type ReactNode } from 'react';
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
/** Explicit opt-in: the anchor always navigates; its adjacent button previews. */
export function LinkPreview({ intent = 'preview', content, labels, onPreviewEvent, ...anchor }: LinkPreviewProps) {
  if (intent === 'navigate' || (anchor.download !== undefined && anchor.download !== false) || !canPreviewLink(anchor.href, content)) return <a {...anchor} />;
  return <PreviewLink {...anchor} content={content} labels={labels} onPreviewEvent={onPreviewEvent} />;
}
function PreviewLink({ content, labels, onPreviewEvent, ...anchor }: Omit<LinkPreviewProps, 'intent' | 'content'> & { content: LinkPreviewContent }) {
  const id = useId();
  const { panel, trigger, expanded, close, openOriginal } = useLinkPreview(anchor.href, onPreviewEvent);
  return <span data-link-preview="">
    <a {...anchor} />
    <button ref={trigger} type="button" data-link-preview-trigger="" data-testid="link-preview-trigger" popoverTarget={id} aria-haspopup="dialog" aria-expanded={expanded} aria-controls={id} aria-label={`${labels.preview}: ${content.title}`} title={labels.preview}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
    </button>
    <span ref={panel} id={id} popover="auto" data-link-preview-panel="" data-testid="link-preview-panel" role="dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
      <span data-link-preview-publisher="">{content.publisher}</span>
      <strong id={`${id}-title`} data-link-preview-title="" data-testid="link-preview-title" tabIndex={-1}>{content.title}</strong>
      <span id={`${id}-summary`} data-link-preview-summary="" data-testid="link-preview-summary">{content.summary}</span>
      <small data-link-preview-provenance="" data-testid="link-preview-provenance">{content.provenance === 'editorial' ? labels.editorialSummary : labels.publisherExcerpt}{content.reviewedAt && <> · {labels.reviewed} {content.reviewedAt}</>}</small>
      <span data-link-preview-actions="">
        <a data-testid="link-preview-original" href={anchor.href} target="_blank" rel="noopener noreferrer" onClick={openOriginal}>{labels.openOriginal} <span aria-hidden="true">↗</span></a>
        <button data-testid="link-preview-close" type="button" popoverTarget={id} popoverTargetAction="hide" onClick={close}>{labels.close}</button>
      </span>
    </span>
  </span>;
}
