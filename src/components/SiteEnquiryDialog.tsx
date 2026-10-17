'use client';

import { usePathname } from 'next/navigation';
import { articleBySlug } from '@/lib/article-catalogue';
import { EnquiryDialog } from './EnquiryDialog';

/** Articles supply their own topic-specific invitation; every other route shares this one. */
export function SiteEnquiryDialog() {
  const pathname = usePathname();
  if (pathname.startsWith('/articles/') && articleBySlug(pathname.slice('/articles/'.length))) return null;
  return <EnquiryDialog />;
}
