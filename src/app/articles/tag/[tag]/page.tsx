import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleFinder } from '@/components/ArticleFinder';
import { visibleArticles, isArticlePreview } from '@/lib/article-catalogue';
import { articleSearchEntries, collectionJsonLd } from '@/lib/articles';
import { isTagIndexable, tagBySlug, tagsIn, tagUrl } from '@/lib/article-tags';
import { websiteOpenGraph } from '@/lib/share-metadata';

type Props = { params: Promise<{ tag: string }> };
export const generateStaticParams = () => tagsIn(visibleArticles()).map(({ slug }) => ({ tag: slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = tagBySlug((await params).tag);
  if (!tag) return {};
  return {
    title: `${tag.label}: articles and working examples`, description: tag.description, alternates: { canonical: `/articles/tag/${tag.slug}` },
    // A tag with few articles stays reachable for readers and crawlers but does not compete as a thin page.
    robots: isArticlePreview() ? { index: false, follow: false } : isTagIndexable(tag.slug) ? undefined : { index: false, follow: true },
    openGraph: { ...websiteOpenGraph, title: `${tag.label} — Orchestra AI field notes`, description: tag.description, url: tagUrl(tag.slug) },
  };
}

export default async function TagPage({ params }: Props) {
  const tag = tagBySlug((await params).tag);
  const articles = visibleArticles();
  const tagged = articles.filter((article) => tag && article.tags.includes(tag.slug));
  if (!tag || !tagged.length) notFound();
  return <section id="articles" aria-labelledby="articles-title">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionJsonLd(`${tag.label}: articles and working examples`, tag.description, tagUrl(tag.slug), tagged) }} />
    <header>
      <p>Orchestra AI by Hyperdrift · Field notes</p>
      {isArticlePreview() && <small>Editorial preview · not yet published</small>}
      <h1 id="articles-title">{tag.label}<br /><em>field notes.</em></h1>
      <p>{tag.description}</p>
      <a href="/articles">← All field notes</a>
    </header>
    <ArticleFinder entries={articleSearchEntries()} tags={tagsIn(articles)} initialTag={tag.slug} />
    <footer><h2>Where could this help you?</h2><p>Bring one workflow, a question or a product you want to improve. We’ll work out a useful first step together.</p><a href="/#contact">Describe your workflow →</a></footer>
  </section>;
}
