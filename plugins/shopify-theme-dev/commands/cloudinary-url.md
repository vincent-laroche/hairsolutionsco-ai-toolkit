---
description: Build a Cloudinary delivery URL (+ ready-to-paste <img>/srcset) for a public ID and use case.
argument-hint: "<public-id> <use: hero|card|thumb|macro|custom> [custom transform string]"
---

# /cloudinary-url

Construct a brand-correct Cloudinary delivery URL for cloud `dtmizxj1n` and emit a ready-to-paste responsive `<img>`. Read the `cloudinary-media` skill for the named-transformation table and rules.

## Steps

1. **Parse `$ARGUMENTS`** into: public ID (e.g. `products/mens-lace-system-7/hero`), use case, and any custom transform string.

2. **Map the use case** to a named transform:
   - `hero` → `t_hsc_hero` (LCP, full-bleed)
   - `card` → `t_hsc_card` (grid/collection card)
   - `thumb` → `t_hsc_thumb` (thumbnail)
   - `macro` → `t_hsc_macro_4x5` (macro/detail, 4:5)
   - `custom` → use the provided raw transform string

3. **Generate the URL(s)** with `scripts/cloudinary_url.py`, which always includes `f_auto,q_auto,dpr_auto` and emits a srcset across a width list:
   ```bash
   python3 "${CLAUDE_PLUGIN_ROOT}/scripts/cloudinary_url.py" \
     --public-id "<public-id>" --transform "t_hsc_<use>" \
     --widths 768,1280,1600,2200 --srcset
   ```
   (For `custom`, pass `--transform "<raw params>"`.)

4. **Emit an `<img>` snippet** matching the LCP/lazy rules:
   - **hero** → `fetchpriority="high" loading="eager"` + explicit `width`/`height` (CLS) + `sizes="100vw"`.
   - everything else → `loading="lazy"` + appropriate `sizes`.
   - Always include a meaningful, descriptive `alt`.

5. Return the URL(s) and the `<img>`/`srcset` block, ready to paste into a section. Remind the user that for production the asset should be wired via **AssetLink** and referenced from the linked metafield/setting — this command is for delivery-URL construction and prototyping.
