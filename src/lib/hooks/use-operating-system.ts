'use client';
import { useEffect, useRef, useState } from 'react';
import type { OperatingSceneEngine } from '@/lib/operating-scene';
import { operatingScenes, operatingScenarios } from '@/data/operating-system';

export function useOperatingSystem() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const appLabel = useRef<HTMLParagraphElement>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const labels = useRef<(HTMLButtonElement | null)[]>([]);
  const engine = useRef<OperatingSceneEngine | null>(null);
  const [scene, setScene] = useState(0);
  const [scenario, setScenario] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(motion.matches);
    if (motion.matches) setPlaying(false);
    import('@/lib/operating-scene').then(({ createOperatingScene }) => {
      if (cancelled || !canvas.current || !surface.current) return;
      engine.current = createOperatingScene({ canvas: canvas.current, host: surface.current, labels: () => labels.current, appLabel: () => appLabel.current, onSelect: setSelected, onScene: setScene, onPlaying: setPlaying, onMotion: setReduced, onAvailable: setAvailable });
    }).catch(() => { if (!cancelled) { setAvailable(false); setPlaying(false); } });
    return () => { cancelled = true; engine.current?.dispose(); engine.current = null; };
  }, []);

  const chooseScene = (index: number) => {
    setScene(index); setSelected(null);
    engine.current?.goTo(index);
  };
  const chooseScenario = (index: number) => {
    setScenario(index); setSelected(null); engine.current?.scenario(index);
  };
  const select = (index: number | null) => {
    setSelected(index); engine.current?.select(index);
  };
  const toggle = () => { setSelected(null); engine.current?.play(!playing); };
  const replay = () => { setSelected(null); engine.current?.replay(); };
  const back = () => { const index = selected; select(null); if (index !== null) controls.current[index]?.focus({ preventScroll: true }); };
  return { canvas, surface, appLabel, labels, controls, scene, scenario, selected, playing, reduced, available, current: operatingScenes[scene], example: operatingScenarios[scenario], chooseScene, chooseScenario, select, toggle, replay, back };
}
