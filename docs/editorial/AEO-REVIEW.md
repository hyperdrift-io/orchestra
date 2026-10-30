# Article answer coverage

Retired 8 October 2026 (founder direction: quality over quantity, no filler): `the-bridge` (redirects to `evidence-that-starts-work`), `expertise-agents-can-use` (redirects to `/articles`), `connect-agents-to-existing-work` (duplicate of `webmcp-actions-on-the-page`, redirects there). The weekly `hd articles review` routine reports the catalogue against the standard.

Reviewed 29 September 2026 following the founder’s direction: every article is optimised to answer its reader’s question. Apply [ARTICLE-STANDARD.md](ARTICLE-STANDARD.md) and the workspace `meta/skills/search-indexing/references/aeo.md` contract. These are editorial intent hypotheses, not measured query-volume claims.

| Canonical article slug | Primary reader question | Answer and evidence to preserve |
|---|---|---|
| `lakebase-vs-document-databases` | How does Lakebase compare with MongoDB and Cosmos DB, and when should I choose each? | Define managed Postgres versus document modelling; compare relationships and transaction scope. Refund and support case demonstrate differing fits. Primary Databricks, PostgreSQL, MongoDB and Microsoft docs support capabilities; our fit recommendations remain labelled judgement. |
| `langchain-databricks-appkit-sse` | Should I use LangChain or Databricks AppKit to stream agent updates with SSE? | Distinguish runtime updates, the application contract and browser transport; choose by runtime/platform fit. LangChain, AppKit and MDN sources; approval/disconnect example is illustrative, AppKit agents plugin is beta. |
| `delegation-with-boundaries` | How much authority should an AI agent have, and how is it enforced? | Scope the job, restrict tools, separate observation/action and verify completion. Helm source and recorded sandbox demonstration; no universal security guarantee. |
| `evidence-that-starts-work` | What makes an AI daily brief useful for prioritising work? | Agree an ordering rule, retain supporting records and let people correct recommendations. Standup public source and recorded output; estimates are not measured completion times. |
| `production-led-security-maintenance` | Should a security fix for a live app wait for the next feature release? | No: repair from the deployed release, carry the fix back to development as an owned obligation, and refuse any later candidate missing the required fix. Prior art (Lambda, Cloud Run, Ubuntu, Git merge-upward, Flux, GitLab deployment safety, Red Hat backports, Amazon Inspector) cited; the combined contract is our proposed model; HD's own gap stated plainly. |
| `app-operations-after-launch` | Who should run a live app's operations after launch, and what should a founder keep? | Five recurring jobs; hand them to named owners with agents inside agreed limits and receipts; keep the decisions. Our fleet is the first tenant; automatic enrolment and the security carry-back loop are labelled as still being proven. Five reader questions work whoever runs the app. |

## Follow-up coverage

Database comparison: JSON versus relational modelling; multi-record transactions; Cosmos partition scope; when Databricks integration justifies Lakebase; when an existing database is the simpler option.

Streaming comparison: which layer emits events; approval authority; GET EventSource versus streaming POST; stored run state and disconnect recovery; SDK/plugin stability. Neither shared SSE transport nor JSON output makes unlike products interchangeable.

The other articles retain practical sections covering implementation boundaries, evidence limits and a scoped next step. Preserve those when refining their openings. Do not turn the catalogue into repeated boilerplate Q&A or broaden a prototype’s claims to match a query.

## Verification and measurement

All published articles have a topic-naming H1/search title and an opening answer that names its scope before the worked example. Canonical slugs remain stable. The database visual is labelled as an example and appears after the general comparison and transaction explanation. Essential conclusions remain in HTML.

At release, verify the generated page, Article/Breadcrumb JSON-LD, social image, sitemap and `llms.txt`; record actual production verification separately. Publication dates remain original and modification dates reflect these content edits.

Citation checks for this revision: **not measured**. Record engine, exact question, date, cited URL and mode when running them. Sitemap acceptance or crawler access does not establish citation. Review available GSC/Bing evidence and identifiable PostHog assistant referrals separately from qualified enquiries; do not infer a causal uplift from one response.


## Integrated Fleet / intelligence UI — published 24 October 2026

- Question: How can agents operate a self-hosted app fleet while the UI presents intel and completed work? Search intent hypothesis; demand unmeasured.
- Position: “UI is for intel. Agents are for operating.” Preserve the founder’s affirmative proposal and the capability it gives smaller operators.
- Page: `/articles/agent-driven-ui-intelligence-and-action`; the URL is unchanged through the editorial corrections.
- Evidence: recorded local Stack One automatic recovery. The replacement VPS is not commissioned; the wider operating model remains in development.
- Register and review: [Integrated Fleet editorial record](integrated-fleet/README.md). Wording approved by Yann on 24 October 2026 ([release candidate](integrated-fleet/RELEASE-CANDIDATE.md)); `publishedAt: 2026-10-24T02:11:00Z`. Verify the live page, JSON-LD, OG card, sitemap, feed and `llms.txt` after deploy and record them in `integrated-fleet/VERIFICATION.md`.


## DSPy drafts — 23 October 2026

| Canonical article slug | Primary reader question | Answer and evidence to preserve |
|---|---|---|
| `dspy-programmes-you-can-improve` | When should a team use DSPy, and how do signatures, modules, metrics and optimisation fit together? | Start with a repeatable task, examples and a baseline. Explain the evaluation loop and experimental RLM. Primary DSPy documentation; illustrative support workflow; no executed quality/cost benchmark. |
| `dspy-reasoning-continuity` | How can DSPy preserve reasoning between model calls and support a useful model handoff? | Separate canonical message storage, eligible provider replay and portable task context. Issue #10675, GBX's offered tests, pinned source inspection, seven-check local public-API example and provider contracts. Proposed change, no accepted contribution or universal replay claim. |

Both remain unpublished and noindex. Series evidence, voice and refresh requirements: [DSPy editorial record](dspy-series/README.md).

## Clear Mermaid draft — 30 October 2026

- Question: How can existing Mermaid flowcharts be easier to read in a web page?
- Answer: preserve the graph, follow its direction, connect named outcomes directly and offer readable-size navigation plus textual relationships. Use the browser for text and interaction.
- Evidence: seven-case, eight-round local prototype; recorded long-label example. Founder preference and automated checks have explicit limits. Beautiful Mermaid, Mermaid accessibility and W3C colour guidance are credited.
- Scope: checked flowchart subset; no published package/MCP, universal compatibility, accessibility conformance or independent comprehension result. Query demand and assistant citations are unmeasured.
- Copy and slots: [OSS series record](oss-better-standards/README.md); `publishedAt` remains null.

## OpenTelemetry #556 draft — 30 October 2026

- Question: How do I find every span of an AI agent conversation in OpenTelemetry, and should my instrumentation pass `gen_ai.conversation.id` to nested calls?
- Answer: since PR #556 (merged 30 October 2026), instrumentations may pass the conversation ID to nested instrumentations in the same process, prefer the library's own value, share nothing unlisted and record it only on signals that define it. Agent names stay per operation; main-agent naming continues in draft #385.
- Evidence: the public PR, issue #522, the merged README section, the attribute definition and the repository's reference reports read at upstream main 6f98aef (30 libraries; 11 of 43 library-span pairs record the ID).
- Scope: Development-status conventions with no tagged release; the rule is optional; the trace visual is illustrative; reference scenarios show what each exercises, not full library capability. Orchestra runs no OpenTelemetry instrumentation of its own yet. Query demand and assistant citations are unmeasured.
- Copy and slots: [OSS series record](oss-better-standards/README.md); `publishedAt` remains null.
