# Liquid Code Patterns for Horizon

## Essential Liquid Syntax

### Variables

```liquid
{% assign variable_name = value %}
{% capture variable_name %}content{% endcapture %}
```

### Conditionals

```liquid
{% if condition %}
  <!-- content -->
{% elsif another_condition %}
  <!-- content -->
{% else %}
  <!-- content -->
{% endif %}

{%- unless condition -%}
  <!-- content if condition is false -->
{%- endunless -%}
```

### Loops

```liquid
{% for item in collection %}
  {{ item.title }}
{% endfor %}

{% for i in (1..5) %}
  Number {{ i }}
{% endfor %}

{%- # Loop with limit and offset -%}
{% for product in collection.products limit:4 offset:2 %}
  {{ product.title }}
{% endfor %}
```

### Comments

```liquid
{% comment %}This won't be rendered{% endcomment %}
{%- # Single line comment -%}
```

## Product Patterns

### Basic Product Info

```liquid
{{ product.title }}
{{ product.description }}
{{ product.price | money }}
{{ product.compare_at_price | money }}
{{ product.vendor }}
{{ product.type }}
{{ product.featured_image | image_url: width: 800 | image_tag }}
```

### Product Variants

```liquid
{% for variant in product.variants %}
  <option value="{{ variant.id }}">
    {{ variant.title }} - {{ variant.price | money }}
  </option>
{% endfor %}

{%- # Check if variant is available -%}
{% if variant.available %}
  <button>Add to cart</button>
{% else %}
  <button disabled>Sold out</button>
{% endif %}

{%- # Current/selected variant -%}
{{ product.selected_or_first_available_variant.price | money }}
```

### Product Images

```liquid
{%- # All product images -%}
{% for image in product.images %}
  {{ image | image_url: width: 600 | image_tag }}
{% endfor %}

{%- # Variant-specific image -%}
{% if variant.featured_image %}
  {{ variant.featured_image | image_url: width: 800 | image_tag }}
{% endif %}

{%- # Responsive images -%}
{{ product.featured_image | image_url: width: 1200 | image_tag: 
  widths: '300, 600, 900, 1200',
  sizes: '(min-width: 750px) 50vw, 100vw'
}}
```

### Product Options (Color, Size, etc.)

```liquid
{% for option in product.options_with_values %}
  <div class="product-option">
    <label>{{ option.name }}</label>
    {% for value in option.values %}
      <input type="radio" 
        name="{{ option.name }}" 
        value="{{ value }}"
        {% if option.selected_value == value %}checked{% endif %}>
      <label>{{ value }}</label>
    {% endfor %}
  </div>
{% endfor %}
```

## Collection Patterns

### Loop Through Products

```liquid
{% for product in collection.products %}
  <div class="product-card">
    <a href="{{ product.url }}">
      {{ product.featured_image | image_url: width: 400 | image_tag }}
      <h3>{{ product.title }}</h3>
      <p>{{ product.price | money }}</p>
    </a>
  </div>
{% endfor %}
```

### Pagination

```liquid
{% if collection.products.size > 0 %}
  {% paginate collection.products by 12 %}
    {% for product in paginate.collection.products %}
      <!-- product card -->
    {% endfor %}
    
    {% if paginate.pages > 1 %}
      {{ paginate | default_pagination }}
    {% endif %}
  {% endpaginate %}
{% endif %}
```

### Collection Filtering (by tag, vendor, type)

```liquid
{%- # Filter by product type -%}
{% for product in collection.products %}
  {% if product.type == 'Apparel' %}
    <!-- show product -->
  {% endif %}
{% endfor %}

{%- # Filter by vendor -%}
{% assign filtered_products = collection.products | where: 'vendor', 'Hair Solutions Co.' %}
{% for product in filtered_products %}
  <!-- show product -->
{% endfor %}
```

## Responsive Design Patterns

### Desktop vs Mobile Content

```liquid
{%- # Different content for mobile/desktop -%}
<div class="hide-mobile">
  {{ section.settings.desktop_image | image_url: width: 1400 | image_tag }}
</div>

<div class="hide-desktop">
  {{ section.settings.mobile_image | image_url: width: 600 | image_tag }}
</div>
```

### CSS approach (add to your stylesheet)

```css
@media (max-width: 749px) {
  .hide-mobile { display: none; }
}

@media (min-width: 750px) {
  .hide-desktop { display: none; }
}
```

### Responsive Images Pattern

```liquid
{%- # Horizon's built-in responsive images -%}
{{ image | image_url: width: 1400 | image_tag:
  loading: 'lazy',
  widths: '300, 500, 700, 900, 1100, 1400',
  sizes: '(min-width: 1200px) 50vw, (min-width: 750px) 60vw, 100vw'
}}
```

## Dynamic Content (Section Settings)

### Text Settings

```liquid
{% if section.settings.heading != blank %}
  <h2>{{ section.settings.heading }}</h2>
{% endif %}

{{ section.settings.description | default: 'Default text if empty' }}
```

### Image Settings

```liquid
{% if section.settings.image %}
  {{ section.settings.image | image_url: width: 1000 | image_tag }}
{% else %}
  {{ 'image-placeholder.svg' | asset_url | image_tag }}
{% endif %}
```

### URL/Link Settings

```liquid
{% if section.settings.button_link != blank %}
  <a href="{{ section.settings.button_link }}">
    {{ section.settings.button_label }}
  </a>
{% endif %}
```

### Color Scheme Settings

