'use client';

import { useEffect, useId, useState } from 'react';

/*
 * Where does the effort go? One advisory (the HTTP parser bundled in the booking API)
 * travels through two flows at the same pace, one row per step. The rail beside each
 * flow is production's exposure: coral until the step that protects it, teal after.
 * Gold marks a hands-on step. Every count on the tally is computed from the steps drawn.
 * The server render is the finished state, so the static export and readers without
 * JavaScript get the whole comparison; play replays it one step at a time.
 */

type FlowId = 'loop' | 'led';
type Kind = 'auto' | 'hands' | 'gate';
type RowState = 'done' | 'now' | 'next';

interface Step { kind: Kind; kicker?: string; title: string; detail: string; alerts?: number; protects?: true }
interface Flow { id: FlowId; mark: string; name: string; short: string; lede: string; steps: readonly Step[] }

const ROWS = 8;

const flows: readonly Flow[] = [
  {
    id: 'loop', mark: 'A', name: 'Through the dev loop', short: 'Dev loop', lede: 'How most teams are set up',
    steps: [
      { kind: 'auto', kicker: 'Automated · 4 alerts', title: 'Scan every environment', detail: 'Three on servers no customer touches', alerts: 4 },
      { kind: 'hands', kicker: 'Hands-on ×4', title: 'Triage four alerts', detail: 'Which is real, and who owns it?' },
      { kind: 'hands', title: 'Fix on the development branch', detail: 'Next to unfinished feature work' },
      { kind: 'hands', title: 'Review the pull request', detail: 'A second pair of eyes on one line' },
      { kind: 'auto', title: 'CI rebuilds and rescans', detail: 'Alerts repeat until each is redeployed' },
      { kind: 'hands', title: 'Staging sign-off', detail: 'A person checks the release candidate' },
      { kind: 'gate', title: 'Approval, then the release window', detail: 'DORA: slower, no fewer failed changes' },
      { kind: 'hands', title: 'Deploy to production, watched', detail: 'Someone watches the rollout', protects: true },
    ],
  },
  {
    id: 'led', mark: 'B', name: 'Production-led', short: 'Production-led', lede: 'Development catches up',
    steps: [
      { kind: 'auto', kicker: 'Automated · 1 finding', title: 'Sweep what is live', detail: 'One owner · daily, or at once if urgent', alerts: 1 },
      { kind: 'auto', title: 'Repair the running release', detail: 'Bounded, within the agreed policy' },
      { kind: 'auto', title: 'Roll out through the same gate', detail: 'The gate every release crosses' },
      { kind: 'auto', title: 'Verified in service', detail: 'Checked on the live booking path', protects: true },
      { kind: 'auto', title: 'Carry the fix back to development', detail: 'Owned; a person steps in on a conflict' },
    ],
  },
];

const kinds: Record<Kind, string> = { auto: 'Automated', hands: 'Hands-on', gate: 'Hands-on + wait' };

/** Both flows take one step per beat; the dev loop holds at its release window for two more. */
const beats: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 7, 7, 8];
const FINAL = beats.length - 1;
const say = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
const cap = (word: string) => word[0].toUpperCase() + word.slice(1);
const flag = (on: boolean) => (on ? '' : undefined);

/** What one flow has done by a given step, counted from its drawn steps only. */
function tally(flow: Flow, step: number) {
  const guard = flow.steps.findIndex((item) => item.protects) + 1;
  const gate = flow.steps.findIndex((item) => item.kind === 'gate') + 1;
  return {
    guard,
    total: flow.steps.length,
    at: Math.min(step, flow.steps.length),
    alerts: flow.steps[0].alerts ?? 0,
    handsOn: flow.steps.slice(0, Math.min(step, guard)).filter((item) => item.kind !== 'auto').length,
    safe: step >= guard,
    waiting: gate > 0 && step === gate,
    waits: gate > 0 ? (step >= gate ? 'Yes' : null) : step >= guard ? 'No' : null,
  };
}

const rowState = (row: number, step: number, final: boolean): RowState => (row < step || (row === step && final) ? 'done' : row === step ? 'now' : 'next');

function status(flow: Flow, step: number) {
  const now = tally(flow, step);
  if (now.safe) return `protected at step ${now.guard}`;
  return now.waiting ? 'waiting for the release window' : `step ${now.at} · exposed`;
}

