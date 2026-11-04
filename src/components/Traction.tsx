import { TractionTour } from '@/components/TractionTour';
import { TractionWalkthrough } from '@/components/TractionWalkthrough';
import { TractionJourney } from '@/components/TractionJourney';
import { boardHref, freeBoard, partnershipHref, startHref, waysOn } from '@/data/traction-offer';

/**
 * What Traction is and how it starts, in one reading column, with one door: get your first read, free.
 * `trialApp` is the free board a founder came from (`?from=<app id>`): the page then speaks to where they are,
 * and its door takes them back to their board, where the subscription is proposed. No form here.
 */
export function Traction({ trialApp }: { trialApp?: string } = {}) {
  return <article id="traction" data-offering="" data-product="" data-trial-app={trialApp}>
    <TractionJourney />
    <header>
      <p>Traction · A growth board for your app</p>
      <h1>Let’s find your next users.</h1>
      <p data-lead="">Traction is a board that holds your evidence, names the one thing in the way and proposes your next customer move. A Growth Manager prepares the work; you decide. It starts free, on day one, with a first read of your own app.</p>
    </header>
    <section id="value" data-journey="value" aria-labelledby="traction-work-title">
      <h2 id="traction-work-title">See it at work.</h2>
      <TractionTour />
      <TractionWalkthrough />
    </section>
    {/* How the free board continues: two ways on, stated once. Links only; the door follows. */}
    <section id="continue" data-journey="continue" aria-labelledby="traction-continue-title">
      <header>
        <p>How it continues</p>
        <h2 id="traction-continue-title">Free to start. Two ways on.</h2>
        <p>{trialApp
          ? 'You’re on the free board. When it shows results, you choose how it continues; nothing changes until you say so.'
          : `${freeBoard.text} When it shows results, you choose how it continues.`}</p>
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
        <p>Both ways on are there, with the subscription’s price. Your board and its records stay as they are until you say so.</p>
        <a href={boardHref(trialApp)} data-primary="">Open your board →</a>
      </> : <>
        <h2 id="traction-contact-title">Get your first read.</h2>
        <p>Free. Your name, your app’s address and your email, then a passkey. Your board opens straight away and your first read follows within minutes.</p>
        <a href={startHref()} data-primary="">Get your first read →</a>
        {/* Proof and the reason, not a second door. */}
        <p data-samples=""><a href="/traction/first-read">See what a first read looks like →</a><a href={`${partnershipHref}#why`}>Why we’re building Traction →</a></p>
      </>}
    </footer>
  </article>;
}
