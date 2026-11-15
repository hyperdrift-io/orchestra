import { TractionTour } from '@/components/TractionTour';
import { TractionDoor } from '@/components/TractionDoor';
import { TractionJourney } from '@/components/TractionJourney';
import { boardHref, continuedUseHref, freeBoard, partnershipHref, startHref, waysOn } from '@/data/traction-offer';
import { featuresIntro, howItWorks, howItWorksHref } from '@/data/traction-features';
import { overview } from '@/data/traction-overview';
import { TractionStartLink } from '@/components/TractionStartLink';

/**
 * The trial starts beside the opening promise, above the film. Founders coming back from a trial board
 * see continued use and a link back to their own board.
 */
export function Traction({ trialApp }: { trialApp?: string } = {}) {
  const from = trialApp ? `?from=${encodeURIComponent(trialApp)}` : '';
  const enquiry = trialApp ? `/traction?from=${encodeURIComponent(trialApp)}&situation=subscription#enquire` : continuedUseHref;
  const tourDoor = trialApp ? { href: enquiry, label: howItWorks.discuss } : { href: startHref(), label: 'Trial Traction →' };
  return <article id="traction" data-offering="" data-product="" data-trial-app={trialApp}>
    <TractionJourney />
    <header>
      <p>{trialApp ? `Traction · ${overview.eyebrow}` : overview.eyebrow}</p>
      {trialApp ? <>
        <h1>Where would you like <em>help next?</em></h1>
        <p data-lead="">Tell us what you tried on your board and where you’d like a hand. We’ll give you a quote for the level of integration you want.</p>
        <div id="your-board" data-start="" data-journey="contact">
          <a href={enquiry} data-primary="">Discuss the next step →</a>
          <p><a href={boardHref(trialApp)}>Back to your board →</a></p>
        </div>
      </> : <>
        <h1>{overview.title}</h1>
        <p data-lead="">{overview.description}</p>
        <div id="trial" data-start="" data-placement="hero_door">
          <TractionStartLink href={tourDoor.href}>{tourDoor.label}</TractionStartLink>
        </div>
      </>}
    </header>
    <section id="value" data-journey="value" aria-label={overview.film.title}>
      {trialApp ? <TractionTour door={tourDoor} /> : <>
        <figure data-growth-film="">
          <video aria-label={overview.film.title} controls playsInline preload="none"
            width="1920" height="1080" poster="/traction/growth-film.jpg">
            <source src="/traction/growth-film-720.mp4" type="video/mp4" media="(max-width: 760px)" />
            <source src="/traction/growth-film.mp4" type="video/mp4" />
            <track kind="captions" srcLang="en" label="English" src="/traction/growth-film.en.vtt" />
          </video>
          <figcaption>{overview.film.caption}</figcaption>
        </figure>
        <details data-film-transcript="">
          <summary>Read the film transcript</summary>
          {overview.film.transcript.map(line => <p key={line}>{line}</p>)}
        </details>
      </>}
    </section>
    <section id="loop" data-journey="features" aria-labelledby="traction-loop-title">
      <header>
        <h2 id="traction-loop-title">{featuresIntro.title}</h2>
        <p data-line="">{featuresIntro.line}</p>
      </header>
      <div>
        <ul data-growth-capabilities="">
          {overview.capabilities.map(item => <li key={item.href}>
            <h3><a href={`${howItWorksHref}${from}#${item.href}`}>{item.title}</a></h3>
            <p>{item.text}</p>
          </li>)}
        </ul>
        <p><a href={`${howItWorksHref}${from}`}>{howItWorks.all}</a></p>
      </div>
    </section>
    {!trialApp && <section id="outreach" data-journey="outreach" aria-labelledby="outreach-title">
      <header>
        <p>One way to use Traction</p>
        <h2 id="outreach-title">{overview.useCase.title}</h2>
        <p>{overview.useCase.lead}</p>
      </header>
      <details>
        <summary>{overview.useCase.action}</summary>
        <TractionTour door={tourDoor} preload="none" />
      </details>
    </section>}
    {!trialApp && <section id="os" data-journey="os" aria-labelledby="os-title">
      <header>
        <p>{overview.os.eyebrow}</p>
        <h2 id="os-title">{overview.os.title}</h2>
        <p>{overview.os.text}</p>
        <a href="/os">{overview.os.link}</a>
      </header>
    </section>}
    <section id="continue" data-journey="continue" aria-labelledby="traction-continue-title">
      <header>
        <h2 id="traction-continue-title">Start with your app</h2>
        <p>{freeBoard.text} {freeBoard.market} {freeBoard.after}</p>
        <a href={`${partnershipHref}#why`}>Why we’re building Traction →</a>
      </header>
      <ul>{waysOn.map(way => <li key={way.slug} id={way.slug} data-journey={way.slug === 'partnership' ? 'partnership' : undefined}>
        <h3>{way.name}</h3>
        <p>{way.text}</p>
        {way.link && <p><a href={way.slug === 'subscription' ? enquiry : trialApp ? `${way.link.href}?from=${encodeURIComponent(trialApp)}` : way.link.href}>{way.link.label}</a></p>}
      </li>)}</ul>
    </section>
    {!trialApp && <TractionDoor />}
  </article>;
}
