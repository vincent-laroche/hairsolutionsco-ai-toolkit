# Theme Settings and Customization

## Theme Settings Overview

Theme settings are global configurations accessible throughout your theme via `settings` object.

## settings_schema.json Location

```
config/settings_schema.json
```

## Basic Structure

```json
[
  {
    "name": "theme_info",
    "theme_name": "Your Theme Name",
    "theme_version": "1.0.0",
    "theme_author": "Your Company",
    "theme_documentation_url": "https://...",
    "theme_support_url": "https://..."
  },
  {
    "name": "Colors",
    "settings": [
      {
        "type": "header",
        "content": "Color Schemes"
      },
      {
        "type": "color_scheme_group",
        "id": "color_schemes"
      }
    ]
  }
]
```

## Accessing Theme Settings in Liquid

```liquid
{{ settings.setting_id }}
```

## Common Theme Setting Categories

### Typography Settings

```json
{
  "name": "Typography",
  "settings": [
    {
      "type": "header",
      "content": "Headings"
    },
    {
      "type": "font_picker",
      "id": "type_header_font",
      "default": "assistant_n4",
      "label": "Font"
    },
    {
      "type": "range",
      "id": "heading_scale",
      "min": 100,
      "max": 150,
      "step": 5,
      "unit": "%",
      "label": "Font size scale",
      "default": 100
    },
    {
      "type": "header",
      "content": "Body"
    },
    {
      "type": "font_picker",
      "id": "type_body_font",
      "default": "assistant_n4",
      "label": "Font"
    },
    {
      "type": "range",
      "id": "body_scale",
      "min": 90,
      "max": 120,
      "step": 5,
      "unit": "%",
      "label": "Font size scale",
      "default": 100
    }
  ]
}
```

**Usage in Liquid/CSS:**

```liquid
<style>
  body {
    font-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
    font-weight: {{ settings.type_body_font.weight }};
    font-size: calc(1rem * {{ settings.body_scale }} / 100);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: {{ settings.type_header_font.family }}, {{ settings.type_header_font.fallback_families }};
    font-weight: {{ settings.type_header_font.weight }};
  }
</style>
```

### Color Schemes

Horizon uses color schemes extensively. Define them globally:

```json
{
  "name": "Colors",
  "settings": [
    {
      "type": "color_scheme_group",
      "id": "color_schemes",
      "definition": [
        {
          "type": "color",
          "id": "background",
          "label": "Background",
          "default": "#FFFFFF"
        },
        {
          "type": "color",
          "id": "text",
          "label": "Text",
          "default": "#000000"
        },
        {
          "type": "color",
          "id": "button",
          "label": "Button",
          "default": "#000000"
        },
        {
          "type": "color",
          "id": "button_label",
          "label": "Button label",
          "default": "#FFFFFF"
        }
      ],
      "role": {
        "text": "text",
        "background": {
          "solid": "background"
        },
        "accent": {
          "accent_1": "button",
          "accent_2": "button_label"
        }
      }
    }
  ]
}
```

**Usage in Sections:**

```json
{
  "type": "color_scheme",
  "id": "color_scheme",
  "label": "Color scheme",
  "default": "scheme-1"
}
```

```liquid
<div class="section color-{{ section.settings.color_scheme }}">
  <!-- Content -->
</div>
```

### Layout Settings

```json
{
  "name": "Layout",
  "settings": [
    {
      "type": "header",
      "content": "Page width"
    },
    {
      "type": "range",
      "id": "page_width",
      "min": 1000,
      "max": 1600,
      "step": 100,
      "default": 1200,
      "unit": "px",
      "label": "Page width"
    },
    {
      "type": "range",
      "id": "spacing_sections",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 40,
      "unit": "px",
      "label": "Space between sections"
    },
    {
      "type": "header",
      "content": "Grid"
    },
    {
      "type": "range",
      "id": "grid_columns_mobile",
      "min": 1,
      "max": 2,
      "step": 1,
      "default": 2,
      "label": "Mobile columns"
    },
    {
      "type": "range",
      "id": "grid_columns_desktop",
      "min": 2,
      "max": 6,
      "step": 1,
      "default": 4,
      "label": "Desktop columns"
    }
  ]
}
```

