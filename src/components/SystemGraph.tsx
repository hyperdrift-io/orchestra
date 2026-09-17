'use client';

import { useEffect, useRef } from 'react';
import { anchors, beats, inputs, readCard } from '@/data/system-graph';

/*
 * The Commander as a slowly turning globe of notes. Canvas 2D for everything organic
 * (mesh, links, particles, ripples); the DOM for chips, tag, cards, tooltip and
 * captions, positioned by CSS off `data-layout` and animated off `data-stage`.
 * Five beats cycle: Sense → Read → Work → Ship → Learn. Anchor notes on the front
 * hemisphere are hover targets. No dependency.
 *
 * Perf: seeded PRNG, DPR cap, 30 fps, paused off-viewport and in hidden tabs, a single
 * frame under reduced motion. Draws one frame synchronously so a hidden tab still shows
 * the globe.
 */

type Vec = { x: number; y: number };
interface Node {
  x: number;
  y: number;
  z: number;
  anchor?: (typeof anchors)[number];
  born: number;
  sx: number;
  sy: number;
  depth: number;
  r: number;
}
interface Link {
  a: number;
  b: number;
  born: number;
}
interface Particle {
  path: Vec[];
  t: number;
  v: number;
  out: boolean;
}

const CREAM = '246,238,225';
const GOLD = '227,168,87';
const BEAT_MS = 2600;

const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

/* Layouts as fractions of the stage. */
interface Layout {
  chips: readonly Vec[];
  merge: Vec;
  core: Vec;
  out: Vec;
  /** × height */
  radius: number;
}
const LAYOUTS: Record<'wide' | 'tall', Layout> = {
  wide: {
    chips: [
      { x: 0.11, y: 0.2 },
      { x: 0.11, y: 0.4 },
      { x: 0.11, y: 0.6 },
      { x: 0.11, y: 0.8 },
    ],
    merge: { x: 0.31, y: 0.5 },
    core: { x: 0.56, y: 0.52 },
    out: { x: 0.88, y: 0.5 },
    radius: 0.3,
  },
  tall: {
    chips: [
      { x: 0.28, y: 0.07 },
      { x: 0.72, y: 0.07 },
      { x: 0.28, y: 0.17 },
      { x: 0.72, y: 0.17 },
    ],
    merge: { x: 0.5, y: 0.28 },
    core: { x: 0.5, y: 0.55 },
    out: { x: 0.5, y: 0.94 },
    radius: 0.2,
  },
};

const bez = (p: Vec[], t: number): Vec => {
  const u = 1 - t;
  return {
    x: u * u * p[0].x + 2 * u * t * p[1].x + t * t * p[2].x,
    y: u * u * p[0].y + 2 * u * t * p[1].y + t * t * p[2].y,
  };
};

