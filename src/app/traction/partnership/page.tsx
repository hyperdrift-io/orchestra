import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { TractionPartnership } from '@/components/TractionPartnership';
import { Footer } from '@/components/Footer';
import '../offering.css';

const shareImage = { url: '/traction/og.jpg', width: 1200, height: 630, alt: 'The Traction title card from the trailer' };
const title = 'How we work with you — The Traction Partnership';
const description = 'How working with Orchestra works: we do the customer work with you, move by move, from the first conversation to paying customers, measured on your Traction board. What you bring, how it starts and what we ask.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/traction/partnership' },
  openGraph: { ...websiteOpenGraph, title, description, url: 'https://orchestra.hyperdrift.io/traction/partnership', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] },
};

export default function TractionPartnershipPage() { return <><TractionPartnership /><Footer /></>; }