**Usage:**

```liquid
<style>
  :root {
    --page-width: {{ settings.page_width }}px;
    --spacing-sections: {{ settings.spacing_sections }}px;
  }
  
  .page-width {
    max-width: var(--page-width);
    margin: 0 auto;
    padding: 0 20px;
  }
  
  section + section {
    margin-top: var(--spacing-sections);
  }
</style>
```

### Product Card Settings

```json
{
  "name": "Product Cards",
  "settings": [
    {
      "type": "select",
      "id": "card_style",
      "options": [
        {
          "value": "standard",
          "label": "Standard"
        },
        {
          "value": "card",
          "label": "Card"
        }
      ],
      "default": "standard",
      "label": "Style"
    },
    {
      "type": "checkbox",
      "id": "show_vendor",
      "default": false,
      "label": "Show vendor"
    },
    {
      "type": "checkbox",
      "id": "show_rating",
      "default": false,
      "label": "Show product rating"
    },
    {
      "type": "checkbox",
      "id": "enable_quick_add",
      "default": false,
      "label": "Enable quick add button"
    },
    {
      "type": "select",
      "id": "image_ratio",
      "options": [
        {
          "value": "adapt",
          "label": "Adapt to image"
        },
        {
          "value": "portrait",
          "label": "Portrait"
        },
        {
          "value": "square",
          "label": "Square"
        }
      ],
      "default": "adapt",
      "label": "Image ratio"
    }
  ]
}
```

### Cart Settings

```json
{
  "name": "Cart",
  "settings": [
    {
      "type": "select",
      "id": "cart_type",
      "options": [
        {
          "value": "drawer",
          "label": "Drawer"
        },
        {
          "value": "page",
          "label": "Page"
        },
        {
          "value": "notification",
          "label": "Notification"
        }
      ],
      "default": "drawer",
      "label": "Cart type"
    },
    {
      "type": "checkbox",
      "id": "show_cart_note",
      "default": false,
      "label": "Show cart note"
    },
    {
      "type": "text",
      "id": "cart_free_shipping_threshold",
      "label": "Free shipping threshold",
      "info": "Leave blank to disable. Amount in cents (e.g., 5000 for $50)"
    }
  ]
}
```

### Social Media Settings

```json
{
  "name": "Social media",
  "settings": [
    {
      "type": "header",
      "content": "Social accounts"
    },
    {
      "type": "text",
      "id": "social_twitter_link",
      "label": "Twitter",
      "info": "https://twitter.com/shopify"
    },
    {
      "type": "text",
      "id": "social_facebook_link",
      "label": "Facebook",
      "info": "https://facebook.com/shopify"
    },
    {
      "type": "text",
      "id": "social_instagram_link",
      "label": "Instagram",
      "info": "https://instagram.com/shopify"
    },
    {
      "type": "text",
      "id": "social_tiktok_link",
      "label": "TikTok",
      "info": "https://tiktok.com/@shopify"
    },
    {
      "type": "text",
      "id": "social_youtube_link",
      "label": "YouTube",
      "info": "https://youtube.com/shopify"
    },
    {
      "type": "header",
      "content": "Social sharing"
    },
    {
      "type": "checkbox",
      "id": "share_facebook",
      "default": true,
      "label": "Facebook"
    },
    {
      "type": "checkbox",
      "id": "share_twitter",
      "default": true,
      "label": "Twitter"
    },
    {
      "type": "checkbox",
      "id": "share_pinterest",
      "default": true,
      "label": "Pinterest"
    }
  ]
}
```

**Usage:**

```liquid
{% if settings.social_instagram_link != blank %}
  <a href="{{ settings.social_instagram_link }}" target="_blank">
    Instagram
  </a>
{% endif %}
```

### Currency Format

