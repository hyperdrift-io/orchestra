'use client';
import { useEffect, useRef, useState } from 'react';
import type { LinkPreviewEvent } from './link-preview-model';

export function useLinkPreview(href: string, onPreviewEvent?: (event: LinkPreviewEvent) => void) {
  const panel = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);
  const callback = useRef(onPreviewEvent);
  useEffect(() => { callback.current = onPreviewEvent; }, [onPreviewEvent]);
  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const sync = (open: boolean) => {
      setExpanded(open);
      if (open) element.querySelector<HTMLElement>('[data-link-preview-title]')?.focus({ preventScroll: true });
      callback.current?.({ action: open ? 'opened' : 'closed', href });
    };
    const onToggle = (event: Event) => sync((event as Event & { newState: string }).newState === 'open');
    element.addEventListener('toggle', onToggle);
    // Declarative popovers also work before hydration.
    if ('showPopover' in element && element.matches(':popover-open')) sync(true);
    return () => element.removeEventListener('toggle', onToggle);
  }, [href]);
  const close = () => {
    panel.current?.hidePopover();
    trigger.current?.focus({ preventScroll: true });
  };
  const openOriginal = () => callback.current?.({ action: 'source_opened', href });
  return { panel, trigger, expanded, close, openOriginal };
}
