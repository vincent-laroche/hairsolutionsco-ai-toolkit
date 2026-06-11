---
name: seo-engagement-checklist
description: "The SEO + conversion mandate for every hairsolutions.co page and section — semantics, metadata, JSON-LD by page type, Core Web Vitals, internal linking, and engagement/trust within brand rules. Use when finishing any page or section, or for any explicit SEO request. Keywords: SEO, on-page, metadata, meta description, JSON-LD, structured data, schema, headings, h1, internal links, Core Web Vitals, LCP, CLS, INP, engagement, CTA, social proof."
compatibility: Claude Code, Claude Desktop, Cursor
metadata:
  author: Vincent Laroche
  version: "1.0"
---

# SEO & engagement checklist

Every page, section, and asset is built for search and conversion, not just looks. Run this before considering anything done.

## 1 · Semantics & headings
- Exactly **one `<h1>` per page** (on Home that's the hero band; every other band uses `<h2>`).
- Logical heading order, no skipped levels.
- Real landmarks: `header`, `main`, `nav`, `section`, `footer`.
- Descriptive link text — never "click here" / "read more" alone.
- Semantic, crawlable HTML; useful visible copy that matches search intent.

## 2 · Metadata
- A tuned `<title>` tag and `<meta name="description">` per page/template.
- Open Graph (`og:title`, `og:description`, `og:image`) + Twitter card tags for share surfaces.
- Canonical URL set; preserve existing canonical/metadata/internal links on edits.

## 3 · Structured data (JSON-LD) by page type
| Page type | Schema |
|-----------|--------|
| Product | `Product` + `Offer` + `AggregateRating` |
| Collection / product | `BreadcrumbList` |
| Contact / Help / FAQ | `FAQPage` — **only for visible, matching FAQ content** |
| Site-wide | `Organization` + `LocalBusiness` |
| Journal posts | `Article` |

Generate/validate with `searchfit-seo:schema-markup` (or `searchfit-seo:generate-schema`).

## 4 · Performance = SEO (Core Web Vitals)
Core Web Vitals are a ranking and engagement factor. Protect:
- **LCP** — hero/LCP image `fetchpriority="high"` `loading="eager"`, preload the LCP heading font.
- **CLS** — explicit `width`/`height` on media; no layout shift from late content.
- **INP** — defer non-critical JS (`defer` / `type="module"`); `IntersectionObserver` over scroll listeners.
- Cloudinary `f_auto,q_auto,dpr_auto` + responsive `srcset` is part of this (see `cloudinary-assetlink`).
- Use Chrome DevTools MCP for live-storefront perf traces and correlate findings to the responsible `.liquid` file.

## 5 · Internal linking
Connect related products, collections, and journal articles — no orphan pages. Use `searchfit-seo:internal-linking`. Live examples on the homepage hero: `/collections/mens-hair-systems` and `/blogs/hair-systems-knowledge`.

## 6 · Engagement & trust (within brand rules)
- Every key page needs a **clear primary action** — consultation booking or shop.
- **Social proof** — real testimonials; before/after shown as **progression, not pity** (Design.md "Never" rule).
- **Trust signals** answering real customer questions: realism, fit, attachment, lifespan, maintenance, privacy, shipping, returns, support.
- **No hype, no urgency language** — no exclamation marks, no "URGENT! sale", no countdowns (brand rule). No claims of medical effect, regrowth, or cure.

## 7 · Run the SearchFit tools
- `searchfit-seo:on-page-seo` — optimize a specific page.
- `searchfit-seo:seo-audit` — full audit before a page is "done".
- `searchfit-seo:schema-markup` / `searchfit-seo:generate-schema` — JSON-LD.
- `searchfit-seo:internal-linking` — link structure, orphan pages.
- `searchfit-seo:technical-seo` — crawlability, sitemap, CWV.

> The `/design-check` command and the `seo-auditor` agent in this plugin run the relevant subset for a given file/page and emit a prioritized punch list.
