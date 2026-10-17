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
        <p>Your feedback will shape Traction as we go. <LinkPreview href="/traction/why" content={{ title: tractionWhyTitle, publisher: 'Orchestra · Traction', view: { kind: 'content', body: <TractionWhy /> } }}>Why we’re doing this</LinkPreview></p>
        <a href="#enquire" data-enquiry="" data-situation="partnership" data-primary="">Get in touch →</a>
      </div>
      <section id="value" aria-labelledby="traction-work-title">
        <header><h2 id="traction-work-title">Help your app find its market.</h2><p>We work alongside you on strategy, customer relationships and the product experience. Traction keeps that work connected to your goals and to what people actually do with your app.</p></header>
        <TractionWalkthrough />
        <p data-availability>Early access, set up with you. AI prepares research, drafts and recommendations; we agree the work together.</p>
      </section>
    </div>
    <footer id="contact">
      <details><summary>How we’d start</summary><p>We’ll talk about your app, the people you want to reach and where you’d value help. {invitation ? 'Then we’ll' : 'If there’s a fit, we’ll'} set up your workspace and AI access together, with a useful first piece of customer work.</p><p>We’d value your involvement and honest feedback. We’ll shape Traction around what helps you make progress.</p></details>
      {!invitation && <p>Prefer a written view of your app first? <a href="#first-read" data-enquiry="">Ask for a first read →</a></p>}
    </footer>
  </article>;
}
