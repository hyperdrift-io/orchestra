import { ArticleSourceLink as SharedSourceLink } from '@/lib/article-experience/components';
import type { SourceNote } from '@/lib/article-source-notes';
import { articleLabels } from '@/lib/article-reading';
interface Props { href: string; label: string; note: SourceNote }
export function ArticleSourceLink({ href, label, note }: Props) {
  return <SharedSourceLink href={href} note={note} labels={articleLabels}>{label}</SharedSourceLink>;
}
