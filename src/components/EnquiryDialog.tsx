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
 */
export function EnquiryDialog({ articleSlug, situation, contact }: Props) {
  const pathname = usePathname();
  const [intent, setIntent] = useState({ firstRead: false, introduce: false, continues: false, situation });
  const chooseIntent = useCallback((url: URL, link?: HTMLAnchorElement) => {
    const firstRead = url.hash === '#first-read' && !contact;
    const introduce = !firstRead && !contact && link?.dataset.introduce !== undefined;
    // A free board's founder continuing (`data-continue`): same fields and delivery, the open field asking which step.
    const continues = !firstRead && !introduce && !contact && link?.dataset.continue !== undefined;
    setIntent({ firstRead, introduce, continues, situation: firstRead ? 'traction' : continues ? 'continue' : link?.dataset.situation || url.searchParams.get('situation') || situation || (pathname.startsWith('/traction') ? 'partnership' : undefined) });
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
      <h2 id="enquire-heading" tabIndex={-1}>{intent.firstRead ? 'Ask for a first read' : intent.introduce ? 'Introduce your app' : intent.continues ? 'Continue with Traction' : 'Get in touch'}</h2>
    </header>
    <EnquiryForm key={intent.firstRead ? 'first-read' : intent.introduce ? 'introduce' : intent.continues ? 'continue' : 'conversation'} articleSlug={articleSlug} situation={intent.situation} firstRead={intent.firstRead} introduce={intent.introduce} continues={intent.continues} contact={contact} />
  </dialog>;
}