export function SystemGraph() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const pop = useRef<HTMLElement>(null);

  useEffect(() => {
    const stageEl = wrap.current;
    const canvas = cv.current;
    const tipEl = tip.current;
    const popEl = pop.current;
    if (!stageEl || !canvas || !tipEl || !popEl) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const R = rng(7);

    /* — The mesh: a Fibonacci sphere, jittered, plus a few interior notes */
    const mesh: Node[] = [];
    const links: Link[] = [];
    const SHELL = 48;
    for (let i = 0; i < SHELL; i++) {
      const y = 1 - (i / (SHELL - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      const j = 0.06;
      mesh.push({ x: Math.cos(th) * rad + (R() - 0.5) * j, y: y + (R() - 0.5) * j, z: Math.sin(th) * rad + (R() - 0.5) * j, born: 0, sx: 0, sy: 0, depth: 0, r: 0 });
    }
    for (let i = 0; i < 14; i++) {
      const v = { x: R() * 2 - 1, y: R() * 2 - 1, z: R() * 2 - 1 };
      const l = Math.hypot(v.x, v.y, v.z) || 1;
      const s = 0.35 + R() * 0.4;
      mesh.push({ x: (v.x / l) * s, y: (v.y / l) * s, z: (v.z / l) * s, born: 0, sx: 0, sy: 0, depth: 0, r: 0 });
    }
    const dist = (a: Node, b: Node) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    const nearest = (i: number, k: number) =>
      mesh
        .map((n, j) => ({ j, d: dist(mesh[i], n) }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, k);
    const wire = (a: number, b: number, born: number) => {
      if (a === b || links.some((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a))) return;
      links.push({ a, b, born });
    };
    for (let i = 0; i < mesh.length; i++) nearest(i, 3).forEach((o) => R() < 0.9 && wire(i, o.j, 0));

    /* Anchors: eight spread shell nodes, wired as the jobs hand off */
    const step = Math.floor(SHELL / anchors.length);
    const anchorIdx = anchors.map((a, i) => {
      const idx = i * step + 2;
      mesh[idx].anchor = a;
      return idx;
    });
    const idxOf = (slug: string) => anchorIdx[anchors.findIndex((a) => a.slug === slug)];
    anchors.forEach((a, i) => a.links.forEach((s) => wire(anchorIdx[i], idxOf(s), 0)));

    /* — Layout and projection */
    let W = 0;
    let H = 0;
    let dpr = 1;
    let L = LAYOUTS.wide;
    const pt = (f: Vec): Vec => ({ x: f.x * W, y: f.y * H });
    const chipAt = (i: number): Vec => pt(L.chips[i]);

    const size = () => {
      const parentW = stageEl.parentElement?.clientWidth ?? stageEl.clientWidth;
      const tall = parentW < 640;
      L = tall ? LAYOUTS.tall : LAYOUTS.wide;
      stageEl.dataset.layout = tall ? 'tall' : 'wide';
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = stageEl.clientWidth;
      H = stageEl.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (n: Node, t: number) => {
      const spin = t * 0.00012;
      const tilt = 0.32;
      const cx = Math.cos(spin);
      const sx = Math.sin(spin);
      const x1 = n.x * cx - n.z * sx;
      const z1 = n.x * sx + n.z * cx;
      const y1 = n.y * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = n.y * Math.sin(tilt) + z1 * Math.cos(tilt);
      const rad = L.radius * H;
      const f = 3.2;
      const p = f / (f - z2);
      const c = pt(L.core);
      n.sx = c.x + x1 * rad * p;
      n.sy = c.y + y1 * rad * p;
      n.depth = z2; // 1 = nearest
      n.r = (n.anchor ? 3.6 : 1.6) * (0.55 + 0.45 * (z2 + 1) / 2) * (L === LAYOUTS.tall ? 1.25 : 1);
    };

    /* — Runtime */
    let stage = 1;
    let stageAt = 0;
    const parts: Particle[] = [];
    const ripples: { at: Vec; t0: number }[] = [];
    let lastFeed = 0;
    let lastShip = 0;
    let lastGrow = 0;
    let lastRip = 0;
    let hovered = -1;
    const BASE = mesh.length;

    const feed = (now: number) => {
      const i = Math.floor(R() * inputs.length);
      const a = chipAt(i);
      const m = pt(L.merge);
      const c = pt(L.core);
      parts.push({ path: [a, { x: (a.x + m.x) / 2, y: a.y }, m, { x: (m.x + c.x) / 2, y: m.y }, c], t: 0, v: 0.55 + R() * 0.3, out: false });
      lastFeed = now;
    };
    const ship = (now: number) => {
      const c = pt(L.core);
      const o = pt(L.out);
      parts.push({ path: [c, { x: (c.x + o.x) / 2, y: c.y - 20 }, o], t: 0, v: 0.6 + R() * 0.3, out: true });
      lastShip = now;
    };
    const grow = (now: number) => {
      const v = { x: R() * 2 - 1, y: R() * 2 - 1, z: R() * 2 - 1 };
      const l = Math.hypot(v.x, v.y, v.z) || 1;
      mesh.push({ x: v.x / l, y: v.y / l, z: v.z / l, born: now, sx: 0, sy: 0, depth: 0, r: 0 });
      const idx = mesh.length - 1;
      nearest(idx, 3).forEach((o, k) => (k < 2 || R() < 0.5) && wire(idx, o.j, now));
      if (mesh.length > BASE + 14) {
        const gone = BASE;
        mesh.splice(gone, 1);
        for (let i = links.length - 1; i >= 0; i--) {
          const l = links[i];
          if (l.a === gone || l.b === gone) links.splice(i, 1);
          else {
            if (l.a > gone) l.a--;
            if (l.b > gone) l.b--;
          }
        }
      }
      lastGrow = now;
    };
    const arrive = () => {
      popEl.classList.remove('pop');
      void popEl.offsetWidth;
      popEl.classList.add('pop');
    };

    const draw = (now: number) => {
      if (!still) {
        if (now - stageAt > BEAT_MS) {
          stage = (stage % beats.length) + 1;
          stageAt = now;
          stageEl.dataset.stage = String(stage);
        }
        if (stage === 1 && parts.length < 4 && now - lastFeed > 420) feed(now);
        if (stage === 3 && now - lastGrow > 520) grow(now);
        if (stage === 4 && parts.filter((p) => p.out).length < 3 && now - lastShip > 520) ship(now);
        if ((stage === 2 || stage === 5) && now - lastRip > 800) {
          const src = mesh[idxOf(stage === 2 ? 'read' : 'learn')];
          if (src.depth > -0.2) ripples.push({ at: { x: src.sx, y: src.sy }, t0: now });
          lastRip = now;
        }
      }

      ctx.clearRect(0, 0, W, H);
      const c = pt(L.core);
      const m = pt(L.merge);
      const o = pt(L.out);

      /* guide curves: chips converge on the merge point, one stream continues to the core, one leaves */
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${CREAM},${stage === 1 ? 0.28 : 0.08})`;
      for (let i = 0; i < inputs.length; i++) {
        const a = chipAt(i);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo((a.x + m.x) / 2, a.y, m.x, m.y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.quadraticCurveTo((m.x + c.x) / 2, m.y, c.x, c.y);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${GOLD},${stage === 4 ? 0.35 : 0.08})`;
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.quadraticCurveTo((c.x + o.x) / 2, c.y - 20, o.x, o.y);
      ctx.stroke();
      ctx.fillStyle = `rgba(${CREAM},${stage === 1 ? 0.8 : 0.35})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 3, 0, Math.PI * 2);
      ctx.fill();

      /* globe glow and rim */
      const rad = L.radius * H;
      const ga = (stage === 2 || stage === 3 ? 0.16 : 0.1) + Math.sin(now / 1200) * 0.02;
      const g = ctx.createRadialGradient(c.x, c.y, rad * 0.2, c.x, c.y, rad * 1.35);
      g.addColorStop(0, `rgba(${GOLD},${ga})`);
      g.addColorStop(1, `rgba(${GOLD},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c.x, c.y, rad * 1.35, 0, Math.PI * 2);
      ctx.fill();

      mesh.forEach((n) => project(n, now));

      /* links, depth-cued; the hovered anchor’s links turn gold */
      for (const l of links) {
        const a = mesh[l.a];
        const b = mesh[l.b];
        if (!a || !b) continue;
        const d = (a.depth + b.depth) / 2;
        const age = Math.min(1, (now - l.born) / 600);
        const hot = hovered >= 0 && (l.a === hovered || l.b === hovered);
        ctx.strokeStyle = hot ? `rgba(${GOLD},0.9)` : `rgba(${CREAM},${(0.06 + 0.22 * (d + 1) / 2) * age})`;
        ctx.lineWidth = hot ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      /* nodes back to front */
      const order = mesh.map((_, i) => i).sort((p, q) => mesh[p].depth - mesh[q].depth);
      for (const i of order) {
        const n = mesh[i];
        const age = Math.min(1, (now - n.born) / 500);
        const k = (n.depth + 1) / 2;
        const isHot = i === hovered;
        ctx.fillStyle = n.anchor ? `rgba(${GOLD},${(0.55 + 0.45 * k) * age})` : `rgba(${CREAM},${(0.25 + 0.6 * k) * age})`;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, n.r * age * (isHot ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
        if (n.anchor && n.depth > 0) {
          ctx.strokeStyle = `rgba(${GOLD},${0.35 * k})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, n.r + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      /* ripples from a real anchor */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const k = (now - rp.t0) / 1400;
        if (k >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${GOLD},${0.6 * (1 - k)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.at.x, rp.at.y, 6 + k * 46, 0, Math.PI * 2);
        ctx.stroke();
      }

      /* particles: in along two curves (t 0..2), out along one (t 0..1) */
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.t += p.v * 0.016;
        const end = p.out ? 1 : 2;
        if (p.t >= end) {
          if (p.out) arrive();
          parts.splice(i, 1);
          continue;
        }
        const seg = p.out ? p.path : p.t < 1 ? p.path.slice(0, 3) : p.path.slice(2, 5);
        const q = bez(seg, p.out ? p.t : p.t % 1);
        ctx.fillStyle = p.out ? `rgba(${GOLD},0.95)` : `rgba(${CREAM},0.9)`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, p.out ? 3 : 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* — Hover: nearest front-hemisphere anchor */
    const pick = (e: PointerEvent, maxD: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * W;
      const y = ((e.clientY - rect.top) / rect.height) * H;
      let best = -1;
      let bd = maxD;
      mesh.forEach((n, i) => {
        if (!n.anchor || n.depth < 0) return;
        const d = Math.hypot(n.sx - x, n.sy - y);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };
    const select = (i: number) => {
      hovered = i;
      stageEl.classList.toggle('is-hover', i >= 0);
      if (i < 0) {
        tipEl.hidden = true;
        return;
      }
      const a = mesh[i].anchor!;
      const named = a.links.map((s) => anchors.find((x) => x.slug === s)?.name).filter(Boolean);
      tipEl.innerHTML = '<b></b><small></small>';
      (tipEl.firstChild as HTMLElement).textContent = a.name;
      (tipEl.lastChild as HTMLElement).textContent = `hands off to ${named.join(' · ')}`;
      tipEl.hidden = false;
      tipEl.classList.remove('swap');
      void tipEl.offsetWidth;
      tipEl.classList.add('swap');
      if (still) draw(performance.now());
    };
    const onMove = (e: PointerEvent) => select(pick(e, 26));
    const onLeave = () => select(-1);
    const onTap = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') select(pick(e, 34));
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onTap);

    /* — Loop: 30 fps, paused off-viewport and in hidden tabs; one frame when still */
    const ro = new ResizeObserver(() => {
      size();
      draw(performance.now());
    });
    ro.observe(stageEl);
    size();
    stageAt = performance.now();
    draw(stageAt);

    let raf = 0;
    let visible = true;
    let lastFrame = 0;
    const frame = (now: number) => {
      if (now - lastFrame >= 33) {
        lastFrame = now;
        draw(now);
      }
      raf = requestAnimationFrame(frame);
    };
    const run = () => {
      cancelAnimationFrame(raf);
      if (!still && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((en) => en.isIntersecting);
      run();
    });
    io.observe(stageEl);
    document.addEventListener('visibilitychange', run);
    run();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', run);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onTap);
    };
  }, []);

  return (
    <div className="xstage" ref={wrap} data-stage="1" data-layout="wide">
      <canvas ref={cv} aria-hidden="true" />
      {inputs.map((c, i) => (
        <div key={c.key} className="chip" data-chip={i + 1}>
          <em aria-hidden="true" />
          <b>{c.name}</b>
          <small>{c.tool}</small>
        </div>
      ))}
      <div className="tag">
        <b>The Commander</b>
        <small>reads · decides · learns</small>
      </div>
      <div className="read">
        <span aria-hidden="true" />
        {readCard}
      </div>
      <div className="out">
        <i ref={pop} aria-hidden="true">
          +1 shipped
        </i>
        <b>One email</b>
        <span>Verdict · call · opportunity</span>
        <small>every morning, before the day</small>
      </div>
      <div className="tip" ref={tip} hidden />
      <p className="hint" aria-hidden="true">
        Hover or tap a <i>gold note</i> to see its handoffs
      </p>
      <p className="caps" aria-live="polite">
        {beats.map((b) => (
          <span key={b.stage}>
            <b>{b.name}.</b> {b.caption}
          </span>
        ))}
      </p>
    </div>
  );
}
