#!/usr/bin/env bash
# git_safe_commit_push.sh — commit all changes and push to main, with FUSE lock-file retry.
#
# The Cowork sandbox's FUSE mount sometimes can't unlink() .git/*.lock files even though
# the underlying git op succeeded. On those failures we `mv` the named lock aside and retry
# the failed step once. main is Shopify-synced, so a successful push goes live.
#
# Usage: git_safe_commit_push.sh "commit message"
#        REPO=/path/to/repo git_safe_commit_push.sh "message"   # override repo dir
set -uo pipefail

REPO="${REPO:-/Users/vMac/06_storefront}"
MSG="${1:-}"
BRANCH="${BRANCH:-main}"

if [[ -z "$MSG" ]]; then
  echo "ERROR: commit message required. Usage: git_safe_commit_push.sh \"message\"" >&2
  exit 2
fi

cd "$REPO" || { echo "ERROR: cannot cd to $REPO" >&2; exit 2; }

LOCK_RE='(Another git process seems to be running|File exists|Unable to create|index\.lock|\.lock)'

# Try to clear a lock named in git's stderr by renaming it aside (works where unlink fails).
clear_locks() {
  local out="$1" moved=0
  for lock in \
      ".git/index.lock" ".git/HEAD.lock" ".git/packed-refs.lock" \
      $(find .git/refs -name '*.lock' 2>/dev/null); do
    if [[ -e "$lock" ]]; then
      if mv "$lock" "${lock}.bak" 2>/dev/null; then
        echo "  cleared (mv) $lock" >&2
        moved=1
      else
        echo "  COULD NOT mv $lock — run on your Mac: rm -f \"$REPO/$lock\"" >&2
      fi
    fi
  done
  return $((1 - moved))   # 0 if we moved at least one
}

# Run a git step; on lock-related failure, clear locks and retry once.
run_step() {
  local label="$1"; shift
  local out rc
  out="$("$@" 2>&1)"; rc=$?
  if [[ $rc -ne 0 ]]; then
    if echo "$out" | grep -Eq "$LOCK_RE"; then
      echo "[$label] lock-file error; attempting to clear locks and retry..." >&2
      clear_locks "$out"
      out="$("$@" 2>&1)"; rc=$?
    fi
  fi
  [[ -n "$out" ]] && echo "$out"
  return $rc
}

echo "== git_safe_commit_push: $REPO ($BRANCH) =="

run_step "add" git add -A || { echo "STATUS: failed at 'git add'"; exit 1; }

# Nothing staged? Report and exit cleanly.
if git diff --cached --quiet; then
  echo "STATUS: nothing to commit (working tree clean)."
  exit 0
fi

if ! run_step "commit" git commit -m "$MSG"; then
  echo "STATUS: failed — committed=NO pushed=NO"
  exit 1
fi
COMMITTED=1

if ! run_step "push" git push origin "$BRANCH"; then
  echo "STATUS: committed only — push FAILED. Local is ahead of origin/$BRANCH."
  echo "        Fix connectivity/locks (try /fix-git-locks) and re-run: git push origin $BRANCH"
  exit 1
fi

LOCAL="$(git rev-parse HEAD 2>/dev/null)"
REMOTE="$(git rev-parse "origin/$BRANCH" 2>/dev/null)"
echo "local  HEAD:        $LOCAL"
echo "origin/$BRANCH:     $REMOTE"
if [[ "$LOCAL" == "$REMOTE" ]]; then
  echo "STATUS: committed+pushed OK — HEAD == origin/$BRANCH. Live on Shopify shortly."
  exit 0
else
  echo "STATUS: pushed but HEAD != origin/$BRANCH — verify manually." >&2
  exit 1
fi
