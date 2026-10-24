'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * A peek into Traction: real screenshots from our own Orchestra board, 24 October 2026,
 * in the order the work moved. The rail mirrors the board's own progress strip.
 * Server render and no-JS readers get the first step with every step listed; with motion
 * allowed the steps advance while the figure is on screen, and stop on any choice.
 */

const steps = [
  { id: 'ask', rail: 'You ask', time: 'One box', src: '/articles/traction-peek/ask.webp', width: 1480, height: 460,
    alt: 'Traction’s Growth Manager composer: Your message, What should we focus on, and what evidence supports it? Send as Question, Ask GM. Questions investigate. Proposals come back for review. Work requests authorise action.',
    text: 'A question investigates and changes nothing. A proposal comes back for review. A work request authorises action.' },
  { id: 'queued', rail: 'Saved', time: '04:45', src: '/articles/traction-peek/queued.webp', width: 1512, height: 788,
    alt: 'The Orchestra board in Traction. Growth Manager, current activity: Queued for GM. Message saved is lit; GM working, Builder handoff, Builder working and Result ready wait.',
    text: '04:45. The request is saved on the board before anything runs. Everyone looking at the app sees the same state.' },
  { id: 'working', rail: 'GM working', time: '04:47', src: '/articles/traction-peek/gm-working.webp', width: 1512, height: 788,
    alt: 'The same board two minutes later: GM is working. New messages join the queue. Message saved is ticked and GM working is lit.',
    text: '04:47. The Growth Manager reads the app’s evidence and decides. The strip moves on its own while the page is open.' },
  { id: 'result', rail: 'Delivered', time: 'Builder', src: '/articles/traction-peek/result.webp', width: 1480, height: 300,
    alt: 'A completed Builder result on the board: Completed, Builder, 24 October 04:30. Repair Integrated Fleet internal links and canonical sitemap target. Delivered and independently verified 24 October 2026, with the release, checks and links it verified.',
    text: 'Earlier that morning, at 04:30, a Builder result landed on the same board with its evidence in the receipt. It repaired the links pointing to this article.' },
] as const;

const BEAT = 5200;

export function TractionPeek() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const read = () => setStill(query.matches);
    read();
    query.addEventListener('change', read);
    const section = root.current;
    const watcher = section && 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 }) : null;
    if (section && watcher) watcher.observe(section);
    return () => { query.removeEventListener('change', read); watcher?.disconnect(); };
  }, []);

  const playing = visible && !chosen && !still;
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % steps.length), BEAT);
    return () => clearInterval(timer);
  }, [playing]);

  const step = steps[active];
  return <section ref={root} data-visual="traction-peek" data-step={step.id} data-playing={playing || undefined} aria-label="A peek into Traction: one request moving across the Orchestra board">
    <ol data-peek-rail="" role="tablist" aria-label="Where the request stands">
      {steps.map((item, index) => <li key={item.id} data-state={index < active ? 'done' : index === active ? 'now' : 'next'}>
        <button type="button" role="tab" aria-selected={index === active} aria-controls="peek-shot" onClick={() => { setActive(index); setChosen(true); }}>
          <span data-mark="" aria-hidden="true">{index < active ? '✓' : ''}</span>
          <strong>{item.rail}</strong>
          <small>{item.time}</small>
        </button>
      </li>)}
    </ol>

    <div data-peek-window="" id="peek-shot" role="tabpanel">
      <div data-peek-bar="" aria-hidden="true"><i /><i /><i /><span>traction.hyperdrift.io/app/orchestra</span></div>
      <div data-peek-stage="" style={{ aspectRatio: '1512 / 788' }}>
        {steps.map((item, index) => <img key={item.id} src={item.src} width={item.width} height={item.height} alt={index === active ? item.alt : ''} aria-hidden={index === active ? undefined : true}
          data-shot={item.id} data-on={index === active || undefined} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />)}
      </div>
    </div>

    <p data-peek-text="" aria-live="polite"><span>{String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span>{step.text}</p>
  </section>;
}
