---
name: ui-ux-pro-max
description: "Apply professional UI/UX design patterns — 67+ UI component styles, 96 color palettes, conversion-optimized layouts, interaction design, and user experience best practices. Use when designing UI components, improving UX flows, selecting color palettes, creating conversion-optimized layouts, designing product pages, or applying design system patterns. Triggers: \"UI design\", \"UX\", \"design pattern\", \"color palette\", \"component design\", \"layout\", \"conversion design\", \"user experience\"."
---

# UI/UX Pro Max Design System

Professional-grade UI/UX patterns for Shopify storefronts — 67 component styles, 96 curated palettes, and conversion-optimized layout patterns.

## Color Palettes (Beauty & Luxury Selection)

### Palette 1: Golden Luxury
```css
--palette-primary: #1a1a2e;    /* Deep navy */
--palette-secondary: #16213e;  /* Navy dark */
--palette-accent: #d4a853;     /* Warm gold */
--palette-light: #fdf6ec;      /* Cream */
--palette-neutral: #6b6b6b;    /* Warm gray */
```

### Palette 2: Blush Premium
```css
--palette-primary: #2d2d2d;    /* Charcoal */
--palette-secondary: #4a4a4a;  /* Dark gray */
--palette-accent: #e8b4b8;     /* Soft blush */
--palette-light: #fdf9f9;      /* Off-white */
--palette-neutral: #9e9e9e;    /* Mid gray */
```

### Palette 3: Forest Botanicals
```css
--palette-primary: #2d4a3e;    /* Deep forest */
--palette-secondary: #1e3329;  /* Darker forest */
--palette-accent: #8fbc8f;     /* Sage green */
--palette-light: #f4f9f4;      /* Pale mint */
--palette-neutral: #6b8c7a;    /* Muted sage */
```

### Palette 4: Rose Marble
```css
--palette-primary: #3d2b2b;    /* Deep brown */
--palette-secondary: #5c3d3d;  /* Medium brown */
--palette-accent: #c97b84;     /* Rose */
--palette-light: #fdf4f5;      /* Blush white */
--palette-neutral: #a07878;    /* Dusty rose */
```

## UI Component Patterns

### Hero Layouts

**Layout A: Split Screen (Product + Copy)**
```
[Left 50%: Compelling headline + CTA]  [Right 50%: Product/lifestyle image]
```

**Layout B: Full-width with overlay**
```
[Full-width image/video background]
[Centered overlay: Headline + CTA]
[Subtle dark gradient for text legibility]
```

**Layout C: Asymmetric (editorial)**
```
[Large product image 60%]  [Copy block 40% with accent color background]
```

### Product Card Variants

**Style 1: Classic**
```
[Product Image (square, 1:1)]
[Product Name — left aligned]
[Price]
[Add to Cart button — full width]
```

**Style 2: Hover Reveal**
```
[Product Image]
[Hover: second image + quick-add overlay]
[Product Name]
[Price + Review stars]
```

**Style 3: Magazine (large format)**
```
[Product Image (3:4 portrait)]
[Category tag]
[Product Name — serif font, large]
[Price]
[Subtle CTA text link]
```

### Navigation Patterns

**Mega Menu (for stores with 10+ categories)**
```
[Logo]  [Nav links]  [Search]  [Account]  [Cart]
         ↓ hover
[Full-width dropdown: Category grid + featured product]
```

**Sticky Minimal (conversion focused)**
```
Scrolls: [Logo + CTA button + Cart icon]
```

### Product Page Layout Patterns

**Standard 2-Column**
```
[Images gallery 55%] | [Product info 45%]
                       - Title
                       - Price + Reviews
                       - Variant selector
                       - Quantity
                       - Add to cart (sticky on mobile)
                       - Description accordion
                       - Shipping info
```

**Full-Width Editorial**
```
[Full-width hero product image]
[Details below fold: 2-column info + full description]
```

## Conversion UX Principles

### Above the Fold Requirements (Product Page)
1. Product title — clear, benefit-focused
2. Price — visible, no friction
3. Primary variant selector — prominent
4. Add to Cart CTA — highest contrast element on page
5. Trust signals — "Free shipping over $X" / "⭐ 4.9/5" / "Secure checkout"

### Mobile-First Conversion Design
- Sticky Add to Cart button at bottom of viewport
- One-tap checkout (Shop Pay / Apple Pay)
- Bottom navigation for key categories
- Tap targets minimum 44x44px
- Form fields: large, single column, auto-advance

### Trust Signal Placement
```
Above fold: Star rating + review count
Near price: "Free shipping" + "Easy returns"
Near CTA: Security badge + guarantee
Bottom: Full trust bar (SSL, payment logos)
```

### Scarcity/Urgency Components
```liquid
{# Low stock indicator #}
{% if variant.inventory_quantity <= 5 and variant.inventory_quantity > 0 %}
  <p class="inventory-alert">
    ⚠️ Only {{ variant.inventory_quantity }} left in stock
  </p>
{% endif %}
```

## Micro-interactions

### Button States
```css
.btn-primary {
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
.btn-primary:active { transform: translateY(0); }
.btn-primary:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 2px; }
```

### Image Hover
```css
.product-card__image { overflow: hidden; }
.product-card__image img { transition: transform 0.4s ease; }
.product-card:hover .product-card__image img { transform: scale(1.04); }
```

### Smooth Scroll
```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

## UX Copywriting Patterns

| Element | Poor | Better |
|---------|------|--------|
| CTA | "Submit" | "Book My Appointment" |
| Empty state | "No products found" | "We couldn't find that — try browsing [category]" |
| Error | "Error 422" | "We couldn't add that to your cart. Please try again." |
| Loading | "Loading..." | "Getting your products ready..." |
| Success | "Done" | "You're booked! Check your email for confirmation." |
