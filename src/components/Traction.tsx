import { TractionWalkthrough } from '@/components/TractionWalkthrough';
import { TractionFeatures } from '@/components/TractionFeatures';
import { TractionJourney } from '@/components/TractionJourney';
import { boardHref, continuedUseHref, freeBoard, partnershipHref, startHref, waysOn } from '@/data/traction-offer';

/**
 * The promise beside the engine at work, then what Traction does, how it continues and one door at the end: a visitor
 * reads the proposal before the ask (founder, 7 November 2026). The masthead carries the same door for a reader who has
 * already decided. A founder coming back from a free board has used it already, so their door stays beside their question.
 */
export function Traction({ trialApp }: { trialApp?: string } = {}) {
  const enquiry = trialApp ? `/traction?from=${encodeURIComponent(trialApp)}&situation=subscription#enquire` : continuedUseHref;
  return <article id="traction" data-offering="" data-product="" data-trial-app={trialApp}>
    <TractionJourney />
    <header>
      <p>Traction · Growth engine for your app</p>
      {trialApp ? <>
        <h1>Where would you like <em>help next?</em></h1>
        <p data-lead="">Tell us what you tried on your board and where you’d like a hand. We’ll work out the scope and price with you.</p>
        <div id="your-board" data-start="" data-journey="contact">
          <a href={enquiry} data-primary="">Discuss the next step →</a>
          <p><a href={boardHref(trialApp)}>Back to your board →</a></p>
        </div>
      </> : <>
        <h1>Let’s find your <em>next users.</em></h1>
        <p data-lead="">Traction reviews your website. Ask it to find potential customers and draft your first email. You choose who to contact.</p>
      </>}
    </header>
    <section id="value" data-journey="value" aria-label="Traction at work">
      <TractionWalkthrough />
    </section>
    <TractionFeatures />
    <section id="continue" data-journey="continue" aria-labelledby="traction-continue-title">
      <header>
        <h2 id="traction-continue-title">After your first search</h2>
        <p>{freeBoard.text}</p>
        <a href={`${partnershipHref}#why`}>Why we’re building Traction →</a>
      </header>
      <ul>{waysOn.map(way => <li key={way.slug} id={way.slug} data-journey={way.slug === 'partnership' ? 'partnership' : undefined}>
        <h3>{way.name}</h3>
        <p>{way.text}</p>
        {way.link && <p><a href={way.slug === 'subscription' ? enquiry : trialApp ? `${way.link.href}?from=${encodeURIComponent(trialApp)}` : way.link.href}>{way.link.label}</a></p>}
      </li>)}</ul>
    </section>
    {!trialApp && <footer id="your-board" data-start="" data-journey="contact" aria-labelledby="traction-door-title">
      <h2 id="traction-door-title">Make Traction work for you, now.</h2>
      <a href={startHref()} data-primary="">Trial Traction →</a>
      <p>Your first search is free. Sign up with your name, website and email, then a passkey. Your board opens in a minute.</p>
    </footer>}
  </article>;
}
