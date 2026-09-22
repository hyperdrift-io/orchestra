'use client';

import { ShareLineButton } from '@/components/ShareLineButton';
import { trackArticle } from '@/lib/article-tracking';

type Props = { slug: string; title: string; text: string; url: string; ctaLabel: string };

/** One quiet bar: it appears once a third of the article is read and leaves when the share block is in view. */
export function ReadNudge({ slug, title, text, url, ctaLabel }: Props) {
  function dismiss() {
    const article = document.getElementById('article');
    if (article?.dataset.read === 'engaged') article.dataset.read = 'dismissed';
    trackArticle(slug, 'article_nudge_dismissed');
  }
  return <aside data-nudge="" aria-label="Pass it on">
    <p>{text}</p>
    <nav aria-label="Share or enquire">
      <ShareLineButton title={title} text={text} url={url} />
      <a href="#enquire" data-enquiry="">{ctaLabel} →</a>
      <button type="button" aria-label="Hide" onClick={dismiss}>×</button>
    </nav>
  </aside>;
}
