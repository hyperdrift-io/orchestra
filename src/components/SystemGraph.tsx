'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { anchors, beats, inputs, readCard } from '@/data/system-graph';

/*
 * The Commander as a slowly turning globe of notes, on three.js. The scene is an
 * orthographic view of the stage in CSS pixels (x right, y up, z toward the viewer), so
 * the DOM chips, tag, cards and tooltip line up with the 3D parts by the same
 * fractions. Five beats cycle: Sense → Read → Work → Ship → Learn. Anchor notes on the
 * front hemisphere are hover targets.
 *
 * Perf: seeded PRNG, DPR cap, 30 fps, paused off-viewport and in hidden tabs, one frame
 * under reduced motion, everything disposed on unmount. Renders one frame synchronously
 * so a hidden tab still shows the globe.
 */

type Vec = { x: number; y: number };
interface Node {
  unit: THREE.Vector3;
  anchor?: (typeof anchors)[number];
  born: number;
  world: THREE.Vector3;
  depth: number;
  r: number;
}
interface Link {
  a: number;
  b: number;
  born: number;
}
interface Particle {
  curve: THREE.QuadraticBezierCurve3[];
  t: number;
  v: number;
  out: boolean;
}

const BEAT_MS = 2600;
const CREAM = new THREE.Color('#f6eee1');
const GOLD = new THREE.Color('#e3a857');

const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

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