const [loop, led] = flows;
const end = { loop: tally(loop, ROWS), led: tally(led, ROWS) };

const endings = {
  both: {
    title: `Same advisory: protected at step ${say[end.led.guard]}, or at step ${say[end.loop.guard]}.`,
    text: `Production-led raises ${say[end.led.alerts]} finding with one owner, repairs the release that is running and carries the fix home after. The dev loop takes the fix down the road built for features: ${say[end.loop.alerts]} alerts and ${say[end.loop.handsOn]} hands-on steps, then the release window.`,
  },
  loop: {
    title: `${cap(say[end.loop.alerts])} alerts for one fix, and production waits for the release window.`,
    text: `${cap(say[end.loop.handsOn])} hands-on steps before production is protected. Each is a sound habit for feature work; together they hold one security fix back.`,
  },
  led: {
    title: `One finding, one owner, protected at step ${say[end.led.guard]}. Development catches up after.`,
    text: 'The repair starts from the release that is running and crosses the same deployment gate. CI keeps its source, secret and dependency checks before release.',
  },
};

/** One line per beat of the replay, saying what both flows just did. */
const story = [
  { title: 'Step 1. Four alerts, or one finding.', text: 'Scanners on every environment report the same parser four times, and three of those servers have no customers. The live sweep reports it once, with an owner.' },
  { title: 'Step 2. Triage on one side, a repair on the other.', text: 'Someone works out which alert is real and who owns it. Production-led builds a bounded repair from the release that is running.' },
  { title: 'Step 3. The fix joins unfinished feature work.', text: 'The one-line fix lands on the development branch. The repair rolls out through the same gate every release uses.' },
  { title: 'Step 4. Production-led: protected.', text: 'The repair is verified on the live booking path. On the dev loop, the fix is in pull request review.' },
  { title: 'Step 5. The fix goes home; CI rescans everything.', text: 'Production-led carries the fix back to development as an owned obligation. CI rebuilds and rescans every environment, and the alerts repeat until each one is redeployed.' },
  { title: 'Step 6. Staging sign-off.', text: `The release candidate is checked in staging. Production-led has nothing left to do: production has been protected since step ${say[end.led.guard]}.` },
  { title: 'Step 7. Approved, then the release window.', text: 'The gate is built for feature releases, and the fix waits its turn. DORA found heavyweight approval slows delivery without lowering failed changes.' },
  { title: 'Still waiting for the release window.', text: `Production is still exposed on the dev loop. On the production-led side it has been protected for ${say[7 - end.led.guard]} steps.` },
  { title: 'Still waiting.', text: 'Nothing is wrong with the fix. The road it is on was built for features, and features wait for the window.' },
];

type Tally = ReturnType<typeof tally>;

/** A tally cell that stays open until the flow reaches the step that answers it. */
function Waits({ side }: { side: Tally }) {
  return <td data-pending={flag(!side.waits)}>{side.waits ?? '…'}</td>;
}

function Guarded({ side }: { side: Tally }) {
  return <td data-pending={side.safe ? undefined : 'exposed'}>{side.safe ? <>{side.guard}<small> of {side.total}</small></> : 'not yet'}</td>;
}

interface FlowColumnProps { flow: Flow; step: number; final: boolean; headingId: string }

/** One flow as a column of steps on its exposure rail. */
function FlowColumn({ flow, step, final, headingId }: FlowColumnProps) {
  const now = tally(flow, step);
  const rest = Array.from({ length: ROWS - flow.steps.length }, (_, index) => flow.steps.length + index + 1);
  return <section data-flow={flow.id} aria-labelledby={headingId}>
    <h4 id={headingId}><small>{flow.mark} · {flow.lede}</small>{flow.name}</h4>
    <ol>{flow.steps.map((item, index) => {
      const row = index + 1;
      return <li key={item.title} data-kind={item.kind} data-state={rowState(row, step, final)} data-safe={flag(row > now.guard)}>
        <small>
          {item.kicker ?? kinds[item.kind]}
          {item.alerts ? <span data-alerts="" aria-hidden="true">{Array.from({ length: item.alerts }, (_, pip) => <i key={pip} data-live={flag(pip === item.alerts! - 1)} />)}</span> : null}
          {item.protects && step >= row ? <b data-protected="">Protected here</b> : null}
        </small>
        <strong>{item.title}</strong>
        <span>{item.detail}</span>
      </li>;
    })}</ol>
    {rest.map((row) => <i key={row} data-rest={row} data-state={rowState(row, step, final)} aria-hidden="true" />)}
    {flow.id === 'led' && <p data-note=""><b>Unchanged</b>CI keeps its source, secret and dependency checks before release.</p>}
    <i data-token={now.at} data-safe={flag(now.safe)} data-waiting={flag(now.waiting)} aria-hidden="true" />
  </section>;
}

