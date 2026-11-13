import { articleBySlug, publishedArticles } from '@/lib/article-catalogue';

/** Feature the founder's published argument without inventing a launch date or waiting list. */
export function TractionFeature() {
  const article = articleBySlug('give-motivated-founders-a-fair-chance');
  if (!article || !publishedArticles([article]).length) return null;
  return <section id="traction-feature" aria-labelledby="traction-feature-title">
    <div data-feature-art="">
      {article.heroImage && <img src={article.heroImage.src} alt={article.heroImage.alt} width={article.heroImage.width} height={article.heroImage.height} loading="lazy" />}
      <img data-feature-brand="" src="/brand/traction/lockup-dark.svg" alt="Traction" width="1300" height="220" />
    </div>
    <div data-feature-copy="">
      <p>Meet Traction</p>
      <h2 id="traction-feature-title">{article.title}</h2>
      <p>We’re building Traction to give eager founders a team focused on turning their vision into growth.</p>
      <a href={`/articles/${article.slug}`}>Why we’re building Traction →</a>
    </div>
  </section>;
}
