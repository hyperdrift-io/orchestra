# ScreenCraft brief — ai.hyperdrift.io, On the shoulder

Status: **approved by the founder on 14 September 2026** (SELECTION.md, round 6). This image is the visual contract for one screen. Analyse it to implement it; do not propose a different design.

Mission: Hyperdrift fits AI inside a founder's running SaaS business and drives it to prosperity. The visitor, a technical founder or CTO, should feel they stand on the shoulder of a giant who understands their business. The giant is Hyperdrift: immense, calm, attentive, going where the founder points. Prosperity is the lit country and the waking city. Voice Covenant, meta/PHILOSOPHY.md section 8, Speak to Enable: every word leaves the visitor more capable; no shame, fear, hype or invented metrics.

The image is one screen, full bleed photographic art with typography laid over it. It is not a device frame. Source dimensions are the raster; the CSS viewport is unknown, so leave viewport_css_px null. Separate artwork (the photograph) from live text: every word in the image becomes real HTML text over a text-free version of the art, never baked into an image. Existing app: Next.js 15, server components, pure cascading CSS (no Tailwind, no CSS-in-JS, class as last resort), data from src/data/situations.ts and src/data/case-studies.ts, enquiry via the existing contact form. Navigation is absent from the image by design; propose only a minimal masthead that does not compete with the art, marked as a proposal.

Record for the typography: a quiet high-contrast serif for statements, a clean sans for small lines; identify candidates, do not claim the exact font. Record focal relationships: the tiny founder on the giant's shoulder must stay visible at every width; text must never sit across the founder or the giant's face.

## Screen: first screen (desktop)

Fixed content:
- H1: Stand on the shoulders of a giant who understands your business.
- Sub line: Where are you taking AI next?
- Proposal: one primary action leading to the four places below, and a quiet "Start a project" in the masthead.

Artwork: the granite giant seen from behind in mid-stride toward the waking city, the founder on its right shoulder pointing, villages grown in its footprints in the foreground.

Behaviour: the first screen is fully useful without motion. Optional slow parallax or none; reduced motion gets a still. The primary action moves focus to the four places.
