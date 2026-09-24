# Databricks and practical AI engineering

Research prepared 22 September 2026 for `ai.hyperdrift.io/articles`; both opening articles went live on 24 September 2026. Primary goal: qualified conversations about real AI workflows. Apply the [article standard](../ARTICLE-STANDARD.md). Both articles are around 600 words, with original source-backed decision graphics. No Databricks partnership, client result or executed SDK experiment is implied.

## Start with two decisions

| Priority | Article / decision | Simple example | Contact invitation | Status |
|---|---|---|---|---|
| 1 | [Lakebase vs document databases: start with the transaction](https://ai.hyperdrift.io/articles/lakebase-vs-document-databases) | A refund spanning balance, record and approval | Discuss your agent data model | Live; social distribution pending |
| 2 | [LangChain and Databricks AppKit: make streaming useful](https://ai.hyperdrift.io/articles/langchain-databricks-appkit-sse) | Show progress, request approval, recover after disconnect | Discuss your agent streaming workflow | Live; social distribution pending |
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

## Distribution kit — live articles, social posts pending

For each approved article, reuse its opening PNG, share line and canonical URL. A short founder post should teach the decision even without the click; the article adds the worked example and sources. Email reuse is for an explicitly authorised send. Do not place links in unrelated conversations.

**Database post:** “Your agent returns JSON. That does not settle its database. Trace one refund: which records change together, what prevents a duplicate, and where does the external payment happen? We put Lakebase, MongoDB and Cosmos DB into a one-page decision guide.” Link to https://ai.hyperdrift.io/articles/lakebase-vs-document-databases and attach `public/articles/databricks/transaction-visual.png`.

**Streaming post:** “The best progress message says what changed. Separate the runtime event, the application's access rules and the SSE connection. Then disconnect halfway through a tool call. Can the interface recover without starting the job twice?” Link to https://ai.hyperdrift.io/articles/langchain-databricks-appkit-sse and attach `public/articles/databricks/streaming-visual.png`.

Release order: verify the production article and image URLs, publish on the Hyperdrift company LinkedIn Page, then use HyperPost for configured Bluesky/Mastodon accounts. Record each platform's returned post URL and read the public post back before marking it sent. Avoid duplicate retries after an uncertain response. On 24 September the local HyperPost build worked, but no accounts or cron were configured and `schedule-list` was empty; Composio's existing LinkedIn grant could read the personal profile but returned 403 for organization ACLs. See the AI-portal section of `apps/hyper-drift/CONTENT_RELEASE.md` for the actual posting gate. These posts have **not** been sent or scheduled.

**Email introduction, databases:** “This short guide uses a refund to clarify when relational or document modelling fits. The diagram may help with your current architecture discussion.”

**Email introduction, streaming:** “This short guide separates agent updates from browser delivery, including where LangChain and Databricks AppKit overlap. The recovery example is a useful review question for a streaming interface.”

Use UTMs only on external campaign links. Do not add UTMs to internal article-to-enquiry links and overwrite the visitor's acquisition source. The current event implementation records article/session but does not persist campaign dimensions; campaign reporting needs the existing analytics launch work.

## Measurement and publication boundary

Existing first-party events and durable lead records preserve article context. `enquiry_submitted` means relay acceptance, not proof of inbox delivery or a qualified lead. Qualification remains human. `enquiry_preview_saved` is excluded. PostHog integration and production enquiry-storage readiness remain prerequisites documented in the AI-native series README.

Use qualified conversations per production hour as an early efficiency measure. Financial ROI is (attributable gross profit minus total content cost) / total content cost, with a declared attribution method and time horizon; no ROI number is available yet. Include research, writing, design, distribution and maintenance in cost. Track attributed and assisted conversations separately to avoid counting the same lead multiple times.

The founder requested the two reviewed articles go live on 24 September; the release was deployed and verified. Social copy remains prepared and unsent until its destination can be tested and the public post read back. Do not infer a published social post from a scheduled row or an API success alone.

## Verification — 22 September 2026

`npm run typecheck` and scoped `git diff --check` passed. Both routes and both Open Graph endpoints returned HTTP 200. Draft noindex, null publication dates and sitemap exclusion were verified. Graphics were rendered at 2400 × 1350, visually reviewed and corrected for overflow. Browser review covered desktop and 390px phone width; the streaming page had no horizontal overflow, its image loaded, and both enquiry forms retained the matching article context. The database CTA reached the form. No form was submitted or external message sent.

The existing preview server remains running on port 3112. No production build, deployment or infrastructure edit was needed. Unrelated concurrent branding edits were left untouched. Updated `hyperdrift-blog`, `cro` and `find-skills` instructions passed skill validation using the existing HD Python environment. Changes are local and uncommitted pending editorial review.
