# Orchestra

> Inherits: [Hyperdrift Agent Guidelines](../../AGENTS.md)
>
> Also read: `~/dev/hyperdrift/AGENTS.md` — workspace-level context (deploy tooling, fleet management, HD infra).

See `MISSION.md` and `ROADMAP.md` for product goals and current focus.

## Current direction — 14 September 2026

`ai.hyperdrift.io` is Hyperdrift's primary business and marketing destination. Founder explicitly corrected the proposal to keep investing in the legacy HD homepage: move the focus to this AI site. The older site remains the location of existing articles and historical work during this transition.

- Preserve this site's existing Concert Hall × Lab Notebook design, Fraunces/Plex typography, ink/cream/vermillion palette, imagery, movement numbering, and enquiry path.
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
