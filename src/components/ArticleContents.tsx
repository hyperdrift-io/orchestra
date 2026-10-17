'use client';

import { ArticleContents as SharedContents } from '@/lib/article-experience/components';
import { useResponsiveContents } from '@/lib/hooks/useResponsiveContents';
import type { ArticleEntry } from '@/lib/article-experience/model';
import { articleLabels } from '@/lib/article-reading';
export function ArticleContents({ entries, ctaLabel }: { entries: ArticleEntry[]; ctaLabel: string }) {
  const ref = useResponsiveContents();
  return <details ref={ref} open data-contents-disclosure><summary>On this page</summary><SharedContents entries={entries} bodyId="article-body" label={articleLabels.contents}><nav aria-label="Share or enquire"><a href="#article-share">Share article ↓</a><a href="#enquire" data-enquiry="">{ctaLabel} →</a></nav></SharedContents></details>;
}
