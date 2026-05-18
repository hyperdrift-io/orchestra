#!/usr/bin/env bash
# Render every .d2 source under docs/diagrams/ to public/diagrams/*.svg
# Uses sketch mode + Origami palette base; per-diagram styling overrides
# inside each .d2 file applies the Orchestra ink/cream/vermillion theme.
set -euo pipefail

if ! command -v d2 >/dev/null 2>&1; then
  echo "d2 not found. Install with: brew install d2" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT/docs/diagrams"
OUT_DIR="$ROOT/public/diagrams"
mkdir -p "$OUT_DIR"

THEME=200          # Origami base; overridden per diagram via class styles.
DARK_THEME=200
PAD=40

shopt -s nullglob
sources=("$SRC_DIR"/*.d2)
if [ ${#sources[@]} -eq 0 ]; then
  echo "No .d2 sources found in $SRC_DIR"
  exit 0
fi

failed=0
for src in "${sources[@]}"; do
  # skip files starting with underscore (treated as shared/imported)
  base="$(basename "$src" .d2)"
  case "$base" in _*) continue ;; esac

  out="$OUT_DIR/$base.svg"
  echo "→ $base.d2 → $base.svg"
  if ! d2 --sketch --theme="$THEME" --dark-theme="$DARK_THEME" --pad="$PAD" "$src" "$out"; then
    echo "  FAILED" >&2
    failed=$((failed + 1))
  fi
done

if [ "$failed" -gt 0 ]; then
  echo "$failed diagram(s) failed to render" >&2
  exit 1
fi

echo "Rendered ${#sources[@]} diagram(s) to public/diagrams/"
