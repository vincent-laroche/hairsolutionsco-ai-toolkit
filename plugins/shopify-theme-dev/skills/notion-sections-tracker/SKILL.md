---
name: notion-sections-tracker
description: "The Notion 'Sections' database is Vincent's running corrections/changes tracker for the hairsolutions.co storefront. Use whenever the user says 'continue', 'check Notion', 'check the Sections database', or asks to find/apply pending design or copy changes. Keywords: Notion, Sections database, pending changes, corrections, desired changes, changes applied, task tracker, design bible."
compatibility: Claude Code, Claude Desktop, Cursor
metadata:
  author: Vincent Laroche
  version: "1.0"
---

# Notion "Sections" database — design bible & change tracker

Vincent tracks page-by-page storefront corrections in a Notion database called **"Sections"**.

- **Database name:** Sections
- **Database ID:** `18647d9ecc9840e7b884cdf8bf0b15ec`

He adds/edits rows between sessions. Check it proactively whenever he says "continue" or references the Sections database / a Corrections-Changes view.

## Property schema (reproduce exactly)

| Property | Type |
|----------|------|
| `Section` | title |
| `Section Type` | select |
| `Order` | number |
| `Page` | select |
| `Section File` | rich_text |
| `Template / JSON Template` | rich_text |
| `Full Section Text` | rich_text |
| `Desired Section Changes` | rich_text |
| `Desired Section Changes - Mobile Version` | rich_text |
| `Desired Text Typography Changes` | rich_text |
| `Desired Text Typography Changes - Mobile Version` | rich_text |
| `Changes Applied` | checkbox |
| `Status` | status |
| `QA Status` | status / select |
| `Copy Status` | status / select |
| `Asset Status` | status / select |
| `Priority` | select |
| `Criticality` | select |
| `Homepage Presence` | select / checkbox |
| `Claude Notes / Blockers` | rich_text |

> A cached snapshot of this schema (names + types only) is in `references/notion-schema.json`. `/sync-sections` should flag if the live schema diverges from it.

## Pending-row rule

A row is **pending** when **any "Desired …" field is non-empty AND `Changes Applied` is unchecked.** The four "Desired …" fields are: `Desired Section Changes`, `Desired Section Changes - Mobile Version`, `Desired Text Typography Changes`, `Desired Text Typography Changes - Mobile Version`.

## Access pattern

1. **Notion MCP first:** `notion-query-database-view` / `notion-search` / `notion-fetch` to read, `notion-update-page` to write.
2. **Fallback** if the connector is unresponsive: Notion REST API v1 via `scripts/notion_fetch.py` (query) and `scripts/notion_update.py` (update). They read the integration token from the `NOTION_TOKEN` env var supplied by the user at runtime — **never hardcoded in the plugin.** Ask the user for the token if it isn't already in the session.

## "Trace before you edit" (critical)

`Section File` and `Template / JSON Template` can be **stale** — verify against the actual repo before editing. Section settings (including inline HTML in a `title`) often live in `templates/index.json`, not in the named `.liquid` file.

Real example: a row labeled `Section File: sections/homepage-hero.liquid` — that file did not exist. The actual editable setting lived in `templates/index.json` → the `hero` section (`"type": "hs-home-band"`) → its `title` setting:

```json
"title": "Confidence <em>starts at the top</em>"
```

So trace: open `templates/index.json`, find the section whose `type` matches the family, and edit the setting there. (Headline + `<em>` gold/italic accent change for this exact row was applied 2026-06-11, commit `fd5d3c1`.)

## Update procedure after implementing

Once the change is committed & pushed (see `git-ship-workflow`), update the row via `notion-update-page` (or `scripts/notion_update.py`):

1. **Re-derive `Full Section Text` from the file as it now exists** — read the section's actual settings/blocks *after* your edit and write out a fresh, complete snapshot of every visible string (headline, intro/body, every CTA/button label, proof/meta lines, etc.). Do **not** patch only the lines mentioned in the "Desired …" fields — `Full Section Text` is a full content snapshot of what's live, not a diff.
   - **Structural changes are content changes too.** If the implemented change added, removed, or reordered a button, block, image, badge, or any other element, that element's line must be added to or removed from `Full Section Text` accordingly. A removed CTA/button means its "CTA N: ..." line is deleted from `Full Section Text` — leaving it in place describes a button that no longer exists.
   - When in doubt, regenerate the whole field rather than hand-editing a few words — it's cheap and avoids drift.
2. Check `Changes Applied` → `true`.
3. Clear the applied "Desired …" field(s) (set to empty).
4. Set `Status` (e.g. "In review").
5. Append a short note to `Claude Notes / Blockers` describing what changed and where — **file + commit hash**. If a structural element (button/block/image) was added or removed, call that out explicitly in the note.

This is the single intake mechanism for Vincent's design/copy requests — don't wait to be asked; check it on "continue".
