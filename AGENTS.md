# Orchestra

> Inherits: [Hyperdrift Agent Guidelines](../../AGENTS.md)
>
> Also read: `~/dev/hyperdrift/AGENTS.md` — workspace-level context (deploy tooling, fleet management, HD infra).

See `MISSION.md` and `ROADMAP.md` for product goals and current focus.

## Production instruction — 23 September 2026

The founder explicitly requested “Push live and work an innovative and coordinated campaign”. This authorizes deployment of the reviewed experience and the six original AI-native articles, superseding historical local-preview-only statements below. The two newer Databricks drafts retain their separate review gate. Verification and deployment now use npm consistently. GitHub Actions verifies only: the old webhook has no credentials and the existing org runner did not accept this public repository. Production deploys through infra (`make deploy app=orchestra`) after the approved revision passes CI; do not expand public-repo runner access without explicit approval. The [campaign kit](docs/campaigns/2026-09-service-launch/README.md) contains approved-brand exports, tracked distribution links and founder briefing material; it does not represent scheduled social posts. The founder approved PostHog on 23 September. Browser and accepted-relay events use the existing company project 206943 (EU), always filtered by app=orchestra and hostname=ai.hyperdrift.io. No replay, form autocapture, contact text or person profiles. Session-only first-touch campaign tags accompany the durable enquiry; local previews do not send analytics.

## Brand exploration — 23 September 2026

The founder explicitly keeps the existing Hyperdrift portal unchanged and wants a distinct new identity and content for this service. Explore naming and positioning around a success partnership, customer experience, growth and profit. Hyperdrift can supply provenance; it is not the selected new service name. No replacement name or public rebrand has been approved. Do not infer design failure from the legacy portal bringing no customers.

## Article standard — founder direction, 22 September 2026

For all new AI-site articles, read [ARTICLE-STANDARD.md](docs/editorial/ARTICLE-STANDARD.md). Prioritise qualified enquiries, concise 500–800-word explanations, one simple example, a WebGL expertise globe to the right of the title with a matching SVG fallback and a striking explanatory visual within the explanation (choose diagrams for flows and architecture; reserve data-visualisation skills for data). Compare concepts fairly and cite current primary sources. This site-specific standard supersedes the legacy blog's audience and format rules. The [Databricks series](docs/editorial/databricks-series/README.md) starts with database modelling and streaming contracts; drafts remain unpublished until final copy/media review and production approval.

## Current approved experience — Living constellation A, 22 September 2026

The founder selected **A — Living constellation**. [Selection and implementation](docs/design/2026-09-22-business-flow/SELECTION.md). This supersedes earlier instructions to keep the full organisation diagram on the homepage and all giant artwork directions.

- Home: illustrative customer-growth scenario and interactive mesh first, followed by the commercial proposition for founders with demonstrated demand, three inspectable builds, a prominent Traction Partnership invitation and enquiry. The founder explicitly restored partnership visibility in the 22 September refinement. No organisation diagram, article grid or news feed in the main homepage flow.
- `/how-it-works`: the selected constellation, now using the same five semantic wireframe objects. Signals branch along shared curves, each domain opens into signal/action/impact/measurement, click-out and Escape return to the overview. The founder keeps consequential decisions.
- Three **illustrative successful iterations** per business scenario retain illuminated memory rings. After the third, existing signals keep circulating without inventing further improvements. Growth/profit are measured objectives, never guaranteed results. Heartbeat changes light only.
- `/work`: complete catalogue and correct contest attribution. `/partnership`: existing partnership offer with scoped terms and contextual enquiry link. Articles stay at `/articles`; publication gating is preserved in navigation and secondary links.
- All routes have canonical metadata and sitemap coverage. Local preview only; no deployment or public sitemap submission authorized.

