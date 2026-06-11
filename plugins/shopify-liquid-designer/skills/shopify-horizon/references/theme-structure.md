# Shopify Horizon Theme Structure

## Core Architecture

Horizon uses a modern, modular block-based architecture that differs significantly from Dawn and earlier themes.

### Directory Structure

```
your-theme/
├── assets/              # CSS, JS, images, fonts
├── blocks/              # Theme blocks (reusable across sections) 
├── config/              # Theme settings
├── layout/              # Theme layouts
├── locales/             # Translation files
├── sections/            # Section files  
├── snippets/            # Reusable Liquid snippets
└── templates/           # JSON templates
    └── customers/       # Customer account templates
```

### Key Differences from Dawn

| Feature | Dawn | Horizon |
|---------|------|---------|
| Block Architecture | Section-level blocks only | Theme blocks (8 levels deep nesting) |
| Reusability | Blocks tied to specific sections | Blocks reusable across all sections |
| Nesting | 1-2 levels | Up to 8 levels |
| AI Integration | Basic | Purpose-built for AI block generation |
| Performance | Good | Optimized with smart asset loading |

## /blocks/ Directory

**Purpose**: Contains globally reusable theme blocks that can be nested and used across multiple sections.

**Critical**: Theme blocks are the defining feature of Horizon. They live in `/blocks/` folder and can be added to any section that opts-in to supporting theme blocks.

### Common Block Files

- `text.liquid` - Text content block
- `button.liquid` - Call-to-action buttons
- `image.liquid` - Image display with settings
- `video.liquid` - Video embeds
- `spacer.liquid` - Spacing/padding control
- `group.liquid` - Container for nesting other blocks
- `heading.liquid` - Heading text
- `icon.liquid` - Icon display
- `richtext.liquid` - Rich text editor content

### Block File Anatomy

```liquid
{%- # Block content here -%}
<div class="block-container">
  {{ block.settings.content }}
  {%- # Render child blocks if this block supports nesting -%}
  {% content_for 'blocks' %}
</div>

{% schema %}
{
  "name": "Block Name",
  "tag": "div",
  "class": "block-class",
  "settings": [
    {
      "type": "text",
      "id": "content",
      "label": "Content",
      "default": "Default text"
    }
  ],
  "blocks": [
    {
      "type": "@theme"
    }
  ],
  "presets": [
    {
      "name": "Preset Name",
      "settings": {
        "content": "Preset content"
      },
      "blocks": [
        {
          "type": "text",
          "settings": {}
        }
      ]
    }
  ]
}
{% endschema %}
```

## /sections/ Directory

**Purpose**: Contains section files that define customizable areas of your store.

### Section Types

1. **Static Sections**: Rendered on every page (header, footer, announcement bar)
2. **Dynamic Sections**: Can be added/removed/reordered in theme editor
3. **Theme Block-Compatible Sections**: Accept theme blocks from `/blocks/`

### Section Schema for Theme Blocks

To accept ALL theme blocks:

```json
{
  "name": "Section Name",
  "class": "section-class",
  "blocks": [
    {
      "type": "@theme"
    }
  ]
}
```

To accept SPECIFIC theme blocks:

```json
{
  "name": "Section Name",
  "blocks": [
    {
      "type": "@theme"
    },
    {
      "type": "text"
    },
    {
      "type": "button"
    },
    {
      "type": "image"
    }
  ]
}
```

**Important**: Sections can either define blocks locally OR opt-in to theme blocks, but NOT both simultaneously.

## /snippets/ Directory

**Purpose**: Reusable Liquid code fragments that can be rendered using `{% render 'snippet-name' %}` or `{% include 'snippet-name' %}`.

### When to Use Snippets vs Blocks

- **Use Snippets**: For repeated markup/logic used across many files (e.g., product cards, icon SVGs, utility functions)
- **Use Blocks**: For merchant-customizable content that appears in the theme editor

## /templates/ Directory

**Purpose**: JSON templates that define page structures and which sections appear on each page type.

### Template Structure

```json
{
  "sections": {
    "header": {
      "type": "header"
    },
    "main": {
      "type": "main-product",
      "blocks": {
        "title": {
          "type": "title"
        },
        "price": {
          "type": "price"
        },
        "custom_block_abc123": {
          "type": "text",
          "settings": {
            "text": "Custom content"
          }
        }
      },
      "block_order": [
        "title",
        "price",
        "custom_block_abc123"
      ]
    },
    "footer": {
      "type": "footer"
    }
  },
  "order": [
    "header",
    "main",
    "footer"
  ]
}
```

## /assets/ Directory

**Purpose**: Static assets (CSS, JavaScript, images, fonts)

### Key Asset Files

- `theme.css` / `base.css` - Main stylesheets
- `theme.js` - Core JavaScript
- `section-*.js` - Section-specific JavaScript (only loads when section is present)
- `component-*.js` - Component-specific JavaScript

### Performance Pattern

Horizon uses **smart asset loading**: Scripts only load when needed, and unused code is eliminated automatically.

Example: `section-product.js` only loads on product pages where the product section is present.

## /config/ Directory

Contains `settings_schema.json` and `settings_data.json` for theme-wide settings.

## Nested Block Hierarchy

Horizon supports up to **8 levels of nesting** (excluding the section level).

```
Section
└─ Block Level 1 (e.g., group)
   └─ Block Level 2 (e.g., column)
      └─ Block Level 3 (e.g., text)
         └─ Block Level 4 (e.g., icon)
            └─ ... up to Level 8
```

## File Naming Conventions

- Blocks: `block-name.liquid` (e.g., `text.liquid`, `button.liquid`)
- Sections: `section-name.liquid` (e.g., `main-product.liquid`, `featured-collection.liquid`)
- Snippets: `snippet-name.liquid` (e.g., `product-card.liquid`, `icon-chevron.liquid`)
- Assets: `component-name.js` or `section-name.js`

## Key Liquid Tags for Horizon

### Render Theme Blocks

```liquid
{% content_for 'blocks' %}
```

### Block Attributes (Required for theme editor compatibility)

```liquid
{{ block.shopify_attributes }}
```

When using `"tag": null` in block schema, you MUST add this attribute to your top-level HTML element:

```liquid
<div {{ block.shopify_attributes }}>
  <!-- Block content -->
</div>
```
