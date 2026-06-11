---
description: Review Liquid code for UX, performance, and best practices
allowed-tools: Read, Grep, Edit
argument-hint: [file-path or paste code]
---

Review the following Shopify Liquid code for quality, performance, UX, and best practices: $ARGUMENTS

If a file path was provided, read it with the Read tool. If code was pasted inline, work from that.

## Review Framework

Evaluate across five dimensions and produce a scored report:

---

### 1. Liquid Correctness & Architecture (0–25 pts)

Check:
- [ ] Proper tag usage: `{% %}` for logic, `{{ }}` for output, `{%- -%}` for whitespace control
- [ ] No deprecated Liquid tags (`include` → use `render`, `layout` → avoid)
- [ ] `render` tags don't pass variables from parent scope (by design — verify isolation is intentional)
- [ ] Schema is valid: all settings have `id`, `type`, `label`; all blocks have `type`, `name`
- [ ] Presets defined so section appears in theme editor
- [ ] Theme blocks vs section blocks used correctly (reusable vs section-specific)
- [ ] Dynamic sources/metaobjects referenced correctly if used
- [ ] No modification of third-party app files (`ecom-*`, `ss-*`, `foxify-*`)

Deduct points for each issue. Flag CRITICAL (schema breaks merchant editing) vs MINOR (style issues).

---

### 2. Performance (0–25 pts)

Check:
- [ ] Images use `| image_url` filter with width parameter and `loading="lazy"` for below-fold images
- [ ] No N+1 loops (paginating within loops, nested collection requests)
- [ ] `{% liquid %}` tag used for multi-line logic instead of stacked `{% %}` tags
- [ ] JavaScript only loaded when section is present (`{% if section.id %}`)
- [ ] CSS scoped to section ID (`#shopify-section-{{ section.id }}`)
- [ ] No inline `<style>` in loops (moved to `{% stylesheet %}`)
- [ ] Metafields accessed via `product.metafields.namespace.key` not API calls

---

### 3. UI/UX Quality (0–25 pts)

Apply UI/UX Pro Max guidelines:
- [ ] Color contrast: verify text/background combinations (flag if hardcoded colors don't meet 4.5:1)
- [ ] Touch targets: interactive elements should be minimum 44×44px
- [ ] Focus states: `a`, `button`, `input` need `:focus-visible` styles
- [ ] Loading states: buttons that trigger async operations should have disabled/loading state
- [ ] Error feedback: forms should show validation errors near the field
- [ ] Responsive: mobile-first CSS, no fixed-pixel layouts that break on small screens
- [ ] Typography: body text minimum 16px, line-height 1.5–1.75
- [ ] Whitespace: consistent spacing rhythm (multiples of 8px)
- [ ] Motion: check for `prefers-reduced-motion` if animations present
- [ ] Accessibility: `alt` text on images, `aria-label` on icon-only buttons, correct heading hierarchy

---

### 4. Merchant Experience (0–15 pts)

Check how well merchants can configure the section:
- [ ] Setting labels are human-friendly (not `show_product_vendor` → `"Show product vendor"`)
- [ ] Settings have helpful `info` fields for non-obvious options
- [ ] Color settings use `type: color` not `type: text`
- [ ] Image settings use `type: image_picker`
- [ ] Sensible defaults set for all settings
- [ ] Block limits are reasonable (`max_blocks` set appropriately)
- [ ] Section has a clear `name` shown in the theme editor

---

### 5. Security & Reliability (0–10 pts)

Check:
- [ ] User-generated content escaped: `{{ variable | escape }}` or `| strip_html`
- [ ] URLs use `| url_encode` where needed
- [ ] No hardcoded domain references (use `{{ shop.url }}`)
- [ ] Conditional rendering guards against missing objects (check `if product`, `if block.settings.image != blank`)
- [ ] No sensitive data exposed in Liquid output (metafields with private namespace)

---

## Report Format

Deliver a structured review with:

**Score: XX/100**

For each dimension:
- **Score**: X/25
- **Issues found**: bulleted list with severity (CRITICAL / HIGH / MEDIUM / LOW)
- **Code suggestions**: show specific before/after for each issue

**Priority fix list** (top 3 most impactful changes)

**Positive notes** (what is done well — always include at least 2)

If there are CRITICAL issues (schema breaks, merchant editor breaks, security holes), flag them clearly at the top before the detailed breakdown.