```json
{
  "name": "Currency format",
  "settings": [
    {
      "type": "header",
      "content": "Currency codes"
    },
    {
      "type": "paragraph",
      "content": "Cart and checkout prices always show currency codes."
    },
    {
      "type": "checkbox",
      "id": "currency_code_enabled",
      "label": "Show currency codes",
      "default": true
    }
  ]
}
```

### Search Settings

```json
{
  "name": "Search",
  "settings": [
    {
      "type": "checkbox",
      "id": "predictive_search_enabled",
      "default": true,
      "label": "Enable predictive search"
    },
    {
      "type": "checkbox",
      "id": "predictive_search_show_vendor",
      "default": false,
      "label": "Show vendor"
    },
    {
      "type": "checkbox",
      "id": "predictive_search_show_price",
      "default": true,
      "label": "Show price"
    }
  ]
}
```

## Using Settings in Liquid

### Access Global Setting

```liquid
{{ settings.page_width }}
{{ settings.type_header_font.family }}
{{ settings.show_vendor }}
```

### Conditional Based on Setting

```liquid
{% if settings.enable_quick_add %}
  <button>Quick add</button>
{% endif %}
```

### Using Setting in CSS

```liquid
<style>
  .container {
    max-width: {{ settings.page_width }}px;
  }
  
  body {
    font-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
    color: {{ settings.colors_text }};
    background-color: {{ settings.colors_background }};
  }
</style>
```

## CSS Variables Pattern (Recommended)

Define CSS variables in your layout file based on settings:

```liquid
<style>
  :root {
    --font-heading-family: {{ settings.type_header_font.family }}, {{ settings.type_header_font.fallback_families }};
    --font-body-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
    --color-base-text: {{ settings.colors_text }};
    --color-base-background: {{ settings.colors_background }};
    --page-width: {{ settings.page_width }}px;
    --spacing-sections: {{ settings.spacing_sections }}px;
  }
</style>
```

Then use them in your CSS:

```css
body {
  font-family: var(--font-body-family);
  color: var(--color-base-text);
  background-color: var(--color-base-background);
}

.page-width {
  max-width: var(--page-width);
}
```

## Common Patterns

### Button Styles

```liquid
<style>
  .button {
    background-color: {{ settings.colors_button_background }};
    color: {{ settings.colors_button_text }};
    border-radius: {{ settings.buttons_border_thickness }}px;
    {% if settings.buttons_border_opacity > 0 %}
      border: {{ settings.buttons_border_thickness }}px solid {{ settings.colors_button_background | color_modify: 'alpha', settings.buttons_border_opacity }};
    {% endif %}
  }
</style>
```

### Predictive Search

```liquid
{% if settings.predictive_search_enabled %}
  <div class="search-results" data-predictive-search>
    <!-- Search results -->
  </div>
{% endif %}
```

### Currency Display

```liquid
{% if settings.currency_code_enabled %}
  {{ product.price | money_with_currency }}
{% else %}
  {{ product.price | money }}
{% endif %}
```

## Best Practices

1. **Provide sensible defaults**: Settings should work out of the box
2. **Group related settings**: Use headers to organize
3. **Add helpful info**: Use `"info"` to guide merchants
4. **Limit choices**: Too many options can overwhelm
5. **Use CSS variables**: Makes theming more maintainable
6. **Test all combinations**: Ensure settings work together
7. **Document dependencies**: Note when settings affect each other

## Accessing Settings in JavaScript

```javascript
// Access via data attributes
const pageWidth = document.documentElement.style.getPropertyValue('--page-width');

// Or pass as data attribute
<div data-enable-cart-drawer="{{ settings.cart_type }}">
```

## Settings vs Section Settings

| Global Settings | Section Settings |
|-----------------|------------------|
| Apply theme-wide | Apply to specific section instances |
| config/settings_schema.json | In section {% schema %} |
| Accessed via `settings` | Accessed via `section.settings` |
| Changed in Theme settings | Changed in Theme editor |
| Examples: fonts, colors | Examples: heading text, image |
