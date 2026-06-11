---
name: shopify-front-end
description: "Use when designing, editing, reviewing, or debugging the customer-facing front end of hairsolutions.co, including Horizon 3.5.1 CSS, JavaScript, responsive layouts, product-page UI, theme-block presentation, accessibility, animations, Core Web Vitals, and mobile storefront experience"
---

# Shopify Front-end

## Overview

This is the storefront UI and interaction skill for Hair Solutions Co. Use it when the work is about how the Shopify store looks, feels, performs, or behaves in the browser.

The live theme baseline is Horizon 3.5.1. Design work must respect Horizon's theme-block architecture, the Shopify theme editor, and the business priority: protect conversion and customer trust before visual novelty.

## Hard Boundaries

- Do not publish storefront changes without explicit approval.
- Do not alter product, cart, checkout, payment, fulfillment, or customer data from this skill.
- Do not remove third-party app containers or scripts without approval.
- Do not replace established Hair Solutions typography or brand conventions casually.
- Do not make desktop-only UI.
- Do not use stale older-Horizon assumptions. Align to Horizon 3.5.1 and verify against current files.

## Storefront Priorities

1. Protect revenue.
2. Protect customer experience.
3. Reduce operational drag.
4. Preserve trust and safety.
5. Increase leverage over time.

Every front-end decision should support one of those goals. For Hair Solutions Co, customers are often evaluating trust, realism, fit, maintenance, privacy, and value. Avoid UI that feels clever but weakens buying confidence.

## When to Use

Use this skill for:

- CSS and JavaScript in Shopify theme files.
- Visual design of sections, blocks, product pages, collection pages, content pages, and support hub UI.
- Responsive layout and mobile fixes.
- Split showcase, hero, media/text, product-card, testimonial, trust, FAQ, and comparison UI.
- Theme-block presentation and scoped component styling.
- Animation and interaction behavior.
- Accessibility, focus states, keyboard behavior, contrast, and touch targets.
- Core Web Vitals issues caused by front-end code.
- Storefront QA before a preview or handoff.

Use `shopify-liquid` when the task is mainly Liquid structure, schema, dynamic sources, or metaobject rendering. Use `shopify-production` when the task is deployment, app safety, live theme operations, or performance rollout.

## Horizon 3.5.1 UI Notes

Horizon 3.5.1 includes fixes around translations and better Split showcase support on small screens. Treat narrow mobile layouts as a first-class risk area.

Horizon front-end work should assume:

- Sections may render nested theme blocks.
- Blocks can be dynamic or static.
- Component CSS may live in `{% stylesheet %}` tags for sections, blocks, and snippets where supported.
- Component JS may live in `{% javascript %}` tags where supported.
- Existing theme CSS variables and color schemes should be reused before inventing new tokens.
- App blocks may appear inside sections or theme blocks that allow `@app`.

## Hair Solutions Visual Baseline

| Area | Rule |
|------|------|
| Typography | Preserve existing Knockout heading/button conventions where present |
| Layout | Dense, trustworthy, premium, conversion-oriented |
| Mobile | Required, not an afterthought |
| Max width | Prefer existing theme/page width conventions; local HSC notes use 1400px frequently |
| Spacing | Use consistent scales; avoid random one-off spacing |
| Cards | Keep cards crisp and purposeful; do not over-card every page section |
| Imagery | Use real product, scalp, result, fit, or maintenance imagery when possible |
| Trust | Make guarantees, process, education, and support easy to scan |
| Accessibility | Focus states, contrast, labels, and tap targets are mandatory |

## CSS Architecture

Prefer local component CSS for section/block-specific styles:

```liquid
{% stylesheet %}
  .hs-fit-card {
    display: grid;
    gap: 0.75rem;
  }
{% endstylesheet %}
```

Use asset files when:

- The CSS is shared across many sections/blocks.
- It affects global layout, typography, header, cart drawer, or product form behavior.
- The current theme already has an established asset organization for that concern.

Avoid:

- Global selectors that accidentally affect app blocks.
- Styling generic elements like `button`, `h2`, or `.card` globally from a section.
- Duplicating large CSS blocks across multiple Liquid files.
- Introducing build tooling unless the project already uses it.

## Naming Pattern

Use Hair Solutions-prefixed classes for custom work:

