import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { Traction } from '@/components/Traction';
import { Footer } from '@/components/Footer';
import './offering.css';

const shareImage = { url: '/traction/og.jpg', width: 1200, height: 630, alt: 'The Traction title card from the trailer' };

export const metadata: Metadata = {
  title: 'Traction — A growth partner for your app',
  description: 'A growth partner for your app, for a few founders at a time, by introduction or by asking. It starts with a conversation and a read of your app, then your board with the first customer move prepared.',
  alternates: { canonical: '/traction' },
  openGraph: { ...websiteOpenGraph, title: 'Traction — Let’s find your next users.', description: 'A partnership to help your app find its market, turn interest into use and learn what brings people back. AI supports the work; we shape it with you.', url: 'https://orchestra.hyperdrift.io/traction', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] },
};

export default function TractionPage() { return <><Traction /><Footer /></>; }
