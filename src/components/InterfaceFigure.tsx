'use client';

import { useState } from 'react';
import { articleDateLabel } from '@/lib/article-catalogue';
import type { ArticleSummary } from '@/lib/article-catalogue';
import { interfaceFigure, interfaceRoutes } from '@/lib/ui-accessibility-figures';
import type { FigureSvg } from '@/lib/ui-accessibility-figure-svg';

interface Props { article: ArticleSummary; svg?: FigureSvg }

const allRoutes = 'Five routes, one job. Choose one to follow it through the stages.';

export function InterfaceFigure({ article, svg }: Props) {
  const [routeId, setRouteId] = useState<string | null>(null);
  const figure = interfaceFigure(article.slug);
  if (!figure || !article.visualization || !svg) return null;
  const interactive = article.slug === 'is-ui-holding-us-back';
  const route = interfaceRoutes.find((item) => item.id === routeId);
  const base = `/articles/ui-accessibility/${figure.asset}`;
  return <figure id="article-proof" data-interface-figure="" aria-label={figure.title}>
    {interactive && <nav aria-label="Follow one way to direct an app" data-interface-routes="">
      <button type="button" aria-pressed={!route} onClick={() => setRouteId(null)}>All five</button>
      {interfaceRoutes.map((item) => <button key={item.id} type="button" aria-pressed={item.id === routeId} onClick={() => setRouteId(item.id === routeId ? null : item.id)}>{item.label}</button>)}
    </nav>}
    {interactive && <noscript><style>{'[data-interface-routes] { display: none !important; }'}</style></noscript>}
    <div data-figure-art="" data-active-route={route?.id}>
      <div data-variant="desktop" dangerouslySetInnerHTML={{ __html: svg.desktop }} />
      <div data-variant="mobile" dangerouslySetInnerHTML={{ __html: svg.mobile }} />
    </div>
    {interactive && <p role="status" data-route-note="">{route ? route.note : allRoutes}</p>}
    <figcaption>{article.visualization.takeaway}<nav aria-label="Download this figure"><a href={`${base}.svg`} download>Editable SVG ↓</a><a href={`${base}.png`} download>PNG ↓</a></nav></figcaption>
    <details><summary>Explanation and sources</summary><p>{article.visualization.description}</p>{interactive && <dl>{interfaceRoutes.map((item) => <div key={item.id}><dt>{item.label}</dt><dd>{item.note}</dd></div>)}</dl>}<ul>{article.visualization.sources.map((source) => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul><small>{article.reviewedAt && <>Sources reviewed {articleDateLabel(article.reviewedAt)}. </>}Conceptual diagrams are labelled separately from the reported scan.</small></details>
  </figure>;
}
