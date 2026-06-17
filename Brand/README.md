# Hair Solutions Co. Brand

This directory is the canonical repository source for Hair Solutions Co. brand and design-system material used by agents, plugins, and client installers.

## Structure

- `design-system/master/` — current authoritative web, email, and social design system.
- `design-system/reference/` — distinct legacy material retained for historical or implementation reference.
- `logos/current/` — current logo and brand-deck source.
- `logos/archive/` — legacy logo exports retained for compatibility and provenance.

## Source priority

1. Use `design-system/master/` for current implementation decisions.
2. Use `logos/current/` for current logo and identity work.
3. Treat `design-system/reference/` and `logos/archive/` as non-authoritative history.

The prior `development-reference/email-marketing/project/` export was not retained. It was a complete older subset of the master project: 136 common-path files were byte-identical, 11 common-path files were superseded by the master, and it contained no unique paths.

Exact duplicate raw uploads, generated hash-suffixed exports, and archive copies were removed. The remaining repeated content is limited to files that belong to separate standalone artifacts, such as the master design system and brand deck, or separate HubSpot module exports.

## Binary assets

Git LFS tracks raster images, archives, PDFs, and common source-design binaries under `Brand/`. Large handoff archives remain outside Git in `/Users/vMac/07_warehouse/design-system/source-archives-20260612/`.

Installed client copies are generated targets. Author changes here first and propagate them through the toolkit installation workflow.
