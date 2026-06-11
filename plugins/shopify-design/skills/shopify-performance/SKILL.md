---
name: shopify-performance
description: "Optimize Shopify store speed — Core Web Vitals, image optimization, JavaScript reduction, CSS delivery, lazy loading, and Lighthouse score improvement. Use when improving page speed, fixing Core Web Vitals, reducing LCP, CLS, or FID, optimizing images, reducing JavaScript bundle, or auditing theme performance. Triggers: \"shopify speed\", \"page speed\", \"lighthouse score\", \"core web vitals\", \"LCP\", \"slow store\", \"performance optimization\"."
---

# Shopify Performance Optimization

Improve Shopify store speed scores (Lighthouse 90+) and Core Web Vitals (LCP < 2.5s, CLS < 0.1, FID < 100ms).

## Performance Audit Checklist

### Images
- [ ] All images served as WebP (Shopify CDN does this via `img_url`)
- [ ] Explicit width/height on all `<img>` tags (prevents CLS)
- [ ] Hero/above-fold images have `loading="eager"` and `fetchpriority="high"`
- [ ] Below-fold images have `loading="lazy"`
- [ ] Responsive images use `srcset` with multiple sizes
- [ ] No images larger than needed (1200px max for most uses)

### JavaScript
- [ ] All non-critical JS has `defer` or `async` attribute
- [ ] No render-blocking scripts in `<head>`
- [ ] Third-party apps audited — remove unused apps
- [ ] Unused JavaScript chunks not loaded on initial page
- [ ] Event listeners use passive: `{passive: true}` for scroll/touch

### CSS
- [ ] Critical CSS inlined in `<head>`
- [ ] Non-critical CSS loaded with `media="print"` trick or deferred
- [ ] Unused CSS removed (purge with PurgeCSS)
- [ ] No @import in CSS (causes extra network requests)

### Fonts
- [ ] Font preloaded: `<link rel="preload" as="font" crossorigin>`
- [ ] Font-display: swap (prevents invisible text)
- [ ] Maximum 2–3 font families
- [ ] System font stack as fallback

### Third-Party Scripts
- [ ] Google Analytics 4 via GTM (consolidates tag overhead)
- [ ] Meta Pixel loaded asynchronously
- [ ] Chat widgets loaded on user interaction, not page load
- [ ] Review apps (Judge.me, etc.) — check their impact score

## Critical Image Optimization

```liquid
{# Hero image — above fold, prioritized #}
<img
  src="{{ section.settings.image | img_url: '1200x' }}"
  srcset="{{ section.settings.image | img_url: '600x' }} 600w,
          {{ section.settings.image | img_url: '900x' }} 900w,
          {{ section.settings.image | img_url: '1200x' }} 1200w"
  sizes="100vw"
  alt="{{ section.settings.image.alt | escape }}"
  width="{{ section.settings.image.width }}"
  height="{{ section.settings.image.height }}"
  loading="eager"
  fetchpriority="high"
>

{# Product card images — below fold, lazy #}
<img
  src="{{ product.featured_image | img_url: '400x400', crop: 'center' }}"
  srcset="{{ product.featured_image | img_url: '200x200', crop: 'center' }} 200w,
          {{ product.featured_image | img_url: '400x400', crop: 'center' }} 400w"
  sizes="(max-width: 768px) 50vw, 25vw"
  alt="{{ product.featured_image.alt | escape }}"
  width="400"
  height="400"
  loading="lazy"
>
```

## JavaScript Deferral

```liquid
{# In theme.liquid — defer non-critical scripts #}
<script src="{{ 'theme.js' | asset_url }}" defer></script>

{# Load third-party on interaction #}
<script>
  document.addEventListener('click', function loadChat() {
    // Load chat widget JS here
    document.removeEventListener('click', loadChat);
  }, { once: true });
</script>
```

## Font Optimization

```liquid
{# In theme.liquid <head> #}
<link
  rel="preload"
  href="{{ settings.font_heading | font_url }}"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
>

{% assign font_heading = settings.font_heading | font_modify: 'weight', 'bold' %}
{% style %}
  {{ settings.font_heading | font_face: font_display: 'swap' }}
  {{ settings.font_body | font_face: font_display: 'swap' }}
  :root {
    --font-heading: {{ settings.font_heading.family }}, sans-serif;
    --font-body: {{ settings.font_body.family }}, sans-serif;
  }
{% endstyle %}
```

## Prevent Cumulative Layout Shift

```css
/* Reserve space for images */
.product-card__image {
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Prevent font flash */
@font-face {
  font-display: swap;
}
```

## App Impact Reduction

For each installed app:
1. Check its PageSpeed impact in Shopify Admin → Online Store → Themes → Speed
2. Test by disabling in a theme duplicate
3. If impact > 10 points — find alternative or load conditionally
4. Use GTM to consolidate tracking tags (GA4, Meta, TikTok pixels)

## Speed Test Workflow

1. Run PageSpeed Insights (pagespeed.web.dev) on key pages:
   - Home page
   - Product page (most visited)
   - Collection page
2. Record Mobile and Desktop scores
3. Fix issues in order: Images → JS → Fonts → CSS → Third-party
4. Re-test after each fix
5. Target: Mobile 70+, Desktop 90+
