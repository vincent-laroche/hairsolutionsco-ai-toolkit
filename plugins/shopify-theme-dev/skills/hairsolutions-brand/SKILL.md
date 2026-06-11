---
name: hairsolutions-brand
description: "Hair Solutions Co. (hairsolutions.co) brand & design system v3 — the source of truth for every visual, layout, copy, and asset decision. Use for ANY design, layout, copy, photography, or visual-asset task, and whenever creating or changing a .liquid section, block, or snippet. Keywords: brand, design system, OKLCH tokens, Instrument Serif, Geist, spacing, grid, hairline, accent, Cream, Clay, photography, always/never rules."
compatibility: Claude Code, Claude Desktop, Cursor
metadata:
  author: Vincent Laroche
  version: "1.0"
---

# Hair Solutions Co. — Brand & Design System (v3)

Single source of truth for the OneHead Hair Solutions storefront. The brand sells **high-end, non-surgical hair replacement systems for men and women.** Copy leads with the customer, then the product; it explains rather than pitches; it never claims medical effect, regrowth, or cure — *we make hair, not medicine.*

- **Voice:** Confident, plain-spoken, calm. Never pitying, never clinical, never hype.
- **Promise:** *Confidence, restored quietly.*
- **Direction:** editorial, minimal, high-end, educational, discreet.

Values below are extracted verbatim from `Design.md` and cross-checked against `styles/tokens.css` (v4, updated 2026-05-28). **`tokens.css` wins on any conflict.** A copy of both lives in `references/` of this plugin.

---

## 1 · Color — author in OKLCH, never hex

