import type { Metadata } from 'next';
import { homepageOpenGraph } from '@/lib/share-metadata';
import { System } from '@/components/System';
import { Proof } from '@/components/Proof';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';
import { PartnershipInvitation } from '@/components/Partnership';

export const metadata: Metadata = { alternates: { canonical: '/' }, openGraph: homepageOpenGraph };

/** One promise, one interactive example, inspectable proof and a first conversation. */
export default function Page() {
  return (
    <>
      <System />
      <Proof />
      <PartnershipInvitation />
      <Enquiry />
      <Footer />
    </>
  );
}
