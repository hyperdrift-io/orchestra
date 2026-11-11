import { meshFallbackSvg } from '@/lib/mesh-fallback';
import { MeshArtwork } from './MeshArtwork';
import { visibleArticles } from '@/lib/article-catalogue';
import { siteDoor } from '@/data/site-door';
/** Every link in the footer stays on this site (founder, 11 November 2026): a visitor who reached the end is not sent away. */
export function Footer() {
  const articlesAvailable=visibleArticles().length>0;
  return <footer data-site-footer>
    <div><p><a href="/" aria-label="Orchestra AI — home"><MeshArtwork kind="logo" fallbackSvg={meshFallbackSvg('logo')} fallback="/brand/orchestra-mesh-compact.svg" size={48} /><span>Orchestra <em>AI</em><small>By Hyperdrift</small></span></a></p><nav aria-label="Explore"><a href="/traction">Traction</a><a href="/os">Orchestra OS</a><a href="/work">Our work</a>{articlesAvailable && <a href="/articles">Articles</a>}</nav><nav aria-label="Contact"><a href="/#contact">{siteDoor.label} →</a></nav></div>
    <p>© {new Date().getFullYear()} Orchestra AI · AI engineering by Hyperdrift</p>
    <p data-legal>Orchestra AI is a trading name of Hyperdrift Limited, company 16638188, registered in England and Wales at 4 Rope Street, London SE16 7TE.</p>
    <p data-legal>We’re in London and always happy to meet our customers. <a href="/privacy">Privacy</a></p>
  </footer>;
}
