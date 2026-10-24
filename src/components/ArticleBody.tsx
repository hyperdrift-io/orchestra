import { ArticlePermalink } from '@/lib/article-experience/components';
import { articleLabels } from '@/lib/article-reading';
import { Fragment, type ReactNode } from 'react';
import type { ArticleBlock } from '@/lib/articles';
import { ShareLineButton } from '@/components/ShareLineButton';
import { ArticleSourceLink } from '@/lib/article-experience/components';
import { articleSourceNote, citationStaysText } from '@/lib/article-source-notes';

type Share = { title: string; text: string; url: string };
const plain = (text: string) => text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();

/** A small, escaped renderer for this series' controlled Markdown subset. */
function Inline({ text, sourceNotes = true }: { text: string; sourceNotes?: boolean }): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2].startsWith('https://orchestra.hyperdrift.io/?article=') ? '#enquire' : link[2];
      if (!/^(https:\/\/|\/(?!\/)|#)/.test(href)) return <Fragment key={index}>{link[1]}</Fragment>;
      if (sourceNotes && citationStaysText(href)) return <span key={index} data-citation-text="">{link[1]}</span>;
      return <ArticleSourceLink key={index} href={href} note={sourceNotes ? articleSourceNote(href.split('#')[0]) : undefined} labels={articleLabels} intent={sourceNotes ? 'preview' : 'navigate'} data-enquiry={href === '#enquire' ? '' : undefined}>{link[1]}</ArticleSourceLink>;
    }
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function ArticleBody({ blocks, share, visualization, figures, sourceNotes = true }: { blocks: ArticleBlock[]; share?: Share; visualization?: ReactNode; figures?: Record<string, ReactNode>; sourceNotes?: boolean }) {
  const explicitVisual = blocks.some((block) => block.kind === 'visual' && block.visual === 'primary');
  const insertAt = explicitVisual ? -1 : blocks.findIndex((block) => block.kind === 'quote');
  return <div id="article-body" data-article-body="">{blocks.map((block, index) => {
    if (block.kind === 'heading') return <h2 key={index} id={block.id} tabIndex={-1}>{block.text}{share && block.id && <ArticlePermalink canonical={share.url} anchor={block.id} label={articleLabels.sectionLink} labels={articleLabels} />}</h2>;
    if (block.kind === 'quote') {
      const quote = <blockquote><p><Inline text={block.text} /></p></blockquote>;
      // The share line keeps its own action; the explanatory visual follows the opening quote.
      const content = share && plain(block.text) === plain(share.text)
        ? <figure>{quote}<figcaption><ShareLineButton {...share} /></figcaption></figure>
        : quote;
      return <Fragment key={index}>{content}{index === insertAt && visualization}</Fragment>;
    }
    // The closing enquiry line is carried by the invitation after the article, which opens the same dialog.
    if (block.kind === 'paragraph' && /^\[[^\]]+\]\(https:\/\/orchestra\.hyperdrift\.io\/\?article=[^)]*\)$/.test(block.text.trim())) return null;
    if (block.kind === 'visual') return <Fragment key={index}>{block.visual === 'primary' ? visualization : figures?.[block.visual]}</Fragment>;
    if (block.kind === 'image') return <figure key={index}><img src={block.src} alt={block.alt} loading="lazy" /></figure>;
    return <p key={index} id={block.id} tabIndex={-1}><Inline text={block.text} sourceNotes={sourceNotes} />{share && block.id && <ArticlePermalink canonical={share.url} anchor={block.id} label={articleLabels.paragraphLink} labels={articleLabels} />}</p>;
  })}<span id="article-end" aria-hidden="true" /></div>;
}
