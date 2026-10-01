import catalogue from '@/data/articles.json';

export interface ArticleSummary {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  shareLine: string;
  order: number;
  topic: string;
  example: string;
  exampleStatus: string;
  ctaLabel: string;
  steps: string[];
  proof: { description: string; url: string; label: string; heading?: string };
  media: { kind: 'image' | 'youtube' | 'video'; src?: string; id?: string; alt?: string; caption: string; poster?: string; transcript?: { intro: string; turns: { speaker: string; text: string }[] } } | null;
  image: { src: string; alt: string; caption: string; width: number; height: number };
  headerImage?: { src: string; alt: string; width: number; height: number };
  visualization?: { kind: 'transaction' | 'streaming' | 'ui-accessibility'; takeaway: string; description: string; sources: { label: string; url: string }[] };
  series?: 'ui-accessibility';
  seriesOrder?: number;
  reviewedAt?: string;
  publishedAt: string | null;
  updatedAt?: string;
}

export const articles = catalogue as ArticleSummary[];
export const articleBySlug = (slug: string | null | undefined) => articles.find((article) => article.slug === slug);
export const articleUrl = (slug: string) => `https://ai.hyperdrift.io/articles/${slug}`;

export function isArticlePreview() {
  return process.env.NODE_ENV === 'development' || process.env.ARTICLE_PREVIEW === 'true';
}

export function visibleArticles() {
  return articles.filter((article) => isArticlePreview() || (article.publishedAt && Date.parse(article.publishedAt) <= Date.now()));
}

export function articleDateLabel(value: string) {
  return new Date(value.length === 10 ? `${value}T00:00:00Z` : value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
