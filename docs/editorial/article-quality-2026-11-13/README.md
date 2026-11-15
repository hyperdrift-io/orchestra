# Linked article corrections — 13 November 2026

Preview candidate based on `d289b62c59750bb8fb134c89144d211c4395e625`, not released. Five articles promoted on the company LinkedIn feed now have subject-specific opening diagrams and matching Open Graph artwork through the existing `heroImage` implementation. Lakebase also changes “I would start” to “We would start” to preserve Orchestra's author register. Original publication dates remain; the actual artwork revision time is recorded in `updatedAt`.

The diagrams condense each article's existing explanation: conversation-ID propagation with a remote agent's own ID; a button and declared tool reaching one application action; checking and correction across interface choices; stored run state surviving a disconnected browser; related transaction records versus a case document with payment outside both. These are conceptual illustrations, not screenshots, benchmarks or executed customer work. Full qualifications and primary sources remain in the article and its detailed figure. Colour supplements labels and geometry.

Editable SVGs and PNG exports are under `public/articles/editorial-2026-11-13/`. Regenerate them with `node docs/editorial/article-quality-2026-11-13/render-heroes.cjs` using the existing installed Sharp dependency. That script updates only these five `heroImage` values. The bottom band stays clear for the existing social-card headline. No new renderer, stylesheet or dependency is needed.

All five full article bodies passed the evidence/economy read after the Lakebase register correction. The full 28-article review and LinkedIn candidates are retained with the Hyperdrift candidate in `docs/editorial/content-quality-2026-11-13.md` and its Orchestra/native addenda.

The first renderer/standard inspection used the stale primary checkout after fetching; this was caught before any edits. The isolated current-main checkout already has the 13 November hero and sharing contract, which supersedes its earlier globe requirement for revised articles. This candidate reuses that implementation and leaves legacy artwork files intact.

Local preview: `http://127.0.0.1:3044/articles/<slug>`. All five pages and actual Open Graph image endpoints returned 200. Their HTML and 1200 × 630 social exports are saved under `.local/editorial-review/`. Export inspection caught headline collisions in the first draft; labels were repositioned and the redundant footer removed. Typecheck and all 82 existing tests passed. The lead inspected all five final Open Graph exports, all five routes at 390px and the OpenTelemetry desktop page: legible, no collisions or horizontal overflow, heroes loaded with meaningful alt text. A Lakebase reload confirmed the 13 November revision date. Accepted for founder preview; no publication approval follows from these checks. No external message, submission or publication was made.

## Catalogue and article index

The production audit found 16 published catalogue articles, each reachable. The earlier preview had six dedicated heroes. This revision adds artwork for the other ten and five drafts, using editable diagrams based on the articles' existing examples. Each catalogue entry now uses the same artwork for its opening, index thumbnail and social card. Search and topic views use the same thumbnails. The separate launch log keeps its trailer poster and archive link.

The production build rendered 16 index images and excluded drafts. The preview rendered all 21. Browser checks covered search, the Databases topic and a 390px layout without horizontal overflow. All 21 article pages rendered their configured hero and returned a matching, versioned 1200 × 630 PNG for Open Graph and Twitter. The share-card sheet and browser screenshot are in `.local/editorial-review/`. Typecheck, all 82 tests and the production build passed.

The candidate remains available at http://127.0.0.1:3044/articles for Yann's review before deployment.

## Vertex artwork study

Yann rejected the diagram covers and asked for a recognisable image style using vertices, starting with *Clear Mermaid in your AI assistant*. The preview now uses one brass structure as the editorial subject. The index and share card use the same artwork. The diagram covers were taken out of the candidate and archived locally. Further covers wait for the visual direction to be chosen.

