import { TractionTour } from '@/components/TractionTour';
import { TractionJourney } from '@/components/TractionJourney';
import { boardHref, freeBoard, partnershipHref, startHref, waysOn } from '@/data/traction-offer';

/**
 * What Traction is and how it starts, in Orchestra's hero grammar: the promise beside the engine at work,
 * then the two ways on and one door. Few words; the tour shows the rest.
 * `trialApp` is the free board a founder came from (`?from=<app id>`): the page then speaks to where they are,
 * and its door takes them back to their board, where the subscription is proposed. No form here.
 */
export function Traction({ trialApp }: { trialApp?: string } = {}) {
  return <article id="traction" data-offering="" data-product="" data-trial-app={trialApp}>
    <TractionJourney />
    <header>
      <p>Traction · Growth engine for your app</p>
      <h1>Let’s find your <em>next users.</em></h1>
      <p data-lead="">Traction is an engine that reads your app, finds what’s in the way and prepares your next customer move. You decide.</p>
    </header>
    <section id="value" data-journey="value" aria-label="Traction at work">
      <TractionTour />
    </section>
    {/* How the free board continues: two ways on, stated once. Links only; the door follows. */}
    <section id="continue" data-journey="continue" aria-labelledby="traction-continue-title">
      <header>
        <p>How it continues</p>
        <h2 id="traction-continue-title">Free to start. Two ways on.</h2>
        <p>{trialApp ? 'You’re on the free board. Nothing changes until you choose.' : freeBoard.text}</p>
      </header>
      <ul>{waysOn.map((way) => <li key={way.slug} id={way.slug} data-journey={way.slug === 'partnership' ? 'partnership' : undefined}>
        <h3>{way.name}</h3>
        <p>{way.text}</p>
        {way.link && <p><a href={way.link.href}>{way.link.label}</a></p>}
      </li>)}</ul>
    </section>
    {/* The one door, after the proposal. A free board's founder goes back to the board, where both ways on are offered with the price. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      {trialApp ? <>
        <h2 id="traction-contact-title">Continue on your board.</h2>
        <p>Both ways on are there, with the price.</p>
        <a href={boardHref(trialApp)} data-primary="">Open your board →</a>
      </> : <>
        <h2 id="traction-contact-title">See Traction in action.</h2>
        <p>On your own app, free. Your name, your app and your email, then a passkey.</p>
        <a href={startHref()} data-primary="">See Traction in action →</a>
        {/* The reason, not a second door. */}
        <p data-samples=""><a href={`${partnershipHref}#why`}>Why we’re building Traction →</a></p>
      </>}
    </footer>
  </article>;
}
