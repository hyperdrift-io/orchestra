import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import './org.css';

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
    default: 'Orchestra AI by Hyperdrift — AI agents and MCP integrations',
    template: '%s — Orchestra AI',
  },
  description:
    'Hyperdrift builds AI agents and MCP integrations for existing SaaS products. Explore the work, read the source, and start a project with Orchestra AI.',
  openGraph: {
    title: 'Orchestra AI by Hyperdrift — AI agents and MCP integrations',
    description:
      'AI agents and MCP integrations for existing SaaS products. Working examples, inspectable code, and engineering by Hyperdrift.',
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
          <p className="wordmark">
            <a href="/">
              Orchestra <em>AI</em>
            </a>
            <span className="meta">By Hyperdrift</span>
          </p>
          <nav aria-label="Site">
            <a href="#proof">Work</a>
            <a href="#plug">Where you plug in</a>
            <a href="https://intel.hyperdrift.io/daily">Intel ↗</a>
            <a href="https://hyperdrift.io/blog">Writing ↗</a>
            <a href="#contact">Describe your workflow</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
