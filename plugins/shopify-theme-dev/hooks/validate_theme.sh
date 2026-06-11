#!/usr/bin/env bash
# validate_theme.sh — PreToolUse(Bash) hook.
# Only acts when the Bash command is a push/commit to the live theme. On a Liquid/schema
# or template-JSON error it blocks the push (exit 2). Otherwise it allows the command (exit 0).
# Fails OPEN: any hook-internal error allows the command so we never wedge a normal session.
set -uo pipefail

REPO="${REPO:-/Users/vMac/06_storefront}"

# Read the tool call JSON from stdin; extract the command. Fail open if we can't parse.
payload="$(cat 2>/dev/null || true)"
cmd="$(printf '%s' "$payload" | python3 -c \
  'import json,sys;
try:
    d=json.load(sys.stdin); print(d.get("tool_input",{}).get("command",""))
except Exception:
    print("")' 2>/dev/null || true)"

# Only gate ship-like commands (push to main / commit / the wrapper script).
if ! printf '%s' "$cmd" | grep -Eq 'git[[:space:]]+push|git_safe_commit_push|git[[:space:]]+commit'; then
  exit 0
fi

cd "$REPO" 2>/dev/null || exit 0   # not in repo -> nothing to validate, allow

errors=0
report() { echo "BLOCKED by shopify-theme-dev: $1" >&2; errors=$((errors+1)); }

# Collect changed/staged theme files.
mapfile -t changed < <(git diff --name-only --diff-filter=ACM 2>/dev/null; \
                       git diff --cached --name-only --diff-filter=ACM 2>/dev/null)
# de-dup
mapfile -t changed < <(printf '%s\n' "${changed[@]}" | sort -u)

# Prefer Shopify Theme Check if available (covers Liquid + schema).
if command -v shopify >/dev/null 2>&1; then
  if ! shopify theme check >/dev/null 2>&1; then
    # theme check returns non-zero on offenses; surface a short tail.
    shopify theme check 2>&1 | tail -20 >&2
    report "shopify theme check reported offenses"
  fi
else
  # Fallback: JSON-validate template/config JSON and embedded {% schema %} blocks.
  for f in "${changed[@]}"; do
    [[ -f "$f" ]] || continue
    case "$f" in
      templates/*.json|config/*.json|locales/*.json|sections/*.json)
        python3 -c 'import json,sys; json.load(open(sys.argv[1]))' "$f" 2>/dev/null \
          || report "invalid JSON in $f"
        ;;
      sections/*.liquid|blocks/*.liquid)
        # Extract the {% schema %} block and JSON-parse it if present.
        python3 - "$f" <<'PY' 2>/dev/null || report "invalid {% schema %} JSON in $f"
import json, re, sys
src = open(sys.argv[1], encoding="utf-8").read()
m = re.search(r"{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}", src, re.S)
if m:
    json.loads(m.group(1))
PY
        ;;
    esac
  done
fi

if [[ $errors -gt 0 ]]; then
  echo "Fix the above before pushing — main is live (Shopify-synced)." >&2
  exit 2   # exit 2 => PreToolUse blocks the tool call
fi
exit 0
