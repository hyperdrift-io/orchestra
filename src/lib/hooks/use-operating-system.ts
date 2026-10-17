'use client';
import { useEffect, useRef, useState } from 'react';
import type { OperatingSceneEngine } from '@/lib/operating-scene';
import { operatingScenes, operatingScenarios } from '@/data/operating-system';

/** Where a scene takes over the sphere: the middle of the screen, or below the pinned sphere on phones. */
const takeover = () => innerHeight * (matchMedia('(max-width: 900px)').matches ? .8 : .56);

/** The reader's scroll is the journey: the scene passing the takeover line drives the sphere. */
export function useOperatingSystem() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const appLabel = useRef<HTMLParagraphElement>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const labels = useRef<(HTMLButtonElement | null)[]>([]);
  const scenes = useRef<(HTMLLIElement | null)[]>([]);
  const engine = useRef<OperatingSceneEngine | null>(null);
  const reached = useRef(0);
  const [scene, setScene] = useState(0);
  const [scenario, setScenario] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [story, setStory] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(motion.matches);
    if (motion.matches) setPlaying(false);
    import('@/lib/operating-scene').then(({ createOperatingScene }) => {
      if (cancelled || !canvas.current || !surface.current) return;
      engine.current = createOperatingScene({ canvas: canvas.current, host: surface.current, labels: () => labels.current, appLabel: () => appLabel.current, onSelect: setSelected, onPlaying: setPlaying, onMotion: setReduced, onAvailable: setAvailable });
      engine.current.goTo(reached.current);
    }).catch(() => { if (!cancelled) { setAvailable(false); setPlaying(false); } });
    return () => { cancelled = true; engine.current?.dispose(); engine.current = null; };
  }, []);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = takeover();
      const index = scenes.current.reduce((found, element, i) => element && element.getBoundingClientRect().top <= line ? i : found, 0);
      if (index === reached.current) return;
      reached.current = index;
      setScene(index); setSelected(null);
      engine.current?.goTo(index);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read); };
    setStory(true);
    read();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); };
  }, []);

  const chooseScenario = (index: number) => {
    setScenario(index); setSelected(null); engine.current?.scenario(index);
  };
  const select = (index: number | null) => {
    setSelected(index); engine.current?.select(index);
  };
  const toggle = () => { setSelected(null); engine.current?.play(!playing); };
  const back = () => { const index = selected; select(null); if (index !== null) controls.current[index]?.focus({ preventScroll: true }); };
  return { canvas, surface, appLabel, labels, controls, scenes, scene, scenario, selected, playing, reduced, available, story, current: operatingScenes[scene], example: operatingScenarios[scenario], chooseScenario, select, toggle, back };
}
