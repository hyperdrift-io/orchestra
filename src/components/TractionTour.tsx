'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { trackEvent } from '@/lib/analytics';
import { tour } from '@/data/traction-tour';

/**
 * Traction at work, beside the promise: the real app, recorded on one run and played chapter by chapter, each clip
 * leading into the next (`@/data/traction-tour`). It plays muted once it scrolls into view, holds while a mouse or
 * keyboard focus is on the picture, and ends on what the founder did against what Traction did. Reduced motion: no
 * autoplay; each chapter shows its still until the visitor plays it. The signup link sits beside the tour.
 */

const chapters = tour.chapters;
const END = chapters.length;

function useReducedMotion() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setCalm(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return calm;
}

function End() {
  const { ledger, labels } = tour;
  const order = (i: number) => ({ '--i': i }) as CSSProperties;
  return <div data-tour-end="">
    <dl>
      <div data-side="you"><dt>{labels.yourPart}</dt>{ledger.you.map((item, i) => <dd key={item.label} style={order(i)}><strong>{item.count}</strong> {item.label}</dd>)}</div>
      <div data-side="traction"><dt>{labels.itsPart}</dt>{ledger.traction.map((item, i) => <dd key={item.label} style={order(i + 3)}><strong>{item.count}</strong> {item.label}</dd>)}</div>
    </dl>
    <small>{labels.end}</small>
  </div>;
}

export function TractionTour() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [chapter, setChapter] = useState(0);
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState<boolean | null>(null);
  const seen = useRef(new Set<string>());
  const calm = useReducedMotion();
  // Reduced motion: nothing plays until the visitor asks.
  const stopped = paused ?? calm;
  const id = chapter < END ? chapters[chapter].id : undefined;
  const running = visible && !held && !stopped && chapter < END;

  const note = useCallback((index: number, how: string) => {
    const key = index < END ? chapters[index].id : 'end';
    if (seen.current.has(key)) return;
    seen.current.add(key);
    if (index < END) trackEvent('tour_chapter', { chapter: key, how });
    else trackEvent('tour_completed', { how });
  }, []);

  const go = useCallback((index: number, how: string) => {
    root.current?.style.setProperty('--p', '0');
    setChapter(index);
    note(index, how);
  }, [note]);

  useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.45 });
    observer.observe(node);
    const away = () => setHeld(document.hidden);
    document.addEventListener('visibilitychange', away);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', away); };
  }, []);

  useEffect(() => { if (visible) note(0, 'auto'); }, [visible, note]);

  // The clip plays while the tour runs; the chapter's bar fills with it.
  useEffect(() => {
    const clip = video.current;
    if (!clip || !id) return;
    if (!running) { clip.pause(); return; }
    // A play interrupted by the next clip loading is tried again once it can play; only a browser that refuses
    // autoplay leaves the tour paused, for the visitor to start.
    const start = () => { void clip.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'NotAllowedError') setPaused(true);
      else clip.addEventListener('canplay', start, { once: true });
    }); };
    start();
    let frame = 0;
    const fill = () => {
      if (clip.duration) root.current?.style.setProperty('--p', (clip.currentTime / clip.duration).toFixed(4));
      frame = requestAnimationFrame(fill);
    };
    frame = requestAnimationFrame(fill);
    return () => { cancelAnimationFrame(frame); clip.removeEventListener('canplay', start); };
  }, [running, id]);

  const current = chapter < END ? chapters[chapter] : tour.end;
  const toggle = chapter >= END ? 'again' : stopped ? 'play' : 'pause';

  return <div ref={root} data-traction-tour="" data-running={running || undefined} data-ended={chapter >= END || undefined}>
    <div data-tour-bar="">
      <div data-chapters="" role="group" aria-label={tour.labels.chapters}>
        {chapters.map((item, index) => <button key={item.id} type="button" aria-pressed={index === chapter} data-done={index < chapter || undefined}
          onClick={() => { setPaused(false); go(index, 'chip'); }}>{item.name}</button>)}
      </div>
      <button type="button" data-tour-toggle="" aria-label={tour.labels[toggle]} title={tour.labels[toggle]}
        onClick={() => {
          if (chapter >= END) { seen.current.clear(); setPaused(false); go(0, 'again'); return; }
          setPaused(!stopped);
        }}>
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">{toggle === 'pause'
          ? <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />
          : toggle === 'play' ? <path d="M4.5 2.4l9 5.6-9 5.6z" />
          : <path d="M8 2.2a5.8 5.8 0 1 1-5.6 4.3l1.9.5A3.8 3.8 0 1 0 8 4.2v2.3L4.6 3.2 8 0z" />}</svg>
      </button>
    </div>
    <div data-tour-window=""
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHeld(true); }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHeld(document.hidden); }}
      onFocus={(event) => { if (event.target.matches(':focus-visible')) setHeld(true); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(document.hidden); }}>
      {id
        ? <video ref={video} src={tour.clip(id)} poster={tour.poster(id)} muted playsInline preload="metadata"
            aria-label={tour.labels.clip(chapters[chapter].name, chapters[chapter].title)}
            onEnded={() => go(chapter + 1, 'auto')} />
        : <End />}
    </div>
    <div data-tour-caption="" aria-live={running ? 'off' : 'polite'}>
      <h3>{current.title}</h3>
      <p>{current.line}</p>
      <small>{tour.labels[id ? chapters[chapter].label : 'recorded']}</small>
    </div>
  </div>;
}
