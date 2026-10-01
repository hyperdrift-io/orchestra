import type { ArticleShareLabels } from './article-experience/components';

const labels: ArticleShareLabels = {
  share: 'Share', heading: 'Share this article', copy: 'Copy link', more: 'More options', close: 'Close sharing',
  copied: 'Link copied.', manualCopy: 'Select and copy this link.', linkField: 'Article link',
};
export function articleShareView(title: string, text: string, canonical: string, imagePath?: string, slug?: string) {
  return { title, text, canonical, labels, actions: [
    { id: 'linkedin', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}` },
    ...(imagePath && slug ? [{ id: 'card', label: 'Download card', href: imagePath, download: `${slug}.png` }] : []),
  ] };
}
