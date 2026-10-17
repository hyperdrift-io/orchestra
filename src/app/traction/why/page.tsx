import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { TractionWhy, tractionWhyTitle } from '@/components/TractionWhy';
import { websiteOpenGraph } from '@/lib/share-metadata';
import '../offering.css';

export const metadata: Metadata = {
  title: tractionWhyTitle,
  description: 'Why we’re bringing a select few founders together to give worthwhile ideas their chance, and why we believe now is the time to act.',
  alternates: { canonical: '/traction/why' },
  robots: { index: false, follow: false },
  openGraph: { ...websiteOpenGraph, title: tractionWhyTitle, description: 'We should help each other get the work we believe in out there.', url: 'https://orchestra.hyperdrift.io/traction/why' },
};

export default function TractionWhyPage() {
  return <>
    <article id="traction-story">
      <header><p>Traction · Our purpose</p><h1>{tractionWhyTitle}</h1></header>
      <TractionWhy />
      <footer><a href="#enquire" data-enquiry="" data-situation="partnership">Let’s talk about your app →</a><a href="/traction">Back to Traction</a></footer>
    </article>
    <Footer />
  </>;
}
