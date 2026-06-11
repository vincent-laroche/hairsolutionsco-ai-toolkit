---
name: shopify-horizon
description: "Comprehensive Shopify Horizon theme development skill covering theme blocks, Liquid patterns, section schemas, metafields/metaobjects integration, responsive design, and custom sections. Use when working with Shopify Horizon themes, customizing sections, creating theme blocks, displaying metafields/metaobjects, building responsive layouts, troubleshooting Liquid code, or implementing custom product options and features."
---

# Shopify Horizon Theme Mastery

This skill provides deep knowledge of Shopify's Horizon theme framework, including its unique block-based architecture, Liquid templating, metafields/metaobjects, and modern customization patterns.

## When to Use This Skill

Use this skill for any task involving:
- Shopify Horizon theme customization
- Creating or modifying theme blocks and sections
- Working with Liquid code in Horizon
- Implementing metafields and metaobjects
- Building responsive designs for mobile and desktop
- Custom product options (swatches, variants, etc.)
- Troubleshooting theme issues
- Creating reusable sections

## Quick Start Workflow

### For Creating New Sections

1. Read `references/section-schemas.md` for schema structure
2. Read `references/liquid-patterns.md` for Liquid code examples
3. Create section file in `/sections/` with schema
4. Test in theme editor

### For Working with Metafields/Metaobjects

1. Read `references/metafields-metaobjects.md` for complete guide
2. Create metafield/metaobject definitions in Shopify admin
3. Implement display logic in Liquid
4. Test with real product data

### For Custom Product Options (e.g., Image Swatches)

1. Read `references/metafields-metaobjects.md` → "Product Option Swatches" section
2. Create metaobject for option data (e.g., Hair Color with swatch image)
3. Link product variants to metaobject entries
4. Implement display logic using provided patterns

### For Responsive Design

1. Read `references/responsive-design.md` → "Different Images for Desktop/Mobile" section
2. Add mobile + desktop image settings to section schema
3. Implement conditional rendering with CSS media queries
4. Test on multiple devices

### For Creating Reusable Blocks

1. Read `references/theme-structure.md` → "/blocks/ Directory" section
2. Create block file in `/blocks/` folder
3. Add schema with proper nesting support
4. Make sections accept your new block type

## Key Reference Files

Each reference file contains detailed patterns, code examples, and best practices:

### `references/theme-structure.md`
- Complete directory structure explanation
- Differences between Horizon and Dawn
- Theme blocks vs sections vs snippets
- File naming conventions
- 8-level nesting architecture

**Read this when**: You need to understand where files go or how Horizon's structure differs from other themes.

### `references/liquid-patterns.md`
- Essential Liquid syntax and patterns
- Product, collection, and cart code examples
- Filters, loops, and conditionals
- Performance best practices
- Common gotchas and solutions

**Read this when**: Writing Liquid code or looking for code snippets.

### `references/section-schemas.md`
- Complete schema structure guide
- All setting types with examples
- Block acceptance patterns
- Preset configurations
- Real-world section examples

**Read this when**: Creating or modifying section/block schemas.

### `references/metafields-metaobjects.md`
- Metafield types and creation
- Metaobject definitions and entries
- Accessing in Liquid code
- Product option swatches implementation
- Advanced patterns (JSON, lists, references)

**Read this when**: Working with custom data, product options, or content beyond default Shopify fields.

### `references/responsive-design.md`
- Mobile-first patterns
- Different content for mobile/desktop
- Responsive grids and layouts
- Touch-friendly design
- Media query patterns

**Read this when**: Building responsive sections or solving mobile/desktop display issues.

### `references/theme-settings.md`
- Global theme settings structure
- Color schemes and typography
- CSS variables pattern
- Common setting categories
- Best practices

**Read this when**: Creating theme-wide settings or accessing global configurations.

## Template Assets

### `assets/contact-section.liquid`
Complete, production-ready Contact Us section with:
- Form with validation
- Contact information sidebar
- Responsive layout
- Comprehensive schema
- Customizable styling

**Use this as**: A reference for creating custom sections or copy it directly to your theme.

## Horizon-Specific Features

### Theme Blocks (The Game Changer)
Unlike Dawn, Horizon uses **theme blocks** that:
- Live in `/blocks/` folder
- Are reusable across ALL sections
- Support **8 levels of nesting**
- Enable modular, flexible layouts
- Work seamlessly with Shopify AI

**Key Liquid tag**: `{% content_for 'blocks' %}`

### Block Schema Pattern
```liquid
{% schema %}
{
  "name": "Your Block",
  "blocks": [{ "type": "@theme" }],
  "presets": [...]
}
{% endschema %}
```

## Common Tasks

### Add Breadcrumbs to Every Page
See `references/liquid-patterns.md` → "Breadcrumbs Pattern"

### Display Custom Metafield
See `references/metafields-metaobjects.md` → "Accessing Metafields in Liquid"

### Show Different Images on Mobile/Desktop
See `references/responsive-design.md` → "Different Images for Desktop/Mobile"

### Create Product Option Swatches
See `references/metafields-metaobjects.md` → "Product Option Swatches (Your Use Case!)"

### Use Dynamic Content in Section Text
Use section schema with `"type": "text"` or `"type": "richtext"` and access via `{{ section.settings.your_setting }}`

## Troubleshooting

### Metafield Not Displaying
1. Check if metafield exists: `{% if product.metafields.namespace.key %}...{% endif %}`
2. Verify storefront access is enabled (for metaobjects)
3. Ensure product has a value assigned
4. Check namespace.key spelling

### Theme Block Not Appearing
1. Verify section accepts theme blocks: `"blocks": [{ "type": "@theme" }]`
2. Ensure `{% content_for 'blocks' %}` is in section Liquid
3. Check block file is in `/blocks/` folder
4. Verify proper schema structure

### Responsive Issues
1. Test on real devices, not just browser resize
2. Check CSS media queries are correct
3. Verify images use `widths` and `sizes` attributes
4. Ensure touch targets are 44x44px minimum

### Performance Problems
1. Use lazy loading: `loading: 'lazy'` on images
2. Implement responsive images with `widths` attribute
3. Avoid unnecessary loops
4. Use whitespace control: `{%- -%}` in Liquid

## Best Practices

1. **Mobile-first**: Design for mobile, enhance for desktop
2. **Semantic HTML**: Use proper HTML elements
3. **Progressive enhancement**: Core functionality without JS
4. **Accessibility**: Include alt text, ARIA labels, keyboard navigation
5. **Test thoroughly**: Check all settings combinations
6. **Document complexity**: Add comments for complex Liquid logic
7. **Reuse blocks**: Create blocks for repeated elements
8. **Use metaobjects**: For reusable content structures
9. **Whitespace control**: Keep HTML clean with `{%- -%}`
10. **Validate schemas**: Test all setting types work correctly

## Advanced Patterns

For advanced techniques like nested block presets, conditional rendering, dynamic section colors, and complex metaobject relationships, consult the specific reference files. Each file contains progressive examples from basic to advanced.

## Getting Help

If you encounter issues not covered in the references:
1. Check Shopify Dev documentation: https://shopify.dev/docs/themes
2. Horizon GitHub repo: https://github.com/Shopify/horizon
3. Shopify Community forums
4. Theme Check tool for validation

## Notes

- Horizon is the successor to Dawn (launched Summer 2025)
- Dawn will only receive bug fixes, no new features
- Content cannot be automatically migrated from Dawn to Horizon
- Horizon requires theme blocks support (not backward compatible with older section blocks)
