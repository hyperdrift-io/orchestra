export interface LinkPreviewContent {
  title: string;
  publisher: string;
  summary: string;
  provenance: 'editorial' | 'publisher';
  reviewedAt?: string;
}
export interface LinkPreviewLabels {
  preview: string;
  close: string;
  openOriginal: string;
  editorialSummary: string;
  publisherExcerpt: string;
  reviewed: string;
}
export interface LinkPreviewEvent {
  action: 'opened' | 'closed' | 'source_opened';
  href: string;
}
/** Metadata is supplied by the app. No request or summary generation happens here. */
export function canPreviewLink(href: string, content?: LinkPreviewContent): content is LinkPreviewContent {
  if (!href.trim() || href.trim().startsWith('#') || !content?.title.trim() || !content.publisher.trim() || !content.summary.trim()) return false;
  try {
    const url = new URL(href, 'https://link-preview.invalid');
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
  } catch { return false; }
}
