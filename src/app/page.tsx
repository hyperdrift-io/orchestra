import { System } from '@/components/System';
import { PlugIn } from '@/components/PlugIn';
import { Proof } from '@/components/Proof';
import { CurrentContent } from '@/components/CurrentContent';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';
import { ArticleSeries } from '@/components/ArticleSeries';

/** The founder’s business outcomes, illustrated through two interactive WebGL views. */
export default function Page() {
  return (
    <>
      <System />
      <PlugIn />
      <Proof />
      <ArticleSeries />
      <CurrentContent />
      <Enquiry />
      <Footer />
    </>
  );
}
