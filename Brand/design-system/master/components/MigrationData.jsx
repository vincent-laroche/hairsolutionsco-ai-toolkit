// MigrationData.jsx
// The actual inventory + migration plan. Lives separately so the Email System
// page can reference it and the master canvas can pull a summary.

const INVENTORY = [
  // ─── Modules under blocks/ ────────────────────────────────────────────
  { group: "blocks/", name: "hsc_email_header",                role: "Header — centered logo + optional 3-link nav row.", status: "keep", action: "Restyle: drop bottom border to 1px var(--border) hairline; pad to 32 28 24; logo 168px; nav links 11/700 0.08em; canonical fonts var(--f-sans).", v2name: "blocks/hsc_email_header" },
  { group: "blocks/", name: "hsc_email_footer",                role: "Footer — name, address, social, unsubscribe + privacy.", status: "keep", action: "Add 1px top hairline; tighten copy stack to 11/1.6; brand-mark optional above company name; pad 32 24 28.", v2name: "blocks/hsc_email_footer" },
  { group: "blocks/", name: "hsc_cta_button",                  role: "Stand-alone CTA button block (primary / inverted / outline).", status: "keep", action: "Lock radius 10px (was 12), padding 14×24, height 44, font 13/700 0.02em uppercase. Add 'ghost' variant matching web kit.", v2name: "blocks/hsc_cta_button" },
  { group: "blocks/", name: "hsc_customer_snapshot",           role: "Light snapshot card (orders/first-order/last-system) with rich-text message.", status: "merge", action: "Merge into hsc_customer_snapshot_block as the 'lite' context (third option). Keep the same field names so existing emails do not break.", v2name: "blocks/hsc_customer_snapshot_block · context=lite" },
  { group: "blocks/", name: "hsc_customer_snapshot_block",     role: "Multi-context snapshot (annual_recap / renewal_snapshot) with milestone callout, stats row, savings nudge.", status: "keep", action: "Replace #CCFF00 (lime) on stats + milestone with --clay (oklch 0.72 0.06 55) used sparingly; convert dark-callout to obsidian #1a1a18; card radius 14, stat tiles radius 10; add 'lite' context absorbing hsc_customer_snapshot.", v2name: "blocks/hsc_customer_snapshot_block" },
  { group: "blocks/", name: "hsc_goal_based_recommendation",   role: "Conditional rich-text by primary goal (realism/durability/easy_cleanup/fallback).", status: "merge", action: "Merge with hsc_goal_based_recommendation_block — keep one module, retain the richer block's fields.", v2name: "blocks/hsc_goal_based_recommendation" },
  { group: "blocks/", name: "hsc_goal_based_recommendation_block", role: "Same logic as above, more inputs.", status: "merge", action: "Becomes the surviving file; rename to hsc_goal_based_recommendation, deprecate the suffix.", v2name: "blocks/hsc_goal_based_recommendation" },
  { group: "blocks/", name: "hsc_lifespan_next_step",          role: "Lifespan messaging by base type (skin/lace/mono) + CTA.", status: "merge", action: "Merge into hsc_lifespan_next_step_block (richer of the two). Standardize CTA radius 10, padding 14×24.", v2name: "blocks/hsc_lifespan_next_step" },
  { group: "blocks/", name: "hsc_lifespan_next_step_block",    role: "Richer variant.", status: "merge", action: "Becomes surviving file, drop _block suffix.", v2name: "blocks/hsc_lifespan_next_step" },
  { group: "blocks/", name: "hsc_order_summary_block",         role: "Order spec table — order id, base, density, hair type, ETA/tracking.", status: "keep", action: "Card radius 14 (was 24); inner table radius 8; shrink type to 12/700 label · 12/400 value; add muted ink colors via hex tokens.", v2name: "blocks/hsc_order_summary" },
  { group: "blocks/", name: "hsc_testimonial_block",           role: "1–3 quotes with left rule + name.", status: "keep", action: "Use 2px ink rule (was 3); italic body 16/1.6; name 11/700 0.08em uppercase var(--ink-muted); container radius 14.", v2name: "blocks/hsc_testimonial" },
  { group: "blocks/", name: "hsc_base_type_guidance",          role: "Conditional rich-text by base type.", status: "merge", action: "Merge with hsc_base_type_guidance_block.", v2name: "blocks/hsc_base_type_guidance" },
  { group: "blocks/", name: "hsc_base_type_guidance_block",    role: "Richer variant.", status: "merge", action: "Becomes surviving file.", v2name: "blocks/hsc_base_type_guidance" },

  // ─── Sections (DnD layout pieces) ────────────────────────────────────
  { group: "sections/", name: "headers/brand-header",          role: "Identical to hsc_email_header — duplicate.", status: "merge", action: "Delete; replace usages in templates with blocks/hsc_email_header.", v2name: "blocks/hsc_email_header" },
  { group: "sections/", name: "footers/sec-prefooter-signal",  role: "Pre-footer with optional image + IG/FB/Web links + note.", status: "keep", action: "Tighten note copy; add brand-mark fallback; align radii + colors.", v2name: "sections/footers/sec_prefooter_signal" },
  { group: "sections/", name: "hero/sec-hero-image",           role: "Single full-bleed image with link.", status: "keep", action: "Add optional eyebrow + headline overlay variant. Lock width 600px image, 14px radius optional.", v2name: "sections/hero/sec_hero_image" },
  { group: "sections/", name: "grid/sec-product-grid",         role: "2×2 product card grid (4 items: image + title + blurb).", status: "keep", action: "Round images 12; title 13/700; blurb 13/1.6; add per-card link arrow row 'Shop →'.", v2name: "sections/grid/sec_product_grid" },
  { group: "sections/", name: "grid/sec-dense-promo",          role: "2-up image + body + CTA cards.", status: "keep", action: "Standardize CTA radius 10, padding 12×20, font 12/700 0.04em uppercase.", v2name: "sections/grid/sec_dense_promo" },
  { group: "sections/", name: "split/sec-split-copy-image-6-6",      role: "50/50 copy + image.", status: "keep", action: "Bump padding to 28 32; add eyebrow + h3 fields above body for editorial use.", v2name: "sections/split/sec_split_copy_image" },
  { group: "sections/", name: "split/sec-split-image-copy-6-6",      role: "Mirrored 50/50.", status: "merge", action: "Collapse into sec_split_copy_image with media_side select (left|right) — matches web kit naming.", v2name: "sections/split/sec_split_copy_image · media_side=left" },
  { group: "sections/", name: "split/sec-split-copy-dual-cta-7-5",   role: "Copy 7-col + dual-CTA 5-col.", status: "keep", action: "Use ghost button + primary button. Add eyebrow field.", v2name: "sections/split/sec_split_copy_dual_cta" },
  { group: "sections/", name: "split/sec-split-media-cta",           role: "Media + CTA panel.", status: "keep", action: "Keep, align CTA tokens.", v2name: "sections/split/sec_split_media_cta" },
  { group: "sections/", name: "split/sec-split-two-images-6-6",      role: "Two side-by-side images.", status: "keep", action: "Add gap field (12/16/24); 14px radius; alt enforced.", v2name: "sections/split/sec_split_two_images" },
  { group: "sections/", name: "split/sec-story",                     role: "Editorial story card (image + headline + read more).", status: "keep", action: "Add eyebrow + 'min read' meta; ghost-style CTA.", v2name: "sections/split/sec_story" },
  { group: "sections/", name: "social/sec-image-social",             role: "Image + IG/FB/Web links — stacked or 50/50.", status: "keep", action: "Standardize colors to var(--ink-muted); add 'links-only' variant for emails that already have a hero.", v2name: "sections/social/sec_image_social" },
  { group: "sections/", name: "text/sec-intro-richtext",             role: "Single richtext paragraph block.", status: "keep", action: "Rename rich_text default font-size to 15, line-height 1.65; add max-width 64ch.", v2name: "sections/text/sec_intro_richtext" },
  { group: "sections/", name: "text/sec-spacer",                     role: "Vertical spacer.", status: "keep", action: "Lock heights to 16/24/32/48/64 token scale.", v2name: "sections/text/sec_spacer" },
];

