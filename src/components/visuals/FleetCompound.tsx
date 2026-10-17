'use client';

import { useState, type CSSProperties } from 'react';

/*
 * One fix, every app: what one app learns, every app on the platform gets.
 * Orchestra OS sits at the centre as a flat echo of the /os mesh; our apps sit on a ring
 * around it as small app windows, with no names because some are partner ventures. Four events from
 * our repositories, carried two ways. The server render is the React fix on one platform with all
 * six apps lit, so the static export and readers without JavaScript get the insight. Motion plays
 * only after a choice, never on load, and the drawing settles into the same state without it.
 */

type Mode = 'own' | 'platform';
type EventId = 'react' | 'npm' | 'reading' | 'joins';
type NodeState = 'lit' | 'soft' | 'idle' | 'ghost' | 'loop' | 'dark' | 'setup';
type Mark = 'origin' | 'lit' | 'soft' | 'ghost' | 'loop' | 'dark' | 'gate' | 'new' | 'built';
type Lines = readonly [string, string];

interface Telling { count: string; title: string; text: string; picture: string; key: readonly { mark: Mark; text: string }[] }

interface FleetEvent {
  id: EventId;
  label: string;
  capability: string;
  /** What happens at the centre on one platform. */
  core: string;
  /** The apps it reaches on one platform, in the order the pulse arrives. */
  lit: readonly number[];
  receipt?: Lines;
  /** The app where it was found. */
  origin?: { node: number; own: Lines; platform: Lines };
  /** An event that starts outside the fleet. */
  outside?: Lines;
  /** The app that arrives. */
  fresh?: number;
  /** A protection that lives in the shared layer itself. */
  gate?: Lines;
  others: Record<Mode, NodeState>;
  own: { loops: readonly number[]; dark: readonly number[]; label: Lines; blank?: boolean };
  modes: Record<Mode, Telling>;
}

