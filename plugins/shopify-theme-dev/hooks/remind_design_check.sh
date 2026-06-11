#!/usr/bin/env bash
# remind_design_check.sh — PostToolUse(Edit|Write|MultiEdit) hook.
# Soft reminder (never blocks) to run /design-check before /ship when a theme
# section/block/template file was just edited. Fails open and silent on any error.
set -uo pipefail

payload="$(cat 2>/dev/null || true)"
path="$(printf '%s' "$payload" | python3 -c \
  'import json,sys;
try:
    d=json.load(sys.stdin)
    ti=d.get("tool_input",{})
    print(ti.get("file_path") or ti.get("path") or "")
except Exception:
    print("")' 2>/dev/null || true)"

case "$path" in
  */sections/*.liquid|*/blocks/*.liquid|*/templates/*.json|*/snippets/*.liquid)
    base="$(basename "$path")"
    echo "shopify-theme-dev: edited ${base}. Run \`/design-check ${path}\` before \`/ship\` — main is live." >&2
    ;;
esac
exit 0
