'use client';

import { useId, useState } from 'react';

/*
 * Will a production security repair survive the next release?
 * One timeline, three bands: production (what runs), the deployment gate every
 * candidate crosses, development (branch B). Gold protects, coral exposes, teal is
 * work in progress. The server render is step 04 with the fixes check on, so the
 * static export and readers without JavaScript get the refusal.
 */

type Check = 'fixes' | 'order';
type Tone = 'gold' | 'coral' | 'teal' | 'muted';
type Show = 'none' | 'dim' | 'on' | 'focus';
type Point = readonly [number, number];

const W = 720;
const H = 300;
const P = 60; // production track
const M = 108; // the gate's edge: every release crosses it upward
const BAND = 196; // bottom of the gate band
const G = 158; // where candidates wait at the gate
const D = 250; // development track
const MERGE = 572; // where the carried fix lands in B
const C = [72, 216, 360, 504, 648] as const; // one column per step, aligned with the step buttons

const steps = ['Advisory', 'Repair', 'Release', 'Gate', 'Carry back'] as const;

const states: Record<string, { tone: Tone; title: string; text: string; label: string }> = {
  '1': {
    tone: 'coral',
    title: 'Production is exposed, and so is development.',
    text: 'An advisory lands for the HTTP parser bundled in the booking API. Release A runs it live. Branch B, newer and carrying an unfinished checkout feature, has the same old parser.',
    label: 'Step 1 of 5, advisory. Production runs release A with the affected HTTP parser. Development branch B carries the same parser.',
  },
  '2': {
    tone: 'gold',
    title: 'Protected in production · fix not yet in development',
    text: 'Maintenance starts from release A, not from B. It builds A + fix, validates the booking path and rolls it out through the same gate. The gate now records the parser fix as required.',
    label: 'Step 2 of 5, repair from production. A + fix, built from release A, passes the gate and runs in production. Branch B still has the old parser.',
  },
  '3': {
    tone: 'teal',
    title: 'A newer build arrives with the old parser.',
    text: 'A build from B finishes: newer commit, tests pass. Nothing in its own pipeline knows that production was repaired.',
    label: 'Step 3 of 5, a feature release arrives. A build of branch B, digest-3, is ready: newer commit, tests pass, old parser.',
  },
  '4-fixes': {
    tone: 'gold',
    title: 'Refused: missing the required parser fix.',
    text: 'Newer is not enough. The gate holds every fix production depends on, refuses the candidate and names an owner to carry the fix into B. Production stays protected.',
    label: 'Step 4 of 5, the gate checks required fixes. Candidate B, digest-3, is refused for missing the parser fix. Production keeps A + fix. An owner carries the fix into B.',
  },
  '4-order': {
    tone: 'coral',
    title: 'Newer code. Older vulnerability.',
    text: 'The gate sees a later commit and admits it. Production runs the old parser again, and nothing failed loudly: a feature release quietly undid the repair.',
    label: 'Step 4 of 5, the gate checks release order only. Candidate B, digest-3, is admitted. Production runs the old parser again.',
  },
  '5-fixes': {
    tone: 'gold',
    title: 'Repaired and reconciled',
    text: 'The fix lands in B. B + fix passes both checks and ships. Production and development carry the same parser, and the obligation closes.',
    label: 'Step 5 of 5, carried back. The fix is merged into B. B + fix passes the gate and runs in production. Both branches carry the fixed parser.',
  },
  '5-order': {
    tone: 'gold',
    title: 'Repaired and reconciled, after a second exposure',
    text: 'B + fix ships and closes the gap, but production ran the old parser between the two releases. Checking release order alone let the repair be undone once.',
    label: 'Step 5 of 5, carried back. B + fix runs in production and both branches carry the fixed parser, after a window in which release B ran the old parser.',
  },
};

