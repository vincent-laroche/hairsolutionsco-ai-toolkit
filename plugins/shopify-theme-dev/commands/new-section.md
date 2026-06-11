---
description: Scaffold a new OS 2.0 / Horizon theme section at sections/<name>.liquid following the brand + architecture skills.
argument-hint: "<section-name> (e.g. hs-about-story or hs-custom-press-strip)"
---

# /new-section

Scaffold a production-ready, theme-editor-compatible section. Read the `shopify-os2-architecture` and `hairsolutions-brand` skills first.

## Steps

1. **Resolve the name** from `$ARGUMENTS`. Enforce the prefix convention: Home-family → `hs-home-*`; new bespoke components → `hs-custom-*` (unless an existing local file establishes another HSC prefix). Target path: `/Users/vMac/06_storefront/sections/<name>.liquid`. If a file already exists there, stop and ask.

2. **Confirm the build** if this is a substantive new module — briefly propose the section's purpose, layout options, and the engagement/SEO job it does, and get a quick yes (co-build mandate). Skip this for trivial scaffolds.

3. **Write the file** using the `hs-home-band.liquid` pattern:
   - Load the section's stylesheet if it has one (`{{ 'hs-home.css' | asset_url | stylesheet_tag }}` or a new asset).
   - A `{%- liquid -%}` header that aliases `section.settings` to `s` and derives presentation classes from `tone` / `title_style` (mirror the brand's serif-vs-display and light/dark/media logic).
   - Markup using brand classes (`home-eyebrow`, `home-serif` / `home-display`, `home-body`) or `hsc-*` atoms; CSS Grid/Flexbox only; container widths via `clamp()`/`%`/`fr`.
   - Exactly one `<h1>` only if this is a page's hero; otherwise `<h2>`.
   - Brand-correct image handling: LCP image `loading="eager"` `fetchpriority="high"` with `width`/`height` + `srcset`; others `loading="lazy"`; meaningful `alt`. Prefer Cloudinary AssetLink delivery for new media.
   - Preserve `{{ block.shopify_attributes }}` on any block roots; use `{% content_for 'blocks' %}` if it accepts dynamic children.

4. **Schema** — a full `{% schema %}` with:
   - `"name"`, `"tag": "section"`, a stable `"class"`.
   - A sensible `settings` array (group with `{ "type": "header", ... }`); advertise inline HTML in any heading `text` label (`"Title (HTML ok: <br>, <i>)"`) so the `<em>`/`<i>` gold-accent emphasis works with zero CSS.
   - At least one `presets` entry so it's drag-and-drop in the theme editor.
   - Keep setting `id`s stable and descriptive.

5. **Validate** (`shopify theme check` if available, else JSON-parse the schema), then tell the user the file is scaffolded. Suggest running `/design-check sections/<name>.liquid` before `/ship`. Do **not** auto-ship a scaffold.
