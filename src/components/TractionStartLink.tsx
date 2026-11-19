'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { journeyStartHref } from '@/lib/journey';

/** Ordinary navigation keeps working when storage, analytics or scripts are blocked. */
/** `plain` is the same link as a line of text, for a page whose one button is another door. */
/** `invite` is a personal invitation's token: with it, the sign-up asks for a passkey and nothing else. */
export function TractionStartLink({ href, children, plain = false, invite }: { href: string; children: ReactNode; plain?: boolean; invite?: string }) {
  const [target, setTarget] = useState(href);
  useEffect(() => { setTarget(journeyStartHref(href, invite)); }, [href, invite]);
  return <a href={target} data-primary={plain ? undefined : ''} onClick={event => { event.currentTarget.href = journeyStartHref(href, invite); }}
    onPointerDown={event => { event.currentTarget.href = journeyStartHref(href, invite); }}
    onContextMenu={event => { event.currentTarget.href = journeyStartHref(href, invite); }}>{children}</a>;
}
