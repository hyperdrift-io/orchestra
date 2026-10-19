'use client';

import { ArticleContents as SharedContents } from '@/lib/article-experience/components';
import { useResponsiveContents } from '@/lib/hooks/useResponsiveContents';
import type { ArticleEntry } from '@/lib/article-experience/model';
import { articleLabels } from '@/lib/article-reading';
export function ArticleContents({ entries }: { entries: ArticleEntry[] }) {
  const ref = useResponsiveContents();
  return <details ref={ref} open data-contents-disclosure><summary>On this page</summary><SharedContents entries={entries} bodyId="article-body" label={articleLabels.contents}><nav aria-label="Share"><a href="#article-share">Share article ↓</a></nav></SharedContents></details>;
}
