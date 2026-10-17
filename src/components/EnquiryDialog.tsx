'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { EnquiryForm } from '@/components/EnquiryForm';
import { useEnquiryDialog } from '@/lib/hooks/use-enquiry-dialog';

type Props = { articleSlug?: string; situation?: string; intro?: string };

/** One contextual invitation over the current page, with the article's existing form and delivery. */
export function EnquiryDialog({ articleSlug, situation, intro }: Props) {
  const pathname = usePathname();
  const forTraction = pathname.startsWith('/traction');
  const [intent, setIntent] = useState({ firstRead: false, situation });
  const chooseIntent = useCallback((url: URL, link?: HTMLAnchorElement) => {
    const firstRead = url.hash === '#first-read';
    setIntent({ firstRead, situation: firstRead ? 'traction' : link?.dataset.situation || url.searchParams.get('situation') || situation || (pathname.startsWith('/traction') ? 'partnership' : undefined) });
  }, [pathname, situation]);
  const dialog = useEnquiryDialog(chooseIntent);
  useEffect(() => {
    if (!dialog.current?.open) return;
    const start = window.matchMedia('(pointer: fine)').matches ? 'input[name="name"]' : '#enquire-heading';
    dialog.current.querySelector<HTMLElement>(start)?.focus();
  }, [intent.firstRead, dialog]);
  return <dialog id="enquire" ref={dialog} aria-labelledby="enquire-heading">
    <form method="dialog" data-dialog-close=""><button type="submit" aria-label="Close">×</button></form>
    <header>
      <p>{intent.firstRead ? 'A first read of your app' : articleSlug ? 'Put the idea to work' : 'A conversation with Yann'}</p>
      <h2 id="enquire-heading" tabIndex={-1}>{intent.firstRead ? 'Show me what you’re building.' : articleSlug ? <>What would this look like <em>for you?</em></> : 'Let’s talk.'}</h2>
      <p>{intent.firstRead ? 'Send me your app’s link. I’ll take a look and suggest one thing we could work on to help it reach the people it’s made for.' : intro || (forTraction ? 'Tell me about your app and what you hope it will change. I’d be happy to speak by phone or meet in London.' : 'Tell me what you’re building and where you’d value help. We can talk by phone or meet in London.')}</p>
      <small>A personal reply within one working day.</small>
    </header>
    <EnquiryForm key={intent.firstRead ? 'first-read' : 'conversation'} articleSlug={articleSlug} situation={intent.situation} firstRead={intent.firstRead} />
  </dialog>;
}
