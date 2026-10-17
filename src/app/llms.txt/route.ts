import { articleUrl, visibleArticles } from '@/lib/article-catalogue';
import { services } from '@/data/traction-offer';
import { indexableTags, tagUrl } from '@/lib/article-tags';

export const dynamic = 'force-static';

export function GET() {
  const visible = visibleArticles();
  const articles = visible
    .map((article) => `- [${article.title}](${articleUrl(article.slug)}): ${article.excerpt}`)
    .join('\n');
  const topics = indexableTags(visible)
    .map((tag) => `- [${tag.label}](${tagUrl(tag.slug)}): ${tag.description}`)
    .join('\n');

  const body = `# Orchestra AI by Hyperdrift

Orchestra connects customer insight, distribution and AI engineering for founders with a working product and evidence of demand. Start with one measurable opportunity to reach customers, help them use the product or improve delivery. Hyperdrift is the company behind Orchestra.

## Work with Orchestra

${services.map((service) => `- [${service.name}](https://orchestra.hyperdrift.io${service.links[0].href}): ${service.text}`).join('\n')}

- [The Traction partnership](https://orchestra.hyperdrift.io/traction#partnership): How we agree the work, set up your board and learn from customer evidence. A first read is optional.
- [A sample first read](https://orchestra.hyperdrift.io/traction/first-read): A dated assessment of this site, with a follow-up distinguishing changes from measured outcomes.

## Evidence you can inspect

- [Work](https://orchestra.hyperdrift.io/work): Owned products and public prototypes, grouped by the work they help with. These demonstrations do not establish client outcomes.
- [NextRole MCP check](https://orchestra.hyperdrift.io/proof/nextrole-mcp-corrected-2026-10-04.json): A synthetic CV and job, the scoring response and verification limits. One example of making a product usable from an assistant.
- [About](https://orchestra.hyperdrift.io/about): Our founder, relevant engagements and the work behind Orchestra.

## Articles

Newest first, with publication dates: [RSS feed](https://orchestra.hyperdrift.io/feed.xml).

${articles}

## Topics

Each topic page lists the articles that carry it, with a one-line answer to what the topic covers.

${topics}

## Get in touch

- [Discuss your app](https://orchestra.hyperdrift.io/#contact): Bring the people you want to reach, or one workflow you want to improve. We agree the next step together.
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
