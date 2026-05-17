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

- Create remote: `gh repo create hyperdrift-io/orchestra --private --source apps/orchestra --push`.
- Vercel project + env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`).
- DNS records for `ai.hyperdrift.io`.
- Smoke test: every section, contact form end-to-end, PostHog `$pageview` events.
- `make check-launch-readiness app=orchestra` (register orchestra in infra makefile if not present).
- Push hyper-drift updates to its existing remote.

**Out of Phase 1 scope (deferred)**

- OSS libraries, sub-vertical landing pages, whitepapers, standalone domain.

---

## Phase 2 — First engagements + OSS extraction (months 1–4 · ~Jun → Sep 2026)

**Goal:** Generate cash flow, accumulate paid case studies, extract the first OSS library from real engagement learnings.

**Deliverables**

- 2–3 paid client engagements taken and shipped.
- Each engagement documented as a case study card on `ai.hyperdrift.io` (problem · method · stack · outcome).
- First OSS library shipped: **`@orchestra/multitenant`** — multi-tenant agent patterns (per-tenant memory and embedding isolation, tool scoping, cost attribution, audit trails, adapters for LangGraph / CrewAI / Claude Agent SDK / OpenAI Agents SDK).
- First whitepaper: *"Multi-tenant agent architecture: a reference specification."* Published on the company blog and as an arXiv preprint if the rigour holds up.
- First sub-vertical landing page (e.g. `/for-construction-saas`) — published only once a matching case study exists. Indexed for SEO, not in main nav, serves as the ad-group destination.
- PostHog dashboards tracking the funnel: visit → case study → packages → contact submit.

**Exit criteria**

- ≥ 2 paid client case studies live on `ai.hyperdrift.io`.
- `@orchestra/multitenant` has a runnable reference integration, a documented README, and zero known correctness bugs.
- The reference-spec whitepaper is published and linked from the site.

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

PostHog from day one, across both `ai.hyperdrift.io` and `hyperdrift.io`:

- Page view + section scroll depth.
- CTA clicks (per CTA).
- Case-study engagement (open / scroll / demo interaction).
- Form submit success.
- Cross-property navigation (`hyperdrift.io` ↔ `ai.hyperdrift.io`).
- Phase 2 onward: OSS repo star → docs view → contact funnel.

### What we will not do at any phase

- Public pricing on bespoke service work.
- Anti-competitor framing.
- Build a general-purpose agent framework that competes with LangGraph / CrewAI / Mastra.
- Sub-vertical landing page without a matching case study.
- OSS library released without lived engagement learnings behind it.
- Engagements outside ICP because the budget is tempting.
