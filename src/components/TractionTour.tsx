'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';
import { board, tour, type TourChapter } from '@/data/traction-tour';

/**
 * Traction at work, beside the promise: real runs on our own apps, played chapter by chapter in the board's own
 * words. Day one on Next Role's free board, then the plan and the market on Traction's own board. Every line in the
 * window is the engine's output or the board's interface text (`@/data/traction-tour`).
 *
 * It plays once it scrolls into view and holds while a pointer or keyboard focus is on it. A chapter's one button is
 * pressed by the pointer unless the visitor presses it first. Reduced motion: no autoplay, each chapter at rest.
 * No door here: the page asks once, at its end.
 */

type Id = TourChapter['id'];

/** How long each beat holds, in milliseconds. A chapter rests on its last beat. */
const BEATS: Record<Id, number[]> = {
  read: [1900, 2600, 5800],
  customers: [3600, 3400, 6000],
  email: [5200, 1600],
  send: [3400, 3600, 3200],
  plan: [2600, 1800, 5600],
  market: [7200],
};
/** The beat whose button the pointer presses. */
const PRESS: Partial<Record<Id, number>> = { customers: 0, email: 1, send: 0 };

const chapters = tour.chapters;
const END = chapters.length;
const total = (id: Id) => BEATS[id].reduce((sum, ms) => sum + ms, 0);

function useReducedMotion() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setCalm(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return calm;
}

/** Text that types itself over `ms`, or stands whole when it isn't running. */
function Typed({ text, ms, run }: { text: string; ms: number; run: boolean }) {
  const [shown, setShown] = useState(run ? 0 : text.length);
  useEffect(() => {
    if (!run) { setShown(text.length); return; }
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const n = Math.min(text.length, Math.round(((now - start) / ms) * text.length));
      setShown(n);
      if (n < text.length) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text, ms, run]);
  return <>{text.substring(0, shown)}{shown < text.length && <i data-caret="" aria-hidden="true" />}</>;
}

/** Where a real person's or firm's name was: the businesses found are real, so their names stay out of the page. */
function Hidden({ width = 7 }: { width?: number }) {
  return <span data-hidden="" style={{ '--w': `${width}ch` } as CSSProperties} role="img" aria-label="name hidden" />;
}

/** A line from the run, its `{name}` marks shown as hidden names. */
function Line({ text }: { text: string }) {
  return <>{text.split('{name}').map((part, i) => <span key={i}>{i > 0 && <Hidden width={6} />}{part}</span>)}</>;
}

/** A chapter's one button. The pointer presses it unless the visitor does first. */
function Press({ children, pressing, onPress, label, ms }: { children: ReactNode; pressing: boolean; onPress: () => void; label: string; ms: number }) {
  return <button type="button" data-primary="" data-pressing={pressing || undefined} onClick={onPress} aria-label={label} style={{ '--press': `${ms}ms` } as CSSProperties}>
    {children}
    {pressing && <span data-pointer="" aria-hidden="true"><svg viewBox="0 0 16 20" width="16" height="20"><path d="M1.5 1.5l12.5 10-5.4.7 3.2 6.2-2.3 1.1-3.1-6.3-4.9 4z" /></svg></span>}
  </button>;
}

function Gm({ children }: { children: ReactNode }) {
  return <div data-gm=""><span data-gm-mark="" aria-hidden="true">GM</span><div>{children}</div></div>;
}

function Pipeline({ counts, current }: { counts: number[]; current: number }) {
  const labels = [board.pipeline.found, board.pipeline.onBoard, board.pipeline.sent, board.pipeline.replied, board.pipeline.yes];
  return <ol data-pipeline="" aria-label="Where the businesses stand">
    {labels.map((label, i) => <li key={label} data-on={counts[i] > 0 || undefined} data-current={i === current || undefined}><strong>{counts[i]}</strong><span>{label}</span></li>)}
  </ol>;
}

const order = (i: number) => ({ '--i': i }) as CSSProperties;

