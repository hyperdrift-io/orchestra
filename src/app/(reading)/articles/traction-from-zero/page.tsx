import type { Metadata } from 'next/types';
import { websiteOpenGraph, tractionShareImage, tractionIcons } from '@/lib/share-metadata';
import { LaunchLog } from '@/components/LaunchLog';

const shareImage = tractionShareImage;

export const metadata: Metadata = {
  icons: tractionIcons,
  title: 'Traction launches itself, from zero, in public',
  description: 'The launch log of a growth board launching on its own board: the trailer, the count of founders on the board, the evidence gates and every day on the record, misses included.',
  alternates: { canonical: '/articles/traction-from-zero' },
  openGraph: { ...websiteOpenGraph, type: 'article', title: 'Traction launches itself, from zero, in public', description: 'The count, the gates and every day on the record, misses included.', url: 'https://hyperdrift.io/articles/traction-from-zero', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] },
};

export default function LaunchLogPage() { return <><LaunchLog /></>; }
