'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { EnquiryForm } from '@/components/EnquiryForm';
import { useEnquiryDialog } from '@/lib/hooks/use-enquiry-dialog';
import type { ContactPrefill } from '@/lib/contact-schema';

type Props = { articleSlug?: string; situation?: string; contact?: ContactPrefill };

/**
 * One contextual invitation over the current page, with the article's existing form and delivery.
 * A Traction door (`data-introduce`) asks a cold visitor for their app; invited founders keep the plain conversation.
 * The subscription's link (`?situation=subscription`) opens it as a quote request.
 */
export function EnquiryDialog({ articleSlug, situation, contact }: Props) {
  const pathname = usePathname();
  const [intent, setIntent] = useState({ firstRead: false, introduce: false, quote: situation === 'subscription', situation });
  const chooseIntent = useCallback((url: URL, link?: HTMLAnchorElement) => {
    const firstRead = url.hash === '#first-read' && !contact;
    const introduce = !firstRead && !contact && link?.dataset.introduce !== undefined;
    const chosen = firstRead ? 'traction' : link?.dataset.situation || url.searchParams.get('situation') || situation || (pathname.startsWith('/traction') ? 'partnership' : undefined);
    // "Ask for a quote" asks for a quote: its own title and button, and no message required.
    setIntent({ firstRead, introduce, quote: !firstRead && !introduce && !contact && chosen === 'subscription', situation: chosen });
  }, [pathname, situation, contact]);
  const dialog = useEnquiryDialog(chooseIntent);
  useEffect(() => {
    if (!dialog.current?.open) return;
    const fields = Array.from(dialog.current.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[required], textarea[required]'));
    // Start where input is needed; avoid opening a phone keyboard before the form is visible.
    const start = window.matchMedia('(pointer: fine)').matches
      ? fields.find((field) => !field.value.trim()) || dialog.current.querySelector<HTMLElement>('[name="message"]')
      : dialog.current.querySelector<HTMLElement>('#enquire-heading');
    start?.focus();
  }, [intent, dialog]);
  return <dialog id="enquire" ref={dialog} aria-labelledby="enquire-heading">
    <form method="dialog" data-dialog-close=""><button type="submit" aria-label="Close">×</button></form>
    <header>
      <h2 id="enquire-heading" tabIndex={-1}>{intent.firstRead ? 'Ask for a first impression' : intent.introduce ? 'Introduce your app' : intent.quote ? 'Ask for a quote' : 'Get in touch'}</h2>
    </header>
    <EnquiryForm key={intent.firstRead ? 'first-read' : intent.introduce ? 'introduce' : intent.quote ? 'quote' : 'conversation'} articleSlug={articleSlug} situation={intent.situation} firstRead={intent.firstRead} introduce={intent.introduce} quote={intent.quote} contact={contact} />
  </dialog>;
}
