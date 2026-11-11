'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { journeyStartHref } from '@/lib/journey';

/** Ordinary navigation keeps working when storage, analytics or scripts are blocked. */
/** `plain` is the same link as a line of text, for a page whose one button is another door. */
export function TractionStartLink({ href, children, plain = false }: { href: string; children: ReactNode; plain?: boolean }) {
  const [target, setTarget] = useState(href);
  useEffect(() => { setTarget(journeyStartHref(href)); }, [href]);
  return <a href={target} data-primary={plain ? undefined : ''} onClick={event => { event.currentTarget.href = journeyStartHref(href); }}
    onPointerDown={event => { event.currentTarget.href = journeyStartHref(href); }}
    onContextMenu={event => { event.currentTarget.href = journeyStartHref(href); }}>{children}</a>;
}
