---
name: shopify-liquid-designer
description: >
  This skill should be used when building, designing, or reviewing Shopify themes
  with design intelligence applied. Triggers include: "build a Shopify section",
  "design a theme", "write Liquid for", "create a Shopify component", "add a
  block to my theme", "design a product page", "make a hero section", "build a
  collection grid", "Shopify UI", "theme design system", "Liquid + Tailwind",
  "floating cards", "design in Figma first",
  or any request combining Shopify development with visual design decisions.
  Combines Liquid architecture mastery, Storefront API expertise, Figma design
  workflow, and UI/UX design intelligence into a single unified workflow.
version: 0.2.0
---

# Shopify Liquid Designer

Unified design-development intelligence for Shopify themes. Combines Figma design-first workflow, Liquid architecture, Storefront API patterns, and UI/UX design system knowledge into one workflow.

## Figma-First Principle

**Always design in Figma before writing Liquid.** Every section or component should begin as a Figma frame using Liquid-ready HTML structure conventions, so the code phase is a direct translation — not a reinvention.

### Figma → Liquid Naming Conventions

| Figma layer name | Maps to | Liquid equivalent |
|-----------------|---------|-------------------|
| `section/hero` | Section wrapper | `<section class="hero" id="shopify-section-{{ section.id }}">` |
| `block/card` | Theme block | `/blocks/card.liquid` |
| `snippet/icon` | Snippet | `{%- render 'icon', name: block.settings.icon -%}` |
| `[setting: heading]` | Schema setting | `{{ section.settings.heading }}` |
| `[setting: image]` | image_picker | `{{ section.settings.image | image_url: width: 800 | image_tag }}` |
| `[block: item]` | Schema block | `{%- for block in section.blocks -%}` |

### Figma Frame Setup Rules (Liquid-Ready)

1. **Top-level frame = Section** — name it `section/[name]`, set to Full Width (matching the Shopify section container)
2. **Reusable components = Theme Blocks** — name them `block/[name]`, build as Figma components so instances map to schema blocks
3. **Merchant-configurable text** — use placeholder text styled clearly; annotate with `[setting: id]` label
4. **Merchant-configurable images** — use a placeholder image component annotated `[setting: image_picker]`
5. **Design tokens** — use Figma variables that mirror Shopify CSS custom properties (see floating-cards.md for token naming)
6. **Responsive frames** — create Mobile (390px) and Desktop (1280px) frames for every section; these become the mobile-first breakpoints in CSS

### When Figma MCP is connected

If the Figma MCP connector is active:
- Read existing Figma frames directly with `get_design_context` before writing any Liquid
- Extract exact colors, spacing, radius, and shadow values from the Figma file
- Match the Liquid output precisely to the Figma design — no guessing
- Use `get_variable_defs` to pull Figma variable values and map them to CSS custom properties

### When Shopify MCP is connected

If the Shopify connector is active:
- Read existing theme files before writing new ones (`GET /themes/{id}/assets.json`)
- Check for third-party app file conflicts before modifying sections
- Push completed Liquid directly to the store via the Admin API
- Validate schema against live theme settings

## Decision Tree: Which Knowledge to Apply

```
User request
├── "design" / "style" / "look" / "UI" / "colors" / "layout"
│   → Apply Design System first, then Liquid structure
├── "section" / "block" / "schema" / "template" / "Liquid"
│   → Apply Liquid Architecture, add design layer
├── "Storefront API" / "GraphQL" / "headless" / "Framer"
│   → Apply Storefront API patterns (see references/storefront-api.md)
└── "review" / "audit" / "check" / "fix"
    → Use /review-liquid command for structured scoring
```

## Always-On Design Principles

Apply these to every section or component, regardless of explicit request:

| Rule | Requirement |
|------|-------------|
| Color contrast | Minimum 4.5:1 for body text, 3:1 for large text |
| Touch targets | 44×44px minimum for all interactive elements |
| Focus states | `:focus-visible` on `a`, `button`, `input`, `select` |
| Mobile-first | Write default CSS for mobile, use `@media (min-width: 768px)` for larger |
| Spacing rhythm | 8px base unit — use multiples: 8, 16, 24, 32, 48, 64, 80px |
| Typography | Body minimum 16px / line-height 1.5–1.75 / max 65–75 chars/line |
| Images | `| image_url: width: X` filter + `loading="lazy"` below fold |
| Motion | Always include `@media (prefers-reduced-motion: reduce)` guard |

## Liquid Architecture Quick Reference

### File Locations

| File type | Location | Purpose |
|-----------|----------|---------|
| Sections | `/sections/*.liquid` | Page-level content areas |
| Theme Blocks | `/blocks/*.liquid` | Reusable, nestable, configurable |
| Snippets | `/snippets/*.liquid` | Code reuse, no schema, accepts variables |
| Templates | `/templates/*.json` | Page structure (JSON-based) |
| Layout | `/layout/theme.liquid` | Global wrapper |
| Config | `/config/settings_schema.json` | Global theme settings |

### Block Decision Rule

Use **theme blocks** (`/blocks/`) when:
- The block will be used in more than one section
- Merchants need to configure it via the theme editor
- It needs to connect to dynamic sources or metaobjects
- Nesting is needed (supports up to 8 levels — recommend max 3)

Use **section blocks** (inline in schema) when:
- The block only makes sense inside one specific section
- No nesting needed
- Simpler schema management is preferred

Use **snippets** (`/snippets/`) when:
- Pure code reuse (no merchant configuration needed)
- Variables need to be passed explicitly (`{% render 'snippet', variable: value %}`)

