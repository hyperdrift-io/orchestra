# Integrated Fleet article — release candidate, 24 October 2026

Yann approved this wording on 24 October 2026, including the three choices marked as his call; `publishedAt: 2026-10-24T02:11:00Z`. The contribution in one sentence, in his words: **“Here’s the new deal. UI is for intel. Agents are for operating.”** Everything on the page serves that proposal and the one real proof behind it, the local Stack One recovery test.

Preview: http://127.0.0.1:18194/articles/agent-driven-ui-intelligence-and-action (existing dev server on port 18194, not production).

## What this article says that the 6 October UI series does not

The series argued that UI can be a barrier, that agents should not hunt for buttons, and that a task should survive a change of interface. The First Officer showed a UI that reports before being asked. This article makes the operating proposal: agents run the apps and the servers under them within a policy; the UI exists to give us the intel, show the work done and take a new instruction; a new capability adds something to read and something the agent may do, not a control panel. It carries the only recorded repair so far and says plainly what is still to be built.

## Exact copy

Body: [content/articles/agent-driven-ui-intelligence-and-action.md](../../../content/articles/agent-driven-ui-intelligence-and-action.md) (427 words, 2 min read). Catalogue entry: `src/data/articles.json`, slug `agent-driven-ui-intelligence-and-action`. Visual: `src/components/visuals/IntelUiLoop.tsx`.

| Surface | Candidate |
|---|---|
| Title (H1, OG title, share title) | Here’s the new deal. UI is for intel. Agents are for operating. |
| Browser and search title | UI is for intel. Agents are for operating. \| Integrated Fleet — Orchestra AI |
| Excerpt, description, OG description | We’re building Integrated Fleet: agents operate our apps and the servers they run on. The UI gives us the intel, shows the work done and lets us direct it. |
| Share line (OG image headline) | UI is for intel. Agents are for operating. |
| OG image footer | Integrated Fleet · Local recovery test · wider fleet in development |
| Topic / example | UI and operations / Integrated Fleet |
| Tags | agents, ui, operations |
| Header mesh alt | Connected wireframe eye, wrench, book forms in Orchestra's mesh style. |
| Visual header | STACK ONE · LOCAL TEST · 24 OCTOBER 2026 — Previous release restored |
| Visual checks | 1 Broken content detected: The running release failed its content check. · 2 Still failing: Thirty seconds later. One more failure triggers the rule. · 3 Rollback completed: The retained release is serving. Nginx response verified. |
| Visual result and footer | The recovery policy performed the repair. No dashboard action or model call. · Recorded on a local test server, not in production. Read the test record ↓ |
| Figure caption | Three failed content checks triggered rollback. The local Nginx response was verified without a dashboard action. Save the visual ↓ |
| Test details | A record of the local Stack One recovery test on 24 October 2026. The checks ran at least thirty seconds apart. The third failure triggered the fixed recovery policy, which restored the retained release and checked the response. No model made the decision and no production server was involved. · Reviewed 24 October 2026 · Local test record · no production deployment. |
| Contents entry for the figure | Stack One: automatic recovery, verified locally |
| Door label | Discuss your app fleet |
| Invitation | Tell us what you run and what still needs your attention. We’ll look at what the apps and infrastructure could handle together. |
| Read next | Your app works. Who runs it now? (`app-operations-after-launch`) |

Captures: [desktop](desktop-preview.png), [phone visual](phone-visual.png), [OG card](opengraph-preview.png), [visual export](visual-export.png) (also served at `/articles/integrated-fleet/intelligence-ui-loop.png`). Public test record: `/articles/integrated-fleet/local-recovery.json`.

## Changes from the 24 October draft, with the reason

Body

