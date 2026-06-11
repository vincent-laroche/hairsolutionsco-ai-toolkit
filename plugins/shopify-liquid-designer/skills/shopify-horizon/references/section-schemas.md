# Section and Block Schemas

## Section Schema Structure

Every section needs a `{% schema %}` tag containing valid JSON that defines settings and behavior.

### Basic Section Schema

```json
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "my-section-class",
  "limit": 1,
  "enabled_on": {
    "templates": ["*"]
  },
  "disabled_on": {
    "templates": ["cart"]
  },
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Welcome"
    }
  ],
  "blocks": [
    {
      "type": "@theme"
    }
  ],
  "presets": [
    {
      "name": "Section Name",
      "category": "Custom"
    }
  ]
}
{% endschema %}
```

### Schema Attributes

| Attribute | Description | Required |
|-----------|-------------|----------|
| `name` | Display name in theme editor | Yes |
| `tag` | HTML wrapper tag (default: `div`) | No |
| `class` | CSS class for wrapper | No |
| `limit` | Max instances allowed (default: unlimited) | No |
| `enabled_on` | Where section can be used | No |
| `disabled_on` | Where section cannot be used | No |
| `settings` | Array of setting inputs | No |
| `blocks` | Block types this section accepts | No |
| `presets` | Default configurations | No |

## Block Schema Structure

Theme blocks also use `{% schema %}` with similar structure:

```json
{% schema %}
{
  "name": "Block Name",
  "tag": "div",
  "class": "block-class",
  "settings": [
    {
      "type": "richtext",
      "id": "text",
      "label": "Text",
      "default": "<p>Default text</p>"
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
        "text": "<p>Preset content</p>"
      },
      "blocks": [
        {
          "type": "text"
        }
      ]
    }
  ]
}
{% endschema %}
```

### Block-Specific Attributes

| Attribute | Description |
|-----------|-------------|
| `"tag": null` | No wrapper (you control the HTML) |
| `"tag": "section"` | Wrap in `<section>` tag |
| `blocks` | Child blocks this block accepts (for nesting) |
| `presets` | Predefined configurations merchants can select |

## Setting Types

### Text Inputs

#### text

```json
{
  "type": "text",
  "id": "heading",
  "label": "Heading",
  "default": "Default heading",
  "info": "Additional info shown to merchant"
}
```

#### textarea

```json
{
  "type": "textarea",
  "id": "description",
  "label": "Description",
  "default": "Enter long text here",
  "placeholder": "Type here..."
}
```

#### richtext

```json
{
  "type": "richtext",
  "id": "content",
  "label": "Content",
  "default": "<p>Rich text with <strong>formatting</strong></p>"
}
```

#### html

```json
{
  "type": "html",
  "id": "custom_html",
  "label": "Custom HTML",
  "default": "<div class='custom'>HTML content</div>"
}
```

#### liquid

```json
{
  "type": "liquid",
  "id": "custom_liquid",
  "label": "Custom Liquid",
  "default": "{{ product.title }}",
  "info": "Accepts Liquid code"
}
```

### Media Inputs

#### image_picker

```json
{
  "type": "image_picker",
  "id": "image",
  "label": "Image"
}
```

Liquid usage:
```liquid
{% if section.settings.image %}
  {{ section.settings.image | image_url: width: 1000 | image_tag }}
{% endif %}
```

#### video

```json
{
  "type": "video",
  "id": "video",
  "label": "Video"
}
```

#### video_url

```json
{
  "type": "video_url",
  "id": "video_url",
  "label": "Video URL",
  "accept": ["youtube", "vimeo"],
  "default": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
  "info": "YouTube or Vimeo URL"
}
```

### Selection Inputs

#### select

```json
{
  "type": "select",
  "id": "alignment",
  "label": "Text Alignment",
  "options": [
    {
      "value": "left",
      "label": "Left"
    },
    {
      "value": "center",
      "label": "Center"
    },
    {
      "value": "right",
      "label": "Right"
    }
  ],
  "default": "center"
}
```

