# UI and accessibility series

Created 1 October 2026. Six complete editorial drafts, unpublished, based on Orchestra main `73e7cee604a0a4a4e1aacced54a8fc06e9b10f6c`. Existing published content remains intact.

## Canonical content and preview

Article bodies: `content/articles/{is-ui-holding-us-back,web-accessibility-can-people-finish,webmcp-actions-on-the-page,hands-free-app-control,voice-through-mcp,future-ui-keep-your-place}.md`.

Titles, summaries and publication state: `src/data/articles.json`. Figure descriptions: `src/data/ui-accessibility-figures.json`. Reviewed source summaries: `src/lib/article-source-notes.ts`.

Run `npm run dev -- --port 3116`; open `/articles/ui-accessibility`. Development reveals drafts and sets noindex. Each draft has `publishedAt: null`; production visibility, feeds and sitemap continue to respect publication state. The series index enters the sitemap when a series article is published.

## Visuals and media

Six visual concepts, including a five-route selector in the lead article. Ten desktop SVG/PNG pairs and ten mobile SVG compositions live in `public/articles/ui-accessibility/`. All have text equivalents, source explanations and labels distinguishing conceptual routes from the WebAIM scan. The five paths coexist; their geometry makes no performance claim.

Regenerate SVGs with `python3 docs/editorial/ui-accessibility-series/create-figures.py` from the app root, then render desktop PNGs using the existing Sharp dependency. Regenerate header meshes with `node docs/editorial/databricks-series/generate-article-mesh.cjs <slug> ...` for only the affected slugs.

The hands-free article reuses the existing Cargo recording. Its poster is an unaltered frame from take 10. The companion article’s `media.transcript` in `src/data/articles.json` was transcribed from that take's retained conversation log, starting with the opening interruption; the initial interrupted utterance is described rather than presented as complete spoken dialogue. Spoken analytics belong to the saved briefing, not the current fleet. This is not a new run or participant study.

## Reading and discovery

Source-note controls open an editorial summary without leaving the article; ordinary links and an explicitly labelled new-tab original remain available. Escape dismisses the native popover and returns focus. Related article notes derive from visible catalogue summaries. Figures and explanations remain available without animation; the selector has a full text fallback without JavaScript.

Search titles, descriptions, article schema, canonical routes, internal links and share cards use the existing article system. No FAQ schema or invented answers were added. The reference index describes the method, author responsibility, current evidence and review triggers.

## Verification and limits

Local desktop/mobile preview review covers reading layouts, the five route selections, source-note open/close and Escape focus, figure exports and the described recording dialogue. The mobile review exposed a long-CTA overflow in the existing reading bar; wrapping now keeps its controls usable. This is editorial preview validation, not an accessibility conformance audit or a completed release gate.

Release checks, founder review of final copy/media, live readiness and indexing submission belong to publication. No production deployment, external announcement, participant recruitment or new voice/MCP experiment was performed.

The workspace `docs/editorial/ui-accessibility-series/` retains the approved direction, source register, editorial appraisal, proposed POCs and recurring-maintenance record. The living tone reference is `meta/skills/hyperdrift-blog/references/orchestra-voice.md` in that workspace. Correct the app's canonical content; do not create another prose copy to maintain.
