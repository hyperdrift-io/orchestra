# Traction identity

Approved by Yann on 13 November 2026: the round-10 sail with its negative-space T and the round-15 flowing wordmark. These exports preserve their paths. White counters are transparent; all lettering is outlined.

| Use | Asset |
| --- | --- |
| Navigation, website, signatures | `lockup-light.svg` or `lockup-dark.svg` |
| Compact navigation, avatar | `symbol-light.svg` or `symbol-dark.svg` |
| Large centred composition | `stacked-light.svg` or `stacked-dark.svg` |
| Wordmark beside an existing sail | `wordmark-light.svg` or `wordmark-dark.svg` |
| Browser tab | Adaptive `favicon.svg`, PNG 16/32 and ICO fallbacks |
| iOS home screen | `apple-touch-icon.png` (180 px) |
| PWA | `icon-192.png`, `icon-512.png`, separate `icon-maskable-512.png` |
| Social sharing | `og-light.jpg` or `og-dark.jpg` (1200 × 630) |
| Standalone brand presentation | `article-hero.jpg` (1200 × 630); editorial articles retain their subject artwork |

Light and dark name the **background**, not the mark. SVG is preferred in the UI; PNG files provide transparent raster alternatives. JPEG share cards have opaque backgrounds. The presentation artwork uses Orchestra's ink background and a restrained gold horizon. `lockup-share.png` is the 260 × 44 overlay used by article share cards.

Keep the proportions. Leave at least one quarter of the sail's height clear around a lockup. Use a lockup at 180 px wide or larger; use the sail below that. The complete sail is retained in the checked 16 px favicon; its smallest counter is clearer at 32 px. Do not stretch the mark, alter its curves, add an arrow or recreate the wordmark with a font.

`theme.css` supplies brand colours: ink `#111315`, paper `#fbfaf6`, reverse `#f6eee1`, board `#0a111b` and accent `#e3a857`. Keep the host app's existing UI theme. Gold is a supporting colour, not an alternative logo fill.

Source masters and the export script live in the Traction repository: `design/logo-20261112/round-10/sail-open-t-black.svg`, `design/logo-20261112/round-15/wordmark.svg`, `scripts/export-brand.mjs`. Run the script with Node and an existing Sharp installation (`SHARP_MODULE` may name its module path). No production dependency is required. `manifest.json` records file hashes for matching the Traction and Orchestra copies.
