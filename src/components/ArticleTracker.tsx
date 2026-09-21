'use client';
import { useEffect } from 'react';
import { observeArticle } from '@/lib/article-tracking';

export function ArticleTracker({ slug }: { slug: string }) {
  useEffect(() => observeArticle(slug), [slug]);
  return null;
}
