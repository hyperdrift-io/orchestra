import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { TractionHowItWorks } from '@/components/TractionHowItWorks';
import { TractionPages } from '@/components/TractionPages';
import { Footer } from '@/components/Footer';
import { trialAppFrom } from '@/lib/campaign';
import { howItWorks } from '@/data/traction-features';
import '../offering.css';

const shareImage = { url: '/traction/og.jpg', width: 1200, height: 630, alt: 'The Traction title card from the trailer' };
const title = 'How Traction works: an AI growth team for your app';
const description = howItWorks.lead;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/traction/how-it-works' },
  openGraph: { ...websiteOpenGraph, title, description, url: 'https://orchestra.hyperdrift.io/traction/how-it-works', images: [shareImage] },
  twitter: { card: 'summary_large_image', title, description, images: [shareImage] },
};

/** One question, one page: how does Traction work? A free board's doors land here with `?from=<app id>#<step>`. */
export default async function TractionHowItWorksPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const trialApp = trialAppFrom((await searchParams).from);
  return <><TractionPages current="how" trialApp={trialApp} /><TractionHowItWorks trialApp={trialApp} /><Footer /></>;
}