// ─── Migration phases ─────────────────────────────────────────────────────
const PHASES = [
  {
    phase: "Phase 0",
    title: "Freeze + branch",
    eta: "0.5 day",
    rule: "Rule of safety",
    steps: [
      "Tag the production HubSpot design manager state v1.9-pre-migration.",
      "Branch the production folder to /pipeline/blocks_v2 and /pipeline/sections_v2 — leave v1 live until cutover.",
      "Pause all in-flight email campaigns at the workflow level (do not ship a half-migrated file).",
      "Lock the v1 modules with isAvailableForNewContent: false (already done in most files — verify all).",
    ],
  },
  {
    phase: "Phase 1",
    title: "Token alignment",
    eta: "1 day",
    rule: "One source of truth",
    steps: [
      "Create blocks_v2/_tokens.html — a Jinja partial exporting hex equivalents of the design tokens (ink #1a1a18, ink-muted #6f6c66, paper #fdfdfb, sand #f4f3ef, obsidian #1f1d1a, clay #b78657).",
      "Replace hard-coded hex in every module with {% set ink = '#1a1a18' %}-style locals at the top, sourced from _tokens.",
      "Replace #CCFF00 (lime) wherever it appears (only in hsc_customer_snapshot_block) with --clay used at 100% on dark, 40% tint on light.",
      "Standardize border-radius: card 14, image 12, button 10, table 8, chip 999.",
      "Standardize button: padding 14×24, font 13/700 0.02em uppercase, height ≥44.",
    ],
  },
  {
    phase: "Phase 2",
    title: "Collapse the _block duplicates",
    eta: "1 day",
    rule: "No two modules with the same job",
    steps: [
      "hsc_customer_snapshot → fold into hsc_customer_snapshot_block as context=lite. Delete the standalone module after templates re-pointed.",
      "hsc_goal_based_recommendation_block → keep, rename to hsc_goal_based_recommendation, delete the older twin.",
      "hsc_lifespan_next_step_block → keep, rename to hsc_lifespan_next_step, delete the older twin.",
      "hsc_base_type_guidance_block → keep, rename to hsc_base_type_guidance, delete the older twin.",
      "headers/brand-header → delete (duplicate of blocks/hsc_email_header). Re-point templates.",
      "split/sec-split-image-copy-6-6 → fold into sec-split-copy-image-6-6 with media_side select.",
    ],
  },
  {
    phase: "Phase 3",
    title: "Rename + reorganize",
    eta: "0.5 day",
    rule: "Snake_case, semantic groups",
    steps: [
      "Drop _block suffix from every block (Phase 2 already handles the merged ones — apply to the rest).",
      "Move sections to /sections/ with subgroups: hero, split, grid, social, text, footers — already mostly the case. Normalize to underscores: sec_hero_image, sec_split_copy_image, etc.",
      "Update meta.json labels to Title Case ('Email Header', 'Customer Snapshot', 'Product Grid · 2×2').",
      "Add a meta.json description to every module pointing at the design system page anchor.",
    ],
  },
  {
    phase: "Phase 4",
    title: "Restyle each module to v2 spec",
    eta: "2 days",
    rule: "Spec → file, file → spec",
    steps: [
      "Apply the per-module 'action' from the inventory above. One module per commit.",
      "Add a 6-line header comment to every module: name, role, used in (template ids), inputs, fields, last reviewed.",
      "Audit every module against the email design rules (640 width, 16px min body, 44 hit, AA contrast).",
      "Render each module in HubSpot's preview against the three required clients (Gmail web, Apple Mail, Outlook 365) before merging.",
    ],
  },
  {
    phase: "Phase 5",
    title: "Re-skin existing templates",
    eta: "1.5 days",
    rule: "Same modules, new wrapper",
    steps: [
      "Open each template under pipeline/production. They're DnD compositions, not coded — only the modules' style updates flow through automatically.",
      "Manually verify: subject pre-header, header logo, hero, body cadence, dark breaker presence (max 1), footer.",
      "Replace any template using hsc_customer_snapshot with hsc_customer_snapshot_block · context=lite.",
      "Replace any template using sec-split-image-copy-6-6 with sec-split-copy-image-6-6 · media_side=left.",
      "Replace any template using headers/brand-header with blocks/hsc_email_header.",
    ],
  },
  {
    phase: "Phase 6",
    title: "QA + send-test matrix",
    eta: "1 day",
    rule: "If you can't see it in Outlook, it's broken",
    steps: [
      "Run Email-on-Acid (or Litmus) against all 17 production templates.",
      "Manual checks: Gmail web/iOS/Android, Apple Mail macOS/iOS, Outlook 365 web + Win desktop, Yahoo.",
      "Dark-mode check on Apple Mail (auto-invert behaviour) — sand background should hold.",
      "Validate plain-text alternatives are still readable.",
    ],
  },
  {
    phase: "Phase 7",
    title: "Cutover + sunset",
    eta: "0.5 day",
    rule: "v1 read-only after cutover",
    steps: [
      "Promote blocks_v2 → blocks; sections_v2 → sections in HubSpot.",
      "Move v1 modules to /archive/ in design manager (do not delete — referenced by sent emails).",
      "Update CLAUDE.md inside 03_content_and_marketing/02_email_campaigns/ with the new naming + design system links.",
      "Resume paused workflows.",
      "Tag state v2.0.",
    ],
  },
];

Object.assign(window, { INVENTORY, PHASES });
