'use client';
import { useEffect, useRef, useState } from 'react';
import type { OperatingSceneEngine } from './scene';
import { operatingScenes } from './data';

export function useOperatingSystem() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const appLabel = useRef<HTMLParagraphElement>(null);
  const labels = useRef<(HTMLButtonElement | null)[]>([]);
  const engine = useRef<OperatingSceneEngine | null>(null);
  const current = useRef<number | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  const chooseStep = (index: number | null) => {
    current.current = index;
    setStep(index);
    engine.current?.goTo(index);
  };
  const chooseDomain = (index: number) => {
    const next = operatingScenes.findIndex(item => item.domain === index);
    if (next < 0) return;
    chooseStep(next);
    return next;
  };

  useEffect(() => {
    let cancelled = false;
    import('./scene').then(({ createOperatingScene }) => {
      if (cancelled || !canvas.current || !surface.current) return;
      engine.current = createOperatingScene({
        canvas: canvas.current, host: surface.current, labels: () => labels.current,
        appLabel: () => appLabel.current, onDomain: chooseDomain,
        onPlaying: setPlaying, onMotion: setReduced, onAvailable: setAvailable,
      });
      engine.current.goTo(current.current);
    }).catch(() => { if (!cancelled) { setAvailable(false); setPlaying(false); } });
    return () => { cancelled = true; engine.current?.dispose(); engine.current = null; };
  }, []);

  return { canvas, surface, appLabel, labels, step, playing, reduced, available, chooseStep, chooseDomain,
    toggle: () => engine.current?.play(!playing) };
}
