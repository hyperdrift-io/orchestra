# Orchestra: open source and better standards

Requested by Yann on 30 October 2026. Direction: show useful contributions and reusable improvements, beginning with Clear Mermaid and the recovered DSPy work. This is an editorial sequence in HD's existing release calendar, not a new campaign, task board or publishing clock.

## Scheduled review-held slots

| London time | Article | Copy and evidence |
|---|---|---|
| 5 November 2026, 09:00 | [Clear Mermaid: diagrams people can follow](../../../content/articles/clear-mermaid-diagrams-people-can-follow.md) | New complete draft. Seven flowchart cases and eight rounds; founder preference, local checks and limits. Live same-source comparison of decisions, retry paths and shared dependencies. |
| Held; YNOT lane owns timing | [DSPy: build AI programmes you can improve](../../../content/articles/dspy-programmes-you-can-improve.md) | Recovered existing introduction. Pinned 23 October source research and illustrative support workflow; no optimisation benchmark. |
| Held; no replacement date | [Helping agents pick up where they left off](../../../content/articles/dspy-reasoning-continuity.md) | Recovered and refreshed: seven checks on DSPy main 25162c4f, after #10713 merged. Provider-reference review remains dated 23 October. |
| Published 31 October 2026, 14:00 UTC, on the founder's "Publish and schedule" | [We got our first PR merged into OpenTelemetry](../../../content/articles/opentelemetry-genai-conversation-id.md) | Founder request, 30 October: the first merged upstream PR, in his own words, with the OSS flag. Facts read from the public PR, issue #522 and the reference reports at upstream main 6f98aef on 30 October. Three original visuals: an illustrative trace, the reference-library coverage and the review timeline. |

The OpenTelemetry #556 article is published; the other three keep `publishedAt: null`. Dates reserve an editorial slot; they never approve customer copy or cause production exposure. The existing HD calendar owns changes to these dates. If a gate is unmet, hold the article and record the revised slot. Do not backdate publication or treat a planned date as a live result. No social posts are approved by this request.

## What the series contributes

Each article should let a reader inspect a specific problem, reuse a concrete result and see whose work made it possible. Report upstream review and acceptance only when verified. Further articles need a changed implementation, substantive review or measured outcome; there is no quota.

Clear Mermaid develops Yann's original observation: diagrams as code should produce something easy for a person to read. It preserves the useful Mermaid language and credits Beautiful Mermaid's parser and layouts. The last prototype is one renderer, not a catalogue of variants. The intended free distribution, dedicated site and MCP integration are plans, not released capabilities. Source evidence is in the HD `apps/poc/mermaid-reader` README, `ITERATIONS.md`, and `evidence/trial-2026-10-24/`; the copied screenshot is `round8/labels-reader.png`. No global superiority, full Mermaid compatibility, WCAG conformance or GPU-performance claim is made.

DSPy reuses the existing drafts and assets from `codex/dspy-article-series` at f572a43; it does not create duplicate articles. The contribution continuation and exact fresh test receipt live in HD `docs/contributions/dspy-reasoning-continuity-10675/`. #10675 remains open, with GBX-Max1220's offered test work acknowledged; no collaboration or accepted patch is claimed. Cancellation #10656 remains parked. Yann must personally understand, run and submit the contribution under DSPy's current AI policy. No upstream message was sent.

## Review and release

1. Yann reviews the three linked articles and visuals. The Clear Mermaid argument is new; the two DSPy drafts retain their earlier voice review with a narrowly refreshed continuity result.
2. The HD diagrams were deployed on 2 November after Yann approved the preview. Both public article diagrams passed desktop/mobile checks. The draft now links the live integration; this does not approve article publication or establish independent adoption. Release evidence: HD `docs/releases/clear-mermaid-2026-11-02.md`.
3. Recheck upstream state, provider references and the supported parser subset at publication. Confirm public code/demo and distribution licence before adding install or try links. Do not invite installation of an unpublished package.
4. Preview desktop and mobile, image/text alternatives, source controls, social card and contextual enquiry. Verify the drafts remain out of production listings, feeds, sitemap and llms.txt.
5. After approved copy, set the real publication instant, release through Orchestra's normal command and read the page/metadata/assets back. Add verified outcomes to HD `meta/discovery/publications.json`; draft any promotion separately for review.

Source review: Mermaid accessibility docs, Beautiful Mermaid repository and W3C colour guidance read 30 October. Search demand, assistant citations, independent adoption and enquiry outcomes are unmeasured. The contextual invitation is to bring a diagram or agent handoff for review; no commercial terms are invented.

## Verification — 30 October 2026

`npm run test:ci`: 32 tests pass; typecheck passes. `npm run build`: production build passes. All three draft slugs are absent from the built article listing, sitemap, llms.txt, JSON feed and XML feed. They retain null publication dates.

Local preview at port 3189: all three articles return 200 at 1440px and 390px, declare noindex/nofollow, load their figure with alt text and have no horizontal page overflow. All three social-image routes return PNG/200. Exact observations: [preview receipt](preview-results-2026-10-30.json). The Clear Mermaid screenshot is recorded desktop evidence; the adjacent prose and expandable description explain its branches at phone size. It is not presented as an interactive reader.

