import { TractionStartLink } from '@/components/TractionStartLink';
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
  return <article id="traction" data-offering="" data-invitation="" data-invite-ref={invitation.ref} data-page-variant={invitation.variant}>
    <TractionJourney />
    <header>
      <p>Traction · for {product}</p>
      <h1>{audience ? `${firstName}, let’s help ${product} reach ${audience}.` : `${firstName}, let’s find ${product}’s next users.`}</h1>
      <p data-lead="">{url
        ? `The review looks at ${product}’s website through a new customer’s eyes. What works, where might they hesitate and what could you try first?`
        : read
          ? `We read ${product}’s website on ${read.on}. Here’s what works, what might put a customer off and what we’d try next.`
          : `Traction reads ${product}’s website. You can then ask it to find potential customers and draft a first email for you to review.`}</p>
      <div id="your-board" data-start="" data-journey="contact">
        <TractionStartLink href={startHref(invitation.ref, url ? { url, product } : undefined)}>{`Open ${product}’s Traction board now →`}</TractionStartLink>
        <p>{url ? 'It opens as a trial board. We’ve filled in the website. Add your name and email, then create a passkey.' : 'It opens as a trial board. Sign up with your name, website and email, then a passkey.'}</p>
      </div>
    </header>

    {url ? <TractionLiveRead token={token} product={product} host={host} initial={live} />
      : read && <section id="read" data-journey="read" aria-label={`First impression of ${product}`}>
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
        <li>{url ? `Your board uses the review of ${product}’s website. You can open it while the review runs.` : `Your board starts with a fresh read of ${product}’s website.`}</li>
        <li>Choose a customer search. Traction shows you potential matches, why each might fit and a draft email. You decide who to contact.</li>
      </ol>
      <p>Prefer to talk it through? Reply to Yann’s email.</p>
      <p><a href={continueHref}>How Traction continues after the trial →</a></p>
    </section>
  </article>;
}
