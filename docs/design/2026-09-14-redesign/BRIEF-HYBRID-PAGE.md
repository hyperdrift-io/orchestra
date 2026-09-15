# ai.hyperdrift.io: hybrid page brief

15 September 2026. Brainstorm with the founder, **paused at their request to simplify**. Sections 1 and 2 are approved; sections 3 to 6 are open. Nothing is implemented from this brief yet.

Voice Covenant, `meta/PHILOSOPHY.md` section 8, governs every line of copy drafted here: enable, never diminish; no invented numbers, endorsements or awards; sound human.

## Why the page changes

The implemented On-the-shoulder page (branch `feat/ai-hd-shoulder`) passed its design gate but an audit on 15 September found it converts poorly for a services site:

- The first screen does not say what Hyperdrift sells or how an engagement starts.
- Three full-screen art bands carry almost no persuasion and no call to action.
- The strongest proof sits below the art or folded away.
- Text over bright art fails WCAG contrast: masthead, "Choose where you are", the four place labels.
- No analytics are wired, so nothing can show where visitors leave.

## Founder decisions

1. **Structure: approach B, "the giant opens, the work leads".** A shorter giant first screen with the offer and the door, then latest work, then how we help, then the enquiry.
2. **Breadth: keep every service, one door.** A single first step for every visitor; the services stay visible behind it.
3. **Buyer: both situations.** SaaS teams adding AI to their product, and companies putting AI into their own workflows. Orchestra's `MISSION.md` customer section gets rewritten to say so; its refusal of work outside the ideal customer becomes a quality rule: we do not take work we cannot get into production.
4. **The door: describe one workflow.** The existing enquiry form, reframed. Promise: a written read within one working day on whether it is a fit and what the first step is. Each submission records which of the four places the visitor came from.
5. **Client proof:** "Data and AI platform engineering for Vodafone Three, through Tecknuovo." Shown as current client work, above the contest builds. No rates or contract details, ever.
6. **Logos show collaboration and industry reach.** Each piece of work shows the company it was built for or with. Constraints: a client logo needs written permission (check the signed Tecknuovo contract for a publicity clause, or ask); AWS and similar trademark rules forbid implying sponsorship or endorsement, so contest organisers appear by name with "Built for" unless an event supplies a participant badge. Industry tags such as telecom, workforce, public sector and open source signal reach where a logo cannot be used.
7. **Databricks:** remove "Sponsored by Databricks". The only link on file is Databricks Free Edition use for Telecom Horizon.
8. **Deputy MCP** appears as a published reference integration, not a customer delivery. Live Deputy mode still awaits a customer sandbox.

## Approved sections

### Section 1: positioning and the door

- One practice, two situations, as in decision 3.
- The difference, repeated everywhere: AI that reaches production and holds up, with clear permissions, evidence of what each agent did, and code you own. Proof: Hyperdrift's own fleet, the Vodafone Three work, public builds.
- Offer line, draft: "We build AI agents and integrations into the products and workflows you already run, and get them to production."
- Door button: "Describe your workflow". Promise beside it: a written read within one working day. Supporting lines already in use: "You keep the code", "No decks, no discovery theatre."

### Section 2: the first screen

- Keep the approved giant art (`round6-repair/6C-c1.png`, mobile `6H-a.png`) and the statement "Stand on the shoulders of a giant who understands your business."
- Add the offer line under the statement.
- Primary button "Describe your workflow"; quiet "See the work" link beside it.
- "Where are you taking AI next?" moves to open the services section.
- Desktop height about 80% of the window so the latest-work row peeks above the fold. Anchor the art to its top edge: the founder sits in the top 9% of the image; only the lowest footprint villages lose a little. Phones keep full height with the offer and button in thumb reach.
- Masthead: Work, Services, Intel ↗, Writing ↗, and a small "Describe your workflow" button. "Partner with us" moves into the enquiry section. A soft dark gradient behind the masthead fixes its contrast.
- Reuses approved art and changes only live text and height, so no new concept image is needed.

## Open sections

3. **Latest work.** Newest first by ledger date: Vodafone Three line, then Standup (submitted 14 Sep, Built for Amazon Web Services), unanswered (DEV, Google AI category), uk.gov Radar (OpenAI), Helm (Google), Deputy MCP reference integration. Card content, logos and permissions, industry tags, live links.
4. **How we help.** The four places reframed as services, each with scope and one matching example, opened by "Where are you taking AI next?"
5. **The enquiry.** The door form, its promise and risk reducers, the Traction Partnership placement.
6. **After the form.** Now playing moved below the form, the folded material, footer; PostHog events (place chosen, button clicks per section, enquiry started and sent); accessibility baseline (skip link, specific link names, 44px targets, new-tab wording, heading levels, clickable proof markers).

## Next, in order

1. Finish sections 3 to 6 with the founder.
2. Concept images for the new layouts in sections 3 to 5, submitted as candidates. Founder rule: concept images first, ScreenCraft only on the pick (`meta/skills/design-crafter/SKILL.md`).
3. ScreenCraft maps the pick; implement on a branch from `feat/ai-hd-shoulder`.
4. Fold in the known fixes: Standup's stage label says "Built for the challenge" but it was submitted on 14 September.

## Sources

- Audit and brainstorm: this session, 15 September 2026.
- Contest dates: `.growth/contests/ledger.jsonl` in the HD workspace.
- Tecknuovo engagement: the admin skill's registry (relationship facts only).
- Deputy status: `apps/deputy-workforce-mcp/README.md` → Status.
- [AWS trademark guidelines](https://aws.amazon.com/trademark-guidelines)
- [Client logo permission, three-factor test](https://testimonials.io/blog/can-i-use-client-logos-on-my-website)
