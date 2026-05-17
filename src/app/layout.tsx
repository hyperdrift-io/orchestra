import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}