/** A soft radial sprite, drawn once. */
const glowTexture = () => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
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

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      stageEl.dataset.stage = '0';
      return;
    }
    renderer.setClearColor(0x000000, 0);
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const R = rng(7);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -4000, 4000);
    camera.position.z = 1000;
    const glow = glowTexture();
    const disposables: { dispose: () => void }[] = [glow];

    /* — The mesh: a Fibonacci sphere, jittered, plus a few interior notes */
    const mesh: Node[] = [];
    const links: Link[] = [];
    const SHELL = 48;
    const node = (v: THREE.Vector3, born = 0): Node => ({ unit: v, born, world: new THREE.Vector3(), depth: 0, r: 0 });
    for (let i = 0; i < SHELL; i++) {
      const y = 1 - (i / (SHELL - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      const j = 0.06;
      mesh.push(node(new THREE.Vector3(Math.cos(th) * rad + (R() - 0.5) * j, y + (R() - 0.5) * j, Math.sin(th) * rad + (R() - 0.5) * j)));
    }
    for (let i = 0; i < 14; i++) {
      mesh.push(node(new THREE.Vector3(R() * 2 - 1, R() * 2 - 1, R() * 2 - 1).normalize().multiplyScalar(0.35 + R() * 0.4)));
    }
    const nearest = (i: number, k: number) =>
      mesh
        .map((n, j) => ({ j, d: mesh[i].unit.distanceTo(n.unit) }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, k);
    const wire = (a: number, b: number, born: number) => {
      if (a === b || links.some((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a))) return;
      links.push({ a, b, born });
    };
    for (let i = 0; i < mesh.length; i++) nearest(i, 3).forEach((o) => R() < 0.9 && wire(i, o.j, 0));
    const step = Math.floor(SHELL / anchors.length);
    const anchorIdx = anchors.map((a, i) => {
      const idx = i * step + 2;
      mesh[idx].anchor = a;
      return idx;
    });
    const idxOf = (slug: string) => anchorIdx[anchors.findIndex((a) => a.slug === slug)];
    anchors.forEach((a, i) => a.links.forEach((s) => wire(anchorIdx[i], idxOf(s), 0)));
    const BASE = mesh.length;
    const NODE_CAP = BASE + 16;
    const LINK_CAP = 480;

    /* — Scene objects */
    const globe = new THREE.Group();
    scene.add(globe);

    const sphere = new THREE.SphereGeometry(1, 10, 8);
    const noteMat = new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.95 });
    const notes = new THREE.InstancedMesh(sphere, noteMat, NODE_CAP);
    notes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(notes);

    const anchorMat = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 1 });
    const anchorNotes = new THREE.InstancedMesh(sphere, anchorMat, anchors.length);
    anchorNotes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(anchorNotes);

    const ringGeo = new THREE.RingGeometry(1, 1.16, 40);
    const ringMat = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
    const rings = new THREE.InstancedMesh(ringGeo, ringMat, anchors.length);
    rings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(rings);

    const linkGeo = new THREE.BufferGeometry();
    const linkPos = new Float32Array(LINK_CAP * 6);
    const linkCol = new Float32Array(LINK_CAP * 6);
    linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3).setUsage(THREE.DynamicDrawUsage));
    linkGeo.setAttribute('color', new THREE.BufferAttribute(linkCol, 3).setUsage(THREE.DynamicDrawUsage));
    const linkMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    scene.add(new THREE.LineSegments(linkGeo, linkMat));

    const guideMat = (color: THREE.Color) => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false });
    const inMat = guideMat(CREAM);
    const outMat = guideMat(GOLD);
    const guides: THREE.Line[] = [];
    for (let i = 0; i < inputs.length + 1; i++) {
      const l = new THREE.Line(new THREE.BufferGeometry(), inMat);
      guides.push(l);
      scene.add(l);
    }
    const outGuide = new THREE.Line(new THREE.BufferGeometry(), outMat);
    scene.add(outGuide);

    const merge = new THREE.Mesh(new THREE.CircleGeometry(3, 18), new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.35 }));
    scene.add(merge);

    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: GOLD, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(halo);

    const partGeo = (cap: number) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(cap * 3), 3).setUsage(THREE.DynamicDrawUsage));
      g.setDrawRange(0, 0);
      return g;
    };
    const PART_CAP = 24;
    const inParts = new THREE.Points(partGeo(PART_CAP), new THREE.PointsMaterial({ map: glow, color: CREAM, size: 9, sizeAttenuation: false, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    const outParts = new THREE.Points(partGeo(PART_CAP), new THREE.PointsMaterial({ map: glow, color: GOLD, size: 12, sizeAttenuation: false, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(inParts, outParts);

    const rippleGeo = new THREE.RingGeometry(0.93, 1, 56);
    const ripplePool = Array.from({ length: 6 }, () => {
      const m = new THREE.Mesh(rippleGeo, new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
      m.visible = false;
      scene.add(m);
      return m;
    });
    const ripples: { mesh: THREE.Mesh; t0: number }[] = [];

    disposables.push(sphere, noteMat, anchorMat, ringGeo, ringMat, linkGeo, linkMat, inMat, outMat, merge.geometry, merge.material, halo.material, inParts.geometry, inParts.material, outParts.geometry, outParts.material, rippleGeo, ...ripplePool.map((m) => m.material), ...guides.map((g) => g.geometry), outGuide.geometry);

    /* — Layout in CSS pixels; world y is up, so S() flips */
    let W = 0;
    let H = 0;
    let rad = 0;
    let L = LAYOUTS.wide;
    const S = (f: Vec, z = 0) => new THREE.Vector3(f.x * W, H - f.y * H, z);
    const chipAt = (i: number) => S(L.chips[i], -rad - 8);
    const curve = (a: THREE.Vector3, b: THREE.Vector3, bend: THREE.Vector3) => new THREE.QuadraticBezierCurve3(a, bend, b);
    const inCurves = (i: number) => {
      const a = chipAt(i);
      const m = S(L.merge, -rad - 8);
      const c = S(L.core, -rad - 8);
      return [curve(a, m, new THREE.Vector3((a.x + m.x) / 2, a.y, a.z)), curve(m, c, new THREE.Vector3((m.x + c.x) / 2, m.y, m.z))];
    };
    const outCurve = () => {
      const c = S(L.core, rad + 8);
      const o = S(L.out, rad + 8);
      return curve(c, o, new THREE.Vector3((c.x + o.x) / 2, c.y + 20, c.z));
    };

    const size = () => {
      const parentW = stageEl.parentElement?.clientWidth ?? stageEl.clientWidth;
      const tall = parentW < 640;
      L = tall ? LAYOUTS.tall : LAYOUTS.wide;
      stageEl.dataset.layout = tall ? 'tall' : 'wide';
      W = stageEl.clientWidth;
      H = stageEl.clientHeight;
      rad = L.radius * H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H, false);
      camera.right = W;
      camera.top = H;
      camera.updateProjectionMatrix();
      globe.position.copy(S(L.core));
      halo.position.copy(S(L.core, -rad - 30));
      halo.scale.set(rad * 2.9, rad * 2.9, 1);
      merge.position.copy(S(L.merge, -rad - 6));
      for (let i = 0; i < inputs.length; i++) guides[i].geometry.setFromPoints(inCurves(i)[0].getPoints(24));
      guides[inputs.length].geometry.setFromPoints(inCurves(0)[1].getPoints(24));
      outGuide.geometry.setFromPoints(outCurve().getPoints(24));
    };

    /* — Runtime */
    let stage = 1;
    let stageAt = 0;
    const parts: Particle[] = [];
    let lastFeed = 0;
    let lastShip = 0;
    let lastGrow = 0;
    let lastRip = 0;
    let hovered = -1;
    const tmp = new THREE.Vector3();
    const mat4 = new THREE.Matrix4();
    const quat = new THREE.Quaternion();
    const scl = new THREE.Vector3();
    const col = new THREE.Color();

    const feed = (now: number) => {
      parts.push({ curve: inCurves(Math.floor(R() * inputs.length)), t: 0, v: 0.55 + R() * 0.3, out: false });
      lastFeed = now;
    };
    const ship = (now: number) => {
      parts.push({ curve: [outCurve()], t: 0, v: 0.6 + R() * 0.3, out: true });
      lastShip = now;
    };
    const grow = (now: number) => {
      mesh.push(node(new THREE.Vector3(R() * 2 - 1, R() * 2 - 1, R() * 2 - 1).normalize(), now));
      const idx = mesh.length - 1;
      nearest(idx, 3).forEach((o, k) => (k < 2 || R() < 0.5) && wire(idx, o.j, now));
      if (mesh.length > NODE_CAP - 1) {
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
    const ripple = (at: THREE.Vector3, now: number) => {
      const m = ripplePool.find((p) => !p.visible);
      if (!m) return;
      m.position.set(at.x, at.y, rad + 12);
      m.visible = true;
      ripples.push({ mesh: m, t0: now });
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
          if (src.depth > -0.2) ripple(src.world, now);
          lastRip = now;
        }
      }

      inMat.opacity = stage === 1 ? 0.3 : 0.08;
      outMat.opacity = stage === 4 ? 0.4 : 0.08;
      (merge.material as THREE.MeshBasicMaterial).opacity = stage === 1 ? 0.8 : 0.35;
      halo.material.opacity = (stage === 2 || stage === 3 ? 0.17 : 0.1) + Math.sin(now / 1200) * 0.02;

      /* project the mesh through the turning globe */
      globe.rotation.set(0.32, now * 0.00012, 0);
      globe.updateMatrixWorld(true);
      for (const n of mesh) {
        n.world.copy(n.unit).multiplyScalar(rad);
        globe.localToWorld(n.world);
        n.depth = (n.world.z - globe.position.z) / rad;
        n.r = (n.anchor ? 3.6 : 1.6) * (0.55 + (0.45 * (n.depth + 1)) / 2) * (L === LAYOUTS.tall ? 1.25 : 1);
      }

      let ni = 0;
      let ai = 0;
      for (let i = 0; i < mesh.length; i++) {
        const n = mesh[i];
        const age = Math.min(1, (now - n.born) / 500);
        const k = (n.depth + 1) / 2;
        if (n.anchor) {
          const hot = i === hovered;
          scl.setScalar(n.r * age * (hot ? 1.5 : 1));
          anchorNotes.setMatrixAt(ai, mat4.compose(n.world, quat, scl));
          anchorNotes.setColorAt(ai, col.copy(GOLD).multiplyScalar(0.5 + 0.5 * k));
          scl.setScalar(n.depth > 0 ? n.r + 3 : 0.001);
          rings.setMatrixAt(ai, mat4.compose(tmp.copy(n.world).setZ(n.world.z + 1), quat, scl));
          ai++;
        } else {
          scl.setScalar(n.r * age);
          notes.setMatrixAt(ni, mat4.compose(n.world, quat, scl));
          notes.setColorAt(ni, col.copy(CREAM).multiplyScalar((0.25 + 0.75 * k) * age));
          ni++;
        }
      }
      notes.count = ni;
      notes.instanceMatrix.needsUpdate = true;
      if (notes.instanceColor) notes.instanceColor.needsUpdate = true;
      anchorNotes.instanceMatrix.needsUpdate = true;
      if (anchorNotes.instanceColor) anchorNotes.instanceColor.needsUpdate = true;
      rings.instanceMatrix.needsUpdate = true;

      /* links, depth-cued by brightness; the hovered anchor's links turn gold */
      let li = 0;
      for (const l of links) {
        const a = mesh[l.a];
        const b = mesh[l.b];
        if (!a || !b || li >= LINK_CAP) continue;
        const d = (a.depth + b.depth) / 2;
        const age = Math.min(1, (now - l.born) / 600);
        const hot = hovered >= 0 && (l.a === hovered || l.b === hovered);
        col.copy(hot ? GOLD : CREAM).multiplyScalar(hot ? 0.95 : (0.05 + (0.24 * (d + 1)) / 2) * age);
        const o = li * 6;
        linkPos[o] = a.world.x;
        linkPos[o + 1] = a.world.y;
        linkPos[o + 2] = a.world.z;
        linkPos[o + 3] = b.world.x;
        linkPos[o + 4] = b.world.y;
        linkPos[o + 5] = b.world.z;
        linkCol[o] = linkCol[o + 3] = col.r;
        linkCol[o + 1] = linkCol[o + 4] = col.g;
        linkCol[o + 2] = linkCol[o + 5] = col.b;
        li++;
      }
      linkGeo.setDrawRange(0, li * 2);
      linkGeo.attributes.position.needsUpdate = true;
      linkGeo.attributes.color.needsUpdate = true;

      /* ripples from a real anchor */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const k = (now - rp.t0) / 1400;
        if (k >= 1) {
          rp.mesh.visible = false;
          ripples.splice(i, 1);
          continue;
        }
        rp.mesh.scale.setScalar(6 + k * 46);
        (rp.mesh.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - k);
      }

      /* particles: in along two curves (t 0..2), out along one (t 0..1) */
      const inPos = inParts.geometry.attributes.position.array as Float32Array;
      const outPos = outParts.geometry.attributes.position.array as Float32Array;
      let pi = 0;
      let po = 0;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.t += p.v * 0.016;
        if (p.t >= p.curve.length) {
          if (p.out) arrive();
          parts.splice(i, 1);
          continue;
        }
        const seg = p.curve[Math.min(p.curve.length - 1, Math.floor(p.t))];
        seg.getPoint(p.t % 1, tmp);
        if (p.out && po < PART_CAP) {
          outPos.set([tmp.x, tmp.y, tmp.z], po * 3);
          po++;
        } else if (!p.out && pi < PART_CAP) {
          inPos.set([tmp.x, tmp.y, tmp.z], pi * 3);
          pi++;
        }
      }
      inParts.geometry.setDrawRange(0, pi);
      inParts.geometry.attributes.position.needsUpdate = true;
      outParts.geometry.setDrawRange(0, po);
      outParts.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    /* — Hover: nearest front-hemisphere anchor, in CSS pixels */
    const pick = (e: PointerEvent, maxD: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * W;
      const y = H - ((e.clientY - rect.top) / rect.height) * H;
      let best = -1;
      let bd = maxD;
      mesh.forEach((n, i) => {
        if (!n.anchor || n.depth < 0) return;
        const d = Math.hypot(n.world.x - x, n.world.y - y);
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
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
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
