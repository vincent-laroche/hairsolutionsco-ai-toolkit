# Hair Solutions Co — Homepage Implementation Checklist

Reference for building and QA-ing the Horizon theme homepage at one-head-hair.myshopify.com.

## Brand Design Tokens

### Colors
| Token | Value | Use |
|-------|-------|-----|
| Primary (Navy) | `#1E2A5A` | Main brand color, headings, CTAs |
| Primary Alt | `#4C6FFF` | Hover states, links, secondary CTAs |
| Accent Gold | `#C7923E` | Highlights, badges, premium accents |
| Accent Teal | `#24A19C` | Success states, secondary accents |
| Background | `#FFFFFF` | Page background |
| Surface | `#F8F8F8` | Section backgrounds, cards |
| Text Primary | `#1A1A1A` | Body copy |
| Text Secondary | `#6B7280` | Subtext, captions |
| Text Muted | `#9CA3AF` | Labels, metadata |

### Typography (Inter / SF Pro)

| Style | Size | Line Height | Weight | Use |
|-------|------|-------------|--------|-----|
| Display | 48px | 56px | 700 | Hero headline |
| H1 | 40px | 48px | 700 | Page headings |
| H2 | 32px | 40px | 600 | Section headings |
| H3 | 24px | 32px | 600 | Card headings |
| Body L | 18px | 28px | 400 | Lead paragraphs |
| Body M | 16px | 24px | 400 | Standard body |
| Caption | 14px | 20px | 400 | Meta text, labels |

---

## Homepage Sections (in order)

| # | Section | Status | Notes |
|---|---------|--------|-------|
| 1 | Announcement Bar | — | Promo text, free shipping threshold |
| 2 | Hero | — | Full-bleed image/video, headline, CTA |
| 3 | USP Icons | — | 3-4 floating cards: Natural Look, 100% Human Hair, Free Shipping, etc. |
| 4 | Shop by Look | — | Collection links with model imagery |
| 5 | Collections Grid | — | HS1V, HS2V etc. series |
| 6 | Best Sellers | — | Product grid, 4-up |
| 7 | Before & After Slider | — | Hair system transformation |
| 8 | How It Works | — | 3-step process with floating cards |
| 9 | Hair System Types | — | Poly / Lace / Mono comparison |
| 10 | Testimonials | — | Floating cards, customer reviews |
| 11 | Model Gallery | — | Barry, Serge, Kevin, Salem, Danny, Declan, Kyle, Alex, Yago |
| 12 | Education Banner | — | Link to knowledge base |
| 13 | FAQ | — | Accordion, 6-8 questions |
| 14 | Blog Feed | — | Latest 3 articles |
| 15 | Trust Badges | — | Secure checkout, returns, support |
| 16 | Newsletter | — | Email capture with incentive |
| 17 | Footer | — | Navigation, social, legal |

---

## Asset Specifications

### Hero Images
- Desktop: 1920×1080px minimum, 16:9 ratio
- Mobile: 390×600px minimum, portrait-friendly
- Format: WebP preferred, JPG fallback
- File size: Under 500KB after optimization

### Product Images
- Square: 1:1 ratio, 1000×1000px minimum
- Clean white or light gray background
- Model shots: 2:3 ratio for collection grid

### Swatches / Icons
- Size: 48×48px rendered, 96×96px source (2x)
- Format: WebP or SVG

---

## Mobile Rules

- Minimum tap target: 44×44px
- Font size never below 14px
- Hero text visible without scrolling on 390px
- Navigation collapses to hamburger at 768px
- Product grid: 2 columns on mobile, 4 on desktop
- Floating cards: single column stack on mobile

---

## Pre-Publish Checklist

### Performance
- [ ] All images have `loading="lazy"` (below fold)
- [ ] Hero image preloaded (`loading="eager"`, `fetchpriority="high"`)
- [ ] No layout shift on load (image dimensions set)
- [ ] Core Web Vitals: LCP under 2.5s, CLS under 0.1

### SEO
- [ ] `<title>` tag set on homepage template
- [ ] Meta description populated
- [ ] `alt` text on all product and hero images
- [ ] Structured data / JSON-LD for organization

### Accessibility
- [ ] Color contrast passes 4.5:1 for body text
- [ ] Focus states visible on all interactive elements
- [ ] `aria-label` on icon-only buttons (hamburger, close, social icons)
- [ ] Heading hierarchy: one H1 per page, logical H2→H3 structure

### Cross-Browser
- [ ] Safari (latest)
- [ ] Chrome (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

### Shopify-Specific
- [ ] Section appears in Theme Editor with correct name
- [ ] All merchant-editable settings work
- [ ] No hardcoded text that should be editable
- [ ] Third-party app blocks (`@app`) accepted where relevant
