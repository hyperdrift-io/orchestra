import type { ReactElement } from 'react';
import { mcpEnquiryHref } from '@/lib/proof';

interface NextRoleProofProps { catalogue: boolean }

export function NextRoleProof({ catalogue }: NextRoleProofProps): ReactElement {
  return <>
    <figure data-mcp-proof>
      <p>Someone asks their assistant</p>
      <blockquote>“Check this CV against the role.”</blockquote>
      <p>NextRole’s score_cv tool returned</p>
      <samp>“The 12s to 3s PostgreSQL query bullet is a concrete, relevant result that evidences query optimisation.”</samp>
      <figcaption>Response excerpt · live MCP check, 4 October 2026 · fictional CV and job. <a href="/proof/nextrole-mcp-2026-10-04.json">Inspect the inputs and result ↗</a></figcaption>
    </figure>
    {catalogue && <div data-mcp-offer>
      <p>For your product</p>
      <h4>Let customers bring you into their conversation.</h4>
      <p>If your product already solves a useful problem, we can make one valuable workflow available to agents through MCP. Your website, customer relationship and commercial model remain yours.</p>
      <p>We agree the workflow and permissions, connect it to your existing product, and check that someone can complete the task from a compatible assistant. That gives you a working integration, connection instructions and evidence of what actually ran.</p>
      <p>Judge the result by useful task completion and customers coming back. A directory listing is only a way in.</p>
      <a href={mcpEnquiryHref} data-offer="mcp">Discuss your product →</a>
      <details>
        <summary>Connect to NextRole’s MCP</summary>
        <p>In an assistant that supports remote MCP servers, add this URL using Streamable HTTP:</p>
        <pre><code>https://nextrole.site/api/mcp</code></pre>
        <p>No NextRole API key is required. Start with a synthetic CV and ask the assistant to use <code>ats_lint</code>. Availability and usage limits apply. The assistant’s connection support and its own permissions still apply.</p>
        <p><a href="https://github.com/hyperdrift-io/nextrole-mcp#connect">Connection guide and tool reference ↗</a></p>
        <p>This is our own commercial product, not a commissioned client result. Tool availability does not establish repeat use, revenue or an employment outcome.</p>
        <p>The live check covered CV linting and role scoring; the other three tools were listed but not exercised. The scoring response currently labels its 1–10 result as /100 in text. The excerpt above uses the written feedback only; the full record preserves that issue.</p>
      </details>
    </div>}
  </>;
}
