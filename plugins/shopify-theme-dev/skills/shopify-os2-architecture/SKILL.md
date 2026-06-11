---
name: shopify-os2-architecture
description: "How to build and edit OS 2.0 / Horizon theme files for the hairsolutions.co storefront — sections, blocks, snippets, schema, presets, theme-editor behavior, and the Liquid/CSS/JS performance rules. Use whenever creating or editing a .liquid section, block, snippet, schema, or wiring section settings/metaobjects. Keywords: Liquid, section, block, snippet, schema, preset, OS 2.0, Horizon, theme editor, shopify_attributes, content_for blocks, hs-custom."
compatibility: Claude Code, Claude Desktop, Cursor
metadata:
  author: Vincent Laroche
  version: "1.0"
---

# Shopify OS 2.0 / Horizon architecture — storefront theme

Theme baseline: **Horizon 3.5.1** (from `AGENTS.md`). `main` is production and Shopify-synced — every edit ships live (see the `git-ship-workflow` skill). Inspect nearby files before editing; make small, focused diffs; preserve Horizon theme blocks, schemas, setting IDs, dynamic sources, metafields, app blocks, and `block.shopify_attributes`.

## Directory conventions

| Dir | Purpose |
|-----|---------|
| `blocks/*.liquid` | Reusable, configurable components (theme blocks) |
| `sections/*.liquid` | Page modules (merchant-addable) |
| `snippets/*.liquid` | Render-only helpers (e.g. `hs-home-buttons.liquid`) |
| `templates/*.json` | Page templates wiring sections + settings (e.g. `templates/index.json`) |
| `assets/*.css` / `*.js` | Section styles/scripts (e.g. `assets/hs-home.css`) |

**Naming:** Home-family sections use the `hs-home-*` prefix (`hs-home-band`, `hs-home-grid`, `hs-home-process`, `hs-home-faq`, `hs-home-seo`). New bespoke components use **`hs-custom-*`** unless the local file already establishes another HSC prefix (e.g. `hs-custom-hero`, `hs-custom-before-after`, `hs-custom-feature-grid`). Do not modify app-managed `ecom-*`, `ss-*`, or `foxify-*` files unless explicitly asked.

## Mandatory schema/editor rules

- **Every merchant-addable section/block needs `presets`** so it is drag-and-drop in the theme editor.
- Preserve `{{ block.shopify_attributes }}` on every block root element.
- Use `{% content_for 'blocks' %}` to render dynamic child blocks in sections that accept them.
- **Setting IDs are stable once live** — renaming an `id` orphans the merchant's saved value. Add new settings; don't rename existing ones.
- Use `.value` for metafield/metaobject values. Guard nullable objects. `escape` merchant-entered text. Never pipe inside bracket expressions — assign first.

## Liquid performance & safety (from CLAUDE.md §7 / AGENTS.md)

- Use `{% liquid %}` for multi-line logic; assign repeated lookups to a variable once.
- **Never** call `all_products` / `collections.all` inside loops.
- **Paginate** any loop that could exceed 20 items.
- Avoid `{% render %}` inside `{% for %}` where possible.
- Use whitespace control (`{%-`/`-%}`) where appropriate.
- Snippet render budget < 50ms; eliminate redundant object lookups in loops.

## CSS & layout

- CSS Grid/Flexbox only — no floats, no Bootstrap grid.
- No hardcoded px on layout containers — `clamp()`, `%`, `fr`.
- Author colors as the OKLCH tokens (see `hairsolutions-brand` skill); never inline hex.
- `text-wrap: balance` on H1/H2; `text-wrap: pretty` on paragraphs.

## JavaScript

- Vanilla JS or the theme's existing pattern only. No jQuery unless already present.
- `IntersectionObserver` for scroll effects — not scroll listeners.
- `defer` / `type="module"` for non-critical scripts; nothing synchronous in `<head>`.

## Mobile QA

Verify at **320, 375, 390, and 430px** (from `AGENTS.md`). **Halve all section spacing below 768px** (Design.md). Maintain keyboard access, visible focus, readable contrast, semantic labels, and 44px touch targets.

---

## Worked example — `sections/hs-home-band.liquid` (the canonical template)

This live section is the pattern to copy for new Home-family modules. It packs five layouts (`hero`, `media`, `statement`, `split`, `cta`) into one merchant-configurable section, driven by three `select` settings: `layout`, `tone`, and `title_style`.

### 1 · `{% liquid %}` settings-extraction header

```liquid
{{ 'hs-home.css' | asset_url | stylesheet_tag }}
{%- liquid
  assign s = section.settings
  assign tone = s.tone
  assign btn1_class = 'home-btn--primary'
  assign btn2_class = 'home-btn--ghost'
  if tone == 'media' or tone == 'dark'
    assign btn1_class = 'home-btn--light'
    assign btn2_class = 'home-btn--light-ghost'
  endif
  assign title_class = 'home-serif'
  if s.title_style == 'display'
    assign title_class = 'home-display'
    if tone == 'media' or tone == 'dark'
      assign title_class = 'home-display home-display--light'
    endif
  endif
-%}
```

