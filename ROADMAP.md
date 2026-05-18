# Orchestra AI — Roadmap

> Phased plan for Orchestra AI, derived from the spec at `docs/superpowers/specs/2026-05-17-orchestra-ai-design.md` (in the parent Hyperdrift repo) and the implementation plan at `docs/superpowers/plans/2026-05-17-orchestra-ai-phase-1.md`.
>
> **North star:** [MISSION.md](./MISSION.md).
> **Pillars:** Services · OSS · Content / specifications.

## Phase 1 — Launch (now → ~2 build days)

**Status:** Implementation complete, awaiting deploy + DNS.

**Deliverables**

- `apps/orchestra` Next.js landing app at `ai.hyperdrift.io`.
- Editorial design system (Fraunces + IBM Plex Sans/Mono, deep ink, vermillion accent, movement-numeral section markers, score-card case studies, staff-line motif, animated equalizer).
- Sections: Hero · Problem · Why Orchestra · How We Work · What We Build · Case Studies (hydra + hyper-video-mesh, framed as applied-AI proof) · Packages · FAQ · Contact · Footer.
- Contact pipeline: zod schema → Resend route → PostHog event capture. 6/6 tests passing.
- `hyperdrift.io` repositioned additively: hero updated with Orchestra AI CTA, featured Orchestra AI block, Selected Work section seeded by JoinEverything + curated master-cv anchors. **Live products kept primary.**
- `meta/mani.yaml` registers `orchestra` under the `hyperdrift-io` federation.
- All Orchestra and hyper-drift commits use the `yann@hyperdrift.io` identity.

**Remaining (requires user)**

Hyperdrift self-hosts on a Hostinger VPS. There is no Vercel / Netlify in the stack — the app is managed by PM2 behind nginx, with deploys driven by ansible from the `hyperdrift-infra` repo.

