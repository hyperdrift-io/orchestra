'use client';
import { useCallback } from 'react';
import { useArticleEvents } from '@/lib/article-experience/hooks';
import type { ArticleInteraction } from '@/lib/article-experience/browser';
import { trackEvent } from '@/lib/analytics';
export function ArticleExperienceTracker({ slug }: { slug: string }) {
  const track = useCallback(({ action, anchor, source, placement }: ArticleInteraction) => {
    trackEvent(action, { app: 'orchestra', slug, anchor, placement, source: source?.split(/[?#]/)[0] });
  }, [slug]);
  useArticleEvents(track);
  return null;
}
