'use client';

import { usePathname } from 'next/navigation';
import { articleBySlug } from '@/lib/article-catalogue';
import { EnquiryDialog } from './EnquiryDialog';

/** Articles and private invitations supply their own context to the same dialog. */
export function SiteEnquiryDialog() {
  const pathname = usePathname();
  if (pathname.startsWith('/traction/invitation/')) return null;
  if (pathname.startsWith('/articles/') && articleBySlug(pathname.slice('/articles/'.length))) return null;
  return <EnquiryDialog />;
}
