#!/usr/bin/env bash
# Export each figure SVG to PNG with the site's own fonts (Cormorant Garamond, IBM Plex).
# Sharp/librsvg on macOS ignores local font files, so headless Chrome renders instead.
# Usage, from the app root:  bash docs/editorial/ui-accessibility-series/render-figures.sh [out-dir] [name ...]
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
src="$PWD/public/articles/ui-accessibility"
out="${1:-$src}"; shift || true
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
names=("$@")
[ ${#names[@]} -gt 0 ] || names=(routes accessibility webmcp cargo mcp continuity)
for name in "${names[@]}"; do
  for variant in "$name" "$name-mobile"; do
    svg="$src/$variant.svg"
    [ -f "$svg" ] || continue
    # Desktop exports are the downloadable PNGs; mobile renders only when an out-dir is given for review.
    if [[ "$variant" == *-mobile && "$out" == "$src" ]]; then continue; fi
    read -r w h < <(sed -nE 's/^<svg[^>]* width="([0-9]+)" height="([0-9]+)".*/\1 \2/p' "$svg" | head -1) || true
    cat > "$tmp/$variant.html" <<HTML
<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Cormorant Garamond';font-weight:500;src:url('file://$here/fonts/cormorant-medium.ttf')}
@font-face{font-family:'Cormorant Garamond';font-weight:500;font-style:italic;src:url('file://$here/fonts/cormorant-medium-italic.ttf')}
@font-face{font-family:'IBM Plex Sans';src:url('file://$here/fonts/plex-regular.ttf')}
@font-face{font-family:'IBM Plex Mono';src:url('file://$here/fonts/IBMPlexMono-Regular.ttf')}
html,body{margin:0;background:#14120e}svg{display:block}</style>
$(cat "$svg")
HTML
    "$chrome" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
      --force-device-scale-factor=2 --window-size="$w,$h" --virtual-time-budget=2000 \
      --screenshot="$out/$variant.png" "file://$tmp/$variant.html" >/dev/null 2>&1
    echo "$out/$variant.png"
  done
done
