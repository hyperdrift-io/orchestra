import { TractionStartLink } from '@/components/TractionStartLink';
import { boardHref, startHref } from '@/data/traction-offer';
import { howItWorks } from '@/data/traction-features';

/** The one door at the end of a Traction page: start, or for a founder back from their board, the way back to it. */
export function TractionDoor({ trialApp, enquiry }: { trialApp?: string; enquiry?: string }) {
  if (trialApp) return <footer id="your-board" data-start="" data-journey="contact">
    {enquiry && <a href={enquiry} data-primary="">{howItWorks.discuss}</a>}
    <p><a href={boardHref(trialApp)}>{howItWorks.back}</a></p>
  </footer>;
  return <footer id="your-board" data-start="" data-placement="page_door" data-journey="contact" aria-labelledby="traction-door-title">
    <h2 id="traction-door-title">{howItWorks.door}</h2>
    <TractionStartLink href={startHref()}>Trial Traction →</TractionStartLink>
    <p>{howItWorks.doorNote}</p>
  </footer>;
}
