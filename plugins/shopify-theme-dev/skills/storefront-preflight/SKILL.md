---
name: storefront-preflight
description: Read-only session boot check for hairsolutions.co storefront work — confirms the deploy repo, branch, clean tree, and Dev-vs-main status. Run at the start of any theme task. No Shopify CLI, no dev server.
---

# Storefront preflight

Run this first on any storefront task. Read-only — it never edits, commits, or deploys.

## Checks (via Desktop Commander, never bash sandbox for git)
1. Confirm working dir is the deploy repo: `/Users/vMac/06_storefront/shopify_github_synched_theme_files`. Edits anywhere else do NOT deploy.
2. `git status` — branch is `main`, working tree clean (or summarize uncommitted changes).
3. `git fetch origin` then compare: is local `main` == `origin/main`? Is `dev` behind `main`? (`dev` should be kept fast-forwarded by the `sync-dev.yml` Action — flag if it has drifted.)
4. Confirm no active rebase/merge (`.git/rebase-*`, `MERGE_HEAD`). If stale `.git/*.lock` exists, use the `fix-git-locks` skill.
5. Read `/Users/vMac/06_storefront/shopify_github_synched_theme_files/AGENTS.md`.

## Hard rules
- All git ops go through `mcp__Desktop_Commander__start_process` (FUSE sandbox breaks git locks).
- Read `/Users/vMac/.env` only via `mcp__Desktop_Commander__read_file`.
- NEVER run `shopify theme dev/push/publish/pull` or any dev server. Local repo ↔ GitHub only.

## Output
One compact status block: repo OK?, branch, tree state, main↔origin, Dev behind main by N commits, blockers. Then proceed to the task. Do not load design/Shopify skills for pure git/tooling work.
