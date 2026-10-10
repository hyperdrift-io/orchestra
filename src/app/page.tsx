import type { Metadata } from 'next';
import { homepageOpenGraph } from '@/lib/share-metadata';
import { System } from '@/components/System';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';
import { Services } from '@/components/Services';

export const metadata: Metadata = { alternates: { canonical: '/' }, openGraph: homepageOpenGraph };

/** The Orchestra offer, optional exploration, capabilities and a first conversation. */
export default function Page() {
  return (
    <>
      <System />
      <Services />
      <Enquiry />
      <Footer />
    </>
  );
}
