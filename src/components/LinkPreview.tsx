import { LinkPreview as SharedLinkPreview, type LinkPreviewProps } from '@/lib/article-experience/link-preview';
import { articleLabels } from '@/lib/article-reading';
import { articleSourceNote, citationStaysText } from '@/lib/article-source-notes';

/** `citation` links follow the article rule: no in-place preview, no link. */
export type PublicLinkProps = Omit<LinkPreviewProps, 'labels'> & { citation?: boolean };
export function LinkPreview({ href, content, citation, ...props }: PublicLinkProps) {
  if (citation && !content && citationStaysText(href)) return <span data-citation-text="">{props.children}</span>;
  const note = articleSourceNote(href.split('#')[0]);
  const resolved = content ?? (note && { title: note.title, publisher: note.by,
    view: note.preview === 'unavailable' ? { kind: 'unavailable' as const }
      : { kind: note.preview === 'pdf' ? 'pdf' as const : 'page' as const, src: href } });
  return <SharedLinkPreview {...props} href={href} content={resolved} labels={articleLabels} />;
}
