import { meshFallbackSvg } from '@/lib/mesh-fallback';
import { MeshArtwork } from './MeshArtwork';
import { visibleArticles } from '@/lib/article-catalogue';
export function Footer() {
  const articlesAvailable=visibleArticles().length>0;
  return <footer data-site-footer>
    <div><p><a href="/" aria-label="Orchestra AI — home"><MeshArtwork kind="logo" fallbackSvg={meshFallbackSvg('logo')} fallback="/brand/orchestra-mesh-compact.svg" size={48} /><span>Orchestra <em>AI</em><small>By Hyperdrift</small></span></a></p><nav aria-label="Explore"><a href="/how-it-works">How it works</a><a href="/work">Our work</a><a href={articlesAvailable?'/articles':'https://hyperdrift.io/blog'}>{articlesAvailable?'Articles':'Writing'}</a><a href="/partnership">Traction Partnership</a></nav><nav aria-label="More from Hyperdrift"><a href="https://intel.hyperdrift.io/daily">Daily intelligence ↗</a><a href="https://hyperdrift.io/blog/hyperdrift-turns-one">The Hyperdrift story ↗</a><a href="https://hyperdrift.io/blog">Engineering notes ↗</a><a href="/#contact">Start a conversation →</a></nav></div>
    <p>© {new Date().getFullYear()} Orchestra AI · AI engineering by Hyperdrift</p>
  </footer>;
}
