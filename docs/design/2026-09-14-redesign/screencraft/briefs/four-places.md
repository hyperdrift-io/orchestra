# ScreenCraft brief — ai.hyperdrift.io, On the shoulder

Status: **approved by the founder on 14 September 2026** (SELECTION.md, round 6). This image is the visual contract for one screen. Analyse it to implement it; do not propose a different design.

Mission: Hyperdrift fits AI inside a founder's running SaaS business and drives it to prosperity. The visitor, a technical founder or CTO, should feel they stand on the shoulder of a giant who understands their business. The giant is Hyperdrift: immense, calm, attentive, going where the founder points. Prosperity is the lit country and the waking city. Voice Covenant, meta/PHILOSOPHY.md section 8, Speak to Enable: every word leaves the visitor more capable; no shame, fear, hype or invented metrics.

The image is one screen, full bleed photographic art with typography laid over it. It is not a device frame. Source dimensions are the raster; the CSS viewport is unknown, so leave viewport_css_px null. Separate artwork (the photograph) from live text: every word in the image becomes real HTML text over a text-free version of the art, never baked into an image. Existing app: Next.js 15, server components, pure cascading CSS (no Tailwind, no CSS-in-JS, class as last resort), data from src/data/situations.ts and src/data/case-studies.ts, enquiry via the existing contact form. Navigation is absent from the image by design; propose only a minimal masthead that does not compete with the art, marked as a proposal.

Record for the typography: a quiet high-contrast serif for statements, a clean sans for small lines; identify candidates, do not claim the exact font. Record focal relationships: the tiny founder on the giant's shoulder must stay visible at every width; text must never sit across the founder or the giant's face.

## Screen: the four places (the stage entry)

Fixed content, in order: Finding a useful first step · Automating a workflow · Taking a prototype live · Improving a live product. Each place, when chosen, reveals its response from src/data/situations.ts: heading, who it serves, one enquiry action, two inspectable examples with their organiser credit, and a folded "How we would approach it".

Artwork: the giant's stone head in profile at the left, the founder on its shoulder pointing; the landscape holds four places left to right, a light on a hill, water channels into fields, a bridge, the city.

Behaviour: the four labels are the stage entry. One place open at a time; choosing a place lights it (the sunlight beam moves or the place brightens) and reveals its response. Native primitive preferred (details with a shared name, or radio inputs); full keyboard and touch; labels readable at 390px where the places stack; reduced motion changes state instantly. Each response's action prefills the enquiry form's "Where you are".
