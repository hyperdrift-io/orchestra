'use client';

import { useId } from 'react';
import { articleDateLabel } from '@/lib/article-catalogue';
import type { SourceNote } from '@/lib/article-source-notes';

interface Props { href: string; label: string; note: SourceNote }

export function ArticleSourceLink({ href, label, note }: Props) {
  const id = useId();
  return <span data-citation=""><a href={href}>{label}</a><button type="button" popoverTarget={id} aria-label={`Source note: ${note.title}`}>note</button><span id={id} popover="auto" data-source-note="" role="region" aria-label={note.title}>
    <span data-source-by="">{note.by}</span><strong>{note.title}</strong><span data-source-summary="">{note.summary}</span><small>Orchestra editorial summary{note.reviewedAt && <> · reviewed {articleDateLabel(note.reviewedAt)}</>}</small><span data-source-actions=""><a href={href} target="_blank" rel="noopener noreferrer">Open original ↗ (new tab)</a><button type="button" popoverTarget={id} popoverTargetAction="hide">Close note</button></span>
  </span></span>;
}