```css
.hs-custom-section {}
.hs-custom-section__inner {}
.hs-custom-section__heading {}
.hs-custom-section__grid {}
.hs-custom-section__item {}
.hs-custom-section--compact {}
```

For support and content areas, existing prefixes may include:

- `support-hub-*`
- `kb_*`
- `blog-*`
- `hs-custom-*`

Match the current file's convention before adding a new one.

## Responsive Rules

Horizon 3.5.1 small-screen behavior matters. Always define mobile layout first or verify the current theme's breakpoint direction before editing.

Baseline requirements:

- No horizontal scroll at 320px, 375px, 390px, 430px.
- Primary CTAs remain visible and tappable.
- Tap targets are at least 44px by 44px.
- Text does not overlap media, badges, variant pickers, or sticky elements.
- Product-card and product-form controls stay readable.
- Split media/text layouts collapse predictably.
- Sticky headers, announcement bars, chat widgets, and app blocks do not cover core actions.

Responsive pattern:

```css
.hs-custom-grid {
  display: grid;
  gap: 1rem;
}

@media screen and (min-width: 750px) {
  .hs-custom-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (min-width: 990px) {
  .hs-custom-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
```

Use the breakpoints already present in the live theme when a nearby file establishes them.

## Theme Editor Compatibility

Front-end code must not make the theme editor unusable.

- Preserve section and block wrappers.
- Preserve `block.shopify_attributes`.
- Keep setting-driven classes stable.
- Avoid hiding editor-selected blocks in ways that make them impossible to select.
- Add visible empty states for editable components when practical.
- Keep app block containers unbroken.
- Avoid hardcoded content where merchant settings should be used.

## Color and Tokens

Use existing Horizon color schemes first:

```liquid
<section class="hs-custom-band color-{{ section.settings.color_scheme }}">
```

Use CSS custom properties for single tunable values:

```liquid
<div class="hs-custom-card" style="--hs-card-gap: {{ block.settings.gap }}px">
```

```css
.hs-custom-card {
  gap: var(--hs-card-gap, 1rem);
}
```

Use classes for multi-property variants:

```liquid
<div class="hs-custom-card hs-custom-card--{{ block.settings.style }}">
```

Avoid one-note palettes and generic luxury gradients. Hair Solutions needs clarity, trust, and product confidence more than decoration.

## Typography

- Preserve existing Knockout setup where present.
- Do not substitute fonts without a clear reason.
- Do not scale font size directly with viewport width.
- Use `clamp()` only when it has sane min/max values and has been checked on mobile.
- Keep body copy readable: usually 16px minimum and comfortable line-height.
- Keep headings proportional inside cards, sidebars, drawers, and compact panels.
- Do not let long product names, variant names, or benefit claims overflow their containers.

## Product Page UI

Product pages are revenue-sensitive.

Before editing:

- Identify product form markup.
- Identify variant picker logic.
- Identify price, availability, quantity, subscription/selling-plan, add-to-cart, dynamic checkout, and app blocks.
- Identify cart drawer or AJAX cart hooks.
- Check mobile sticky behavior.

Do not break:

- Variant selection.
- Add to cart.
- Selling plans.
- Price updates.
- Inventory/sold-out states.
- App reviews, subscriptions, bundles, or upsells.
- Dynamic checkout buttons.
- Accessibility labels and form input names.

Product UI should make these easy:

- Understand base/system choice.
- Compare color, density, size, and fit.
- Trust the result.
- Know maintenance expectations.
- Find help before abandoning.
- Buy on mobile without confusion.

## Product Cards and Collection UI

Product cards should be scannable and fast.

Include:

- Clear product image.
- Product title.
- Price and compare-at price if relevant.
- Key differentiator or badge only when useful.
- Responsive image sizes.
- No layout shift when badges or reviews load.

Avoid:

- Too many badges.
- Hover-only information.
- Text overlaying product image in a way that hurts inspection.
- Heavy animation on collection grids.
- JS-driven layout where CSS grid is enough.

## Images and Media

Use Shopify responsive image output.

```liquid
{{
  image
  | image_url: width: 1400
  | image_tag:
    widths: '375, 550, 750, 990, 1200, 1400',
    sizes: '(min-width: 990px) 50vw, 100vw',
    loading: 'lazy',
    alt: image.alt
}}
```

Rules:

