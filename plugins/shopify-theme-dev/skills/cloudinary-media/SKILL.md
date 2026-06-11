---
name: cloudinary-media
description: Use when the user explicitly asks to find Cloudinary media, use AssetLink, build a Cloudinary URL or srcset, select storefront imagery, or verify image loading, dimensions, crop intent, public IDs, alt text, or LCP behavior.
---

# Cloudinary Media

Use the installed Cloudinary app for asset search and selection. Preserve returned public IDs, metadata, ownership, focal intent, and aspect ratio. Do not invent named transformations or folder conventions.

Use `../../scripts/cloudinary_url.py` for deterministic delivery URLs and markup. Apply `f_auto` and `q_auto`, explicit crop intent, responsive width candidates, and known dimensions.

For likely LCP media, use eager loading and high fetch priority. For below-fold media, use lazy loading and async decoding. Never emit contradictory loading/fetch attributes.

Ask before uploads, moves, overwrites, metadata rewrites, or deletion. Tests must remain offline.
