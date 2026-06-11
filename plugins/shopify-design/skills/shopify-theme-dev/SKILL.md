---
name: shopify-theme-dev
description: "Develop and customize Shopify themes — theme architecture, sections, blocks, Dawn/Horizon patterns, Online Store 2.0 features, theme settings, and local development workflow. Use when building custom themes, customizing existing themes, creating new sections, working with theme blocks, setting up local development, or managing theme files. Triggers: \"shopify theme\", \"theme development\", \"section\", \"theme block\", \"dawn theme\", \"horizon theme\", \"OS 2.0\", \"shopify CLI\"."
---

# Shopify Theme Development

Build production-quality Shopify themes using Online Store 2.0 architecture with sections, blocks, and the Shopify CLI.

## Theme File Structure

```
theme/
├── assets/            # CSS, JS, images, fonts
├── config/
│   ├── settings_schema.json   # Theme customizer settings
│   └── settings_data.json     # Saved settings values
├── layout/
│   └── theme.liquid   # Base layout (wraps all pages)
├── locales/           # Translation strings
├── sections/          # Reusable page sections
├── snippets/          # Small reusable components
└── templates/         # Page-specific templates
    ├── index.json      # Home page
    ├── product.json    # Product page
    ├── collection.json
    ├── cart.json
    ├── page.json
    └── customers/
```

## Local Development

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Connect to store
shopify theme dev --store your-store.myshopify.com

# Pull theme from store
shopify theme pull --store your-store.myshopify.com

# Push changes
shopify theme push

# Create new theme
shopify theme init my-theme
```

## Sections Architecture (OS 2.0)

### JSON Template
```json
{
  "sections": {
    "hero": {
      "type": "hero-banner",
      "settings": {
        "heading": "Transform Your Hair",
        "button_text": "Shop Now"
      }
    },
    "featured-collection": {
      "type": "featured-collection",
      "settings": {
        "collection": "best-sellers",
        "products_to_show": 4
      }
    }
  },
  "order": ["hero", "featured-collection"]
}
```

### Section with Blocks
```liquid
{# sections/testimonials.liquid #}

<section class="testimonials">
  <h2>{{ section.settings.heading }}</h2>
  <div class="testimonials__grid">
    {% for block in section.blocks %}
      {% case block.type %}
        {% when 'testimonial' %}
          <div class="testimonial" {{ block.shopify_attributes }}>
            <blockquote>{{ block.settings.quote }}</blockquote>
            <cite>— {{ block.settings.author }}, {{ block.settings.location }}</cite>
            {% render 'star-rating', rating: block.settings.rating %}
          </div>
      {% endcase %}
    {% endfor %}
  </div>
</section>

{% schema %}
{
  "name": "Testimonials",
  "settings": [
    {"type": "text", "id": "heading", "label": "Heading", "default": "What Our Clients Say"}
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "settings": [
        {"type": "textarea", "id": "quote", "label": "Quote"},
        {"type": "text", "id": "author", "label": "Customer Name"},
        {"type": "text", "id": "location", "label": "Location"},
        {"type": "range", "id": "rating", "label": "Rating", "min": 1, "max": 5, "default": 5}
      ]
    }
  ],
  "presets": [{"name": "Testimonials"}],
  "max_blocks": 12
}
{% endschema %}
```

## settings_schema.json Patterns

```json
[
  {
    "name": "Colors",
    "settings": [
      {"type": "color", "id": "color_primary", "label": "Primary Color", "default": "#1a1a1a"},
      {"type": "color", "id": "color_accent", "label": "Accent Color", "default": "#d4a853"},
      {"type": "color", "id": "color_background", "label": "Page Background", "default": "#ffffff"}
    ]
  },
  {
    "name": "Typography",
    "settings": [
      {"type": "font_picker", "id": "font_heading", "label": "Heading Font", "default": "playfair_display_n4"},
      {"type": "font_picker", "id": "font_body", "label": "Body Font", "default": "inter_n4"},
      {"type": "range", "id": "font_size_base", "label": "Base Font Size", "min": 14, "max": 20, "unit": "px", "default": 16}
    ]
  }
]
```

## Horizon Theme Patterns

Horizon is Shopify's flagship free theme (2024+). Key architectural patterns:

- **Color schemes**: Each section can select from predefined color palettes
- **Block-first design**: Nearly all content is configurable via blocks
- **CSS custom properties**: Colors and fonts via `--color-*` and `--font-*` variables
- **Alpine.js**: Used for interactive components (dropdowns, drawers)
- **Media objects**: Consistent aspect ratio handling via CSS

```liquid
{# Horizon color scheme pattern #}
{% assign color_scheme = section.settings.color_scheme %}
<div class="color-{{ color_scheme }}">
  {# Section content #}
</div>
```

## Performance Best Practices

- Lazy-load images below the fold (`loading="lazy"`)
- Preload LCP image (`<link rel="preload" as="image">`)
- Defer non-critical JS (`defer` attribute)
- Use `asset_url` filter for CDN delivery
- Minimize render-blocking CSS (critical CSS inline)
- Use Shopify's image CDN with `img_url` + proper `srcset`

## Common Section Templates

### Announcement Bar
### Hero Banner with Video
### Featured Collection Grid
### Before/After Slider (Hair transformations)
### Testimonials with Stars
### Product Tabs (Ingredients, How to Use, Results)
### FAQ Accordion
### Location + Hours (for salons)
### Team/Staff Section
### Instagram Feed Embed
