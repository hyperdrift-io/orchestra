import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { OperatingSystem } from '@/components/OperatingSystem';
import { OperatingSystemRecord } from '@/components/OperatingSystemRecord';
import { Footer } from '@/components/Footer';
import '../operating-system.css';

const description = 'Explore the operating model connecting development, production care and customer progress around your app. An illustrative Orchestra OS journey.';

export const metadata: Metadata = {
  title: 'Embed your app on Orchestra OS',
  description,
  alternates: { canonical: '/os' },
  openGraph: { ...websiteOpenGraph, title: 'Embed your app on Orchestra OS', description: 'Development, production care and customer progress around one app. Explore the Orchestra OS operating model.', url: 'https://orchestra.hyperdrift.io/os' },
};

// Orchestra OS as a service of the organisation every page already names.
const serviceJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://orchestra.hyperdrift.io/os#service',
  name: 'Orchestra OS',
  serviceType: 'Managed app operation',
  description,
  url: 'https://orchestra.hyperdrift.io/os',
  provider: { '@id': 'https://orchestra.hyperdrift.io/#organization' },
}).replace(/</g, '\\u003c');

/** Orchestra OS: the journey of an app joining it, then the record of what it gets. */
export default function OperatingSystemPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
    <OperatingSystem />
    <OperatingSystemRecord />
    <Footer />
  </>;
}
