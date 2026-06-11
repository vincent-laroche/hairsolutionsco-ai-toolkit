---
name: storefront-release
description: Use when the user says "ship storefront", "release storefront", "commit and push", "push main", or asks to publish completed GitHub-synced storefront code through the approved Git release workflow.
---

# Storefront Release

Treat a push to `main` as a production release. Use `../../scripts/storefront_release.sh`; never bypass it with raw `git push`.

Required sequence:

1. Run `preflight`.
2. Inspect the complete diff and identify explicit intended paths.
3. Run `validate`.
4. Run `commit --message "..." -- path...`.
5. Run `push`.
6. Run `verify`.

Use `ship` only when the same explicit paths are ready for the whole sequence. The script permits unrelated unstaged changes but aborts on unrelated staged changes, wrong branch/origin, active Git operations, behind/diverged state, missing paths, and no-op commits. It supports additions, modifications, renames, and deletions.

Never use `--no-verify`, force push, automatic lock recovery, direct Shopify CLI push/publish/delete, or destructive pulls. Report commit hash, remote equality, live reachability when observable, and remaining risk.