- Create remote: `gh repo create hyperdrift-io/orchestra --private --source=. --remote=origin --push` (from `apps/orchestra/`).
- Server-side env vars set on the Hostinger VPS for the `orchestra` PM2 process (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`).
- DNS: A record for `ai.hyperdrift.io` → Hostinger VPS.
- nginx server block for `ai.hyperdrift.io` proxying to `127.0.0.1:3005` (managed via ansible templates in `hyperdrift-infra`).
- GitHub Actions secrets: `DEPLOY_WEBHOOK_URL`, `DEPLOY_WEBHOOK_TOKEN`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`.
- First ansible deploy: `cd infra && make deploy app=orchestra` (or the per-app target the playbook exposes).
- Smoke test: every section, contact form end-to-end, PostHog `$pageview` events, TLS valid.
- `cd infra && make check-launch-readiness app=orchestra`.
- Push hyper-drift updates to its existing remote.

Port and infra registration (already committed in this repo + the `hyperdrift-infra` repo):

- **Production port**: `3005` (next free slot per `infra/PORTS.md`).
- **Development port**: `3105` (convention: prod + 100).
- **App config**: `infra/group_vars/apps.yml` — `deploy_apps[name=orchestra]`.
- **PM2 entry**: `apps/orchestra/ecosystem.config.cjs` mirrors the central `nginx-prod/ecosystem.config.js` block.
- **CI**: `.github/workflows/deploy.yml` runs `test:ci` + `build`, then triggers the server-side deploy webhook.

**MVP discipline — what's intentionally NOT wired**

- **No analytics in the MVP.** No PostHog, no GA, no instrumentation noise. We add measurement when there is something signal-shaped to measure (real visitors, a real funnel). Until then, instrumentation is decoration.
- No CMS, blog scaffolding, or sub-vertical pages — these wait for content and case studies to justify them.
- Aggressive YAGNI on every "while we're at it" addition. The MVP's job is to support the *agent demo → case study → article* loop, nothing else.

**Out of Phase 1 scope (deferred)**

- OSS libraries, sub-vertical landing pages, whitepapers (drafted in the repo, not yet published on the site), standalone domain, any analytics.

---

## Phase 1.5 — Flagship use case as case study (overlap with Phase 1 close-out · ~Jun 2026)

**Goal:** Build one *concrete, runnable, demonstrable* agentic flow that becomes the first case study on `ai.hyperdrift.io`. The MVP itself becomes the proof — not in addition to marketing, *as* marketing.

The use case shape (to be locked in once we identify the target sub-vertical):

- Demonstrates the **agent/automation boundary** explicitly — same input, the system shows which path it took and why. Makes the editorial point of the *Agents vs Automation* whitepaper visible in code.
- Demonstrates **multi-tenant isolation** — at least two tenants, visible per-tenant memory and tool scoping. Makes the editorial point of the *Multi-tenant Agent Architecture* whitepaper visible in code.
- Solves a problem the **competition is not addressing**: most agentic-workflow products either ignore multi-tenancy entirely or treat the agent/automation boundary as folklore.

**Deliverables**

- A runnable demo (initially local; later embedded on `ai.hyperdrift.io` as a case study).
- A case-study write-up on Orchestra: problem · method · stack · outcome, with a link to the demo and to both whitepapers.
- A companion article on Orchestra walking through the design decisions, cross-linked from the Hyperdrift blog.

This is the seed of the content-distribution flow described below.

---

## Content distribution — where articles live

**Agent-domain technical content lives on Orchestra. Hyperdrift stays the studio voice.**

- **Orchestra hosts:** whitepapers, RFCs, agent patterns, case studies, engagement post-mortems, technical commentary on the broader agent ecosystem.
- **Hyperdrift hosts:** studio thinking (philosophy, builder essays), portfolio app announcements, broader founder commentary.
- **Cross-link, don't co-host:** Hyperdrift's blog links to Orchestra articles where relevant. Free distribution, no content duplication.
- **Why:** topical authority compounds with concentration; HD declutters; Orchestra's content portfolio travels with it cleanly when the brand graduates (Phase 4).

The content loop:

1. Engagement (paid or POC) produces a real pattern or finding.
2. The work becomes a case study on `ai.hyperdrift.io`.
3. The pattern becomes an article on Orchestra (or a whitepaper, if the rigour is there).
4. Hyperdrift's blog publishes a short pointer post that cross-links to the Orchestra article — driving HD traffic into Orchestra's funnel.
5. Sub-vertical landing pages (`/for-construction-saas` etc.) reference the relevant case studies and articles.

Every engagement should feed at least one item in this loop. The loop is the marketing engine; there is no separate "do marketing" task.

---

## Phase 2 — First engagements + OSS extraction (months 1–4 · ~Jun → Sep 2026)

**Goal:** Generate cash flow, accumulate paid case studies, extract the first OSS library from real engagement learnings.

**Deliverables**

- 2–3 paid client engagements taken and shipped.
- Each engagement documented as a case study card on `ai.hyperdrift.io` (problem · method · stack · outcome) — *plus* at least one Orchestra article per engagement walking through the design.
- HD cross-link post per engagement, pointing readers from `hyperdrift.io` to the Orchestra case study and article.
- First OSS library shipped: **`@orchestra/multitenant`** — multi-tenant agent patterns (per-tenant memory and embedding isolation, tool scoping, cost attribution, audit trails, adapters for LangGraph / CrewAI / Claude Agent SDK / OpenAI Agents SDK).
- First two whitepapers published on Orchestra (already drafted in this repo):
  - *"Multi-tenant Agent Architecture: a reference specification"* — `docs/whitepapers/2026-multi-tenant-agent-architecture.md`.
  - *"Agents vs Automation: drawing the right boundary"* — `docs/whitepapers/2026-agents-vs-automation.md`.
- First sub-vertical landing page (e.g. `/for-construction-saas`) — published only once a matching case study exists.
- **Light measurement only**, introduced once there is real traffic: a server-side hit counter or minimal pageview log. No third-party analytics SDK until the signal justifies it.

**Exit criteria**

- ≥ 2 paid client case studies live on `ai.hyperdrift.io`, each with a companion article and a cross-link from `hyperdrift.io`.
- `@orchestra/multitenant` has a runnable reference integration, a documented README, and zero known correctness bugs.
- Both whitepapers published on Orchestra and referenced from the relevant case studies.

---

## Phase 3 — MCP work, content cadence, second OSS (months 4–9 · ~Sep 2026 → Feb 2027)

**Goal:** Ship the second OSS library, build a content cadence, position Orchestra as a contributor to the emerging Model Context Protocol ecosystem.

**Deliverables**

- Second OSS library: **`@orchestra/mcp-schema`** — auto-generates MCP servers from Rails / Django / Prisma / Postgres schemas. Targets the fastest-growing standard in AI tool use; rides Anthropic's MCP popularity for distribution.
- MCP extension proposal: *"MCP servers from relational schemas — a draft convention,"* submitted via Anthropic's MCP working group or discussion process.
- Content engine: monthly pattern post or whitepaper on a recurring vertical-SaaS-agent integration problem. Quality over volume.
- Sub-vertical landing pages expand to 3–4 sectors (driven by matching case studies).
- Domain hunt for graduation begins quietly — `orchestra` derivatives evaluated and a preferred standalone domain shortlisted.

**Exit criteria**

- `@orchestra/mcp-schema` published with a runnable example against at least one production-shape schema.
- MCP extension proposal acknowledged by the upstream working group, regardless of acceptance.
- At least four whitepapers / pattern posts published.

---

## Phase 4 — Graduation and standards engagement (9+ months · Feb 2027 onward)

**Goal:** Migrate Orchestra to a standalone identity when the Hyperdrift lineage stops being load-bearing; engage formal standards bodies where adoption justifies it.

### Graduation triggers (migrate when ≥ 2 of 3 are true)

1. **≥ 3 paid client case studies live** on `ai.hyperdrift.io` — the studio portfolio is no longer required for trust.
2. **Orchestra revenue exceeds the combined growth investment** in Hyperdrift's product portfolio.
3. **Bringing on a partner, contractor team, or considering a spin-out / sale** — operational structure benefits from a clean brand boundary.

### Migration deliverables

- Acquire and configure the standalone domain.
- 301 redirects from `ai.hyperdrift.io/*` to the new domain.
- Brand attribution shifts: Hyperdrift moves to a footer credit (*"founded by the team behind Hyperdrift"*).
- npm scope migrated from `@orchestra/*` to the standalone domain's scope if needed.
- Cross-link policy updated on `hyperdrift.io`.

### Standards engagement

- Engage Linux Foundation AI & Data working groups where Orchestra's OSS adoption is real.
- Pursue NIST AI RMF alignment and ISO/IEC 42001 alignment for the `@orchestra/audit` library (regulated verticals).
- Continue MCP and A2A protocol contribution where adoption justifies it.

### Third OSS library

- **`@orchestra/audit`** — append-only, cryptographically verifiable agent action logs for regulated verticals (legal, healthcare, finance, insurance). Shipped after the first regulated-vertical engagement so the library reflects real compliance requirements, not speculation.

---

## Cross-cutting tracks

These do not belong to a single phase — they run continuously from Phase 1 onward.

### Sub-vertical expansion engine

Each completed engagement seeds a sub-vertical landing page tied to an ad group. Pages are indexed for SEO, not in main nav. Sectors in priority order:

| Sub-vertical | Why attractive |
|---|---|
| Construction SaaS | Document-heavy, low AI density, large mid-market |
| Field service SaaS | Scheduling / dispatch + ops content for AI |
| Legal ops SaaS (in-house, not law firm software) | Doc workflows, less crowded than legaltech |
| Dental / specialty healthcare practice software | Boring-lucrative, low AI presence |
| Logistics & freight SaaS | Ops density, AI-curious, decent budgets |
| Real estate ops SaaS (CRE, property mgmt) | Document chaos, valuation models |
| Manufacturing / industrial SaaS | ERP-tied, demand forecasting, inspection |
| Accounting / bookkeeping SaaS | Document-heavy, repetitive workflows |
| Insurance brokerage SaaS | Specialty lines especially under-served |

### Measurement

**MVP posture: no instrumentation noise.** No PostHog, no GA, no SDKs in the MVP. Measurement is added only when the signal justifies it.

When measurement does come in (Phase 2+), it stays minimal:

- Server-side request log (route hit, referrer, timestamp) — no client SDK.
- Contact-form submit count (already captured by the API route).
- Cross-property navigation tracked via referrer headers, not third-party scripts.

We will resist the temptation to wire full funnel analytics until there is a real funnel. The case-study → article → engagement loop is the engine; metrics describe it, they do not drive it.

### What we will not do at any phase

- Public pricing on bespoke service work.
- Anti-competitor framing.
- Build a general-purpose agent framework that competes with LangGraph / CrewAI / Mastra.
- Sub-vertical landing page without a matching case study.
- OSS library released without lived engagement learnings behind it.
- Engagements outside ICP because the budget is tempting.
