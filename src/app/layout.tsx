import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
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
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}
