'use client';

import { useEffect, useRef, useState } from 'react';
import { meshArtworkFrame, type MeshLayout } from './mesh-artwork-layout';

type Props = { kind: 'logo' | 'article'; slug?: string; fallback: string; fallbackSvg?: string; label?: string; size?: number; animated?: boolean; layout?: MeshLayout };

/** An SVG stays visible until the GPU has painted; motion never changes the layout. */
export function MeshArtwork({ kind, slug = '', fallback, fallbackSvg, label, size, animated = false, layout = 'cover' }: Props) {
  const host = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const paused = useRef(false);
  const requestDraw = useRef(() => {});
  const [ready, setReady] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [titleEligible, setTitleEligible] = useState(false);
  useEffect(() => {
    if (layout !== 'title') return;
    const wide = window.matchMedia('(min-width: 851px)');
    const update = () => setTitleEligible(wide.matches);
    update(); wide.addEventListener('change', update);
    return () => wide.removeEventListener('change', update);
  }, [layout]);
  useEffect(() => {
    setReady(false);
    // CSS makes the same decision before hydration. No title context on narrow screens.
    if (layout === 'title' && !titleEligible) return;
    const element = host.current!, surface = canvas.current!;
    const interaction = animated && layout !== 'cover' ? element.closest('header') ?? element : element;
    const abort = new AbortController();
    let engine: Awaited<ReturnType<typeof import('./mesh-artwork-engine').createMeshArtwork>> | undefined;
    let started = false, frame = 0, pointer = 0, pointerY = 0, smoothX = 0, smoothY = 0, contextLost = false, visible = false;
    let elapsed = 0, lastTime = 0, lastPaint = 0, paintedAt = 0, painted = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const moving = () => animated && !paused.current && !reduced.matches && visible && !document.hidden && !contextLost;
    const fail = () => { cancelAnimationFrame(frame); frame = 0; painted = false; setReady(false); };
    const draw = (now: number) => {
      frame = 0;
      if (!engine || contextLost || abort.signal.aborted) return;
      if (moving()) {
        if (lastTime && painted && now - paintedAt >= 500) elapsed += Math.min((now - lastTime) / 1000, .1);
        lastTime = now;
      } else lastTime = 0;
      // Gentle ambient motion only needs 30fps. Preserve the buffer size between frames.
      if (!moving() || now - lastPaint >= 32 || !painted) {
        try {
          smoothX += (pointer - smoothX) * (animated ? .18 : 1);
          smoothY += (pointerY - smoothY) * (animated ? .18 : 1);
          engine.render(element.clientWidth, element.clientHeight, reduced.matches ? 0 : smoothX, reduced.matches ? 0 : elapsed, reduced.matches ? 0 : smoothY);
          lastPaint = now;
          if (!painted) { painted = true; paintedAt = now; setReady(true); }
        } catch { fail(); return; }
      }
      if (moving()) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      if (!moving()) lastTime = 0;
      frame = requestAnimationFrame(draw);
    };
    requestDraw.current = schedule;
    const start = async () => {
      if (started) return;
      started = true;
      try {
        // Development-only visual QA: exercise the normal failure path without a GPU.
        if (process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).get('mesh') === 'fallback') {
          throw new Error('SVG fallback preview');
        }
        const { createMeshArtwork } = await import('./mesh-artwork-engine');
        if (abort.signal.aborted) return;
        engine = await createMeshArtwork(surface, kind, slug, fallback, abort.signal, layout, fallbackSvg);
        if (abort.signal.aborted) { engine.dispose(); return; }
        schedule();
      } catch { engine?.dispose(); engine = undefined; if (!abort.signal.aborted) fail(); }
    };
    const visibility = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) void start();
      schedule();
    });
    visibility.observe(element);
    const resize = new ResizeObserver(schedule); resize.observe(element);
    const move = (event: PointerEvent) => {
      if (kind !== 'article' || event.pointerType !== 'mouse' || paused.current) return;
      const rect = interaction.getBoundingClientRect();
      pointer = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      schedule();
    };
    const leave = () => { pointer = 0; pointerY = 0; schedule(); };
    const lost = (event: Event) => { event.preventDefault(); contextLost = true; fail(); };
    const restored = () => { contextLost = false; schedule(); };
    const preference = () => { setMotionAllowed(!reduced.matches); schedule(); };
    preference();
    surface.addEventListener('webglcontextlost', lost);
    surface.addEventListener('webglcontextrestored', restored);
    interaction.addEventListener('pointermove', move as EventListener);
    interaction.addEventListener('pointerleave', leave);
    reduced.addEventListener('change', preference);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      abort.abort(); cancelAnimationFrame(frame); visibility.disconnect(); resize.disconnect();
      requestDraw.current = () => {};
      surface.removeEventListener('webglcontextlost', lost); surface.removeEventListener('webglcontextrestored', restored);
      interaction.removeEventListener('pointermove', move as EventListener); interaction.removeEventListener('pointerleave', leave);
      reduced.removeEventListener('change', preference); document.removeEventListener('visibilitychange', schedule);
      engine?.dispose();
    };
  }, [kind, slug, fallback, fallbackSvg, animated, layout, titleEligible]);
  const inlineFallback = fallbackSvg && kind === 'article'
    ? fallbackSvg.replace('viewBox="0 0 1200 160"', `viewBox="${meshArtworkFrame(layout).viewBox}"`).replace('<svg ', `<svg preserveAspectRatio="xMidYMid ${layout === 'cover' ? 'slice' : 'meet'}" `)
    : fallbackSvg;
  return <>
    <span ref={host} data-mesh-artwork={kind} data-renderer={ready ? 'webgl' : 'fallback'} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} style={size ? { width: size, height: size } : undefined}>
      {fallbackSvg ? <span data-mesh-fallback="" dangerouslySetInnerHTML={{ __html: inlineFallback! }} /> : <img data-mesh-fallback="" src={fallback} width={kind === 'logo' ? 512 : 1200} height={kind === 'logo' ? 512 : 160} alt="" />}
      <canvas key={layout === 'title' ? String(titleEligible) : 'fixed'} ref={canvas} aria-hidden="true" />
    </span>
    {animated && ready && motionAllowed && <button type="button" data-mesh-motion="" aria-label={isPaused ? 'Resume artwork animation' : 'Pause artwork animation'} aria-pressed={isPaused} onClick={() => { paused.current = !paused.current; setPaused(paused.current); requestDraw.current(); }}><span aria-hidden="true">{isPaused ? '▷' : 'Ⅱ'}</span></button>}
  </>;
}