Latest refinement: the founder rejected atomic/molecular motifs, reused abstract sculptures and textured materials. Both engines use the same recognisable, texture-free wireframe family: Notice/eye, Choose/signpost, Improve/wrench, Release/paper plane and Learn/open book. Internal action assets must represent their actual labels. Every scale is uniform; update the camera aspect with the canvas dimensions. The homepage uses a full-viewport outer shell, a spherical inner network and a business core. Domain anchors and return paths share the network rotation. Domain-coloured contributions return to the core, briefly illuminate the mesh and gradually retain strength. Growth is a bounded illustration, not a forecast; heartbeat never changes camera distance. Keep continuous, interruptible camera motion and a stable canvas size. Homepage navigation combines fixed domain links beside the sphere (a compact row above it on phones) with domain and actor meshes/labels, click-out/Escape, and an unobtrusive pause control in the scene. The founder explicitly requested these stable entrances so rotation cannot make a domain unreachable. Do not restore the control row or numbered navigation below it. The 22 September founder request explicitly keeps Traction Partnership prominent and targets committed founders with evidence of demand. Unanswered’s existing recorded walkthrough is re-encoded as a local MP4 on `/work`; it is not a new live capture. [Refinement record](docs/design/2026-09-22-business-flow/WIREFRAME-REFINEMENT.md).

Prototype verification: typecheck, manual browser review at desktop and 390px phone widths, domain/facet interaction, click-out, Escape focus restoration, scenario/iteration state, full catalogue and partnership enquiry context. No test suite or new dependency added.

The founder selected **B — Mesh Aperture** with “B is good”, superseding the filled Aperture mark. Use `public/brand/orchestra-mesh.svg` for large placements, `orchestra-mesh-compact.svg` for the 44px masthead, 48px footer and article cards, and `src/app/icon.svg` for the simplified favicon. The open A is genuine empty space between mesh edges; preserve square proportions, spherical silhouette and central business node. The monochrome master uses `currentColor`. Keep the wordmark as live text. `/opengraph-image` uses the full vector and growth/profit proposition. Child pages with Open Graph objects must include `brandShareImage` from `src/lib/share-metadata.ts`; article details retain individual cards. [Selection and assets](docs/design/2026-09-22-mesh-logo/README.md).

## WebGL assets and article navigation — 22 September 2026

Founder instruction: use WebGL for article headers, the logo and all Orchestra decorative artwork, with a fallback. `MeshArtwork` progressively enhances server-rendered SVGs; `mesh-artwork-engine.ts` renders the approved logo paths and shared domain-object geometry. No new bitmap brand art. Use this component for new decorative placements. Keep real proof recordings/screenshots and semantic explanatory labels intact; favicons, social cards and downloads require static exports. Preserve the selected Mesh Aperture silhouette and open A.

Article mesh definitions: `src/data/article-mesh.json`; fallback generator: `node docs/editorial/databricks-series/generate-article-mesh.cjs`. It projects the actual scene into SVG. The 23 September founder refinement places the expertise globe to the right of the title in the same row, removing the separate stripe to save vertical space. Keep the artwork borderless, with no panel fill or text overlap; the headline determines the row height. At 850px and below, hide the decorative globe and its pause control in CSS before hydration, give the title the full available width, and avoid allocating its WebGL context. Dispose the title renderer when shrinking across that breakpoint; widening mounts a fresh canvas and progressively enhances the inline SVG again. `mesh-artwork-layout.ts` supplies the same close framing to the inline SVG and WebGL camera. The article is an expertise domain: show a spherical mesh with connected topic symbols, continuously rotate its actual 3D geometry, and add smooth horizontal/vertical cursor tilt across the article header. No travelling-light substitute. Retain an accessible pause control, automatic suspension offscreen/in hidden tabs, bounded pixel density, reduced-motion support and complete GPU disposal. Only resize the drawing buffer when dimensions change; inline the SVG in the server response so no image fetch is needed; retain it until a preserved GPU frame exists, then crossfade before starting motion. Return to the vector immediately on context loss. Logos remain stable and render on demand. Fallbacks cover no JavaScript, loading, initialization failure and context loss. For local responsive fallback QA, append `?mesh=fallback` in development to exercise the initialization-failure path; production ignores this flag.

“In this article” is always expanded, highlights the section at the reading position, and updates its URL fragment via replaceState for bookmarking without flooding Back history. Native anchors remain functional without JavaScript.

## AI-native editorial series — approved 21 September 2026

