import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { Traction } from '@/components/Traction';
import { Footer } from '@/components/Footer';
import { trialAppFrom } from '@/lib/campaign';
import './offering.css';

const shareImage = { url: '/traction/og.jpg', width: 1200, height: 630, alt: 'The Traction title card from the trailer' };

export const metadata: Metadata = {
  title: 'Traction — A growth board for your app',
  description: 'Traction is a growth board for your app with an AI Growth Manager: it holds your evidence, names the one thing in the way and proposes your next customer move. Start free on day one, with a first read of your app.',
  alternates: { canonical: '/traction' },
  openGraph: { ...websiteOpenGraph, title: 'Traction — Let’s find your next users.', description: 'A growth board for your app with an AI Growth Manager. It holds your evidence, names the one thing in the way and proposes your next customer move. Start free on day one.', url: 'https://orchestra.hyperdrift.io/traction', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] },
};

/** A free Traction board links here with `?from=<app id>`; the page then speaks to that founder and its door continues their board. */
export default async function TractionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const trialApp = trialAppFrom((await searchParams).from);
  return <><Traction trialApp={trialApp} /><Footer /></>;
}