- Do not lazy-load the likely LCP hero image.
- Reserve dimensions or use aspect-ratio to prevent CLS.
- Use real product/result/process imagery where possible.
- Avoid dark, blurred, or overly cropped images when users need to inspect hair systems.
- Support mobile crops explicitly when the section needs it.

## JavaScript Rules

Default to no JavaScript if CSS and Liquid can handle it.

When JS is needed:

- Scope it to the component.
- Avoid global listeners unless necessary.
- Support theme editor section load/unload events if the component appears in editable sections.
- Do not break browser back/forward behavior.
- Do not block rendering.
- Use event delegation where repeated blocks are rendered.
- Clean up timers, observers, and event listeners when sections unload.
- Respect reduced motion and keyboard users.

Theme-editor event pattern:

```javascript
document.addEventListener('shopify:section:load', (event) => {
  const section = event.target;
  // Initialize only inside this section.
});

document.addEventListener('shopify:section:unload', (event) => {
  const section = event.target;
  // Clean up observers/listeners created for this section.
});
```

## Accessibility

Required checks:

- Text contrast at least 4.5:1 for normal text and 3:1 for large text.
- Visible `:focus-visible` states.
- Buttons are real `<button>` elements when they perform actions.
- Links are real `<a>` elements when navigating.
- Inputs have labels.
- Accordions expose expanded/collapsed state.
- Modals trap focus and close with Escape.
- Motion respects `prefers-reduced-motion`.
- Touch targets are at least 44px.
- Content order makes sense without CSS.

Focus pattern:

```css
.hs-custom-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}
```

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .hs-animated,
  .hs-animated::before,
  .hs-animated::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance and Core Web Vitals

Front-end changes must protect LCP, INP, and CLS.

LCP:

- Prioritize hero image loading.
- Avoid heavy above-the-fold JS.
- Avoid render-blocking CSS beyond what is needed.
- Use responsive images and correct sizes.

INP:

- Keep interaction handlers small.
- Avoid synchronous layout thrashing.
- Debounce expensive input/search/filter behavior.
- Prefer CSS state where possible.

CLS:

- Reserve image/video dimensions.
- Avoid injecting banners above content after load.
- Keep font loading stable.
- Reserve space for reviews, badges, app widgets, and sticky bars.

## Split Showcase / Small Screens

Because Horizon 3.5.1 specifically improves Split showcase small-screen support, treat similar split layouts carefully.

Checklist:

- Media and copy stack cleanly below 750px.
- CTA remains below the relevant copy, not stranded above/between media.
- No fixed heights that crop important hair/product details.
- Image focal point works at narrow widths.
- Text blocks do not overlap media.
- App/editor controls remain selectable.

## QA Checklist

Before calling front-end work done:

- Checked desktop and mobile.
- Checked narrow mobile around 320-390px.
- No horizontal scroll.
- No text overlap.
- No broken product form controls.
- No app-block containers removed.
- No unexpected CLS from images/widgets.
- Focus states visible.
- Reduced motion supported if animation changed.
- Theme editor attributes preserved if blocks changed.
- Theme Check/build/local validation run when available.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Designing from a blank canvas | Read the nearby theme pattern first |
| Treating a Shopify section like a landing-page hero every time | Build the actual storefront workflow |
| Styling generic selectors globally | Scope to HSC component classes |
| Desktop-first with mobile patching | Make mobile a primary acceptance check |
| Animating product purchase controls | Keep revenue controls fast and predictable |
| Hiding editor blocks | Keep theme editor selectable |
| Ignoring app blocks | Preserve app insertion points and wrappers |
| Lazy-loading the LCP image | Eager-load likely hero/LCP media |
| Adding JS for CSS state | Prefer CSS when possible |

## Validation Commands

Use the project commands first. Common checks:

```bash
shopify theme check
shopify theme dev --store one-head-hair.myshopify.com
```

For visual QA, use browser screenshots or Playwright when available. Verify at least a mobile and desktop viewport when UI changed.

## Source Anchors

- Shopify theme architecture blocks: `https://shopify.dev/docs/storefronts/themes/architecture/blocks`
- Shopify theme blocks quick start: `https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/quick-start`
- Shopify static blocks: `https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/static-blocks`
- Horizon source: `https://github.com/Shopify/horizon`
- Horizon 3.5.1 release reference: `https://shopinfo.app/themes/horizon`
