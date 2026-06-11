---
name: shopify-liquid
description: Use when writing, editing, reviewing, or debugging Shopify Liquid theme code for hairsolutions.co, including Horizon 3.5.1 sections, blocks, snippets, schema, dynamic sources, metaobjects, theme editor behavior, Liquid syntax, and theme-block architecture
---

# Shopify Liquid

## Overview

This is the primary Liquid implementation skill for Hair Solutions Co. Use it for theme code, not Admin API workflows, visual-only design, or production deployment.

The live storefront target is `hairsolutions.co` on `one-head-hair.myshopify.com`, using Horizon 3.5.1 as the live theme baseline. Horizon is a theme-block-first Shopify theme: prefer reusable `/blocks/*.liquid` where merchant-configurable components need reuse, nesting, dynamic sources, or theme editor control.

## Hard Boundaries

- Read existing theme files before editing.
- Do not publish theme changes without explicit approval.
- Do not modify product, order, checkout, fulfillment, billing, customer, or workflow data from this skill.
- Do not touch third-party app files unless Vincent explicitly asks.
- Do not expose secrets or run commands that dump `.env` values.
- Do not assume an old path or old theme ID is current.
- Do not use stale older-Horizon assumptions. Treat Horizon 3.5.1 as the live target unless current filesystem/store evidence says otherwise.

## Hair Solutions Store Context

| Item | Current rule |
|------|--------------|
| Store | `one-head-hair.myshopify.com` / `hairsolutions.co` |
| Theme baseline | Horizon 3.5.1 live theme |
| Business priority | Protect revenue, customer experience, trust, speed, and operational control |
| Custom prefixes | `hs-custom-*`, `support-hub-*`, `kb_*`, `blog-*` |
| Do not casually edit | EComposer `ecom-*`, SectionStore `ss-*`, Foxify `foxify-*`, app snippets, checkout-adjacent flows |
| Typography | Preserve Knockout font conventions where already implemented |
| Mobile | Required on every deliverable |

## Use With These Skills

| Need | Use |
|------|-----|
| Liquid, sections, blocks, snippets, schema | This skill |
| Storefront styling, CSS, UI, animation, JS | `shopify-front-end` |
| Deployment, app safety, live theme operations | `shopify-production` |
| Metaobject definitions and Admin API custom data | `shopify-metaobjects` or official Shopify custom-data skill |
| Storefront/Admin API integrations | `shopify-apis` or official Shopify API skills |
| Very broad official Liquid reference | `/Users/vMac/03_agents/plugins/shopify-plugin/skills/shopify-liquid/SKILL.md` |
| Horizon-specific architecture reference | `/Users/vMac/03_agents/plugins/shopify-liquid-designer/skills/shopify-horizon/SKILL.md` |

## Work Sequence

1. Identify the exact theme/project path.
2. Read `AGENTS.md`, `CLAUDE.md`, `README.md`, and nearby theme files if they exist.
3. Confirm whether work is local-only, preview theme, or live theme.
4. Inspect the existing section/block/snippet before changing it.
5. Choose the smallest theme-editor-compatible change.
6. Validate Liquid/schema with Theme Check or the project validation command.
7. If visual behavior changed, verify mobile and desktop.
8. Stop before publishing or any customer-impacting action.

## Horizon 3.5.1 Working Notes

Horizon 3.5.1 is a patch-level live baseline. Its public release notes call out translation-string fixes and better small-screen support for Split showcase. Do not reintroduce layout assumptions that break narrow mobile screens.

Horizon uses modern Shopify theme architecture:

- `/blocks/*.liquid` for reusable theme blocks.
- `/sections/*.liquid` for page-level section containers.
- `/snippets/*.liquid` for reusable logic or markup without merchant settings.
- JSON templates for theme-editor composition.
- `{% content_for 'blocks' %}` to render dynamic child blocks.
- `{% content_for 'block', type: '...', id: '...' %}` to render static blocks.
- `{% stylesheet %}` and `{% javascript %}` where component-scoped assets are supported.

## Theme Blocks vs Section Blocks vs Snippets

| Use case | Choose | Why |
|----------|--------|-----|
| Reusable merchant-configurable component | Theme block in `/blocks` | Reuse across sections, supports nesting and settings |
| One-off content item local to one section | Section block | Simpler and scoped |
| Reused code that needs parameters | Snippet | Accepts variables through `render` |
| Locked structural child that still has settings | Static theme block | Keeps layout stable while exposing settings |
| App-provided content | App block | Preserves installed app behavior |

Do not mix section blocks and theme blocks in the same section unless current Shopify documentation and the live theme prove the pattern is supported for that file.

## File Placement

