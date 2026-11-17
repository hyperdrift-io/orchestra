import type { Metadata } from 'next/types';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: 'website', title, description, url: `https://hyperdrift.io${path}`, siteName: 'Hyperdrift', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  };
}
