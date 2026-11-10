import { TractionFeatures } from '@/components/TractionFeatures';
import { TractionJourney } from '@/components/TractionJourney';
import { TractionDoor } from '@/components/TractionDoor';
import { howItWorks } from '@/data/traction-features';

/** One question, answered in full: how does Traction work? The start and the six steps as plain text, each at its own
 * address, then the one door. A door on a founder's board lands on the step it stood beside. */
export function TractionHowItWorks({ trialApp }: { trialApp?: string } = {}) {
  const enquiry = trialApp ? `/traction?from=${encodeURIComponent(trialApp)}&situation=subscription#enquire` : undefined;
  return <article id="traction" data-offering="" data-product="" data-how="" data-trial-app={trialApp}>
    <TractionJourney />
    <header>
      <p>{howItWorks.eyebrow}</p>
      <h1>{howItWorks.title}</h1>
      <p data-lead="">{howItWorks.lead}</p>
    </header>
    <TractionFeatures />
    <TractionDoor trialApp={trialApp} enquiry={enquiry} />
  </article>;
}
