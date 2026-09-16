# Selection — ai.hyperdrift.io redesign

| Date | Round | Founder decision |
|---|---|---|
| 14 Sep 2026 | 1 (identity boards) | Rejected: second round requested. |
| 14 Sep 2026 | 2 (soul boards) | Rejected: "they're all really bad"; concept must be created as images before ScreenCraft. |
| 14 Sep 2026 | 3 (Engine, Line, Split) | Rejected: none of these. Brief given: "User should feel they will stand on the shoulder of a giant that will understand their business and drive it to prosperity." |
| 14 Sep 2026 | 4 (the giant) | **Picked 4A, On the shoulder.** Stone giant walking through golden country toward a waking city; the founder on its shoulder points and the giant looks where they point. Reference image: `round4-giant/4A-screen.png` (seed 402). |

| 14 Sep 2026 | 5 (4A across the site) | **Approved the walk:** first screen 5C, four places 5D, proof 5E, enquiry 5F, mobile first screen 5H-a. Round 6 repairs the named flaws in images only. |
| 14 Sep 2026 | 6 (repairs) | **Approved as the screens to build:** 6C-c1 first screen, 6D-b four places, 6E-a proof, 6F-a enquiry, 6H-a mobile first screen. |
| 15 Sep 2026 | Audit and brainstorm (page structure) | **Approach B chosen: the giant opens, the work leads.** Every service behind one door, both buyers, "describe your workflow", Vodafone Three client proof, collaborative logos, Databricks claim removed. Sections 1 and 2 approved, 3 to 6 open, brainstorm paused. Brief: `BRIEF-HYBRID-PAGE.md`. |

Status: **approved and implemented on branch `feat/ai-hd-shoulder` (14 September 2026).** ScreenCraft packets in `screencraft/`, text-free art in `assets-textfree/`, live page at the local preview (port 3108). Typecheck, 20 unit tests and `next build` pass; desktop 1440 and mobile 390 captured, no horizontal overflow. Not merged, not deployed: that needs the founder's go. ScreenCraft stays out until the founder calls a round-5 (or later) image the screen to build.

## Rejected rounds are not in git

Founder rule, 17 September 2026: rejected design rounds and contact sheets are never committed (this repository is public and every clone would carry them). The approved images stay here; everything else from rounds 1–6 and the stage-entry boards A/C is archived outside git at `~/dev/hyperdrift/.growth/design-archive/orchestra-2026-09-14-rejected-rounds.zip` (150 files). History on `feat/ai-hd-shoulder`, `feat/ai-hd-primary-destination` and both tags was rewritten on 17 September to drop them before the first push.
