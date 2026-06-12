# Design.md — Hair Solutions Co. Brand & Design System

> **Source of truth.** This file is the canonical brand reference for the OneHead Hair Solutions Shopify theme (`hairsolutions.co`). It is derived from *Hair Solutions Co. — Master Design System v3* (May 2026). Every page, section, block, image, and line of copy must conform to it. When the live theme and this document disagree, this document wins — flag the divergence and propose the fix.

---

## 0 · Brand essence

| Dimension | Definition |
|-----------|------------|
| Personality | Modern, minimal, high-end, editorial, educational. |
| Audience | Adults navigating alopecia or hair loss, choosing non-surgical hair replacement. |
| Voice | Confident, plain-spoken, calm. Never pitying, never clinical, never hype. |
| Aesthetic | Editorial. Generous whitespace. Restraint over decoration. |
| One-line promise | *Confidence, restored quietly.* |

The brand sells **high-end, non-surgical hair replacement systems for men and women**. Copy leads with the customer, then the product. It explains rather than pitches. It speaks about hair loss directly, using the words customers use. It never claims medical effect, regrowth, or cure — *we make hair, not medicine.*

---

## 1 · Color

A muted, neutral-warm palette. Light surfaces lean cool-paper; ink and obsidian carry a barely-perceptible warm tilt so the page never feels clinical. **Clay is the only chromatic accent** — used sparingly, on dark surfaces, never for body text. **Cream and Clay are never mixed in the same view.**

### Core tokens (OKLCH — author colors in OKLCH, not hex)

```css
:root {
  /* Light surfaces */
  --off-white:      oklch(0.955 0.002 250);  /* Canvas · page background */
  --paper:          oklch(0.99  0.002 250);  /* Card · elevated surface */
  --ink:            oklch(0.17  0.006 60);   /* Primary text · primary actions */
  --stone:          oklch(0.88  0.003 250);  /* Hairline · rule · divider */

  /* Dark surfaces */
  --obsidian:       oklch(0.14  0.004 60);   /* Dark canvas */
  --obsidian-soft:  oklch(0.19  0.005 60);   /* Dark card · elevated */
  --cream:          oklch(0.95  0.025 85);   /* Highlight · single CTA on dark */
  --clay:           oklch(0.72  0.06  55);   /* Accent · sparing, dark surfaces only */

  /* Neutrals derived from Ink (by lightness) */
  --ink-2:          oklch(0.34 0.006 60);    /* Secondary text */
  --ink-3:          oklch(0.52 0.005 60);    /* Tertiary · captions · meta */
  --ink-4:          oklch(0.70 0.004 60);    /* Disabled · faint label */
  --stone-strong:   oklch(0.78 0.003 250);   /* Input rule · stronger divider */
  --stone-soft:     oklch(0.93 0.003 250);   /* Inline code bg · faint fill */

  /* Semantic (use only for status, never decoration) */
  --success:        oklch(0.62 0.10 155);    /* Confirm · in stock */
  --warning:        oklch(0.74 0.12 75);     /* Backorder · caution */
  --danger:         oklch(0.58 0.16 28);     /* Error · destructive · sold out */
  --info:           oklch(0.58 0.07 240);    /* Notice · education */

  /* Primitives */
  --hairline: 1px solid var(--stone);
}
```

**Rules**
- Allowed page/section backgrounds: **Off-white, Paper, Obsidian, Obsidian soft only.** No other colored backgrounds.
- Body text is always Ink / Ink-2 / Ink-3. Never Clay, never a semantic color.
- One accent (Cream **or** Clay) per view, on a dark surface only, on the single most important action.
- Separate with hairline rules (1px Stone), never heavy borders or boxes.
- No gradients, glows, shine, or skin-warming/tinting filters — anywhere.

---

## 2 · Typography

Two families. **Instrument Serif** carries display and editorial moments (slow, considered, generous). **Geist** handles every functional UI surface. **Geist Mono** is reserved for metadata, codes, captions, and labels.

```css
:root {
  --f-serif: "Instrument Serif", Georgia, serif;
  --f-sans:  "Geist", system-ui, -apple-system, sans-serif;
  --f-mono:  "Geist Mono", ui-monospace, monospace;
}
```