/** Everything the drawing needs for one step and gate rule. Pure: the component only renders it. */
function scene(step: number, check: Check) {
  const fixes = check === 'fixes';
  const cursor = step === 5 ? W : C[step - 1] + 72;
  const clip = (start: number, end: number) => ({ x: start, width: Math.max(0, Math.min(end, cursor) - start) });
  const armed: Tone = fixes ? 'gold' : 'muted';
  const show = (on: boolean, focus = false): Show => (on ? (focus ? 'focus' : 'on') : 'none');
  const now = (at: number, extra = true): Show => (step === at && extra ? 'on' : 'none');
  const admitted = step >= 4 && !fixes;
  const refused = step >= 4 && fixes;
  return {
    key: step >= 4 ? `${step}-${check}` : String(step),
    cursor,
    production: step === 1 ? ['A', 'exposed', 'coral'] : step === 5 ? ['B + fix', 'protected', 'gold'] : admitted ? ['B', 'exposed again', 'coral'] : ['A + fix', 'protected', 'gold'],
    development: step === 5 ? ['B + fix', 'parser fixed', 'gold'] : refused ? ['B', 'old parser · fix owed', 'coral'] : ['B', 'old parser', 'coral'],
    duty: step < 2 ? 'none' : step === 5 ? 'done' : 'pending',
    // Each production era starts at the left edge of the release that opens it.
    eras: [
      { id: 'a', tone: 'coral' as Tone, ...clip(0, C[1] - 52) },
      { id: 'afix', tone: 'gold' as Tone, ...clip(C[1] - 52, fixes ? C[4] - 52 : C[3] - 52) },
      { id: 'b', tone: 'coral' as Tone, ...clip(C[3] - 52, fixes ? C[3] - 52 : C[4] - 52) },
      { id: 'bfix', tone: 'gold' as Tone, ...clip(C[4] - 52, W) },
    ],
    edge: [
      { id: 'm0', tone: 'muted' as Tone, ...clip(0, C[1] - 16) },
      { id: 'm1', tone: armed, ...clip(C[1] + 16, C[3] - 16) },
      { id: 'm2', tone: armed, ...clip(C[3] + 16, C[4] - 16) },
      { id: 'm3', tone: armed, ...clip(C[4] + 16, W) },
    ],
    dev: [
      { id: 'dev', tone: 'teal' as Tone, ...clip(0, step === 5 ? MERGE : W) },
      { id: 'devfix', tone: 'gold' as Tone, ...clip(MERGE, step === 5 ? W : MERGE) },
    ],
    commits: [150, 236, 278].map((x) => ({ x, show: show(x < cursor) })),
    doors: [
      { x: C[1], show: show(step >= 2) },
      { x: C[3], show: show(step >= 4) },
      { x: C[4], show: show(step >= 5) },
    ],
    bar: show(refused),
    routes: {
      source: show(step >= 2),
      repair: show(step >= 2),
      candidate: (step === 4 ? 'on' : step === 5 ? 'dim' : 'none') as Show,
      admitted: show(admitted),
      final: show(step === 5),
      carry: show(refused || step === 5),
      carried: step === 5,
    },
    cut: show(step >= 3),
    cutFix: show(step === 5),
    merge: show(step === 5),
    ghosts: [
      { x: C[1], show: show(step >= 2, step === 2), text: step === 2 ? 'booking path ✓' : 'passed' },
      { x: C[3], show: show(admitted), text: 'passed' },
      { x: C[4], show: show(step === 5), text: 'passed' },
    ],
    releases: [
      { id: 'a', name: 'A', digest: 'digest-1', tone: 'coral' as Tone, badge: 'old', at: [C[0], P] as Point, lift: 0, show: (step === 1 ? 'focus' : 'dim') as Show },
      { id: 'branch', name: 'B', digest: 'checkout · wip', tone: 'teal' as Tone, badge: 'old', at: [C[0], D] as Point, lift: 0, show: (step === 1 ? 'focus' : 'dim') as Show },
      { id: 'afix', name: 'A + fix', digest: 'digest-2', tone: 'gold' as Tone, badge: 'fixed', at: [C[1], G] as Point, lift: step >= 2 ? P - G : 0, show: (step < 2 ? 'none' : step === 2 ? 'focus' : step === 3 || refused && step === 4 ? 'on' : 'dim') as Show },
      { id: 'b', name: 'B', digest: 'digest-3', tone: (step <= 3 ? 'teal' : 'coral') as Tone, badge: 'old', refused, at: (step >= 4 ? [C[3], G] : [C[2], D]) as Point, lift: admitted ? P - G : 0, show: (step < 3 ? 'none' : step === 5 ? 'dim' : 'focus') as Show },
      { id: 'bfix', name: 'B + fix', digest: 'digest-4', tone: 'gold' as Tone, badge: 'fixed', at: (step === 5 ? [C[4], G] : [C[4], D]) as Point, lift: step === 5 ? P - G : 0, show: (step === 5 ? 'focus' : 'none') as Show },
    ],
    notes: {
      advisory: now(1),
      source: now(2),
      required: now(2),
      tests: now(3),
      checks: now(4),
      verdict: now(4),
      owner: now(4, fixes),
      merged: now(5),
      window: now(5, !fixes),
    },
    fixes,
  };
}

interface ReleaseProps { name: string; digest: string; tone: Tone; badge: string; at: Point; lift: number; show: Show; refused?: boolean }

