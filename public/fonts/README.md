# Orchestra fonts

These are the exact 26 WOFF2 files emitted by Orchestra's successful Next.js 15.5.28 build on 25 October 2026: Cormorant Garamond, IBM Plex Sans and IBM Plex Mono. `manifest.json` records each file's SHA256 and size. The 51 font-face declarations in `src/app/fonts.css` preserve every original weight, style, Unicode range and fallback metric. The layout preloads the same five Latin files. Existing CSS variables and typography are preserved.

Pinning the files removes Google Fonts from the build path. The Linux release failed in Next's Google loader when its extension-only URL parser returned null; the original response was not retained, and a later public response parsed successfully. Do not depend on a retry or patch installed Next code to conceal that failure.

The family licences are retained beside the assets, from Google Fonts revision `e7db6ca603fd4862010383ff17ffd6cc4ffac1c0` under `ofl/cormorantgaramond`, `ofl/ibmplexsans` and `ofl/ibmplexmono`. [Google Fonts source](https://github.com/google/fonts/tree/e7db6ca603fd4862010383ff17ffd6cc4ffac1c0/ofl). Update fonts deliberately from their licensed upstream, retain hashes and licences, and check glyph coverage, fallback metrics and preloads before release. Builds do not download fonts.

## Display face changed on 11 November 2026

The founder chose Bricolage Grotesque as the display face in place of Cormorant Garamond, which read too thin on the dark page. Its two variable WOFF2 files (Latin and Latin-extended, weights 400 to 700) come from `fonts.gstatic.com/s/bricolagegrotesque/v9`, fetched on 11 November 2026, with the licence from `ofl/bricolagegrotesque` in Google Fonts. Cormorant Garamond's ten files, its twenty font-face declarations and its licence were removed with it. The directory now holds 18 font files and `src/app/fonts.css` 33 declarations; `manifest.json` records each file's SHA256 and size. The layout preloads four Latin files. The face has no italic, so display emphasis is carried by colour.

Still in Cormorant Garamond: the share cards (`src/assets/share-fonts`), the film's own frames and the article illustrations that name it.

