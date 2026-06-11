---
name: storefront-preflight
description: Use when starting Shopify storefront work, checking repository readiness, diagnosing branch or worktree state, checking the local theme server, or when the user says "storefront preflight", "check storefront status", or "is the storefront ready".
---

# Storefront Preflight

Run `../../scripts/storefront_preflight.py`. Treat it as read-only.

Confirm `/Users/vMac/06_storefront`, `main`, the canonical GitHub origin, working-tree state, linked worktrees, active Git operations, local versus cached/fetched `origin/main`, required tools, instruction drift, and the local dev-server state.

Do not fetch unless the task needs current remote proof. Do not recover locks, alter worktrees, start a server, stage files, or perform production writes during preflight.

Read the current repository `AGENTS.md` after preflight. Load `PRODUCT.md`, relevant `DESIGN.md` sections, and specialist design/Liquid skills only for customer-facing work.
