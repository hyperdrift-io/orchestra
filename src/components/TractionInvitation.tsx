import { TractionJourney } from '@/components/TractionJourney';
import { TractionLiveRead } from '@/components/TractionLiveRead';
import { continueHref, startHref } from '@/data/traction-offer';
import type { TractionInvitation as Invitation } from '@/lib/traction-invitations';
import type { LiveRead } from '@/lib/traction-read';

/**
 * The page a personal invitation lands on, in the order a founder decides: their own product first, then what we
 * would do together, and one door: their own board. With the app's address, the read is made as they land and the
 * board opens on it; an older entry shows the read prepared for it, or offers one by reply.
 */
export function TractionInvitation({ invitation, token, live }: { invitation: Invitation; token: string; live?: LiveRead }) {
  const { firstName, product, audience, read, url } = invitation;
  const host = url ? new URL(url).hostname.replace(/^www\./, '') : '';
  const reading = Boolean(url) || Boolean(read);
  return <article id="traction" data-offering="" data-invitation="" data-invite-ref={invitation.ref} data-page-variant={invitation.variant}>
    <TractionJourney />
    <header>
      <p>Traction · for {product}</p>
      <h1>{reading ? `${firstName}, here’s a first read of ${product}.` : `${firstName}, let’s get ${product} to the ${audience || 'people'} it’s made for.`}</h1>
      <p data-lead="">{url
        ? `From ${product}’s public pages, the way a new customer meets them: one strength, one thing in the way, and the customer move we’d make next.`
        : read
          ? `We read ${product}’s public pages on ${read.on}, the way a new customer meets them. One strength, one thing in the way, and the customer move we’d make next.`
          : 'Traction is how we’d do it with you: one customer move at a time, prepared on your own board, decided by you.'}</p>
    </header>

    {url ? <TractionLiveRead token={token} product={product} host={host} initial={live} />
      : read && <section id="read" data-journey="read" aria-label={`First read of ${product}`}>
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
        <li>{url ? 'Your board opens on this read. Traction proposes the first move; you choose it.'
          : read ? `Your board opens on a fresh read of ${product}. Traction proposes the first move; you choose it.`
            : `Traction reads ${product} and proposes the first move; you choose it.`}</li>
        <li>Traction prepares the work on your own board: who to reach, what to say and when. Nothing is sent without your yes.</li>
        <li>Every reply and result lands on the board, so the next move comes from what actually happened.</li>
      </ol>
      <p><a href={continueHref}>How Traction continues after day one →</a></p>
    </section>

    {/* The one door, after the proposal: their own board. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      <h2 id="traction-contact-title">{`Open ${product}’s Traction board.`}</h2>
      <p>{url ? 'It opens on this read. Your name and your email, then a passkey.' : `Your name, ${product}’s address and your email, then a passkey.`}</p>
      <a href={startHref(invitation.ref, url ? { url, product } : undefined)} data-primary="">{`Open ${product}’s Traction board now →`}</a>
      <p>{reading ? 'Or reply to Yann’s email to know more, or to have us do the customer work with you.' : `Or reply to Yann’s email for a first read of ${product}, or to have us do the customer work with you.`}</p>
    </footer>
  </article>;
}