### Type scale

| Role | Family / weight | Size · line · tracking | Notes |
|------|-----------------|------------------------|-------|
| Display XL | Instrument Serif 400 | `clamp(56px,7vw,112px)` · 1.02 · -0.02em | Hero only |
| Display | Instrument Serif 400 | `clamp(40px,5vw,80px)` · 1.04 · -0.02em | Chapter opener |
| H1 | Instrument Serif 400 | 56 · 1.08 · -0.01em | One per page |
| H2 | Instrument Serif 400 | 40 · 1.10 · -0.01em | Section heading |
| H3 | Geist 500 | 24 · 1.30 · 0 | Sub-heading (sans takes over here) |
| H4 / label | Geist 500 | 18 · 1.30 · 0 | |
| Body | Geist 400 | 16 · 1.55 · 0 | Default. Measure 60–72ch |
| Body large | Geist 400 | 18 · 1.60 · 0 | Lead paragraphs only — one per page |
| Small | Geist 400 | 14 · 1.50 · 0 | Captions, helper, table content |
| Eyebrow | Geist 500 ALL CAPS | 11 · 1.4 · 0.16em | Section kicker |
| Mono | Geist Mono 400 | 12 · 1.45 · 0 | SKU, counts, meta |

**Pairing rules**
- Serif owns Display, H1, H2, and pull-quotes. Sans owns H3 downward + all UI (buttons, inputs, nav, badges).
- Mix one serif heading with sans body — never the reverse.
- Italic Instrument Serif is permitted for emphasis **inside serif headings only**.
- **Never** use Instrument Serif under 24px. It is a display face.
- Headings: `text-wrap: balance`. Paragraphs: `text-wrap: pretty`. No two-line widows. Editorial measure 38–50ch; body measure 60–72ch.

---

## 3 · Spacing & grid

4px base unit. 12-column grid, 24px gutters. This is an editorial brand: outer margins, wide gutters, and negative space matter more than tight packing. **Sections breathe at 128px minimum on desktop; halve all section spacing below 768px.**

**Golden Rule Spacing Policy**:
Every section MUST have fixed, equal horizontal padding (`var(--home-pad)`) across the entire width of the screen, especially on mobile. Elements must never bleed to the edge of the viewport.
**Exceptions**: ONLY the Homepage Hero and the Footer are allowed to touch the left and right borders of the screen. All other sections (including cards, stats, grids, and text blocks) must be constrained by this Golden Rule padding.

```css
:root {
  --s-1: 4px;   --s-2: 8px;   --s-3: 12px;  --s-4: 16px;
  --s-5: 24px;  --s-6: 32px;  --s-7: 48px;  --s-8: 64px;
  --s-9: 96px;  --s-10: 128px; --s-11: 160px; --s-12: 192px;
  --grid-gutter: 24px;
  --container-max: 1440px;   /* editorial */
  --container-read: 680px;   /* reading / RTE, 60–72ch */
  --r-sm: 4px; --r-md: 8px;
}
```

| Token | Value | Use |
|-------|-------|-----|
| s-5 | 24px | Default card padding · grid gutter |
| s-7 | 48px | Block separation |
| s-9 | 96px | Sub-section break |
| s-10 | 128px | Section break (desktop minimum) |
| s-11 | 160px | Hero / cover |

**Breakpoints**

| BP | Range | Columns · pad |
|----|-------|---------------|
| XS | < 480 | 1 col · 16px |
| SM | 480–768 | 4 col · 20px |
| MD | 768–1080 | 8 col · 32px |
| LG | 1080–1440 | 12 col · 48px |
| XL | 1440+ | 12 col · 64px · 1440px max |

**Containers:** Editorial 1440px max centred · Reading 680px (60–72ch) · Full-bleed reserved for hero photography only.

---

## 4 · Components

Quiet by default. They lean on typography and the photograph beside them. **Corners near-square (2–8px). Shadows rare and soft. Pills reserved for badges and pagination — never primary buttons.**

**Buttons** — 48px height · 22px horizontal padding · 14px Geist 500 label · 4px radius. One primary per view; secondary/ghost for everything else. Cream/Clay button only for the single most important action on a dark hero (max one per section). Motion: 140ms color transition · 1px Y-press on active · no glow, no scale.

