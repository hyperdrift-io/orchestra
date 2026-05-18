---
title: "Multi-Tenant Agent Architecture: A Reference Specification"
author: Yann VR (Orchestra AI)
date: 2026-05-18
status: Draft v0.1 — open for comment
---

# Multi-Tenant Agent Architecture: A Reference Specification

## Abstract

LLM-based agent frameworks have matured rapidly in 2025 — LangGraph, CrewAI, Mastra, the Claude and OpenAI Agent SDKs, and the Model Context Protocol have given developers a credible foundation for building agents that plan, use tools, and recover. Almost none of them, however, were designed for **multi-tenancy**: the shape of every production B2B SaaS, where a single application serves many isolated customer accounts that must never see each other's data, share each other's budgets, or be observable by anyone else's tooling.

This paper proposes a reference architecture and a small vocabulary for *multi-tenant agent systems* — agents embedded inside multi-tenant SaaS products. It defines what tenancy means for an agent, where the isolation boundaries belong, and which production concerns (cost, audit, recovery) must be tenant-scoped rather than process-global.

The goal is to publish a convention that vertical SaaS teams can adopt regardless of the agent framework they use, and that Orchestra AI's `@orchestra/multitenant` library will implement.

## 1. Why this paper exists

A common failure mode in 2025 was that agent demos worked on the developer's laptop, were shipped to staging with one test tenant, and then failed in unpredictable ways in production:

- A retrieval call from tenant A returned a chunk that belonged to tenant B because the embedding store was global.
- An agent's tool budget burned through a small customer's monthly quota in a single runaway loop because cost tracking was per-process, not per-tenant.
- A regulator asked who had triggered an agent action and on whose behalf, and the available logs could only point at the worker process.
- A free-tier tenant could invoke privileged tools intended for paying customers because tool registration was static at boot.

These failures share a single structural cause: the agent stack inherits the tenancy model of the framework it sits inside — and the frameworks default to single-tenant.

A multi-tenant agent architecture treats tenancy as a first-class concern from the first line of code, the same way a SaaS database does.

## 2. Definitions

For the rest of this paper:

- **Tenant**: an isolated customer account inside a SaaS application. The unit of billing, data ownership, and access control.
- **Principal**: the actor performing an action — usually a user within a tenant, sometimes a service account, sometimes the agent itself acting on behalf of a principal.
- **Agent run**: one execution of an agent flow, from initial prompt to final output (including tool calls and recoveries).
- **Tool**: a function the agent can invoke. Each tool has a *capability* — the abstract action it performs.
- **Tenant context**: a structured object carried alongside every agent run that names the tenant, principal, scope, budget, and audit metadata.

## 3. The five isolation axes

A multi-tenant agent run must be isolated along *five* distinct axes. Each axis has its own enforcement mechanism. Conflating them is where bugs live.

| Axis | What is isolated | Default failure mode if absent |
|---|---|---|
| **Memory** | Conversation state, scratch memory, embeddings | Cross-tenant context leak in retrieval |
| **Tools** | Which tools are exposed; which capabilities are scoped | Tenant invokes tools not licensed to them |
| **Authorisation** | Per-tool, per-resource permission checks | Agent acts as principal but bypasses RBAC |
| **Cost** | Token, tool-call, and external-API spend | Runaway loop drains one tenant's budget; or worse, charges the wrong tenant |
| **Audit** | Who, what, when, on whose behalf, with what result | Inability to answer a regulator or customer |

The architecture below treats each axis as an independent concern coordinated through one shared object: the **tenant context**.

## 4. The tenant context

Every agent run is associated with a tenant context: an immutable, structured value passed through every layer of the stack. The minimum schema:

```typescript
interface TenantContext {
  tenantId: string;            // SaaS-level tenant identifier
  principalId: string;         // user or service account inside the tenant
  principalKind: 'user' | 'service' | 'agent';
  scope: string[];             // capability scopes granted to this run
  budget: {
    tokenCeiling: number;        // hard cap, the run aborts if exceeded
    toolCallCeiling: number;
    walltimeCeilingMs: number;
    costCeilingMicrocents: number;
  };
  audit: {
    runId: string;             // unique per agent run
    correlationId?: string;    // request/trace id from upstream
    initiatedAt: string;       // ISO-8601
    initiator: 'user' | 'cron' | 'webhook' | 'agent';
  };
  features: Record<string, boolean>;   // per-tenant feature flags relevant to this run
}
```

This object is constructed at **the first point where auth has been resolved** — typically an HTTP route handler, but equally an MCP `call_tool` handler, a queue worker that pulled a job from a trusted queue, or a CLI command. From there it is passed through every subsequent call. The transport is irrelevant; what matters is that the agent layer never inspects global state for tenancy. **Tenancy travels with the work, not with the runtime.**

![Tenant context flow through the agent layer](/diagrams/tenant-context-flow.svg)

