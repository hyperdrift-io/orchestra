import { TractionFilm } from '@/components/TractionFilm';
import { TractionWalkthrough } from '@/components/TractionWalkthrough';
import type { TractionInvitation } from '@/lib/traction-invitations';
import { LinkPreview } from '@/components/LinkPreview';
import { TractionWhy, tractionWhyTitle } from '@/components/TractionWhy';

/** An invited founder's next step, beside an explorable example of the work. */
export function Traction({ invitation }: { invitation?: TractionInvitation }) {
  return <article id="traction" data-offering="">
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
        <a href="#enquire" data-enquiry="" data-situation="partnership" data-primary="">Get in touch →</a>
        {!invitation && <p data-reply>Tell us about your app and the people you want to reach. A personal reply within one working day.</p>}
      </div>
      <section id="value" aria-labelledby="traction-work-title">
        <header><h2 id="traction-work-title">Help your app find its market.</h2><p>We work alongside you on strategy, customer relationships and the product experience. Traction keeps that work connected to your goals and to what people actually do with your app.</p></header>
        <TractionFilm />
        <TractionWalkthrough />
        <p data-availability>Early access, set up with you. AI prepares research, drafts and recommendations; we agree the work together.</p>
      </section>
    </div>
    {!invitation && <>
      <section id="partnership" aria-labelledby="traction-partnership-title">
        <header><p>The Traction Partnership</p><h2 id="traction-partnership-title">The work we do together.</h2></header>
        <p>Bring a working product and a sign that people value it: paying customers, people returning, repeat work, or another credible signal of demand. We’ll choose one customer opportunity and agree how to judge the result.</p>
        <p>You bring product knowledge, customer feedback and the decisions. We help with strategy, customer relationships and AI engineering. Scope, costs, ownership and terms are agreed before work starts. An initial conversation creates no commitment.</p>
        <a href="#enquire" data-enquiry="" data-situation="partnership">Discuss your app →</a>
      </section>
      <section id="why" aria-labelledby="traction-why-title">
        <header><h2 id="traction-why-title">{tractionWhyTitle}</h2></header>
        <p>Worthwhile products deserve a chance to reach the people they were made for. Keeping Traction small lets us stay close to that work, learn with each founder and improve the product together.</p>
        <p><LinkPreview href="/about">See who’s behind Orchestra →</LinkPreview></p>
        <details><summary>Our purpose, in full</summary><TractionWhy /></details>
      </section>
    </>}
    <footer id="contact">
      <details><summary>How we’d start</summary><p>We’ll talk about your app, the people you want to reach and where you’d value help. {invitation ? 'Then we’ll' : 'If there’s a fit, we’ll'} set up your workspace and AI access together, with a useful first piece of customer work.</p><p>We’d value your involvement and honest feedback. We’ll shape Traction around what helps you make progress.</p></details>
      {!invitation && <div id="first-read"><p>Prefer a written view of your app first? Get one strength, one constraint and a next customer move, based on its public pages.</p><p><a href="#first-read" data-enquiry="">Ask for a first read →</a> · <a href="/traction/first-read">See a worked example →</a></p></div>}
    </footer>
  </article>;
}
