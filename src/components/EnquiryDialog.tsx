'use client';

import { EnquiryForm } from '@/components/EnquiryForm';
import { useEnquiryDialog } from '@/lib/hooks/use-enquiry-dialog';

type Props = { articleSlug: string; situation?: string; intro: string };

/** The article's one invitation, opened over the article so reading resumes where it stopped. Without JavaScript, `#enquire` shows it in place. */
export function EnquiryDialog({ articleSlug, situation, intro }: Props) {
  const dialog = useEnquiryDialog();
  return <dialog id="enquire" ref={dialog} aria-labelledby="enquire-heading">
    <form method="dialog" data-dialog-close=""><button type="submit" aria-label="Close">×</button></form>
    <header>
      <p>Put the idea to work</p>
      <h2 id="enquire-heading" tabIndex={-1}>What would this look like <em>for you?</em></h2>
      <p>{intro}</p>
      <small>A personal reply within one working day.</small>
    </header>
    <EnquiryForm articleSlug={articleSlug} situation={situation} />
  </dialog>;
}
