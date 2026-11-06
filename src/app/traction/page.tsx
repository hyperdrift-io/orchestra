import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { Traction } from '@/components/Traction';
import { Footer } from '@/components/Footer';
import { trialAppFrom } from '@/lib/campaign';
import './offering.css';

const shareImage = { url: '/traction/og.jpg', width: 1200, height: 630, alt: 'The Traction title card from the trailer' };

const title = 'Traction — Let’s find your next users';
const description = 'Get a free review of your website, research potential customers and draft your first email with Traction. You choose who to contact.';

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: '/traction' },
  openGraph: { ...websiteOpenGraph, title, description, url: 'https://orchestra.hyperdrift.io/traction', images: [shareImage] },
  twitter: { card: 'summary_large_image', title, description, images: [shareImage] },
};

/** A free Traction board links here with `?from=<app id>`; the page offers a conversation about continued use. */
export default async function TractionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const trialApp = trialAppFrom((await searchParams).from);
  return <><Traction trialApp={trialApp} /><Footer /></>;
}
