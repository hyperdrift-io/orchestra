import { websiteOpenGraph } from '@/lib/share-metadata';
import type { Metadata } from 'next';
import { Proof } from '@/components/Proof';
import { Footer } from '@/components/Footer';
import './work.css';

const description = 'See Traction at work on our own launch, run our open-source First read on your app and read our merged OpenTelemetry change.';

export const metadata: Metadata = {
  title: 'Our work: Traction, First read and open source',
  description,
  alternates: { canonical: '/work' },
  openGraph: { ...websiteOpenGraph, title: 'A whole team behind your app.', description, url: 'https://orchestra.hyperdrift.io/work' },
};

export default function WorkPage() { return <><Proof /><Footer /></>; }
