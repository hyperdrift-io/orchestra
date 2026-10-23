import { TractionFilm } from '@/components/TractionFilm';
import { TractionWalkthrough } from '@/components/TractionWalkthrough';
import type { TractionInvitation } from '@/lib/traction-invitations';
import { LinkPreview } from '@/components/LinkPreview';
import { TractionWhy, tractionWhyTitle } from '@/components/TractionWhy';
import { TractionJourney } from '@/components/TractionJourney';
import { exampleBoardHref } from '@/data/traction-offer';

/** The Traction proposal, read in full before the one door at its end. */
export function Traction({ invitation }: { invitation?: TractionInvitation }) {
  return <article id="traction" data-offering="">
    <TractionJourney />
    <header>
      <p>Traction · A growth partner for your app</p>
      <h1>{invitation ? `Glad you made it, ${invitation.firstName}.` : 'Let’s find your next users.'}</h1>
    </header>
    <div data-offer-body>
      <div data-founder-note>
        <p>{invitation ? `You’ve brought ${invitation.product} this far. Let’s work on what comes next.` : 'Traction brings together a select few founders who are ready to act today.'}</p>
        <p>We’re keeping this small so we can work closely with you. We’ll agree the next useful move for your app and put it into action together.</p>
        <p>You know your product. We’ll help you find the people who need it and learn from what happens when they use it.</p>
        <p>Your feedback will shape Traction as we go. <a href={invitation ? '/traction#why' : '#why'}>Why we’re doing this</a></p>
        <div id="joining" data-joining>
          <h2>How we choose</h2>
          <p>We look for a product that can help people and a founder with a meaningful ambition, reached by introduction or by asking. A conversation settles the rest: whether you own your customers, act on what you learn and want honest feedback. Funding, followers and prestige are not the test. We stay small because a person does the work with each founder.</p>
          <h2>What joining looks like</h2>
          <ol>
            <li><strong>Week 1.</strong> A conversation, and a read of your app.</li>
            <li><strong>Week 2.</strong> Your board, with the first customer move prepared.</li>
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
        <TractionFilm />
        <TractionWalkthrough />
        <p data-availability>Early access, set up with you. AI prepares research, drafts and recommendations; we agree the work together.</p>
      </section>
    </div>
    {!invitation && <>
      <section id="partnership" data-journey="partnership" aria-labelledby="traction-partnership-title">
        <header><p>The Traction Partnership</p><h2 id="traction-partnership-title">The work we do together.</h2></header>
        <p>Bring a working product and a sign that people value it: paying customers, people returning, repeat work, or another credible signal of demand. We’ll choose one customer opportunity and agree how to judge the result.</p>
        <p>You bring product knowledge, customer feedback and the decisions. We help with strategy, customer relationships and AI engineering. Scope, costs, ownership and terms are agreed before work starts. An initial conversation creates no commitment.</p>
      </section>
      <section id="why" data-journey="why" aria-labelledby="traction-why-title">
        <header><h2 id="traction-why-title">{tractionWhyTitle}</h2></header>
        <p>Worthwhile products deserve a chance to reach the people they were made for. Keeping Traction small lets us stay close to that work, learn with each founder and improve the product together.</p>
        <p><LinkPreview href="/about">See who’s behind Orchestra →</LinkPreview></p>
        <details><summary>Our purpose, in full</summary><TractionWhy /></details>
      </section>
    </>}
    {/* The one door, after the proposal: a visitor reads what Traction is before being asked anything. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      {invitation ? <>
        <h2 id="traction-contact-title">Get in touch.</h2>
        <p>We’ll talk about your app, the people you want to reach and where you’d value help. Then we’ll set up your workspace and AI access together, with a useful first piece of customer work.</p>
        <a href="#enquire" data-enquiry="" data-situation="partnership" data-primary="">Get in touch →</a>
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