#### radio

```json
{
  "type": "radio",
  "id": "layout",
  "label": "Layout",
  "options": [
    {
      "value": "grid",
      "label": "Grid"
    },
    {
      "value": "list",
      "label": "List"
    }
  ],
  "default": "grid"
}
```

### Boolean Inputs

#### checkbox

```json
{
  "type": "checkbox",
  "id": "show_vendor",
  "label": "Show vendor",
  "default": true
}
```

Liquid usage:
```liquid
{% if section.settings.show_vendor %}
  <p>{{ product.vendor }}</p>
{% endif %}
```

### Number Inputs

#### number

```json
{
  "type": "number",
  "id": "products_per_row",
  "label": "Products per row",
  "default": 4,
  "min": 2,
  "max": 6,
  "step": 1
}
```

#### range

```json
{
  "type": "range",
  "id": "padding",
  "label": "Section padding",
  "min": 0,
  "max": 100,
  "step": 5,
  "unit": "px",
  "default": 50
}
```

### Link/URL Inputs

#### url

```json
{
  "type": "url",
  "id": "button_link",
  "label": "Button link"
}
```

#### page

```json
{
  "type": "page",
  "id": "page",
  "label": "Select page"
}
```

#### product

```json
{
  "type": "product",
  "id": "featured_product",
  "label": "Featured product"
}
```

#### collection

```json
{
  "type": "collection",
  "id": "featured_collection",
  "label": "Featured collection"
}
```

### Style Inputs

#### color

```json
{
  "type": "color",
  "id": "background_color",
  "label": "Background color",
  "default": "#ffffff"
}
```

#### color_background

```json
{
  "type": "color_background",
  "id": "gradient_background",
  "label": "Background",
  "info": "Supports solid colors and gradients"
}
```

#### color_scheme

```json
{
  "type": "color_scheme",
  "id": "color_scheme",
  "label": "Color scheme",
  "default": "scheme-1"
}
```

#### font_picker

```json
{
  "type": "font_picker",
  "id": "heading_font",
  "label": "Heading font",
  "default": "assistant_n4"
}
```

### Special Inputs

#### article

```json
{
  "type": "article",
  "id": "featured_article",
  "label": "Featured article"
}
```

#### blog

```json
{
  "type": "blog",
  "id": "blog",
  "label": "Blog"
}
```

#### collection_list

```json
{
  "type": "collection_list",
  "id": "collections",
  "label": "Collections",
  "limit": 5
}
```

#### link_list (menu)

```json
{
  "type": "link_list",
  "id": "menu",
  "label": "Menu",
  "default": "main-menu"
}
```

## Accepting Theme Blocks

### Accept All Theme Blocks

```json
{
  "blocks": [
    {
      "type": "@theme"
    }
  ]
}
```

### Accept Specific Theme Blocks + Show Recommended

```json
{
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

This shows `text`, `button`, and `image` blocks prominently in the picker, with other theme blocks accessible via "Show all".

### Accept Only Specific Blocks

```json
{
  "blocks": [
    {
      "type": "slide",
      "name": "Slide"
    }
  ]
}
```

## Block Presets

Presets allow merchants to quickly add pre-configured blocks:

```json
{
  "presets": [
    {
      "name": "Two Columns",
      "settings": {
        "columns": 2
      },
      "blocks": [
        {
          "type": "text",
          "settings": {
            "text": "<h3>Column 1</h3><p>Content here</p>"
          }
        },
        {
          "type": "text",
          "settings": {
            "text": "<h3>Column 2</h3><p>Content here</p>"
          }
        }
      ]
    },
    {
      "name": "Three Columns",
      "settings": {
        "columns": 3
      },
      "blocks": [
        {
          "type": "text",
          "settings": {
            "text": "<h3>Column 1</h3>"
          }
        },
        {
          "type": "text",
          "settings": {
            "text": "<h3>Column 2</h3>"
          }
        },
        {
          "type": "text",
          "settings": {
            "text": "<h3>Column 3</h3>"
          }
        }
      ]
    }
  ]
}
```

## Complete Section Example

Here's a full example of a custom section with theme blocks support:

```liquid
<div class="custom-section color-{{ section.settings.color_scheme }}">
  {% if section.settings.heading != blank %}
    <h2>{{ section.settings.heading }}</h2>
  {% endif %}
  
  <div class="blocks-container">
    {% content_for 'blocks' %}
  </div>
  
  {% if section.settings.button_link != blank %}
    <a href="{{ section.settings.button_link }}" class="button">
      {{ section.settings.button_label }}
    </a>
  {% endif %}
