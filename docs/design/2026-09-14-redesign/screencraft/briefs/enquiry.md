# ScreenCraft brief — ai.hyperdrift.io, On the shoulder

Status: **approved by the founder on 14 September 2026** (SELECTION.md, round 6). This image is the visual contract for one screen. Analyse it to implement it; do not propose a different design.

Mission: Hyperdrift fits AI inside a founder's running SaaS business and drives it to prosperity. The visitor, a technical founder or CTO, should feel they stand on the shoulder of a giant who understands their business. The giant is Hyperdrift: immense, calm, attentive, going where the founder points. Prosperity is the lit country and the waking city. Voice Covenant, meta/PHILOSOPHY.md section 8, Speak to Enable: every word leaves the visitor more capable; no shame, fear, hype or invented metrics.

The image is one screen, full bleed photographic art with typography laid over it. It is not a device frame. Source dimensions are the raster; the CSS viewport is unknown, so leave viewport_css_px null. Separate artwork (the photograph) from live text: every word in the image becomes real HTML text over a text-free version of the art, never baked into an image. Existing app: Next.js 15, server components, pure cascading CSS (no Tailwind, no CSS-in-JS, class as last resort), data from src/data/situations.ts and src/data/case-studies.ts, enquiry via the existing contact form. Navigation is absent from the image by design; propose only a minimal masthead that does not compete with the art, marked as a proposal.

Record for the typography: a quiet high-contrast serif for statements, a clean sans for small lines; identify candidates, do not claim the exact font. Record focal relationships: the tiny founder on the giant's shoulder must stay visible at every width; text must never sit across the founder or the giant's face.

## Screen: the enquiry

Fixed content:
- H2: You say where. We go.
- The existing enquiry form: Where you are (select, prefilled by a chosen place), Name, Email, Company (optional), What do you want to ship?, button "Send enquiry".
- The Traction Partnership invitation: Build together. Share the upside. Apply to partner (terms folded).
- Footer with Hyperdrift attribution.

Artwork: the giant's face lowered attentively toward its own shoulder, where the small founder stands pointing at the city across golden country.

Behaviour: the form must never cover the founder or the giant's face; at narrow widths the art sits above the form. Native validation and focus states; the selected place stays editable; no auto-submit.