/** Four real events from our own fleet. Dates and facts come from our repositories; nothing else is claimed. */
const events: readonly FleetEvent[] = [
  {
    id: 'react', label: 'A React bug leaves pages blank', capability: 'Build & release', core: 'Investigated once',
    lit: [2, 0, 4, 10, 6, 8], receipt: ['React 19.3', '8 Oct'],
    origin: { node: 2, own: ['Found here', '17 Sep'], platform: ['Found here · 17 Sep', 'React 19.3 · 8 Oct'] },
    others: { own: 'ghost', platform: 'ghost' },
    own: { loops: [2, 0, 4, 10, 8], dark: [6], label: ['Hasn’t noticed yet', 'page still blank'], blank: true },
    modes: {
      own: {
        count: 'Six apps, each alone', title: 'Six apps, each hunting the same bug alone.',
        text: 'Each team traces the blank pages on its own clock and ships its own fix. An app that hasn’t noticed yet still shows a blank page.',
        picture: 'No shared layer. Each app on that stack circles through its own investigation of the same bug. One app has not noticed yet and still shows a blank page.',
        key: [{ mark: 'origin', text: 'Found on one app · 17 Sep' }, { mark: 'loop', text: 'Each app on that stack runs its own investigation' }, { mark: 'dark', text: 'Hasn’t noticed yet · page still blank' }],
      },
      platform: {
        count: 'Investigated once', title: 'Investigated once. Six apps fixed the same day.',
        text: 'Pages went blank on one of our apps. The bug was found and investigated there, once, on 17 September. On 8 October the fix went into all six apps on that stack the same day.',
        picture: 'Orchestra OS at the centre, our apps on a ring around it. The bug travels in once from the app that found it on 17 September; the fix travels out to the six apps on that stack, each marked React 19.3, 8 October. Apps on other stacks stay dim.',
        key: [{ mark: 'origin', text: 'Found on one app · 17 Sep' }, { mark: 'lit', text: 'All six apps on that stack · React 19.3 · 8 Oct' }, { mark: 'ghost', text: 'Other apps · a different stack' }],
      },
    },
  },
  {
    id: 'npm', label: 'An npm package is compromised', capability: 'Protect & reconcile', core: 'Read once',
    lit: [], outside: ['Compromised package', 'npm · 4 Aug'], gate: ['Malicious-package gate', 'our deploy pipelines · 5 Aug'],
    others: { own: 'idle', platform: 'idle' },
    own: { loops: [0, 1, 2, 4, 5, 6, 8, 9, 10], dark: [3, 7, 11], label: ['Hasn’t heard yet', 'no guard yet'] },
    modes: {
      own: {
        count: 'Each app alone', title: 'Every app reads the same news alone.',
        text: 'Each team has to catch the advisory, check its own dependencies and add its own guard. An app that hasn’t heard yet deploys without one.',
        picture: 'No shared layer. A widely used npm package is compromised outside the fleet. Most apps circle through their own check; a few have not heard yet and have no guard.',
        key: [{ mark: 'origin', text: 'A widely used npm package is compromised · 4 Aug' }, { mark: 'loop', text: 'Each app checks its own dependencies and adds its own guard' }, { mark: 'dark', text: 'Hasn’t heard yet · no guard yet' }],
      },
      platform: {
        count: 'Read once', title: 'Read once. Guarded the next day.',
        text: 'A widely used npm package was compromised on 4 August. On 5 August a gate that blocks known malicious packages went into our deploy pipelines.',
        picture: 'A compromised npm package reaches Orchestra OS once, from outside the fleet, on 4 August. A gate ring forms around the centre: a gate against known malicious packages in our deploy pipelines, 5 August.',
        key: [{ mark: 'origin', text: 'A widely used npm package is compromised · 4 Aug' }, { mark: 'gate', text: 'A gate against known malicious packages goes into our deploy pipelines · 5 Aug' }],
      },
    },
  },
  {
    id: 'reading', label: 'A reading feature ships once', capability: 'Reach & serve', core: 'Built once',
    lit: [0, 4, 8], receipt: ['Synced', 'previews · share panel'],
    others: { own: 'ghost', platform: 'ghost' },
    own: { loops: [0, 4], dark: [8], label: ['Not built yet', 'waiting its turn'] },
    modes: {
      own: {
        count: 'Built three times', title: 'Three sites, three builds of the same feature.',
        text: 'Each article site designs, builds and maintains its own source previews and share panel, and the three drift apart. A site still waiting its turn has neither.',
        picture: 'No shared layer. Two article sites each circle through building their own version of the same feature; the third has not built it yet. Other apps stay dim.',
        key: [{ mark: 'loop', text: 'Each article site builds its own previews and share panel' }, { mark: 'dark', text: 'Not built yet · waiting its turn' }, { mark: 'ghost', text: 'Other apps · not article sites' }],
      },
      platform: {
        count: 'Built once', title: 'Built once. Three article sites got it.',
        text: 'Source previews and one share panel were built once, in a shared package, and synced to three article sites.',
        picture: 'Source previews and one share panel are built once at the centre, in a shared package, and travel out to three article sites, each marked synced. Other apps stay dim.',
        key: [{ mark: 'built', text: 'Built once in a shared package' }, { mark: 'lit', text: 'Synced to three article sites · source previews and one share panel' }, { mark: 'ghost', text: 'Other apps · not article sites' }],
      },
    },
  },
  {
    id: 'joins', label: 'A new app joins', capability: 'Run & recover', core: 'In the registry',
    lit: [5], fresh: 5, receipt: ['New · watched', 'checked every 5 min'],
    others: { own: 'idle', platform: 'soft' },
    own: { loops: [5], dark: [], label: ['New · not watched yet', 'monitoring set up by hand'] },
    modes: {
      own: {
        count: 'Set up by hand', title: 'A new app starts from zero.',
        text: 'Someone has to pick a monitor, set up its checks and route its alerts. Until that’s done, nobody outside is watching it.',
        picture: 'No shared layer. A new app arrives on the ring unwatched and circles through setting up its own monitoring by hand.',
        key: [{ mark: 'dark', text: 'A new app arrives · not watched yet' }, { mark: 'loop', text: 'Monitoring chosen, configured and routed by hand' }],
      },
      platform: {
        count: 'Nothing to set up', title: 'Registered once. Watched from the start.',
        text: 'Outside monitoring reads the app registry. Every registered app is checked every five minutes from outside, so a new app is covered with nothing extra to set up.',
        picture: 'A new app joins the ring and registers at the centre. Every app on the ring, the new one included, receives a check from outside every five minutes; the new app is marked watched.',
        key: [{ mark: 'new', text: 'A new app is registered' }, { mark: 'soft', text: 'Every registered app, the new one included, checked from outside every five minutes' }],
      },
    },
  },
];

const modes: readonly { id: Mode; label: string }[] = [{ id: 'own', label: 'Apps on their own' }, { id: 'platform', label: 'On one platform' }];

