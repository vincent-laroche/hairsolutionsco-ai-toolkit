---
name: storefront-build
description: Use when the user asks to build, add, edit, or fix a Shopify section, block, snippet, template, Liquid component, CSS, JavaScript interaction, or theme-editor behavior in the Hair Solutions Co. storefront.
---

# Storefront Build

Operate in `/Users/vMac/06_storefront`. Read the target, its template, and nearby examples before editing.

Choose the smallest Horizon 3.5.1-compatible change. Preserve settings IDs, merchant content, blocks, dynamic sources, metafields, app blocks, `block.shopify_attributes`, and editor lifecycle behavior. Use `hs-custom-*` for new components unless the local family establishes a better prefix. Do not touch `ecom-*`, `ss-*`, or `foxify-*` files unless explicitly requested.

For customer-facing work, read `PRODUCT.md`, relevant portions of `DESIGN.md`, and load the installed brand, frontend, Liquid, accessibility, Impeccable, or design-critique skills required by the actual change. Do not load all of them for tooling or Git work.

Validate with the repository fast validation during iteration and full validation before release. Verify responsive behavior and critical customer flows when the changed surface requires it.
