---
name: notion-sections
description: Use only when the user explicitly mentions Notion, the Sections tracker, pending section rows, syncing Sections, or asks to read or draft an update for a Notion storefront-tracking row.
---

# Notion Sections

Use the installed Notion app first. Verify the supplied database or data-source schema before filtering rows. Query all pages with pagination.

Treat inaccessible data sources, missing schema, or unverified property names as blocked, not as zero pending work. Do not substitute similarly named databases.

Use `../../scripts/notion_fetch.py` only as a REST fallback. It accepts `NOTION_TOKEN` or `NOTION_API_KEY` without printing either. Use `../../scripts/notion_update.py` only to draft a dry run unless a separate current instruction authorizes the write.

Trace requested rows to real storefront files before implementation. After verified implementation and release, draft only the narrow row update supported by the live schema.
