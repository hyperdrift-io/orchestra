import { TractionJourney } from '@/components/TractionJourney';
import { continueHref, startHref } from '@/data/traction-offer';
import type { TractionInvitation as Invitation } from '@/lib/traction-invitations';

/**
 * The page a personal invitation lands on, in the order a founder decides:
 * their own product first, then what we would do together, and one door: start free.
 * With a prepared first read, the read is the opening; without one, the page offers it by reply.
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
      <h2 id="together-title">What happens next</h2>
      <ol>
        <li>{read ? 'Your board starts from this read. Traction proposes the first move; you choose it.' : `Traction reads ${product} and proposes the first move; you choose it.`}</li>
        <li>Traction prepares the work on your own board: who to reach, what to say and when. Nothing is sent without your yes.</li>
        <li>Every reply and result lands on the board, so the next move comes from what actually happened.</li>
      </ol>
      <p><a href={continueHref}>How Traction continues after day one →</a></p>
    </section>

    {/* The one door, after the proposal. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      <h2 id="traction-contact-title">Start free.</h2>
      <p>{`Your name, ${product}’s address and your email, then a passkey. Your board opens straight away.`}</p>
      <a href={startHref(invitation.ref)} data-primary="">Start free →</a>
      <p>{read ? 'Or reply to Yann’s email to know more, or to have us do the customer work with you.' : `Or reply to Yann’s email for a first read of ${product}, or to have us do the customer work with you.`}</p>
    </footer>
  </article>;
}
