# shopify-theme-dev

A Claude Code / Cowork plugin that packages the **Designer-in-Chief / Creative Director / Shopify Liquid specialist** workflow for the **OneHead Hair Solutions** storefront ([hairsolutions.co](https://hairsolutions.co)) into one installable bundle: skills, slash commands, subagents, scripts, hooks, MCP config, and reference docs.

It turns the ad-hoc workflow that's been running in Cowork sessions into something reusable — brand system in your pocket, OS 2.0 section scaffolding, Cloudinary delivery URLs, the Notion change-tracker loop, and a safe ship-to-`main` pipeline.

## What's inside

**Skills** (auto-load on the right trigger)
- `storefront-preflight` — read-only repo/branch/worktree/dev-server diagnostics to run at the start of storefront work.
- `storefront-build` — Horizon 3.5.1 section/block/snippet conventions (schema + presets, Liquid/CSS/JS rules) plus the v3 design system: OKLCH tokens, Instrument Serif / Geist / Geist Mono, 4px scale, 12-col grid, hairline geometry, and the `<em>`/`<i>` gold-accent rule. Routes to the external design skills for customer-facing work.
- `storefront-review` — findings-first design / SEO / accessibility / performance / release review: headings, metadata, JSON-LD by page type, Core Web Vitals, internal linking, engagement within brand rules.
- `storefront-release` — local → commit → push-to-`main` (goes live) routed through the guarded `storefront_release.sh`; never raw `git push`.
- `cloudinary-media` — cloud `dtmizxj1n`, named transforms (`t_hsc_hero|card|thumb|macro_4x5`), responsive/LCP rules, and the AssetLink workflow.
- `notion-sections` — read-only "Sections" tracker access: schema verification, pending rule, paginated reads, trace-before-you-edit.
- `fix-git-locks` — clear stale `.git/*.lock` files the FUSE sandbox couldn't unlink (separate from release; never auto-runs).

**Commands**
- `/sync-sections [page]` — list pending design/copy changes from Notion.
- `/ship [message]` — commit + push to `main` (live) with lock-file safety.
- `/new-section <name>` — scaffold a brand-correct OS 2.0 section.
- `/design-check <file>` — design + brand + SEO punch list before shipping.
- `/cloudinary-url <public-id> <use> [transform]` — build a delivery URL + `<img>`/srcset.
- `/fix-git-locks` — clear stale `.git/*.lock` files the sandbox couldn't unlink.

**Agents**
- `section-builder` — implements one Notion row or ad-hoc brief end to end (trace → build → design-check → ship → update Notion).
- `seo-auditor` — audits a page/template and emits a prioritized punch list.
- `notion-sync` — read-only pending-changes summary at session start.

**Scripts** (`scripts/`) — `storefront_preflight.py` (read-only diagnostics), `storefront_release.sh` (staged `preflight`/`validate`/`commit`/`push`/`verify`/`ship` release automation), `session_preflight.py` / `post_edit_validate.py` / `pre_command_guard.py` (hook drivers), `notion_fetch.py` / `notion_update.py` (REST fallback for the Notion MCP), `git_safe_commit_push.sh` (lock-file-aware push), `cloudinary_url.py` (delivery-URL builder).

**Hooks** (`hooks/hooks.json`, Claude Code/Cowork schema) — `SessionStart` runs a concise storefront preflight (scoped to the storefront workspace); `PostToolUse` on `Edit|Write|MultiEdit` runs fast validation only when the edit targets the storefront; `PreToolUse` on `Bash` blocks direct `shopify theme push|publish|delete`, destructive raw pulls, `npm run push`, and raw production `git push` that bypasses the release script.

**References** (`references/`) — `Design.md`, `tokens.css` (authoritative tokens), `AGENTS.md`, `homepage-map.md` (condensed homepage section→file map), `notion-schema.json` (cached schema for drift detection), and `paths.json` (machine-readable canonical paths/config).

**MCP** (`.mcp.json`) — bundles the official **`chrome-devtools-mcp`** server (`mcp__chrome-devtools__*`) for the live-QA step in `/design-check`: screenshots and console/network/Lighthouse checks at 320–1440px breakpoints. No setup needed beyond Node/npx being available.

## Assumptions

- The storefront repo is connected at `/Users/vMac/06_storefront` (required for the git workflow; `main` is Shopify-synced).
- A **GitHub PAT** is configured per the `storefront-release` skill (gitignored `.git-credentials`, HTTPS remote). Pushes go live — never ship partial work.
- A **Notion integration token** is available at runtime as `NOTION_TOKEN` for the REST fallback (the Notion MCP is preferred when connected). Never hardcode it.
- **Cloudinary** media (cloud `dtmizxj1n`) is managed primarily through the **Cloudinary Asset Management** connector (`search-assets`, `visual-search-assets`, `list-images`, `upload-asset`, `transform-asset`, etc. — see `.mcp.json` `_expectedConnectors`) plus the `cloudinary` connector/skills for delivery-URL transformations. Enable both in **Settings → Capabilities**. The AssetLink API key in `/Users/vMac/.env` is only needed for raw Admin API calls outside these MCP tools.

No secrets (PAT, Notion token, Cloudinary key) are stored anywhere in this plugin.

## Quick start

1. `/sync-sections` — see what's pending in the Notion Sections database.
2. `/new-section hs-custom-about-story` — scaffold a new section (or hand a pending row to the `section-builder` agent).
3. `/design-check sections/hs-custom-about-story.liquid` — review against brand + architecture + SEO.
4. `/ship "feat(about): add editorial story section"` — commit + push to `main`; Shopify syncs it live.

## Install

Enable the plugin in **Settings → Capabilities** (point it at this folder / your marketplace). Skills, commands, agents, and hooks are declared in `.claude-plugin/plugin.json` and load automatically.
