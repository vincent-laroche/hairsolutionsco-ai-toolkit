---
name: shopify-production
description: "Use when planning, validating, previewing, deploying, auditing, or operating Shopify production changes for hairsolutions.co, including Horizon 3.5.1 theme safety, live theme protection, app compatibility, performance risk, rollback planning, Shopify CLI workflows, and approval-gated publish actions"
---

# Shopify Production

## Overview

This is the production-operations skill for Hair Solutions Co Shopify work. Use it when a task can affect the live storefront, theme deployment, apps, performance, SEO, tracking, customer trust, or revenue.

The live theme baseline is Horizon 3.5.1. Treat live theme changes as customer-facing production changes. Preview and validation are safe; publishing, destructive changes, product/order/customer changes, and app-impacting operations require explicit approval.

## Non-Negotiable Safety Boundary

Stop and ask before:

- Publishing a Shopify theme.
- Editing live theme assets through Admin/API/CLI.
- Deleting, renaming, or moving theme files in bulk.
- Modifying products, variants, inventory, collections, orders, customers, discounts, fulfillment, billing, or checkout.
- Changing app configuration or app-owned theme files.
- Changing tracking scripts, consent behavior, privacy behavior, or customer portal/auth behavior.
- Running broad automation against Shopify Admin data.

Safe without approval:

- Reading local files.
- Reading theme file structure.
- Running non-destructive local validation.
- Creating or editing local skill/docs files.
- Drafting a patch.
- Running preview commands that do not publish.

## Store Context

| Item | Rule |
|------|------|
| Store | `one-head-hair.myshopify.com` / `hairsolutions.co` |
| Live theme | Horizon 3.5.1 baseline |
| Business priority | Revenue and customer experience first |
| Theme changes | Preview, validate, then approval before publish |
| Secrets | Local `.env` only; never print values |
| App safety | EComposer, SectionStore, Foxify, reviews, subscriptions, chat, analytics need caution |
| Mobile | Production release cannot be desktop-only |

## Production Work Sequence

1. Identify the exact repo/theme path.
2. Read local instructions: `AGENTS.md`, `CLAUDE.md`, `README.md`, theme notes.
3. Check whether the target is local, preview, duplicate, or live.
4. Inspect the current theme structure and changed files.
5. Check app-owned file prefixes and app block dependencies.
6. Validate locally.
7. Preview in browser or Shopify theme preview.
8. Verify mobile and revenue-critical flows.
9. Prepare rollback.
10. Ask for explicit approval before publish.

## Horizon 3.5.1 Production Notes

Horizon 3.5.1 is a patch-level release associated with translation-string fixes and improved Split showcase behavior on small screens. Production QA must include narrow mobile checks for split media/text sections and any custom work that resembles Split showcase.

Horizon-specific production risks:

- Theme-block nesting can make regressions appear only in certain editor compositions.
- Static blocks have fixed layout behavior and need stable IDs.
- App blocks can appear inside sections and theme blocks that support `@app`.
- JSON template data can preserve merchant settings that are not obvious from Liquid code.
- Renaming setting IDs can silently discard configured content.
- Updating from upstream Horizon can conflict with custom files.

## Read-Only Discovery

Use current filesystem/store evidence, not memory.

Common discovery commands:

```bash
pwd
find . -maxdepth 2 -type f | sort
rg -n "Horizon|theme_version|content_for|@theme|@app|shopify_attributes" .
```

If inside a Shopify theme folder:

```bash
shopify theme list --store one-head-hair.myshopify.com
shopify theme check
```

Do not run publish commands during discovery.

## Theme File Risk Map

| Area | Risk | Handling |
|------|------|----------|
| `layout/theme.liquid` | Global scripts, SEO, app hooks, layout | Read carefully, minimal diffs |
| `sections/header*` | Navigation, trust, mobile menu, conversion | High QA |
| `sections/footer*` | Legal/trust/navigation | Medium QA |
| Product sections/blocks/snippets | Revenue-critical purchase flow | High QA and approval caution |
| Cart drawer/cart page | Checkout-adjacent | High QA and approval caution |
| `templates/*.json` | Merchant composition/settings | Avoid churn |
| `config/settings_schema.json` | Global editor settings | Avoid renaming IDs |
| `config/settings_data.json` | Merchant data | Do not edit casually |
| `locales/*.json` | Translation strings | Validate JSON and missing keys |
| App snippets/sections | App functionality | Avoid unless approved |
| Assets | Performance and global behavior | Validate mobile/perf |

## App Registry and Protected Prefixes

Treat these as protected unless the task is explicitly about that app:

| Prefix/pattern | App/category | Risk |
|----------------|--------------|------|
| `ecom-*` | EComposer | Purchased/built page sections |
| `ss-*` | SectionStore | Purchased sections |
| `foxify-*` | Foxify | Theme/page functionality |
| review app snippets | Reviews/social proof | Conversion trust |
| subscription/selling-plan app snippets | Subscription/purchase flow | Revenue |
| chat/support widgets | Customer support | Customer experience |
| analytics/GTM/pixel scripts | Attribution/privacy | Marketing and compliance |

Before editing around app blocks:

- Search for app comments.
- Search for snippet render calls.
- Check if section schema supports `@app`.
- Preserve app wrappers and insertion points.

## Deployment Levels

| Level | Description | Approval |
|-------|-------------|----------|
| Local draft | Files changed locally only | Usually safe |
| Local validation | Theme Check/build/preview command | Usually safe |
| Shopify preview theme upload | Upload to non-live preview theme | Ask if it writes to Shopify |
| Live theme edit | Direct change to current live theme | Approval required |
| Publish | Make a theme live | Approval required |
| Product/order/customer operation | Admin data mutation | Approval required |

