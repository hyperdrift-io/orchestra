'use client';
import { ArticleShare } from '@/lib/article-experience/components';
import { articleShareView } from '@/lib/article-sharing';

type Props = { title: string; text: string; url: string; placement?: string };
export function ShareLineButton({ title, text, url, placement = 'share_line' }: Props) {
  return <ArticleShare {...articleShareView(title, text, url)} placement={placement} />;
}
