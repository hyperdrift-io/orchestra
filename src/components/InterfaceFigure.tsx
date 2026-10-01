'use client';

import { useState } from 'react';
import { articleDateLabel } from '@/lib/article-catalogue';
import type { ArticleSummary } from '@/lib/article-catalogue';
import { interfaceFigure, interfaceRoutes } from '@/lib/ui-accessibility-figures';

interface Props { article: ArticleSummary }

export function InterfaceFigure({ article }: Props) {
  const [route, setRoute] = useState(interfaceRoutes[0]);
  const figure = interfaceFigure(article.slug);
  if (!figure || !article.visualization) return null;
  const interactive = article.slug === 'is-ui-holding-us-back';
  const asset = interactive ? `route-${route.id}` : figure.asset;
  const base = `/articles/ui-accessibility/${asset}`;
  return <figure id="article-proof" data-interface-figure="" aria-label={figure.title}>
    {interactive && <nav aria-label="Compare ways to direct an app" data-interface-routes="">{interfaceRoutes.map((item) => <button key={item.id} type="button" aria-pressed={item.id === route.id} onClick={() => setRoute(item)}>{item.label}</button>)}</nav>}
    {interactive && <noscript><style>{'[data-interface-routes] { display: none !important; }'}</style><p>All five routes are described in the explanation below.</p></noscript>}
    <picture><source media="(max-width: 640px)" srcSet={`${base}-mobile.svg`} /><img src={`${base}.svg`} alt={interactive ? route.note : figure.description} loading="lazy" width="1100" height="850" /></picture>
    {interactive && <p role="status" data-route-note="">{route.note}</p>}
    <figcaption>{article.visualization.takeaway}<nav aria-label="Download this figure"><a href={`${base}.svg`} download>Editable SVG ↓</a><a href={`${base}.png`} download>PNG ↓</a></nav></figcaption>
    <details><summary>Explanation and sources</summary><p>{article.visualization.description}</p>{interactive && <dl>{interfaceRoutes.map((item) => <div key={item.id}><dt>{item.label}</dt><dd>{item.note}</dd></div>)}</dl>}<ul>{article.visualization.sources.map((source) => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul><small>{article.reviewedAt && <>Sources reviewed {articleDateLabel(article.reviewedAt)}. </>}Conceptual diagrams are labelled separately from the reported scan.</small></details>
  </figure>;
}
