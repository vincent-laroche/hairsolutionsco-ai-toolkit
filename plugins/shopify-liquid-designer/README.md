# Shopify Liquid Designer Plugin

Design-first Shopify theme development for Hair Solutions Co. Combines Figma design workflow, Horizon theme mastery, Liquid architecture, Storefront API patterns, and Hair Solutions Co. design system into one unified toolkit.

**Version**: 0.3.0 | **Store**: one-head-hair.myshopify.com | **Theme**: Horizon 3.1.0

---

## Skills

### `shopify-liquid-designer`
Unified design-dev intelligence. Triggers on design, styling, UI, layout, or section requests. Combines Figma-first workflow with Liquid architecture. Start here for most tasks.

### `shopify-liquid-genius`
Deep Liquid architecture mastery — blocks system, dynamic sources, schema design, `closest` pattern, whitespace control, and common gotchas. Triggers on Liquid-specific questions.

### `shopify-horizon`
Horizon theme-specific knowledge — theme blocks, 8-level nesting, metafields/metaobjects, responsive patterns, section schemas. Triggers on Horizon-specific tasks.

### `shopify-expert`
Storefront API + Framer integration — GraphQL queries, cart mutations, custom product options, line item properties. Triggers on API, headless, or Framer tasks.

---

## Commands

### `/design-section`
Generate a production-ready Shopify Liquid section. Begins with Figma design confirmation, applies Hair Solutions Co. design system (floating cards, brand colors), then outputs complete section file with schema.

**Usage**: `/design-section testimonials floating-cards`

### `/design-theme`
Plan a complete theme design system and architecture. Outputs Figma variable setup, CSS custom properties, section inventory, and implementation order.

**Usage**: `/design-theme hair systems e-commerce premium`

### `/review-liquid`
Score Liquid code across 5 dimensions (Liquid correctness, Performance, UI/UX, Merchant Experience, Security). Returns scored report with specific fixes.

**Usage**: `/review-liquid sections/hero.liquid`

### `/deploy-theme`
Guide for pushing theme changes to the live store. Covers ZIP upload, Shopify CLI, and manual methods with pre-deploy checklist.

**Usage**: `/deploy-theme cli`

---

## References

| File | Contents |
|------|----------|
| `references/floating-cards.md` | Hair Solutions Co. floating card CSS patterns (light + dark) |
| `references/liquid-patterns.md` | Reusable Liquid code patterns |
| `references/storefront-api.md` | Storefront API reference |
| `references/homepage-checklist.md` | Homepage section inventory, brand tokens, mobile rules |
| `references/theme-workflow.md` | Pull/push workflow, store details, common tasks |

---

## Hair Solutions Co. Design System

**Brand Colors**: `#1E2A5A` (navy), `#4C6FFF` (blue), `#C7923E` (gold), `#24A19C` (teal)
**Typography**: Inter / SF Pro — Display 48px → Caption 14px
**Card Style**: Floating cards — multi-layer box-shadow, `border-radius: 20px`, `translateY(-4px)` hover
**Spacing**: 8px base grid
**Breakpoints**: 390px mobile → 768px tablet → 1280px desktop

