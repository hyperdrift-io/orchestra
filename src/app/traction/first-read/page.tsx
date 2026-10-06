import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { FirstRead } from '@/components/TractionOffer';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'A first read',
  description: 'A real Traction first read of ai.hyperdrift.io: one strength, one constraint and the next customer move, read from public pages only, with the evidence.',
  alternates: { canonical: '/traction/first-read' },
  openGraph: { ...websiteOpenGraph, title: 'We read our own site first.', description: 'One strength, one constraint and the next customer move, with the evidence.', url: 'https://ai.hyperdrift.io/traction/first-read' },
};

export default function FirstReadPage() { return <><FirstRead /><Footer /></>; }
