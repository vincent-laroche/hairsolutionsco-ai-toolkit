---
name: cloudinary-assetlink
description: "How Hair Solutions Co. serves all website media — Cloudinary cloud dtmizxj1n delivered through the AssetLink for Shopify integration. Use for any task involving images, video, Cloudinary delivery URLs, AssetLink, responsive srcsets, media uploads, or named transformations. Keywords: Cloudinary, AssetLink, image, video, srcset, f_auto, q_auto, t_hsc_hero, responsive image, media, transformation, dtmizxj1n."
compatibility: Claude Code, Claude Desktop, Cursor
metadata:
  author: Vincent Laroche
  version: "1.0"
---

# Cloudinary + AssetLink — media delivery

**All website media is hosted on Cloudinary and delivered through the Cloudinary AssetLink for Shopify integration. Do not upload final media to Shopify's CDN.**

| Setting | Value |
|---------|-------|
| Cloud name / product environment | `dtmizxj1n` |
| Delivery host | `https://res.cloudinary.com/dtmizxj1n` |
| AssetLink API key | in `/Users/vMac/.env` as `CLOUDINARY_ASSET_LINK_API_KEY` — read at runtime, never hardcode or print |
| Marketing assets folder | `marketing/` (collections & articles) |
| Product assets folder | `products/` |
| Page assets folder | `pages/` |

## Folder & public-ID conventions

Upload into the correct folder with descriptive public IDs that double as SEO filenames:

- `products/mens-lace-system-7/hero`
- `products/mens-lace-system-7/macro-knots`
- `marketing/journal/how-a-fitting-works/cover`
- `pages/about/studio-bench`

Preserve asset public IDs, metadata, alt text, crop intent, and aspect ratios when re-linking.

## Named transformations (define once in Cloudinary, reference by name)

| Name | Use | Typical params |
|------|-----|----------------|
| `t_hsc_hero` | Hero / full-bleed LCP image | `c_fill,g_auto`, wide (≤2200w), 16:9–16:10 |
| `t_hsc_card` | Collection/grid card | `c_fill,g_auto`, ~4:5 or 1:1 |
| `t_hsc_thumb` | Thumbnail / small UI | `c_fill,g_auto`, small square |
| `t_hsc_macro_4x5` | Macro material/detail shot | `c_fill,g_auto,ar_4:5` portrait |

Aspect ratios follow the brand: 4:5 portrait, 16:9 / 16:10 landscape, 1:1 square (see `hairsolutions-brand` §5).

## Delivery defaults — on every image

- `f_auto` (auto AVIF/WebP), `q_auto`, `dpr_auto` — always.
- Responsive widths via `w_…,c_fill,g_auto` (smart crop) or `c_limit`; emit a `srcset` by swapping `w_`.
- **LCP / hero:** `fetchpriority="high"`, `loading="eager"`, explicit `width`/`height` (CLS protection).
- **Everything else:** `loading="lazy"`.
- Always meaningful `alt` text (accessibility + SEO). Caption photographs in Geist Mono 12px Ink-3.

A delivery URL looks like:

```
https://res.cloudinary.com/dtmizxj1n/image/upload/t_hsc_hero,f_auto,q_auto,dpr_auto/products/mens-lace-system-7/hero
```

Build/debug non-trivial URLs with the `cloudinary:cloudinary-transformations` skill, or generate them with `scripts/cloudinary_url.py` / the `/cloudinary-url` command in this plugin.

Ready-to-paste hero `<img>` (LCP):

```html
<img
  src="https://res.cloudinary.com/dtmizxj1n/image/upload/t_hsc_hero,f_auto,q_auto,dpr_auto,w_1600/products/mens-lace-system-7/hero"
  srcset="https://res.cloudinary.com/dtmizxj1n/image/upload/t_hsc_hero,f_auto,q_auto,dpr_auto,w_768/products/mens-lace-system-7/hero 768w,
          https://res.cloudinary.com/dtmizxj1n/image/upload/t_hsc_hero,f_auto,q_auto,dpr_auto,w_1280/products/mens-lace-system-7/hero 1280w,
          https://res.cloudinary.com/dtmizxj1n/image/upload/t_hsc_hero,f_auto,q_auto,dpr_auto,w_2200/products/mens-lace-system-7/hero 2200w"
  sizes="100vw" width="1600" height="900"
  fetchpriority="high" loading="eager"
  alt="Client wearing a hand-knotted lace hair system, natural light">
```

## Cloudinary Asset Management MCP (preferred for media operations)

The **Cloudinary Asset Management** connector (`mcp__Cloudinary_Asset_Management__*`, default-on per `.mcp.json`) is the primary tool for finding, uploading, and organizing media in cloud `dtmizxj1n` — no API key needed for search/list operations:

- **Find media**: `search-assets` / `visual-search-assets` (search by description/visual similarity), `list-images`, `list-videos`, `list-files`, `search-folders`, `get-asset-details`.
- **Upload & organize**: `upload-asset` (push a generated/edited image straight into `marketing/`, `products/`, `pages/`, etc.), `create-folder`, `move-folder`, `asset-rename`, `asset-update` (metadata/tags), `create-asset-relations`.
- **Transform & export**: `transform-asset`, `generate-archive`, `download-asset-backup`.
- **Housekeeping** (destructive — confirm with the user first): `delete-asset`, `delete-derived-assets`, `delete-folder`, `delete-asset-relations`.
- Use `list-tags` / `get-usage-details` / `get-tx-reference` for tagging and account usage checks.

For URL-transformation syntax and debugging (`f_auto`, `q_auto`, `t_hsc_*` named transforms), pair this with the `cloudinary:cloudinary-transformations` / `cloudinary:cloudinary-docs` skills and `scripts/cloudinary_url.py` / `/cloudinary-url`.

## The AssetLink workflow (Shopify ⇄ Cloudinary)

1. **Generate** media in the design stack (Higgsfield for image/video, HeyGen for avatar video) following the brand photography direction.
2. **Upload to Cloudinary** via the Cloudinary Asset Management `upload-asset` tool, into the correct folder with a descriptive, SEO-friendly public ID.
3. **Link in Shopify admin via AssetLink** — open the AssetLink extension on the relevant product / collection / article / page and link the Cloudinary asset. AssetLink stores the delivery reference (typically a metafield) so the storefront pulls from Cloudinary's CDN. The API key keeps the Media Library loaded inside Shopify admin for one-click linking.
4. **Reference in Liquid** from the linked source (the AssetLink metafield/section setting) — **not** through Shopify's `image_url` filter, since the asset lives on Cloudinary. Build responsive delivery with the Cloudinary transformations above.

> First time wiring a page, verify the exact AssetLink metafield namespace/keys in the live store (via the Shopify Admin connector / `graphql_query`) and record them in memory so later sessions reuse them. (Still TODO to capture as of this writing.)

## Key-access constraint (now rarely needed)

The AssetLink API key lives in `/Users/vMac/.env`, which in this repo is a **symlink to `/Users/vMac/.env` outside any mountable folder** — so it is **unreadable from the Cowork sandbox** (bash can't follow the symlink; Read refuses; `/Users/vMac` can't be mounted). With the Cloudinary Asset Management connector available, this is rarely a blocker: searching, uploading, organizing, transforming, and deleting assets all go through the MCP tools above, which need no key. The key is only relevant for raw Admin API calls outside those MCP tools (e.g. custom signed-upload presets) — for those, the user runs the operation on their own machine or drops a real (non-symlink) credentials file into the connected repo. Delivery-URL construction (above) needs **no key** and works anywhere.
