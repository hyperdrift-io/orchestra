import catalogue from '@/data/articles.json';

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  shareLine: string;
  order: number;
  topic: string;
  example: string;
  exampleStatus: string;
  ctaLabel: string;
  steps: string[];
  proof: { description: string; url: string; label: string; heading?: string };
  media: { kind: 'image' | 'youtube' | 'video'; src?: string; id?: string; alt?: string; caption: string } | null;
  image: { src: string; alt: string; caption: string; width: number; height: number };
  headerImage?: { src: string; alt: string; width: number; height: number };
  visualization?: { kind: 'transaction' | 'streaming'; takeaway: string; description: string; sources: { label: string; url: string }[] };
  publishedAt: string | null;
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