| File type | Location | Rule |
|-----------|----------|------|
| Section | `/sections/name.liquid` | Full-width page module, schema required |
| Theme block | `/blocks/name.liquid` | Reusable configurable component, schema required |
| Snippet | `/snippets/name.liquid` | Reusable render-only code, no merchant settings |
| Asset | `/assets/name.css` or `/assets/name.js` | Only when global or reused enough to justify asset file |
| Template | `/templates/*.json` | Theme-editor composition, avoid hardcoded layout churn |
| Locale | `/locales/*.json` | Translatable strings only |

## Liquid Style Rules

- Use whitespace control: `{%- -%}` and `{{- -}}` where it keeps output clean.
- Guard nullable objects before rendering.
- Use `.value` for metaobject/metafield values when required by the object shape.
- Assign before complex expressions. Do not pipe inside brackets.
- Escape merchant-provided plain text with `escape`.
- Use `image_url` plus `image_tag` for images.
- Use translation keys for theme UI strings when editing reusable theme content.
- Do not rely on literal Shopify-generated block IDs.
- Always preserve theme editor attributes.

## Required Theme Editor Hooks

Every editable block root needs:

```liquid
{{- block.shopify_attributes -}}
```

Every dynamic section or block container needs stable structure and predictable classes:

```liquid
<section
  class="hs-custom-feature color-{{ section.settings.color_scheme }}"
  id="shopify-section-{{ section.id }}"
>
  {%- content_for 'blocks' -%}
</section>
```

For section blocks:

```liquid
{%- for block in section.blocks -%}
  <div class="hs-custom-feature__item" {{ block.shopify_attributes }}>
    {{- block.settings.heading | escape -}}
  </div>
{%- endfor -%}
```

## Theme Block Pattern

Use this when the component should be reusable or nested.

```liquid
{% doc %}
  Renders a configurable trust item for Hair Solutions pages.

  @example
  {% content_for 'block', type: 'hs-trust-item', id: 'trust-item' %}
{% enddoc %}

{%- liquid
  assign heading = block.settings.heading
  assign body = block.settings.body
-%}

<div class="hs-trust-item" {{ block.shopify_attributes }}>
  {%- if heading != blank -%}
    <h3 class="hs-trust-item__heading">{{- heading | escape -}}</h3>
  {%- endif -%}

  {%- if body != blank -%}
    <div class="hs-trust-item__body rte">
      {{- body -}}
    </div>
  {%- endif -%}

  {%- content_for 'blocks' -%}
</div>

{% stylesheet %}
  .hs-trust-item {
    display: grid;
    gap: 0.75rem;
  }
{% endstylesheet %}

{% schema %}
{
  "name": "Trust item",
  "blocks": [{ "type": "@theme" }, { "type": "@app" }],
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading"
    },
    {
      "type": "richtext",
      "id": "body",
      "label": "Body"
    }
  ],
  "presets": [
    {
      "name": "Trust item"
    }
  ]
}
{% endschema %}
```

## Section Pattern for Horizon

Use this for a section that accepts reusable theme blocks.

```liquid
{%- liquid
  assign color_scheme = section.settings.color_scheme
  assign heading = section.settings.heading
-%}

<section
  class="hs-custom-section color-{{ color_scheme }}"
  id="shopify-section-{{ section.id }}"
>
  <div class="hs-custom-section__inner">
    {%- if heading != blank -%}
      <h2 class="hs-custom-section__heading">{{- heading | escape -}}</h2>
    {%- endif -%}

    <div class="hs-custom-section__blocks">
      {%- content_for 'blocks' -%}
    </div>
  </div>
</section>

{% stylesheet %}
  .hs-custom-section {
    padding-block: clamp(2rem, 5vw, 5rem);
  }

  .hs-custom-section__inner {
    width: min(100% - 2rem, 1400px);
    margin-inline: auto;
  }

  .hs-custom-section__blocks {
    display: grid;
    gap: 1rem;
  }
{% endstylesheet %}

{% schema %}
{
  "name": "HS custom section",
  "tag": "section",
  "class": "section",
  "blocks": [{ "type": "@theme" }, { "type": "@app" }],
  "settings": [
    {
      "type": "color_scheme",
      "id": "color_scheme",
      "label": "Color scheme",
      "default": "scheme-1"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading"
    }
  ],
  "presets": [
    {
      "name": "HS custom section"
    }
  ]
}
{% endschema %}
```

## Static Blocks

Use static blocks when the section layout needs a fixed child component that merchants can configure but not move/delete.

```liquid
{%- content_for "block", type: "hs-split-showcase-media", id: "split-showcase-media" -%}
```

Rules:

- The `id` is required and must be unique within the immediate parent.
- Use a stable literal ID for static blocks.
- Static blocks may be conditionally rendered.
- Static blocks do not behave like free draggable children.
- Include static blocks in presets when default settings need to be overridden.

## Schema Rules

