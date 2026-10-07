import type { Metadata } from 'next';
import { homepageOpenGraph } from '@/lib/share-metadata';
import { System } from '@/components/System';
import { Proof } from '@/components/Proof';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';
import { Services } from '@/components/Services';

export const metadata: Metadata = { alternates: { canonical: '/' }, openGraph: homepageOpenGraph };

/** One promise, what we offer with Traction launching in public, inspectable proof and a first conversation. */
export default function Page() {
  return (
    <>
      <System />
      <Services />
      <Proof />
      <Enquiry />
      <Footer />
    </>
  );
}
