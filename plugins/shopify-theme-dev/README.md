# shopify-theme-dev

A Claude Code / Cowork plugin that packages the **Designer-in-Chief / Creative Director / Shopify Liquid specialist** workflow for the **OneHead Hair Solutions** storefront ([hairsolutions.co](https://hairsolutions.co)) into one installable bundle: skills, slash commands, subagents, scripts, hooks, MCP config, and reference docs.

It turns the ad-hoc workflow that's been running in Cowork sessions into something reusable — brand system in your pocket, OS 2.0 section scaffolding, Cloudinary delivery URLs, the Notion change-tracker loop, and a safe ship-to-`main` pipeline.

## What's inside

**Skills** (auto-load on the right trigger)
- `hairsolutions-brand` — the v3 design system: OKLCH tokens, Instrument Serif / Geist / Geist Mono, 4px scale, 12-col grid, hairline geometry, the `<em>`/`<i>` gold-accent rule, and the full Always/Never list.
- `shopify-os2-architecture` — Horizon 3.5.1 section/block/snippet conventions, schema + presets, Liquid/CSS/JS rules, with a worked example from the live `hs-home-band.liquid`.
- `cloudinary-assetlink` — cloud `dtmizxj1n`, named transforms (`t_hsc_hero|card|thumb|macro_4x5`), responsive/LCP rules, and the AssetLink workflow.
- `notion-sections-tracker` — the "Sections" database schema, pending rule, and trace-before-you-edit guidance.
- `git-ship-workflow` — local → commit → push-to-`main` (goes live), HTTPS+PAT auth, and the FUSE lock-file fix.
- `seo-engagement-checklist` — headings, metadata, JSON-LD by page type, Core Web Vitals, internal linking, engagement within brand rules.

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

**Scripts** (`scripts/`) — `notion_fetch.py`, `notion_update.py` (REST fallback for the Notion MCP), `git_safe_commit_push.sh` (lock-file-aware push), `cloudinary_url.py` (delivery-URL builder).

**Hooks** (`hooks/hooks.json`) — a PreToolUse gate that validates changed Liquid/schema/JSON before a push/commit, and a PostToolUse reminder to run `/design-check` after editing a section/block/template.

**References** (`references/`) — `Design.md`, `tokens.css` (authoritative tokens), `AGENTS.md`, `homepage-map.md` (condensed homepage section→file map), and `notion-schema.json` (cached schema for drift detection).

**MCP** (`.mcp.json`) — bundles the official **`chrome-devtools-mcp`** server (`mcp__chrome-devtools__*`) for the live-QA step in `/design-check`: screenshots and console/network/Lighthouse checks at 320–1440px breakpoints. No setup needed beyond Node/npx being available.

## Assumptions

- The storefront repo is connected at `/Users/vMac/06_storefront` (required for the git workflow; `main` is Shopify-synced).
- A **GitHub PAT** is configured per the `git-ship-workflow` skill (gitignored `.git-credentials`, HTTPS remote). Pushes go live — never ship partial work.
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
