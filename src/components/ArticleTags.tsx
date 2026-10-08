import type { ArticleTag } from '@/lib/article-tags';

type Props = { tags: ArticleTag[]; current?: string | null };

/** Every tag is a real link to its page; the finder intercepts the same links to filter in place. */
export function ArticleTags({ tags, current = null }: Props) {
  if (!tags.length) return null;
  return <nav aria-label="Topics"><ul>{tags.map((tag) => <li key={tag.slug}><a href={`/articles/tag/${tag.slug}`} data-tag={tag.slug} aria-current={current === tag.slug ? 'true' : undefined}>{tag.label}</a></li>)}</ul></nav>;
}
