import { meshFallbackSvg } from '@/lib/mesh-fallback';
import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';
import "./link-preview.css";
import './mesh-artwork.css';
import { MeshArtwork } from '@/components/MeshArtwork';
import './org.css';
import './articles.css';
import './visual-repair.css';
import './visual-operating-week.css';
import './visual-effort.css';
import './visual-fleet.css';
import './visual-intel-ui.css';
import './visual-conversation-trace.css';
import './visual-conventions-reach.css';
import './visual-review-timeline.css';
import './constellation.css';
import { SiteContactLink } from '@/components/SiteContactLink';
import { SiteEnquiryDialog } from '@/components/SiteEnquiryDialog';
import { visibleArticles } from '@/lib/article-catalogue';
import { brandShareImage, homepageOpenGraph } from '@/lib/share-metadata';

export const metadata: Metadata = {
  metadataBase: new URL('https://orchestra.hyperdrift.io'),
  title: {
    default: 'Orchestra AI by Hyperdrift — Customer growth and AI engineering',
    template: '%s — Orchestra AI',
  },
  description:
    'Orchestra connects customer insight, distribution and AI engineering for founders with a working product and evidence of demand. Start with one measurable customer opportunity.',
  openGraph: homepageOpenGraph,
  twitter: { card: 'summary_large_image', images: [brandShareImage] },
};

const siteJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://orchestra.hyperdrift.io/#organization', name: 'Orchestra AI', alternateName: 'Orchestra AI by Hyperdrift', url: 'https://orchestra.hyperdrift.io', logo: 'https://orchestra.hyperdrift.io/brand/orchestra-mesh.svg', parentOrganization: { '@type': 'Organization', '@id': 'https://hyperdrift.io/#organization', name: 'Hyperdrift', url: 'https://hyperdrift.io' }, founder: { '@type': 'Person', '@id': 'https://hyperdrift.io/#founder', name: 'Yann Vallery-Radot', url: 'https://www.linkedin.com/in/yannvr/' }, sameAs: ['https://github.com/hyperdrift-io'] },
    { '@type': 'WebSite', '@id': 'https://orchestra.hyperdrift.io/#website', name: 'Orchestra AI', url: 'https://orchestra.hyperdrift.io', publisher: { '@id': 'https://orchestra.hyperdrift.io/#organization' }, inLanguage: 'en-GB' },
  ],
}).replace(/</g, '\\u003c');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-display font-body font-mono">
      <head>
        <link rel="preload" href="/fonts/26d4368bf94c0ec4-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/7b89a4fd5e90ede0-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/98e207f02528a563-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/d3ebbfd689654d3a-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/e18f83c737786aa7-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* In the layout, not metadata.alternates: every page sets its own canonical, which replaces that whole object. */}
        <link rel="alternate" type="application/feed+json" title="Orchestra AI by Hyperdrift" href="/feed.json" />
        <link rel="alternate" type="application/rss+xml" title="Orchestra AI by Hyperdrift" href="/feed.xml" />
        {/* The brand as an entity on every page: Orchestra is the name, Hyperdrift makes it. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteJsonLd }} />
      </head>
      <body>
        <header>
          <p>
            <a href="/" aria-label="Orchestra AI — home">
              <MeshArtwork kind="logo" fallbackSvg={meshFallbackSvg('logo')} fallback="/brand/orchestra-mesh-compact.svg" size={44} />
              <span>Orchestra <em>AI</em><small>By Hyperdrift</small></span>
            </a>
          </p>
          <nav aria-label="Site">
            <a href="/work">Work</a>
            <a href="/traction">Traction</a>
            <a href="/os">Orchestra OS</a>
            {visibleArticles().length > 0 ? <a href="/articles">Articles</a> : <a href="https://hyperdrift.io/blog">Writing ↗</a>}
            <SiteContactLink />
          </nav>
        </header>
        <main>{children}</main>
        <SiteEnquiryDialog />
      </body>
    </html>
  );
}
