import { TractionWhy, tractionWhyTitle } from '@/components/TractionWhy';
import { TractionJourney } from '@/components/TractionJourney';

/** How we work with a founder, said once: what we do together, what we ask, why, how it starts, then one door.
 * Traction gives an app its growth team; the Partnership adds ours beside it, on the same board. */
export function TractionPartnership({ trialApp }: { trialApp?: string } = {}) {
  return <article id="traction" data-offering="" data-partnership="" data-trial-app={trialApp}>
    <TractionJourney />
    <header>
      <p>The Traction Partnership</p>
      <h1>How we work <em>with you.</em></h1>
      <p data-lead="">Traction gives your app a growth team. The Partnership adds ours: people who work in strategy, customer relationships and AI engineering, beside you on your board.</p>
    </header>
    <section id="value" data-journey="value" aria-labelledby="traction-work-title">
      <header><h2 id="traction-work-title">What we do together.</h2></header>
      <ul>
        <li><strong>Choose the move.</strong> One customer opportunity at a time, picked from the evidence on your board. We agree how to judge it and who does what before we start.</li>
        <li><strong>Do the work.</strong> Research, outreach and customer conversations, done with you. Engineering when a move needs your product to change.</li>
        <li><strong>Measure it.</strong> Every move and its result sit on the same board, so the outcome is yours to inspect.</li>
      </ul>
      <p>AI prepares the research, the drafts and the recommendations. People agree the work with you, and you decide.</p>
    </section>
    <section id="partnership" data-journey="partnership" aria-labelledby="traction-partnership-title">
      <header><h2 id="traction-partnership-title">What we ask.</h2></header>
      <ul>
        <li>A working product, and a sign that people value it: paying customers, people coming back, repeat work.</li>
        <li>You own your customers.</li>
        <li>You act within the week.</li>
        <li>You tell us what doesn’t work.</li>
        <li>You help another founder when it fits.</li>
      </ul>
    </section>
    <section id="why" data-journey="why" aria-labelledby="traction-why-title">
      <header><h2 id="traction-why-title">{tractionWhyTitle}</h2></header>
      <TractionWhy />
    </section>
    <section id="joining" data-journey="joining" aria-labelledby="traction-joining-title">
      <header><h2 id="traction-joining-title">How it starts.</h2></header>
      <ol>
        <li><span><strong>Your board, free.</strong> Your website review is ready the day you sign up. A board you already have carries over as it is.</span></li>
        <li><span><strong>A conversation.</strong> Scope, costs, ownership and terms are agreed before any work starts, and the conversation commits you to nothing.</span></li>
      </ol>
    </section>
    {/* The one door, after the proposal: a visitor reads how we work before being asked anything. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      <h2 id="traction-contact-title">{trialApp ? 'Build on your first move.' : 'Introduce your app.'}</h2>
      <p>{trialApp ? 'Tell us what the first move showed and where you want help. We’ll agree which customers to approach and how we can help.' : 'Send us the link, who it’s for and what you want next. We’ll reply within one working day to arrange the conversation.'}</p>
      <a href="#enquire" data-enquiry="" data-situation="partnership" data-introduce={trialApp ? undefined : ''} data-primary="">{trialApp ? 'Discuss working together →' : 'Introduce your app →'}</a>
    </footer>
  </article>;
}
