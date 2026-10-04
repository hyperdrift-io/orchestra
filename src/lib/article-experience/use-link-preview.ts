'use client';
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import type { LinkPreviewEvent } from './link-preview-model';

type PreviewPanel = HTMLDivElement & { showPopover(options: { source: HTMLElement }): void };

export function useLinkPreview(href: string, onPreviewEvent?: (event: LinkPreviewEvent) => void) {
  const panel = useRef<PreviewPanel>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const invoker = useRef<HTMLElement | null>(null);
  const deliberate = useRef(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const preloadTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [prepared, setPrepared] = useState(false);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const callback = useRef(onPreviewEvent);
  useEffect(() => { callback.current = onPreviewEvent; }, [onPreviewEvent]);
  useEffect(() => {
    // Embedded pages keep their native navigation rather than nesting readers.
    setReady('showPopover' in HTMLElement.prototype && window.self === window.top);
    return () => { clearTimeout(hoverTimer.current); clearTimeout(preloadTimer.current); };
  }, []);
  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const onToggle = (event: Event) => {
      const open = (event as Event & { newState: string }).newState === 'open';
      setExpanded(open);
      if (!open) setPrepared(false);
      if (open && deliberate.current) element.querySelector<HTMLElement>('[data-link-preview-title]')?.focus({ preventScroll: true });
      callback.current?.({ action: open ? 'opened' : 'closed', href });
    };
    element.addEventListener('toggle', onToggle);
    return () => element.removeEventListener('toggle', onToggle);
  }, [href, ready]);
  const cancelHover = () => {
    clearTimeout(hoverTimer.current);
    clearTimeout(preloadTimer.current);
    if (!panel.current?.matches(':popover-open')) setPrepared(false);
  };
  const open = (source: HTMLElement, focus: boolean) => {
    clearTimeout(hoverTimer.current);
    clearTimeout(preloadTimer.current);
    const element = panel.current;
    if (!element || !ready) return;
    deliberate.current = focus;
    element.dataset.previewMode = focus ? 'read' : 'hover';
    invoker.current = source;
    if (element.matches(':popover-open')) {
      if (focus) element.querySelector<HTMLElement>('[data-link-preview-title]')?.focus({ preventScroll: true });
    } else element.showPopover({ source });
  };
  const activate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!ready || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open(event.currentTarget, true);
  };
  const hover = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!ready || event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const source = event.currentTarget;
    cancelHover();
    // Warm only the likely next reader, shortly before it becomes visible.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!connection?.saveData && !window.matchMedia('(prefers-reduced-data: reduce)').matches) {
      preloadTimer.current = setTimeout(() => setPrepared(true), 100);
    }
    hoverTimer.current = setTimeout(() => open(source, false), 350);
  };
  const close = () => {
    cancelHover();
    panel.current?.hidePopover();
    (invoker.current || trigger.current)?.focus({ preventScroll: true });
  };
  const openOriginal = () => callback.current?.({ action: 'source_opened', href });
  return { panel, trigger, ready, expanded, prepared, activate, hover, cancelHover, open, close, openOriginal };
}
