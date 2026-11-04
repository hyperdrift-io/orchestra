import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { Traction } from '@/components/Traction';
import { Footer } from '@/components/Footer';
import { trialAppFrom } from '@/lib/campaign';
import './offering.css';

const shareImage = { url: '/traction/og.jpg', width: 1200, height: 630, alt: 'The Traction title card from the trailer' };

export const metadata: Metadata = {
  title: 'Traction — A growth partner for your app',
  description: 'A growth partner for your app. Start free: a first read of your app, your own board and an AI Growth Manager proposing your first customer move. Continue with Traction, or bring us in for the customer work.',
  alternates: { canonical: '/traction' },
  openGraph: { ...websiteOpenGraph, title: 'Traction — Let’s find your next users.', description: 'A partnership to help your app find its market, turn interest into use and learn what brings people back. AI supports the work; we shape it with you.', url: 'https://orchestra.hyperdrift.io/traction', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] },
};

/** A free Traction board links here with `?from=<app id>`; the page then speaks to that founder and its door continues their board. */
export default async function TractionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const trialApp = trialAppFrom((await searchParams).from);
  return <><Traction trialApp={trialApp} /><Footer /></>;
}
