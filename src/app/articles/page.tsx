import { meshFallbackSvg } from '@/lib/mesh-fallback';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { MeshArtwork } from '@/components/MeshArtwork';
import { ArticleFinder } from '@/components/ArticleFinder';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { visibleArticles, isArticlePreview } from '@/lib/article-catalogue';
import { articleSearchEntries, collectionJsonLd } from '@/lib/articles';
import { tagsIn } from '@/lib/article-tags';

const description = 'Practical AI engineering guides from Hyperdrift: agent skills, permissions, connected workflows, Lakebase, document databases and streaming interfaces.';

export function generateMetadata(): Metadata {
  return { title: 'AI engineering articles and practical guides', description, alternates: { canonical: '/articles' }, openGraph: { ...websiteOpenGraph, title: 'The AI-native organisation', description: 'Working examples of the Bridge, skills, agent authority and integrations built by Hyperdrift.', url: 'https://ai.hyperdrift.io/articles' }, robots: isArticlePreview() ? { index: false, follow: false } : undefined };
}

export default function ArticlesPage() {
  const articles = visibleArticles();
  if (!articles.length) notFound();
  const [first] = articles;
  return <section id="articles" aria-labelledby="articles-title">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionJsonLd('The AI-native organisation', description, 'https://ai.hyperdrift.io/articles', articles) }} />
    <header>
      <p>Orchestra AI by Hyperdrift · Field notes</p>
      {isArticlePreview() && <small>Editorial preview · not yet published</small>}
      <h1 id="articles-title">The AI-native<br /><em>organisation.</em></h1>
      <p>See what happens when agents become part of the work. Accounts of the systems we built, the decisions we kept, and what your business could do with the same ideas.</p>
      <nav aria-label="Also on this site">
        {articles.some((article) => article.series === 'ui-accessibility') && <a href="/articles/ui-accessibility">The future of UI and accessibility →</a>}
        <a href="/articles/traction-from-zero">Traction launching itself, in public →</a>
        <a href="/#contact">Discuss your workflow →</a>
      </nav>
    </header>
    <ArticleFinder entries={articleSearchEntries()} tags={tagsIn(articles)}>
      <article>
        <div><p>01 / Begin here · {first.exampleStatus}</p><h2><a href={`/articles/${first.slug}`}>{first.title}</a></h2><p>{first.excerpt}</p><a href={`/articles/${first.slug}`}>Step onto the Bridge →</a></div>
        <figure><a href={`/articles/${first.slug}`} tabIndex={-1} aria-hidden="true"><MeshArtwork kind="article" fallbackSvg={meshFallbackSvg('article', first.slug)} slug={first.slug} fallback={(first.headerImage ?? first.image).src} /></a><figcaption>From scattered signals to a clear direction.</figcaption></figure>
      </article>
    </ArticleFinder>
    <footer><h2>Where could this help you?</h2><p>Bring one workflow, a question or a product you want to improve. We’ll work out a useful first step together.</p><a href="/#contact">Describe your workflow →</a></footer>
  </section>;
}
