import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cache } from 'react';
import { articleUrl, visibleArticles, type ArticleSummary } from './article-catalogue';
import { plainText, type SearchEntry } from './article-search';
import { tagsOf } from './article-tags';
import { articleShareImage } from './share-metadata';
import { interfaceFigure } from './ui-accessibility-figures';

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

/** The finder's index: every visible article as plain prose, read at build time, so a new article is searchable on the next deploy with no extra step. */
export const articleSearchEntries = cache((): SearchEntry[] => visibleArticles().map((article) => {
  const source = readFileSync(join(process.cwd(), 'content', 'articles', `${article.slug}.md`), 'utf8');
  const { slug, title, excerpt, topic, example, exampleStatus, order } = article;
  return { slug, title, excerpt, topic, example, exampleStatus, order, tags: tagsOf(article), text: plainText([article.seoTitle ?? '', article.shareLine, source].join('\n')) };
}));

export function collectionJsonLd(name: string, description: string, url: string, list: ArticleSummary[]) {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'CollectionPage', name, description, url,
    isPartOf: { '@type': 'WebSite', name: 'Orchestra AI by Hyperdrift', url: 'https://ai.hyperdrift.io' },
    mainEntity: { '@type': 'ItemList', itemListElement: list.map((article, index) => ({ '@type': 'ListItem', position: index + 1, name: article.title, url: articleUrl(article.slug) })) },
  }).replace(/</g, '\\u003c');
}

export function articleSections(article: NonNullable<ReturnType<typeof getArticle>>) {
  const visual = { id: 'article-proof', title: (article.series && interfaceFigure(article.slug)?.title) || article.proof.heading || 'See the working example' };
  const visualIndex = article.blocks.findIndex((block) => block.kind === 'quote');
  const body = article.blocks.flatMap((block, index) => {
    if (block.kind === 'heading' && block.id) return [{ id: block.id, title: block.text }];
    return article.visualization && index === visualIndex ? [visual] : [];
  });
  return [{ id: 'article-body', title: 'Overview' }, ...body, ...(!article.visualization ? [visual] : []), ...(article.visualization && article.media ? [{ id: 'article-recording', title: 'Recorded demonstration' }] : [])];
}

export function articleJsonLd(article: NonNullable<ReturnType<typeof getArticle>>) {
  const url = `https://ai.hyperdrift.io/articles/${article.slug}`;
  return JSON.stringify({
    '@context': 'https://schema.org', '@graph': [
      {
        '@type': 'Article', headline: article.title,
        description: article.excerpt, author: { '@type': 'Person', name: 'Yann VR', url: 'https://hyperdrift.io' },
        publisher: { '@type': 'Organization', name: 'Orchestra AI by Hyperdrift', url: 'https://ai.hyperdrift.io' },
        mainEntityOfPage: url,
        keywords: tagsOf(article).map((tag) => tag.label).join(', '),
        image: articleShareImage(article).url,
        ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
        ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
        isPartOf: { '@type': 'CreativeWorkSeries', name: article.series ? 'The future of UI and accessibility' : 'The AI-native organisation', ...(article.series ? { url: 'https://ai.hyperdrift.io/articles/ui-accessibility' } : {}) },
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Articles', item: 'https://ai.hyperdrift.io/articles' },
          { '@type': 'ListItem', position: 2, name: article.title, item: url },
        ],
      },
    ],
  }).replace(/</g, '\\u003c');
}
