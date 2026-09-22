import { websiteOpenGraph } from '@/lib/share-metadata';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { visibleArticles, isArticlePreview } from '@/lib/article-catalogue';

export function generateMetadata(): Metadata {
  return { title: 'The AI-native organisation', description: 'Explore the Bridge, specialist skills, agent authority and integrations through working examples built by Hyperdrift.', alternates: { canonical: '/articles' }, openGraph: { ...websiteOpenGraph, title: 'The AI-native organisation', description: 'Working examples of the Bridge, skills, agent authority and integrations built by Hyperdrift.', url: 'https://ai.hyperdrift.io/articles' }, robots: isArticlePreview() ? { index: false, follow: false } : undefined };
}

export default function ArticlesPage() {
  const articles = visibleArticles();
  if (!articles.length) notFound();
  const [first, ...rest] = articles;
  return <section id="articles" aria-labelledby="articles-title">
    <header>
      <p>Orchestra AI by Hyperdrift · Field notes</p>
      {isArticlePreview() && <small>Editorial preview · not yet published</small>}
      <h1 id="articles-title">The AI-native<br /><em>organisation.</em></h1>
      <p>See what happens when agents become part of the work. Accounts of the systems we built, the decisions we kept, and what your business could do with the same ideas.</p>
      <a href="/#contact">Discuss your workflow →</a>
    </header>
    <article>
      <div><p>01 / Begin here · {first.exampleStatus}</p><h2><a href={`/articles/${first.slug}`}>{first.title}</a></h2><p>{first.excerpt}</p><a href={`/articles/${first.slug}`}>Step onto the Bridge →</a></div>
      <figure><a href={`/articles/${first.slug}`} tabIndex={-1} aria-hidden="true"><Image src={first.image.src} sizes="(max-width: 850px) 100vw, 600px" width={first.image.width} height={first.image.height} alt="" /></a><figcaption>From scattered signals to a clear direction.</figcaption></figure>
    </article>
    <ol start={2}>{rest.map((article) => <li key={article.slug}>
      <span>{String(article.order).padStart(2, '0')}</span><div><p>{article.topic} / {article.example}</p><h2><a href={`/articles/${article.slug}`}>{article.title}</a></h2><p>{article.excerpt}</p><small>{article.exampleStatus}</small></div><a href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>Read →</a>
    </li>)}</ol>
    <footer><h2>Where could this help you?</h2><p>Bring one workflow, a question or a product you want to improve. We’ll work out a useful first step together.</p><a href="/#contact">Describe your workflow →</a></footer>
  </section>;
}
