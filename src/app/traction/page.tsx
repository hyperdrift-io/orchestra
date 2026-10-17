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
  openGraph: { ...websiteOpenGraph, title: 'Traction — Let’s find your next customers.', description: 'Your AI CRM and growth strategist. Research, introductions, relationships and next steps in one workspace.', url: 'https://orchestra.hyperdrift.io/traction', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] },
};

export default function TractionPage() { return <><Traction /><Footer /></>; }