function Release({ name, digest, tone, badge, at, lift, show, refused = false }: ReleaseProps) {
  return <g data-release="" data-tone={tone} data-show={show} data-refused={refused} transform={`translate(${at[0]} ${at[1]})`}>
    <g data-lift={lift !== 0} transform={`translate(0 ${lift})`}>
      <rect data-backing="" x={-52} y={-19} width={104} height={38} rx={10} />
      <rect x={-52} y={-19} width={104} height={38} rx={10} />
      <text y={-1} textAnchor="middle">{name}</text>
      <text data-digest="" y={12.5} textAnchor="middle">{digest}</text>
      <g data-badge={badge} transform="translate(47 -18)">
        <circle r={8} />
        {badge === 'fixed' ? <path d="M-3.4 .2L-1 2.6L3.6-2.4" /> : <path d="M0-4V1M0 3.6V3.7" />}
      </g>
    </g>
  </g>;
}

export function RepairSurvival() {
  const [step, setStep] = useState(4);
  const [check, setCheck] = useState<Check>('fixes');
  const checksLabel = useId();
  const s = scene(step, check);
  const state = states[s.key];
  return <section data-visual="repair" data-step={step} data-check={check} aria-label="Will the repair survive the next release?">
    <header><p>WORKED EXAMPLE / A BOOKING API</p><h3>Will the repair survive <em>the next release?</em></h3><p>One parser fix meets the next feature release. Step through it, then change what the gate checks.</p></header>
    <nav aria-label="Step through the repair">{steps.map((label, index) => <button key={label} type="button" aria-pressed={step === index + 1} onClick={() => setStep(index + 1)}><span>0{index + 1}</span> {label}</button>)}</nav>
    <div data-timeline="">
      <ol data-lane-heads="" aria-hidden="true">
        <li data-lane="production" data-tone={s.production[2]}><span>Production</span> <b>{s.production[0]}</b> <small>{s.production[1]}</small></li>
        <li data-lane="gate"><span>Gate</span></li>
        <li data-lane="development" data-tone={s.development[2]}><span>Development</span> <b>{s.development[0]}</b> <small>{s.development[1]}</small></li>
      </ol>
      <div data-window="">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={state.label}>
          <defs>
            <pattern id="repair-future" width="9" height={H} patternUnits="userSpaceOnUse"><rect width="4" height={H} /></pattern>
            <linearGradient id="repair-spot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e3a857" stopOpacity=".08" /><stop offset="1" stopColor="#e3a857" stopOpacity=".015" /></linearGradient>
            <filter id="repair-glow" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          <g data-spotlight="" transform={`translate(${C[step - 1]} 0)`}><rect x={-72} y={22} width={144} height={H - 22} /><rect data-tick="" x={-72} y={22} width={144} height={1.5} /></g>

          {s.eras.map((era) => <rect key={era.id} data-wash="" data-era={era.id} data-tone={era.tone} x={era.x} y={26} width={era.width} height={68} />)}
          <rect data-band="" x={0} y={M} width={W} height={BAND - M} />
          <path data-band-floor="" d={`M0 ${BAND}H${W}`} />

          {[P, M, D].map((y) => <rect key={y} data-future="" x={s.cursor} y={y - .75} width={W - s.cursor} height={1.5} />)}
          {s.eras.map((era) => <rect key={era.id} data-track="" data-era={era.id} data-tone={era.tone} x={era.x} y={P - 1.5} width={era.width} height={3} />)}
          {s.dev.map((lane) => <rect key={lane.id} data-track="" data-tone={lane.tone} x={lane.x} y={D - 1.5} width={lane.width} height={3} />)}
          {s.edge.map((edge) => <rect key={edge.id} data-edge="" data-tone={edge.tone} x={edge.x} y={M - 1} width={edge.width} height={2} />)}
          {s.doors.map((door) => <path key={door.x} data-post="" data-show={door.show} d={`M${door.x - 16} ${M - 8}V${M + 8}M${door.x + 16} ${M - 8}V${M + 8}`} />)}
          <rect data-bar="" data-show={s.bar} x={C[3] - 16} y={M - 2.5} width={32} height={5} />

          <path data-route="source" data-tone="gold" data-show={s.routes.source} d={`M124 ${P + 6}C150 ${P + 6} 140 ${G} 164 ${G}`} />
          <path data-route="" data-tone="gold" data-show={s.routes.repair} d={`M${C[1]} ${G - 19}V${P + 19}`} />
          <path data-route="candidate" data-tone="teal" data-show={s.routes.candidate} d={`M${C[2]} ${D - 19}L${C[3]} ${G + 19}`} />
          <path data-route="" data-tone="coral" data-show={s.routes.admitted} d={`M${C[3]} ${G - 19}V${P + 19}`} />
          <path data-route="" data-tone="gold" data-show={s.routes.final} d={`M${C[4]} ${D}V${G + 19}M${C[4]} ${G - 19}V${P + 19}`} />
          <path data-route={s.routes.carried ? 'carried' : 'pending'} data-tone="gold" data-show={s.routes.carry} d={`M${MERGE} ${M + 3}V${D - 7}`} />
          {s.commits.map((commit) => <circle key={commit.x} data-commit="" data-show={commit.show} cx={commit.x} cy={D} r={3} />)}
          <circle data-commit="" data-show={s.cut} cx={C[2]} cy={D} r={4} />
          <circle data-merge="" data-show={s.merge} cx={MERGE} cy={D} r={5.5} />
          <circle data-merge="" data-show={s.cutFix} cx={C[4]} cy={D} r={4} />
          {s.ghosts.map((ghost) => <g key={ghost.x} data-ghost="" data-show={ghost.show}><rect x={ghost.x - 52} y={G - 19} width={104} height={38} rx={10} /><text x={ghost.x} y={G + 4} textAnchor="middle">{ghost.text}</text></g>)}

          <g data-note="" data-tone="coral" data-show={s.notes.advisory}>
            <path data-route="" d="M276 127V56Q276 42 262 42H128M276 189V218Q276 230 264 230H128" />
            <rect data-card="" x={160} y={127} width={130} height={62} rx={4} />
            <text data-caps="" x={172} y={145}>ADVISORY</text>
            <text x={172} y={163}>HTTP parser</text>
            <text x={172} y={180}>needs a fix</text>
          </g>

          {s.releases.map(({ id, ...release }) => <Release key={id} {...release} />)}

          <g data-mark="" data-show={s.bar} transform={`translate(${C[3]} ${M})`}><circle r={9} /><path d="M-3.4-3.4L3.4 3.4M3.4-3.4L-3.4 3.4" /></g>

          <text data-note="" data-show={s.notes.source} x={86} y={157} textAnchor="middle"><tspan>built from A,</tspan><tspan x={86} dy={15}>not from B</tspan></text>
          <text data-note="" data-show={s.notes.required} data-tone={s.fixes ? 'gold' : 'muted'} x={242} y={127}>{s.fixes ? 'requires parser fix' : 'release order only'}</text>
          <text data-note="" data-show={s.notes.tests} x={C[2]} y={290} textAnchor="middle">newer commit · tests pass</text>
          <g data-note="" data-show={s.notes.checks}>
            <rect data-card="" x={296} y={130} width={146} height={54} rx={4} />
            <path data-route="" d={`M442 ${G}H452`} />
            <text data-caps="" x={306} y={146}>GATE CHECKS</text>
            <text x={306} y={163}>✓ newer than live</text>
            <text data-tone={s.fixes ? 'coral' : 'muted'} x={306} y={178}>{s.fixes ? '✗ parser fix missing' : '– fixes not checked'}</text>
          </g>
          <text data-note="" data-caps="" data-tone={s.fixes ? 'gold' : 'coral'} data-show={s.notes.verdict} x={492} y={100} textAnchor="end">{s.fixes ? 'REFUSED' : 'ADMITTED · OLD PARSER LIVE'}</text>
          <text data-note="" data-tone="gold" data-show={s.notes.owner} x={MERGE - 10} y={284} textAnchor="end">owner: carry fix into B</text>
          <text data-note="" data-caps="" data-tone="coral" data-show={s.notes.window} x={(C[3] + C[4]) / 2} y={99} textAnchor="middle">EXPOSED</text>
          <text data-note="" data-tone="gold" data-show={s.notes.merged} x={MERGE - 10} y={284} textAnchor="end">fix merged into B</text>
        </svg>
      </div>
    </div>
    <div data-repair-controls="">
      <p data-duty={s.duty}>Carry fix to development <b>{s.duty === 'done' ? 'done' : 'pending'}</b></p>
      <div data-checks="" role="group" aria-labelledby={checksLabel} hidden={step < 4}>
        <span id={checksLabel}>Gate checks</span>
        <button type="button" value="fixes" aria-pressed={check === 'fixes'} onClick={() => setCheck('fixes')}>Required fixes</button>
        <button type="button" value="order" aria-pressed={check === 'order'} onClick={() => setCheck('order')}>Release order only</button>
      </div>
    </div>
    <p data-outcome="" data-tone={state.tone} role="status"><strong>{state.title}</strong>{state.text}</p>
    <footer>Illustrative booking API · a proposed model, not an executed deployment</footer>
  </section>;
}
