'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { siteDoor } from '@/data/site-door';
import { partnershipHref } from '@/data/traction-offer';
import { howItWorksHref } from '@/data/traction-features';

/** The masthead carries the page's door as a plain navigation link, for the reader who has already decided. */
export function SiteContactLink() {
  const pathname = usePathname();
  // A founder back from a free board (`?from=<app>`) has their own door beside their question, so the trial isn't offered again.
  const [onFreeBoard, setOnFreeBoard] = useState(false);
  useEffect(() => { setOnFreeBoard(Boolean(document.querySelector('#traction[data-trial-app]'))); }, [pathname]);
  if ((pathname === '/traction' || pathname === howItWorksHref) && !onFreeBoard) return <a href="#your-board">Trial Traction</a>;
  if (pathname.startsWith('/traction/invitation/')) return <a href="#enquire" data-enquiry="">Get in touch</a>;
  if (pathname === partnershipHref) return <a href="#traction-contact-title">Discuss the partnership</a>;
  if (pathname.startsWith('/traction')) return <a href={partnershipHref}>Work with us</a>;
  return <a href="#enquire" data-enquiry="">{siteDoor.label}</a>;
}
