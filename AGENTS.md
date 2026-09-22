# Orchestra

> Inherits: [Hyperdrift Agent Guidelines](../../AGENTS.md)
>
> Also read: `~/dev/hyperdrift/AGENTS.md` — workspace-level context (deploy tooling, fleet management, HD infra).

See `MISSION.md` and `ROADMAP.md` for product goals and current focus.

## Current approved experience — Living constellation A, 22 September 2026

The founder selected **A — Living constellation**. [Selection and implementation](docs/design/2026-09-22-business-flow/SELECTION.md). This supersedes earlier instructions to keep the full organisation diagram on the homepage and all giant artwork directions.

- Home: illustrative customer-growth scenario and interactive mesh first, followed by the commercial proposition for founders with demonstrated demand, three inspectable builds, a prominent Traction Partnership invitation and enquiry. The founder explicitly restored partnership visibility in the 22 September refinement. No organisation diagram, article grid or news feed in the main homepage flow.
- `/how-it-works`: the selected constellation, now using the same five semantic wireframe objects. Signals branch along shared curves, each domain opens into signal/action/impact/measurement, click-out and Escape return to the overview. The founder keeps consequential decisions.
- Three **illustrative successful iterations** per business scenario retain illuminated memory rings. After the third, existing signals keep circulating without inventing further improvements. Growth/profit are measured objectives, never guaranteed results. Heartbeat changes light only.
- `/work`: complete catalogue and correct contest attribution. `/partnership`: existing partnership offer with scoped terms and contextual enquiry link. Articles stay at `/articles`; publication gating is preserved in navigation and secondary links.
- All routes have canonical metadata and sitemap coverage. Local preview only; no deployment or public sitemap submission authorized.

Latest refinement: the founder rejected atomic/molecular motifs, reused abstract sculptures and textured materials. Both engines use the same recognisable, texture-free wireframe family: Notice/eye, Choose/signpost, Improve/wrench, Release/paper plane and Learn/open book. Internal action assets must represent their actual labels. Every scale is uniform; update the camera aspect with the canvas dimensions. The homepage uses a full-viewport outer shell, a spherical inner network and a business core. Domain anchors and return paths share the network rotation. Domain-coloured contributions return to the core, briefly illuminate the mesh and gradually retain strength. Growth is a bounded illustration, not a forecast; heartbeat never changes camera distance. Keep continuous, interruptible camera motion and a stable canvas size. Homepage navigation combines fixed domain links beside the sphere (a compact row above it on phones) with domain and actor meshes/labels, click-out/Escape, and an unobtrusive pause control in the scene. The founder explicitly requested these stable entrances so rotation cannot make a domain unreachable. Do not restore the control row or numbered navigation below it. The 22 September founder request explicitly keeps Traction Partnership prominent and targets committed founders with evidence of demand. Unanswered’s existing recorded walkthrough is re-encoded as a local MP4 on `/work`; it is not a new live capture. [Refinement record](docs/design/2026-09-22-business-flow/WIREFRAME-REFINEMENT.md).

Prototype verification: typecheck, manual browser review at desktop and 390px phone widths, domain/facet interaction, click-out, Escape focus restoration, scenario/iteration state, full catalogue and partnership enquiry context. No test suite or new dependency added.

The founder selected **A — Aperture** for the negative-space O/A logo. Use the flat SVG master in `public/brand/` for the masthead/footer and `src/app/icon.svg` for the favicon. Keep the cutouts transparent, proportions square and wordmark as live text. The default 1200 × 630 Open Graph image at `/opengraph-image` uses this master and the growth/profit proposition. Child pages with Open Graph objects must include `brandShareImage` from `src/lib/share-metadata.ts`; article details retain their own branded cards. [Selection and assets](docs/design/2026-09-22-logo/README.md).

## AI-native editorial series — approved 21 September 2026

New AI-native proposition articles belong at `ai.hyperdrift.io/articles` and lead to a relevant sales enquiry. Use the strongest real Hyperdrift example for each argument, explicitly distinguishing internal operations, public demonstrations, prototypes and client outcomes. Source of record: [editorial decision](docs/decisions/2026-09-21-ai-native-articles.md); drafts and proof ledger: [series review](docs/editorial/ai-native-series/README.md). Existing published articles keep their URLs initially. All copy inherits `meta/PHILOSOPHY.md` §8, Speak to Enable. The founder instructed implementation on 21 September; the article pages extend the existing approved gold/ink/serif identity. Runtime source is `content/articles/*.md` plus `src/data/articles.json`; original drafts remain in the review directory. Article context is editable in the form, validated and retained in the lead record and relay message. Final words/media and production publication still need review. Drafts are visible only in development or an explicit preview build and stay out of the sitemap. Never count preview submissions as leads. See the series README for local delivery, attribution and release details.

## Founder-selected WebGL refinement — 22 September 2026

The founder chose the existing WebGL view, removed the giant and asked for business growth/profit positioning. At that review, the home page used a living mesh followed by the full graph. The later selection of constellation A supersedes that arrangement; do not restore the diagram to the homepage. Article openings use six ink/gold editorial illustrations while real evidence remains in proof sections. [Selected refinement and verification](docs/design/2026-09-21-landing-review/SELECTION.md). The prior A/B/C landing concepts were not selected. `MISSION.md` now leads with founder revenue, profit and time. These changes remain local preview only.

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
