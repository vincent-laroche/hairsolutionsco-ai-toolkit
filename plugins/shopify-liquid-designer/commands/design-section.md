---
description: Design a new Shopify section with Liquid + UI/UX system
allowed-tools: "Read, Write, Edit, Bash(ls:*)"
argument-hint: "[section-name] [style?] [stack?]"
---

Design and generate a production-ready Shopify Liquid section file based on: $ARGUMENTS

Follow this workflow:

## Step 0: Design in Figma First

**Before writing any Liquid, establish the design in Figma.**

If the Figma MCP is connected:
- Use `get_design_context` to read the existing Figma frame for this section (ask the user for the node URL if needed)
- Extract exact colors, spacing, radius, and shadow values — do not guess or default
- Use `get_variable_defs` to pull Figma variable values and map them to CSS custom properties

If Figma MCP is not connected, create a Figma-ready design spec in the response:

### Figma Frame Specification

Produce a structured frame spec the user can build in Figma (or confirm if they already have it):

| Element | Figma Setup |
|---------|-------------|
| Frame name | `section/[name]` — Full Width at 1280px desktop, 390px mobile |
| Merchant-editable text | Annotate with `[setting: id]` — maps to schema `text` or `richtext` |
| Merchant-editable image | Placeholder with `[setting: image_picker]` annotation |
| Reusable blocks | Name `block/[name]` as Figma component — maps to schema block or `/blocks/` file |
| Spacing | Use 8px grid — multiples of 8, 16, 24, 32, 48, 64, 80px |
| Corner radius | 20px for cards, 8px for buttons and inputs |

### Floating Cards Decision

If the section uses cards (features, testimonials, pricing, stats):
- Apply the **floating cards** style — see `references/floating-cards.md`
- Light theme: white background + soft multi-layer shadow + `inset 0 1px 0 rgba(255,255,255,0.9)` top highlight
- Dark theme: `#141414` background + deep shadow + `inset 0 1px 0 rgba(255,255,255,0.05)` top highlight
- Hover: `translateY(-4px)` + elevated shadow + guard with `@media (prefers-reduced-motion: reduce)`

Ask the user to confirm the Figma design (or provide the Figma URL) before proceeding, **unless they explicitly ask to skip to code**.

---

## Step 1: Gather Requirements

If the user hasn't specified, ask (one message, grouped):
- What is the section's purpose? (hero, product grid, testimonials, FAQ, etc.)
- What visual style? (floating cards, glassmorphism, minimalism, bento grid, dark mode — default: floating cards)
- What tech stack for CSS? (Tailwind, vanilla CSS — default: Shopify's native CSS)
- Does it need blocks that merchants can configure in the theme editor?
- Any dynamic sources or metaobject connections?

## Step 2: Apply Design System (UI/UX Pro Max)

Before writing any code, select the design parameters:
- Choose a color palette appropriate to the section type (e-commerce → trust-building neutrals or brand accent)
- For Hair Solutions Co: warm golds, soft creams, deep browns — natural, professional
- Choose a font pairing (headings + body) — prefer web-safe or Google Fonts available via Shopify
- Define spacing scale (8px base grid)
- Define accessibility requirements: 4.5:1 contrast ratio, 44px touch targets, visible focus states
- Define responsive breakpoints: mobile-first, 768px tablet, 1024px desktop

## Step 3: Apply Liquid Architecture (Shopify Liquid Genius)

Structure the section correctly:
- Use `{% schema %}` block with proper settings, blocks, and presets
- Decide: theme blocks (reusable, `/blocks/` folder) vs section blocks (section-specific, in schema)
- Add `{% stylesheet %}` and `{% javascript %}` tags only if needed — prefer asset files for large code
- Apply dynamic sources if metaobjects or metafields are involved
- Respect third-party app file prefixes: never modify `ecom-*`, `ss-*`, `foxify-*` files

## Step 4: Generate the Files

Output the following files:

### Primary: `/sections/[section-name].liquid`
Complete section file including:
- Liquid logic with proper tag usage (`{%- -%}` for whitespace control)
- CSS within `{% stylesheet %}` OR reference to asset file
- Schema block with all merchant-configurable settings
- Responsive CSS (mobile-first)
- Accessibility attributes (aria-labels, alt text, role, tabindex where needed)
- Floating cards CSS if applicable (scoped to `#shopify-section-{{ section.id }}`)

### Optional: `/blocks/[block-name].liquid` (if theme blocks are needed)
Complete block file with its own `{% schema %}` and support for dynamic sources.

### Optional: Asset references
Note any `/assets/` files that should be created separately.

## Step 5: Quality Check

Before delivering, verify:
- [ ] Figma design confirmed or spec provided (Step 0 complete)
- [ ] Schema has a `name` and at least one preset
- [ ] All settings have `id`, `type`, `label`
- [ ] Color contrast meets 4.5:1 minimum
- [ ] Touch targets are 44px minimum
- [ ] Mobile-first CSS (smallest screen as default, larger screens in `@media`)
- [ ] No hardcoded strings — use `{{ section.settings.* }}`
- [ ] Liquid output is escaped where needed (`{{ variable | escape }}` for user input)
- [ ] Focus states defined for interactive elements
- [ ] `@media (prefers-reduced-motion: reduce)` guard on all animations/transitions

Deliver the code with a brief explanation of the design decisions and any merchant configuration instructions.
