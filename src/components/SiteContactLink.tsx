'use client';
import { usePathname } from 'next/navigation';

export function SiteContactLink() {
  const pathname = usePathname();
  const href = pathname.startsWith('/articles/') && pathname !== '/articles/ui-accessibility' ? '#enquire' : pathname === '/about' ? '#contact' : '/#contact';
  return <a href={href} data-enquiry="">Discuss your next stage</a>;
}