A concrete consequence: `tenantId` is sourced from authentication, not from where the request arrived. In a UI flow it derives from the session cookie or JWT (user → tenant FK). In an MCP flow it derives from the API key or OAuth bearer that authenticated the client to the MCP server. In a background-worker flow it derives from a service-account credential or a signed job payload. Different transports, same axis. A second identifier — call it `runId` (the `audit.runId` above) — answers a different question: *which execution?* It is minted at the start of each agent run and threads through tools and logs. The two are independent: one tenant has many runs; one run always belongs to exactly one tenant.

## 5. Per-axis architecture

### 5.1 Memory isolation

**Conversation memory** and **scratch memory** belong to the *agent run*; **long-lived retrieval stores** (vector databases, document indices) belong to the *tenant*.

The pattern:

- Vector stores partition by `tenantId`. Implementation depends on the vendor — pgvector with a `tenant_id` column and a row-level security policy; Pinecone with namespaces per tenant; Chroma with one collection per tenant.
- **Retrieval is never allowed to query across partitions.** A retrieval helper enforces this by reading `tenantId` from the tenant context and refusing if it is missing.
- Conversation history is stored keyed by `(tenantId, principalId, conversationId)`.
- Embeddings of customer data are recomputed when a tenant deletes the underlying data; soft deletion of vectors is insufficient.

Common bug pattern: a developer uses a default collection during local development, and the default leaks to production because the partition lookup falls back to it. Fix: refuse to start the agent layer if the partition resolver cannot derive a tenant-specific identifier.

### 5.2 Tool scoping

Static tool registration is the enemy of multi-tenancy. Tools must be resolved *per run* based on the tenant context.

A *tool capability* is the abstract action (`reports.generate`, `customer-data.read`). A *tool binding* is the concrete function that performs it for one tenant.

```typescript
interface ToolCapability {
  name: string;
  resolve(ctx: TenantContext): Promise<ToolBinding | null>;
}
```

`resolve` returns the concrete binding the agent can call for this run — or `null` if the tenant does not have the capability. The agent only ever sees the resolved bindings; capabilities the tenant cannot use are not exposed in the tool list passed to the model.

This eliminates a class of jailbreak attacks where a prompt-injected agent tries to call a tool it should not have access to.

### 5.3 Authorisation

Tool bindings perform authorisation *inside* the tool, not outside. The pattern is the same as REST endpoints: never trust the caller; check the resource against the principal.

For agent systems specifically, two anti-patterns to avoid:

- **Bypassing user RBAC because "the agent is trusted."** The agent acts on behalf of a principal. Its calls must respect the principal's permissions exactly.
- **Caching authorisation decisions across runs.** Tenant permissions change. Cache lifetime should be shorter than the typical agent run.

OpenFGA, Cerbos, Oso, or hand-rolled RBAC are all fine choices — what matters is that the *tool binding's first action* is an authorisation check against the tenant context.

### 5.4 Cost attribution and budget enforcement

Cost has two distinct concerns: **attribution** (who pays) and **enforcement** (when to stop).

**Attribution** must be per-run, recorded synchronously as costs are incurred, and stored on the tenant. Token usage from the LLM provider, tool-call counts, external API costs (web search, code execution, image generation), and walltime all roll up to the run.

**Enforcement** is a hard ceiling defined in the tenant context. The agent loop checks the running total before each tool call, model call, or planning step. If a ceiling is about to be breached, the run halts with a recoverable error rather than continuing into surprise overages.

Per-tenant quotas live one layer above per-run budgets. A tenant has a monthly token allowance; each run's ceiling is set from the remaining allowance. The architecture cleanly separates these two timescales.

Common bug pattern: cost tracking is global to the worker process, so a single tenant's runaway run blocks other tenants. Fix: per-run, per-tenant accounting with hard ceilings.

### 5.5 Audit

Every meaningful agent decision is an audit event:

- Run started: `(tenantId, principalId, runId, prompt-hash, correlationId)`.
- Tool invoked: `(runId, capability, arguments-redacted, result-hash, latencyMs, costMicrocents)`.
- Tool refused (authz denied): `(runId, capability, principalId, reason)`.
- Run completed: `(runId, outcome, tokensIn, tokensOut, toolCalls, walltimeMs, costMicrocents)`.

These events go to an append-only store. For regulated verticals (legal, healthcare, finance, insurance), the store should be cryptographically verifiable — a per-tenant Merkle log or a notarised append-only stream. Existing observability tools (Langfuse, Helicone, PostHog LLM analytics, OTel) are debugging-shaped, not compliance-shaped; for regulated tenants you need both.

## 6. Recovery and idempotency

Agent runs fail in ways that ordinary HTTP requests do not: an LLM stream is cut, a tool times out, a model refuses, a plan loops. Multi-tenant systems must contain these failures *to the tenant who triggered them* and recover predictably.

Principles:

