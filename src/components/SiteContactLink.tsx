'use client';
import { usePathname } from 'next/navigation';
import { siteDoor } from '@/data/site-door';

/** The masthead repeats the page's door for the reader who has already decided. */
export function SiteContactLink() {
  const pathname = usePathname();
  const mirrorsTraction = pathname === '/traction' || pathname.startsWith('/traction/invitation/');
  return <a href="#enquire" data-enquiry="">{mirrorsTraction ? 'Get in touch' : siteDoor.label}</a>;
}
