'use client';
import { usePathname } from 'next/navigation';

export function SiteContactLink() {
  const pathname = usePathname();
  return <a href="#enquire" data-enquiry="">{pathname.startsWith('/traction') ? 'Talk to Yann' : 'Discuss your next stage'}</a>;
}
