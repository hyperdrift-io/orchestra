# Orchestra OS field notes

Two articles that explain the second Orchestra offer, "Embed your app on Orchestra OS", from the reader's decision rather than from the offer. Drafted 13 October 2026 from Codex's research of 10 October; `publishedAt: null` until the founder signs the words.

| Slug | Reader question (intent hypothesis) | Role in the offer |
|---|---|---|
| `app-operations-after-launch` | Who should run a live app after launch, and what should a founder keep? | The offer itself: five jobs, named owners, receipts, decisions back to the founder. Links to `/how-it-works` and Traction. |
| `production-led-security-maintenance` | Should a security fix wait for the next feature release? | The "Protect & reconcile" capability in depth; a reference model platform engineers can cite. |

## Sources of the drafts

- Codex research and long draft (workspace, untracked): `reports/Production led security maintenance.md`, `reports/Orchestra operating system offering.md`, `research_notes/Production led security maintenance/`, `research_notes/Orchestra operating system offering/`.
- The 3,000-word reference draft was rewritten to the standard (about 1,000 words, story first). Its eight rules are compressed to three; the depth stays in the cited primary sources.

## Claims and their status

- Proposed model, not an exercised HD capability: the production repair → carry-back → admission-gate loop. `platform_evidence.md` (10 October) found daily runtime dependency audits, founder-triggered patching, and deploys that force-pull and clean the app directory. The article states the gap as "what we are building next".
- Fleet facts used, read from source on 13 October 2026: 20 apps registered in `infra/group_vars/apps.yml`, 13 enabled ("about a dozen"); outside uptime check every five minutes (`infra/.github/workflows/uptime-check.yml`); daily health and audit runs each morning; launch readiness includes product analytics for marketing sites.
- Not claimed: automatic enrolment, client isolation certification, restore rehearsal, SLA figures, revenue outcomes.

## Visuals

- `repair` (`src/components/visuals/RepairSurvival.tsx`): will the repair survive the next release? Five steps and a gate switch; default state is the refused regression.
- `operating-week` (`src/components/visuals/OperatingWeek.tsx`): who carries this week? Run it yourself versus on Orchestra OS; default state is Orchestra OS with two decisions returning to the founder.
- Built by Opus 5.5 subagents at extra-high effort from the brief in the `hyperdrift-blog` skill. Exports in `public/articles/orchestra-os/` (Save-the-visual PNG and a 1080×1350 LinkedIn card each), scripts in this folder.

## Distribution (prepared, nothing published)

See [DISTRIBUTION.md](DISTRIBUTION.md).