</div>

{% schema %}
{
  "name": "Custom Section",
  "tag": "section",
  "class": "custom-section-class",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Section Heading"
    },
    {
      "type": "color_scheme",
      "id": "color_scheme",
      "label": "Color scheme",
      "default": "scheme-1"
    },
    {
      "type": "header",
      "content": "Button Settings"
    },
    {
      "type": "text",
      "id": "button_label",
      "label": "Button label",
      "default": "Learn More"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    }
  ],
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
  ],
  "presets": [
    {
      "name": "Custom Section",
      "category": "Custom",
      "blocks": [
        {
          "type": "text"
        }
      ]
    }
  ]
}
{% endschema %}
```

## Complete Block Example

```liquid
<div class="custom-block {{ block.settings.alignment }}" {{ block.shopify_attributes }}>
  {% if block.settings.image %}
    {{ block.settings.image | image_url: width: 800 | image_tag }}
  {% endif %}
  
  {% if block.settings.text != blank %}
    <div class="block-text">
      {{ block.settings.text }}
    </div>
  {% endif %}
  
  {%- # Render nested child blocks -%}
  {% content_for 'blocks' %}
</div>

{% schema %}
{
  "name": "Custom Block",
  "tag": "div",
  "class": "custom-block",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "richtext",
      "id": "text",
      "label": "Text",
      "default": "<p>Block text</p>"
    },
    {
      "type": "select",
      "id": "alignment",
      "label": "Alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ],
      "default": "center"
    }
  ],
  "blocks": [
    {
      "type": "@theme"
    }
  ],
  "presets": [
    {
      "name": "Image + Text",
      "settings": {
        "text": "<h3>Title</h3><p>Description</p>",
        "alignment": "center"
      }
    }
  ]
}
{% endschema %}
```

## Schema Best Practices

1. **Use descriptive labels**: Make settings clear for merchants
2. **Provide defaults**: Always set sensible default values
3. **Add info text**: Use `"info"` to explain complex settings
4. **Group related settings**: Use `"type": "header"` to organize
5. **Limit options**: Don't overwhelm with too many settings
6. **Use appropriate types**: `richtext` for formatted text, `html` for custom code
7. **Test thoroughly**: Ensure all settings work as expected

## Common Setting Groups

### Typography Settings

```json
[
  {
    "type": "header",
    "content": "Typography"
  },
  {
    "type": "font_picker",
    "id": "font",
    "label": "Font"
  },
  {
    "type": "range",
    "id": "font_size",
    "label": "Font size",
    "min": 12,
    "max": 48,
    "step": 2,
    "unit": "px",
    "default": 16
  },
  {
    "type": "select",
    "id": "text_alignment",
    "label": "Text alignment",
    "options": [
      { "value": "left", "label": "Left" },
      { "value": "center", "label": "Center" },
      { "value": "right", "label": "Right" }
    ],
    "default": "left"
  }
]
```

### Spacing Settings

```json
[
  {
    "type": "header",
    "content": "Spacing"
  },
  {
    "type": "range",
    "id": "padding_top",
    "label": "Top padding",
    "min": 0,
    "max": 100,
    "step": 5,
    "unit": "px",
    "default": 50
  },
  {
    "type": "range",
    "id": "padding_bottom",
    "label": "Bottom padding",
    "min": 0,
    "max": 100,
    "step": 5,
    "unit": "px",
    "default": 50
  }
]
```
