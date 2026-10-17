'use client';

import { useEffect, useRef } from 'react';

/** All enquiry links open the same native dialog without taking the reader off their page. */
export function useEnquiryDialog(onOpen?: (url: URL, link?: HTMLAnchorElement) => void) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const open = (url: URL, link?: HTMLAnchorElement) => {
      if (element.open) return;
      onOpen?.(url, link);
      element.showModal();
    };
    const onLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !['#contact', '#enquire', '#first-read'].includes(url.hash)) return;
      if (![window.location.pathname, '/', '/traction'].includes(url.pathname)) return;
      event.preventDefault();
      open(url, link);
    };
    // A click on the backdrop lands on the dialog element itself.
    const onBackdrop = (event: MouseEvent) => {
      const box = element.getBoundingClientRect();
      if (event.target === element && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) element.close();
    };
    document.addEventListener('click', onLink);
    element.addEventListener('click', onBackdrop);
    if (['#contact', '#enquire', '#first-read'].includes(window.location.hash)) {
      const url = new URL(window.location.href);
      history.replaceState(history.state, '', window.location.pathname + window.location.search);
      open(url);
    }
    return () => { document.removeEventListener('click', onLink); element.removeEventListener('click', onBackdrop); };
  }, [onOpen]);
  return dialog;
}