Desktop/mobile screenshots inspected locally; no enquiry submitted and no production deployment. Copy review remains separate from these checks.

Independent editorial review by the coordinating agent, 30 October: argument follows Yann's observation, no inflated release or adoption claims. Removed a needless adverb; updated the local package/migration status from the coordinator's verified result. Founder copy review remains outstanding.

The contextual article invitation opens the existing enquiry dialog on mobile. No form was submitted.

## The OSS flag — 30 October 2026

Founder request: mark open-source articles on Orchestra. A catalogue entry's optional `oss` field (`project`, verified upstream `status`) shows the flag above the article's topic line, a compact flag on its card in the article list and an "Open source · <project>" label on its share card. It is set on the OpenTelemetry article only; the three drafts above can carry it once their upstream status is worth stating. Status words follow the earned-discovery distinctions: proposed, accepted, merged, released and adopted are different states.

## Reader correction — 2 November 2026

Yann rejected the continuity article's technical emphasis and unlinked identifiers. It now explains the reader's capability first, uses descriptive evidence links and keeps the offline result distinct from live model performance. The figure and catalogue copy follow the same register. An independent editorial read corrected save/reload wording and editor instructions.

The Clear Mermaid sequence is now comparison → visual editing → use from an AI assistant. `clear-mermaid-in-action` lets readers edit nodes, connect steps and export Mermaid source. The third piece must name an actually installable connector and its tested host limits. These drafts remain unpublished; the connector has separate explicit publication authority.

Root `meta/discovery/CALENDAR.md` owns timing. Its later YNOT direction superseded the old 12/19 November DSPy slots; this record now reflects that. No replacement dates or automatic publication are inferred. New Clear Mermaid follow-ups await copy review and a useful release order.

Keep exact revisions in linked evidence. Visible prose and captions should name what the reader can inspect; a bare hash or issue number is not an explanation. A comparison must give both renderers the same source and a usable viewport. Show the action that becomes easier, rather than making an unmeasured superiority claim.

## Verified previews and connector — 2 November 2026

- [Rewritten continuity article](http://127.0.0.1:3189/articles/dspy-reasoning-continuity): plain-language reader benefit, descriptive evidence links and a simpler handoff figure.
- [Same-source comparison](http://127.0.0.1:3189/articles/clear-mermaid-diagrams-people-can-follow): standard Mermaid and Clear Mermaid, three cases, equal 520px diagram viewports. A renderer toggle gives each enough width. Shadow DOM isolates the baseline from host styles.
- [Clear Mermaid in action](http://127.0.0.1:3189/articles/clear-mermaid-in-action): visual and keyboard node/connection editing, undo/reset and Mermaid export. Local example graphs only; no arbitrary source importer.
- [Clear Mermaid in your AI assistant](http://127.0.0.1:3189/articles/clear-mermaid-in-your-ai-assistant): the real [public connector release](https://github.com/hyperdrift-io/clear-mermaid/releases/tag/v0.1.0), installation and an actual output capture. This is local stdio MCP, not a hosted connector or an autonomous agent.

Connector publication was explicitly authorised. The public release's exact npx command passed MCP discovery, a tool call and browser rendering; no client-specific desktop UI installation is claimed. Article copy remains held. The release is distributed as a GitHub tarball, not through the npm registry.

Orchestra typecheck, 32 tests and production build passed. The draft slugs are excluded from built public listings, sitemap and feeds. Interactive checks cover all three graphs in both renderers, visible baseline labels, directional connections, visual and keyboard editing, undo/remove/reset, mobile edits, clipboard denial and exact source download. Comparison and editor axe scans have no violations; no page overflow or browser errors. These are bounded checks, not accessibility certification or independent comprehension measurements. [Interactive receipt](interactive-checks-2026-11-02.json) · [Public install receipt](connector-install-2026-11-02.json).

The independent editorial review corrected save/reload versus process restart, matched the sample's sign-in question and avoided claiming a model-led chat test from a protocol-client test. Original DSPy source evidence remains dated 30 October.

## Nested architecture and hosted connection follow-up

Yann asked for domains, nesting and a direct comparison that shows the reading benefit. In action now has 13 steps, six domains across three levels and 14 connections. The guided view starts inside Checkout; Show whole diagram returns to the full architecture. Basic Mermaid uses the same edited source, with its own zoom and a true overview. The differing starting views are labelled.

Readers can inspect a domain, move a service between existing domains, add steps and connections, and export the hierarchy. The three simpler examples remain. Checks cover both arrowheads on the payment exchange, node/edge/group parity, membership after edits, source export, desktop/mobile operation and zero automated accessibility findings. These checks do not measure comprehension gains. [Nested comparison receipt](nested-comparison-2026-11-02.json).

The AI article now explains a hosted connection by URL. The original screenshot remains explicitly attributed to the local connector; hosted endpoint and platform results are recorded separately below. The independent editorial read removed implementation vocabulary and a repeated benefit paragraph. All articles remain unpublished drafts.
