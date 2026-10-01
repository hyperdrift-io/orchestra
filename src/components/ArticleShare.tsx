import { ArticleShare as SharedShare } from '@/lib/article-experience/components';
import { articleShareView } from '@/lib/article-sharing';

type Props = { title: string; text: string; url: string; imagePath: string; slug: string; preview: boolean };
/** App-owned editorial assets and preview context, using the shared sharing interaction. */
export function ArticleShare({ title, text, url, imagePath, slug, preview }: Props) {
  return <SharedShare id="article-share" {...articleShareView(title, text, url, imagePath, slug)} placement="end_cap">
    {preview && <small>Editorial preview. Public links will work once this article is published.</small>}
  </SharedShare>;
}
