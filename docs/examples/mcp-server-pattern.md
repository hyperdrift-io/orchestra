---
title: "MCP usage pattern: exposing a vertical SaaS agent service over MCP"
companion-to: ../whitepapers/2026-multi-tenant-agent-architecture.md
status: Draft v0.1
---

# MCP usage pattern

A worked example of the architecture described in *[Multi-Tenant Agent Architecture: A Reference Specification](../whitepapers/2026-multi-tenant-agent-architecture.md)*, focused on the MCP transport.

The point of this example is not to demonstrate MCP — that is well covered by [Anthropic's docs](https://modelcontextprotocol.io). The point is to show how the multi-tenancy patterns from the whitepaper survive the move from an in-product chat surface to an MCP surface *without changing anything in the agent service itself*.

## The scenario

**Acme Construction Cloud** is a fictional vertical SaaS used by mid-sized general contractors. It stores projects, drawings, RFIs, submittals, and change orders. Each customer is a tenant; each tenant has dozens of users (project managers, superintendents, estimators).

Acme already has an agent service deployed — Orchestra-shaped, multi-tenant, audit-ready, model-neutral. The in-product chat surface uses it. Their customers now ask: *"Can I query my Acme data from Claude Desktop?"*

Building a new UI for that would be the wrong answer. Exposing the existing agent service over MCP is the right one.

## What the customer experiences

1. The Acme tenant admin opens *Settings → Integrations* in the Acme product, clicks **Generate Claude Desktop key**, and gets back `acme_mcp_live_…`.
2. They paste it into Claude Desktop's MCP configuration:

   ```json
   {
     "mcpServers": {
       "acme": {
         "url": "https://api.acme.cloud/mcp",
         "headers": {
           "Authorization": "Bearer acme_mcp_live_xxx"
         }
       }
     }
   }
   ```

3. They restart Claude Desktop. Acme appears in the available-tools list.
4. They ask: *"Summarise the open RFIs across my active projects and flag any without a response in over a week."*
5. Claude orchestrates — calls Acme tools, gets per-tenant data, synthesises an answer. Multi-tenant isolation holds, every tool call is audit-logged on the Acme side, the tenant's monthly token budget ticks down by exactly what this run cost. The user never leaves Claude Desktop.

No UI was built. No mobile app shipped. The leverage of the existing agent service multiplied across every Claude-Desktop-using user in every Acme tenant.

## What changes in the agent service

Almost nothing. The architecture from the whitepaper holds. The MCP server is a *transport adapter* in front of the same agent service that already powers the in-product chat.

### 1. Auth-to-TenantContext at the MCP boundary

This is the only transport-specific piece. The MCP server intercepts the bearer token on each connection, looks it up, and constructs the `TenantContext`. Everything downstream is unchanged.

```typescript
// apps/agent-service/src/transports/mcp/server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';

import { lookupApiKey } from '@/auth/api-keys';
import { runAgent } from '@/agent';
import { resolveToolsForTenant } from '@/agent/tools';
import type { TenantContext } from '@/agent/context';

const app = express();

app.post('/mcp', async (req, res) => {
  // 1. Auth: resolve the API key to a TenantContext.
  const auth = req.header('authorization');
  const token = auth?.replace(/^Bearer\s+/, '');
  if (!token) return res.status(401).json({ error: 'missing token' });

  const ctx = await lookupApiKey(token);
  if (!ctx) return res.status(401).json({ error: 'invalid token' });

  // 2. Spin up an MCP server scoped to this tenant.
  const server = new Server(
    { name: 'acme-mcp', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  // 3. tools/list — return only the tools this tenant can use.
  const tools = await resolveToolsForTenant(ctx);
  server.setRequestHandler('tools/list', async () => ({
    tools: tools.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })),
  }));

  // 4. tools/call — execute with the tenant context.
  server.setRequestHandler('tools/call', async (req) => {
    const tool = tools.find((t) => t.name === req.params.name);
    if (!tool) throw new Error(`unknown tool: ${req.params.name}`);
    const result = await tool.execute(ctx, req.params.arguments ?? {});
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  });

  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(8787);
```

`lookupApiKey` is the only piece doing the transport-specific work — turning a bearer token into the `TenantContext` defined in §4 of the whitepaper. Everything after that is shared with the in-product UI flow.

### 2. Tool resolution is unchanged

`resolveToolsForTenant(ctx)` is exactly the per-run tool resolver from §5.2 of the whitepaper:

```typescript
// apps/agent-service/src/agent/tools.ts
import type { TenantContext } from '@/agent/context';

export interface AgentTool {
  name: string;
  description: string;
  inputSchema: object;
  execute: (ctx: TenantContext, args: Record<string, unknown>) => Promise<unknown>;
}

const summariseOpenRfis: AgentTool = {
  name: 'summarise_open_rfis',
  description: 'Summarise open RFIs across the tenant\'s active projects.',
  inputSchema: {
    type: 'object',
    properties: {
      olderThanDays: { type: 'integer', minimum: 0 },
    },
  },
  async execute(ctx, args) {
    // Authz check: this user, on this tenant, can read RFIs?
    await assertScope(ctx, 'rfis.read');

    // Budget check: pre-step ceiling.
    await assertBudget(ctx, { estimatedTokens: 4000, estimatedToolCalls: 1 });

    // Tenant-scoped query — no global state inspection.
    const rfis = await db
      .selectFrom('rfis')
      .where('tenant_id', '=', ctx.tenantId)
      .where('status', '=', 'open')
      .where('age_days', '>=', Number(args.olderThanDays ?? 0))
      .execute();

    // Audit emission — the agent service's standard sink.
    await audit.emit({
      runId: ctx.audit.runId,
      tenantId: ctx.tenantId,
      capability: 'summarise_open_rfis',
      result: { count: rfis.length },
    });

    return { count: rfis.length, rfis };
  },
};

export async function resolveToolsForTenant(ctx: TenantContext): Promise<AgentTool[]> {
  const tools: AgentTool[] = [];
  if (ctx.scope.includes('rfis.read')) tools.push(summariseOpenRfis);
  // … other tools, each gated by scope and tenant feature flags.
  return tools;
}
```

Two things to notice:

1. **The tool function signature is `(ctx, args) => result`.** Identical to what the in-product chat uses. No MCP-specific shape leaks into the tool implementations.
2. **The tool itself enforces authz and budget.** The MCP transport never bypasses them. A prompt-injected agent that tries to call `summarise_open_rfis` for a tenant it does not belong to fails at the `assertScope` line, not at the transport.

### 3. tools/list is filtered per tenant

Notice the MCP server's `tools/list` only returns the tools `resolveToolsForTenant` produced. A tenant on a free plan never sees premium tools in the MCP capability list. This is the same scoping the in-product UI does — driven by the same `ctx.scope` and `ctx.features` carried in the `TenantContext`.

### 4. Audit and budget are unified across transports

Because the tool function lives in the agent service, the audit emission and budget enforcement are identical regardless of transport. A tenant whose users connect via Claude Desktop (MCP) and the Acme web UI (in-product chat) sees one merged audit log and one merged token-budget ledger. They are runs against the same service.

## What does *not* change

- The `TenantContext` schema (whitepaper §4).
- The per-axis architecture: memory partitioning, tool scoping, authz inside the tool binding, budget enforcement, audit emission (whitepaper §5).
- Recovery semantics — the `runId` is minted the same way; the checkpointer is the same; retry-safety is the same (whitepaper §6).

This is the architectural payoff. A second transport ships in a few hundred lines of glue code, not a rewrite.

## Common mistakes when adding MCP to a multi-tenant agent service

1. **Letting the MCP server hold tenant identity in process state.** The MCP server is long-lived; the connection is bound to one tenant; if the server caches "current tenant" outside the request scope you get cross-tenant leaks the moment a connection is shared. *Fix:* the `TenantContext` is constructed per request inside `app.post('/mcp', …)`, scoped to that request only.
2. **Exposing tools that bypass authz because "MCP is trusted".** MCP clients are not trusted just because they speak the protocol. Every tool still calls `assertScope` and `assertBudget` against the `ctx` — same as the UI flow.
3. **Returning unfiltered `tools/list`.** Tenants must only see tools they can use. `resolveToolsForTenant` is the gate; `tools/list` is its rendering. Skipping the filter does not only confuse users — it advertises capabilities that a prompt-injected agent might try to call.
4. **Sharing API keys per user instead of per tenant.** API keys can carry an enclosing tenant *and* a principal claim (the user who provisioned the key). Use both. Audit events should record the principal, not just the tenant.
5. **Forgetting cost ceilings on MCP connections.** A Claude Desktop user can fire a hundred tool calls in a session. Without per-run and per-tenant budgets, the bill arrives a month later. The pre-step ceiling check in `assertBudget` is non-negotiable.

## Where this fits in the Orchestra engagement

Orchestra ships agent services. Adding MCP is part of the service surface, not a separate engagement. Every Product Agent or Multi-Agent Orchestration package can expose its capabilities over MCP from the same backend, with the same multi-tenant guarantees.

For vertical SaaS companies whose customers include technically literate users (developers, ops teams, analysts), the MCP surface is increasingly the first reach. It is the cheapest channel to put your agent in front of users without building a new UI.

---

*Companion to [Multi-Tenant Agent Architecture: A Reference Specification](../whitepapers/2026-multi-tenant-agent-architecture.md). Patterns here are extracted from POC work; production engagements will surface refinements.*
