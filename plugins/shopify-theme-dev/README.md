# shopify-theme-dev (v2.0.0)

Shopify Liquid theme toolkit for the **Hair Solutions Co.** storefront — [hairsolutions.co](https://hairsolutions.co), **Horizon 4.1.1**. Lean by design: thin skills that pull detail from `references/` only when used.

## The one law
**No Shopify CLI. No theme dev server. Ever.** The only deploy path is **local repo → GitHub**. `main` is GitHub-synced and goes live on push; `dev` is the experimental branch.

## What's inside

**Skills (10)**
- `storefront-preflight` — read-only session boot: repo, branch, clean tree, dev↔main status.
- `storefront-build` — write Liquid for Horizon 4.1.1 (single Color Palette) + design system + Definition of Done.
- `storefront-release` — commit & push to `main` (live) via Desktop Commander; never CLI.
- `fix-git-locks` — clear stale `.git/*.lock` from the FUSE sandbox.
- `cloudinary-media` — Cloudinary `dtmizxj1n`: AssetLink for products/collections/blogs, Files CDN for pages, delivery URLs.
- `metaobjects-metafields` — the live metaobject/metafield model + Liquid access rules.
- `products-collections` — catalog, base types, tag taxonomy, smart-collection rules, product templates.
- `help-center` — the custom 3-template Help Center (Home / Category / Article).
- `custom-product-options` — PDP non-variant options (radios/checkboxes/swatches → line-item properties).
- `custom-order-options-picker` — the advanced `hs-advanced-order-flow` configurator (WIP).

**Agents (3)** — `brand-compliance` (bible: `/Users/vMac/08_brand` + design system), `seo` (on-page + JSON-LD), `mobile-first` (320/375/390/430, severe).

**Hooks (3)** — `SessionStart` slim status; `PreToolUse(Bash)` blocks Shopify CLI / dev server / raw `git push`; `PostToolUse(Edit|Write)` non-blocking design-system nudge on theme files.

**References** — `theme-map.md`, `cloudinary-map.md`, `metaobjects.md`, and `workflows/sync-dev.yml` (the Dev sync Action).

**MCP** — bundles `chrome-devtools-mcp` for live QA. Expected connectors (enable in Settings → Capabilities): Notion, Cloudinary, Shopify, Desktop Commander. No secrets are stored in this plugin; tokens are read from `/Users/vMac/.env` at runtime via Desktop Commander.

## Dev ↔ main sync (one-way)
`references/workflows/sync-dev.yml` fast-forwards `dev` to `main` on every push to `main`. It is one-way and safe: if `dev` has diverged it logs a warning and changes nothing.
**To activate:** copy it to the theme repo at `.github/workflows/sync-dev.yml` and ship to `main` (it only runs once it exists on `main`).

## Install (this machine)
Settings → Capabilities → add this marketplace folder (`/Users/vMac/03_agents/plugins/shopify-theme-dev`), then enable the `shopify-theme-dev` plugin.

## Install (another Claude Desktop) — downloadable
1. Copy `shopify-theme-dev-plugin.zip` to the other machine and unzip it.
2. Settings → Capabilities → add the unzipped folder as a plugin marketplace.
3. Enable `shopify-theme-dev`, then enable the expected connectors above.
(Or point Capabilities at the GitHub repo if you push this marketplace there.)

Adjust paths in the skills if the other machine uses a different storefront repo location.