/* Geometry, in the drawing's own units: the shared layer at the centre, twelve app windows on an ellipse around it. */
const W = 740;
const H = 440;
const CX = 370;
const CY = 222;
const RX = 220;
const RY = 158;
const R = 80;
const r1 = (value: number) => Math.round(value * 10) / 10; // the server and the browser print identical attributes

type Place = 'top' | 'bottom' | 'left' | 'right';

const ring = Array.from({ length: 12 }, (_, i) => {
  const angle = ((-90 + 30 * i) * Math.PI) / 180;
  const x = r1(CX + RX * Math.cos(angle));
  const y = r1(CY + RY * Math.sin(angle));
  const length = Math.hypot(x - CX, y - CY);
  const ux = (x - CX) / length;
  const uy = (y - CY) / length;
  const edge = Math.min(27 / Math.max(Math.abs(ux), 1e-6), 22 / Math.max(Math.abs(uy), 1e-6));
  const nx = -uy;
  const ny = ux;
  const pt = (px: number, py: number) => `${r1(px)} ${r1(py)}`;
  const start = { x: CX + ux * (R + 10), y: CY + uy * (R + 10) };
  const end = { x: x - ux * edge, y: y - uy * edge };
  const from = pt(start.x, start.y);
  const to = pt(end.x, end.y);
  // The way in runs beside the spoke, dashed, its arrow at the centre; the way out ends in an arrow at the app.
  const lane = { x: nx * 6, y: ny * 6 };
  const inTip = { x: start.x + lane.x + ux * 2, y: start.y + lane.y + uy * 2 };
  const outTip = { x: end.x - ux * 2, y: end.y - uy * 2 };
  const chevron = (tip: { x: number; y: number }, back: number) => `M${pt(tip.x + ux * back * 6 + nx * 4, tip.y + uy * back * 6 + ny * 4)}L${pt(tip.x, tip.y)}L${pt(tip.x + ux * back * 6 - nx * 4, tip.y + uy * back * 6 - ny * 4)}`;
  const place: Place = Math.abs(Math.cos(angle)) < 0.3 ? (Math.sin(angle) < 0 ? 'top' : 'bottom') : Math.cos(angle) > 0 ? 'right' : 'left';
  return {
    i, x, y, place,
    out: `M${from}L${to}`,
    back: `M${to}L${from}`,
    tip: chevron(outTip, -1),
    trace: `M${pt(end.x + lane.x, end.y + lane.y)}L${pt(inTip.x, inTip.y)}`,
    traceTip: chevron(inTip, 1),
    away: { '--dx': `${r1(ux * 80)}px`, '--dy': `${r1(uy * 80)}px` },
  };
});

const labelAt: Record<Place, (x: number, y: number) => { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  top: (x, y) => ({ x, y: y - 46, anchor: 'middle' }),
  bottom: (x, y) => ({ x, y: y + 42, anchor: 'middle' }),
  right: (x, y) => ({ x: x + 44, y: y - 3, anchor: 'start' }),
  left: (x, y) => ({ x: x - 44, y: y - 3, anchor: 'end' }),
};

