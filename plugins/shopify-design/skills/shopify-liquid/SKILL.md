---
name: shopify-liquid
description: Write and debug Shopify Liquid templates — syntax, objects, filters, tags, loops, conditionals, and theme architecture. Use when writing Liquid code, building sections, creating snippets, debugging templates, accessing Shopify objects (product, collection, cart, customer), or applying Liquid filters. Triggers: "liquid", "shopify liquid", "liquid template", "{{ }}", "{% %}", "section schema", "liquid filter".
---

# Shopify Liquid Templating

Liquid is Shopify's templating language. It uses `{{ }}` for output and `{% %}` for logic.

## Syntax Overview

```liquid
{{ variable }}              {# Output #}
{% if condition %}          {# Logic tag #}
{{ variable | filter }}     {# Filter #}
{% comment %}...{% endcomment %}
```

## Core Objects

### Product
```liquid
{{ product.title }}
{{ product.description }}
{{ product.price | money }}
{{ product.compare_at_price | money }}
{{ product.featured_image | img_url: '800x' }}
{{ product.url }}
{{ product.available }}
{{ product.variants.first.sku }}
{{ product.type }}
{{ product.vendor }}
{{ product.tags | join: ', ' }}
{{ product.metafields.custom.ingredient_list.value }}
```

### Collection
```liquid
{{ collection.title }}
{{ collection.description }}
{% for product in collection.products %}
  {{ product.title }} — {{ product.price | money }}
{% endfor %}
```

### Cart
```liquid
{{ cart.item_count }}
{{ cart.total_price | money }}
{% for item in cart.items %}
  {{ item.product.title }}
  {{ item.variant.title }}
  {{ item.quantity }}
  {{ item.line_price | money }}
{% endfor %}
```

### Customer
```liquid
{% if customer %}
  Hello, {{ customer.first_name }}
  {{ customer.email }}
  {% for order in customer.orders %}
    Order #{{ order.order_number }} — {{ order.total_price | money }}
  {% endfor %}
{% else %}
  <a href="/account/login">Sign in</a>
{% endif %}
```

### Settings (Theme Customizer)
```liquid
{{ settings.color_primary }}
{{ settings.font_body | font_face }}
{{ section.settings.heading }}
{{ block.settings.image | img_url: 'master' }}
```

## Essential Filters

```liquid
{{ product.price | money }}                    {# $14.99 #}
{{ product.price | money_without_currency }}   {# 14.99 #}
{{ 'image.jpg' | asset_url }}                  {# CDN URL #}
{{ image | img_url: '600x400', crop: 'center' }}
{{ product.description | strip_html | truncate: 150 }}
{{ 'now' | date: '%B %d, %Y' }}
{{ string | upcase }}
{{ string | downcase }}
{{ string | replace: 'old', 'new' }}
{{ array | join: ', ' }}
{{ array | first }}
{{ array | last }}
{{ array | size }}
{{ number | plus: 10 }}
{{ number | divided_by: 100.0 | round: 2 }}
{{ string | split: ',' | first }}
{{ url | url_escape }}
{{ content | newline_to_br }}
```

## Control Flow

```liquid
{% if product.available %}
  <button>Add to Cart</button>
{% elsif product.compare_at_price > product.price %}
  <span>Sale</span>
{% else %}
  <button disabled>Sold Out</button>
{% endif %}

{% unless customer %}
  <a href="/account/login">Login for exclusive pricing</a>
{% endunless %}

{% case product.type %}
  {% when 'Hair Treatment' %}
    <span class="badge badge--treatment">Treatment</span>
  {% when 'Shampoo' %}
    <span class="badge badge--shampoo">Shampoo</span>
  {% else %}
    <span class="badge">Product</span>
{% endcase %}
```

## Loops

```liquid
{% for product in collection.products limit: 4 %}
  {% unless product == collection.products.first %}
    <hr>
  {% endunless %}
  <div>
    {{ product.title }}
    {% if forloop.first %}⭐ New Arrival{% endif %}
    {% if forloop.last %}(end){% endif %}
    {# forloop.index, forloop.rindex, forloop.length available #}
  </div>
{% else %}
  <p>No products found.</p>
{% endfor %}

{% for i in (1..5) %}{{ i }}{% endfor %}
```

## Include & Render

```liquid
{# Snippets (no variable isolation) #}
{% include 'product-card' %}

{# Sections render (preferred) — variable isolated #}
{% render 'product-card', product: product, show_vendor: true %}
```

## Section Schema

```liquid
{% schema %}
{
  "name": "Featured Products",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Our Best Sellers"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Collection to feature"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "label": "Products to show",
      "min": 2,
      "max": 12,
      "step": 2,
      "default": 4
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#ffffff"
    }
  ],
  "blocks": [
    {
      "type": "promo_banner",
      "name": "Promo Banner",
      "settings": [
        {"type": "text", "id": "text", "label": "Banner text"}
      ]
    }
  ],
  "presets": [
    {"name": "Featured Products"}
  ]
}
{% endschema %}
```

## Metafields

```liquid
{# Access custom metafields #}
{{ product.metafields.custom.ingredients.value }}
{{ product.metafields.reviews.rating.value }}

{# Metafield list #}
{% for ingredient in product.metafields.custom.ingredients.value %}
  <li>{{ ingredient }}</li>
{% endfor %}
```

## Common Patterns

### Conditional Badge
```liquid
{% if product.compare_at_price > product.price %}
  {% assign discount = product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price | round %}
  <span class="badge">Save {{ discount }}%</span>
{% endif %}
```

### Responsive Images
```liquid
<img
  src="{{ product.featured_image | img_url: '600x' }}"
  srcset="{{ product.featured_image | img_url: '400x' }} 400w,
          {{ product.featured_image | img_url: '800x' }} 800w,
          {{ product.featured_image | img_url: '1200x' }} 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="{{ product.featured_image.alt | escape }}"
  loading="lazy"
  width="{{ product.featured_image.width }}"
  height="{{ product.featured_image.height }}"
>
```
