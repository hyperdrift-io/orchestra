'use client';

import { useEffect, useRef } from 'react';

/** Every `#enquire` link opens the article's enquiry dialog in place instead of jumping to the end of the page. */
export function useEnquiryDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const open = () => {
      if (element.open) return;
      element.showModal();
      // A phone keyboard would cover the invitation, so touch screens start on the heading.
      const start = window.matchMedia('(pointer: fine)').matches ? 'input[name="name"]' : '#enquire-heading';
      element.querySelector<HTMLElement>(start)?.focus();
    };
    const onLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element) || !event.target.closest('a[href="#enquire"]')) return;
      event.preventDefault();
      open();
    };
    // A click on the backdrop lands on the dialog element itself.
    const onBackdrop = (event: MouseEvent) => { if (event.target === element) element.close(); };
    document.addEventListener('click', onLink);
    element.addEventListener('click', onBackdrop);
    if (window.location.hash === '#enquire') {
      history.replaceState(history.state, '', window.location.pathname + window.location.search);
      open();
    }
    return () => { document.removeEventListener('click', onLink); element.removeEventListener('click', onBackdrop); };
  }, []);
  return dialog;
}
