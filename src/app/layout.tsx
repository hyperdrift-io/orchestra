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
    default: 'Orchestra AI — Agent orchestration for production AI workflows',
    template: '%s — Orchestra AI',
  },
  description:
    'Orchestra AI is the agent orchestration partner for vertical SaaS. We make agents production-grade inside the products you have already shipped.',
  openGraph: {
    title: 'Orchestra AI — Agent orchestration for production AI workflows',
    description:
      'Agent orchestration partner for vertical SaaS. We make agents production-grade inside real products.',
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
