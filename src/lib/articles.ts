import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cache } from 'react';
import { visibleArticles } from './article-catalogue';
import { articleShareImage } from './share-metadata';

export type ArticleBlock = { kind: 'heading' | 'paragraph' | 'quote'; text: string; id?: string } |
  { kind: 'image'; src: string; alt: string };

/** Our editorial source uses only headings, paragraphs, quotations and images. No raw HTML is executed. */
function parseBody(source: string): ArticleBlock[] {
  return source.trim().split(/\n\s*\n/).map((text) => {
    const image = text.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) return { kind: 'image', src: image[2], alt: image[1] };
    if (text.startsWith('## ')) {
      const title = text.slice(3);
      return { kind: 'heading', text: title, id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') };
    }
    if (text.startsWith('> ')) return { kind: 'quote', text: text.slice(2) };
    return { kind: 'paragraph', text: text.replace(/\n/g, ' ') };
  });
}

export const getArticle = cache((slug: string) => {
  const summary = visibleArticles().find((article) => article.slug === slug);
  if (!summary) return null;
  // Only catalogue slugs reach the filesystem.
  const source = readFileSync(join(process.cwd(), 'content', 'articles', `${summary.slug}.md`), 'utf8');
  const blocks = parseBody(source);
  return { ...summary, blocks, minutes: Math.max(1, Math.ceil(source.split(/\s+/).length / 220)) };
});

export function articleJsonLd(article: NonNullable<ReturnType<typeof getArticle>>) {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Article', headline: article.title,
    description: article.excerpt, author: { '@type': 'Person', name: 'Yann VR', url: 'https://hyperdrift.io' },
    publisher: { '@type': 'Organization', name: 'Orchestra AI by Hyperdrift', url: 'https://ai.hyperdrift.io' },
    mainEntityOfPage: `https://ai.hyperdrift.io/articles/${article.slug}`,
    image: articleShareImage(article).url,
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    isPartOf: { '@type': 'CreativeWorkSeries', name: 'The AI-native organisation' },
  }).replace(/</g, '\\u003c');
}
