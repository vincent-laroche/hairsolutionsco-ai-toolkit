---
name: git-ship-workflow
description: "The local -> commit -> push-to-main release workflow for the hairsolutions.co storefront, where main is Shopify-synced so every push goes live. Use during ANY local theme file edit, before/after committing, when git push fails, or when handling .git lock-file errors in the sandbox. Keywords: git, commit, push, main, ship, release, live theme, credential, PAT, .git-credentials, lock file, index.lock, FUSE."
compatibility: Claude Code, Claude Desktop, Cursor
metadata:
  author: Vincent Laroche
  version: "1.0"
---

# Ship workflow — local → commit → push to `main` (goes live)

**Golden rule: local → commit → push happens on every change, immediately.** The live Shopify theme `storefront` is synced to `main`, so every push to `origin main` auto-updates the live storefront. This skill should effectively always be active during build work.

## Repo facts

| Thing | Value |
|-------|-------|
| GitHub repo | `https://github.com/vincent-laroche/storefront` (branch `main`) |
| Local clone | `/Users/vMac/06_storefront` |
| Store | `one-head-hair.myshopify.com` → `hairsolutions.co` |
| Theme | `storefront` (GitHub sync), baseline Horizon 3.5.1 |

If `/Users/vMac/06_storefront` isn't a connected folder this session, request it before editing. Do **not** edit theme files anywhere else.

## Standard cycle

```bash
cd /Users/vMac/06_storefront
git status                      # confirm main, clean-ish tree, no active rebase, no unrelated changes
# ... read file, make smallest theme-editor-compatible change ...
git add -A
git commit -m "feat(home): add editorial hero section with Cloudinary media"
git push origin main
git rev-parse HEAD origin/main  # confirm local HEAD == origin/main
```

Then tell the user it's live (Shopify syncs from `main` automatically). Prefer `scripts/git_safe_commit_push.sh "<message>"` or the `/ship` command, which wrap this with the lock-file retry below. Use conventional-commit messages (`feat(...)`, `fix(...)`, `chore(...)`).

## Auth mechanism (HTTPS + PAT — do not reproduce the secret)

`origin` is **HTTPS, not SSH** (`https://github.com/vincent-laroche/storefront.git`). SSH cannot work from the Cowork sandbox (no `~/.ssh`, no agent, no `gh` CLI). Auth is a GitHub **PAT stored in a gitignored `.git-credentials` file at the repo root**, wired via local git config:

```
credential.helper = store --file=.git-credentials
```

This makes `git push origin main` work from any environment, including ephemeral sandboxes, without SSH keys. The token is **never** written to a tracked file and never printed.

### Recovery if `.git-credentials` is missing/expired
1. Ask the user for a fresh GitHub PAT (repo scope) for `vincent-laroche/storefront`.
2. Write `https://x-access-token:<PAT>@github.com` to `/Users/vMac/06_storefront/.git-credentials` and `chmod 600` it.
3. Confirm `git remote get-url origin` is the HTTPS URL and `git config credential.helper` points to that file (`store --file=.git-credentials`).

## FUSE sandbox lock-file quirk

The sandbox's FUSE mount sometimes can't `unlink()` git lock files — `.git/index.lock`, `.git/HEAD.lock`, `.git/refs/**/*.lock`, `.git/packed-refs.lock`, `.git/objects/maintenance.lock*` — and returns EPERM **even though the underlying git operation (commit/push/branch) usually succeeded anyway.** Symptoms: "Another git process seems to be running… remove the file manually to continue", "File exists", "Unable to create … .lock".

Fix order:
1. **`mv` the lock file aside** within the same directory (`mv .git/index.lock .git/index.lock.bak`) — rename often works where `rm`/unlink doesn't — then retry the failing git command.
2. If `mv` also fails, ask the user to `rm -f <path-to-lock>` on their real Mac terminal (no restriction there).
3. **Never touch `.git/worktrees/*/HEAD.lock`** — those belong to other active sessions/worktrees.

`scripts/git_safe_commit_push.sh` and the `/fix-git-locks` command encode this retry behavior, including a sweep for leftover `*.lock.bak` / `leftover_*` / `_writetest*` residue from earlier `mv`-aside attempts (cosmetic — git ignores `.git/` internals and the whitelist `.gitignore` keeps stray top-level files untracked, but `/fix-git-locks` will print a consolidated `rm -f` for the user's real terminal if asked). General `rm`/unlink of tracked **or untracked** files is unreliable in the sandbox for *any* repo on this mount, not just `.git/` — prefer Edit/Write to overwrite, and avoid `git add -A` if stray undeletable scratch files exist (use explicit paths instead).

## Cowork bash path mapping

Cowork's `mcp__workspace__bash` runs in a separate Linux sandbox. The paths the **Read/Write/Edit tools** see (e.g. `/Users/vMac/06_storefront/...`) are NOT the paths **bash** sees — bash mounts each connected folder under `/sessions/<session-id>/mnt/<folder-name>/`. Concretely:

| File-tool path (Read/Write/Edit) | Bash path |
|---|---|
| `/Users/vMac/06_storefront/...` | `/sessions/<session-id>/mnt/06_storefront/...` |
| `/Users/vMac/03_agents/hairsolutionsco-ai-toolkit/...` | `/sessions/<session-id>/mnt/hairsolutionsco-ai-toolkit/...` |

The `<session-id>` segment changes per session — read it from the current session's "Shell access" mapping (shown in the system prompt) rather than hardcoding one. When running `scripts/git_safe_commit_push.sh` or any shell command against the storefront repo, translate the path first; when using Read/Write/Edit, use the `/Users/vMac/...` form. Never assume a sandbox path (`/sessions/...`) is meaningful to the user or to file tools, and never expose `/sessions/...` paths to the user.

## Safety rules

- **Never push partial or broken work** — pushes go live. If a change is risky, branch or preview first and say so. Never bypass hooks.
- Never modify product, order, checkout, customer, billing, inventory, fulfillment, app-config, or third-party app files (`ecom-*`, `ss-*`, `foxify-*`) unless the user explicitly asks.
- Do not run `shopify theme push/publish/delete` or destructive pulls without explicit approval.
- Definition of done: implemented, validated (Theme Check / schema-JSON), committed, pushed, and verified — report files changed, checks performed, commit hash, push status, and any remaining production risk.

## What's tracked (whitelist `.gitignore`)

The repo uses a **whitelist `.gitignore`**: ignore everything (`*`), then explicitly un-ignore (`!`) only:

- Shopify theme dirs: `assets/`, `blocks/`, `config/`, `layout/`, `locales/`, `preview_data/`, `sections/`, `snippets/`, `templates/`
- `.github/` (deploy workflow), `.gitignore`, `.shopifyignore`
- Docs: `AGENTS.md`, `CLAUDE.md`, `README.md`, `PRODUCT.md`, `DESIGN.md`
- A curated subset of `Brand Identity/Hair Solutions Co - Master Design System/` (`*.html`, `design-canvas.jsx`, `styles/**`, `components/**`, `data/**`)

Always excluded regardless: `**/.DS_Store`, `Thumbs.db`, app-managed `assets|sections|snippets/{ecom,ss,foxify}-*`, and `preview_data/compiled/`.

So: new theme work belongs in the un-ignored theme dirs. A new top-level file or directory **won't be tracked** unless you add a matching `!` rule — check `git status` after creating anything outside those dirs.
