# Metafields and Metaobjects in Horizon

## What Are Metafields?

Metafields allow you to add custom data to Shopify resources (products, collections, customers, orders, etc.) beyond the default fields.

### Metafield Structure

```
namespace.key = value
```

Example: `product.metafields.custom.hair_color = "Blonde"`

## Creating Metafields

### Via Shopify Admin

1. Go to **Settings** → **Custom data**
2. Select resource type (Products, Collections, etc.)
3. Click **Add definition**
4. Fill in:
   - **Namespace**: `custom` (recommended)
   - **Key**: `hair_color`
   - **Name**: Display name for merchants
   - **Type**: Choose data type
   - **Validation**: Set rules if needed

### Common Metafield Types

| Type | Description | Example Use |
|------|-------------|-------------|
| Single line text | Short text | Product material |
| Multi-line text | Long text | Care instructions |
| Rich text | Formatted text | Extended descriptions |
| Number (integer) | Whole numbers | Stock threshold |
| Number (decimal) | Decimal numbers | Custom pricing |
| Date | Date picker | Manufacture date |
| Date and time | DateTime picker | Promotion end time |
| URL | Link input | Video URL |
| Boolean | True/false | Is featured |
| Color | Color picker | Brand color |
| File | File upload | PDF spec sheet |
| JSON | Structured data | Complex config |
| Reference | Link to another resource | Related product |
| List of references | Multiple resources | Related products |
| Metaobject | Link to metaobject | Hair color details |

## Accessing Metafields in Liquid

### Basic Syntax

```liquid
{{ product.metafields.namespace.key }}
```

### Check if Metafield Exists

```liquid
{% if product.metafields.custom.hair_color %}
  <p>Hair Color: {{ product.metafields.custom.hair_color.value }}</p>
{% endif %}
```

### With Default Value

```liquid
{{ product.metafields.custom.material | default: 'Not specified' }}
```

## Product Metafield Examples

### Display Custom Text

```liquid
{% if product.metafields.custom.care_instructions %}
  <div class="care-instructions">
    <h3>Care Instructions</h3>
    {{ product.metafields.custom.care_instructions.value }}
  </div>
{% endif %}
```

### Display Custom Image

```liquid
{% if product.metafields.custom.lifestyle_image %}
  {{ product.metafields.custom.lifestyle_image | image_url: width: 1000 | image_tag }}
{% endif %}
```

### Display Custom Video

```liquid
{% if product.metafields.custom.how_to_video %}
  <video controls>
    <source src="{{ product.metafields.custom.how_to_video.value }}" type="video/mp4">
  </video>
{% endif %}
```

### Display Related Product (Reference Type)

```liquid
{% if product.metafields.custom.related_product %}
  {% assign related = product.metafields.custom.related_product.value %}
  <div class="related-product">
    <h3>You might also like</h3>
    <a href="{{ related.url }}">
      {{ related.featured_image | image_url: width: 300 | image_tag }}
      <p>{{ related.title }}</p>
      <p>{{ related.price | money }}</p>
    </a>
  </div>
{% endif %}
```

### List of Products (List Type)

```liquid
{% if product.metafields.custom.complete_the_look %}
  <div class="product-bundle">
    <h3>Complete the Look</h3>
    {% for item in product.metafields.custom.complete_the_look.value %}
      <div class="bundle-item">
        <a href="{{ item.url }}">
          {{ item.featured_image | image_url: width: 200 | image_tag }}
          <p>{{ item.title }}</p>
          <p>{{ item.price | money }}</p>
        </a>
      </div>
    {% endfor %}
  </div>
{% endif %}
```

## What Are Metaobjects?

Metaobjects are reusable content structures made up of multiple metafields. They're like templates that you can reference from multiple places.

**Use Case Example**: Instead of creating separate metafields for hair color name, swatch image, and hex code on every product, create a "Hair Color" metaobject with those fields, then reference it from products.

## Creating Metaobjects

### Via Shopify Admin

1. Go to **Content** → **Metaobjects**
2. Click **Add definition**
3. Name it (e.g., "Hair Color")
4. Add fields:
   - Color name (single line text)
   - Swatch image (file)
   - Hex code (color)
4. Set **Storefront access**: Enable
5. Save definition

### Creating Metaobject Entries

1. Go to **Content** → **Metaobjects**
2. Select your definition (e.g., "Hair Color")
3. Click **Add entry**
4. Fill in the fields:
   - Color name: "Ash Blonde"
   - Swatch image: Upload image
   - Hex code: #F5E6D3