/** One advisory, two flows: where the hands-on effort goes, and when production is protected. */
export function EffortFlow() {
  const [beat, setBeat] = useState(FINAL);
  const [playing, setPlaying] = useState(false);
  const [view, setView] = useState<FlowId>('loop');
  const [picked, setPicked] = useState(false);
  const id = useId();
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setBeat(beat + 1);
      if (beat + 1 >= FINAL) setPlaying(false);
    }, 1250);
    return () => window.clearTimeout(timer);
  }, [playing, beat]);
  const step = beats[beat];
  const final = beat === FINAL;
  const play = () => {
    if (playing) return setPlaying(false);
    if (final) setBeat(0);
    setPlaying(true);
  };
  const jump = (target: number) => { setPlaying(false); setBeat(beats.indexOf(target)); };
  const pick = (next: FlowId) => { setView(next); setPicked(true); };
  const outcome = final ? endings[picked ? view : 'both'] : story[beat];
  const [a, b] = flows.map((flow) => tally(flow, step));
  return <section data-visual="effort" data-view={view} data-final={flag(final)} aria-label="One advisory through two flows: where the effort goes">
    <header><p>WORKED EXAMPLE / ONE ADVISORY, TWO FLOWS</p><h3>Where does the <em>effort go?</em></h3><p>One advisory for the HTTP parser bundled in the booking API, through two flows. Each row is one step, and both flows take their steps at the same pace.</p></header>
    <div data-controls="">
      <button type="button" data-play="" aria-pressed={playing} onClick={play}><i aria-hidden="true" />Play the advisory</button>
      <div data-switch="" role="group" aria-label="Choose a flow">{flows.map((flow) => <button key={flow.id} type="button" aria-pressed={view === flow.id} onClick={() => pick(flow.id)}>{flow.short}<small>{status(flow, step)}</small></button>)}</div>
      <ul data-legend="" aria-label="Key"><li data-key="exposed">Production exposed</li><li data-key="protected">Production protected</li><li data-key="hands">Hands-on step</li><li data-key="auto">Automated step</li></ul>
    </div>
    <div data-flows="">
      <p data-advisory=""><span>Advisory</span>HTTP parser bundled in the booking API</p>
      <i data-split="" aria-hidden="true" />
      <ol data-spine="" aria-label="Show both flows at one step">{Array.from({ length: ROWS }, (_, index) => index + 1).map((row) => <li key={row}><button type="button" aria-pressed={step === row && !final} aria-label={`Show step ${row}`} data-passed={flag(row <= step)} onClick={() => jump(row)}>{row}</button></li>)}</ol>
      {flows.map((flow) => <FlowColumn key={flow.id} flow={flow} step={step} final={final} headingId={`${id}-${flow.id}`} />)}
    </div>
    <table data-tally="">
      <caption>Counted from the steps drawn{final ? '' : `, up to step ${step}`}</caption>
      <thead><tr><th scope="col">{loop.short}</th><td /><th scope="col">{led.short}</th></tr></thead>
      <tbody>
        <tr><td>{a.alerts}</td><th scope="row">Alerts to triage</th><td>{b.alerts}</td></tr>
        <tr><td>{a.handsOn}</td><th scope="row">Hands-on steps before production is protected</th><td>{b.handsOn}</td></tr>
        <tr><Waits side={a} /><th scope="row">Waits for a release window</th><Waits side={b} /></tr>
        <tr><Guarded side={a} /><th scope="row">Production protected at step</th><Guarded side={b} /></tr>
      </tbody>
    </table>
    <p data-outcome="" role="status"><strong>{outcome.title}</strong>{outcome.text}</p>
    <footer>Illustrative flows for one advisory · counts are the steps drawn here, not measured effort</footer>
  </section>;
}
