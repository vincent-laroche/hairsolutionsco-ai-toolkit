---
name: shopify-debugging
description: "Debug Shopify theme issues — Liquid errors, JavaScript console errors, rendering problems, cart issues, variant selection bugs, and theme customizer problems. Use when troubleshooting Shopify issues, fixing Liquid errors, debugging theme customizer settings not saving, investigating cart problems, or diagnosing display issues. Triggers: \"shopify bug\", \"liquid error\", \"theme not working\", \"debug shopify\", \"shopify issue\", \"section not showing\"."
---

# Shopify Theme Debugging

Systematic debugging for Liquid template errors, JavaScript issues, and theme customizer problems.

## Liquid Debugging

### Output Variables
```liquid
{# Print any variable to see its value #}
{{ product | json }}
{{ section.settings | json }}
{{ cart | json }}

{# Check object type #}
{{ product | class_name }}
```

### Common Liquid Errors

**UndefinedError: nil is not a string**
```liquid
{# Problem — accessing property of nil object #}
{{ product.featured_image.src }}

{# Fix — check if object exists first #}
{% if product.featured_image %}
  {{ product.featured_image.src }}
{% endif %}
```

**Liquid Syntax Error: Expected tag**
- Check for missing `{% end... %}` tags
- Ensure all `{% if %}` have `{% endif %}`
- Ensure all `{% for %}` have `{% endfor %}`

**Variable Not Showing**
```liquid
{# Debug: check what's in section settings #}
<pre>{{ section.settings | json }}</pre>
<pre>{{ block.settings | json }}</pre>
```

## JavaScript Debugging

### Browser Console Commands
```javascript
// Check cart state
fetch('/cart.js').then(r => r.json()).then(console.log)

// Check variant data on product page
console.log(window.meta.product)

// Check theme settings accessible in JS
console.log(Shopify.theme)

// Monitor cart updates
document.addEventListener('cart:updated', (e) => console.log(e.detail))
```

### Common JS Issues

**Variant selector not updating price**
- Check if `product_options` JSON is being loaded
- Verify variant change event is firing: `product:variantChanged`
- Confirm price element has the selector the JS expects

**Add to cart failing silently**
```javascript
// Debug cart form submission
document.querySelector('[data-cart-form]').addEventListener('submit', (e) => {
  console.log('Form data:', new FormData(e.target));
});
```

## Theme Customizer Debugging

**Settings not saving**
- Check `settings_schema.json` for JSON syntax errors
- Verify `id` values are unique across all settings
- Confirm section file name matches the `type` in the JSON template

**Block not showing**
- Verify `block.shopify_attributes` is on the block's root element
- Check that block type in schema matches exactly

**Section not appearing in customizer**
- Section must have `presets` in schema to appear in "Add section"
- Template must be a `.json` file (not `.liquid`) for section dragging

## Cart & Checkout Issues

**Items not persisting in cart**
- Check for JavaScript errors in cart update handlers
- Verify `routes.cart_add_url` is defined and not hardcoded
- Test with `{{ routes.cart_add_url }}` in Liquid (outputs `/cart/add`)

**Wrong prices**
- All prices in Liquid are in cents — always use `| money` filter
- `{{ product.price }}` = 1499 (for $14.99)
- `{{ product.price | money }}` = $14.99

## Debugging Apps

**App section not rendering**
- Check app embed is enabled in Theme Editor
- Verify app block is added to the relevant template
- App may have CORS issues — check network tab

## Performance Debugging

```javascript
// Measure render time
performance.mark('start-render');
// ... code ...
performance.mark('end-render');
performance.measure('render-time', 'start-render', 'end-render');
console.log(performance.getEntriesByName('render-time'));
```

## Error Logging

```liquid
{# Add to layout/theme.liquid for JS error tracking #}
<script>
  window.addEventListener('error', function(e) {
    console.error('Theme error:', e.message, 'at', e.filename, ':', e.lineno);
  });
</script>
```