New AI-native proposition articles belong at `ai.hyperdrift.io/articles` and lead to a relevant sales enquiry. Use the strongest real Hyperdrift example for each argument, explicitly distinguishing internal operations, public demonstrations, prototypes and client outcomes. Source of record: [editorial decision](docs/decisions/2026-09-21-ai-native-articles.md); drafts and proof ledger: [series review](docs/editorial/ai-native-series/README.md). Existing published articles keep their URLs initially. All copy inherits `meta/PHILOSOPHY.md` §8, Speak to Enable. The founder instructed implementation on 21 September; the article pages extend the existing approved gold/ink/serif identity. Runtime source is `content/articles/*.md` plus `src/data/articles.json`; original drafts remain in the review directory. Article context is editable in the form, validated and retained in the lead record and relay message. Final words/media and production publication still need review. Drafts are visible only in development or an explicit preview build and stay out of the sitemap. Never count preview submissions as leads. See the series README for local delivery, attribution and release details.

## Founder-selected WebGL refinement — 22 September 2026

The founder chose the existing WebGL view, removed the giant and asked for business growth/profit positioning. At that review, the home page used a living mesh followed by the full graph. The later selection of constellation A supersedes that arrangement; do not restore the diagram to the homepage. The later WebGL asset refinement supersedes the six bitmap editorial openings: article headers now use live meshes with matching SVG fallbacks, while real evidence remains in proof sections. [Selected refinement and verification](docs/design/2026-09-21-landing-review/SELECTION.md). The prior A/B/C landing concepts were not selected. `MISSION.md` now leads with founder revenue, profit and time. These changes remain local preview only.

## Coloured domains and conversion review — 22 September 2026

The latest founder request permits moving the organisation experience to another page and exploring alternatives to the graph. This supersedes the earlier requirement to keep it on the homepage, and the founder subsequently selected A. The constellation now replaces that graph in the public exploration. Three comparable concepts and their status: [business flow](docs/design/2026-09-22-business-flow/README.md). Homepage hierarchy and page-move recommendations: [conversion review](docs/reviews/2026-09-22-homepage-conversion.md).

The approved homepage mesh now has five coloured domain spheres, original procedural signal/action/impact/measurement assets, click-out and Escape navigation, and keyboard focus restoration. Heartbeat is light-only. Keep the business context readable without WebGL. The proof section offers existing Helm and Radar recordings inline. Unsupported sponsorship/partnership assertions were removed from the partnership terms; do not restore them without evidence specific to this offer. No production deployment or outbound communication.

### Domain references

