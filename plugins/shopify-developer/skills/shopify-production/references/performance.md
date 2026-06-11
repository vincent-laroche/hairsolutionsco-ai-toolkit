# Performance — Hair Solutions Co.

## Image Optimization (Required Pattern)

Always use `image_url` + `image_tag`. Never raw `<img src="...">`.

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

**Above-the-fold / LCP images** — use eager + high priority:
```liquid
{{
  section.settings.hero_image
  | image_url: width: 1920
  | image_tag:
    loading: 'eager',
    fetchpriority: 'high',
    widths: '750, 1100, 1500, 1920',
    sizes: '100vw'
}}
```

## JavaScript Loading

```liquid
{{- Defer non-critical scripts -}}
<script src="{{ 'my-script.js' | asset_url }}" defer></script>
```

Load heavy modules only when needed (intersection observer):
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      import('{{ "heavy-module.js" | asset_url }}');
      observer.unobserve(entry.target);
    }
  });
});
observer.observe(document.querySelector('.lazy-section'));
```

## CSS Loading

- Section-specific CSS belongs inside `<style>` tags in the section file — Shopify deduplicates
- Never use `@import` in CSS files — use the asset pipeline
- Avoid loading Swiper, heavy sliders, or other libraries on pages that don't use them

## Core Web Vitals Targets

| Metric | Target | How to achieve |
|--------|--------|----------------|
| LCP | < 2.5s | `loading: 'eager'` + `fetchpriority: 'high'` on hero |
| CLS | < 0.1 | Explicit width/height on images, avoid late-loading fonts |
| INP | < 200ms | Defer JS, avoid long tasks on main thread |

## Checking Performance

- **Shopify speed report:** Online Store → Themes → ... → Speed
- **GTmetrix:** gtmetrix.com — run on home, product page, collection page
- **PageSpeed Insights:** pagespeed.web.dev — use mobile score as primary
- **Targets:** Shopify speed score > 50, PageSpeed mobile > 60

## Common Mistakes to Avoid

- Forgetting `widths` attribute — causes mobile to load full-size images
- Loading EComposer's full JS bundle on native theme pages
- Adding `<link rel="stylesheet">` in section files (use `<style>` instead)
- Not deferring third-party scripts (chat widgets, analytics)
- Missing `sizes` attribute — browser can't pick the right `widths` entry without it