function Read({ beat, motion }: { beat: number; motion: boolean }) {
  const { read, app } = tour;
  return <div data-scene="read">
    <p data-address=""><small>{board.addressLabel}</small><span><Typed text={app.address} ms={1200} run={motion && beat === 0} /></span>{beat === 1 && <i data-spinner="" aria-hidden="true" />}</p>
    {beat >= 1 && <div data-reading="">
      <h4>{beat >= 2 ? board.readTitle(app.name) : board.reading(app.name)}</h4>
      <ul aria-label="Pages read">{read.pages.map((page, i) => <li key={page} style={order(i)} data-done={beat >= 2 || undefined}>{page}</li>)}</ul>
    </div>}
    {beat >= 2 && <ol data-findings="">{read.findings.map((finding, i) => <li key={finding.label} style={order(i)}>
      <small>{finding.label}</small>
      <div><strong>{finding.headline}</strong><span>{board.readSources} {finding.sources.join(' · ')}</span></div>
    </li>)}</ol>}
  </div>;
}

function Customers({ beat, press, pressing }: { beat: number; press: () => void; pressing: boolean }) {
  const { read, customers, app } = tour;
  if (beat === 0) return <div data-scene="customers">
    <Gm>
      <p>{board.gmOpening(app.name, read.findings[read.findings.length - 1].headline)}</p>
      <p>{board.gmBuyer(read.buyer)}</p>
      <p>{board.gmOffer}</p>
    </Gm>
    <div data-offers="">
      <Press pressing={pressing} onPress={press} ms={BEATS.customers[0]} label={`${board.offers.customers.button}, in this tour`}><strong>{board.offers.customers.button}</strong><span>{board.offers.customers.line}</span></Press>
      <span data-offer="" aria-hidden="true"><strong>{board.offers.investors.button}</strong><span>{board.offers.investors.line}</span></span>
    </div>
  </div>;
  if (beat === 1) return <div data-scene="customers">
    <ol data-progress="">{[board.progress.plan, board.progress.search(customers.query), board.progress.rank(customers.pagesRead), board.progress.addresses(customers.found.length)]
      .map((step, i) => <li key={step} style={order(i)}>{step}</li>)}</ol>
    <ul data-skeleton="" aria-hidden="true"><li /><li /><li /></ul>
  </div>;
  return <div data-scene="customers">
    <Pipeline counts={[customers.found.length, 0, 0, 0, 0]} current={0} />
    <ul data-found="">{customers.found.map((business, i) => <li key={i} style={order(i)}>
      <p><Hidden width={business.nameLength} /><small>{business.who}</small></p>
      <p><Line text={business.why} /></p>
    </li>)}</ul>
  </div>;
}

