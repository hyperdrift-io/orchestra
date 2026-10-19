import { websiteOpenGraph } from '@/lib/share-metadata';
import { ArticleFinder } from '@/components/ArticleFinder';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { visibleArticles, isArticlePreview } from '@/lib/article-catalogue';
import { articleSearchEntries, collectionJsonLd } from '@/lib/articles';
import { tagsIn } from '@/lib/article-tags';
import { siteDoor } from '@/data/site-door';

const description = 'Practical AI engineering guides from Hyperdrift: agent skills, permissions, connected workflows, Lakebase, document databases and streaming interfaces.';

export function generateMetadata(): Metadata {
  return { title: 'AI engineering articles and practical guides', description, alternates: { canonical: '/articles' }, openGraph: { ...websiteOpenGraph, title: 'The AI-native organisation', description: 'Working examples of the Bridge, skills, agent authority and integrations built by Hyperdrift.', url: 'https://orchestra.hyperdrift.io/articles' }, robots: isArticlePreview() ? { index: false, follow: false } : undefined };
}

export default function ArticlesPage() {
  const articles = visibleArticles();
  if (!articles.length) notFound();
  return <section id="articles" aria-labelledby="articles-title">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionJsonLd('The AI-native organisation', description, 'https://orchestra.hyperdrift.io/articles', articles) }} />
    <header>
      <p>Orchestra AI by Hyperdrift · Field notes</p>
      {isArticlePreview() && <small>Editorial preview · not yet published</small>}
      <h1 id="articles-title">The AI-native<br /><em>organisation.</em></h1>
      <p>Practical notes from building and running our apps. Find a working example, inspect the evidence, and see where it could help you.</p>
      <nav aria-label="Also on this site">
        {articles.some((article) => article.series === 'ui-accessibility') && <a href="/articles/ui-accessibility">The future of UI and accessibility →</a>}
      </nav>
    </header>
    <ArticleFinder entries={articleSearchEntries()} tags={tagsIn(articles)} />
    <footer><h2>Where could this help you?</h2><p>Bring one workflow, a question or a product you want to improve. We’ll work out a useful first step together.</p><a href="/#contact">{siteDoor.label} →</a><p><a href="/articles/traction-from-zero">From the archive: Traction’s launch log →</a></p></footer>
  </section>;
}
