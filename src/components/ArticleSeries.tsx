import { visibleArticles } from '@/lib/article-catalogue';

export function ArticleSeries() {
  const articles = visibleArticles();
  if (!articles.length) return null;
  return <section id="article-series" aria-labelledby="series-heading">
    <header><p>Inside the work</p><h2 id="series-heading">The AI-native organisation.</h2><p>Working examples of the knowledge, judgement and tools that help a business move. See what we built, then where it could fit your work.</p></header>
    <ol>{articles.map((article) => <li key={article.slug}><a href={`/articles/${article.slug}`}><span>{String(article.order).padStart(2, '0')} / {article.topic}</span><h3>{article.title}</h3><p>{article.example} · {article.exampleStatus}</p><span aria-hidden="true">Read the article →</span></a></li>)}</ol>
    <a href="/articles">Explore the series →</a>
  </section>;
}
