import { ArticleExperienceTracker } from '@/components/ArticleExperienceTracker';
import '@/lib/article-experience/behaviour.css';
import { meshFallbackSvg } from '@/lib/mesh-fallback';
import { MeshArtwork } from '@/components/MeshArtwork';
import type { Metadata } from 'next/types';
import { notFound } from 'next/navigation';
import { getArticle, articleJsonLd, articleSections, figureId } from '@/lib/articles';
import { visibleArticles, publishedArticles, articleUrl, articleDateLabel } from '@/lib/article-catalogue';
import { ArticleContents } from '@/components/ArticleContents';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleVisualization } from '@/components/ArticleVisualization';
import { interfaceFigureSvg } from '@/lib/ui-accessibility-figure-svg';
import { ArticleProof } from '@/components/ArticleProof';
import { EnquiryDialog } from '@/components/EnquiryDialog';
import { ArticleTracker } from '@/components/ArticleTracker';
import { ArticleShare } from '@/components/ArticleShare';
import { ArticleTags } from '@/components/ArticleTags';
import { ReadNudge } from '@/components/ReadNudge';
import { articleShareImage, tractionIcons } from '@/lib/share-metadata';
import { tagsOf } from '@/lib/article-tags';
import { OssFlag } from '@/components/OssFlag';
import { isTractionArticle } from '@/lib/traction-brand';

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => visibleArticles().map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const image = articleShareImage(article);
  return {
    ...(isTractionArticle(article.slug) ? { icons: tractionIcons } : {}),
    title: article.seoTitle ?? article.title, description: article.excerpt, alternates: { canonical: articleUrl(article.slug) },
    robots: article.publishedAt && Date.parse(article.publishedAt) <= Date.now() ? undefined : { index: false, follow: false },
    openGraph: { title: article.title, description: article.excerpt, type: 'article', url: articleUrl(article.slug), siteName: 'Hyperdrift', locale: 'en_GB', authors: ['Yann VR'], ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}), ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}), images: [image] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const image = new URL(articleShareImage(article).url);
  const headerImage = article.headerImage ?? article.image;
  const sections = articleSections(article);
  const next = (article.readNext && visibleArticles().find((entry) => entry.slug === article.readNext)) || visibleArticles().find((entry) => entry.order === article.order + 1);
  return <article id="article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd(article) }} />
    <ArticleTracker slug={article.slug} />
    <ArticleExperienceTracker slug={article.slug} />
    <header>
      <nav aria-label="Breadcrumb"><a href={article.series ? '/articles/ui-accessibility' : '/articles'}>{article.series ? 'The future of UI and accessibility' : 'The AI-native organisation'}</a></nav>
      {!article.publishedAt && <small>Editorial preview · not yet published</small>}
      <p>{article.oss && <OssFlag oss={article.oss} />}{article.topic} / {article.example}</p>
      {isTractionArticle(article.slug) && <a data-article-brand="" href="/traction" aria-label="Explore Traction"><img src="/brand/traction/lockup-dark.svg" alt="Traction" width="236" height="40" /></a>}
      <div data-article-heading="" data-has-hero={article.heroImage ? 'true' : undefined}><h1>{article.title}</h1>
        {!article.heroImage && <div data-article-orb=""><MeshArtwork key={article.slug} kind="article" fallbackSvg={meshFallbackSvg('article', article.slug)} slug={article.slug} fallback={headerImage.src} layout="title" animated /></div>}
      </div>
      <p>{article.excerpt}</p>
      <div data-article-meta=""><span>By Yann VR · {article.minutes} min read{article.publishedAt && <> · Published <time dateTime={article.publishedAt}>{articleDateLabel(article.publishedAt)}</time></>}{article.updatedAt && article.updatedAt !== article.publishedAt && <> · Updated <time dateTime={article.updatedAt}>{articleDateLabel(article.updatedAt)}</time></>}</span><a href="#article-share">Share article ↓</a></div>
      {article.heroImage && <figure data-article-hero=""><img src={article.heroImage.src} alt={article.heroImage.alt} width={article.heroImage.width} height={article.heroImage.height} fetchPriority="high" /></figure>}
      <ArticleTags tags={tagsOf(article)} />
      {article.reviewedAt && <small data-reviewed="">Evidence reviewed {articleDateLabel(article.reviewedAt)} · <a href="/articles/ui-accessibility#method">Method and maintenance</a></small>}
    </header>
    <div data-article-layout="">
      <ArticleContents entries={sections} />
      <div data-article-reading="">
        <ArticleBody blocks={article.blocks} share={{ title: article.title, text: article.shareLine, url: articleUrl(article.slug) }} visualization={<ArticleVisualization article={article} figureSvg={article.visualization?.kind === 'ui-accessibility' ? interfaceFigureSvg(article.slug) : undefined} />} figures={Object.fromEntries((article.figures ?? []).map((figure) => [figure.kind, <ArticleVisualization key={figure.kind} article={article} visual={figure} id={figureId(figure.kind)} />]))} />
        <section data-article-endcap="" aria-label="What next">
          <div data-invite=""><a href="#enquire" data-enquiry="" data-invite-cta="">{article.ctaLabel} →</a>{article.invite && <p>{article.invite}</p>}</div>
          {next && <a data-read-next="" href={`/articles/${next.slug}`}><span>Read next</span><strong>{next.title} →</strong></a>}
        </section>
        <div id="article-diagram"><ArticleShare title={article.title} text={article.shareLine} url={articleUrl(article.slug)} imagePath={`${image.pathname}${image.search}`} slug={article.slug} preview={!publishedArticles().some(entry => entry.slug === article.slug)} /></div>
        {(!article.visualization || article.media) && <ArticleProof article={article} />}
      </div>
    </div>
    <EnquiryDialog paused={process.env.MIGRATION_PREVIEW === 'true'} articleSlug={article.slug} situation={article.situation} />
    <ReadNudge slug={article.slug} title={article.title} text={article.shareLine} url={articleUrl(article.slug)} />
    <footer><a href={article.series ? '/articles/ui-accessibility' : '/articles'}>{article.series ? '← The complete series' : '← All field notes'}</a></footer>
  </article>;
}
