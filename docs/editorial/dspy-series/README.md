# DSPy series — editorial drafts, 23 October 2026

Two complete article drafts connect practical DSPy adoption to reasoning continuity. Both have `publishedAt: null`; production discovery excludes them. No upstream contribution, collaboration, acceptance, production release, benchmark or customer outcome is claimed.

## Readers and useful decisions

1. **DSPy: build AI programmes you can improve** — When should a team try DSPy? Begin with a repeatable task, representative examples, a metric and a baseline. Explain signatures, modules and optimisation; place experimental RLM in context. Illustrative support workflow, not a client case.
2. **Helping agents pick up where they left off** — What should survive between model calls and model changes? Preserve original messages, prepare requests against provider rules and maintain a portable work record. Explain issue #10675 and credit GBX-Max1220's offered tests. Our local opt-in example passes seven offline checks through two public Predict calls and History JSON, including provider-writer output. It uses private hooks; the 30 October refresh passes on landed main 25162c4f and establishes no live provider compatibility or upstream acceptance.
3. **Future contribution experience** — Write only when there is a concrete result: submitted work, substantive human review, accepted change or a useful reason to change course. Credit actual authorship and testing separately. Do not pre-write a success story.

The first two drafts cross-link. They reuse existing tags, mesh rendering, sharing and source controls. Two static editable SVG diagrams use the existing ArticleVisualization wrapper through a small editorial-image option; no new graphics runtime. The existing dedicated `ui-accessibility` series route is unchanged. This record holds the series relationship.

## Evidence and refresh

Research date: 22–23 October 2026. Before publication, refresh issue comments and ownership, migration PRs and provider documentation. A new contributor implementation or merged migration changes the proposed boundary. Refresh and rerun the bounded public-API probe before publication; add provider validation before claiming live compatibility.

- DSPy main inspected in the research: `98830391be6fbf81523757271432bba1c6c4eb80`
- Initial adapter migration #10713 research: `a55eab1618fbee14033e79af3d41e651a80ee812`
- Completed local example: #10713 `96fc9828a2cff2e7fa018372c4c840afa4e4c8a1`; seven tests independently rerun by the coordinating agent (7 passed in 0.65s), no provider calls
- Example and exact provenance: OSS workspace `work/dspy-reasoning-continuity-prototype/README.md`, `provenance.json`, `test_continuity.py` and `result.json`
- Pydantic AI inspected: `a549fd1a368a8677090e10b504d7cb5c12b2dd4a`
- Source material: OSS workspace `reports/DSPy reasoning continuity contribution.md` and `research_notes/DSPy reasoning continuity contribution/`
- Current guide content was also read from the locally acquired DSPy source; source links remain pinned to the research revision
- Public documentation web fetch for DSPy's current docs returned redirect pages; primary repository documentation supplies the technical reference
- Search-intent hypothesis: developers considering DSPy and engineers preserving agent work across calls. Search volume and reader demand have not been measured

All material claims carry primary source links. The existing article experience renders unframable sources as text citations; the visual's expandable source list retains links. Framing has not been individually proven for provider docs, so previews conservatively remain unavailable.

## Voice and authority

Applied `yann-voice`, the requested `write-like-me` workflow and explicit founder direction: direct benefit first, short connected paragraphs, positive framing, Orchestra **we**, ownership credited precisely. Write Like Me retrieval tools are unavailable; no retrieved style match is claimed. No saved writing samples or personal-memory edits.

Yann reviews the copy and publishes. The article does not introduce a new offering, partnership, outcome guarantee or pricing.

## Relevant next steps and distribution drafts

Intro invitation: bring a repeatable AI task and examples of a useful result; discuss the first measurable improvement.

Continuity invitation: bring a workflow that must resume after a pause or model change; inspect what has to survive.

Possible founder post, for separate review: “We’ve been looking into DSPy and how to preserve useful work between model calls. The first piece explains where signatures, metrics and optimisation help. The second follows reasoning continuity through the saved record and the next request.” Add live links only after publication.

Possible email introduction, for separate drafting through email-yann: explain the relevant workflow, offer the corresponding article and ask one real question. No email is prepared or sent here.

Publication, sitemap submission, announcements and distribution remain outside this draft task. Qualified conversations, reader feedback and task outcomes would be useful measures; views and a merge alone would not establish growth.

## Verification

Production build and typecheck pass. The build required network permission for the existing Google Fonts dependency. Generated production llms.txt, sitemap, RSS and JSON feeds and the prerender manifest exclude both draft slugs. The build-only tsconfig addition was removed after validation. Twelve existing article-search, tags and discovery-feed tests pass with the test cache disabled (shared node_modules is read-only). Both local preview pages expose canonical URLs, noindex, the editorial-preview badge, Article and BreadcrumbList structured data, their diagram and the share panel. The development sitemap excludes the drafts. Development llms.txt intentionally follows visibleArticles and includes previews; production uses publishedArticles through that function unless ARTICLE_PREVIEW is enabled. Do not enable ARTICLE_PREVIEW in production. The coordinating agent read both rendered article pages and visually inspected the introduction header and continuity diagram at desktop width; screenshots are saved alongside this record. No mobile visual review is claimed.

Preview: `npm run dev -- --hostname 127.0.0.1 --port 3119` from this checkout. Local links: `/articles/dspy-programmes-you-can-improve` and `/articles/dspy-reasoning-continuity`.

Both explanatory diagrams have editable SVG sources and PNG downloads. The coordinating agent captured desktop preview screenshots in this folder.

## Revived 30 October 2026

Recovered these existing drafts and assets onto Orchestra main e17f70f. Continuity example rerun unchanged on DSPy main 25162c4f: seven offline checks pass, after #10713 merged on 28 October. The source and result references now reflect that revision. The introduction retains its explicitly pinned 23 October research; provider-reference refresh remains a publication gate. Both remain unpublished. Dates, next actions and release review are owned by the [OSS and better standards series](../oss-better-standards/README.md).
