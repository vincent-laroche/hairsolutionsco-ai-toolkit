---
description: Plan a full Shopify theme with design system applied
allowed-tools: Read, Write, Edit
argument-hint: [store-type] [style?]
---

Create a complete Shopify theme design system and architecture plan for: $ARGUMENTS

## Step 1: Discover the Store

If not provided, ask:
- What type of store is this? (fashion, beauty, home goods, food, SaaS tools, etc.)
- Who is the target customer? (age, aesthetic preference, price sensitivity)
- What is the brand personality? (luxurious, playful, minimal, bold, earthy, techy)
- Do they have existing brand colors? If yes, provide hex codes.
- What Shopify theme is this built on or starting from? (Dawn, Horizon, custom)
- Will this use the Storefront API for a headless front-end (Framer, custom) or standard Liquid?

## Step 2: Figma Design System Setup

**Before defining any CSS tokens, establish the design system in Figma.**

If the Figma MCP is connected:
- Use `get_variable_defs` to check if a Figma variable library already exists for this store
- Extract existing color tokens, spacing tokens, and typography settings
- Map Figma variable names to Shopify CSS custom property names (see naming table below)

If no Figma file exists yet, produce a **Figma Variable Setup Guide** as part of the output:

### Figma Variable → Shopify CSS Custom Property Mapping

| Figma Variable Collection | Figma Variable | CSS Custom Property |
|--------------------------|----------------|---------------------|
| `Colors` | `color/primary` | `--color-primary` |
| `Colors` | `color/secondary` | `--color-secondary` |
| `Colors` | `color/background` | `--color-background` |
| `Colors` | `color/text` | `--color-text` |
| `Colors` | `color/surface` | `--color-surface` |
| `Cards` | `card/background` | `--card-bg` |
| `Cards` | `card/border` | `--card-border` |
| `Cards` | `card/radius` | `--card-radius` |
| `Cards` | `card/padding` | `--card-padding` |
| `Typography` | `font/heading` | `--font-heading` |
| `Typography` | `font/body` | `--font-body` |
| `Spacing` | `spacing/unit` | `--spacing-unit` (= 8px) |

### Floating Cards Default (Hair Solutions Co)

All card-based sections use the floating cards pattern. Add these to the Figma variables:

**Light theme:**
- `card/background` = `#FFFFFF`
- `card/border` = `rgba(0,0,0,6%)`
- Drop Shadow effect: Y 10, Blur 24, Color `#000` at 8%
- Inner Shadow effect: Y 1, Blur 0, Color `#fff` at 90% (top edge highlight)

**Dark theme:**
- `card/background` = `#141414`
- `card/border` = `rgba(255,255,255,7%)`
- Drop Shadow effect: Y 10, Blur 24, Color `#000` at 50%
- Inner Shadow effect: Y 1, Blur 0, Color `#fff` at 5%

## Step 3: Build the Design System

Using UI/UX intelligence, define:

### Color Palette
- Primary brand color + 50/100/200...900 shade scale
- Secondary accent color
- Neutral grays (surface, border, text hierarchy)
- Semantic: success (#10B981), warning (#F59E0B), error (#EF4444)
- Ensure all text/background combos pass 4.5:1 contrast
- For hair care: warm golds, soft creams, deep browns — natural, professional

### Typography
- Heading font (H1–H4): size scale, weight, line-height
- Body font: size, weight, line-height (1.5–1.75)
- Monospace (if needed for code/SKUs)
- Max line length: 65–75 characters for body text

### Spacing & Layout
- Base unit: 8px
- Container max-width: 1280px (or 1440px for wide stores)
- Section padding: 80px desktop / 48px mobile
- Component gap rhythm

### Motion & Interaction
- Micro-interaction duration: 150–300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1) for standard, ease-out for entrances
- Respect prefers-reduced-motion (floating card hover lift is guarded by this)

## Step 4: Define Theme Architecture (Liquid Genius)

Produce a structured plan:

### Core Sections to Build
List recommended sections with purpose, block types, and merchant configurability:
- Hero / Banner
- Featured Collection / Product Grid
- Announcement Bar
- Header (with mega-menu if needed)
- Footer
- Features / Benefits grid ← floating cards
- Testimonials ← floating cards
- Pricing plans ← floating cards (featured card gets accent color)
- Stats / metrics row ← floating cards (dark variant creates impact)
- [Store-type specific: e.g., Before/After for beauty, Size Guide for fashion]

### Block Strategy
For each section, specify:
- Which blocks go in `/blocks/` (reusable) vs inline schema blocks
- Nesting strategy (max 8 levels, recommend max 3 for maintainability)
- Dynamic sources / metaobject connections
- Figma component name that maps to each block

### Config Files
- `config/settings_schema.json` — global color scheme, typography, spacing settings, card style options
- `config/settings_data.json` — default values

## Step 5: Storefront API Layer (if headless)

If the store will use a headless front-end:
- Define the GraphQL queries needed for each page type (PDP, PLP, cart, search)
- Specify which data to expose vs keep server-side
- Outline the cart mutation flow (add, update, remove line items)
- Note metafields needed at product / variant / collection level

## Step 6: Deliver the Plan

Output a structured Theme Design Brief document with:
1. Figma variable setup guide (token names, values, effect settings)
2. Design system variables (formatted as Shopify CSS custom properties)
3. Section inventory table (name, file, blocks, priority, floating cards: yes/no)
4. Block registry (which blocks exist in `/blocks/`, what they accept)
5. Implementation order (which sections to build first)
6. Merchant UX notes (what merchants can configure vs what is code-level)

Format as a markdown document the team can use as a reference during development.