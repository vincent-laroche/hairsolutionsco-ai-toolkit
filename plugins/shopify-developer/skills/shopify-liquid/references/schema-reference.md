# Schema Reference — Shopify Liquid

## Section Schema Template

```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "custom-class",
  "limit": 2,
  "enabled_on": { "templates": ["product", "collection"] },
  "settings": [],
  "blocks": [{ "type": "@theme" }, { "type": "@app" }],
  "max_blocks": 16,
  "presets": [{ "name": "Section Name" }]
}
{% endschema %}
```

## Block Schema Template

```liquid
{% schema %}
{
  "name": "Block Name",
  "settings": [],
  "blocks": [{ "type": "@theme" }],
  "max_children": 8,
  "presets": [{ "name": "Default" }]
}
{% endschema %}
```

## Settings Type Reference

```json
// Text
{ "type": "text", "id": "heading", "label": "Heading", "placeholder": "Enter text" }
{ "type": "textarea", "id": "body", "label": "Body", "placeholder": "Multi-line" }
{ "type": "richtext", "id": "content", "label": "Content" }

// Media
{ "type": "image_picker", "id": "image", "label": "Image" }
{ "type": "video", "id": "video_file", "label": "Video" }

// Choice — these support default
{ "type": "checkbox", "id": "enable", "label": "Enable", "default": true }
{ "type": "select", "id": "layout", "label": "Layout", "options": [{"value":"left","label":"Left"},{"value":"center","label":"Center"}], "default": "center" }
{ "type": "radio", "id": "style", "label": "Style", "options": [{"value":"boxed","label":"Boxed"}], "default": "boxed" }

// Numbers — these support default
{ "type": "range", "id": "padding", "label": "Padding", "min": 0, "max": 200, "step": 10, "unit": "px", "default": 60 }
{ "type": "number", "id": "max_items", "label": "Max Items", "default": 4 }

// Link — NO default, use Liquid fallback
{ "type": "url", "id": "link", "label": "Link" }
```

## Defaults Compatibility Chart

| Type | `default` works? | Use instead |
|------|-----------------|-------------|
| text | ❌ NO | `placeholder` |
| textarea | ❌ NO | `placeholder` |
| richtext | ❌ NO | Set in preset |
| url | ⚠️ INCONSISTENT | Liquid `\| default:` |
| image_picker | ❌ NO | Set in preset |
| checkbox | ✅ YES | — |
| select | ✅ YES | — |
| radio | ✅ YES | — |
| range | ✅ YES | — |
| number | ✅ YES | — |
| color | ✅ YES | — |

## Dynamic Sources Compatibility

| Setting type | Dynamic source? |
|---|---|
| text | ✅ YES |
| image_picker | ✅ YES |
| url | ✅ YES |
| richtext | ✅ YES |
| color | ❌ NO |
| checkbox | ❌ NO |

⚠️ No Liquid filters in dynamic source defaults: `{{ product.title | upcase }}` = ERROR

## Block Targeting (restrict accepted blocks)

```json
{ "blocks": [{ "type": "@theme", "targeting": { "supported_blocks": ["text", "image", "button"] } }] }
```

## Conditional Settings (show/hide)

```json
{ "type": "text", "id": "feature_title", "label": "Feature Title", "visible_if": "enable_feature == true" }
```
