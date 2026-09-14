# Content, behaviour and evidence contract

Status: design approval pending; no stage UI or feed integration implemented.

## Live source checks — 14 September 2026

- `https://intel.hyperdrift.io/api/daily-intel/list`: HTTP 200, 96 posts. Fields `slug`, `title`, `date`, `excerpt`; newest date 2026-09-13. Canonical archive article route is `/daily/YYYY-MM-DD`. Existing RSS route uses the same archive source. Read only: homepage fetches never call the report-generation API.
- `https://hyperdrift.io/api/search-index`: HTTP 200, 98 entries. Fields `slug`, `title`, `excerpt`, `body`, `tags`; **no publication date**. Generator reads all MDX, including scheduled files, without the canonical published filter. This is unsuitable as a latest-published feed. Do not infer freshness from alphabetical order or use this index for homepage highlights.
- Blog source already offers `getPublishedHDPosts()` in `apps/hyper-drift/src/lib/blog.ts`: date-gated, excludes Intel posts, sorts newest first. Preferred implementation is a small read-only JSON feed over this function returning only slug/title/excerpt/date/tags/canonical URL. This is content plumbing in the legacy publishing host, not renewed investment in its homepage. Keep it reusable if publishing later moves to the AI site.
- Current AI preview `http://127.0.0.1:3108` returns HTTP 200 with the previously added contest catalogue. Remains running while design is reviewed.

## Freshness rules

Fetch the public feeds on the AI server, cache for 15 minutes, and validate the small public schema. Render a bounded one- or two-item selection. The server supplies readable initial HTML; no spinner blocks the visitor's first action. Intel uses the actual edition date. Never label yesterday's edition “today”. Blog items sort by publication date, omit future dates and excluded legacy DeFi promotion, and point to canonical articles. Keep the anniversary pinned separately.

If an endpoint fails, show a simple permanent “Read Intel” / “Read the Hyperdrift blog” link; do not mislabel an undated hardcoded item as “latest”. A cached older item can remain with its actual publication date. Avoid transmitting article bodies or public feed payloads into analytics.

The board's Standup title is a captured editorial example, not a promise that it will always be the latest post. Selection uses the published content feed when implemented.

## Details policy

Always visible: navigation to Intel/writing/partnership; anniversary link; four situation labels; the selected situation's concise who/why, evidence and action; compact current content; partnership invitation.

Collapsed by default: unselected situation explanations; technical method; full catalogue of work/collaborations; services, timelines and pricing detail; partnership terms; FAQ answers. Use native details/summary where the selected design permits. Avoid nesting closed examples inside another closed block: when a situation opens, its evidence and CTA are immediately visible.

Do not remove offerings, historical articles or contest entries from the repository. Consolidate their presentation. Every public example has a usable CTA. For an unfinished prototype, the CTA says view the challenge or discuss this capability; it must not imply a working public demo.

## Contact and measurement

An enquiry action opens the existing contact path with the selected situation visibly prefilled and editable. It must preserve text the visitor already entered. Do not submit automatically or send a test email. The existing `/api/contact` relay is still a runtime dependency on hyperdrift.io; do not retire that host in this change.

When analytics is configured, record only stage identifier and CTA identifier for stage choice, example click and enquiry start/success. Do not collect free-text enquiry contents or add a new analytics service for this prototype. Selection counts alone are not proof of demand; inspect completed enquiries and actual conversation quality before optimizing.

## Design and implementation constraints

Preserve Fraunces, IBM Plex Sans/Mono, ink/cream/vermillion, movement/staff motifs and original visual assets. The new interaction must fit the existing cascade. Whole-file migration to semantic CSS applies when touching existing components with inline presentation styles, including Contact. No new component framework, dependency or test suite is needed. After selection: ScreenCraft map → small coherent local preview → type/build checks and manual browser use, including mobile and keyboard. No production deployment is authorized yet.

## Research references

- Live NextRole: https://nextrole.site — inspected its closed “Which one are you?” rows and the expanded Pivoting industries response plus action. Local counterparts: `apps/hyper-cv/src/components/LandingBelowFold.tsx` and `HomeEntrySurface.tsx`.
- https://playbooks.com/skills/kuse-ai/kuse-skills/landing-page-creator — relevant principle: reveal complex information progressively, retain a clear immediate action. Generic pressure/urgency suggestions excluded under HD's Voice Covenant.
- https://playbooks.com/skills/whawkinsiv/solo-founder-superpowers/landing-page — useful buyer questions: relevance, evidence, next action. Its long sales-page prescription and Tailwind recommendation are not adopted; the user's direction and HD CSS standards govern.
- Local primary evidence and official organiser URLs: `../../decisions/2026-09-14-contest-attribution.md`.

All generated copy inherits `meta/PHILOSOPHY.md` §8 Speak to Enable. Examples demonstrate the work; contest participation does not establish a commercial endorsement or measured client result.
