# Orchestra

> Inherits: [Hyperdrift Agent Guidelines](../../AGENTS.md)
>
> Also read: `~/dev/hyperdrift/AGENTS.md` — workspace-level context (deploy tooling, fleet management, HD infra).

See `MISSION.md` and `ROADMAP.md` for product goals and current focus.

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

The homepage implements the five screens the founder approved (`docs/design/2026-09-14-redesign/SELECTION.md`, round 6). Each has a ScreenCraft packet in `docs/design/2026-09-14-redesign/screencraft/`; the packet's map, not taste, decides where text sits over the art.

- **Art:** `public/shoulder/*.webp`, made from the text-free masters in `docs/design/2026-09-14-redesign/assets-textfree/` (words erased with Recraft eraseRegion and the masks in `text-masks/`). Every word on the page is live HTML over the art; never bake text into an image. Art bands are full bleed and 16:9, so positions use `--band` (`100vw * 9 / 16`) and viewport percentages taken from the maps.
- **First screen** (`Hero`): statement and question in a left column clear of the giant; a portrait art source below 760px.
- **The four places** (`Places`): native radios named `place` over the horizon, from `src/data/situations.ts`. `:has(input[value=…]:checked)` lights that place and opens its response below the art. No client JavaScript. Each response's action links to `/?situation=<slug>#contact`, which preselects the editable "Where you are" in `EnquiryForm`.
- **The proof** (`Proof`): the contest-backed entries of `src/data/case-studies.ts`, numbered; the same numbers sit as markers on the footprints. "Built for" participation credit only.
- **Now playing** (`CurrentContent`): Intel's `/api/daily-intel/list` and hyperdrift.io `/api/blog/list` server-side, 15-minute revalidate, honest fallback links. The blog feed lives on hyper-drift branch `feat/blog-list-feed` and is not deployed yet.
- **The enquiry** (`Enquiry`): "You say where. We go." over the art; the form and the Traction Partnership below it. The relay to hyperdrift.io is unchanged.
- The long material stays folded in `Programme`. Pure cascading CSS in `src/app/globals.css`; the folded movements still use the older `.card`/`.meta`/`.numeral` rules, rethemed to the gold palette.
