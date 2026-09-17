import { Day } from '@/components/Day';
import { PlugIn } from '@/components/PlugIn';
import { Proof } from '@/components/Proof';
import { CurrentContent } from '@/components/CurrentContent';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';

/** The AI-native organisation: the graph first, then the work, then where you plug in. docs/design/2026-09-16-ai-native-org/PAGE.md */
export default function Page() {
  return (
    <>
      <Day />
      <PlugIn />
      <Proof />
      <CurrentContent />
      <Enquiry />
      <Footer />
    </>
  );
}