1. Paragraph 2 — “agents working with the app's purpose, releases and server health together, able to follow the work from an app to the server it runs on” → “agents that know an app's purpose, its releases and the health of the server it runs on, and can follow a problem from one to the other.” Plainer sentence; “follow a problem” is what the operator actually does.
2. New paragraph 3 — “Our First Officer already reports before we ask. Integrated Fleet is the work behind that report.” Places the article against the published series in one line and links the reader to it. **Yann’s call:** keep or cut.
3. Heading — “Our apps and infrastructure can work together” → “One operator can see the app, its release and its server”. The old heading could head any vendor page; the new one states the concrete observation the section makes.
4. “allocate resources accordingly” → “give capacity to the apps that earn it”. Concrete verb, same meaning.
5. “This should be practical for a founder or a small tech hub running its own services. We see an opportunity to build a credible self-hosted alternative to AWS, GCP and Azure for those operators, using infrastructure they choose and tools they can control.” → “This should be practical for a founder or a small tech hub running its own services, on infrastructure they choose, with tools they control. That is the alternative we want to build.” The named-provider comparison appears in none of the source records (opportunity research, Integrated Fleet record, philosophy); a local rollback test does not yet support it. The conviction stays. **Yann’s call:** if the AWS/GCP/Azure line is his, it goes back in his words.
6. Added after “we can give it a new instruction” — “A new capability adds something to read and something the agent may do. It doesn't need a new control panel.” This is the UI ruling in `meta/PHILOSOPHY.md` (UI and agents) and the one claim the UI series never made.
7. Everything else in the body is unchanged: the opening paragraph, the HD experiments paragraph, the three-access paragraph, the Stack One test, the fixed-rule paragraph and the Ansible/Nginx close.

Visual (also re-exported as PNG)

8. Check 1 — “failed verification” → “failed its content check”, the same words as the body and the caption.
9. Check 2 — “Wait for the third check.” → “One more failure triggers the rule.” States the policy (three consecutive failures) instead of an instruction to a reader.
10. Footer — “Recorded locally. Replacement VPS not commissioned.” → “Recorded on a local test server, not in production.” A reader does not know our replacement server; “not in production” is the fact that matters.

Catalogue and page

11. Excerpt rewritten (above). The old one, “connect our apps and infrastructure through agents… lets us direct the service”, was abstract; the new one says who does what.
12. “fault drill” → “recovery test” and “LLM” → “model” in the proof and test-details text, so every surface uses the body’s words.
13. Tag `permissions` removed; the article does not discuss permissions. The tag page keeps its three published articles.
14. `reviewedAt` removed from the entry. On this page it rendered “Evidence reviewed 24 October 2026 · Method and maintenance” linking to the UI series method page, which does not cover this article. The figure keeps its own “Reviewed 24 October 2026”.
15. Read next → “Your app works. Who runs it now?” instead of “Your work should survive a change of interface”. The operations article is the natural continuation and carries the Orchestra OS offer; the future-UI preview is a different series. **Yann’s call.**

Unchanged on purpose: title, share line, OG image, door label, invitation, mesh header, test record JSON, `publishedAt: null`.

## Checks on this candidate (not acceptance)

- `check_copy.py` on the body, the catalogue strings and the visual component: no listed wording.
- Served page: `noindex, nofollow`, canonical `https://orchestra.hyperdrift.io/articles/agent-driven-ui-intelligence-and-action`, OG/Twitter title and description match the table, internal links to First Officer, the operations article and the test record all return 200. No console errors. No horizontal overflow at 390px.
- `npm run typecheck` passed after the catalogue change.

## Outside this article

“A personal reply within one working day.” sits under every article invitation and in the enquiry dialog (site template, approved 6 October with the Traction offer). The 19 October door ruling asks for no reply-time promise. That is a site-wide decision for Yann, not a change made here.

## After approval

Set `publishedAt`, deploy through the ordinary Orchestra release path, then read back the live page, OG card, canonical, sitemap, feed and llms.txt. Builder owns that read-back; GM then follows discovery through the Traction initiative recorded in the HD handoff, section 4.