function Email({ press, pressing }: { press: () => void; pressing: boolean }) {
  const { email } = tour;
  return <div data-scene="email">
    <article data-draft="">
      <header>
        <small>{board.draft}</small>
        <p><span>To</span><Hidden width={12} /><small>{email.who}</small></p>
        <p><span>Subject</span>{email.subject}</p>
      </header>
      <div data-body="">
        <p>{email.greeting}</p>
        <p data-opening=""><span>{email.opening}</span><small>{tour.labels.fromTheirPage}</small></p>
        {email.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <p>{email.signoff}</p>
      </div>
    </article>
    <div data-actions=""><Press pressing={pressing} onPress={press} ms={BEATS.email[1]} label={`${board.approve}, in this tour`}>{board.approve}</Press></div>
  </div>;
}

function Send({ beat, press, pressing }: { beat: number; press: () => void; pressing: boolean }) {
  const { customers } = tour;
  const sent = beat >= 1;
  const addressed = customers.found.filter((business) => 'address' in business && business.address);
  return <div data-scene="send">
    <Pipeline counts={[customers.found.length, customers.found.length, sent ? addressed.length : 0, 0, 0]} current={sent ? 2 : 1} />
    {!sent && <Gm><p>{board.gmApproved(addressed.length)}</p></Gm>}
    <ul data-outbox="">{addressed.map((business, i) => <li key={i} style={order(i)} data-sent={sent || undefined}>
      <Hidden width={business.nameLength} /><small>{business.who}</small><span>{sent ? board.sentLabel : board.draft}</span>
    </li>)}</ul>
    {beat === 0 && <div data-actions=""><Press pressing={pressing} onPress={press} ms={BEATS.send[0]} label={`${board.send(addressed.length)}, in this tour`}>{board.send(addressed.length)}</Press></div>}
    {sent && <Gm><p>{board.gmSent(addressed.length)}</p></Gm>}
    {beat >= 2 && <p data-replies=""><small>{tour.labels.replies}</small>{board.replyClasses.map((label) => <span key={label}>{label}</span>)}</p>}
  </div>;
}

function Plan({ beat, motion }: { beat: number; motion: boolean }) {
  const { plan } = tour;
  return <div data-scene="plan">
    {beat >= 1 && <p data-said="">{plan.ask}</p>}
    {beat === 1 && <p data-thinking="" role="img" aria-label="The Growth Manager is answering"><i /><i /><i /></p>}
    {beat >= 2 && <div data-gm="" data-proposal=""><span data-gm-mark="" aria-hidden="true">GM</span><article data-plan="">
      <small>{board.planReady}</small>
      <h4>{plan.title}</h4>
      {plan.lines.map((line) => <p key={line}>{line}</p>)}
      <div data-actions="" aria-hidden="true"><span data-primary="">{board.approveStart}</span><span data-quiet="">{board.notNow}</span></div>
    </article></div>}
    {beat === 0 && <p data-composer=""><span><Typed text={plan.ask} ms={1700} run={motion} /></span><i data-send-arrow="" aria-hidden="true" /></p>}
  </div>;
}

function Market() {
  const { market } = tour;
  return <div data-scene="market">
    <header><h4>{board.intelTitle}</h4><small>{market.topic}</small></header>
    <ol data-days="">{market.days.map((day, i) => <li key={day.date} style={order(i)} data-today={i === 0 || undefined}>
      <small>{day.date}</small>
      <div><strong>{day.headline}</strong><span>{day.outlet}</span>{day.quote && <q>{day.quote}</q>}</div>
    </li>)}</ol>
  </div>;
}

type Count = (typeof tour.ledger.you)[number] | (typeof tour.ledger.traction)[number];
/** The latest count of each kind among the chapters played before `chapter`. */
function latest<T extends Count>(items: readonly T[], chapter: number): T[] {
  const done = new Set(chapters.filter((_, index) => index < chapter).map((item) => item.id));
  const byKey = new Map<string, T>();
  for (const item of items) if (done.has(item.at as Id)) byKey.set(item.key, item);
  return [...byKey.values()];
}

/** The close: what the visitor did against what Traction did, every count from the runs. */
function End() {
  const { ledger } = tour;
  return <div data-scene="end">
    <dl>
      <div data-side="you"><dt>{tour.labels.yourPart}</dt>{latest(ledger.you, END).map((item, i) => <dd key={item.key} style={order(i)}><strong>{item.count}</strong> {item.label}</dd>)}</div>
      <div data-side="traction"><dt>{tour.labels.itsPart}</dt>{latest(ledger.traction, END).map((item, i) => <dd key={item.key} style={order(i + 3)}><strong>{item.count}</strong> {item.label}</dd>)}</div>
    </dl>
    <small>{tour.labels.end}</small>
  </div>;
}

/** The running count under the window: what the visitor has done so far, and what Traction has. */
function Tally({ chapter }: { chapter: number }) {
  const { ledger } = tour;
  if (chapter >= END) return null;
  return <footer data-tally="" aria-label="So far">
    <p><span>{tour.labels.you}</span>{latest(ledger.you, chapter).map((item) => <span key={`${item.key}-${item.count}`} data-count=""><strong>{item.count}</strong> {item.short}</span>)}</p>
    <p><span>Traction</span>{latest(ledger.traction, chapter).map((item) => <span key={item.key} data-count=""><strong>{item.count}</strong> {item.short}</span>)}</p>
  </footer>;
}

export function TractionTour() {
  const root = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [beat, setBeat] = useState(0);
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState<boolean | null>(null);
  const [started, setStarted] = useState(false);
  const seen = useRef(new Set<string>());
  const calm = useReducedMotion();
  // Reduced motion: nothing plays until the visitor asks; each chapter otherwise rests on its last beat.
  const stopped = paused ?? calm;

  const id = chapter < END ? chapters[chapter].id : undefined;
  const last = id ? BEATS[id].length - 1 : 0;
  const running = started && visible && !held && !stopped && chapter < END;
  const shownBeat = calm && !running ? last : beat;

  const note = useCallback((index: number, how: string) => {
    const key = index < END ? chapters[index].id : 'end';
    if (seen.current.has(key)) return;
    seen.current.add(key);
    if (index < END) trackEvent('tour_chapter', { chapter: key, how });
    else trackEvent('tour_completed', { how });
  }, []);

  const go = useCallback((index: number, how: string) => {
    setChapter(index);
    setBeat(0);
    note(index, how);
  }, [note]);

  const advance = useCallback((how: string) => {
    if (!id) return;
    if (beat < BEATS[id].length - 1) setBeat(beat + 1);
    else go(chapter + 1, how);
  }, [beat, chapter, go, id]);

  useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.45 });
    observer.observe(node);
    const away = () => setHeld(document.hidden);
    document.addEventListener('visibilitychange', away);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', away); };
  }, []);

  useEffect(() => {
    if (visible && !started) { setStarted(true); note(0, 'auto'); }
  }, [visible, started, note]);

  useEffect(() => {
    if (!running || !id) return;
    const timer = window.setTimeout(() => advance('auto'), BEATS[id][beat]);
    return () => window.clearTimeout(timer);
  }, [running, id, beat, advance]);

  const press = useCallback(() => {
    if (!id) return;
    trackEvent('tour_pressed', { chapter: id });
    setHeld(false);   // the pressed button leaves with its beat; nothing should keep the tour held
    advance('press');
  }, [advance, id]);

  const pressing = !!id && PRESS[id] === shownBeat && running;
  const current = chapter < END ? chapters[chapter] : tour.end;
  const where = chapter < END ? chapters[chapter].board : 'continued';
  const shown = tour.boards[where];
  const timing = id && shownBeat === last ? tour.timings[id] : undefined;
  const scene = (() => {
    switch (id) {
      case 'read': return <Read beat={shownBeat} motion={!calm} />;
      case 'customers': return <Customers beat={shownBeat} press={press} pressing={pressing} />;
      case 'email': return <Email press={press} pressing={pressing} />;
      case 'send': return <Send beat={shownBeat} press={press} pressing={pressing} />;
      case 'plan': return <Plan beat={shownBeat} motion={!calm} />;
      case 'market': return <Market />;
      default: return <End />;
    }
  })();
  const toggle = chapter >= END ? 'again' : stopped ? 'play' : 'pause';

  return <div ref={root} data-traction-tour="" data-running={running || undefined} data-board={where}>
    <div data-tour-bar="">
      <div data-chapters="" role="group" aria-label={tour.labels.chapters}>
        {tour.groups.map((group) => <div key={group.board} data-group={group.board}>
          <small>{group.label}</small>
          <div>{chapters.map((item, index) => item.board !== group.board ? null :
            <button key={item.id} type="button" aria-pressed={index === chapter} data-done={index < chapter || undefined}
              data-filling={(index === chapter && running) || undefined} style={{ '--ms': `${total(item.id)}ms` } as CSSProperties}
              onClick={() => { if (!calm) setPaused(false); go(index, 'chip'); }}>{item.name}</button>)}</div>
        </div>)}
      </div>
      <button type="button" data-tour-toggle="" aria-label={tour.labels[toggle]} title={tour.labels[toggle]}
        onClick={() => {
          if (chapter >= END) { seen.current.clear(); setPaused(calm); go(0, 'again'); return; }
          setPaused(!stopped);
        }}>
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">{toggle === 'pause'
          ? <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />
          : toggle === 'play' ? <path d="M4.5 2.4l9 5.6-9 5.6z" />
          : <path d="M8 2.2a5.8 5.8 0 1 1-5.6 4.3l1.9.5A3.8 3.8 0 1 0 8 4.2v2.3L4.6 3.2 8 0z" />}</svg>
      </button>
    </div>
    <div data-tour-window=""
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHeld(true); }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHeld(document.hidden); }}
      onFocus={(event) => { if (event.target.matches(':focus-visible')) setHeld(true); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(document.hidden); }}>
      <header>
        <span data-mark="" aria-hidden="true">T</span><strong>{shown.name}</strong>{shown.badge && <span data-badge="">{shown.badge}</span>}
        {timing && <small data-timing="">{timing}</small>}
        {id === 'send' && shownBeat >= 1 && <small data-simulated="">{tour.labels.simulated}</small>}
      </header>
      <div data-stage="" key={`${chapter}-${shownBeat}`}>{scene}</div>
      <Tally chapter={chapter + (id && shownBeat === last ? 1 : 0)} />
    </div>
    <div data-tour-caption="" aria-live={running ? 'off' : 'polite'}>
      <h3>{current.title}</h3>
      <p>{current.line}</p>
      <small>{chapter < END ? tour.labels[where] : `${tour.labels.trial.split(' · ')[0]} · ${tour.labels.continued.split(' · ')[0]}`}</small>
    </div>
  </div>;
}
