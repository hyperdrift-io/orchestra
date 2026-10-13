'use client';

import { useLayoutEffect, useRef, useState } from 'react';

type Mode = 'self' | 'os';

interface WeekEvent {
  id: 'protect' | 'reach' | 'build' | 'learn' | 'run';
  day: string;
  time: string;
  capability: string;
  event: string;
  job: string;
  record: string;
  owner: string;
  agent: string;
  receipt: string;
  decision?: { question: string; basis: string };
}

/** One illustrative week of a live booking app, in the order it happens. Capability names and colours are Orchestra OS's own. */
const week: WeekEvent[] = [
  { id: 'protect', day: 'Mon', time: '07:30', capability: 'Protect & reconcile', event: 'A security advisory names a library the app ships', job: 'Find the fix, test it, deploy it', record: 'In a terminal tab', owner: 'Security owner', agent: 'patches, verifies', receipt: 'Repair verified in production · fix carried to development' },
  { id: 'reach', day: 'Tue', time: '11:00', capability: 'Reach & serve', event: 'A customer can’t finish a booking', job: 'Reproduce, reply, fix', record: 'In your inbox', owner: 'Customer-success owner', agent: 'reproduces, drafts the reply', receipt: 'Reply sent · booking completed', decision: { question: 'Offer the customer a refund?', basis: 'Policy says ask you.' } },
  { id: 'build', day: 'Wed', time: '15:00', capability: 'Build & release', event: 'A small improvement is ready to release', job: 'Test it, ship it, watch it', record: 'In a commit message', owner: 'Release owner', agent: 'runs the release checks', receipt: 'Release checked on the live booking path' },
  { id: 'learn', day: 'Thu', time: '09:00', capability: 'Measure & decide', event: 'Fewer people finish sign-up after Wednesday’s release', job: 'Spot the dip, dig, decide', record: 'In an analytics tab', owner: 'Growth owner', agent: 'traces the change', receipt: 'Sign-up drop traced to the new form · baseline recorded', decision: { question: 'Roll back the form, or fix forward?', basis: 'Evidence attached.' } },
  { id: 'run', day: 'Sat', time: '02:10', capability: 'Run & recover', event: 'The app stops answering', job: 'Wake up, find it, restart it', record: 'In your head', owner: 'On-call engineer', agent: 'restarts, checks', receipt: 'Service restored 02:14 · cause recorded' },
];

const modes = {
  self: { label: 'Run it yourself', count: '5 jobs on you', lane: 'every job', title: 'Five jobs, one person. It works.', text: 'Plenty of founders run a live app exactly like this. The cost is where the week goes: to upkeep instead of customers, with the record of what happened in an inbox, a tab or your head.' },
  os: { label: 'On Orchestra OS', count: '2 decisions for you', lane: 'direction and decisions', title: 'Five jobs handled. Two decisions come back to you.', text: 'Each job has a named owner: an agent does the routine part, a person answers for it, and every action leaves a receipt. What reaches you is the refund and the form, with the evidence attached.' },
} as const;

const flightEasing = 'cubic-bezier(.22, 1, .36, 1)';

/** FLIP: read every card's place before the mode changes, read it again after, and animate the difference with transforms only. */
function useCardFlight(mode: Mode) {
  const root = useRef<HTMLElement>(null);
  const first = useRef(new Map<string, DOMRect>());
  useLayoutEffect(() => {
    const section = root.current;
    const before = first.current;
    if (!section || before.size === 0) return;
    first.current = new Map();
    const cards = [...section.querySelectorAll<HTMLElement>('[data-card]')];
    cards.forEach((card) => card.getAnimations().forEach((animation) => animation.cancel()));
    const after = cards.map((card) => card.getBoundingClientRect());
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cards.forEach((card, index) => {
      const from = before.get(card.dataset.card ?? '');
      if (!from) return;
      const dx = from.left - after[index].left;
      const dy = from.top - after[index].top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      card.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 640, delay: index * 55, easing: flightEasing, fill: 'backwards' });
    });
    section.querySelectorAll<HTMLElement>('[data-decision]').forEach((decision) => decision.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 620, easing: flightEasing, fill: 'backwards' }));
  }, [mode]);
  const capture = () => {
    const places = new Map<string, DOMRect>();
    root.current?.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => places.set(card.dataset.card ?? '', card.getBoundingClientRect()));
    first.current = places;
  };
  return { root, capture };
}

/** One week of operating a live app, carried alone or on Orchestra OS. */
export function OperatingWeek() {
  const [mode, setMode] = useState<Mode>('os');
  const flight = useCardFlight(mode);
  const choose = (next: Mode) => { if (next !== mode) { flight.capture(); setMode(next); } };
  const copy = modes[mode];
  return <section ref={flight.root} data-visual="operating-week" data-mode={mode} aria-label="One week of a live app, run yourself or on Orchestra OS">
    <header><p>WORKED EXAMPLE / ONE WEEK OF A LIVE APP</p><h3>Who carries <em>this week?</em></h3><p>A booking app with paying customers, and five things that happen in one week. Compare who carries them.</p></header>
    <nav aria-label="Choose who carries the week">{(['self', 'os'] as const).map((key) => <button key={key} type="button" aria-pressed={mode === key} onClick={() => choose(key)}>{modes[key].label}<small>{modes[key].count}</small></button>)}</nav>
    <div data-week="">
      <p data-lane="you"><strong>You</strong> · {copy.lane}</p>
      <p data-lane="owners">Who owns each job</p>
      <ol>{week.map((item) => <li key={item.id} data-capability={item.id}>
        <span data-when=""><b>{item.day}</b> {item.time}</span>
        <p data-owner=""><span>{item.capability}</span><strong>{mode === 'os' ? item.owner : 'You'}</strong>{mode === 'os' && <small>+ agent: {item.agent}</small>}</p>
        <article data-card={item.id}>
          <strong>{item.event}</strong>
          {mode === 'self' && <p data-job="">{item.job}</p>}
          <p data-trail=""><span>{mode === 'os' ? <><i aria-hidden="true" />Receipt</> : 'Record'}</span>{mode === 'os' ? item.receipt : item.record}</p>
        </article>
        {mode === 'os' && item.decision && <aside data-decision="" aria-label={`Decision for you, from ${item.capability}`}><span>Your call</span><strong>{item.decision.question}</strong><small>{item.decision.basis}</small></aside>}
      </li>)}</ol>
    </div>
    <p data-outcome="" role="status"><strong>{copy.title}</strong>{copy.text}</p>
    <footer>Illustrative week · owners, scope and readiness agreed per app · not a service-level promise</footer>
  </section>;
}
