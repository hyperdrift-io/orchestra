import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTags } from '@/components/ArticleTags';
import { visibleArticles, isArticlePreview } from '@/lib/article-catalogue';
import { tagsOf } from '@/lib/article-tags';
import { websiteOpenGraph } from '@/lib/share-metadata';

export const metadata: Metadata = {
  title: 'The future of UI and accessibility',
  description: 'A six-part series on human capability, WebMCP, hands-free app control and voice through MCP. Evidence, explanatory figures and a method for comparing the whole task.',
  alternates: { canonical: '/articles/ui-accessibility' },
  robots: isArticlePreview() ? { index: false, follow: false } : undefined,
  openGraph: { ...websiteOpenGraph, title: 'The future of UI and accessibility', url: 'https://ai.hyperdrift.io/articles/ui-accessibility' },
};

export default function UiAccessibilitySeries() {
  const articles = visibleArticles().filter((article) => article.series === 'ui-accessibility');
  if (!articles.length) notFound();
  return <section id="articles" data-ui-series="" aria-labelledby="articles-title">
    <header><p>Orchestra / The future of UI and accessibility</p>{isArticlePreview() && <small>Complete editorial preview · publication pending</small>}<h1 id="articles-title">More ways<br /><em>to finish.</em></h1><p>Interfaces have changed what people need to learn. Agents could change what they need to operate. These six articles ask who benefits, what remains difficult and how to tell whether the work actually got easier.</p><a href={`/articles/${articles[0].slug}`}>Start with the argument →</a></header>
    <ol>{articles.map((article) => <li key={article.slug}><span>{String(article.seriesOrder).padStart(2, '0')}</span><div><p>{article.topic}</p><h2><a href={`/articles/${article.slug}`}>{article.title}</a></h2><p>{article.excerpt}</p><ArticleTags tags={tagsOf(article)} /><small>{article.exampleStatus}</small></div><a href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>Read →</a></li>)}</ol>
    <section id="reference" aria-labelledby="reference-title"><p>Living reference</p><h2 id="reference-title">Different routes. Different responsibilities.</h2><p>These approaches coexist. Voice is an input method; WebMCP and MCP provide different tool connections. This is a map of responsibilities, not a chronology or performance ranking.</p><dl>
      <div><dt>Event-driven controls</dt><dd>A person chooses controls; events trigger app actions. The person directs the sequence.</dd></div>
      <div><dt>API / CLI</dt><dd>A person or program specifies operations. Suitable for repeatable work when the operations can be defined.</dd></div>
      <div><dt>WebMCP</dt><dd>A compatible browser agent calls actions exposed by a web page. The page can remain a shared place to inspect the work.</dd></div>
      <div><dt>Voice over an app</dt><dd>A spoken request reaches an app-specific integration. First Officer supplies a bounded example.</dd></div>
      <div><dt>Voice through MCP</dt><dd>An assistant could turn speech into authorised calls across services. This is the next experiment proposed in the series.</dd></div>
    </dl><a href="/articles/is-ui-holding-us-back#article-proof">Explore the routes visually →</a></section>
    <section id="method" aria-labelledby="method-title"><p>How we will judge progress</p><h2 id="method-title">Count the effort to finish.</h2><p>Compare the same task through the existing interface and the proposed route. Define completion first. Record assistance, errors, corrections and the effort of checking the result. Account for familiarity, input method, cost and connectivity. Include people who use the access methods being claimed.</p><p>The proposed experiments are a scoped Traction read through MCP, correction after changing input, and a draft that crosses app boundaries. These experiments and a participant study have not been completed for this series. The current evidence is historical research, the reported WebAIM scan, inspected implementations and an existing Cargo recording.</p><p>Yann VR is the accountable editor. Orchestra builds the demonstrated systems; they are not independent evaluations or client outcomes. Primary sources appear beside claims. Source notes are our summaries. Conceptual figures carry no measured performance ranking.</p><p>Evidence reviewed 5 October 2026. Material source changes, reproducibility failures and substantiated reader corrections trigger a review of the text and figures. Previous observations retain their dates. First published 6 October 2026; no revision since.</p><a href="/#contact">Send a correction or discuss a task →</a></section>
    <footer><a href="/articles">← All Orchestra articles</a></footer>
  </section>;
}
