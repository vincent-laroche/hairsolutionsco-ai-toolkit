---
description: Run a design + brand + SEO punch-list review on a theme file before shipping.
argument-hint: "<file path> (e.g. sections/hs-home-band.liquid)"
---

# /design-check

Review a `.liquid` section/template against the brand system, the architecture rules, and the SEO checklist. Run this before every `/ship` on a section change.

## Steps

1. **Read the target file** at `$ARGUMENTS` (resolve relative to `/Users/vMac/06_storefront` if not absolute). Read any stylesheet/asset it loads.

2. **Run `design:design-critique`** against the file for hierarchy, consistency, and usability feedback.

3. **Brand check** against the `hairsolutions-brand` skill:
   - Colors are OKLCH tokens, not inline hex; backgrounds only Off-white / Paper / Obsidian / Obsidian-soft.
   - Type pairing correct (Instrument Serif for Display/H1/H2, Geist H3↓ and UI, Geist Mono meta); no Instrument Serif under 24px.
   - One accent (Cream **or** Clay) per view, dark surfaces only; never mixed.
   - Spacing on the 4px scale; section spacing ≥128px desktop / halved <768px.
   - Geometry: near-square corners (2–8px), hairline rules, pills only for badges.
   - Walk the **Always / Never** list (§6) and flag every violation.

4. **Architecture check** against `shopify-os2-architecture`:
   - `presets` present; `{{ block.shopify_attributes }}` preserved; stable setting IDs.
   - `{% liquid %}` for multi-line logic; no `all_products`/`collections.all` in loops; loops >20 paginated; nullable objects guarded; `.value` for metafields; merchant text escaped.
   - Grid/Flexbox only; `clamp()`/`%`/`fr` containers; `text-wrap` balance/pretty; vanilla JS; `IntersectionObserver`; `defer`/`type="module"`.

5. **SEO check** against `seo-engagement-checklist` (where relevant): one `<h1>`, heading order, landmarks, descriptive links, image `loading`/`fetchpriority`/`width`/`height`/`alt`, JSON-LD for the page type, internal links, no urgency language.

6. **Mobile** — sanity-check 320 / 375 / 390 / 430px behavior and the spacing halving.

7. **Output a pass/fail punch list**, grouped Brand / Architecture / SEO / Mobile, most impactful first, each with the exact fix. End with an overall PASS or NEEDS-FIXES verdict. If NEEDS-FIXES, do not `/ship` until resolved.
