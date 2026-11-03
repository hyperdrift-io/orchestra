import { TractionJourney } from '@/components/TractionJourney';
import { exampleBoardHref } from '@/data/traction-offer';
import type { TractionInvitation as Invitation } from '@/lib/traction-invitations';

/**
 * The page a personal invitation lands on, in the order a founder decides:
 * their own product first, then what we would do together, the two ways to work with us, and one door.
 * With a prepared first read, the read is the opening; without one, the page offers it at the door.
 */
export function TractionInvitation({ invitation }: { invitation: Invitation }) {
  const { firstName, product, audience, read } = invitation;
  return <article id="traction" data-offering="" data-invitation="" data-invite-ref={invitation.ref} data-page-variant={invitation.variant}>
    <TractionJourney />
    <header>
      <p>Traction · for {product}</p>
      <h1>{read ? `${firstName}, here’s a first read of ${product}.` : `${firstName}, let’s get ${product} to the ${audience || 'people'} it’s made for.`}</h1>
      <p data-lead="">{read
        ? `We read ${product}’s public pages on ${read.on}, the way a new customer meets them. One strength, one thing in the way, and the customer move we’d make next.`
        : 'Traction is how we’d do it with you: one customer move at a time, prepared on your own board, decided by you.'}</p>
    </header>

    {read && <section id="read" data-journey="read" aria-label={`First read of ${product}`}>
      <ol>{read.findings.map((finding) => <li key={finding.label}>
        <p>{finding.label}</p>
        <div>
          <h2>{finding.headline}</h2>
          <p>{finding.detail}</p>
          {finding.sources.length > 0 && <p data-sources="">Read on {finding.sources.map((item, index) => <span key={item.href}>{index > 0 && ' · '}<a href={item.href} rel="noopener noreferrer" target="_blank">{item.label}</a></span>)}</p>}
        </div>
      </li>)}</ol>
    </section>}

    <section id="together" data-journey="value" aria-labelledby="together-title">
      <h2 id="together-title">{read ? 'What we’d do together' : 'How it works'}</h2>
      <ol>
        <li>We agree the first move with you{read ? ': this one, or the one you’d rather make.' : ', from a read of your product and what you already know about your customers.'}</li>
        <li>Traction prepares the work on your own board: who to reach, what to say and when. Nothing is sent without your yes.</li>
        <li>Every reply and result lands on the board, so the next move comes from what actually happened.</li>
      </ol>
      <p><a href={exampleBoardHref}>See Traction at work on an example board →</a> <small>A fictional startup on the real product.</small></p>
    </section>

    <section id="ways" data-journey="partnership" aria-labelledby="ways-title">
      <h2 id="ways-title">Two ways to work with us</h2>
      <dl>
        <div><dt>Traction</dt><dd>Your own board, with AI preparing each move. We set it up with you, and your team runs it.</dd></div>
        <div><dt>The Traction Partnership</dt><dd>We take on the customer work with you, move by move, from the first conversation to paying customers.</dd></div>
      </dl>
      <p>We agree which fits, and what it costs, when we talk. <a href="/traction/why">Why we’re doing this</a></p>
    </section>

    {/* The one door, after the proposal. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      <h2 id="traction-contact-title">Get in touch.</h2>
      <p>{read ? 'Tell us which way suits you, or what the read got wrong.' : `Tell us which way suits you, or ask for a first read of ${product} before deciding.`}</p>
      <a href="#enquire" data-enquiry="" data-primary="">Get in touch →</a>
      <p>Or reply to Yann’s email. It reaches the same inbox.</p>
    </footer>
  </article>;
}
