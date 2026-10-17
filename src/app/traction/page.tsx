import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { Traction } from '@/components/Traction';
import { Footer } from '@/components/Footer';
import './offering.css';

const shareImage = { url: '/traction/og.jpg', width: 1200, height: 630, alt: 'The Traction title card from the trailer' };

export const metadata: Metadata = {
  title: 'Traction — Your AI CRM and growth strategist',
  description: 'Research prospects, prepare personal introductions and keep customer relationships moving. Traction helps founders choose their next growth move.',
  alternates: { canonical: '/traction' },
  openGraph: { ...websiteOpenGraph, title: 'Traction — Let’s find your next users.', description: 'Founders helping each other get their apps to the people they’re made for. AI helps with research, introductions and the next useful work.', url: 'https://orchestra.hyperdrift.io/traction', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] },
};

export default function TractionPage() { return <><Traction /><Footer /></>; }
