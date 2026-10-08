# Article answer coverage

Retired 8 October 2026 (founder direction: quality over quantity, no filler): `the-bridge` (redirects to `evidence-that-starts-work`), `expertise-agents-can-use` (redirects to `/articles`), `connect-agents-to-existing-work` (duplicate of `webmcp-actions-on-the-page`, redirects there). The weekly `hd articles review` routine reports the catalogue against the standard.

Reviewed 29 September 2026 following the founder’s direction: every article is optimised to answer its reader’s question. Apply [ARTICLE-STANDARD.md](ARTICLE-STANDARD.md) and the workspace `meta/skills/search-indexing/references/aeo.md` contract. These are editorial intent hypotheses, not measured query-volume claims.

| Canonical article slug | Primary reader question | Answer and evidence to preserve |
|---|---|---|
| `lakebase-vs-document-databases` | How does Lakebase compare with MongoDB and Cosmos DB, and when should I choose each? | Define managed Postgres versus document modelling; compare relationships and transaction scope. Refund and support case demonstrate differing fits. Primary Databricks, PostgreSQL, MongoDB and Microsoft docs support capabilities; our fit recommendations remain labelled judgement. |
| `langchain-databricks-appkit-sse` | Should I use LangChain or Databricks AppKit to stream agent updates with SSE? | Distinguish runtime updates, the application contract and browser transport; choose by runtime/platform fit. LangChain, AppKit and MDN sources; approval/disconnect example is illustrative, AppKit agents plugin is beta. |
| `delegation-with-boundaries` | How much authority should an AI agent have, and how is it enforced? | Scope the job, restrict tools, separate observation/action and verify completion. Helm source and recorded sandbox demonstration; no universal security guarantee. |
| `evidence-that-starts-work` | What makes an AI daily brief useful for prioritising work? | Agree an ordering rule, retain supporting records and let people correct recommendations. Standup public source and recorded output; estimates are not measured completion times. |

## Follow-up coverage

Database comparison: JSON versus relational modelling; multi-record transactions; Cosmos partition scope; when Databricks integration justifies Lakebase; when an existing database is the simpler option.

Streaming comparison: which layer emits events; approval authority; GET EventSource versus streaming POST; stored run state and disconnect recovery; SDK/plugin stability. Neither shared SSE transport nor JSON output makes unlike products interchangeable.

The other articles retain practical sections covering implementation boundaries, evidence limits and a scoped next step. Preserve those when refining their openings. Do not turn the catalogue into repeated boilerplate Q&A or broaden a prototype’s claims to match a query.

## Verification and measurement

All published articles have a topic-naming H1/search title and an opening answer that names its scope before the worked example. Canonical slugs remain stable. The database visual is labelled as an example and appears after the general comparison and transaction explanation. Essential conclusions remain in HTML.

At release, verify the generated page, Article/Breadcrumb JSON-LD, social image, sitemap and `llms.txt`; record actual production verification separately. Publication dates remain original and modification dates reflect these content edits.

Citation checks for this revision: **not measured**. Record engine, exact question, date, cited URL and mode when running them. Sitemap acceptance or crawler access does not establish citation. Review available GSC/Bing evidence and identifiable PostHog assistant referrals separately from qualified enquiries; do not infer a causal uplift from one response.
