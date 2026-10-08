import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { LaunchLog } from '@/components/LaunchLog';
import { Footer } from '@/components/Footer';

const shareImage = { url: '/traction/og.jpg', width: 1200, height: 630, alt: 'The Traction title card from the trailer' };

export const metadata: Metadata = {
  title: 'Traction launches itself, from zero, in public',
  description: 'The launch log of a growth board launching on its own board: the trailer, the count of founders on the board, the evidence gates and every day on the record, misses included.',
  alternates: { canonical: '/articles/traction-from-zero' },
  openGraph: { ...websiteOpenGraph, type: 'article', title: 'Traction launches itself, from zero, in public', description: 'The count, the gates and every day on the record, misses included.', url: 'https://orchestra.hyperdrift.io/articles/traction-from-zero', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] },
};

export default function LaunchLogPage() { return <><LaunchLog /><Footer /></>; }
