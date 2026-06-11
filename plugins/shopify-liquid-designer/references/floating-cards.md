# Floating Cards Design Pattern

Visual reference distilled from Hair Solutions Co design direction. Apply this pattern to any section that uses cards — features, pricing, testimonials, product grids, stat blocks.

## What "Floating" Means

Cards appear to lift off the page through a combination of:
- Elevated shadow (not flat, not harsh — a soft, deep blur)
- Subtle border for definition
- Rounded corners (16–24px)
- Optional micro-lift on hover (translateY -4px)
- Slight inner highlight on the top edge (for light themes)

---

## Light Theme Floating Card

**Reference**: Alter / purple SaaS screenshots — white cards on light gray (`#F0F0F5`) background.

### CSS Variables

```css
/* Light theme tokens */
--card-bg: #FFFFFF;
--card-border: rgba(0, 0, 0, 0.06);
--card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
               0 10px 24px -4px rgba(0, 0, 0, 0.08),
               0 1px 3px rgba(0, 0, 0, 0.04);
--card-shadow-hover: 0 8px 12px -2px rgba(0, 0, 0, 0.08),
                     0 20px 40px -6px rgba(0, 0, 0, 0.12),
                     0 2px 6px rgba(0, 0, 0, 0.05);
--card-radius: 20px;
--card-padding: 28px;
--card-transition: box-shadow 220ms ease, transform 220ms ease;
```

### Base Card CSS

```css
.floating-card {
  background: var(--card-bg, #fff);
  border: 1px solid var(--card-border, rgba(0,0,0,0.06));
  border-radius: var(--card-radius, 20px);
  padding: var(--card-padding, 28px);
  transition: var(--card-transition);
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,0.05),
    0 10px 24px -4px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.floating-card:hover {
  box-shadow:
    0 8px 12px -2px rgba(0,0,0,0.08),
    0 20px 40px -6px rgba(0,0,0,0.12),
    inset 0 1px 0 rgba(255,255,255,0.9);
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .floating-card { transition: box-shadow 0ms; }
  .floating-card:hover { transform: none; }
}
```

### Featured / Highlighted Card (e.g. "Popular" pricing tier)

```css
.floating-card--featured {
  background: linear-gradient(135deg, #6B3FD4 0%, #4F2AA8 100%);
  border-color: rgba(107, 63, 212, 0.3);
  color: #fff;
  box-shadow:
    0 8px 16px -4px rgba(107, 63, 212, 0.35),
    0 24px 48px -8px rgba(107, 63, 212, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
```

---

## Dark Theme Floating Card

**Reference**: designfast / dark screenshots — dark gray cards on near-black (`#0A0A0A`) background.

### CSS Variables

```css
/* Dark theme tokens */
--card-bg-dark: #141414;
--card-border-dark: rgba(255, 255, 255, 0.07);
--card-shadow-dark:
  0 4px 6px -1px rgba(0, 0, 0, 0.4),
  0 10px 24px -4px rgba(0, 0, 0, 0.5),
  0 0 0 1px rgba(255, 255, 255, 0.04);
--card-shadow-dark-hover:
  0 8px 12px -2px rgba(0, 0, 0, 0.5),
  0 24px 48px -8px rgba(0, 0, 0, 0.6),
  0 0 0 1px rgba(255, 255, 255, 0.08);
```

### Base Card CSS (Dark)

```css
.floating-card--dark {
  background: var(--card-bg-dark, #141414);
  border: 1px solid var(--card-border-dark, rgba(255,255,255,0.07));
  border-radius: var(--card-radius, 20px);
  padding: var(--card-padding, 28px);
  transition: var(--card-transition);
  color: rgba(255, 255, 255, 0.88);
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,0.4),
    0 10px 24px -4px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.floating-card--dark:hover {
  box-shadow:
    0 8px 12px -2px rgba(0,0,0,0.5),
    0 24px 48px -8px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.08);
  transform: translateY(-4px);
}
```

### Featured Card (dark, e.g. the blue "Dedicated Team" pricing card)

```css
.floating-card--dark.floating-card--featured {
  background: linear-gradient(145deg, #1a3a5c 0%, #0f2540 100%);
  border-color: rgba(56, 139, 253, 0.25);
  box-shadow:
    0 8px 20px -4px rgba(0,0,0,0.6),
    0 24px 48px -8px rgba(0,0,0,0.7),
    0 0 0 1px rgba(56, 139, 253, 0.15),
    inset 0 1px 0 rgba(255,255,255,0.07);
  color: #fff;
}
```

