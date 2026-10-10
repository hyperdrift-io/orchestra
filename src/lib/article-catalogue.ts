import catalogue from '@/data/articles.json';

export interface ArticleSummary {
  slug: string;
  title: string;
  /** The search-intent title; the published headline stands in until one is recorded. */
  seoTitle?: string;
  excerpt: string;
  shareLine: string;
  order: number;
  topic: string;
  example: string;
  /** Slugs from `src/data/article-tags.json`; the vocabulary stays small so every tag page has company. */
  tags: string[];
  exampleStatus: string;
  ctaLabel: string;
  steps: string[];
  proof: { description: string; url: string; label: string; heading?: string };
  media: { kind: 'image' | 'youtube' | 'video'; src?: string; id?: string; alt?: string; caption: string; poster?: string; transcript?: { intro: string; turns: { speaker: string; text: string }[] } } | null;
  image: { src: string; alt: string; caption: string; width: number; height: number };
  headerImage?: { src: string; alt: string; width: number; height: number };
  visualization?: { kind: 'transaction' | 'streaming' | 'authority' | 'brief' | 'ui-accessibility'; takeaway: string; description: string; sources: { label: string; url: string }[]; download?: string; reviewed?: string };
  series?: 'ui-accessibility';
  seriesOrder?: number;
  reviewedAt?: string;
  publishedAt: string | null;
  updatedAt?: string;
}

export const articles = catalogue as ArticleSummary[];
export const articleBySlug = (slug: string | null | undefined) => articles.find((article) => article.slug === slug);
export const articleUrl = (slug: string) => `https://orchestra.hyperdrift.io/articles/${slug}`;

export function isArticlePreview() {
  return process.env.NODE_ENV === 'development' || process.env.ARTICLE_PREVIEW === 'true';
}

/** Articles whose publication date has arrived. Drafts (no date) and scheduled pieces never qualify, preview build or not. */
export function publishedArticles(list = articles, now = Date.now()) {
  return list.filter((article) => article.publishedAt && Date.parse(article.publishedAt) <= now);
}

export function visibleArticles() {
  return isArticlePreview() ? articles : publishedArticles();
}

export function articleDateLabel(value: string) {
  return new Date(value.length === 10 ? `${value}T00:00:00Z` : value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
