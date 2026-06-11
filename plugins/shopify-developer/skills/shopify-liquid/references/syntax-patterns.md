# Syntax Patterns — Shopify Liquid

## Whitespace Control (always use)

```liquid
{%- assign var = value -%}
{%- if condition -%}
  content
{%- endif -%}
```

## Filters — Never Inside Brackets

```liquid
❌ {%- assign blog = blogs[handle | default: 'news'] -%}
✅ {%- assign h = handle | default: 'news' -%}
   {%- assign blog = blogs[h] -%}
```

## Metaobject Access (always .value)

```liquid
{%- assign categories = shop.metaobjects.blog_category.values | sort: 'display_order' -%}
{%- for category in categories -%}
  {{ category.title.value }}        {{- field value -}}
  {{ category.icon_id.value }}
  {{ category.system.url }}         {{- system property, no .value -}}
  {{ category.system.id }}
{%- endfor -%}
```

## Block Rendering

```liquid
{{- Dynamic — merchant controls order -}}
{% content_for "blocks" %}

{{- Static — developer controls, not moveable -}}
{% content_for "block", type: "heading", id: "main-heading" %}

{{- Static with context -}}
{%- for product in collection.products -%}
  {% content_for "block", type: "product-card", id: "card-{{ product.id }}", product: product %}
{%- endfor -%}
```

## Section Blocks Loop

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

⚠️ `{{ block.shopify_attributes }}` is required on every block root element.

## Comments (plain text only)

```liquid
✅ {% comment %} Section name or description {% endcomment %}
❌ {% comment %} ====== BREAKS PARSER ====== {% endcomment %}
```

## Image Optimization

```liquid
{{
  section.settings.image
  | image_url: width: 1920
  | image_tag:
    loading: 'lazy',
    widths: '375, 550, 750, 1000, 1500, 1920',
    sizes: '(max-width: 768px) 100vw, 50vw',
    class: 'my-image',
    alt: section.settings.image_alt
}}
```

For above-the-fold / LCP images:
```liquid
| image_tag: loading: 'eager', fetchpriority: 'high', widths: '750, 1100, 1500, 1920'
```

## Nested Blocks (up to 8 levels)

```liquid
{{- In /blocks/group.liquid -}}
<div {{ block.shopify_attributes }} class="group">
  {% content_for "blocks" %}
</div>

{% schema %}
{ "name": "Group", "blocks": [{ "type": "@theme" }], "presets": [{ "name": "Group" }] }
{% endschema %}
```

## Static Blocks for Layout Control

```liquid
{{- Always first -}}
{% content_for "block", type: "heading", id: "hero-heading", static: true %}

{{- Merchant reorders these -}}
{% content_for "blocks" %}

{{- Always last -}}
{% content_for "block", type: "button", id: "hero-cta", static: true %}
```
