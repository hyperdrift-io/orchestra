import { articleUrl, visibleArticles } from '@/lib/article-catalogue';

export const dynamic = 'force-static';

export function GET() {
  const articles = visibleArticles()
    .map((article) => `- [${article.title}](${articleUrl(article.slug)}): ${article.excerpt}`)
    .join('\n');

  const body = `# Orchestra AI by Hyperdrift

AI engineering for founders with customers, active users or clear demand. We connect AI to existing business workflows and measure what changes.

## Make your product usable through agents

Orchestra integrates one useful workflow from an existing product through MCP: agree the outcome and permissions, connect the product, verify a task in a compatible assistant and provide connection instructions. Commercial access and customer relationships stay with the product owner.

- [NextRole integration and offering](https://ai.hyperdrift.io/work#work-nextrole): Our own commercial career product, with five MCP tools. An owned-product demonstration, not a commissioned client result.
- [Inspect the live MCP check](https://ai.hyperdrift.io/proof/nextrole-mcp-corrected-2026-10-04.json): Synthetic CV and job, actual scoring response and verification limits. This demonstrates an operational call, not adoption or hiring outcomes.
- [Discuss your product](https://ai.hyperdrift.io/?situation=mcp#contact): Bring one workflow you want customers to use from their assistant.

## Articles

Newest first, with publication dates: [RSS feed](https://ai.hyperdrift.io/feed.xml).

${articles}

## More

- [How it works](https://ai.hyperdrift.io/how-it-works): The operating model behind the work.
- [Work](https://ai.hyperdrift.io/work): Public builds and demonstrations.
- [Traction](https://ai.hyperdrift.io/traction): A growth board wired to a live app: a first read, your board, then the Traction Partnership when the board shows demand.
- [Traction's launch log](https://ai.hyperdrift.io/articles/traction-from-zero): Traction launching itself from zero, in public: the count of founders on the board, the evidence gates and every day on the record.
- [A sample first read](https://ai.hyperdrift.io/traction/first-read): A real first read of this site from its public pages: one strength, one constraint and the next customer move, with the evidence.
- [Discuss a workflow](https://ai.hyperdrift.io/#contact): Bring a concrete opportunity and the tools involved.
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
