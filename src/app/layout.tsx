import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import './org.css';
import './articles.css';
import { SiteContactLink } from '@/components/SiteContactLink';
import { visibleArticles } from '@/lib/article-catalogue';

// Candidate faces for the approved concept: a quiet high-contrast serif for statements, a clean sans for reading.
const display = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--nf-display',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--nf-body',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--nf-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ai.hyperdrift.io'),
  title: {
    default: 'Orchestra AI by Hyperdrift — AI for business growth',
    template: '%s — Orchestra AI',
  },
  description:
    'AI for founders who want to grow revenue, protect profit and reclaim time. Explore how customer signals become useful work, and discuss one opportunity in your business.',
  openGraph: {
    title: 'Orchestra AI by Hyperdrift — AI for business growth',
    description:
      'AI inside your products and the way your business operates. Working examples, inspectable code, and engineering by Hyperdrift.',
    url: 'https://ai.hyperdrift.io',
    siteName: 'Orchestra AI',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <header>
          <p>
            <a href="/">
              Orchestra <em>AI</em>
            </a>
            <span>By Hyperdrift</span>
          </p>
          <nav aria-label="Site">
            <a href="/#proof">Work</a>
            <a href="/#plug">Your business</a>
            <a href="https://intel.hyperdrift.io/daily">Intel ↗</a>
            {visibleArticles().length > 0 ? <a href="/articles">Articles</a> : <a href="https://hyperdrift.io/blog">Writing ↗</a>}
            <SiteContactLink />
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
