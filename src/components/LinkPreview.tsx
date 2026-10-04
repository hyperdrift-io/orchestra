import { LinkPreview as SharedLinkPreview, type LinkPreviewProps } from '@/lib/article-experience/link-preview';
import { articleLabels } from '@/lib/article-reading';
import { articleSourceNote } from '@/lib/article-source-notes';

export type PublicLinkProps = Omit<LinkPreviewProps, 'labels'>;
export function LinkPreview({ href, content, ...props }: PublicLinkProps) {
  const note = articleSourceNote(href.split('#')[0]);
  const resolved = content ?? (note && { title: note.title, publisher: note.by,
    view: note.preview === 'unavailable' ? { kind: 'unavailable' as const }
      : { kind: note.preview === 'pdf' ? 'pdf' as const : 'page' as const, src: href } });
  return <SharedLinkPreview {...props} href={href} content={resolved} labels={articleLabels} />;
}
