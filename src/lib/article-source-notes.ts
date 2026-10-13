import { visibleArticles } from './article-catalogue';

export type { SourceNote } from './article-experience/model';
import type { SourceNote } from './article-experience/model';

const notes: Record<string, SourceNote> = {
  'https://www.cl.cam.ac.uk/~pr10/iui/licklider60.pdf': { preview: 'pdf', title: 'Man–Computer Symbiosis', by: 'J.C.R. Licklider · 1960 · §3.1' },
  'https://www.ece.uvic.ca/~aalbu/CENG%20412%202009/bewley83.pdf': { preview: 'pdf', title: 'Human Factors Testing in the Design of Xerox Star', by: 'Bewley and colleagues · CHI 1983' },
  'https://dougengelbart.org/pubs/augment-3906-Framework.html': { title: 'Augmenting Human Intellect', by: 'Douglas Engelbart · 1962' },
  'https://webaim.org/projects/million/': { title: 'The WebAIM Million', by: 'WebAIM · February 2026 sample' },
  'https://www.w3.org/TR/WCAG22/#cc3': { preview: 'unavailable', title: 'WCAG 2.2: Complete processes', by: 'W3C · Conformance requirement 3' },
  'https://www.w3.org/TR/naur/': { preview: 'unavailable', title: 'Natural Language Interface Accessibility User Requirements', by: 'W3C · Group Draft Note · September 2022' },
  'https://webmachinelearning.github.io/webmcp/': { title: 'WebMCP', by: 'Draft Community Group Report · 30 September 2026' },
  'https://developer.chrome.com/blog/webmcp-epp': { preview: 'unavailable', title: 'WebMCP early preview', by: 'Chrome for Developers · February 2026' },
  'https://developer.chrome.com/docs/ai/webmcp': { preview: 'unavailable', title: 'WebMCP', by: 'Chrome for Developers · guide updated 1 October 2026' },
  'https://github.com/webmachinelearning/webmcp/blob/6891d0e857a0b35d8478aa8a01958565fb5466cd/continuations-explainer.md': { preview: 'unavailable', title: 'WebMCP continuations explainer', by: 'Web Machine Learning Community Group · merged 2 October 2026' },
  'https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture': { preview: 'unavailable', title: 'MCP architecture', by: 'Model Context Protocol · version 2026-07-28' },
  'https://github.com/hyperdrift-io/uk-ai-radar/blob/main/WEBMCP.md': { preview: 'unavailable', title: 'WebMCP in UK AI Radar', by: 'Hyperdrift · implementation notes' },
  'https://github.com/hyperdrift-io/bridge-voice': { preview: 'unavailable', title: 'First Officer / Bridge Voice', by: 'Hyperdrift · public repository' },
  // Field notes and the Databricks series, reviewed 10 October 2026. Page previews only where the destination permits framing.
  'https://developers.databricks.com/docs/appkit/v0/architecture': { title: 'AppKit architecture', by: 'Databricks · AppKit v0 documentation' },
  'https://developers.databricks.com/docs/appkit/v0/plugins/agents': { title: 'AppKit agents plugin', by: 'Databricks · AppKit v0 documentation · beta' },
  'https://www.mongodb.com/docs/manual/core/transactions/': { title: 'Transactions', by: 'MongoDB Manual' },
  'https://www.mongodb.com/docs/manual/data-modeling/': { title: 'Data modeling', by: 'MongoDB Manual' },
  'https://www.assemblyai.com/blog/universal-3-6-pro-realtime': { title: 'Universal-3.6 Pro realtime', by: 'AssemblyAI blog' },
  'https://docs.databricks.com/aws/en/oltp/projects/databricks-apps': { preview: 'unavailable', title: 'Lakebase with Databricks Apps', by: 'Databricks documentation' },
  'https://docs.langchain.com/oss/python/langchain/streaming': { preview: 'unavailable', title: 'Streaming', by: 'LangChain documentation' },
  'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events': { preview: 'unavailable', title: 'Using server-sent events', by: 'MDN Web Docs' },
  'https://www.postgresql.org/docs/current/datatype-json.html': { preview: 'unavailable', title: 'JSON types', by: 'PostgreSQL documentation' },
  'https://www.postgresql.org/docs/current/tutorial-transactions.html': { preview: 'unavailable', title: 'Transactions', by: 'PostgreSQL documentation' },
  'https://learn.microsoft.com/en-us/azure/cosmos-db/transactional-batch': { preview: 'unavailable', title: 'Transactional batch operations', by: 'Microsoft Learn · Azure Cosmos DB' },
  'https://github.com/hyperdrift-io/helm': { preview: 'unavailable', title: 'Helm', by: 'Hyperdrift · public repository' },
  'https://github.com/hyperdrift-io/standup': { preview: 'unavailable', title: 'Standup', by: 'Hyperdrift · public repository' },
  'https://youtu.be/JB2O3WSwH90': { preview: 'unavailable', title: 'Helm demonstration', by: 'Hyperdrift · YouTube' },
  'https://hyperdrift.io/blog/your-error-page-is-a-prompt': { preview: 'unavailable', title: 'Your Error Page Is a Prompt', by: 'Yann VR · Hyperdrift' },
  'https://hyperdrift.io/blog/the-agent-is-the-session': { preview: 'unavailable', title: 'The Agent Is the Session', by: 'Yann VR · Hyperdrift · August 2026' },
  // Orchestra OS articles, reviewed 13 October 2026. Page previews only where the destination permits framing.
  'https://dora.dev/capabilities/streamlining-change-approval/': { title: 'Streamlining change approval', by: 'DORA · capability research' },
  'https://docs.gitlab.com/ci/environments/deployment_safety/': { title: 'Deployment safety', by: 'GitLab documentation · CI/CD environments' },
  'https://git-scm.com/docs/gitworkflows': { title: 'gitworkflows: merging upwards', by: 'Git documentation' },
  'https://access.redhat.com/security/updates/backporting': { preview: 'unavailable', title: 'Backporting security fixes', by: 'Red Hat Customer Portal' },
  'https://www.cisa.gov/known-exploited-vulnerabilities-catalog': { preview: 'unavailable', title: 'Known Exploited Vulnerabilities Catalog', by: 'CISA' },
  'https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html': { preview: 'unavailable', title: 'Scanning Amazon ECR container images', by: 'AWS documentation · Amazon Inspector' },
  'https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html': { preview: 'unavailable', title: 'Runtime version updates', by: 'AWS documentation · Lambda' },
  'https://docs.cloud.google.com/run/docs/configuring/services/automatic-base-image-updates': { preview: 'unavailable', title: 'Automatic base image updates', by: 'Google Cloud documentation · Cloud Run' },
  'https://fluxcd.io/flux/components/image/imageupdateautomations/': { preview: 'unavailable', title: 'Image update automations', by: 'Flux documentation' },
};

export function articleSourceNote(url: string): SourceNote | undefined { if (notes[url]) return notes[url];
  const article = url.startsWith('/articles/') && visibleArticles().find((item) => `/articles/${item.slug}` === url);
  return article ? { title: article.title, by: article.publishedAt ? 'Orchestra · related article' : 'Orchestra · editorial preview' } : undefined; }

/** Founder rule, 13 October 2026: an external citation that cannot open in place reads as text, so the reader never leaves the article. Same on every screen size. */
export function citationStaysText(href: string): boolean {
  if (!/^https?:\/\//.test(href)) return false;
  const note = articleSourceNote(href.split('#')[0]);
  return !note || note.preview === 'unavailable';
}
