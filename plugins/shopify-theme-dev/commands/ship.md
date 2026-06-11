---
description: Commit all current theme changes and push to main (goes live on hairsolutions.co). Optional commit message.
argument-hint: "[commit message — optional; auto-generated from the diff if omitted]"
---

# /ship

Commit and push the current storefront changes to `origin main`. **`main` is Shopify-synced — this goes live.** Read the `git-ship-workflow` skill first. Never ship partial or broken work.

## Steps

1. `cd /Users/vMac/06_storefront`. If that folder isn't connected, request it first and stop.

2. **Inspect state:**
   ```bash
   git status
   git --no-pager diff --stat
   ```
   Confirm you are on `main`, there is no active rebase, and there are **no unrelated unstaged changes** you didn't intend to ship. If unexpected files appear (e.g. app-managed `ecom-*`/`ss-*`/`foxify-*`, or product/checkout files), stop and ask before continuing.

3. **Validate** any changed `.liquid` / `*.json` (the pre-push hook also enforces this): `shopify theme check` if available, otherwise a JSON-parse of changed `{% schema %}` blocks and `templates/*.json`. Fix errors before shipping.

4. **Commit message:** use `$ARGUMENTS` if provided. Otherwise generate a conventional-commit message from the diff (e.g. `feat(home): …`, `fix(collection): …`, `chore(seo): …`) scoped to the page/area touched.

5. **Commit + push with lock-file safety:**
   ```bash
   "${CLAUDE_PLUGIN_ROOT}/scripts/git_safe_commit_push.sh" "<message>"
   ```
   This wraps `git add -A && git commit && git push origin main` and applies the FUSE lock-file `mv`-and-retry logic. If it reports a lock it couldn't clear, run `/fix-git-locks` and retry.

6. **Verify live:**
   ```bash
   git rev-parse HEAD; git rev-parse origin/main
   ```
   Confirm they match. Report to the user: files changed, checks performed, commit hash, push status, and that Shopify will sync from `main` automatically (note any remaining production risk).