- Every tool call must be *retry-safe*. Either the tool is idempotent (preferred — use idempotency keys derived from `(runId, stepId)`) or it is documented as one-shot and the agent loop is responsible for compensating actions on failure.
- The agent loop's state is checkpointed after each tool call, keyed by `runId`. Restarting the run resumes from the last checkpoint, not from scratch — and never from another run's checkpoint.
- Quotas and budgets reflect the work that was actually done, not the work that was retried. Bookkeeping must distinguish.

## 7. Adapters

The architecture above is framework-agnostic. The `@orchestra/multitenant` library provides adapters for the major agent frameworks:

- **LangGraph**: a `TenantAwareGraph` wrapper that injects the tenant context into every node, scopes the checkpointer per tenant, and enforces budget at the graph runner.
- **CrewAI**: middleware that resolves tool bindings per crew run and threads the tenant context through the crew's memory.
- **Mastra**: integration with the Mastra agent registry to resolve per-tenant tool sets and per-tenant memory adapters.
- **Claude Agent SDK / OpenAI Agents SDK**: tool wrappers that perform authorisation and cost accounting before delegating to the underlying tool, and stop-iteration helpers that respect tenant budgets.

The library is intentionally a *thin* layer — it adds the multi-tenant semantics without taking over orchestration, planning, or model selection.

## 8. Clients of the agent service

A useful re-framing of everything above: the agent layer is **a backend service**, not a feature embedded inside a particular UI. The clients that consume it are pluggable.

![Agent service as backend; clients as pluggable consumers](/diagrams/agent-service-clients.svg)

The agent service exposes its capabilities to:

- **In-product chat** — the SaaS product's own UI, where the agent lives next to the existing workflow.
- **MCP server** — Claude Desktop, Cursor, Goose, Claude Code and other Model Context Protocol clients connect over HTTP (or stdio for local servers) and call the tools as if they were native.
- **REST / gRPC API** — workers, integrations, third-party backends that need the same capabilities programmatically.
- **Workplace chat** — Slack / Discord / Teams bots that hand off requests to the agent service.
- **Background workers** — cron, webhooks, queues. No client at all in the conventional sense; the agent runs because an event told it to.

The same agent service serves all five. Tenancy comes from auth at the boundary, as discussed in §4. The agent layer never knows or cares about transport.

This has practical consequences:

- **Tools are defined once**, in the agent service. Each transport adapts them to its protocol surface (an MCP server lists them via `tools/list`; an HTTP API exposes them as routes; a Slack bot maps them to slash-commands), but the implementation is shared.
- **Auth resolution is the only transport-specific concern.** Every transport must implement an auth-to-`TenantContext` mapping at its boundary; the rest of the stack receives a resolved context regardless.
- **Audit and budget are unified.** A single tenant whose users hit the service via three transports simultaneously (UI, MCP, and a worker) sees one combined audit log and one combined cost ledger — because all three transports produce runs against the same agent service.
- **MCP is increasingly the leverage point.** A vertical SaaS that exposes its agent service via MCP reaches every Claude Desktop, Cursor and Goose user *immediately* — no UI build required. For an OSS-aware engineering organisation, MCP is the cheapest way to put an agent in front of a knowledge-worker audience.

A worked MCP example following these patterns lives at [`docs/examples/mcp-server-pattern.md`](../examples/mcp-server-pattern.md).

## 9. What this paper deliberately does not specify

- The internal mechanics of any specific agent framework.
- The choice of vector store, RBAC engine, or observability vendor.
- The model selection policy (model-neutral by design).
- The shape of the LLM prompt itself.

These are out of scope because they vary per engagement. The architecture is the contract; the implementation is the engagement.

## 10. Open questions

1. **Cross-tenant agent collaboration.** Some products allow tenants to share workflows. How should the tenant context behave when an agent runs across a delegation boundary? Proposed: an explicit *delegation token* with both tenants named and a shared budget pool.
2. **Streaming and partial results.** Token streaming is now the norm; partial outputs are also subject to audit. The current spec covers complete runs; streaming is reserved for v0.2.
3. **Background and scheduled runs.** When an agent run is initiated by cron rather than a user, the principal is a service account. The audit shape is the same, but tenant context construction needs a deterministic source for `correlationId`.
4. **Multi-region tenancy.** Some SaaS products serve EU and US tenants from different regions for data-residency reasons. The architecture is silent on regionalisation; this is intentional for v0.1 — the patterns work per region.

## 11. Status and next steps

This is **draft v0.1**, open for comment. The Orchestra AI engineering practice will refine it based on:

- Lessons from the first 2–3 paid engagements (the patterns above are extracted from POC work; production engagements will surface gaps).
- Feedback from the MCP working group (Anthropic) on whether parts of this spec should be proposed as MCP extensions.
- Adopter feedback once `@orchestra/multitenant` is published.

A v0.2 is targeted for late 2026, addressing the open questions above and including reference adapters for at least two agent frameworks with working code.

---

*Orchestra AI is a Hyperdrift studio. We build agent orchestration into vertical SaaS products — multi-tenant, audit-ready, model-neutral. Contact us at [ai.hyperdrift.io](https://ai.hyperdrift.io).*