A muted, neutral-warm palette. Light surfaces lean cool-paper; ink/obsidian carry a barely-perceptible warm tilt so the page never feels clinical. **Clay is the only chromatic accent** — sparing, dark surfaces only, never body text. **Cream and Clay are never mixed in one view.**

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

  /* Semantic — status only, never decoration */
  --success:        oklch(0.62 0.10 155);
  --warning:        oklch(0.74 0.12 75);
  --danger:         oklch(0.58 0.16 28);
  --info:           oklch(0.58 0.07 240);

  --hairline: 1px solid var(--stone);
}
```

**Color rules**
- Allowed page/section backgrounds: **Off-white, Paper, Obsidian, Obsidian soft only.** No other colored backgrounds.
- Body text is always Ink / Ink-2 / Ink-3 — never Clay, never a semantic color.
- One accent (Cream **or** Clay) per view, on a dark surface only, on the single most important action.
- Separate with hairline rules (1px Stone), never heavy borders or boxes.
- No gradients, glows, shine, or skin-warming/tinting filters — anywhere.

> `tokens.css` also defines a warm-gold emphasis accent used in the Home system: `--home-accent: oklch(0.80 0.085 72)` (light surfaces) / `oklch(0.84 0.09 75)` (dark/media cards). See §6 emphasis auto-styling.

---

## 2 · Typography — Instrument Serif / Geist / Geist Mono

Two families. **Instrument Serif** carries display and editorial moments. **Geist** handles every functional UI surface. **Geist Mono** is reserved for metadata, codes, captions, labels.

```css
:root {
  --f-serif: "Instrument Serif", Georgia, serif;
  --f-sans:  "Geist", system-ui, -apple-system, sans-serif;
  --f-mono:  "Geist Mono", ui-monospace, monospace;
}
```

| Role | Family / weight | Size · line · tracking | Notes |
|------|-----------------|------------------------|-------|
| Display XL | Instrument Serif 400 | `clamp(56px,7vw,112px)` · 1.02 · -0.02em | Hero only |
| Display | Instrument Serif 400 | `clamp(40px,5vw,80px)` · 1.04 · -0.02em | Chapter opener |
| H1 | Instrument Serif 400 | 56 · 1.08 · -0.01em | One per page |
| H2 | Instrument Serif 400 | 40 · 1.10 · -0.01em | Section heading |
| H3 | Geist 500 | 24 · 1.30 · 0 | Sub-heading (sans takes over) |
| H4 / label | Geist 500 | 18 · 1.30 · 0 | |
| Body | Geist 400 | 16 · 1.55 · 0 | Default. Measure 60–72ch |
| Body large | Geist 400 | 18 · 1.60 · 0 | Lead paragraphs only — one per page |
| Small | Geist 400 | 14 · 1.50 · 0 | Captions, helper, table content |
| Eyebrow | Geist 500 ALL CAPS | 11 · 1.4 · 0.16em | Section kicker |
| Mono | Geist Mono 400 | 12 · 1.45 · 0 | SKU, counts, meta |

**Pairing rules**
- Serif owns Display, H1, H2, pull-quotes. Sans owns H3 downward + all UI (buttons, inputs, nav, badges).
- Mix one serif heading with sans body — never the reverse.
- Italic Instrument Serif is permitted for emphasis **inside serif headings only**.
- **Never** use Instrument Serif under 24px — it is a display face.
- Headings `text-wrap: balance`; paragraphs `text-wrap: pretty`. No two-line widows. Editorial measure 38–50ch; body 60–72ch.
- Load only the weights used: Serif 400; Geist 300/400/500/600/700 (use 400/500 by default); Mono 400/500. `font-display: swap`, preload the LCP heading.

### Home-system class conventions (from `hs-home-band.liquid` / `assets/hs-home.css`)
The live Home sections use a self-contained class layer that maps onto these tokens:

- `home-display` — heavy Geist display heading, `clamp(40px,11vw,78px)`. Toggled by the section's `title_style: "display"` setting (`--t-display` analog).
- `home-serif` — Instrument Serif section title, `clamp(30px,8vw,52px)`. The default `title_style: "serif"`.
- `home-display--light` / `home-serif--light` — same on dark/media tones (white text).
- `home-eyebrow` — Geist 500, 11px, 0.16em tracked, uppercase, Ink-3.
- `home-body`, `home-muted`, `home-num` (serif numerals for stat bands).

When building Home-family sections, mirror these classes rather than inventing new ones, so typography stays governed by the section JSON (see §6).

---

## 3 · Spacing & grid

4px base unit. 12-column grid, 24px gutters. Editorial brand: outer margins, wide gutters, and negative space matter more than tight packing. **Sections breathe at 128px minimum on desktop; halve all section spacing below 768px.**

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

## 4 · Geometry & components

Quiet by default; they lean on typography and the photograph beside them. **Corners near-square (2–8px). Shadows rare and soft. Pills reserved for badges and pagination — never primary buttons.**

Radii from `tokens.css` (`.dir-refined`, production direction):

```css
--r-card:       8px;    /* cards */
--r-btn:        4px;    /* buttons */
--r-image:      4px;    /* image wrappers */
--r-chip:       999px;  /* badges / chips ONLY */
--shadow-card:  0 1px 2px color-mix(in oklch, var(--ink) 4%, transparent);
--shadow-float: 0 24px 64px -28px color-mix(in oklch, var(--ink) 22%, transparent);
```

- **Buttons** — 48px height · 22px horizontal padding · 14px Geist 500 label · 4px radius. One primary per view; secondary/ghost for the rest. Cream/Clay button only for the single most important action on a dark hero (max one per section). Motion: 140ms color transition · 1px Y-press on active · no glow, no scale.
- **Inputs** — Default underlined: 1px Stone+ rule, 12px all-caps label above (0.04em tracked). Focus darkens rule to Ink — no glow, no fill change. Boxed variant for forms.
- **Cards** — 8px radius, hairline border, transparent fill on light surfaces. Elevation (soft 24px Y shadow) only for floating overlays — never static grid cards. `card-flush` runs image to the edge.
- **Badges** — 22px height · 10px horizontal · pill radius · 11px/0.06em uppercase. One badge per object; never stack two on a card.
- **Chips / filters** — Outline by default; selected = Ink fill, Paper label. Meta rows in Geist Mono, Ink-3 (counts, filter summaries, SKUs).

---

## 5 · Iconography & imagery — photography only

**Icons** — Thin-stroke, geometric, functional. 24px grid, 20px optical body, 1.5px stroke, rounded caps/joins, no mixed weights. **Never** filled/duotone glyphs, colored icons (except inside semantic badges), emoji, 3D/isometric/sketch, or flat-vector illustrations of people or hair. Pair with a label whenever possible.

**Imagery is photography — the only illustration the brand uses.** Four directions:
1. **Portraits** — natural light, eye-level, unposed. The hair is the subject, not the pose.
2. **Hands at work** — close, documentary. Tools, knots, lace held to the light.
3. **Materials** — macro studies of hair, lace, knots, bases. Always on Off-white or Obsidian, never colored backdrops.
4. **Spaces** — the studio, empty or near-empty. Quiet rooms, hairline mirrors.

Every photograph pairs with a quiet caption (Geist Mono, 12px, Ink-3). Standard aspect ratios: **4:5 portrait, 16:9 / 16:10 landscape, 1:1 square.** Direction (from `AGENTS.md`): *decisive, realistic, useful photography from Cloudinary* — editorial, minimal, high-end, discreet. All media flows through Cloudinary AssetLink (see the `cloudinary-assetlink` skill).

---

## 6 · The Always / Never list (verbatim — Design.md §6)

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

### Load-bearing: `<em>` / `<i>` → gold accent + italic auto-styling
The Home CSS auto-styles emphasis inside headings so **typography emphasis in section JSON needs zero CSS edits.** In `assets/hs-home.css`:

```css
.home{ --home-accent: oklch(0.80 0.085 72); }                 /* warm gold */
.home-card--dark, .home-card--media{ --home-accent: oklch(0.84 0.09 75); }
.home-serif em, .home-serif i,
.home-display em, .home-display i,
.home-cat__name em, .home-feature__title em, .home-step__title em,
.home-quote em, .home-faq summary em {
  font-family: var(--home-serif);
  font-style: italic;
  color: var(--home-accent);
}
.home-display em, .home-display i { font-weight:400; letter-spacing:-0.01em; }
```

So in a section setting you write the emphasis inline and the brand styling follows automatically. Real, live example (`templates/index.json` → `hero` → `hs-home-band` `title`):

```
"title": "Confidence <em>starts at the top</em>"
```

This renders "starts at the top" in italic Instrument Serif, warm gold. To change emphasis, edit only the `<em>`/`<i>` placement in the JSON — never add CSS. This respects the rule "Italic Instrument Serif for emphasis inside serif headings only."

---

## 7 · Theme implementation notes (Horizon / Liquid)

- Register tokens as **color schemes + CSS custom properties**, not inline hex. Prefer Horizon's `color_scheme` over ad-hoc color pickers.
- Load fonts once, `font-display: swap`, preload the LCP heading. Only the weights used.
- `text-wrap: balance` on H1/H2; `text-wrap: pretty` on RTE paragraphs.
- Layout with CSS Grid/Flexbox only; container widths via `clamp()`, `%`, `fr` — never hardcoded px.
- All imagery through Cloudinary AssetLink: `f_auto,q_auto,dpr_auto` + responsive widths; hero/LCP `fetchpriority="high"` `loading="eager"`, everything else `loading="lazy"`.
- Run `design:design-critique` against any new section before commit, and check it against §6.

*Brand system v3 · May 2026 · governs web, email, social, print.*
