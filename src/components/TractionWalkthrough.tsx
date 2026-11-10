'use client';

import { useEffect, useState } from 'react';
import { useCalmVideo } from '@/lib/hooks/use-calm-video';
import { firstRead, howItWorks, howItWorksHref, loop } from '@/data/traction-features';

const steps = [firstRead, ...loop];
const HOLD = 7000;

/** The engine at work, one step of the loop at a time: the same steps, names and order as the page that explains them.
 * It moves on by itself until the visitor chooses a step, pauses it, points at it or asks their system for less motion.
 * Each step links to its own words. A step with no picture yet says so. */
export function TractionWalkthrough({ from = '' }: { from?: string }) {
  const [selected, setSelected] = useState(0), [cycling, setCycling] = useState(true), [held, setHeld] = useState(false);
  const calm = useCalmVideo();
  useEffect(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) setCycling(false); }, []);
  useEffect(() => {
    if (!cycling || held) return;
    const timer = window.setTimeout(() => setSelected((at) => (at + 1) % steps.length), HOLD);
    return () => window.clearTimeout(timer);
  }, [cycling, held, selected]);
  const step = steps[selected], picture = step.picture;
  return <div data-traction-walkthrough onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)} onFocus={() => setHeld(true)} onBlur={() => setHeld(false)}>
    <div role="group" aria-label={howItWorks.steps}>
      {steps.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} aria-controls="traction-example" onClick={() => { setSelected(index); setCycling(false); }}>
        <span aria-hidden="true">{index ? String(index).padStart(2, '0') : '○'}</span>{item.name}</button>)}
    </div>
    <figure id="traction-example" data-in-action key={step.id} aria-live={cycling ? 'off' : 'polite'}>
      {picture.clip
        ? <video ref={calm} autoPlay muted loop playsInline preload="metadata" poster={picture.poster} aria-label={`${step.name} on Traction’s board: ${step.title}`}><source src={picture.clip} type="video/mp4" /></video>
        : picture.poster
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={picture.poster} alt={`${step.name} on Traction’s board: ${step.title}`} width={800} height={500} />
          : <div data-to-record=""><p>{picture.kept}</p></div>}
      <figcaption><span>{step.title}</span>{(picture.clip || picture.poster) && <small>{picture.kept}</small>}</figcaption>
    </figure>
    <p data-walkthrough-more="">
      <a href={`${howItWorksHref}${from}#${step.id}`}>{howItWorks.more}</a>
      <button type="button" aria-pressed={!cycling} onClick={() => setCycling((on) => !on)}>{cycling ? howItWorks.pause : howItWorks.play}</button>
    </p>
  </div>;
}