5. Save entry

Repeat for all your hair colors (Platinum Blonde, Dark Brown, etc.).

## Linking Metaobjects to Products

### Create Product Metafield

1. Go to **Settings** → **Custom data** → **Products**
2. Click **Add definition**
3. Set:
   - **Name**: "Hair Color"
   - **Namespace**: `custom`
   - **Key**: `hair_color`
   - **Type**: **Metaobject** → Select "Hair Color" definition
4. Save

### Assign to Products

1. Go to **Products** → Select a product
2. Scroll to **Metafields**
3. Select hair color entry from dropdown
4. Save product

## Displaying Metaobjects in Liquid

### Basic Metaobject Access

```liquid
{% assign hair_color = product.metafields.custom.hair_color.value %}

{% if hair_color %}
  <div class="hair-color-info">
    <h3>{{ hair_color.color_name }}</h3>
    {{ hair_color.swatch_image | image_url: width: 100 | image_tag }}
    <p>Hex: {{ hair_color.hex_code }}</p>
  </div>
{% endif %}
```

### Product Option Swatches (Your Use Case!)

**Scenario**: You have a "Hair Color" product option and want to show image swatches linked to your metaobject.

```liquid
{%- # Get the product option for hair color -%}
{% for option in product.options_with_values %}
  {% if option.name == 'Hair Color' %}
    <div class="color-swatches">
      <label>{{ option.name }}</label>
      <div class="swatch-container">
        {% for value in option.values %}
          {%- # Try to find matching metaobject entry -%}
          {% assign hair_color_entry = shop.metaobjects.hair_color[value] %}
          
          {% if hair_color_entry %}
            <div class="swatch" data-value="{{ value }}">
              {{ hair_color_entry.swatch_image | image_url: width: 60 | image_tag: alt: value }}
              <span>{{ value }}</span>
            </div>
          {% else %}
            {%- # Fallback if no metaobject found -%}
            <div class="swatch text-swatch" data-value="{{ value }}">
              {{ value }}
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>
  {% endif %}
{% endfor %}
```

**Note**: The `shop.metaobjects.hair_color[value]` syntax requires the metaobject to have a "handle" that matches the option value. You may need to adjust this based on your setup.

### Alternative: Direct Metafield Mapping

If option values don't match metaobject handles, create a product metafield list:

```liquid
{%- # Assuming you created a list metafield: product.metafields.custom.color_swatches -%}
{% if product.metafields.custom.color_swatches %}
  <div class="color-swatches">
    {% for color_entry in product.metafields.custom.color_swatches.value %}
      <div class="swatch">
        {{ color_entry.swatch_image | image_url: width: 60 | image_tag }}
        <span>{{ color_entry.color_name }}</span>
      </div>
    {% endfor %}
  </div>
{% endif %}
```

## Looping Through All Metaobject Entries

```liquid
{%- # List all hair color options available -%}
<div class="all-colors">
  <h2>Available Hair Colors</h2>
  {% for entry in shop.metaobjects.hair_color.values %}
    <div class="color-card">
      {{ entry.swatch_image | image_url: width: 200 | image_tag }}
      <h3>{{ entry.color_name }}</h3>
      <div class="color-preview" style="background-color: {{ entry.hex_code }};"></div>
    </div>
  {% endfor %}
</div>
```

## Dynamic Sections with Metaobjects

### In Section Schema

```json
{
  "type": "metaobject",
  "id": "featured_color",
  "label": "Featured Hair Color"
}
```

### In Section Liquid

```liquid
{% if section.settings.featured_color %}
  {% assign color = section.settings.featured_color %}
  <div class="featured-color">
    {{ color.swatch_image | image_url: width: 400 | image_tag }}
    <h2>{{ color.color_name }}</h2>
    <p>Hex: {{ color.hex_code }}</p>
  </div>
{% endif %}
```

## Metaobject Lists in Sections

### Schema

```json
{
  "type": "metaobject_list",
  "id": "color_showcase",
  "label": "Colors to showcase"
}
```

### Liquid

```liquid
{% if section.settings.color_showcase %}
  <div class="color-grid">
    {% for color in section.settings.color_showcase %}
      <div class="color-item">
        {{ color.swatch_image | image_url: width: 300 | image_tag }}
        <h3>{{ color.color_name }}</h3>
      </div>
    {% endfor %}
  </div>
{% endif %}
```

