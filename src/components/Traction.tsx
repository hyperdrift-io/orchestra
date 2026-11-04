import { TractionFilm } from '@/components/TractionFilm';
import { TractionTour } from '@/components/TractionTour';
import { TractionWalkthrough } from '@/components/TractionWalkthrough';
import { LinkPreview } from '@/components/LinkPreview';
import { TractionWhy, tractionWhyTitle } from '@/components/TractionWhy';
import { TractionJourney } from '@/components/TractionJourney';
import { exampleBoardHref, ladder } from '@/data/traction-offer';

/**
 * The Traction proposal, read in full before the one door at its end.
 * `trialApp` is the free board a founder came from (`?from=<app id>`): the options then start from where they are,
 * and the door continues their board instead of asking for an introduction they have already made.
 */
export function Traction({ trialApp }: { trialApp?: string } = {}) {
  const trial = Boolean(trialApp);
  return <article id="traction" data-offering="" data-trial-app={trialApp}>
    <TractionJourney />
    <header>
      <p>Traction · A growth partner for your app</p>
      <h1>Let’s find your next users.</h1>
    </header>
    <div data-offer-body>
      <div data-founder-note>
        <p>Traction brings together a select few founders who are ready to act today.</p>
        <p>We’re keeping this small so we can work closely with you. We’ll agree the next useful move for your app and put it into action together.</p>
        <p>You know your product. We’ll help you find the people who need it and learn from what happens when they use it.</p>
        <p>Your feedback will shape Traction as we go. <a href="#why">Why we’re doing this</a></p>
        <div id="joining" data-joining>
          <h2>How we choose</h2>
          <p>We look for a product that can help people and a founder with a meaningful ambition, reached by introduction or by asking. A conversation settles the rest: whether you own your customers, act on what you learn and want honest feedback. Funding, followers and prestige are not the test. We stay small because a person does the work with each founder.</p>
          <h2>What joining looks like</h2>
          <ol>
            <li><strong>Introduce your app.</strong> We read it the way a new customer meets it.</li>
            <li><strong>Day one.</strong> Your first read, your own board and the first move proposed. Free.</li>
            <li><strong>Then</strong> one move at a time. You decide; we help with the work.</li>
          </ol>
          <h2>What we ask</h2>
          <ul>
            <li>You own your customers.</li>
            <li>You act within the week.</li>
            <li>You tell us what doesn’t work.</li>
            <li>You help another founder when it fits.</li>
          </ul>
        </div>
      </div>
      <section id="value" data-journey="value" aria-labelledby="traction-work-title">
        <header><h2 id="traction-work-title">Help your app find its market.</h2><p>We work alongside you on strategy, customer relationships and the product experience. Traction keeps that work connected to your goals and to what people actually do with your app.</p></header>
        <TractionTour />
        <details data-traction-film-more><summary>Or watch the 57-second film</summary><TractionFilm /></details>
        <TractionWalkthrough />
        <p data-availability>Early access, set up with you. AI prepares research, drafts and recommendations; we agree the work together.</p>
      </section>
    </div>
    {/* How Traction continues: the three steps, stated once, in the order a founder takes them. Links only; the door follows. */}
    <section id="continue" data-journey="continue" aria-labelledby="traction-continue-title">
      <header>
        <p>Three steps</p>
        <h2 id="traction-continue-title">How Traction continues.</h2>
        <p>{trial
          ? 'You’re on the free board. Here is how it continues, when you’re ready. Each step is yours to take; none is a deadline.'
          : 'Start free, continue when your board earns it, bring us in when the work needs more hands. Each step is yours to take; none is a deadline.'}</p>
      </header>
      <ol>{ladder.map((step, index) => {
        const current = trial && step.slug === 'start-free';
        return <li key={step.slug} id={step.slug} aria-current={current ? 'step' : undefined} data-journey={step.slug === 'partnership' ? 'partnership' : undefined}>
          <p>{current ? 'Your board today' : `Step ${index + 1}`}</p>
          <h3>{step.name}</h3>
          <dl>
            <dt>You get</dt><dd>{step.get}</dd>
            <dt>You bring</dt><dd>{step.bring}</dd>
            <dt>It fits when</dt><dd>{step.fits}</dd>
          </dl>
        </li>;
      })}</ol>
    </section>
    <section id="why" data-journey="why" aria-labelledby="traction-why-title">
      <header><h2 id="traction-why-title">{tractionWhyTitle}</h2></header>
      <p>Worthwhile products deserve a chance to reach the people they were made for. Keeping Traction small lets us stay close to that work, learn with each founder and improve the product together.</p>
      <p><LinkPreview href="/about">See who’s behind Orchestra →</LinkPreview></p>
      <details><summary>Our purpose, in full</summary><TractionWhy /></details>
    </section>
    {/* The one door, after the proposal: a visitor reads what Traction is before being asked anything. A free board's founder continues theirs. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      {trial ? <>
        <h2 id="traction-contact-title">Continue when you’re ready.</h2>
        <p>Tell us which step fits and what the free board has shown you so far. Your board and its records carry over as they are; we agree what it costs when we talk.</p>
        <a href="#enquire" data-enquiry="" data-situation="continue" data-continue="" data-primary="">Continue with Traction →</a>
      </> : <>
        <h2 id="traction-contact-title">Introduce your app.</h2>
        <p>Send us the link, who it’s for and what you want next. We’ll read it the way a new customer meets it and come back with one strength, one constraint and the next customer move.</p>
        <a href="#enquire" data-enquiry="" data-situation="partnership" data-introduce="" data-primary="">Introduce your app →</a>
        {/* Samples, not a second door: a first read, and an invented startup's board with a narrated tour on Traction itself. */}
        <p data-samples><a href="/traction/first-read">See what a first read looks like →</a><a href={exampleBoardHref}>See Traction at work on an example board →</a></p>
      </>}
    </footer>
  </article>;
}
