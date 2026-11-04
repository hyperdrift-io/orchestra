import { LinkPreview } from '@/components/LinkPreview';
import { TractionWhy, tractionWhyTitle } from '@/components/TractionWhy';
import { TractionJourney } from '@/components/TractionJourney';

/** How we work with a founder: the question prospects ask first, answered in full, with one door at the end. */
export function TractionPartnership() {
  return <article id="traction" data-offering="" data-partnership="">
    <TractionJourney />
    <header>
      <p>The Traction Partnership</p>
      <h1>How we work with you.</h1>
      <p data-lead="">We do the customer work with you, move by move, from the first conversation to paying customers, on your Traction board. Here is what that looks like, how it starts and what we ask.</p>
    </header>
    <div data-founder-note>
      <p>We work with a few founders at a time, because a person does the work with each one.</p>
      <p>We’ll agree the next useful move for your app and put it into action together. You know your product. We’ll help you find the people who need it and learn from what happens when they use it.</p>
      <p>Your feedback will shape Traction as we go. <a href="#why">Why we’re doing this</a></p>
      <div id="joining" data-joining>
        <h2>How we choose</h2>
        <p>We look for a product that can help people and a founder with a meaningful ambition, reached by introduction or by asking. A conversation settles the rest: whether you own your customers, act on what you learn and want honest feedback. Funding, followers and prestige are not the test. We stay small because a person does the work with each founder.</p>
        <h2>How it starts</h2>
        <ol>
          <li><strong>Introduce your app.</strong> We read it the way a new customer meets it and come back with one strength, one constraint and the next customer move.</li>
          <li><strong>A conversation.</strong> We choose one customer opportunity and agree how to judge the result. Scope, costs, ownership and terms are agreed before work starts; the conversation itself commits you to nothing.</li>
          <li><strong>Then</strong> one move at a time, on your board. You decide; we do the work with you.</li>
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
      <header><h2 id="traction-work-title">What we work on with you.</h2></header>
      <p>Direction, customers, first use and lasting value: the four areas your Traction board holds. AI prepares research, drafts and recommendations; we agree the work together and you decide.</p>
    </section>
    <section id="partnership" data-journey="partnership" aria-labelledby="traction-partnership-title">
      <header><h2 id="traction-partnership-title">What you bring, and what you get.</h2></header>
      <p>Bring a working product and a sign that people value it: paying customers, people returning, repeat work, or another credible signal of demand. You bring product knowledge, customer feedback and the decisions.</p>
      <p>We bring strategy, customer relationships and AI engineering, and we measure every move on the same board, so the result is yours to inspect. Already on a free board? It carries over as it is.</p>
    </section>
    <section id="why" data-journey="why" aria-labelledby="traction-why-title">
      <header><h2 id="traction-why-title">{tractionWhyTitle}</h2></header>
      <p>Worthwhile products deserve a chance to reach the people they were made for. Keeping Traction small lets us stay close to that work, learn with each founder and improve the product together.</p>
      <p><LinkPreview href="/about">See who’s behind Orchestra →</LinkPreview></p>
      <details><summary>Our purpose, in full</summary><TractionWhy /></details>
    </section>
    {/* The one door, after the proposal: a visitor reads how we work before being asked anything. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      <h2 id="traction-contact-title">Introduce your app.</h2>
      <p>Send us the link, who it’s for and what you want next. We’ll read it the way a new customer meets it and come back with one strength, one constraint and the next customer move.</p>
      <a href="#enquire" data-enquiry="" data-situation="partnership" data-introduce="" data-primary="">Introduce your app →</a>
      <p data-samples=""><a href="/traction">What Traction is →</a></p>
    </footer>
  </article>;
}