### Section Schema Template

```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default heading"
    }
  ],
  "blocks": [
    {
      "type": "item",
      "name": "Item",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

### Liquid Best Practices

```liquid
{%- comment -%} Use {%- -%} to strip whitespace {%- endcomment -%}

{%- liquid
  assign featured = section.settings.collection
  assign product_count = section.settings.products_per_row | times: section.settings.row_count
-%}

{%- for product in featured.products limit: product_count -%}
  {%- render 'product-card', product: product, show_vendor: section.settings.show_vendor -%}
{%- endfor -%}

{%- comment -%} Always guard against nil objects {%- endcomment -%}
{%- if section.settings.image != blank -%}
  {{- section.settings.image | image_url: width: 1200 | image_tag: loading: 'lazy', alt: section.settings.image.alt | escape -}}
{%- endif -%}
```

## Design System Application

### Shopify CSS Custom Properties Pattern

Define global tokens via `config/settings_schema.json`, then reference them:

```liquid
{%- comment -%} In layout/theme.liquid or a snippet {%- endcomment -%}
<style>
  :root {
    --color-primary: {{ settings.color_primary }};
    --color-secondary: {{ settings.color_secondary }};
    --color-background: {{ settings.color_background }};
    --color-text: {{ settings.color_text }};
    --font-heading: {{ settings.type_header_font.family }}, {{ settings.type_header_font.fallback_families }};
    --font-body: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
    --spacing-unit: 8px;
    --border-radius: {{ settings.border_radius }}px;
  }
</style>
```

### Style → Shopify Mapping

| UI/UX Style | Shopify Implementation |
|-------------|------------------------|
| **Floating Cards** | Multi-layer `box-shadow` (outer lift + inner top highlight) + `border-radius: 20px` + `translateY(-4px)` hover — see `references/floating-cards.md` |
| Glassmorphism | `backdrop-filter: blur(12px)` on section wrapper + semi-transparent `background-color` |
| Minimalism | Generous whitespace, max 2 font weights, 3-color palette, hairline borders |
| Bento Grid | CSS Grid with `grid-template-areas`, variable column spans per block |
| Dark mode | Use `prefers-color-scheme: dark` media query + CSS custom properties |
| Neumorphism | `box-shadow` with dual light/dark shadows on matching background color |
| Brutalism | Bold borders, high contrast, system fonts, intentional asymmetry |

## Floating Cards System

Hair Solutions Co default card style. Apply to: features grids, pricing plans, testimonials, and stat counters. Full implementation in `references/floating-cards.md`.

### Quick Reference — Light Theme Card

```css
.floating-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 28px;
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,0.05),
    0 10px 24px -4px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.9);
  transition: box-shadow 220ms ease, transform 220ms ease;
}
.floating-card:hover {
  box-shadow:
    0 8px 12px -2px rgba(0,0,0,0.08),
    0 20px 40px -6px rgba(0,0,0,0.12),
    inset 0 1px 0 rgba(255,255,255,0.9);
  transform: translateY(-4px);
}
```

### Quick Reference — Dark Theme Card

```css
.floating-card--dark {
  background: #141414;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 28px;
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,0.4),
    0 10px 24px -4px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.05);
  transition: box-shadow 220ms ease, transform 220ms ease;
  color: rgba(255,255,255,0.88);
}
.floating-card--dark:hover {
  box-shadow:
    0 8px 12px -2px rgba(0,0,0,0.5),
    0 24px 48px -8px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.08);
  transform: translateY(-4px);
}
```

Always include `@media (prefers-reduced-motion: reduce)` to disable `transform` on hover.

### E-commerce Color Psychology

| Store type | Recommended palette direction |
|------------|-------------------------------|
| Beauty / Skincare | Warm neutrals, blush, sage — communicate trust and purity |
| Fashion | High contrast black/white or rich jewel tones — communicate luxury or trend |
| Hair care | Warm golds, soft creams, deep browns — natural, professional |
| Health / Wellness | Greens, blues, clean whites — communicate safety and vitality |
| SaaS tools | Blues, purples, grays — communicate reliability and innovation |

## Storefront API Integration Points

Use the Storefront API when building:
- Headless storefronts (Framer, custom React)
- Custom product configurators with non-variant options
- Ajax cart experiences without full page reload
- Product recommendation engines

Key patterns — see `references/storefront-api.md` for complete GraphQL queries.

Core endpoints:
- Product + variants: `query { product(handle: "...") { ... } }`
- Cart: `mutation cartCreate`, `cartLinesAdd`, `cartLinesUpdate`
- Custom options via line item properties: `attributes: [{key: "Engraving", value: "..."}]`

## Third-Party App Safety Rules

Never modify files with these prefixes without understanding app dependencies:

| Prefix | App | Risk if modified |
|--------|-----|-----------------|
| `ecom-*` | EComposer | Breaks visual page builder |
| `ss-*` | SectionStore | Breaks purchased sections |
| `foxify-*` | Foxify | Breaks theme functionality |
| `hs-custom-*` | Custom/in-house | ✅ Safe to modify |

Always check for app-specific comments (e.g., `<!-- /snippets/app-name.liquid -->`) before editing.

## Common Section Patterns

Reference `references/liquid-patterns.md` for complete code for:
- Hero with video/image background
- Product grid with filter sidebar
- Testimonials carousel
- Before/after image slider (for beauty/hair stores)
- FAQ accordion
- Announcement bar with countdown timer
- Sticky Add to Cart bar