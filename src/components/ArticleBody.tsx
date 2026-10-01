import { ArticlePermalink } from '@/lib/article-experience/components';
import { articleLabels } from '@/lib/article-reading';
import { Fragment, type ReactNode } from 'react';
import type { ArticleBlock } from '@/lib/articles';
import { ShareLineButton } from '@/components/ShareLineButton';
import { ArticleSourceLink } from '@/components/ArticleSourceLink';
import { articleSourceNote } from '@/lib/article-source-notes';

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
      const note = sourceNotes && articleSourceNote(href);
      if (note) return <ArticleSourceLink key={index} href={href} label={link[1]} note={note} />;
      return <a key={index} href={href} data-enquiry={href === '#enquire' ? '' : undefined}>{link[1]}</a>;
    }
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function ArticleBody({ blocks, share, visualization, sourceNotes = true }: { blocks: ArticleBlock[]; share?: Share; visualization?: ReactNode; sourceNotes?: boolean }) {
  const insertAt = blocks.findIndex((block) => block.kind === 'quote');
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
    if (block.kind === 'image') return <figure key={index}><img src={block.src} alt={block.alt} loading="lazy" /></figure>;
    return <p key={index} id={block.id} tabIndex={-1}><Inline text={block.text} sourceNotes={sourceNotes} />{share && block.id && <ArticlePermalink canonical={share.url} anchor={block.id} label={articleLabels.paragraphLink} labels={articleLabels} />}</p>;
  })}<span id="article-end" aria-hidden="true" /></div>;
}