Note the pattern: alias `section.settings` to `s` once, derive presentation classes from `tone`/`title_style` in one `{% liquid %}` block, then keep the markup branch-light. This is how `title_style` maps onto the brand's serif-vs-display rule and `tone` maps onto light/dark/media surfaces (see `hairsolutions-brand` §2/§6).

### 2 · Layout branching + brand-correct image handling

The `hero`/`media` branch is the LCP path and demonstrates the image rules. The hero image is `loading="eager"` + `fetchpriority="high"` with explicit `width`/`height` (CLS protection) and a `srcset`; the `split` branch image is `loading="lazy"`:

```liquid
{%- if s.layout == 'hero' or s.layout == 'media' -%}
  <div class="home-card home-card--media home-cat" style="padding:0;">
    {%- if s.image != blank -%}
      {%- if s.image_mobile != blank -%}
        <img class="home-card__bg" src="{{ s.image_mobile | image_url: width: 1000 }}"
             alt="{{ s.image.alt | default: s.title | strip_html }}"
             fetchpriority="high" loading="eager" width="1000" height="1500"
             srcset="{{ s.image_mobile | image_url: width: 600 }} 600w,
                     {{ s.image_mobile | image_url: width: 1000 }} 1000w,
                     {{ s.image | image_url: width: 1600 }} 1600w,
                     {{ s.image | image_url: width: 2200 }} 2200w"
             sizes="100vw">
      {%- else -%}
        {{ s.image | image_url: width: 2200 | image_tag:
           loading: 'eager', fetchpriority: 'high', class: 'home-card__bg',
           widths: '600,1000,1600,2200', sizes: '100vw',
           alt: s.image.alt | default: s.title | strip_html }}
      {%- endif -%}
    {%- endif -%}
    ...
    {%- if s.title != blank -%}
      {%- if s.layout == 'media' -%}<h2 class="{{ title_class }}">{{ s.title }}</h2>
      {%- else -%}<h1 class="{{ title_class }}">{{ s.title }}</h1>{%- endif -%}
    {%- endif -%}
```

> Image delivery note: these live sections currently use `image_picker` settings + Shopify's `image_url`/`image_tag` filters. The brand's media direction is to serve through **Cloudinary AssetLink** (see the `cloudinary-assetlink` skill). When AssetLink wires a Cloudinary asset to a section/metafield, reference that linked source and build the Cloudinary delivery URL — do not run `image_url` on a Cloudinary-hosted asset. Follow whichever the page already uses, and prefer AssetLink for new media work.

Only one `<h1>` per page — the hero uses `<h1>`, every other band uses `<h2>` (SEO rule, see `seo-engagement-checklist`).

### 3 · `{% schema %}` — settings + presets

```json
{% raw %}{% schema %}
{
  "name": "Home · Band",
  "tag": "section",
  "class": "hs-home-section",
  "settings": [
    { "type": "select", "id": "layout", "label": "Layout", "default": "statement",
      "options": [
        { "value": "hero",      "label": "Hero (full image card)" },
        { "value": "media",     "label": "Media card (text on image)" },
        { "value": "statement", "label": "Statement (prose card)" },
        { "value": "split",     "label": "Split (image + text)" },
        { "value": "cta",       "label": "CTA (centered)" }
      ] },
    { "type": "select", "id": "tone", "label": "Tone", "default": "paper",
      "options": [
        { "value": "paper", "label": "Paper (light)" },
        { "value": "dark",  "label": "Dark" },
        { "value": "media", "label": "Media / image" }
      ] },
    { "type": "select", "id": "title_style", "label": "Title style", "default": "serif",
      "options": [
        { "value": "serif",   "label": "Instrument Serif" },
        { "value": "display", "label": "Heavy Geist display" }
      ] },
    { "type": "image_picker", "id": "image", "label": "Image" },
    { "type": "image_picker", "id": "image_mobile", "label": "Mobile image (hero, optional)" },
    { "type": "text", "id": "eyebrow", "label": "Eyebrow" },
    { "type": "text", "id": "title", "label": "Title (HTML ok: <br>, <i>)" },
    { "type": "richtext", "id": "body", "label": "Body" },
    { "type": "text", "id": "supporting", "label": "Supporting line (small)" },
    { "type": "header", "content": "Buttons" },
    { "type": "text", "id": "button_1_label", "label": "Button 1 label" },
    { "type": "url",  "id": "button_1_url",   "label": "Button 1 link" },
    { "type": "text", "id": "button_2_label", "label": "Button 2 label" },
    { "type": "url",  "id": "button_2_url",   "label": "Button 2 link" }
  ],
  "presets": [ { "name": "Home · Band" } ]
}
{% endschema %}{% endraw %}
```

Key takeaways for new sections:
- `"tag": "section"` + a stable `"class"` (here `hs-home-section`).
- Group related settings with `{ "type": "header", "content": "…" }`.
- The `title` label explicitly advertises inline HTML (`<br>`, `<i>`) so merchants can use the `<em>`/`<i>` gold-accent emphasis (see `hairsolutions-brand` §6) — **no CSS edit needed to restyle emphasis.**
- Always include at least one `presets` entry.

### Scaffolding a new section
Use the `/new-section <name>` command, which generates this exact skeleton (settings header, tone/layout pattern, full schema with presets) under the correct prefix.
