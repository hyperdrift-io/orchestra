import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, articleJsonLd } from '@/lib/articles';
import { visibleArticles, articleUrl } from '@/lib/article-catalogue';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleProof } from '@/components/ArticleProof';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ArticleTracker } from '@/components/ArticleTracker';

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => visibleArticles().map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title, description: article.excerpt, alternates: { canonical: articleUrl(article.slug) },
    robots: article.publishedAt ? undefined : { index: false, follow: false },
    openGraph: { title: article.title, description: article.excerpt, type: 'article', url: articleUrl(article.slug), authors: ['Yann VR'], images: [{ url: `${articleUrl(article.slug)}/opengraph-image`, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [`${articleUrl(article.slug)}/opengraph-image`] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const next = visibleArticles().find((entry) => entry.order === article.order + 1);
  return <article id="article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd(article) }} />
    <ArticleTracker slug={article.slug} />
    <header>
      <nav aria-label="Breadcrumb"><a href="/articles">The AI-native organisation</a><span>/ {String(article.order).padStart(2, '0')}</span></nav>
      {!article.publishedAt && <small>Editorial preview · not yet published</small>}
      <p>{article.topic} / {article.example}</p><h1>{article.title}</h1><p>{article.excerpt}</p>
      <div><span>By Yann VR · {article.minutes} min read</span><a href="#enquire" data-enquiry="">{article.ctaLabel} →</a></div>
      <figure><a href="#article-proof" aria-label="See the working example"><img src={article.image.src} alt={article.image.alt} width={article.image.width} height={article.image.height} fetchPriority="high" /></a><figcaption>{article.image.caption}</figcaption></figure>
    </header>
    <div>
      <aside aria-label="In this article"><p>In this article</p><ol>{article.blocks.filter((block) => block.kind === 'heading').map((block) => 'text' in block && <li key={block.id}><a href={`#${block.id}`}>{block.text}</a></li>)}</ol><a href="#article-proof">See the working example ↓</a></aside>
      <ArticleBody blocks={article.blocks} />
    </div>
    <figure id="article-diagram"><figcaption><span>The idea, at a glance</span><strong>{article.shareLine}</strong></figcaption><ol>{article.steps.map((step) => <li key={step}>{step}</li>)}</ol><a href={`/articles/${article.slug}/opengraph-image`} download={`${article.slug}.png`}>Download the share card ↓</a></figure>
    <ArticleProof article={article} />
    <section id="enquire" aria-labelledby="enquire-heading"><header><p>Put the idea to work</p><h2 id="enquire-heading">What would this look<br /><em>like for you?</em></h2><p>Tell us about one workflow and the tools involved. We’ll discuss where agents could help and which decisions should stay with your team.</p><small>A personal reply within one working day.</small></header><EnquiryForm articleSlug={article.slug} /></section>
    <footer><a href="/articles">← All field notes</a>{next && <a href={`/articles/${next.slug}`}><span>Read next</span><strong>{next.title} →</strong></a>}</footer>
  </article>;
}