Reviewed community [Three.js materials](https://playbooks.com/skills/cloudai-x/threejs-skills/threejs-materials) and [animation](https://playbooks.com/skills/cloudai-x/threejs-skills/threejs-animation), plus [official shader documentation](https://threejs.org/docs/pages/ShaderMaterial.html). Apply shared GPU resources, explicit disposal, time-based procedural motion and stationary geometry for the heartbeat. Existing Three.js is sufficient; no new dependency or stock-asset pipeline.

## Current direction — 14 September 2026

`ai.hyperdrift.io` is Hyperdrift's primary business and marketing destination. Founder explicitly corrected the proposal to keep investing in the legacy HD homepage: move the focus to this AI site. The older site remains the location of existing articles and historical work during this transition.

- **Identity under redesign (founder, 14 September, later that day):** the Concert Hall × Lab Notebook identity is retired for an open redesign. The chosen concept is "On the shoulder": a stone giant carrying the founder through golden country toward prosperity. Record and status: `docs/design/2026-09-14-redesign/SELECTION.md`. The live code still carries the old identity until a round-5 concept is approved and implemented; keep the enquiry path either way.
- Design gate for this redesign: concept images first, founder review, then ScreenCraft implements the approved image (`meta/skills/design-crafter/SKILL.md` → The gate). Do not render a page skeleton through an image model.
- Promote AI services, MCP integrations, working examples, and the anniversary here. Use existing components for content refinements.
- Keep Hyperdrift's ownership clear. The existing Orchestra name is retained in this slice; a separate rename or new domain has not been approved.
- Do not resume the rejected legacy-homepage redesign or redirect this site back to it.
- Do not retire the legacy runtime: `/api/contact` currently relays there, and published article URLs remain there.
- No production deployment or public outreach is authorized by this content-preview change.

Decision and release follow-ups: [AI site as primary destination](docs/decisions/2026-09-14-primary-destination.md).

## Contest visibility and attribution

Every project-backed contest entry belongs in this AI site's case-study catalogue. Read `.growth/contests/ledger.jsonl` from the HD workspace and the official event page when adding or updating an entry. Enrolments without a project are not portfolio entries.

Each contest case must populate `challenge` in `src/data/case-studies.ts`: recognisable organiser/sponsor name, exact event, official URL, and evidenced stage. The component shows the company credit prominently and explains the relationship with “Built for”. Use Google and Amazon Web Services rather than leaving readers to decode programme acronyms. Preserve the actual sponsor technology in the stack and method description.

Keep contest participation distinct from a commissioned client engagement, endorsement, or award. For DEV's Generosity challenge, DEV is the organiser and Google AI is the entry category. For Bridge Voice, AssemblyAI and lablab.ai jointly run the event; show “In development” until a later phase is verified. Never expose a private repository as a public demo.

Current coverage and primary sources: [Contest attribution](docs/decisions/2026-09-14-contest-attribution.md). Refresh this catalogue as part of each contest's post-build and post-result work, without duplicating the entry owner's submission tasks.

## The front door — On the shoulder (14 September 2026)

Versions, tags and what production serves: `docs/RELEASES.md`. Tag every reviewable state and add its row there.

The homepage implements the five screens the founder approved (`docs/design/2026-09-14-redesign/SELECTION.md`, round 6). Each has a ScreenCraft packet in `docs/design/2026-09-14-redesign/screencraft/`; the packet's map, not taste, decides where text sits over the art.

- **Art:** `public/shoulder/*.webp`, made from the text-free masters in `docs/design/2026-09-14-redesign/assets-textfree/` (words erased with Recraft eraseRegion and the masks in `text-masks/`). Every word on the page is live HTML over the art; never bake text into an image. Art bands are full bleed and 16:9, so positions use `--band` (`100vw * 9 / 16`) and viewport percentages taken from the maps.
- **First screen** (`Hero`): statement and question in a left column clear of the giant; a portrait art source below 760px.
- **The four places** (`Places`): native radios named `place` over the horizon, from `src/data/situations.ts`. `:has(input[value=…]:checked)` lights that place and opens its response below the art. No client JavaScript. Each response's action links to `/?situation=<slug>#contact`, which preselects the editable "Where you are" in `EnquiryForm`.
- **The proof** (`Proof`): the contest-backed entries of `src/data/case-studies.ts`, numbered; the same numbers sit as markers on the footprints. "Built for" participation credit only.
- **Now playing** (`CurrentContent`): Intel's `/api/daily-intel/list` and hyperdrift.io `/api/blog/list` server-side, 15-minute revalidate, honest fallback links. The blog feed lives on hyper-drift branch `feat/blog-list-feed` and is not deployed yet.
- **The enquiry** (`Enquiry`): "You say where. We go." over the art; the form and the Traction Partnership below it. The relay to hyperdrift.io is unchanged.
- The long material stays folded in `Programme`. Pure cascading CSS in `src/app/globals.css`; the folded movements still use the older `.card`/`.meta`/`.numeral` rules, rethemed to the gold palette.

## Release (2026-09-23)

- Public repository: the org deploy runner refuses it (GitHub's default for public repos, kept on purpose). CI runs on GitHub-hosted runners; production deploys by hand from infra with `make deploy app=orchestra` until a public-repo route is approved. Never widen runner access to fix a missing webhook secret: add the secret to the vault and redeploy.
- Package manager: app code is npm; `.github/workflows/deploy.yml` and the `apps.yml` entry (`package_manager: "pnpm"`, `build_cmd: "pnpm build"`) are still pnpm. Migrate all three together before the next dependency change (root `AGENTS.md → Package manager and language`).
- Public is not launched: `posthog_project_id` is empty in `infra/group_vars/apps.yml`. Wire PostHog and pass `make check-launch-readiness app=orchestra` before any post, ad or contest entry points here.
