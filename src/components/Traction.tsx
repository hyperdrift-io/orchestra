import { TractionWalkthrough } from '@/components/TractionWalkthrough';
import type { TractionInvitation } from '@/lib/traction-invitations';

/** A personal welcome beside the work, without a campaign page's scrolling sequence. */
export function Traction({ invitation }: { invitation?: TractionInvitation }) {
  return <article id="traction" data-offering="">
    <header>
      <p>Traction · Your AI CRM and growth strategist</p>
      <h1>{invitation ? `Glad you made it, ${invitation.firstName}.` : 'Let’s find your next customers.'}</h1>
    </header>
    <div data-offer-body>
      <div data-founder-note>
        <p>{invitation?.welcome || 'I’m bringing together founders whose products I believe in. I want to help you get yours to the people it’s made for.'}</p>
        <p>I’ll tailor the process to your goals, so we can see what gets people interested and turn them into active users.</p>
        <p>Traction keeps your prospects, conversations and follow-ups together. AI researches who to approach, drafts introductions in your voice and helps you decide what to do next from customer feedback.</p>
        <p>{invitation ? 'Reply to my email' : 'Tell me what you’re building'}, and let’s talk about where you want to take it. I’d be happy to speak by phone or meet in London.</p>
        <p data-signature>Yann</p>
        <a href="#enquire" data-enquiry="" data-situation="partnership" data-primary="">Talk to Yann →</a>
      </div>
      <section id="value" aria-labelledby="traction-work-title">
        <header><h2 id="traction-work-title">Take a look inside.</h2><p>Explore an example. You choose the people, the wording and the work.</p></header>
        <TractionWalkthrough />
        <p data-availability>Fictional example · Early access, set up with you. AI prepares drafts; sending stays in your hands.</p>
      </section>
    </div>
    <footer id="contact">
      <details><summary>How we’d start</summary><p>We’ll talk about your app, the people you want to reach and where you’d value help. If there’s a fit, we’ll set up your workspace and AI access together, with a useful first piece of customer work.</p><p>We agree any further work together. Your first conversation is a chance to get to know each other.</p></details>
      <p>Prefer a written view of your app first? <a href="#first-read" data-enquiry="">Ask for a first read →</a></p>
    </footer>
  </article>;
}
