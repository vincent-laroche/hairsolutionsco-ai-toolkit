# CSS & Responsive — Hair Solutions Co.

## Typography System (Knockout Fonts)

```css
/* H1, H2 — always Knockout 50 */
font-family: 'Knockout 50 A', 'Knockout 50 B', sans-serif;

/* H3, buttons — always Knockout 49 */
font-family: 'Knockout 49 A', 'Knockout 49 B', sans-serif;

/* Never substitute with generic fonts */
```

**Type scale:**
```
H1: 80px desktop → 48px mobile
H2: 48px desktop → 36px mobile
H3: 36px desktop → 28px mobile
H4: 24px desktop → 20px mobile
Body: 19px desktop → 16px mobile
Small: 17px desktop → 15px mobile
```

## Responsive Breakpoints

```css
/* Desktop-first */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile landscape */ }
@media (max-width: 640px)  { /* Mobile portrait */ }
```

## CSS Custom Properties Pattern

```css
.section-name {
  --padding-top: {{ section.settings.padding_top }}px;
  --padding-bottom: {{ section.settings.padding_bottom }}px;
  --bg-color: {{ section.settings.background_color }};
  --text-color: {{ section.settings.text_color }};

  padding-top: var(--padding-top);
  padding-bottom: var(--padding-bottom);
  background: var(--bg-color);
  color: var(--text-color);
}
```

## Grid System

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .grid { grid-template-columns: 1fr; } }
```

## Section Container Pattern

```css
.section-name__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px;
}
@media (max-width: 768px) {
  .section-name__container { padding: 0 28px; }
}
```

## Section Skeleton

```liquid
<section class="section-name" style="--section-padding: {{ section.settings.padding }}px;">
  <div class="section-name__container">
    {%- if section.settings.heading != blank -%}
      <h2 class="section-name__heading">{{ section.settings.heading }}</h2>
    {%- endif -%}
    {%- for block in section.blocks -%}
      <div {{ block.shopify_attributes }}><!-- block content --></div>
    {%- endfor -%}
  </div>
</section>

<style>
.section-name { padding: var(--section-padding) 0; }
.section-name__container { max-width: 1400px; margin: 0 auto; padding: 0 60px; }
@media (max-width: 768px) { .section-name__container { padding: 0 28px; } }
</style>
```
