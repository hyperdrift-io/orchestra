import vocabulary from '@/data/article-tags.json';
import { publishedArticles, type ArticleSummary } from './article-catalogue';

export type ArticleTag = { slug: string; label: string; description: string };

const tags: Record<string, { label: string; description: string }> = vocabulary;
const define = (slug: string): ArticleTag => ({ slug, ...tags[slug] });

export const tagBySlug = (slug: string | null | undefined): ArticleTag | null => (slug && tags[slug] ? define(slug) : null);

/** The tags an article carries, in the vocabulary's order so every list reads the same way. */
export function tagsOf(article: Pick<ArticleSummary, 'tags'>): ArticleTag[] {
  return Object.keys(tags).filter((slug) => article.tags?.includes(slug)).map(define);
}

/** Tags carried by at least one article in the list, each with its count. */
export function tagsIn(list: ArticleSummary[]) {
  return Object.keys(tags)
    .map((slug) => ({ ...define(slug), count: list.filter((article) => article.tags?.includes(slug)).length }))
    .filter((tag) => tag.count > 0);
}

/** A tag page earns a place in search results once it lists this many published articles; below that it stays reachable but unindexed. */
export const INDEXABLE_FROM = 3;
export const indexableTags = (list = publishedArticles()) => tagsIn(list).filter((tag) => tag.count >= INDEXABLE_FROM);
export const isTagIndexable = (slug: string, list = publishedArticles()) => indexableTags(list).some((tag) => tag.slug === slug);
export const tagUrl = (slug: string) => `https://ai.hyperdrift.io/articles/tag/${slug}`;