**Inputs** — Default underlined: 1px Stone+ rule, 12px all-caps label above (0.04em tracked). Focus darkens rule to Ink — no glow, no fill change. Boxed variant for forms.

**Cards** — 8px radius, hairline border, transparent fill on light surfaces. Elevation (soft 24px Y shadow) only for floating overlays — never for static grid cards. `card-flush` runs image to the edge.

**Badges** — 22px height · 10px horizontal · pill radius · 11px/0.06em uppercase. One badge per object; never stack two on a card. Variants: default, outline, cream, success, warning, danger.

**Chips / filters** — Outline by default; selected = Ink fill, Paper label, border collapses into fill. Meta rows in Geist Mono, Ink-3 (counts, filter summaries, SKUs).

---

## 5 · Iconography & imagery

**Icons** — Thin-stroke, geometric, functional. 24px grid, 20px optical body, 1.5px stroke, rounded caps/joins, no mixed weights. **Never** filled/duotone glyphs, colored icons (except inside semantic badges), emoji, 3D/isometric/sketch, or flat-vector illustrations of people or hair. Pair with a label whenever possible; an icon never carries brand meaning alone.

**Imagery is photography — the only illustration the brand uses.** Four directions:
1. **Portraits** — natural light, eye-level, unposed. The hair is the subject, not the pose.
2. **Hands at work** — close, documentary. Tools, knots, lace held to the light.
3. **Materials** — macro studies of hair, lace, knots, bases. Always on Off-white or Obsidian, never colored backdrops.
4. **Spaces** — the studio, empty or near-empty. Quiet rooms, hairline mirrors.

Every photograph pairs with a quiet caption (Geist Mono, 12px, Ink-3). Standard aspect ratios: 4:5 portrait, 16:9 / 16:10 landscape, 1:1 square.

---

## 6 · Brand rules — the short list

**Always**
- Lead with an editorial serif headline; let it breathe (short measure, generous margin).
- One accent (Cream or Clay) per view, dark surfaces only.
- Caption every photograph (Geist Mono, 12px, Ink-3).
- Section spacing ≥ 128px desktop; halve on mobile.
- Hairline rules (1px Stone) to separate.
- Copy that explains — audience first, product second, educational over salesy.
- Speak about hair loss plainly, in customers' words.
- Show real customers, stylists, materials; credit when permitted.
- Treat whitespace as content.

**Never**
- No gradients, glows, shine, or skin-tinting filters.
- No emoji on product surfaces (packaging, web, email body, paid social).
- No exclamation marks or "URGENT! sale" language in editorial copy.
- No before/after stagings that imply shame — show progression, not pity.
- No stock illustrations of people, hair strands, or follicles.
- No mixing Cream and Clay in one view.
- No Instrument Serif under 24px.
- No button radius over 8px (pills are for badges only).
- No colored backgrounds beyond Off-white, Paper, Obsidian, Obsidian soft.
- No claims of medical effect, regrowth, or cure.

---

## 7 · Theme implementation notes (Horizon / Liquid)

- Register all tokens above as **color schemes + CSS custom properties** in the theme, not inline hex. Prefer Horizon's `color_scheme` setting over ad-hoc color pickers.
- Load Instrument Serif, Geist, and Geist Mono once, `font-display: swap`, preloaded for the LCP heading. Do not request weights you don't use (Serif 400; Geist 400/500; Mono 400).
- Apply `text-wrap: balance` to H1/H2 and `text-wrap: pretty` to RTE paragraphs.
- Layout with CSS Grid/Flexbox only; container widths via `clamp()`, `%`, `fr` — never hardcoded px.
- All imagery flows through **Cloudinary AssetLink** (see CLAUDE.md §Media). Use `f_auto,q_auto,dpr_auto` + responsive widths; mark the hero/LCP image `fetchpriority="high"` `loading="eager"`, everything else `loading="lazy"`.
- Run the `design-critique` skill against any new section before commit, and check it against §6 here.

*Brand system v3 · May 2026 · governs web, email, social, print.*
