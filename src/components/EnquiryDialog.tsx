'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { EnquiryForm } from '@/components/EnquiryForm';
import { useEnquiryDialog } from '@/lib/hooks/use-enquiry-dialog';
import type { ContactPrefill } from '@/lib/contact-schema';

type Props = { articleSlug?: string; situation?: string; intro?: string; contact?: ContactPrefill };

/** One contextual invitation over the current page, with the article's existing form and delivery. */
export function EnquiryDialog({ articleSlug, situation, intro, contact }: Props) {
  const pathname = usePathname();
  const forTraction = pathname.startsWith('/traction');
  const [intent, setIntent] = useState({ firstRead: false, situation });
  const chooseIntent = useCallback((url: URL, link?: HTMLAnchorElement) => {
    const firstRead = url.hash === '#first-read' && !contact;
    setIntent({ firstRead, situation: firstRead ? 'traction' : link?.dataset.situation || url.searchParams.get('situation') || situation || (pathname.startsWith('/traction') ? 'partnership' : undefined) });
  }, [pathname, situation, contact]);
  const dialog = useEnquiryDialog(chooseIntent);
  useEffect(() => {
    if (!dialog.current?.open) return;
    const start = window.matchMedia('(pointer: fine)').matches ? 'input[name="name"]' : '#enquire-heading';
    dialog.current.querySelector<HTMLElement>(start)?.focus();
  }, [intent.firstRead, dialog]);
  return <dialog id="enquire" ref={dialog} aria-labelledby="enquire-heading">
    <form method="dialog" data-dialog-close=""><button type="submit" aria-label="Close">×</button></form>
    <header>
      <p>{intent.firstRead ? 'A first read of your app' : articleSlug ? 'Put the idea to work' : 'Let’s work together'}</p>
      <h2 id="enquire-heading" tabIndex={-1}>{articleSlug && !intent.firstRead ? <>What would this look like <em>for you?</em></> : 'Get in touch.'}</h2>
      <p>{contact ? 'Let’s talk about what comes next. Send us a message, or suggest a time for a call or a meeting in London.' : intent.firstRead ? 'Add your app’s link to start the conversation. We’ll reply with a first view of how we could work together.' : intro || (forTraction ? 'Tell us what you want to make happen with your app. We can talk by phone or meet in London.' : 'Tell us what you’re building and where you’d value help. We can talk by phone or meet in London.')}</p>
      <small>A personal reply within one working day.</small>
    </header>
    <EnquiryForm key={intent.firstRead ? 'first-read' : 'conversation'} articleSlug={articleSlug} situation={intent.situation} firstRead={intent.firstRead} contact={contact} />
  </dialog>;
}
