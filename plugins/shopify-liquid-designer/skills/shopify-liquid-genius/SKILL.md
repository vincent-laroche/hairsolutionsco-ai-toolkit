---
name: shopify-liquid-genius
description: This skill should be used when working with Shopify themes, Liquid templating, theme blocks, sections, dynamic sources, or any Shopify theme development tasks. Provides comprehensive guidance on building production-quality Shopify themes with focus on Horizon theme patterns, blocks architecture, schema design, and Liquid best practices.
---

# Shopify Liquid Genius

Complete reference for building production-quality Shopify themes using Liquid, with special focus on Horizon theme patterns, theme blocks architecture, dynamic sources, and modern theme development.

## When to Use This Skill

Use this skill when:
- Building or modifying Shopify theme sections
- Creating reusable theme blocks
- Working with dynamic sources and metaobjects
- Implementing complex schema patterns
- Debugging Liquid syntax issues
- Setting up responsive layouts for Shopify themes
- Need guidance on Shopify theme architecture

## Theme Architecture Overview

### Directory Structure
```
/assets/         CSS, JS, images, fonts
/blocks/         Theme blocks (reusable across sections)
/config/         Theme settings, color schemes
/layout/         theme.liquid, password.liquid
/locales/        Translation files
/sections/       Section files (.liquid)
/snippets/       Reusable components (.liquid)
/templates/      Page templates (.json)
```

### Third-Party App Identification

Know which files belong to apps vs native theme:

| Prefix | Type | Can Modify? |
|--------|------|-------------|
| `hs-custom-*` | Custom sections | ✅ YES |
| `ecom-*` | EComposer App | ⚠️ CAREFUL |
| `ss-*` | SectionStore App | ⚠️ CAREFUL |
| `foxify-*` | Foxify App | ⚠️ CAREFUL |

**Warning:** Third-party apps may leave traces throughout theme files. Don't delete app comments or markers without understanding dependencies.

## Blocks System Mastery

### The Three Block Types

**1. Theme Blocks** (Most Flexible)
- Location: `/blocks/` folder
- Reusable across ALL sections and blocks
- Nestable up to 8 levels deep
- Use when maximum reusability is needed

**2. Section Blocks** (Section-Specific)
- Location: Inside section file schema
- Reusable ONLY within that section
- NOT nestable - single level only
- Use when block only makes sense in one section

**3. App Blocks** (Third-Party)
- Location: Defined by installed apps
- Always type: `@app`
- Support required in section schema

### Theme Blocks vs Snippets

| Feature | Theme Blocks | Snippets |
|---------|--------------|----------|
| Location | `/blocks/` | `/snippets/` |
| Has Schema | ✅ YES | ❌ NO |
| Theme Editor | ✅ Merchants can configure | ❌ Developer only |
| Nestable | ✅ YES (8 levels) | ❌ NO |
| Pass Variables | ❌ NO | ✅ YES |
| Dynamic Sources | ✅ YES | ❌ NO |

**Best Practice - Combined Pattern:**
```liquid
<!-- /blocks/product-card.liquid -->
<div {{ block.shopify_attributes }}>
  {%- render 'product-card-markup',
      product: block.settings.product,
      show_vendor: block.settings.show_vendor
  -%}
</div>
```

## Dynamic Sources & Context

### The `closest` Pattern

**CRITICAL:** Theme blocks don't know their context ahead of time. Use `closest.<type>` to access the nearest resource of that type.

```liquid
<!-- /blocks/price.liquid -->
<span class="price">
  {{ closest.product.price | money }}
</span>
```

**Resolution order for `closest.product`:**
1. Block's own product setting
2. Parent block's product setting
3. Section's product setting
4. Template's product resource

**Available types:** `closest.product`, `closest.collection`, `closest.article`, `closest.page`, `closest.blog`

### Passing Context in Liquid

**Via `content_for` tag:**
```liquid
{% content_for "blocks", product: featured_product %}
```

**Via static block rendering:**
```liquid
{%- for product in collection.products -%}
  {% content_for "block",
      type: "product-card",
      id: "card-{{ product.id }}",
      product: product
  %}
{%- endfor -%}
```

### Dynamic Sources in Schema

Compatible setting types for dynamic sources:

