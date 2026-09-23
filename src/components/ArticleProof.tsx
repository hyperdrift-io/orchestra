import type { ArticleSummary } from '@/lib/article-catalogue';

export function ArticleProof({ article }: { article: ArticleSummary }) {
  const { media, proof } = article;
  return <aside id="article-proof" aria-labelledby="proof-heading">
    <header><p>Built by Hyperdrift · {article.exampleStatus}</p><h2 id="proof-heading">{proof.heading ?? 'See the work.'}</h2></header>
    <p>{proof.description}</p>
    {media?.kind === 'image' && <figure><img src={media.src} alt={media.alt} loading="lazy" /><figcaption>{media.caption}</figcaption></figure>}
    {media?.kind === 'video' && <figure><video controls preload="none" playsInline aria-label={media.caption}><source src={media.src} type="video/mp4" /><a href={media.src}>Open the recording</a></video><figcaption>{media.caption}</figcaption></figure>}
    {media?.kind === 'youtube' && <details><summary>Play the recorded demonstration</summary><figure><iframe src={`https://www.youtube-nocookie.com/embed/${media.id}`} title={media.caption} loading="lazy" allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen /><figcaption>{media.caption}</figcaption></figure></details>}
    <a href={proof.url} data-proof-link="">{proof.label} ↗</a>
  </aside>;
}
