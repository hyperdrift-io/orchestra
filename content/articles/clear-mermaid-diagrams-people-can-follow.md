Mermaid made diagrams easy to write, keep in version control and generate in a chat. We want those diagrams to be just as easy to read. Clear Mermaid is our browser reader for a supported subset of Mermaid flowcharts, built around following a connection, reading a condition and finding your place.

The starting problem was familiar: a diagram rendered successfully, yet its labels were too small, its branches hard to follow or its layout wasteful. Changing the theme helped the presentation. Reading the diagram needed work on layout, connections and interaction together.

## Keep the language people already use

We compared seven difficult flowcharts through eight rounds: wide branching, long questions, nested groups, a recovery path, shared dependencies, request and response, and cycles. We rendered the same sources with Mermaid, Beautiful Mermaid and our reader, then revised the reader against the cases where it lost clarity.

[Beautiful Mermaid](https://github.com/lukilabs/beautiful-mermaid) gave us a useful parser, restrained presentation and CSS integration. Its compact branching often worked better than our early layouts. We abandoned a rule that stacked every branch vertically. A horizontal flow can make a question and its outcomes much easier to follow. The source direction and the available space matter.

The current reader combines those lessons in one rendering approach. Named answers connect directly to their routes. Neutral connectors keep attention on the flow. Groups have clear titles and boundaries. A complete overview helps readers find their place; readable-size navigation lets them inspect detail.

{{visual:primary}}

This capture shows the long-label example. The incomplete branch returns to the original question after asking for missing information. The labels and arrow direction carry that meaning. Colours support the distinction without carrying it alone.

## A browser can do more than shrink a picture

Clear Mermaid uses HTML for text and controls, CSS for appearance and SVG for routes. That gives us normal browser text layout, keyboard focus, scrolling and native popovers. A reader can select a step, explore its connections, search for a name and return to the previous selection. The reading view exposes relationships as text.

CSS helps a diagram belong in its document. It cannot decide which edges exist or whether an arrow has the right direction. We compare the parsed graph with Mermaid before drawing it and reject disagreements. A prettier diagram that changes the meaning is a worse diagram.

The same distinction matters for accessibility. [Mermaid already supports accessible titles and descriptions](https://mermaid.js.org/config/accessibility.html). We want people to inspect the relationships themselves. [WCAG's use-of-colour criterion](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) calls for another way to convey information represented by colour. Text, boundaries, controls and a structured reading view each do part of that work.

## What we have proved so far

Our founder preferred the consolidated reader in the final comparison. That is useful product feedback from our own review, rather than an independent comprehension study. The local checks cover graph and arrow preservation, docking, overlap, keyboard navigation, narrow-screen reflow, contrast and automated accessibility scans. They do not establish accessibility conformance. Screen-reader testing, browser and text zoom, larger graphs and reading trials with other people remain necessary.

Compatibility is deliberately bounded. The prototype handles a checked flowchart subset; it does not support every Mermaid diagram family or every flowchart feature. It rejects unsupported input to preserve meaning. We have extracted a shared package and switched two HD blog diagrams to it in local preview. Public deployment, distribution and an MCP integration remain ahead.

## Share the improvement and the evidence

Our direction is a free renderer, with its own site for using and installing it and an Orchestra article explaining the work. MCP should make the same reader available from a conversation. That is the plan; this prototype is not yet a published package or connector.

This begins a series about Orchestra's work with open source and shared standards. We will show the problem, the existing work we relied on, the change we tested and what happened in review. Some changes may belong upstream. Others may remain small integrations. The useful result is work people can reuse and judge for themselves.
