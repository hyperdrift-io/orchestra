# Round 2 — soul, under the growth register

Operator brief (founder, 14 September, after round 1): **"Too generic. No soul. We're here to fast track growth via AI integration. It's a clear path that leads to profit. We're also disrupting the old ways and moving to 10x productivity with a proven track record."**

Round 1 read as AI-made templates. All three metaphors (desk, map, console) were polite; none had a stance. Round 2 varies ONE axis: identity intensity under the founder's register. Same structure, one changed message layer, three new directions that each look like something only Hyperdrift could ship.

## The register (put in every prompt)

Hyperdrift is a challenger. It fast-tracks a SaaS founder's growth by integrating AI inside the product they already run: agents, MCP integrations, workflows with people in control. The path is clear and it leads to profit. The old way is decks, discovery theatre, a new framework every quarter, a team paused to retrain. The new way is agents shipped inside the live product in weeks, by engineers who run their own fleet and build in public. Proof, not promises: Standup, Helm, uk.gov Radar and unanswered were built for AWS, Google, OpenAI and DEV challenges; the fleet ships weekly; the engineering is published.

Voice Covenant still governs: bold is allowed, hype is not. No invented numbers ("+300%", "10x" as a statistic), no logos of companies that are not organisers of a challenge we entered, no testimonials, no awards. Stance lines are copy; metrics are forbidden.

## Locked skeleton (identical in all nine trials; one layer changed from round 1)

Board: portrait 2:3, desktop 1440 page left, 390 mobile page right, same state, readable, no device frames.

1. Masthead "Orchestra AI" / "By Hyperdrift". Nav: Intel ↗ · Writing ↗ · Partner with us · Start a project. Slender: "Hyperdrift turns one — read the story ↗".
2. Hero, NEW: statement "AI inside your product is the fast track to growth." then the question "Where are you taking AI next?" then "Choose where you are. See the work, then take your next step."
3. Proof strip, NEW: "Proven on our own fleet — Standup · Helm · uk.gov Radar · unanswered. Built for AWS, Google, OpenAI and DEV challenges. Shipped weekly, published openly."
4. Four situations: 01 Finding a useful first step · 02 Automating a workflow · 03 Taking a prototype live · 04 Improving a live product. 02 open: "Give your team time back." / "For teams with a working product or a repeatable task. Connect the tools you already use, with people in control." / "Map my workflow ↗" / evidence "Standup — A GitHub brief: who is waiting on you, and what to do first. Built for Amazon Web Services · Agents for Humans. Try the agent ↗ · Read the build ↗" and "Deputy workforce MCP — Five read-only workflows over an existing workforce API. Reference integration. Inspect the integration ↗" / closed "How we would approach it +".
5. Old way / new way, NEW, two short columns: "The old way — Decks. Discovery theatre. A new framework every quarter. Your team paused to retrain." / "The new way — Agents shipped inside your live product, in weeks. People in control. Engineers who run their own fleet."
6. Now playing: "Intel · Daily brief — Intel Daily, 13 September 2026 — Read the briefing ↗" · "Latest writing — You have one evening. Who is waiting on you? — Read the article ↗" · "Our first year — Hyperdrift turns one — Read the story ↗".
7. "The Traction Partnership — Build together. Share the upside. — Apply to partner ↗" + closed "How the partnership works +".
8. Five closed lines: What we build + · Why Orchestra, and how we work + · More work & collaborations + · Services, delivery & pricing + · Common questions +.
9. Contact "Start a project." — Where you are (select), Name, Email, Company, What do you want to ship?, "Send enquiry ↗".

## Three directions — three ways to have a spine

Each must be recognisable from a thumbnail. Each gives the four situations a physical form (round 1 lesson: a text row has no identity).

### D — The fast track (momentum)
A poster, not a page. Huge condensed grotesk, black and white with one electric signal colour, a single diagonal track that cuts the whole desktop page from bottom-left to top-right. The four situations are four stops on the track, set as giant numerals; 02's panel sits on the track. Proof strip runs along the track like livery. Old way / new way is a hard split: old way struck through. Feels like a racing livery meets a Swiss transport poster. Fast, confident, zero decoration that is not the track.

### E — The receipts (proven track record)
The proof IS the hero. A shipping board: a dense, industrial wall of what was built, each entry dated, with organiser credit, stamped "SHIPPED" or "IN DEVELOPMENT". Stencil or industrial grotesk, safety-orange on concrete grey, hazard-stripe rules, ink stamps. The four situations are four work orders pinned to the board; 02's order is opened. Old way / new way is a red-stamped column. Feels like the floor of a factory that ships every week. Warm, human, physical.

### F — The manifesto (disruption)
An editorial front page that picks a fight with the old way. Giant serif or slab headline typography, newsprint or bone paper, red ink, strikethroughs and margin marks, one photographic or collage element that is real work (a terminal, a diff, a device). The four situations are a numbered manifesto list with 02 unfolded into a column. The proof strip is a masthead-style byline. Old way / new way is the centrepiece: the old way literally crossed out. Feels like a challenger's pamphlet, not a magazine ad.

## Generation contract

- `scripts/generate-recraft-asset.mjs` from the workspace root, `--size 2:3 --metadata`, key from `.env`.
- Per direction: two trials on `recraftv4_1_utility_pro`, one on `recraftv4_1_pro` (atmospheric take, same copy). Seeds D 201–203, E 204–206, F 207–209; the `_pro` trial is the last seed of each block.
- Output `round2-soul/<D|E|F>-<seed>.png` + sidecar; prompt saved as `<D|E|F>-<seed>.prompt.txt`.
- Prompts carry the register, the full skeleton copy verbatim and the direction. Copy identical within a direction; vary only seed, model and small emphasis.
- Each direction returns its strongest board, one-line rejections, and any invented content (numbers, logos, awards, sections).

## Gate

Founder picks a direction or names the next axis. Then ScreenCraft maps the chosen board and the CSS plan is reviewed before any app file changes.
