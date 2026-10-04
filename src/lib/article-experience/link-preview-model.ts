import type { ReactNode } from 'react';
export type LinkPreviewView =
  | { kind: 'page' | 'pdf'; src: string }
  | { kind: 'content'; body: ReactNode }
  | { kind: 'unavailable' };
export interface LinkPreviewContent {
  title: string;
  publisher: string;
  view: LinkPreviewView;
}
export interface LinkPreviewLabels {
  preview: string;
  close: string;
  openOriginal: string;
  unavailable: string;
  frameHint: string;
}
export interface LinkPreviewEvent {
  action: 'opened' | 'closed' | 'source_opened';
  href: string;
}
export function isPreviewUrl(href: string): boolean {
  if (!href.trim() || href.trim().startsWith('#')) return false;
  try {
    const url = new URL(href, 'https://link-preview.invalid');
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
  } catch { return false; }
}
/** Only app-supplied documents or real destination pages; a summary is not a preview. */
export function canPreviewLink(href: string, content?: LinkPreviewContent): content is LinkPreviewContent {
  if (!isPreviewUrl(href) || !content?.title.trim() || !content.publisher.trim() || !content.view) return false;
  return content.view.kind === 'content' ? Boolean(content.view.body)
    : content.view.kind === 'unavailable' || isPreviewUrl(content.view.src);
}