---

## Liquid Section Implementation

### Feature Cards Grid (works for both themes)

```liquid
{%- style -%}
  #shopify-section-{{ section.id }} .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    padding: 64px 40px;
    max-width: 1280px;
    margin: 0 auto;
  }

  #shopify-section-{{ section.id }} .floating-card {
    background: {{ section.settings.card_bg }};
    border: 1px solid {{ section.settings.card_border }};
    border-radius: 20px;
    padding: 28px;
    transition: box-shadow 220ms ease, transform 220ms ease;
    box-shadow:
      0 4px 6px -1px rgba(0,0,0,0.05),
      0 10px 24px -4px rgba(0,0,0,0.08),
      inset 0 1px 0 rgba(255,255,255,0.9);
  }

  #shopify-section-{{ section.id }} .floating-card:hover {
    box-shadow:
      0 8px 12px -2px rgba(0,0,0,0.08),
      0 20px 40px -6px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.9);
    transform: translateY(-4px);
  }

  @media (prefers-reduced-motion: reduce) {
    #shopify-section-{{ section.id }} .floating-card { transition: none; }
    #shopify-section-{{ section.id }} .floating-card:hover { transform: none; }
  }

  @media (max-width: 767px) {
    #shopify-section-{{ section.id }} .cards-grid {
      grid-template-columns: 1fr;
      padding: 40px 20px;
      gap: 16px;
    }
  }
{%- endstyle -%}

<div class="cards-grid">
  {%- for block in section.blocks -%}
    <div class="floating-card" {{ block.shopify_attributes }}>
      {%- if block.settings.icon != blank -%}
        <div class="floating-card__icon" aria-hidden="true">
          {{- block.settings.icon | image_url: width: 48 | image_tag: loading: 'lazy', alt: '' -}}
        </div>
      {%- endif -%}
      {%- if block.settings.heading != blank -%}
        <h3 class="floating-card__heading">{{ block.settings.heading | escape }}</h3>
      {%- endif -%}
      {%- if block.settings.text != blank -%}
        <p class="floating-card__text">{{ block.settings.text | escape }}</p>
      {%- endif -%}
    </div>
  {%- endfor -%}
</div>
```

---

## Figma Design Tokens for Floating Cards

When designing in Figma before coding, use these token names so they map 1:1 to Shopify CSS variables:

| Figma Token Name | Light Value | Dark Value | CSS Variable |
|-----------------|-------------|------------|--------------|
| `card/background` | `#FFFFFF` | `#141414` | `--card-bg` |
| `card/border` | `rgba(0,0,0,6%)` | `rgba(255,255,255,7%)` | `--card-border` |
| `card/shadow/default` | `0 10px 24px rgba(0,0,0,8%)` | `0 10px 24px rgba(0,0,0,50%)` | `--card-shadow` |
| `card/shadow/hover` | `0 20px 40px rgba(0,0,0,12%)` | `0 24px 48px rgba(0,0,0,60%)` | `--card-shadow-hover` |
| `card/radius` | `20px` | `20px` | `--card-radius` |
| `card/padding` | `28px` | `28px` | `--card-padding` |

**Figma Frame Setup for Card Components:**
- Auto Layout: Vertical, gap 16px, padding 28px
- Corner Radius: 20
- Effect: Drop Shadow (Y:10, Blur:24, Spread:0, Color: #000 at 8% for light / 50% for dark)
- Effect: Inner Shadow (Y:1, Blur:0, Color: #fff at 90% for light / 5% for dark) — creates the top edge highlight
- Stroke: 1px inside, `card/border` token

---

## Usage Decision Table

| Section type | Use floating cards? | Theme |
|-------------|--------------------|-|
| Features / benefits grid | ✅ Always | Match page |
| Pricing plans | ✅ Always — featured card gets accent color | Match page |
| Testimonials | ✅ Recommended | Light preferred for trust |
| Stats / metrics row | ✅ Recommended | Dark creates impact |
| Product grid | ⚠️ Optional (on product cards only) | Light |
| Hero section | ❌ No — hero is full-bleed | — |
| FAQ accordion | ❌ No — flat list is cleaner | — |