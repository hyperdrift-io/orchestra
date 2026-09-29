import { articleUrl, visibleArticles } from '@/lib/article-catalogue';

export const dynamic = 'force-static';

export function GET() {
  const articles = visibleArticles()
    .map((article) => `- [${article.title}](${articleUrl(article.slug)}): ${article.excerpt}`)
    .join('\n');

  const body = `# Orchestra AI by Hyperdrift

AI engineering for founders with customers, active users or clear demand. We connect AI to existing business workflows and measure what changes.

## Articles

${articles}

## More

- [How it works](https://ai.hyperdrift.io/how-it-works): The operating model behind the work.
- [Work](https://ai.hyperdrift.io/work): Public builds and demonstrations.
- [Discuss a workflow](https://ai.hyperdrift.io/#contact): Bring a concrete opportunity and the tools involved.
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
