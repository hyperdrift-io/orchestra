'use client';
import { useEffect, useState } from 'react';
import type { LiveRead } from '@/lib/traction-read';

const LABELS = ['Strength', 'In the way', 'Next customer move'] as const;
const EVERY_MS = 2000;
const GIVE_UP_AFTER = 180; // six minutes: a read takes one or two

const Check = () => <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 6.4 5 8.7l4.5-5.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/**
 * An invited founder's first read, made while they look: their site's own name and line, each page as it is read,
 * then the three findings in place of their outlines. The page asks with its token; the address never leaves the server.
 */
export function TractionLiveRead({ token, product, host, initial }: { token: string; product: string; host: string; initial?: LiveRead }) {
  const [live, setLive] = useState<LiveRead | undefined>(initial);
  const done = live?.state === 'ready' || live?.state === 'failed';

  useEffect(() => {
    if (done) return;
    let stopped = false;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const ask = async () => {
      tries += 1;
      try {
        const response = await fetch(`/api/traction/read?invitation=${encodeURIComponent(token)}`, { cache: 'no-store' });
        if (response.ok) {
          const next = await response.json() as LiveRead;
          if (stopped) return;
          setLive(next);
          if (next.state === 'ready' || next.state === 'failed') return;
        }
      } catch { /* the next ask tries again */ }
      if (!stopped && tries < GIVE_UP_AFTER) timer = setTimeout(ask, EVERY_MS);
    };
    timer = setTimeout(ask, initial ? EVERY_MS : 0);
    return () => { stopped = true; clearTimeout(timer); };
  }, [done, initial, token]);

  const read = live?.read;
  if (live?.state === 'failed') {
    return <section id="read" data-journey="read" data-live="failed" aria-label={`First read of ${product}`}>
      <p data-read-note="">{`${host} didn’t let us read it just now. Your board reads it again when it opens.`}</p>
    </section>;
  }
  return <section id="read" data-journey="read" data-live={read ? 'ready' : 'reading'} aria-label={`First read of ${product}`} aria-busy={!read}>
    {!read && <div data-reading="">
      <p data-site=""><strong>{live?.site?.title || host}</strong>{live?.site?.description && <span>{live.site.description}</span>}</p>
      <ul aria-label={`Pages read on ${host}`}>
        {(live?.reading ?? []).map((path) => <li key={path}><Check /><span>{path}</span></li>)}
        <li data-now="" aria-label="Reading"><span data-dot="" /></li>
      </ul>
    </div>}
    <ol>{LABELS.map((label, index) => {
      const finding = read?.findings[index];
      return <li key={label} data-pending={finding ? undefined : ''}>
        <p>{label}</p>
        <div>{finding ? <>
          <h2>{finding.headline}</h2>
          <p>{finding.detail}</p>
          {finding.sources.length > 0 && <p data-sources="">Read on {finding.sources.map((item, i) => <span key={item.href}>{i > 0 && ' · '}<a href={item.href} rel="noopener noreferrer" target="_blank">{item.label}</a></span>)}</p>}
        </> : <><span data-line="" /><span data-line="" data-short="" /></>}</div>
      </li>;
    })}</ol>
    <p role="status" data-sr-only="">{read ? `First read of ${product} ready.` : ''}</p>
  </section>;
}
