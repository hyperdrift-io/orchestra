# Stage-aware AI entry — design approval brief

## Mission and correction
The visitor should feel: “They understand where I am, and I can see what to try next.” The founder rejected a long static brochure. ai.hyperdrift.io is the primary destination. Preserve Orchestra AI's Concert Hall × Lab Notebook identity; change how the visitor finds relevant help. This is not a brand reset.

NextRole reference inspected in the live browser on 14 September: “Which one are you?” uses closed native disclosures for After a layoff, Returning from a break, Pivoting industries, Applying at volume. Opening Pivoting industries reveals two short specific paragraphs and “Add the role you’re aiming for”. Its main entry also offers actionable one-tap role choices, with inline results. Transfer the situation → useful response → action pattern, not its career copy or cream colour scheme.

## Fixed visual contract for exactly three images
Generate one final image per direction, exactly three total. A board contains a desktop page at 1440px design width and a mobile 390px design width side by side, both showing the same selected situation and the same content. Keep main content readable rather than fitting a huge page into one board. Deliver PNG with metadata and full prompt in this directory, no UI edits. Use Recraft canonical CLI, model recraftv4_1_utility_pro, aspect 2:3, seeds 101 / 102 / 103. Main agent curates; three parallel designers each own one image. Workspace exact-three instruction overrides the skill's generic multiple-trials suggestion.

Brand: ink #0c0c10, raised ink #14141c, cream #f0e9da, vermillion #ff4a1c. Fraunces serif display with expressive italic vermillion words; IBM Plex Sans readable body; IBM Plex Mono tiny labels. Thin staff lines, restrained four-pixel corners, outlined italic movement numerals. Preserve original conductor/automation orchestra art as a small cinematic band if room; it must not push the useful interaction below the fold. No invented metrics, logos, endorsements or new brand. Editorial musical identity rather than generic dashboard cards.

Voice Covenant — meta/PHILOSOPHY.md §8 Speak to Enable: every word must leave the user more capable; strengths first, no shame or fear. User work is source of truth. All displayed claims below are grounded. Do not add unverified claims.

## Identical copy and content skeleton
Masthead: “Orchestra AI” / “BY HYPERDRIFT”. Navigation “Intel ↗”, “Writing ↗”, “Partner with us”. Anniversary slender visible link “Hyperdrift turns one — read the story ↗”.
Hero: “Where are you taking AI next?” (serif, AI next italic vermillion).
One sentence: “Choose where you are. See the work, then take your next step.”
Situation choices (same order; second selected for comparable expanded state):
01 “Finding a useful first step”
02 “Automating a workflow”
03 “Taking a prototype live”
04 “Improving a live product”
Selected response eyebrow “02 / AUTOMATING A WORKFLOW”. Heading “Give your team time back.”
Response “For teams with a working product or a repeatable task. Connect the tools you already use, with people in control.”
Primary action “Map my workflow ↗”. This opens a stage-prefilled enquiry in implementation, never an invented automated audit.
Two compact evidence items with immediately visible links:
“Standup” / “A GitHub brief: who is waiting, and what to do first.” / “Built for Amazon Web Services · Agents for Humans” / “Try Standup ↗” and “Read the build ↗”.
“Deputy workforce MCP” / “Five read-only workflows over an existing workforce API.” / “Reference integration” / “Inspect the integration ↗”.
Closed disclosure “How we would approach your workflow +”.
Then compact current-content area, two columns desktop/stack mobile:
“INTEL / DAILY BRIEF” / “The latest AI briefing” / “Read Intel ↗” (do not invent news headline or current date).
“LATEST WRITING” / “You have one evening. Who is waiting on you?” / “Read the article ↗”. This is the current captured article, fetched from feed in implementation.
Distinct slim partnership invitation, visible not deeply buried:
“THE TRACTION PARTNERSHIP” / “Build together. Share the upside.” / “Apply to partner ↗”. Closed “How the partnership works +”.
Bottom compact closed disclosures: “More work & collaborations +”, “Services, delivery & pricing +”, “Common questions +”.

All three show this same skeleton and selected state; vary ONLY situation navigation layout:
A: Horizontal four-choice tabs above one shared response, mobile 2×2 choices. Fast comparison, strongest immediate action.
B: Four typographic accordion rows, second expanded with response and examples inside. Closest NextRole reference, all other stages visibly collapsed, no duplication of selected heading. Recommended for fidelity to user request and minimal machinery.
C: Desktop left stage rail, right selected response, mobile compact stage selector followed by response. Stable navigation alongside evidence, slightly more interface.

## Four stage mappings for eventual implementation
| Situation | Who / useful outcome | Evidence and visible actions | Enquiry action |
|---|---|---|---|
| Finding a useful first step | Founder or team exploring where AI can improve real work; select one bounded use case | Intel: https://intel.hyperdrift.io/daily — Read the briefing; unanswered: https://unanswered.hyperdrift.io — Try skill matching; https://hyperdrift.io/blog/open-source-routing-problem-unanswered-asks — Read the build | Find my first use case |
| Automating a workflow | Team with repeatable work or existing APIs; connect tools with controlled access | Standup https://standup.hyperdrift.io — Try Standup; https://hyperdrift.io/blog/one-evening-who-is-waiting-on-you — Read the build; Deputy https://github.com/hyperdrift-io/deputy-workforce-mcp — Inspect integration | Map my workflow |
| Taking a prototype live | Founder or engineer with a working demo; agree boundaries, auth, delivery and observable behaviour | uk.gov Radar https://radar.hyperdrift.io/explore — Explore WebMCP; https://hyperdrift.io/blog/the-agent-is-the-session — Read the build; own-stack https://own-stack.hyperdrift.io — Explore the stack | Review my prototype |
| Improving a live product | Team already serving users; investigate friction and scope next improvement | Helm https://helm-294160018950.europe-west1.run.app — Try fleet diagnosis; https://hyperdrift.io/blog/your-error-page-is-a-prompt — Read the build; NextRole https://nextrole.site — Try the entry flow | Discuss my live product |

These are examples of relevant capabilities, not claims of measured client ROI. Every evidence item must have an honest public CTA. Bridge Voice remains in the complete collaborations catalogue as In development with an event link and enquiry action; no private demo link. All five contest entries retained with exact organiser/event/stage attribution from docs/decisions/2026-09-14-contest-attribution.md. A participation credit is not an endorsement.

## Behaviour contract
Situations are self-selected, reversible and linkable. No forced quiz, account, email, fabricated readiness score, or hidden browsing prerequisite. Entry starts with all stages closed for B; first user expansion shows its outcome, evidence and action. Primary enquiry carries the chosen stage into a visible editable field. Supporting technical detail, full catalogue, delivery/pricing and FAQs are closed by default. Core value, examples, their links, Intel/latest writing and partnership CTA stay visible in the relevant state. Mobile controls must retain readable labels and real tap targets.

Blog and Intel use published server-side content with a short cache, source dates and honest stale/error fallbacks. The anniversary is pinned independently of “latest”. No auto-generating Intel briefs on homepage visits. Preserve existing public article URLs and contact relay until a separate migration.

## Approval status
Pending. Exactly three high-fidelity boards before JSX/CSS/assets per workspace AGENTS.md and designer skill. Existing preview http://127.0.0.1:3108 remains unchanged during design approval.
