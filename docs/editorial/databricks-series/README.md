# Databricks and practical AI engineering

## Publication authority — 3 October 2026

The [shared publication register](https://github.com/hyperdrift-io/hyperdrift/blob/main/meta/discovery/publications.json) on HD main is the authority for current company announcements. Follow its [claim and read-back contract](https://github.com/hyperdrift-io/hyperdrift/blob/main/meta/discovery/README.md). This document preserves editorial evidence and historical release observations; it is not a second send queue. The existing `weekly-hyperdrift-ai-article-announcement` heartbeat remains the only company-page executor. Org BAU reconciles the register without posting. HyperPost promotion is retired; historical pending channels are not open commitments.

Research prepared 22 September 2026 for `ai.hyperdrift.io/articles`; both opening articles went live on 24 September 2026. Primary goal: qualified conversations about real AI workflows. Apply the [article standard](../ARTICLE-STANDARD.md). Both articles are under 800 words, with original source-backed decision graphics. No Databricks partnership, client result or executed SDK experiment is implied.

## Start with two decisions

The database article answers “How does Lakebase compare with MongoDB and Cosmos DB, and when should I choose each?” Refund and support-case examples explain that comparison; they are not its topic. All articles follow the AEO contract in [ARTICLE-STANDARD.md](../ARTICLE-STANDARD.md); query and evidence coverage is recorded in [AEO-REVIEW.md](../AEO-REVIEW.md).

| Priority | Article / decision | Simple example | Contact invitation | Status |
|---|---|---|---|---|
| 1 | [Lakebase vs MongoDB and Cosmos DB: which approach fits?](https://ai.hyperdrift.io/articles/lakebase-vs-document-databases) | A refund versus an independent support case | Discuss your agent data model | Live; [company LinkedIn post](https://www.linkedin.com/feed/update/urn:li:share:7510805182981648385/) verified |
| 2 | [LangChain vs Databricks AppKit for agent streaming](https://ai.hyperdrift.io/articles/langchain-databricks-appkit-sse) | Show progress, request approval, recover after disconnect | Discuss your agent streaming workflow | Live; see shared register for current company delivery state |
| 3 | Keep agent memory separate from business truth | A conversation summary versus a confirmed refund | Discuss your agent state boundaries | Brief only; research before writing |
| 4 | Give an agent the permissions of the job | Two tenants asking the same question over different records | Discuss your access model | Brief only; research before writing |
| 5 | Make a failed tool call safe to retry | A payment accepted before its response is lost | Discuss workflow reliability | Brief only; research before writing |
| 6 | Measure the cost of one completed AI job | Retrieval, inference, tool work and human review | Discuss your production economics | Brief only; needs actual measurements |

Databricks anchors the series; the concepts remain useful for other platforms. These priorities reflect service relevance and the founder's requested topics. Search volume, keyword difficulty and a measured ROI ranking are **not available**. Candidate intent phrases: “Lakebase vs MongoDB”, “Postgres vs document database for AI agents”, “Databricks AppKit streaming”, “LangChain SSE progress”. Validate against actual search and enquiry data before expanding the series.

Use the existing article index as the series entrance. Link each future piece to the decision it extends, and keep each article self-contained. Do not publish empty future URLs or add a second CMS for this series.

## What the skill research changed

Reviewed the installed `cro`, `hyperdrift-blog`, `find-skills` and `get-tool` guidance, then searched the community directory and read the original [content-strategy](https://github.com/coreyhaines31/marketingskills/blob/main/skills/content-strategy/SKILL.md) and [cro](https://github.com/coreyhaines31/marketingskills/blob/main/skills/cro/SKILL.md) skills from Corey Haines' marketing collection. The repository reported 51,177 stars during this review; install counts were not independently verified. No extra skill was installed.

The useful recommendations are to pair search intent with an idea worth sharing, select topics close to the buyer's real decision, use a CTA that continues that decision, and prepare reusable distribution material while creating the original. These are practitioner frameworks, not experimental proof of a conversion uplift. We apply them through the site-specific standard rather than importing an entire marketing workflow or its generic length targets.

Concrete choices here: answer early, make the first image a useful decision graphic, give an illustrative workflow, show fit and limits, and repeat one contextual enquiry action. No pop-up, gated diagram or forced newsletter interrupts reading. The recommended next experiment is topic-specific CTA wording versus a generic project invitation, with qualified enquiries per unique article session as the business metric and human qualification rate as the guardrail. The present drafts are not an A/B test and no winner has been measured.

Discovery tooling note: installed playbooks now uses `list skill` and `find skill`, while older guidance omitted the subcommand. Its search endpoint returned 404 here. Web search and the source GitHub repository supplied the research. Firecrawl was not authenticated, so the available web research tool was used. This did not require new installs or credentials.

## Technical claim ledger

Sources inspected on 22 September 2026. Recommendations and refund examples are our architectural interpretation; product capabilities below come from primary docs. Recheck before publication, particularly AppKit beta behaviour and cloud-specific Lakebase availability.

| Source | Supports | Boundary to preserve |
|---|---|---|
| [Lakebase Postgres](https://docs.databricks.com/aws/en/oltp/projects) | Managed Postgres integrated with Databricks; transactional applications and agent state | AWS documentation; do not generalise regional features or preview capabilities to every cloud |
| [Postgres transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html) | Related refund records can be written in one transaction | The recommendation for this illustrative refund is an architectural judgement, not a benchmark |
| [Postgres JSON types](https://www.postgresql.org/docs/current/datatype-json.html) | Relational designs can include JSON and JSON indexing | JSON output does not force a document database; this is a modelling recommendation |
| [MongoDB data modelling](https://www.mongodb.com/docs/manual/data-modeling/) | Flexible document shape; model around access patterns | Flexibility still needs schema and boundary design |
| [MongoDB transactions](https://www.mongodb.com/docs/manual/core/transactions/) | Multi-document transactions exist | Do not claim NoSQL lacks transactions; deployment details matter |
| [Cosmos transactional batch](https://learn.microsoft.com/en-us/azure/cosmos-db/transactional-batch) | Batch operations within one logical partition key | Refers to the documented document API, not every Cosmos-branded offering |
| [LangChain streaming](https://docs.langchain.com/oss/python/langchain/streaming) | Agent updates, model messages, custom events | Transport and application policy need separate design; versioned iterator formats differ |
| [AppKit v0 architecture](https://developers.databricks.com/docs/appkit/v0/architecture) | Node server, Databricks integrations, HTTP/SSE | AppKit is not merely an SSE library |
| [AppKit v0 agents](https://developers.databricks.com/docs/appkit/v0/plugins/agents) | Beta agent host; streaming POST /chat; appkit.approval_pending | Beta APIs may change; do not imply its event schema matches LangChain |
| [MDN SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) | Event-stream framing, EventSource and reconnection | Server persistence/replay is an application responsibility; streaming POST needs an appropriate client |

No benchmark, cost saving, client outcome or SDK compatibility claim was tested. The value is a concise decision aid with fair boundaries and an actionable validation scenario.

## Assets and review

Current visuals: purpose-built transaction-boundary and streaming-sequence components, with optional interaction and downloadable PNG snapshots. The founder requested format-led visualisation without the infographic skill for these flow/architecture subjects. See [VISUAL-DIRECTION.md](VISUAL-DIRECTION.md) for source, export and review details. Shallow topic headers and concise page layout remain.

Runtime copy is in `content/articles/lakebase-vs-document-databases.md` and `content/articles/langchain-databricks-appkit-sse.md`; catalogue entries have the verified 24 September publication timestamp. Local preview routes:

- http://127.0.0.1:3112/articles/lakebase-vs-document-databases
- http://127.0.0.1:3112/articles/langchain-databricks-appkit-sse

## Distribution kit — reviewed copy and historical delivery evidence

For each approved article, reuse its opening PNG, share line and canonical URL. A short founder post should teach the decision even without the click; the article adds the worked example and sources. Email reuse is for an explicitly authorised send. Do not place links in unrelated conversations.

**Database post:** “Your agent returns JSON. That does not settle its database. Trace one refund: which records change together, what prevents a duplicate, and where does the external payment happen? We put Lakebase, MongoDB and Cosmos DB into a one-page decision guide.” Link to https://ai.hyperdrift.io/articles/lakebase-vs-document-databases and attach `public/articles/databricks/transaction-visual.png`.

**Streaming post:** “The best progress message says what changed. Separate the runtime event, the application's access rules and the SSE connection. Then disconnect halfway through a tool call. Can the interface recover without starting the job twice?” Link to https://ai.hyperdrift.io/articles/langchain-databricks-appkit-sse and attach `public/articles/databricks/streaming-visual.png`.

On 29 September, the founder approved the LinkedIn sign-in for a new Composio connection with organization read and publishing scopes. `LINKEDIN_GET_COMPANY_INFO` resolved the HyperDrift Page (`urn:li:organization:112937919`). The [database post](https://www.linkedin.com/feed/update/urn:li:share:7510805182981648385/) was published with its PNG and a link tagged `utm_source=linkedin`, `utm_medium=social`, `utm_campaign=one_opportunity_2026`; `LINKEDIN_GET_POST_CONTENT` and the public page verified the text, company author, image, `PUBLISHED` state and `PUBLIC` visibility. A streaming share was also sent minutes later in error. The founder asked to remove it and use a weekly cadence. `LINKEDIN_DELETE_POST` returned `deleted: true` for `urn:li:share:7510805258793746433`; a subsequent read-back returned 404, while the database post remained public. The streaming article itself remains live and its prepared company share is queued for the next weekly slot.

**Company cadence:** at most one approved AI article share per weekly slot. Read current HD main, inspect the company Page, verify the canonical article and exact graphic, and claim the registered payload before sending. Record its public read-back in the shared register. New copy or media still needs final review; never batch a backlog. Site publication remains independent of LinkedIn cadence.

Historical HyperPost audit (29 September): no scheduled jobs, configured Bluesky/Mastodon accounts or cron runner were found. Those channels are retired from this release; retain the evidence without rebuilding a sender.

**Email introduction, databases:** “This short guide uses a refund to clarify when relational or document modelling fits. The diagram may help with your current architecture discussion.”

**Email introduction, streaming:** “This short guide separates agent updates from browser delivery, including where LangChain and Databricks AppKit overlap. The recovery example is a useful review question for a streaming interface.”

Use UTMs only on external campaign links. Do not add UTMs to internal article-to-enquiry links and overwrite the visitor's acquisition source. The current event implementation records article/session but does not persist campaign dimensions; campaign reporting needs the existing analytics launch work.

## Measurement and publication boundary

Existing first-party events and durable lead records preserve article context. `enquiry_submitted` means relay acceptance, not proof of inbox delivery or a qualified lead. Qualification remains human. `enquiry_preview_saved` is excluded. PostHog integration and production enquiry-storage readiness remain prerequisites documented in the AI-native series README.

Use qualified conversations per production hour as an early efficiency measure. Financial ROI is (attributable gross profit minus total content cost) / total content cost, with a declared attribution method and time horizon; no ROI number is available yet. Include research, writing, design, distribution and maintenance in cost. Track attributed and assisted conversations separately to avoid counting the same lead multiple times.

The founder requested the two reviewed articles go live on 24 September; the release was deployed and verified. The database company share remains live from 29 September. The streaming company share was removed the same day to restore a weekly release rhythm. HyperPost distribution has not been sent or scheduled.

## Verification — 22 September 2026

`npm run typecheck` and scoped `git diff --check` passed. Both routes and both Open Graph endpoints returned HTTP 200. Draft noindex, null publication dates and sitemap exclusion were verified. Graphics were rendered at 2400 × 1350, visually reviewed and corrected for overflow. Browser review covered desktop and 390px phone width; the streaming page had no horizontal overflow, its image loaded, and both enquiry forms retained the matching article context. The database CTA reached the form. No form was submitted or external message sent.

The existing preview server remains running on port 3112. No production build, deployment or infrastructure edit was needed. Unrelated concurrent branding edits were left untouched. Updated `hyperdrift-blog`, `cro` and `find-skills` instructions passed skill validation using the existing HD Python environment. Changes are local and uncommitted pending editorial review.
