'use client';
import { usePathname } from 'next/navigation';

export function SiteContactLink() {
  const pathname = usePathname();
  return <a href="#enquire" data-enquiry="">{pathname.startsWith('/traction') ? 'Get in touch' : 'Discuss your next stage'}</a>;
}
