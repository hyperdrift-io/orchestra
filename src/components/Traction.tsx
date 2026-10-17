import { TractionWalkthrough } from '@/components/TractionWalkthrough';
import type { TractionInvitation } from '@/lib/traction-invitations';
import { LinkPreview } from '@/components/LinkPreview';
import { TractionWhy, tractionWhyTitle } from '@/components/TractionWhy';

/** A personal welcome beside the work, without a campaign page's scrolling sequence. */
export function Traction({ invitation }: { invitation?: TractionInvitation }) {
  return <article id="traction" data-offering="">
    <header>
      <p>Traction · Your AI CRM and growth strategist</p>
      <h1>{invitation ? `Glad you made it, ${invitation.firstName}.` : 'Let’s find your next users.'}</h1>
    </header>
    <div data-offer-body>
      <div data-founder-note>
        <p>{invitation?.welcome || 'I’m bringing together founders whose products I believe in. I want to help you get yours to the people it’s made for.'}</p>
        <p>I’ve built things I believed in that never reached the people they were for. I want founders like us to help each other change that. <LinkPreview href="/traction/why" content={{ title: tractionWhyTitle, publisher: 'Yann · Founder of Traction', view: { kind: 'content', body: <TractionWhy /> } }}>Why I’m doing this</LinkPreview></p>
        <p>I’ll tailor the process to your goals, so we can see what gets people interested and turn them into active users.</p>
        <p>{invitation ? 'Reply to my email' : 'Tell me what you’re building'}, and let’s talk about where you want to take it. I’d be happy to speak by phone or meet in London.</p>
        <p data-signature>Yann</p>
        <a href="#enquire" data-enquiry="" data-situation="partnership" data-primary="">Talk to Yann →</a>
      </div>
      <section id="value" aria-labelledby="traction-work-title">
        <header><h2 id="traction-work-title">Take a look inside.</h2><p>Research who to approach, prepare an introduction in your voice and decide what to work on from customer feedback.</p></header>
        <TractionWalkthrough />
        <p data-availability>Fictional example · Early access, set up with you. AI prepares drafts; sending stays in your hands.</p>
      </section>
    </div>
    <footer id="contact">
      <details><summary>How we’d start</summary><p>We’ll talk about your app, the people you want to reach and where you’d value help. If there’s a fit, we’ll set up your workspace and AI access together, with a useful first piece of customer work.</p><p>I’d value your involvement and honest feedback. We’ll shape Traction around what helps you make progress.</p></details>
      <p>Prefer a written view of your app first? <a href="#first-read" data-enquiry="">Ask for a first read →</a></p>
    </footer>
  </article>;
}
