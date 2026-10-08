import { meshFallbackSvg } from '@/lib/mesh-fallback';
import { MeshArtwork } from '@/components/MeshArtwork';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, articleJsonLd, articleSections } from '@/lib/articles';
import { visibleArticles, articleUrl, articleDateLabel } from '@/lib/article-catalogue';
import { ArticleContents } from '@/components/ArticleContents';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleVisualization } from '@/components/ArticleVisualization';
import { interfaceFigureSvg } from '@/lib/ui-accessibility-figure-svg';
import { ArticleProof } from '@/components/ArticleProof';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ArticleTracker } from '@/components/ArticleTracker';
import { ArticleShare } from '@/components/ArticleShare';
import { ArticleTags } from '@/components/ArticleTags';
import { ReadNudge } from '@/components/ReadNudge';
import { articleShareImage } from '@/lib/share-metadata';
import { tagsOf } from '@/lib/article-tags';

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => visibleArticles().map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const image = articleShareImage(article);
  return {
    title: article.seoTitle ?? article.title, description: article.excerpt, alternates: { canonical: articleUrl(article.slug) },
    robots: article.publishedAt && Date.parse(article.publishedAt) <= Date.now() ? undefined : { index: false, follow: false },
    openGraph: { title: article.title, description: article.excerpt, type: 'article', url: articleUrl(article.slug), siteName: 'Orchestra AI by Hyperdrift', locale: 'en_GB', authors: ['Yann VR'], ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}), ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}), images: [image] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const image = new URL(articleShareImage(article).url);
  const headerImage = article.headerImage ?? article.image;
  const sections = articleSections(article);
  const next = visibleArticles().find((entry) => entry.order === article.order + 1);
  return <article id="article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd(article) }} />
    <ArticleTracker slug={article.slug} />
    <header>
      <nav aria-label="Breadcrumb"><a href={article.series ? '/articles/ui-accessibility' : '/articles'}>{article.series ? 'The future of UI and accessibility' : 'The AI-native organisation'}</a><span>/ {String(article.seriesOrder ?? article.order).padStart(2, '0')}</span></nav>
      {!article.publishedAt && <small>Editorial preview · not yet published</small>}
      <p>{article.topic} / {article.example}</p>
      <div data-article-heading=""><h1>{article.title}</h1>
        <div data-article-orb=""><MeshArtwork key={article.slug} kind="article" fallbackSvg={meshFallbackSvg('article', article.slug)} slug={article.slug} fallback={headerImage.src} layout="title" animated /></div>
      </div>
      <p>{article.excerpt}</p>
      <div data-article-meta=""><span>By Yann VR · {article.minutes} min read</span><a href="#article-share">Share article ↓</a><a href="#enquire" data-enquiry="">{article.ctaLabel} →</a></div>
      <ArticleTags tags={tagsOf(article)} />
      {article.reviewedAt && <small data-reviewed="">Evidence reviewed {articleDateLabel(article.reviewedAt)} · <a href="/articles/ui-accessibility#method">Method and maintenance</a></small>}
    </header>
    <div>
      <ArticleContents entries={sections} ctaLabel={article.ctaLabel} />
      <ArticleBody blocks={article.blocks} sourceNotes={article.series === 'ui-accessibility'} share={{ title: article.title, text: article.shareLine, url: articleUrl(article.slug) }} visualization={<ArticleVisualization article={article} figureSvg={article.visualization?.kind === 'ui-accessibility' ? interfaceFigureSvg(article.slug) : undefined} />} />
    </div>
    <figure id="article-diagram" data-has-visualization={article.visualization ? "true" : undefined}>{!article.visualization && <><figcaption><span>The idea, at a glance</span><strong>{article.shareLine}</strong></figcaption><ol>{article.steps.map((step) => <li key={step}>{step}</li>)}</ol></>}<ArticleShare title={article.title} text={article.shareLine} url={articleUrl(article.slug)} imagePath={`${image.pathname}${image.search}`} slug={article.slug} preview={!article.publishedAt || Date.parse(article.publishedAt) > Date.now()} /></figure>
    {(!article.visualization || article.media) && <ArticleProof article={article} />}
    <section id="enquire" aria-labelledby="enquire-heading"><header><p>Put the idea to work</p><h2 id="enquire-heading">What would this look<br /><em>like for you?</em></h2><p>Tell us about one workflow and the tools involved. We’ll discuss where agents could help and which decisions should stay with your team.</p><small>A personal reply within one working day.</small></header><EnquiryForm articleSlug={article.slug} /></section>
    <ReadNudge slug={article.slug} title={article.title} text={article.shareLine} url={articleUrl(article.slug)} ctaLabel={article.ctaLabel} />
    <footer><a href={article.series ? '/articles/ui-accessibility' : '/articles'}>{article.series ? '← The complete series' : '← All field notes'}</a>{next && <a href={`/articles/${next.slug}`}><span>Read next</span><strong>{next.title} →</strong></a>}</footer>
  </article>;
}