- Every section/block that merchants can add needs `presets`.
- Every merchant setting needs clear `id`, `type`, and `label`.
- Avoid `default` on schema `text` and `textarea` inputs when the project rule says to use `placeholder`.
- Use `color_scheme` instead of ad hoc color pickers unless the design truly needs custom colors.
- Use `image_picker`, `video`, `product`, `collection`, `page`, `url`, `richtext`, `inline_richtext`, `range`, `checkbox`, and `select` according to actual editor needs.
- Keep setting IDs stable once live. Renaming setting IDs can erase merchant-configured content.
- For single CSS values, prefer inline custom properties and component CSS.
- For multi-property variants, prefer constrained classes from a `select`.

## Metaobjects and Metafields in Liquid

Use metaobjects when content is structured, reusable, or should be managed like a CMS. Use metafields when the value belongs to a Shopify resource such as product, variant, collection, page, or customer.

Common access pattern:

```liquid
{%- assign guide = product.metafields.custom.fit_guide.value -%}

{%- if guide != blank -%}
  <section class="hs-fit-guide">
    {%- if guide.title.value != blank -%}
      <h2>{{- guide.title.value | escape -}}</h2>
    {%- endif -%}
  </section>
{%- endif -%}
```

Rules:

- Check namespace and key exactly.
- Use `.value` for references and structured values where needed.
- Guard every optional field.
- Do not create or change metaobject definitions from this skill unless Vincent explicitly asks.
- If the task is schema/data modeling, switch to `shopify-metaobjects`.

## Images

Use Shopify image filters. Avoid hardcoded CDN variants.

```liquid
{%- if section.settings.image != blank -%}
  {{
    section.settings.image
    | image_url: width: 1600
    | image_tag:
      widths: '375, 550, 750, 1100, 1500, 1600',
      sizes: '(min-width: 990px) 50vw, 100vw',
      loading: 'lazy',
      alt: section.settings.image.alt
  }}
{%- endif -%}
```

Above-the-fold hero image rule:

- Do not lazy-load the likely LCP image.
- Set appropriate `fetchpriority` if the current theme pattern supports it.
- Keep mobile crop and focal point behavior explicit.

## Product and Cart Safety

Product, variant, cart, and selling-plan UI is revenue-sensitive.

Before changing product forms:

- Read the existing product form section/block/snippet.
- Identify variant picker, quantity, selling plan, buy buttons, app blocks, and cart drawer dependencies.
- Preserve input names, form IDs, section rendering hooks, and JS event expectations.
- Test unavailable variants, sold-out variants, default variants, and mobile.
- Do not alter price, availability, inventory, subscription, bundle, discount, or checkout behavior casually.

## Liquid Review Checklist

Before returning or committing a Liquid change:

- Existing file read first.
- Horizon 3.5.1 assumptions used.
- Theme editor compatibility preserved.
- `block.shopify_attributes` preserved on block roots.
- Dynamic blocks use `{% content_for 'blocks' %}`.
- Static blocks have stable literal IDs.
- Schema JSON is valid.
- Settings IDs are stable and meaningful.
- No default text where placeholders are required by project rules.
- Metaobject fields guard `.value`.
- App blocks and third-party prefixes are not broken.
- Mobile layout exists.
- Images use responsive filters.
- No customer/production data changed.
- Theme Check or local validation was run when available.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Editing from memory | Read the live file first |
| Treating Horizon like Dawn | Use theme blocks and `content_for` patterns |
| Hardcoding block IDs | Use stable static IDs only where required; never rely on generated IDs |
| Forgetting `block.shopify_attributes` | Add it to editable block roots |
| Renaming setting IDs | Keep live IDs stable or plan migration |
| Using snippets for merchant-configurable UI | Use theme blocks |
| Using theme blocks for pure helper markup | Use snippets |
| Breaking app blocks | Include `@app` where app insertion matters and avoid app-owned files |
| Desktop-only section | Build and inspect mobile first |
| Publishing from a coding task | Stop and ask for approval |

## Validation Commands

Use the project's existing validation first. If in a Shopify theme folder, likely checks include:

```bash
shopify theme check
shopify theme dev --store one-head-hair.myshopify.com
```

If official Shopify plugin validation scripts are available, use them for generated Liquid artifacts. If they are not available in the current environment, state that clearly and use Theme Check or targeted review instead.

## Source Anchors

- Shopify theme blocks: `https://shopify.dev/docs/storefronts/themes/architecture/blocks`
- Shopify theme-block quick start: `https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/quick-start`
- Shopify static blocks: `https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/static-blocks`
- Shopify Liquid block object: `https://shopify.dev/docs/api/liquid/objects/block`
- Horizon source: `https://github.com/Shopify/horizon`
- Horizon 3.5.1 release reference: `https://shopinfo.app/themes/horizon`