The selected image is candidate 02 from a two-image Recraft V4.1 Pro request, using the expressive 2K raster model, a wide composition and Orchestra’s ink, brass and warm cream palette. Recraft returned 2688 × 1536. The site uses a 1600 × 840 JPEG with a top-aligned crop. The request used 420 existing API units. The prompt, original outputs and API metadata are in `.local/editorial-review/clear-mermaid-vertex/`. The pilot article remains a draft.

## Homepage vertex direction

Yann clarified that “vertex” refers to the homepage WebGL animation and rejected the photographic brass study. The draft now previews a route through a vertex cloud, using the homepage's fine edges, amber and ivory points, and a mint selection. The same image supplies its index thumbnail and share card. The photograph and diagram covers are superseded.

Three candidates are at http://127.0.0.1:3045/. A puts one selected route through the network. B frames an existing capture of the real Clear Mermaid viewer; it makes the capability visible but needs more space. C uses an illustrated Recraft V4.1 Pro generation with an explicit digital art brief, ink and vertex colours. Its denser mesh gives the selected route less separation. The Recraft request used 210 existing units. Original output, prompt, metadata, A/B rendering source and screenshots are under `.local/editorial-review/webgl-art/`.

Recommend A for recognition in feeds and on the index, with B's real product evidence available in the article. Keep an identifiable visual subject, clear headline and genuine proof of what was built. Google recommends relevant, high-quality images for image discovery. Compare impressions and click-through by channel after release, then look at demo use and enquiries for signs of reader interest. Traffic and confidence have yet to be measured for these candidates. The article remains a draft while the direction is reviewed.