## Preview-First Workflow

Preferred flow:

1. Work locally.
2. Validate with Theme Check.
3. Push to a duplicate or development theme only after approval if it writes remotely.
4. Share preview URL or exact preview instructions.
5. Verify mobile, desktop, and critical flows.
6. Ask for approval to publish.

Never present a preview upload as a publish. Never present a local validation as live proof.

## Rollback Requirements

Before any publish:

- Identify current live theme ID.
- Duplicate or preserve the current live theme if Shopify allows.
- Record changed files.
- Record the previous theme ID and target theme ID.
- Know the command/UI path to re-publish the previous live theme.
- Confirm no product/order/customer data mutation is part of the change.

Rollback note template:

```text
Current live theme: [id/name]
Candidate theme: [id/name]
Changed files: [count + list]
Validation: [commands/results]
Rollback: republish [previous theme id/name]
Approval needed: publish candidate theme
```

## Validation Gates

Minimum validation for theme code:

- `shopify theme check` or project equivalent.
- Schema JSON validity.
- Mobile viewport inspection.
- Desktop viewport inspection.
- Product page purchase flow if product UI changed.
- Cart drawer/cart page flow if cart UI changed.
- App blocks still render if nearby code changed.
- No console errors from changed JS.

For performance-sensitive changes:

- Check LCP image loading.
- Check CLS from images, app widgets, sticky bars.
- Check heavy JS on product/collection pages.
- Check mobile network conditions if possible.

For SEO-sensitive changes:

- Preserve title/meta/canonical/schema unless task is SEO.
- Validate JSON-LD if changed.
- Preserve heading hierarchy where practical.
- Do not hide crawlable content unintentionally.

## Revenue-Critical QA

Run or manually verify relevant flows:

- Product page loads.
- Variant picker works.
- Price updates correctly.
- Sold-out and unavailable states work.
- Quantity selector works.
- Add to cart works.
- Cart drawer opens and updates.
- Checkout button remains visible.
- Dynamic checkout buttons still render if present.
- Mobile sticky buy elements do not overlap content.
- Reviews/trust blocks still render.
- Support/help entry points remain visible.

Do not publish if a changed area touches these flows and they have not been verified.

## Horizon Upstream Handling

If updating or comparing Horizon:

- Do not blindly pull upstream into the live theme.
- Compare changed files first.
- Watch for custom HSC files and app modifications.
- Expect JSON template/content differences.
- Treat `main` branch upstream as potentially ahead of released Shopify Theme Store code.
- Use Theme Check after merges.
- Preview before publishing.

## Shopify CLI Caution

Common safe-ish commands when scoped correctly:

```bash
shopify theme check
shopify theme dev --store one-head-hair.myshopify.com
shopify theme list --store one-head-hair.myshopify.com
```

Commands that require approval or careful confirmation:

```bash
shopify theme push
shopify theme publish
shopify theme delete
shopify theme pull
```

`theme pull` can overwrite local files. Confirm target path and branch/state before using it.

## Secrets and Environment

Vincent's local rule may vary by project. For this folder, follow the live `AGENTS.md` and relevant project instructions.

General rules:

- Never print token values.
- Inspect variable names only when needed.
- Use local `.env` or `~/.env` according to the specific project instructions.
- Do not invent secret names.
- Do not commit `.env`.
- If a secret must change, ask before editing.

## Change Handoff Format

For production-facing Shopify work, finish with:

- Files changed.
- What changed.
- Validation performed.
- Preview/publish status.
- Approval needed, if any.
- Remaining risks.
- Recommended rollback path if publish is next.

Example:

```text
Files changed:
- sections/hs-custom-fit-guide.liquid
- blocks/hs-trust-item.liquid

Validation:
- shopify theme check passed
- mobile 390px and desktop 1440px preview checked
- product add-to-cart not touched

Status:
- Local only. Nothing published.

Next:
- Upload to duplicate preview theme after approval.
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Publishing because validation passed | Ask for explicit publish approval |
| Editing live theme directly | Work local or preview-first |
| Trusting old theme version notes | Verify Horizon 3.5.1/current theme evidence |
| Renaming setting IDs | Preserve merchant settings unless migration is planned |
| Ignoring app blocks | Check `@app`, app snippets, and protected prefixes |
| Calling preview "done" | State whether local, preview, or live |
| Skipping mobile | Horizon 3.5.1 specifically needs small-screen caution |
| Pulling over local custom work | Check status and diffs first |
| Dumping `.env` | Inspect names only, never values |

## Emergency Handling

If the live storefront appears broken:

1. Stop non-essential changes.
2. Identify whether the issue is live, preview-only, or local.
3. Capture exact affected URL, viewport/device, and symptoms.
4. Check recent theme/app changes.
5. If publish caused it, roll back by republishing the last known-good theme after approval or according to Vincent's explicit incident instruction.
6. Verify revenue-critical flows.
7. Document root cause and changed files.

Do not start broad refactors during an incident.

## Source Anchors

- Shopify Horizon repository: `https://github.com/Shopify/horizon`
- Shopify theme blocks: `https://shopify.dev/docs/storefronts/themes/architecture/blocks`
- Shopify theme-block quick start: `https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/quick-start`
- Shopify static blocks: `https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/static-blocks`
- Shopify Liquid block object: `https://shopify.dev/docs/api/liquid/objects/block`
- Horizon 3.5.1 release reference: `https://shopinfo.app/themes/horizon`