/** A flat projection of a tilted sphere, nearest neighbours joined: the /os mesh, drawn once. */
function sphereMesh(count = 64, neighbours = 4) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tilt = 0.38;
  const points = Array.from({ length: count }, (_, j) => {
    const y = 1 - (2 * (j + 0.5)) / count;
    const radius = Math.sqrt(1 - y * y);
    const x = Math.cos(golden * j) * radius;
    const z = Math.sin(golden * j) * radius;
    return { x, y: y * Math.cos(tilt) - z * Math.sin(tilt), z: y * Math.sin(tilt) + z * Math.cos(tilt) };
  });
  const at = (p: { x: number; y: number }) => `${r1(CX + p.x * R)} ${r1(CY - p.y * R)}`;
  const seen = new Set<string>();
  const front: string[] = [];
  const back: string[] = [];
  points.forEach((a, j) => {
    points
      .map((b, m) => ({ m, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter((entry) => entry.m !== j)
      .sort((u, v) => u.d - v.d)
      .slice(0, neighbours)
      .forEach(({ m }) => {
        const id = j < m ? `${j}-${m}` : `${m}-${j}`;
        if (seen.has(id)) return;
        seen.add(id);
        (a.z + points[m].z > 0 ? front : back).push(`M${at(a)}L${at(points[m])}`);
      });
  });
  return { front: front.join(''), back: back.join(''), dots: points.map((p) => ({ x: r1(CX + p.x * R), y: r1(CY - p.y * R), front: p.z > 0 })) };
}

const mesh = sphereMesh();

/** Where the outside event enters: past the ring's upper right, curving in between two apps. */
const outside = { x: 708, y: 74, path: 'M695 76C626 80 545 105 441 171', tip: 'M443.9 164.4L441 171L448.2 171.2' };

interface NodeView { i: number; x: number; y: number; state: NodeState; order: number; origin: boolean; fresh: boolean; blank: boolean; label?: Lines; place: Place; out: string; back: string; tip: string; trace: string; traceTip: string; away: Record<string, string> }

/** Everything the drawing needs for one event and mode. Pure: the component only renders it. */
function scene(event: FleetEvent, mode: Mode): NodeView[] {
  return ring.map((node) => {
    const origin = event.origin?.node === node.i;
    const fresh = event.fresh === node.i;
    let state: NodeState = event.others[mode];
    let order = 0;
    let label: Lines | undefined;
    if (mode === 'platform') {
      const at = event.lit.indexOf(node.i);
      if (at >= 0) { state = 'lit'; order = at; label = origin && event.origin ? event.origin.platform : event.receipt; }
      else order = node.i;
    } else {
      const loop = event.own.loops.indexOf(node.i);
      const dark = event.own.dark.indexOf(node.i);
      if (fresh) { state = 'setup'; label = event.own.label; }
      else if (loop >= 0) { state = 'loop'; order = loop; if (origin && event.origin) label = event.origin.own; }
      else if (dark >= 0) { state = 'dark'; order = event.own.loops.length + dark; if (dark === 0) label = event.own.label; }
    }
    return { ...node, state, order, origin, fresh, blank: state === 'dark' && Boolean(event.own.blank), label };
  });
}

const order = (value: number) => ({ '--o': value }) as CSSProperties;

/** What one app learns, every app on the platform gets: four events from our fleet, apps on their own or on one platform. */
export function FleetCompound() {
  const [eventId, setEventId] = useState<EventId>('react');
  const [mode, setMode] = useState<Mode>('platform');
  const [animate, setAnimate] = useState(false);
  const event = events.find((entry) => entry.id === eventId) ?? events[0];
  const telling = event.modes[mode];
  const nodes = scene(event, mode);
  const run = `${event.id}-${mode}`;
  const platform = mode === 'platform';
  const pick = (next: { event?: EventId; mode?: Mode }) => { setAnimate(true); if (next.event) setEventId(next.event); if (next.mode) setMode(next.mode); };
  const incoming = platform ? nodes.find((node) => node.origin || node.fresh) : undefined;
  return <section data-visual="fleet" data-event={event.id} data-mode={mode} data-animate={animate || undefined} aria-label="One fix, every app: what one app learns, every app on the platform gets">
    <header><p>FROM OUR OWN FLEET / ONE PLATFORM, MANY APPS</p><h3>One fix, <em>every app</em></h3><p>Four things that happened across our own apps. Pick one, then compare every app on its own with all of them on one platform.</p></header>
    <nav data-modes="" aria-label="Compare how the fleet carries it">{modes.map((entry) => <button key={entry.id} type="button" aria-pressed={mode === entry.id} onClick={() => pick({ mode: entry.id })}>{entry.label}<small>{event.modes[entry.id].count}</small></button>)}</nav>
    <nav data-events="" aria-label="Choose what happened">{events.map((entry) => <button key={entry.id} type="button" value={entry.id} aria-pressed={event.id === entry.id} onClick={() => pick({ event: entry.id })}><span>{entry.capability}</span>{entry.label}</button>)}</nav>
    <div data-map="">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${event.label}, ${platform ? 'on one platform' : 'apps on their own'}. ${telling.picture}`}>
        <defs><radialGradient id="fleet-core-glow"><stop offset="0" /><stop offset="1" /></radialGradient></defs>
        <g key={`back-${run}`} data-back="">
          <ellipse data-orbit="" cx={CX} cy={CY} rx={RX} ry={RY} />
          <circle data-glow="" cx={CX} cy={CY} r={R * 1.75} fill="url(#fleet-core-glow)" />
          <g data-spokes="">{nodes.map((node) => <path key={node.i} d={node.out} pathLength={1} data-on={platform && (node.state === 'lit' || node.state === 'soft') ? node.state : undefined} style={order(node.order)} />)}</g>
          {platform && <g data-tips="">{nodes.filter((node) => node.state === 'lit').map((node) => <path key={node.i} d={node.tip} style={order(node.order)} />)}</g>}
          {platform && <g data-pulses="">{nodes.filter((node) => node.state === 'lit' || node.state === 'soft').map((node) => <path key={node.i} d={node.out} pathLength={1} style={order(node.order)} />)}</g>}
          {incoming && <><path data-trace="" d={incoming.trace} /><path data-trace-tip="" d={incoming.traceTip} /><path data-incoming="" d={incoming.back} pathLength={1} /></>}
          {event.outside && platform && <><path data-trace="" d={outside.path} /><path data-trace-tip="" d={outside.tip} /><path data-incoming="" d={outside.path} pathLength={1} /></>}
        </g>
        <g data-mesh=""><path data-far="" d={mesh.back} /><path data-near="" d={mesh.front} />{mesh.dots.map((dot, index) => <circle key={index} cx={dot.x} cy={dot.y} r={dot.front ? 1.7 : 1.1} data-near={dot.front || undefined} />)}</g>
        <g key={`front-${run}`} data-front="">
          {platform && event.gate && <g data-gate="">
            <circle cx={CX} cy={CY} r={R + 13} />
            <path data-shield="" d={`M${CX} ${CY - R - 24}l8 3.2v5.4c0 4.6-3.4 7.8-8 9.4c-4.6-1.6-8-4.8-8-9.4v-5.4z`} />
            <rect data-backing="" x={CX - 78} y={CY + R + 22} width={156} height={33} rx={3} />
            <text data-label="" x={CX} y={CY + R + 35} textAnchor="middle"><tspan>{event.gate[0].toUpperCase()}</tspan><tspan x={CX} dy={14}>{event.gate[1]}</tspan></text>
          </g>}
          {platform && event.gate && <ellipse data-wave="" cx={CX} cy={CY} rx={RX + 14} ry={RY + 14} />}
          {nodes.map((node) => {
            const label = node.label && labelAt[node.place](node.x, node.y);
            return <g key={node.i} transform={`translate(${node.x} ${node.y})`} data-state={node.state} data-origin={node.origin || undefined} data-fresh={node.fresh || undefined} style={{ ...order(node.order), ...(node.fresh ? node.away : {}) } as CSSProperties}>
              <g data-arrive="">
                {node.origin && <circle data-found="" r={37} />}
                {(node.state === 'loop' || node.state === 'setup') && <g data-loop=""><g transform={`rotate(${(node.i * 97) % 360})`}><path d="M28.2 -10.3A30 30 0 1 1 10.3 -28.2" /><path d="M5 -32.6l6.3 4.6l-5.8 5.2" /></g></g>}
                <rect data-halo="" x={-30} y={-24} width={60} height={48} rx={10} />
                <rect data-frame="" x={-20} y={-15} width={40} height={30} rx={4} />
                <path data-bar="" d="M-20 -7.5H20M-16 -11.3h.1M-12.5 -11.3h.1M-9 -11.3h.1" />
                {!node.blank && <path data-page="" d="M-13 -1.5H9M-13 4H13M-13 9.5H3" />}
                <g data-check="" transform="translate(20 -15)"><circle r={6.5} /><path d="M-2.8 .1l1.9 1.9l3.6 -3.8" /></g>
              </g>
              {node.label && label && <text data-label="" x={label.x - node.x} y={label.y - node.y} textAnchor={label.anchor}><tspan>{node.label[0].toUpperCase()}</tspan><tspan x={label.x - node.x} dy={14}>{node.label[1]}</tspan></text>}
            </g>;
          })}
          {event.outside && <g data-outside="" transform={`translate(${outside.x} ${outside.y})`}>
            <circle r={13} /><circle data-dot="" r={4} />
            <text data-label="" x={20} y={-40} textAnchor="end"><tspan>{event.outside[0].toUpperCase()}</tspan><tspan x={20} dy={14}>{event.outside[1]}</tspan></text>
          </g>}
        </g>
      </svg>
      <p key={`core-${run}`} data-core="" aria-hidden="true"><strong>{platform ? 'Orchestra OS' : 'Nothing shared'}</strong>{platform && <span>{event.core}</span>}</p>
    </div>
    <ul data-key="" aria-label="What the drawing shows">{telling.key.map((item) => <li key={item.mark} data-mark={item.mark}>{item.text}</li>)}</ul>
    <p data-outcome="" role="status"><strong>{telling.title}</strong>{telling.text}</p>
    <footer>From our own fleet · dates from our repositories · what reaches a client app depends on its stack and agreed scope</footer>
  </section>;
}
