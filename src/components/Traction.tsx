import { TractionTour } from '@/components/TractionTour';
import { TractionJourney } from '@/components/TractionJourney';
import { boardHref, freeBoard, partnershipHref, startHref, waysOn } from '@/data/traction-offer';

/** What a first day leaves on a founder's board: Traction's part, beside the founder's form, two clicks and a sentence. */
const dayOne = [
  { name: 'A read of your app.', text: 'What works, what’s in the way and the move to make first, each from your own pages.' },
  { name: 'Five researched prospects.', text: 'Businesses chosen from what their own pages say, with the evidence for each. Their interest stays unconfirmed until they reply.' },
  { name: 'A first email to each, in your voice.', text: 'Approve, and they go to your CRM, ready for you to send.' },
  { name: 'A plan from one sentence.', text: 'Say what you want and by when. The Growth Manager drafts the work and waits for your yes.' },
  { name: 'Your market, once a day.', text: 'One read a day when you ask for it: each story once, with its source, so you see what changed.' },
];

/** How a founder stays in charge, each line true of the board today. */
const control = [
  'You approve every email. Drafts wait in your CRM until you send them.',
  'Every finding names the page it came from, so you can check it.',
  'It says what it doesn’t know: a prospect’s interest stays unconfirmed until they reply.',
  'We run Traction’s own launch on it. The market in the film is our own board.',
];

/**
 * What Traction is and how it starts: the promise, the film of the engine at work, why it exists, what a first day leaves
 * on your board, how you stay in charge, the two ways on and the door. The door is defined once and offered in the same
 * words twice: on the film's last frame, where a watcher decides, and at the page's end, where a reader does.
 * `trialApp` is the free board a founder came from (`?from=<app id>`): the page then speaks to where they are, and its
 * door takes them back to their board, where the subscription is proposed. No form here.
 */
export function Traction({ trialApp }: { trialApp?: string } = {}) {
  const door = trialApp ? { href: boardHref(trialApp), label: 'Open your board →' } : { href: startHref(), label: 'See Traction in action →' };
  return <article id="traction" data-offering="" data-product="" data-trial-app={trialApp}>
    <TractionJourney />
    <header>
      <p>Traction · Growth engine for your app</p>
      <h1>Let’s find your <em>next users.</em></h1>
      <p data-lead="">Traction is an engine that reads your app, finds what’s in the way and prepares your next customer move. You decide.</p>
    </header>
    <section id="value" data-journey="value" aria-label="Traction at work">
      <TractionTour door={door} />
    </section>
    <section id="context" data-journey="context" aria-labelledby="traction-context-title">
      <header>
        <p>Why it exists</p>
        <h2 id="traction-context-title">Too many good apps never find their market.</h2>
      </header>
      <div>
        <p>AI puts building an app within reach of a small team. The customer work around it still takes hours a founder doesn’t have: seeing the app as a stranger does, finding the people who need it, writing to each of them and keeping up with the market.</p>
        <p>Traction does that work with you, on a board that keeps the evidence. It’s for founders with a live app and no growth team yet.</p>
      </div>
    </section>
    <section id="day-one" data-journey="day-one" aria-labelledby="traction-day-one-title">
      <header>
        <p>Day one</p>
        <h2 id="traction-day-one-title">One form, two clicks, one sentence.</h2>
      </header>
      <div>
        <p>That was the founder’s part in the film. Traction’s part is what your first day leaves on your board:</p>
        <ul>{dayOne.map((item) => <li key={item.name}><strong>{item.name}</strong> {item.text}</li>)}</ul>
      </div>
    </section>
    <section id="control" data-journey="control" aria-labelledby="traction-control-title">
      <header>
        <p>You decide</p>
        <h2 id="traction-control-title">Nothing leaves without your yes.</h2>
      </header>
      <ul>{control.map((line) => <li key={line}>{line}</li>)}</ul>
    </section>
    {/* How the free board continues: two ways on, stated once. Links only; the door follows. */}
    <section id="continue" data-journey="continue" aria-labelledby="traction-continue-title">
      <header>
        <p>How it continues</p>
        <h2 id="traction-continue-title">Free to start. Two ways on.</h2>
        <p>{trialApp ? 'You’re on the free board. Nothing changes until you choose.' : freeBoard.text}</p>
      </header>
      <ul>{waysOn.map((way) => <li key={way.slug} id={way.slug} data-journey={way.slug === 'partnership' ? 'partnership' : undefined}>
        <h3>{way.name}</h3>
        <p>{way.text}</p>
        {way.link && <p><a href={way.link.href}>{way.link.label}</a></p>}
      </li>)}</ul>
    </section>
    {/* The door, after the proposal, in the same words the film's last frame carries. A free board's founder goes back to
        the board, where both ways on are offered with the price. */}
    <footer id="contact" data-journey="contact" aria-labelledby="traction-contact-title">
      {trialApp ? <>
        <h2 id="traction-contact-title">Continue on your board.</h2>
        <p>Both ways on are there, with the price.</p>
      </> : <>
        <h2 id="traction-contact-title">Make Traction work for you, now.</h2>
        <p>On your own app, free. Your name, your app and your email, then a passkey.</p>
      </>}
      <a href={door.href} data-primary="">{door.label}</a>
      {/* The reason, not a second door. */}
      {!trialApp && <p data-samples=""><a href={`${partnershipHref}#why`}>Why we’re building Traction →</a></p>}
    </footer>
  </article>;
}
