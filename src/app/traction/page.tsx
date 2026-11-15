import type { Metadata } from 'next';
import { websiteOpenGraph, tractionShareImage, tractionIcons } from '@/lib/share-metadata';
import { Traction } from '@/components/Traction';
import { TractionPages } from '@/components/TractionPages';
import { Footer } from '@/components/Footer';
import { trialAppFrom } from '@/lib/campaign';
import { overview } from '@/data/traction-overview';
import './offering.css';

const shareImage = tractionShareImage;

const title = 'Traction — A growth team for your app';
const description = overview.description;

export const metadata: Metadata = {
  icons: tractionIcons,
  title, description,
  alternates: { canonical: '/traction' },
  openGraph: { ...websiteOpenGraph, title, description, url: 'https://orchestra.hyperdrift.io/traction', images: [shareImage] },
  twitter: { card: 'summary_large_image', title, description, images: [shareImage] },
};

/** A free Traction board links here with `?from=<app id>`; the page offers a conversation about continued use. */
export default async function TractionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const trialApp = trialAppFrom((await searchParams).from);
  return <><TractionPages current="overview" trialApp={trialApp} /><Traction trialApp={trialApp} /><Footer /></>;
}
