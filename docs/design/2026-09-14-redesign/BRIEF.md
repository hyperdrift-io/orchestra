# ai.hyperdrift.io — open redesign, round 1: identity

Founder instruction, 14 September 2026, after tagging `stage-entry-b-2026-09-14`: "use screencraft for a brand new redesign", scope confirmed as **open exploration**. The Concert Hall × Lab Notebook identity (Fraunces/Plex, ink/cream/vermillion, movement numerals) is retired for this round. Fonts, palette, artwork and rhythm are all on the table. What is fixed is the content, the mission and the interaction the founder already approved: a stage entry, not a brochure.

## Mission substance (put this in every prompt, not a pointer to it)

Orchestra AI is Hyperdrift's AI engineering practice: agents and MCP integrations built inside the vertical SaaS a founder already runs. Buyer: a technical founder or CTO at a Seed to Series B B2B SaaS. Their product works; customers and competitors push them toward AI features now; they cannot pause the roadmap or ship something that breaks multi-tenancy, audit or cost discipline. Hyperdrift runs its own fleet of products, enters public build challenges, and publishes its engineering. Credibility is shown work, never claims.

The visitor should feel: **"They understand where I am, and I can see what to try next."** The relationship is founder to founder across a desk. No theatre, no decks, no hype.

Voice Covenant (`meta/PHILOSOPHY.md` §8, Speak to Enable): every word leaves the user more capable; strengths first; no blame, shame, fear or manufactured urgency; the user's work is the source of truth; sound human, kill agent patterns. Models invent metrics, logos and testimonials: any that appear are layout-approved, value-forbidden.

## Locked comparability skeleton (identical copy in all nine trials)

Board: portrait 2:3, one desktop page at 1440 design width on the left and one 390 mobile page on the right, both readable, not device mockups, same state and content.

1. Masthead: "Orchestra AI" with "By Hyperdrift". Navigation: Intel ↗ · Writing ↗ · Partner with us · Start a project. Slender link: "Hyperdrift turns one — read the story ↗".
2. Hero question: "Where are you taking AI next?" One sentence: "Choose where you are. See the work, then take your next step."
3. Four situations, in order: 01 Finding a useful first step · 02 Automating a workflow · 03 Taking a prototype live · 04 Improving a live product. 02 is selected/open and shows: heading "Give your team time back." body "For teams with a working product or a repeatable task. Connect the tools you already use, with people in control." primary action "Map my workflow ↗". Two evidence items: "Standup — A GitHub brief: who is waiting on you, and what to do first. Built for Amazon Web Services · Agents for Humans. Try the agent ↗ · Read the build ↗" and "Deputy workforce MCP — Five read-only workflows over an existing workforce API. Reference integration. Inspect the integration ↗". A closed line "How we would approach it +".
4. Now playing, three compact items: "Intel · Daily brief — Intel Daily, 13 September 2026 — Read the briefing ↗"; "Latest writing — You have one evening. Who is waiting on you? — Read the article ↗"; "Our first year — Hyperdrift turns one — Read the story ↗".
5. Partnership: "The Traction Partnership — Build together. Share the upside. — Apply to partner ↗", closed line "How the partnership works +".
6. Five closed lines: What we build + · Why Orchestra, and how we work + · More work & collaborations + · Services, delivery & pricing + · Common questions +.
7. Contact: "Start a project." with fields Where you are (select), Name, Email, Company, What do you want to ship?, button "Send enquiry ↗".

How the four situations are presented (rows, cards, map, switchboard, tabs) is FREE in this round; what is fixed is that all four are visible, 02 is open with its evidence and action beside it, and the response sits with its situation.

## Three directions — three different answers to "what is Hyperdrift to the visitor"

Each direction is one relationship, expressed through composition, type, colour, artwork and the shape of the situation entry. Not three palettes of one aesthetic.

### A — The shared desk (collaborator)
Hyperdrift sits at the founder's desk. Daylight, paper and pencil, real working artefacts as the imagery: a printed brief with margin notes, a terminal transcript, a diff, a sticky note. Warm off-white paper, graphite text, one ink accent. A humanist grotesk for reading plus a monospace for artefacts; no display serif. The four situations are four physical things on the desk (a note card, a folder tab, a printout) and the open one is unfolded. Dense but calm, like a well-run engineering notebook. Evidence items look like real screenshots or clippings pinned to the page.

### B — The route map (guide)
Hyperdrift shows the visitor the road from where they stand. Cartographic: contour lines, a route with four stations, the visitor's marker on station 02. Muted field tones (moss, slate, sand) with one signal colour for the route and actions. A geometric sans for wayfinding labels, condensed numerals for stations. The situations are stations on the route; the open station expands into a panel beside the map with its response, evidence and action. Now playing and partnership are signposts further along the road. Mobile: the map becomes a vertical route with the stations stacked.

### C — The control room at dusk (co-pilot)
Hyperdrift watches the signals with the founder. Calm operational: a wide, dim surface with a few live readouts, amber and phosphor-green on deep blue-black, thin instrument rules, real dated feeds. A tight technical sans with tabular figures. The four situations are four switches or channels on a console; channel 02 is lit and its response, evidence and action appear in the adjacent readout panel. Now playing is literally live: Intel edition date, latest article, anniversary as a pinned light. Nothing sci-fi or gamer: the atmosphere is a well-lit engineering bridge at dusk, human and quiet.

## Generation contract

- `scripts/generate-recraft-asset.mjs` from the workspace root, `--model recraftv4_1_utility_pro --size 2:3 --metadata`, key from `.env`.
- Seeds: A 101–103, B 104–106, C 107–109. Output `round1-identity/<A|B|C>-<seed>.png` beside its JSON sidecar; prompt saved as `<A|B|C>-<seed>.prompt.txt`.
- One flowing prompt per trial, carrying the mission substance, the locked skeleton copy and the direction. Vary within a direction only by seed and small emphasis, never by copy.
- Each direction returns its strongest board plus one-line rejections of the others, naming invented metrics, missing skeleton items or garbled text.

## Gate

Founder picks a direction (or asks for a second round). Then ScreenCraft maps the chosen board (`hd screencraft analyze`, one screen at a time), the map and CSS plan are reviewed, and only then does implementation start on a new branch. Nothing here touches app files.