[Google Search image guidance](https://developers.google.com/search/docs/appearance/google-images)

## Approved direction and first batch

Yann approved C. The draft of *Clear Mermaid in your AI assistant* uses that exact image. Four more covers are ready for review: WebMCP actions, OpenTelemetry conversation IDs, LangChain/AppKit streaming and agent-operated UI. Each cover uses the Orchestra vertex mesh and a distinct shape from its article. The originals, prompts and generation settings are in `.local/editorial-review/vertex-batch/`. The batch used Recraft V4.1 Pro at 16:9 with flexible matching to C (style `16b85319-39fa-4edc-a28a-eebde2d9f635`). The four requests used 845 existing API units.

Article heroes are 120–216px high, with a crop near the top to keep the selected vertices visible. The index and series show artwork where assigned. Article breadcrumbs, lists and share cards drop the display numbers. The versioned 1200 × 630 share cards use a dark gradient behind the wordmark and headline.

The Clear Mermaid draft now includes seven original reading tasks from the 24 October lab with 21 captures across Mermaid 12.2.0, Beautiful Mermaid 1.1.3 and the Web Reader prototype, plus all seven original Mermaid sources. `public/articles/clear-mermaid/comparison-2026-10-24/manifest.json` records the settings and asset hashes. The comparison lives in the article, so it no longer depends on two other unpublished drafts.

Review the four new covers at http://127.0.0.1:3045/batch.html and the article at http://127.0.0.1:3044/articles/clear-mermaid-in-your-ai-assistant#compare-the-original-use-cases. The worktree is held for review. Production publication and existing LinkedIn cards have not changed in this round.

## New cover direction for review

Yann rejected the vertex batch in context. Start each cover with what the reader can do or understand after reading. Use ink, cream, brass and a restrained version of Orchestra’s Mesh Aperture to draw attention to the point that changes. Change the symbols and direction of the connections to fit the subject.

Clear Mermaid shows an assistant reply turning into a sign-in decision with two routes, one of which loops back. WebMCP shows a person’s click and an agent’s tool call reaching the same shortlist action. The two covers use the article examples and the same visual grammar. The selected studies are drawn directly from editable sources under `artwork/`. The Recraft V4.1 Pro Vector study, prompt and API metadata are retained under `.local/editorial-review/subject-led/`. Its routing needed redrawing to match the sign-in example. The five superseded covers are archived in the same directory and have been removed from the candidate.

The two new covers are on the article pages, index and versioned share cards in the local preview. Review both at http://127.0.0.1:3045/batch.html before applying the direction to more articles.

## OpenTelemetry and streaming covers

Yann asked for imagery that evokes the article’s idea. A single gold thread links torn paper fragments for OpenTelemetry, which is about finding the calls that belong to one conversation. A current that resumes beside an ivory marker represents recovering the same run after a disconnect in the LangChain vs Databricks AppKit article. The pair uses torn-paper texture, Orchestra’s ink, brass and cream, and an open circular form drawn from the Mesh Aperture. The previous diagrams are archived outside the candidate.

The two masters use Recraft V4.1 Pro in 16:9. The prompts, originals and settings are in `.local/editorial-review/evocative/`. Exports are 1600 × 840 JPEGs, reframed for the compact article hero. The streaming image has a dark fade behind the share-card wordmark. Both covers render on the index and article pages at 1440, 390 and 320 px. Both versioned share images return 1200 × 630 PNGs. [Local review](http://127.0.0.1:3045/next-covers.html)

## Four covers together

Clear Mermaid uses an unfolding sheet of cream paper to reveal a brass route. For WebMCP, charcoal and brass meet in a single ink impression, echoing the person and agent working on the same page. These replace the two diagram covers. The four illustrations share torn paper, ink, brass and cream. The aperture appears as an opening in the fold, a shared print, a bend in the thread or a curve beside the current.

Recraft V4.1 Pro supplied the 16:9 masters. For WebMCP, flexible style `fd881942-93ed-4ee7-9d1f-77d32eb30d10` references the OpenTelemetry and streaming masters. The Clear Mermaid fold was generated without a style reference to give it a distinct silhouette. The originals, prompts, settings and archived diagrams are in `.local/editorial-review/evocative/`.

All four covers were checked on the local article index and article pages at 1440, 390 and 320 px. The versioned share images return 1200 × 630 PNGs. The [local review](http://127.0.0.1:3045/four-covers.html) places the four covers together and links to the index, mobile captures and article pages. The set is ready for founder review in preview.

## Two Recraft presets

Yann retained the Orchestra palette and rejected the torn-paper direction. This round explores two named Recraft presets on Clear Mermaid and WebMCP. The [Recraft API catalogue](https://external.api.recraft.ai/doc/ui/?spec=external-api.yaml) supplied the preset IDs. **Neon Calm** (`1feb869d-edcc-4b6b-b6d0-413e9560f2dd`, V3 raster) puts the reader inside an illuminated walkway. **Editorial** (`59133ee8-2fc5-4225-bcd9-6934d21bcac8`, V3 vector) depicts two people reaching for the same control. The two cover studies use the same ink, brass and cream colour controls with different compositions and rendering styles.

The Recraft masters, prompt iterations, request metadata and local captures are in `.local/editorial-review/webgl-art/presets/`. Both index thumbnails and compact heroes were checked at 1440, 390 and 320 px. The 1200 × 630 share cards were checked against their versioned URLs. The [review page](http://127.0.0.1:3045/presets.html) shows both covers and the desktop and mobile captures. The two studies are in local preview for review.

## Futuristic mesh studies — 14 November

Yann rejected the Neon Calm / Editorial pair and clarified that Orchestra is futuristic AI, with article imagery aligned to the homepage WebGL animation. The mesh should form an evocative subject. The palette alone does not establish the identity. No new style is accepted yet.

Six Recraft V4.1 Pro covers compare three approaches on Clear Mermaid and WebMCP: A uses an unfolding surface and two hands sharing a surface; B uses a landscape of paths and interwoven streams; C uses an eye and two facing profiles. The same fine edges, luminous vertices and transparent depth connect the studies to the homepage. C is the lead's recommendation for recognisable subjects; B is more fluid but less specific. The brighter bloom differs from the homepage's restrained light and remains a review decision.

The first attempt used a clean capture of the homepage WebGL canvas as a flexible style reference (`ef8d8b02-32e3-4818-a720-75b8f372ebd3`). It retained the mesh but was too dark and indistinct at thumbnail size, so it was rejected. The six displayed studies use explicit composition and mesh prompts with the homepage's ink, ivory and amber colour controls. Seven images used 1,475 existing API units; no credit purchase. Masters, prompts and response metadata are in `.local/editorial-review/webgl-art/futurist/`.

[Compare all six](http://127.0.0.1:3045/futurist.html), with full artwork, compact hero crops, desktop and mobile index captures, mobile articles and the homepage reference. Browser image substitution previews the candidates in the existing local article layout without choosing a production cover. All 30 comparison images load, the view controls work, and the 390px gallery and article pages have no horizontal overflow. The mesh source matches current origin/main; the older editorial worktree also contains unrelated held work, which is preserved. No deployment or publication in this round.

## Subject first, separate mesh layer — 14 November

Yann clarified that the hero should carry the actual article meaning first, with mesh added as a layer so the meaning survives. This supersedes making every subject entirely out of mesh. The base image must work with the branding switched off.

The new Clear Mermaid illustration depicts a selected diagram node emerging from an assistant conversation. WebMCP depicts a human hand and an agent pointer acting on the same browser shortlist. Both are conceptual illustrations, not captures of the products. Recraft V4.1 Pro generated the two base images without mesh, using 420 existing API units. Prompt and response metadata stay beside the masters in `.local/editorial-review/webgl-art/subject-layer/`.

The [comparison preview](http://127.0.0.1:3045/subject-layer.html) adds a separate WebGL overlay using the existing Three.js dependency, with homepage colours and sparse connected vertices around the edges. A checkbox removes the layer, a slider changes its strength and a button pauses motion. Reduced-motion preference starts the mesh still. The selected default is 28% overlay opacity; the subject remains clear in the centre. This is a review prototype, not a new production component.

Browser checks verified the layer toggle, reduced motion, desktop index and 390px article/gallery layouts. Static captures place the layered artwork in the existing article layout; these preview heroes use a centred crop instead of the earlier 14% top position. The compact hero still limits the detail visible, particularly the bottom of the WebMCP hand; final per-image cropping remains part of integration. No publication, source article artwork replacement or deployment in this round. Founder review of the subject and the layer remains open.


## No hands in imagery — 14 November

Yann rejected hands as distracting and instructed that they must never appear in imagery. The article standard and workspace create-designs skill now record this rule, covering realistic, illustrated, robotic and wireframe hands. Both current base illustrations were revised with Recraft V4.1 Pro image-to-image, using 420 existing API units. Clear Mermaid retains a selected diagram and its connections; WebMCP uses ivory and amber arrow pointers on one shared browser selection. No hands remain in the two inspected outputs. The separate mesh layer remains. The same comparison URL now displays these revisions; earlier images remain archived as rejected studies. No publication or deployment.

## Mesh as the elements’ material — 14 November

Yann clarified that mesh belongs in the texture of the depicted elements. The separate overlay is superseded. The article standard now says the mesh follows object geometry, preserving silhouettes and meaning, with a clean background and no hands.

The current material study puts triangulated lines and vertices on Clear Mermaid’s conversation bubble and diagram tiles. WebMCP uses the same material on a browser shortlist and two arrow cursors. The first WebMCP material edit changed the scene too much and was rejected; a lower-strength edit preserved the scene but made the texture too faint. A fresh composition keeps the three-card shortlist and shared selection explicit. Recraft V4.1 Pro generated the studies; prompts, masters, rejected variants and response metadata are in `.local/editorial-review/webgl-art/mesh-material/`. Four generations used 840 existing API units.

[Material comparison](http://127.0.0.1:3045/mesh-material.html) includes the previous version, desktop index and mobile article captures. These are static material studies, with no background mesh or animation. Founder acceptance remains open. No production artwork, article body, publication or deployment changed.

## Open mesh structures — 14 November

Yann proposed retaining only the mesh structure, without texture, and prohibited cursors as well as hands. The current article standard records this as an exploration, not an accepted final style; create-designs now excludes mouse pointers and cursors alongside hands.

Two new Recraft V4.1 Pro studies use open wireframe forms. Clear Mermaid connects a conversation bubble to a diagram with one highlighted node. WebMCP has two signal paths entering one browser page with its middle shortlist card selected. The cards and bubble have open interiors, fine structural edges and small lit vertices. There are no hands or cursors. The generations retain some brighter structural edge facets, which remain visible for review rather than being described as perfect empty geometry.

[Open mesh preview](http://127.0.0.1:3045/open-mesh.html) includes desktop index and mobile article captures. Both images were inspected, and the index and 390px article/gallery layouts checked. Masters, prompts, API metadata and captures are under `.local/editorial-review/webgl-art/open-mesh/`. The two requests used 420 existing API units. Earlier texture and overlay studies are superseded; nothing was published or deployed. Founder visual acceptance remains open.

## Basic 3D structures — 15 November

Yann asked for more basic 3D structures closer to each article’s topic. The study reduces Clear Mermaid to a selected diagram node and its direct connections, and WebMCP to one page action approached through two connections. Perspective supplies depth; simple edges and vertices supply the structure. No hands, cursors, filled surfaces or texture.

Recraft V4.1 Utility Pro was chosen for simple predictable geometry at Pro resolution. The first Clear Mermaid output cropped a node and introduced an unwanted inset background, so it was rejected. Its replacement uses the WebMCP output as a flexible style reference. Three generations and one style used 635 existing API units. Prompts, originals and metadata are in `.local/editorial-review/webgl-art/basic-3d/`.

[Basic 3D preview](http://127.0.0.1:3045/basic-3d.html) retains the article titles and offers desktop index and mobile article captures. This is an illustration study, not a claim about product architecture or a released change. Founder review remains open. The native session retains its existing local work binding; the attempted bind refresh returned `team_remote_unconfirmed_check_before_retry`, so it was not replayed. Shared connector context remains the current continuity route.

The basic 3D gallery and article captures were checked at 1440px and 390px. Preview-only image fitting preserves the full structures in the short mobile hero; index captures replace the optimised image source directly. No horizontal overflow was observed. These capture overrides have not changed production article rendering.

## Ten named directions — 15 November

Yann rejected the basic wireframe study and requested prompt-library research, different Recraft settings and alternatives including Astra. Ten Clear Mermaid covers are available at http://127.0.0.1:3045/ten-directions.html, with full covers, short hero and phone-card views. Assets, model sidecars and Recraft prompts live in `.local/editorial-review/webgl-art/ten-directions/`. `gallery-data.json` names each direction; `all-ten.jpg` compares them.

01 Unfolded conversation; 02 Lens of understanding; 03 Source becomes space; 04 Inspectable layers; 05 Graphic branching; 06 Homepage constellation; 07 Conversation in X-ray; 08 Sculptural graphic; 09 Conversation chamber; 10 Living source.

01–03 use Recraft V4.1 expressive Pro (02 adds prompt enhancement), 04 Utility Pro, 05 Pro Vector, 06 Styles Pro with a precise homepage reference. Six generations and one style consumed 1,245 existing API units. 07–08 use the built-in image generation tool; its exact model is not exposed. 09–10 were built by a GPT-6 Astra worker as editable Three.js scenes and inspected by the lead. No production dependencies were added.

Research covered PromptHero diagram prompts, Lexica visual search (limited prompt detail through the text interface), Krea reference-led brand tools, official Recraft controls and OpenAI's Astra architecture workflow. Source links are in the gallery. Krea was researched, not exercised. Prompt libraries supplied vocabulary; no third-party artwork was copied.

Lead assessment: 07 communicates the article most clearly; 08 has the strongest silhouette; 09 offers editable geometry and framing. 01 and 03 drift towards abstraction; 06 follows the homepage but lacks contrast. These are exploration limits, not accepted identity. All ten images decoded in Chrome; the desktop sheet and 390px gallery have no observed horizontal overflow. Founder review remains open; nothing was published. The bind refresh returned team_remote_unconfirmed_check_before_retry and was not replayed; ordinary shared context retains the result.

## Lens of understanding series — 15 November

Yann redirected the exploration from 07/08 to 02, explicitly named “Lens of understanding”. Four generated extensions of 07/08 are retained in `.local/editorial-review/webgl-art/directions-07-08/`; they were superseded before gallery integration.

The current series keeps the original Clear Mermaid cover and adds OpenTelemetry (conversation identity across trace spans) and LangChain vs Databricks AppKit (two progress streams and recovery responsibilities). Read both complete article bodies before selecting their subjects. [Lens series preview](http://127.0.0.1:3045/lens-series.html) includes the three covers, actual desktop index captures and 390px article captures. `.local/editorial-review/webgl-art/lens-series/` retains prompts, source images, model settings and comparison sheet.

Recraft V4.1 Pro precise style matching over-copied the original, especially the streaming subject. Rejected those two outputs; flexible matching with the same style ID differentiated the subjects. Four generations and one style cost 845 existing API units. The repeated ring, ink field and gold lines make a consistent family; the streaming metaphor remains abstract and does not encode an exact technical comparison. Mint accents are illustrative, not a measured result or product control.

Lead inspected all images and refreshed the desktop/mobile captures after the final generation. All images decoded; no horizontal overflow at 390px. The short mobile hero uses preview-only contain fitting to preserve the ring, leaving side space. Nothing changed in production data, assets or CSS. Founder review of the two new covers remains open; liking 02 authorises this exploration, not publication. Existing shared work retains the result. The earlier bind refresh in this turn returned team_remote_unconfirmed_check_before_retry and was not replayed.

## Independent concepts from prompt libraries — 15 November

Yann clarified that each article should have its own approach, using prompt-library research rather than repeating a lens or layout. Applied this to Clear Mermaid, OpenTelemetry and LangChain vs Databricks. Updated ARTICLE-STANDARD.md to preserve that instruction and the no-hands/no-cursors rule.

The three new studies are “A diagram you can enter” (open architectural map), “One thread through every call” (continuous light trail), and “Progress across the interruption” (two contrasting bridges). Sources are Prompt Template’s building-cutaway example, PromptHero’s golden light-trail example and Geniea’s abstract-architecture prompt listing. The first two pages were read; Geniea’s bridge prompt was available in the search result but its page returned 403. Source links, adaptations and prompts are retained in `.local/editorial-review/webgl-art/article-led/briefs.json` and the gallery. No source artwork was downloaded or copied.

[Independent-concept preview](http://127.0.0.1:3045/article-led.html) shows the three covers, desktop index captures and 390px mobile article captures. Recraft V4.1 Pro with prompt enhancement generated each independently without an image/style reference. Three generations used 630 existing API units. Exact initial and enhanced prompts and model metadata sit beside the images.

Lead inspected all three outputs and assembled captures. The cutaway and bridges are geometric illustrations; the light-trail cover is more abstract. They are visual metaphors, not precise depictions of software topology or a claim of equivalent product capabilities. All three decoded and no horizontal overflow was observed at 390px. The short hero uses preview-only contain fitting, with side space. No production assets, article data or CSS changed. Founder review remains open. Native bind refresh again returned team_remote_unconfirmed_check_before_retry; no replay. Shared connector context retains this result.


## Wordless article subjects — 15 November

Yann rejected the labelled interface direction because the words carried the idea. Three new covers remove text from the artwork: a conversation unfolding into a diagram; a conversation signal revealed inside a computing machine; and modular and integrated assemblies producing responses progressively. The article standard now requires the image to communicate without titles or explanatory labels.

[Wordless preview](http://127.0.0.1:3045/wordless.html) shows the set, a title toggle, desktop index captures and 390px article captures. The built-in image generator produced the three independent illustrations; its exact model is not exposed. Masters, exact prompts and engine records are in `.local/editorial-review/webgl-art/wordless/`. Source links and adaptations are in the preview: AI Dreamhub for depth and a focal point, PromptHero for a component cutaway and PicX for side-by-side comparison. Their labels, people and unsupported superiority claims were excluded. No source artwork was copied.

Lead assessment: Clear Mermaid has the clearest connection between the depicted action and the article. OpenTelemetry and streaming use physical metaphors for software; they do not depict real hardware, exact architectures, equivalent capabilities or measured results. All three contain no text, hands or pointers. Images decoded, the title toggle worked, and the 390px gallery and article previews had no horizontal overflow. Mobile captures use preview-only contain fitting, which leaves side space in the shallow hero. These checks establish rendering, not audience comprehension or conversion.

The text-heavy Clear Mermaid and OpenTelemetry generations are superseded. This round replaces the proposed text-led share-card assembly with artwork that can be judged alone. No production assets, data, CSS or sharing renderer changed. Founder visual review remains open; the existing shared work retains the preview and remaining decision.


## Accepted covers and catalogue rollout — 15 November

Yann approved all three wordless covers and instructed their use as heroes, with the same process applied to the full catalogue. The images are now mapped to Clear Mermaid in your AI assistant, OpenTelemetry conversation ID and LangChain vs Databricks AppKit. Delivery JPEGs preserve the complete 16:9 composition at 1600 × 900 and total 376 KB. The article and index use the same source. Their 1200 × 630 sharing images preserve the artwork without a text overlay; the title and description remain in metadata. The compact hero uses contain fitting so the meaningful objects remain visible. Draft publication dates are unchanged.

The shared method is committed on workspace main as `05ba4a5d`, routed through `hd-writer`, `hd-content-writer` and `designer`. Its workflow covers the article-quality gate, subject/action brief, prompt-library research, wordless interpretation, actual crop review, asset records and founder feedback between batches of three. The first batch’s prompts are in `approved-wordless.json`; `hero-rollout.json` tracks all 21 catalogue articles. The launch log is a separate surface whose existing trailer poster remains pending review.

[Batch two](http://127.0.0.1:3045/batch-02.html) contains WebMCP, agent permissions and app operations. References informed interface staging, selective tool access and a maintenance scene. Originals, exact prompts and adaptations are in `.local/editorial-review/webgl-art/batch-02/`. No title, hands or pointers appear in the three inspected images. This batch remains a candidate; the index and mobile screenshots use browser-only image substitution. Founder feedback is required before generating batch three.

The independent editorial review retained WebMCP and delegation. App operations needed corrections: label the booking scenario illustrative, remove unsupported causality, stale fleet totals and incident claims, and describe monitoring as configured. Those corrections are integrated in the candidate, including removal of the unsupported fleet figure from its catalogue entry. The corrected article remains pending founder review before deployment.

Verification: current-main integration passes typecheck and all 82 tests. The active review preview returns the three exact approved assets and versioned 1200 × 630 sharing images. Desktop and 390px pages render without horizontal overflow. The first batch is integrated in source; no production deployment occurred in this batch. Keep the review checkout and its gallery server while founder feedback is pending.


## Appeal, content and reader connection — 15 November

Yann approved batch two and asked that every cover be reviewed for appeal against the article, sharing and a useful connection with Orchestra. The shared method now tests the image’s promise against the title, opening, evidence and invitation. It distinguishes editorial judgement from measured conversion. Workspace commit `52cd2ee3` updates create-designs, designer and hd-content-writer; hd-writer already routes to that method.

WebMCP, delegation and app operations now use their approved wordless artwork in source and the local preview. Their JPEGs preserve the complete 1600 × 900 composition. Six catalogue covers are approved and integrated. The remaining catalogue work is three candidates awaiting feedback and twelve still pending. The separate launch-log poster remains noted for review. Publication dates are unchanged; no deployment in this batch.

[Batch three](http://127.0.0.1:3045/batch-03.html) covers AI daily briefs, Lakebase versus document databases and First Officer. The review in `batch-03-review.json` connects each image’s intended audience, promise, article payoff and relevant invitation. Prompt-library references inform focal staging, a balanced comparison and purposeful object scenes. Each concept has a distinct subject; none relies on explanatory words. Assets, exact prompts and desktop/mobile captures live in `.local/editorial-review/webgl-art/batch-03/`.

The independent editorial review found two corrections. Lakebase now asks the reader to verify payment retries rather than promising they cannot duplicate a payment; its catalogue invitation asks for the current stack and one operation whose records must stay consistent. First Officer’s original take7–take10 logs were recovered from `.growth/publishing/youtube/first-officer/work/`. Across 24 turns, first audio arrived 0.540–0.962 seconds after the generated captain voice ended. Take ten recorded 12.631 seconds from the first instruction to the start of the recovery report. The article now states 0.5–1.0 seconds and about thirteen seconds, distinguishes audio arrival from completed action, removes the unsupported silence maximum and stops embedding the graphic carrying exact 12.7-second wording. Sources include `bridge-voice/scripts/take.mjs` and its sixth-session `docs/VOICE-AGENT-NOTES.md`. This is a historical sandbox demonstration, not a general speed promise.

The new gallery includes an appeal review with each article’s useful next step. Browser-only image substitution previews unapproved candidates in the article layout. Check the enquiries without submitting them; no test message should reach a customer workflow. Founder feedback on these three remains the next decision before another generation batch.


Batch-three checks: all candidate images decoded; index captures at 1440 and 390px and phone article captures preserve the subject without horizontal overflow. The three approved batch-two assets returned their expected hero sources and versioned 1200 × 630 sharing images. All three batch-three invitations opened the existing enquiry dialog with the correct article selected; no form was submitted. Typecheck, production build, copy and whitespace checks passed. The local preview runtime was restarted after a stale development chunk caused transient failures; final route and browser checks passed after recovery.


## Complete catalogue — 15 November 2026

The founder approved batch three, then authorised all remaining covers without another batch pause. All 21 catalogue articles now use original subject-specific wordless artwork, with the same image in the compact hero, article index and unobscured share card. Five drafts remain unpublished. The separate Traction launch log retains its relevant recorded-film poster.

The twelve remaining bodies received an independent editorial read: eleven pass unchanged; security maintenance has bounded corrections and an illustrative figure label. The lead read the corrected body and accepted the image/content fit. New copy corrections remain on main for review; the artwork-only release preserves installed bodies. See `remaining-editorial-review.md`.

A security concept was rejected because its appliance silhouette suggested a coffee machine. The replacement uses recognisable servers. The reusable lesson is to judge subject recognition before accepting polished materials. All exact prompts, source adaptations, selected files and appeal assessments are in `approved-remaining.json`. Original generations and the gallery remain in the active preview checkout; the delivery JPEGs are in `public/articles/orchestra/`.

Main typecheck and 82 tests pass; the isolated artwork release on the installed base passes typecheck and 70 tests. All 21 preview article routes, hero decodes, 1200 × 630 share exports and preselected enquiry contexts pass; no form was sent. The desktop and 390px indexes contain all 21 preview covers without horizontal overflow. Live deployment evidence follows separately.

Review: http://127.0.0.1:3045/all-covers.html. Preview runtime and gallery remain owned by this work until review is complete; these are the only task runtimes retained.
