'use client';
import { usePathname } from 'next/navigation';

export function SiteContactLink() {
  const pathname = usePathname();
  return <a href={pathname.startsWith('/articles/') ? '#enquire' : '/#contact'} data-enquiry="">Discuss your next stage</a>;
}
