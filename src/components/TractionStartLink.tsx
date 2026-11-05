'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { journeyStartHref } from '@/lib/journey';

/** Ordinary navigation keeps working when storage, analytics or scripts are blocked. */
export function TractionStartLink({ href, children }: { href: string; children: ReactNode }) {
  const [target, setTarget] = useState(href);
  useEffect(() => { setTarget(journeyStartHref(href)); }, [href]);
  return <a href={target} data-primary="" onClick={event => { event.currentTarget.href = journeyStartHref(href); }}
    onPointerDown={event => { event.currentTarget.href = journeyStartHref(href); }}
    onContextMenu={event => { event.currentTarget.href = journeyStartHref(href); }}>{children}</a>;
}