| Setting Type | Can Use Dynamic Source? | Example Source |
|--------------|------------------------|----------------|
| `text` | ✅ YES | `product.title` |
| `image_picker` | ✅ YES | `product.featured_image` |
| `url` | ✅ YES | `product.url` |
| `richtext` | ✅ YES | `product.description` |
| `color` | ❌ NO | - |
| `checkbox` | ❌ NO | - |

**Example:**
```json
{
  "type": "text",
  "id": "heading",
  "label": "Heading",
  "default": "{{ product.title }}"
}
```

**Limitations:**
- No additional Liquid filters allowed
- Context must exist in template

## Schema Design

### Section Schema Template

```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "custom-class",
  "settings": [
    /* Section-level settings */
  ],
  "blocks": [
    {"type": "@theme"},  /* Accept all theme blocks */
    {"type": "@app"}     /* Accept app blocks */
  ],
  "max_blocks": 16,
  "presets": [
    {
      "name": "Preset Name",
      "settings": {},
      "blocks": []
    }
  ]
}
{% endschema %}
```

### Settings Type Reference

**Text Inputs:**
```json
{"type": "text", "id": "heading", "label": "Heading", "placeholder": "Enter text"}
{"type": "textarea", "id": "description", "label": "Description"}
{"type": "richtext", "id": "content", "label": "Content"}
```

**Media Inputs:**
```json
{"type": "image_picker", "id": "image", "label": "Image"}
{"type": "video", "id": "video_file", "label": "Video"}
```

**Choice Inputs:**
```json
{"type": "checkbox", "id": "enable", "label": "Enable", "default": true}
{"type": "select", "id": "layout", "label": "Layout", "options": [...], "default": "center"}
{"type": "radio", "id": "style", "label": "Style", "options": [...], "default": "boxed"}
```

**Number Inputs:**
```json
{"type": "range", "id": "padding", "label": "Padding", "min": 0, "max": 200, "step": 10, "unit": "px", "default": 60}
{"type": "number", "id": "max_items", "label": "Max Items", "default": 4}
```

### Schema Defaults Compatibility

| Type | `default` Works? | Alternative |
|------|-----------------|-------------|
| `text` | ❌ NO | `placeholder` |
| `textarea` | ❌ NO | `placeholder` |
| `url` | ⚠️ INCONSISTENT | Liquid `\| default:` |
| `checkbox` | ✅ YES | - |
| `select` | ✅ YES | - |
| `radio` | ✅ YES | - |
| `range` | ✅ YES | - |
| `number` | ✅ YES | - |

## Liquid Syntax Patterns

### Comment Safety Rules

**SAFE:**
```liquid
{% comment %}
Section Name
Description of functionality
{% endcomment %}
```

**UNSAFE:**
```liquid
{% comment %}
=====================================
  DECORATIVE BREAKS PARSER
=====================================
{% endcomment %}
```

**Rule:** Plain text only. No decorative characters like `====`, `----`, `****`.

### Whitespace Control

Always use `-` for clean output:
```liquid
{%- if condition -%}
  {%- assign var = value -%}
{%- endif -%}
```

### Filters in Brackets

**NEVER DO THIS:**
```liquid
{%- assign blog = blogs[handle | default: 'news'] -%}
```
**Error:** `Expected close_square but found pipe`

**ALWAYS DO THIS:**
```liquid
{%- assign h = handle | default: 'news' -%}
{%- assign blog = blogs[h] -%}
```

**Why:** Liquid does NOT allow pipe filters inside `[]` bracket notation.

### Metaobject Access

```liquid
{%- assign categories = shop.metaobjects.blog_category.values | sort: 'display_order' -%}

{%- for category in categories -%}
  {{ category.title.value }}         <!-- Field value -->
  {{ category.icon_id.value }}       <!-- Field value -->
  {{ category.system.url }}          <!-- System property -->
{%- endfor -%}
```

**Critical:** ALWAYS use `.value` for metaobject fields.

### Block Rendering Patterns

**Dynamic Blocks (Merchant-Controlled):**
```liquid
{% content_for "blocks" %}
```

**Static Blocks (Developer-Controlled):**
```liquid
{% content_for "block", type: "heading", id: "main-heading" %}
```

### Section Blocks Loop

```liquid
{%- for block in section.blocks -%}
  <div {{ block.shopify_attributes }}>
    {%- case block.type -%}
      {%- when 'heading' -%}
        <h2>{{ block.settings.text }}</h2>
      {%- when 'text' -%}
        <p>{{ block.settings.content }}</p>
    {%- endcase -%}
  </div>
{%- endfor -%}
```

