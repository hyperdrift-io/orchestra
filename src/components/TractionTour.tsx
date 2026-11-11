'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { tour } from '@/data/traction-tour';

/**
 * Traction at work: one continuous film of the real app (`@/data/traction-tour`), an opening question, five narrated
 * chapters and the close. It plays muted once it scrolls into view and pauses when it leaves; a click on the picture or
 * the button pauses it, a chapter jumps to its start and fills as it plays. Its last frame carries the page's door,
 * handed in by the page in the page's own words; on a narrow screen the door sits under the picture instead. Reduced
 * motion: no autoplay; the poster waits for the visitor. Narrow screens get the 720p copy and read the film's narration,
 * line by line, under the picture, as screen readers do.
 */

const chapters = tour.chapters;
const END = chapters.length;
/** -1 while the opening question plays, a chapter's index, or END once the close starts. */
const sceneAt = (t: number) => t >= tour.close ? END : chapters.reduce((found, chapter, index) => t >= chapter.start ? index : found, -1);
/** The film's narration line on screen at t in a chapter, or -1 before its first. */
const sayAt = (t: number, scene: number) => chapters[scene]?.says.reduce((found, say, index) => t >= say.at ? index : found, -1) ?? -1;

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

export function TractionTour({ door }: { door: { href: string; label: string } }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [scene, setScene] = useState(-1);
  const [say, setSay] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [away, setAway] = useState(false);
  const [paused, setPaused] = useState<boolean | null>(null);
  const [ended, setEnded] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const seen = useRef(new Set<string>());
  const how = useRef('auto');
  const last = useRef({ scene: -1, say: -1, door: false });
  const calm = useReducedMotion();
  // Reduced motion: nothing plays until the visitor asks.
  const stopped = paused ?? calm;
  const running = visible && !away && !stopped && !ended;

  useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.45 });
    observer.observe(node);
    const hidden = () => setAway(document.hidden);
    document.addEventListener('visibilitychange', hidden);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', hidden); };
  }, []);

  // The film plays while the tour runs. A play cut short by a seek is tried again once it can play; only a browser that
  // refuses autoplay leaves the film paused, for the visitor to start.
  useEffect(() => {
    const clip = video.current;
    if (!clip) return;
    if (!running) { clip.pause(); return; }
    const start = () => { void clip.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'NotAllowedError') setPaused(true);
      else clip.addEventListener('canplay', start, { once: true });
    }); };
    start();
    return () => clip.removeEventListener('canplay', start);
  }, [running]);

  // Where the film is: the chapter, its bar filling, and the door once it shows in the frame.
  const sync = useCallback(() => {
    const clip = video.current;
    if (!clip) return;
    const t = clip.currentTime, now = sceneAt(t), chapter = chapters[now];
    const next = now + 1 < END ? chapters[now + 1].start : tour.close;
    root.current?.style.setProperty('--p', chapter ? Math.min(1, (t - chapter.start) / (next - chapter.start)).toFixed(4) : '0');
    if (now !== last.current.scene) { last.current.scene = now; setScene(now); }
    const line = sayAt(t, now);
    if (line !== last.current.say) { last.current.say = line; setSay(line); }
    if ((t >= tour.door.at) !== last.current.door) { last.current.door = t >= tour.door.at; setDoorOpen(last.current.door); }
    if (chapter && !seen.current.has(chapter.id)) { seen.current.add(chapter.id); trackEvent('tour_chapter', { chapter: chapter.id, how: how.current }); }
  }, []);
  useEffect(() => {
    const clip = video.current;
    if (!clip || !running) return;
    let frame = 0;
    const tick = () => { sync(); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, sync]);

  const go = (index: number) => {
    const clip = video.current;
    if (!clip) return;
    how.current = 'chip';
    clip.currentTime = chapters[index].start + 0.01;
    setEnded(false); setPaused(false); sync();
  };
  const toggle = ended ? 'again' : stopped ? 'play' : 'pause';
  const press = () => {
    const clip = video.current;
    if (ended && clip) { how.current = 'again'; seen.current.clear(); clip.currentTime = 0; setEnded(false); setPaused(false); sync(); return; }
    setPaused(!stopped);
  };
  const current = scene < 0 ? tour.opening : scene >= END ? tour.end : chapters[scene];
  const label = scene >= 0 && scene < END ? tour.labels[chapters[scene].label] : scene >= END ? tour.labels.end : tour.labels.film;

  return <div ref={root} data-traction-tour="" data-running={running || undefined} data-ended={ended || undefined}>
    <div data-tour-stage="">
      <div data-tour-window="">
        <video ref={video} poster={tour.poster} muted playsInline preload="metadata" aria-label={tour.labels.film}
          onClick={() => { if (!ended) press(); }} onSeeked={sync}
          onEnded={() => { setEnded(true); sync(); trackEvent('tour_completed', { how: how.current }); }}>
          <source src={tour.small} type="video/mp4" media="(max-width: 760px)" />
          <source src={tour.src} type="video/mp4" />
        </video>
      </div>
      {doorOpen && <a data-tour-door="" data-placement="tour_door" href={door.href} onClick={() => trackEvent('tour_door', { href: door.href })}
        style={{ left: `${(tour.door.left + tour.door.width / 2) * 100}%`, top: `${(tour.door.top + tour.door.height / 2) * 100}%`, width: `${tour.door.width * 100}%`, height: `${tour.door.height * 100}%` }}>{door.label}</a>}
    </div>
    <div data-tour-bar="">
      <div data-chapters="" role="group" aria-label={tour.labels.chapters}>
        {chapters.map((item, index) => <button key={item.id} type="button" aria-pressed={index === scene} data-done={index < scene || undefined}
          onClick={() => go(index)}>{item.name}</button>)}
      </div>
      <button type="button" data-tour-toggle="" aria-label={tour.labels[toggle]} title={tour.labels[toggle]} onClick={press}>
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">{toggle === 'pause'
          ? <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />
          : toggle === 'play' ? <path d="M4.5 2.4l9 5.6-9 5.6z" />
          : <path d="M8 2.2a5.8 5.8 0 1 1-5.6 4.3l1.9.5A3.8 3.8 0 1 0 8 4.2v2.3L4.6 3.2 8 0z" />}</svg>
      </button>
    </div>
    {/* The film carries its own words; a narrow screen and a screen reader get them here. */}
    <div data-tour-caption="" aria-live={running ? 'off' : 'polite'}>
      <h3>{current.title}</h3>
      <p>{scene >= 0 && scene < END && say >= 0 ? chapters[scene].says[say].text : current.line}</p>
      {scene >= END && <dl data-tour-ledger="">
        <div><dt>{tour.labels.yourPart}</dt>{tour.ledger.you.map((item) => <dd key={item.label}>{item.count} {item.label}</dd>)}</div>
        <div><dt>{tour.labels.itsPart}</dt>{tour.ledger.traction.map((item) => <dd key={item.label}>{item.count} {item.label}</dd>)}</div>
      </dl>}
      <small>{label}</small>
    </div>
  </div>;
}
