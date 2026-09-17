import type { Metadata } from 'next';
import { System } from '@/components/System';
import { PlugIn } from '@/components/PlugIn';
import { Proof } from '@/components/Proof';
import { CurrentContent } from '@/components/CurrentContent';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The system',
  robots: { index: false },
};

/** Version B of the front door for comparison: the Commander globe first, then the same page. */
export default function SystemPage() {
  return (
    <>
      <System />
      <PlugIn />
      <Proof />
      <CurrentContent />
      <Enquiry />
      <Footer />
    </>
  );
}
