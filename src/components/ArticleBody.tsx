import { Fragment, type ReactNode } from 'react';
import type { ArticleBlock } from '@/lib/articles';
import { ShareLineButton } from '@/components/ShareLineButton';

type Share = { title: string; text: string; url: string };
const plain = (text: string) => text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();

/** A small, escaped renderer for this series' controlled Markdown subset. */
function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2].startsWith('https://ai.hyperdrift.io/?article=') ? '#enquire' : link[2];
      if (!/^(https:\/\/|\/(?!\/)|#)/.test(href)) return <Fragment key={index}>{link[1]}</Fragment>;
      return <a key={index} href={href} data-enquiry={href === '#enquire' ? '' : undefined}>{link[1]}</a>;
    }
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function ArticleBody({ blocks, share }: { blocks: ArticleBlock[]; share?: Share }) {
  return <div id="article-body">{blocks.map((block, index) => {
    if (block.kind === 'heading') return <h2 key={index} id={block.id}>{block.text}</h2>;
    if (block.kind === 'quote') {
      const quote = <blockquote><p><Inline text={block.text} /></p></blockquote>;
      // The share line is the quote readers forward, so it carries its own one-tap share.
      if (share && plain(block.text) === plain(share.text)) return <figure key={index}>{quote}<figcaption><ShareLineButton {...share} /></figcaption></figure>;
      return <Fragment key={index}>{quote}</Fragment>;
    }
    if (block.kind === 'image') return <figure key={index}><img src={block.src} alt={block.alt} loading="lazy" /></figure>;
    return <p key={index}><Inline text={block.text} /></p>;
  })}<span id="article-end" aria-hidden="true" /></div>;
}