## JSON Metafields

For complex structured data:

### Schema Example

```json
{
  "dimensions": {
    "length": 10,
    "width": 5,
    "height": 2
  },
  "materials": ["Synthetic", "Human Hair"],
  "maintenance": {
    "wash_frequency": "Weekly",
    "heat_safe": true
  }
}
```

### Accessing in Liquid

```liquid
{% if product.metafields.custom.product_specs %}
  {% assign specs = product.metafields.custom.product_specs.value %}
  
  <div class="specifications">
    <h3>Dimensions</h3>
    <p>{{ specs.dimensions.length }}" × {{ specs.dimensions.width }}" × {{ specs.dimensions.height }}"</p>
    
    <h3>Materials</h3>
    <ul>
      {% for material in specs.materials %}
        <li>{{ material }}</li>
      {% endfor %}
    </ul>
    
    <h3>Maintenance</h3>
    <p>Wash: {{ specs.maintenance.wash_frequency }}</p>
    {% if specs.maintenance.heat_safe %}
      <p>✓ Heat safe</p>
    {% endif %}
  </div>
{% endif %}
```

## Collection Metafields

Collections can also have metafields:

```liquid
{% if collection.metafields.custom.banner_image %}
  <div class="collection-banner">
    {{ collection.metafields.custom.banner_image | image_url: width: 1400 | image_tag }}
  </div>
{% endif %}

{% if collection.metafields.custom.featured_products %}
  <div class="featured">
    {% for product in collection.metafields.custom.featured_products.value %}
      {% render 'product-card', product: product %}
    {% endfor %}
  </div>
{% endif %}
```

## Customer Metafields (Advanced)

```liquid
{%- # On customer account page -%}
{% if customer.metafields.custom.preferred_hair_type %}
  <p>Preferred Hair Type: {{ customer.metafields.custom.preferred_hair_type.value }}</p>
{% endif %}
```

## Best Practices

1. **Use consistent namespaces**: Stick to `custom` for simplicity
2. **Descriptive keys**: Use `hair_color_option` not `hco`
3. **Enable storefront access**: Required for metaobjects to appear in Liquid
4. **Test thoroughly**: Always check if metafield exists before displaying
5. **Use metaobjects for reusable content**: Colors, materials, care instructions
6. **Use direct metafields for unique data**: SKU, dimensions specific to one product
7. **Document your structure**: Keep track of namespace.key combinations

## Troubleshooting

### Metafield Not Showing

```liquid
{%- # Debug output -%}
{% if product.metafields.custom.hair_color %}
  Exists: {{ product.metafields.custom.hair_color }}
{% else %}
  Not found
{% endif %}
```

### Check Metaobject Access

1. Ensure **Storefront access** is enabled in metaobject definition
2. Verify entry is published (not draft)
3. Check that product metafield is properly linked to metaobject entry

### Reference Not Loading

```liquid
{%- # Access nested reference -%}
{% assign color_ref = product.metafields.custom.hair_color.value %}
{% if color_ref %}
  {{ color_ref.color_name }}
{% else %}
  No color assigned
{% endif %}
```

## Advanced: Dynamic Product Options

Create a reusable section for product options with metaobject swatches:

```liquid
<div class="product-options">
  {% for option in product.options_with_values %}
    <div class="option-group">
      <label>{{ option.name }}</label>
      
      {% case option.name %}
        {% when 'Hair Color' %}
          {%- # Show image swatches for color -%}
          <div class="color-swatches">
            {% for value in option.values %}
              {%- # Look up metaobject -%}
              {% assign color = shop.metaobjects.hair_color[value | handleize] %}
              {% if color %}
                <label class="swatch-option">
                  <input type="radio" name="option-{{ option.position }}" value="{{ value }}">
                  {{ color.swatch_image | image_url: width: 60 | image_tag }}
                  <span>{{ value }}</span>
                </label>
              {% endif %}
            {% endfor %}
          </div>
          
        {% else %}
          {%- # Default text options -%}
          <div class="text-options">
            {% for value in option.values %}
              <label>
                <input type="radio" name="option-{{ option.position }}" value="{{ value }}">
                {{ value }}
              </label>
            {% endfor %}
          </div>
      {% endcase %}
    </div>
  {% endfor %}
</div>
```

This pattern gives you maximum flexibility for different option types!
