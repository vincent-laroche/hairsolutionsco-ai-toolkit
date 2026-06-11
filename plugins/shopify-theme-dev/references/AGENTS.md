# Hair Solutions Co. Storefront

## Purpose

This repository is the production Shopify theme for [hairsolutions.co](https://hairsolutions.co), a premium hair replacement business. The active theme is `storefront`, connected through Shopify GitHub sync to `vincent-laroche/storefront` on `main`.

This codebase is being used to finish the website's design and improve its customer experience, engagement, SEO, education, and conversion performance while protecting revenue and trust.

## Production Topology

- Store: `one-head-hair.myshopify.com`
- Public domain: `hairsolutions.co`
- Theme: `storefront` (GitHub sync)
- Remote: `https://github.com/vincent-laroche/storefront.git`
- Local repo: `/Users/vMac/06_storefront`
- Production branch: `main`
- Theme baseline: Horizon 3.5.1

`main` is production. A Git push automatically updates the linked live Shopify theme.

## Git Auth

`origin` is HTTPS, not SSH. Authentication uses a GitHub PAT stored in a gitignored `.git-credentials` file at the repo root, wired via local config (`credential.helper = store --file=.git-credentials`). This lets `git push origin main` work from any environment, including ephemeral sandboxes, without SSH keys. If `.git-credentials` is missing or the token has expired, ask Vincent for a new PAT (repo scope) and recreate the file — never hardcode the token in tracked files.

## Task Tracker (Notion)

Page-by-page corrections/changes are tracked in the Notion "Sections" database (ID `18647d9ecc9840e7b884cdf8bf0b15ec`). A row is pending when its "Desired Section/Typography Changes" fields are non-empty and "Changes Applied" is unchecked. Implement → commit/push → update the row (check Changes Applied, clear desired-change fields, set Status, add Claude Notes).

## Required Context

Before customer-facing work, read:

- `PRODUCT.md`
- `DESIGN.md`
- `Brand Identity/Hair Solutions Co - Master Design System/Hair Solutions Co - Design System v3.html`
- `Brand Identity/Hair Solutions Co - Master Design System/styles/system-v3.css`
- `Brand Identity/Hair Solutions Co - Master Design System/styles/tokens.css`

Load these required skills:

- `/Users/vMac/03_agents/plugins/hair-solutions-10-agents-plugins/shopify-liquid-designer/skills/hair-solutions-brand/SKILL.md`
- `/Users/vMac/03_agents/plugins/hair-solutions-10-agents-plugins/shopify-liquid-designer/skills/shopify-frontend/SKILL.md`
- `/Users/vMac/03_agents/plugins/hair-solutions-10-agents-plugins/shopify-liquid-designer/skills/shopify-liquid/SKILL.md`
- `/Users/vMac/03_agents/plugins/hair-solutions-10-agents-plugins/shopify-liquid-designer/skills/shopify-production/SKILL.md`
- `/Users/vMac/.codex/plugins/cache/impeccable/impeccable/3.5.0/skills/impeccable/SKILL.md`
- `/Users/vMac/03_agents/plugins/design/skills/design-critique/SKILL.md`
- Current official Shopify skills from the installed `shopify@openai-curated` plugin

## Page Scope

Primary page families are:

- Home
- About Us
- Collections
- Products
- Contact Us / Help Center / FAQ

For each page task, inspect the current implementation and propose the sections or blocks that best improve visual hierarchy, trust, education, engagement, SEO, and conversion. Do not add sections merely to make a page longer.

## Design Authority

`DESIGN.md` is the implementation contract. Design System v3 is the visual source of truth for new work.

- Direction: editorial, minimal, high-end, educational, discreet.
- Display typography: Instrument Serif.
- UI/body typography: Geist.
- Metadata typography: Geist Mono.
- Palette: off-white, paper, ink, stone, obsidian, cream, sparing clay.
- Geometry: hairline rules, restrained shadows, 4-8px corners, pills only for badges.
- Media: decisive, realistic, useful photography from Cloudinary.

Do not continue stale Knockout or Horizon 3.1.0 guidance when it conflicts with the approved v3 design system. Migrate legacy styling deliberately and avoid inconsistent half-migrations.

## Cloudinary

Cloudinary is the source of truth for website media. Use the Cloudinary AssetLink integration for normal asset selection and Shopify object linking.

- Credentials live in `/Users/vMac/.env`.
- Reference `CLOUDINARY_ASSET_LINK_API_KEY`; never expose its value.
- Prefer AssetLink and Cloudinary delivery URLs over duplicate theme assets.
- Preserve asset public IDs, metadata, alt text, crop intent, and aspect ratios.
- Use responsive dimensions and automatic format/quality when supported.
- Use Cloudinary APIs/SDKs for controlled automation and validation, not as the default editorial workflow.

## SEO And Engagement

Every change must consider:

- search intent and useful visible copy
- one clear H1 and logical heading hierarchy
- semantic HTML and crawlable content
- canonical, metadata, JSON-LD, and internal-link preservation
- FAQ schema only for visible matching FAQ content
- clear primary and contextual CTAs
- customer questions about realism, fit, attachment, lifespan, maintenance, privacy, shipping, returns, and support
- mobile Core Web Vitals and responsive image behavior

## Theme Rules

- Inspect nearby files before editing.
- Make small, focused diffs.
- Preserve Horizon theme blocks, schemas, settings IDs, dynamic sources, metafields, app blocks, and `block.shopify_attributes`.
- Do not modify app-managed `ecom-*`, `ss-*`, or `foxify-*` files unless explicitly requested.
- Use whitespace control in Liquid where appropriate.
- Use `.value` for metaobject/metafield values when required.
- Never pipe inside bracket expressions; assign first.
- New custom components use `hs-custom-*` unless the local file establishes another HSC prefix.
- Mobile QA is required at 320, 375, 390, and 430px.
- Maintain keyboard access, visible focus, readable contrast, semantic labels, and 44px touch targets.

## Release Workflow

Vincent has specified immediate GitHub-synced releases for completed theme changes:

1. Confirm `main`, `origin`, working-tree state, and no active rebase.
2. Inspect and implement the smallest complete change.
3. Run relevant Theme Check, schema/JSON validation, visual QA, and revenue-critical flow checks.
4. Commit the completed change immediately with a focused message.
5. Push `main` immediately.
6. Verify local HEAD equals `origin/main` and verify live output when the change is observable.

Never push partial or unvalidated work. Never bypass hooks.

Do not run `shopify theme push`, `shopify theme publish`, `shopify theme delete`, or destructive pulls without explicit approval. Product, order, customer, inventory, checkout, billing, fulfillment, app configuration, permissions, and destructive production-data changes require explicit approval.

## Definition Of Done

Done means implemented, validated, committed, pushed, and verified. The final report must include files changed, checks performed, commit hash, push status, and any remaining production risk.