**CRITICAL:** Always include `{{ block.shopify_attributes }}` for theme editor compatibility.

## CSS & Responsive Design

### CSS Custom Properties Pattern

```css
.section-name {
  --padding-top: {{ section.settings.padding_top }}px;
  --padding-bottom: {{ section.settings.padding_bottom }}px;
  --bg-color: {{ section.settings.background_color }};

  padding-top: var(--padding-top);
  padding-bottom: var(--padding-bottom);
  background: var(--bg-color);
}
```

### Responsive Breakpoints

```css
/* Desktop-first approach */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile landscape */ }
@media (max-width: 640px)  { /* Mobile portrait */ }
```

### Grid System

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
```

## Production Workflows

### Creating a New Theme Block

1. Create `/blocks/block-name.liquid`
2. Add schema with settings and presets
3. Add to section schema: `{"type": "@theme"}`
4. Render in section: `{% content_for "blocks" %}`

### Creating a New Section

1. Create `/sections/section-name.liquid`
2. Add complete template with Liquid markup
3. Add `<style>` block with responsive CSS
4. Add `{% schema %}` with settings and presets

### Image Optimization

```liquid
{{
  section.settings.image
  | image_url: width: 1920
  | image_tag:
    loading: 'lazy',
    widths: '375, 550, 750, 1000, 1500, 1920',
    sizes: '100vw',
    class: 'image-class'
}}
```

## Critical Don'ts

1. ❌ Don't forget whitespace control: Use `{%- -%}`
2. ❌ Don't access metaobjects without `.value`
3. ❌ Don't use filters inside brackets
4. ❌ Don't use `default` on text inputs - use `placeholder`
5. ❌ Don't forget `{{ block.shopify_attributes }}`
6. ❌ Don't use decorative comments
7. ❌ Don't forget mobile responsive styles

## Advanced Patterns

### Static Blocks for Layout Control

```liquid
<!-- Static heading (always first) -->
{% content_for "block",
    type: "heading",
    id: "hero-heading",
    static: true
%}

<!-- Dynamic blocks (merchant can reorder) -->
{% content_for "blocks" %}

<!-- Static CTA (always last) -->
{% content_for "block",
    type: "button",
    id: "hero-cta",
    static: true
%}
```

### Nested Blocks (Up to 8 Levels)

```liquid
<!-- /blocks/group.liquid -->
<div {{ block.shopify_attributes }} class="group">
  {% content_for "blocks" %}  <!-- Children render here -->
</div>

{% schema %}
{
  "name": "Group",
  "blocks": [
    {"type": "@theme"}  /* Accept nested blocks */
  ]
}
{% endschema %}
```

### Block Targeting

```json
{
  "blocks": [
    {
      "type": "@theme",
      "targeting": {
        "supported_blocks": ["text", "image", "button"]
      }
    }
  ]
}
```

## Troubleshooting

**Error:** `Unknown tag 'endcomment'`
**Fix:** Remove decorative characters from comments

**Error:** `Expected close_square but found pipe`
**Fix:** Don't use filters inside `[]` - split into 2 lines

**Error:** `Invalid schema: 'default' is not a valid attribute`
**Fix:** Use `placeholder` for text inputs, not `default`

**Error:** Blocks not showing in theme editor
**Fix:** Check that block has `presets` in schema

**Error:** Dynamic sources not working
**Fix:** Ensure setting type is compatible (text, image_picker, url, richtext)

## Reference Links

**Official Shopify Docs:**
- Theme Blocks: https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks
- Section Schema: https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema
- Block Schema: https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/schema
- Dynamic Sources: https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/dynamic-sources
- Static Blocks: https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/static-blocks
- Liquid Reference: https://shopify.dev/docs/api/liquid

## Pre-Flight Checklist

Before creating any section or block:

- [ ] Understand block type (theme vs section vs app)
- [ ] Know if static or dynamic rendering needed
- [ ] Check if dynamic sources required
- [ ] Plan schema settings with correct types
- [ ] Use `placeholder` not `default` for text
- [ ] Include `{{ block.shopify_attributes }}`
- [ ] Add responsive breakpoints
- [ ] Optimize images with `widths` and `sizes`
- [ ] Test on mobile, tablet, desktop
- [ ] Verify metaobject access uses `.value`