```liquid
<div class="section-{{ section.id }}" style="
  --color-background: {{ section.settings.background_color }};
  --color-text: {{ section.settings.text_color }};
">
  <!-- content -->
</div>
```

## Conditional Rendering

### Check if Variable Exists/Is Not Blank

```liquid
{% if product.description != blank %}
  {{ product.description }}
{% endif %}

{% if section.settings.show_author %}
  <p>By {{ article.author }}</p>
{% endif %}
```

### Check Array Size

```liquid
{% if collection.products.size > 0 %}
  <!-- show products -->
{% else %}
  <p>No products found</p>
{% endif %}
```

### Case/Switch Statement

```liquid
{% case section.settings.alignment %}
  {% when 'left' %}
    <div class="text-left">
  {% when 'center' %}
    <div class="text-center">
  {% when 'right' %}
    <div class="text-right">
{% endcase %}
```

## Breadcrumbs Pattern

```liquid
{% unless template == 'index' or template == 'cart' or template == 'list-collections' %}
  <nav class="breadcrumbs" aria-label="breadcrumb">
    <a href="/">Home</a>
    
    {% if template contains 'product' %}
      {% if collection %}
        <span class="divider">/</span>
        <a href="{{ collection.url }}">{{ collection.title }}</a>
      {% endif %}
      <span class="divider">/</span>
      <span>{{ product.title }}</span>
      
    {% elsif template contains 'collection' %}
      <span class="divider">/</span>
      <span>{{ collection.title }}</span>
      
    {% elsif template contains 'blog' %}
      <span class="divider">/</span>
      {% if article %}
        <a href="{{ blog.url }}">{{ blog.title }}</a>
        <span class="divider">/</span>
        <span>{{ article.title }}</span>
      {% else %}
        <span>{{ blog.title }}</span>
      {% endif %}
      
    {% elsif template == 'page' %}
      <span class="divider">/</span>
      <span>{{ page.title }}</span>
    {% endif %}
  </nav>
{% endunless %}
```

## Filters (Essential)

### Text Filters

```liquid
{{ 'hello world' | capitalize }}  {%- # Hello world -%}
{{ 'hello world' | upcase }}      {%- # HELLO WORLD -%}
{{ 'HELLO WORLD' | downcase }}    {%- # hello world -%}
{{ product.title | truncate: 50 }}
{{ product.description | strip_html }}
```

### Money Filters

```liquid
{{ product.price | money }}                    {%- # $19.99 -%}
{{ product.price | money_without_currency }}   {%- # 19.99 -%}
{{ product.price | money_with_currency }}      {%- # $19.99 USD -%}
```

### Image Filters

```liquid
{{ product.featured_image | image_url: width: 800 }}
{{ image | image_url: width: 800, height: 600, crop: 'center' }}
{{ image | image_url: width: 800 | image_tag: alt: product.title }}
```

### Date Filters

```liquid
{{ article.published_at | date: '%B %d, %Y' }}  {%- # January 15, 2025 -%}
{{ 'now' | date: '%Y-%m-%d' }}                  {%- # 2025-11-01 -%}
```

### Array Filters

```liquid
{{ collection.products | size }}
{{ collection.products | map: 'title' }}
{{ collection.products | where: 'available' }}
{{ collection.products | first }}
{{ collection.products | last }}
{{ array | join: ', ' }}
{{ array | reverse }}
{{ array | sort: 'title' }}
```

### URL Filters

```liquid
{{ 'style.css' | asset_url }}
{{ product | img_url: 'large' }}
{{ product.url | within: collection }}
```

## Rendering Snippets and Sections

### Render Snippet

```liquid
{% render 'product-card', product: product, show_vendor: true %}
```

### Include Snippet (older method, less recommended)

```liquid
{% include 'snippet-name' %}
```

### Render Section in Layout

```liquid
{% section 'header' %}
{% section 'footer' %}
```

## Performance Best Practices

### Whitespace Control

```liquid
{%- comment -%}Use hyphens to strip whitespace{%- endcomment -%}
{%- if condition -%}
  content
{%- endif -%}
```

### Lazy Loading Images

```liquid
{{ image | image_url: width: 800 | image_tag: loading: 'lazy' }}
```

### Preloading Critical Assets

```liquid
<link rel="preload" href="{{ 'theme.css' | asset_url }}" as="style">
<link rel="preload" href="{{ 'theme.js' | asset_url }}" as="script">
```

## Theme Blocks Rendering

### Render All Theme Blocks in a Section

```liquid
<div class="section-container">
  {% content_for 'blocks' %}
</div>
```

### Loop Through Blocks with Custom Logic

```liquid
{% for block in section.blocks %}
  <div {{ block.shopify_attributes }}>
    {% case block.type %}
      {% when 'text' %}
        {{ block.settings.text }}
      {% when 'button' %}
        <a href="{{ block.settings.url }}">{{ block.settings.label }}</a>
      {% when 'image' %}
        {{ block.settings.image | image_url: width: 800 | image_tag }}
    {% endcase %}
  </div>
{% endfor %}
```

## Common Gotchas

### Assignment vs Capture

```liquid
{%- # assign creates a simple variable -%}
{% assign my_var = 'hello' %}

{%- # capture stores rendered content (including HTML) -%}
{% capture my_content %}
  <p>{{ product.title }}</p>
{% endcapture %}
```

### String Concatenation

```liquid
{% assign full_name = first_name | append: ' ' | append: last_name %}
```

### Default Values

```liquid
{{ section.settings.heading | default: 'Default Heading' }}
```
