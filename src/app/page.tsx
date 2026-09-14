import { Hero } from '@/components/Hero';
import { Places } from '@/components/Places';
import { Proof } from '@/components/Proof';
import { CurrentContent } from '@/components/CurrentContent';
import { Programme } from '@/components/Programme';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';

/** On the shoulder: the approved walk, first screen to enquiry. docs/design/2026-09-14-redesign/SELECTION.md */
export default function Page() {
  return (
    <>
      <Hero />
      <Places />
      <Proof />
      <CurrentContent />
      <Programme />
      <Enquiry />
      <Footer />
    </>
  );
}
