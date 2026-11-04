'use client';
import { usePathname } from 'next/navigation';
import { siteDoor } from '@/data/site-door';
import { partnershipHref } from '@/data/traction-offer';

/** The masthead carries the page's door as a plain navigation link, for the reader who has already decided. */
export function SiteContactLink() {
  const pathname = usePathname();
  if (pathname.startsWith('/traction/invitation/')) return <a href="#enquire" data-enquiry="">Get in touch</a>;
  if (pathname === partnershipHref) return <a href="#enquire" data-enquiry="" data-situation="partnership" data-introduce="">Introduce your app</a>;
  if (pathname.startsWith('/traction')) return <a href={partnershipHref}>Work with us</a>;
  return <a href="#enquire" data-enquiry="">{siteDoor.label}</a>;
}
