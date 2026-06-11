---
description: Query the Notion "Sections" database and list every pending design/copy change for the storefront.
argument-hint: "[page filter, e.g. Home — optional]"
---

# /sync-sections

Find pending storefront changes in the Notion **Sections** database (ID `18647d9ecc9840e7b884cdf8bf0b15ec`). Read the `notion-sections-tracker` skill first for the schema and pending rule.

## Steps

1. **Query the database.** Prefer the Notion MCP (`notion-query-database-view` or `notion-fetch` against `18647d9ecc9840e7b884cdf8bf0b15ec`). If the connector is unresponsive, run the REST fallback:
   ```bash
   NOTION_TOKEN=$NOTION_TOKEN python3 "${CLAUDE_PLUGIN_ROOT}/scripts/notion_fetch.py" --database 18647d9ecc9840e7b884cdf8bf0b15ec --pending-only
   ```
   If `$NOTION_TOKEN` is not set, ask the user for a Notion integration token (never hardcode it).

2. **Apply the pending rule.** A row is pending when any of `Desired Section Changes`, `Desired Section Changes — Mobile Version`, `Desired Text Typography Changes`, `Desired Text Typography Changes — Mobile Version` is non-empty AND `Changes Applied` is unchecked.

3. **Schema-drift check.** Compare the live property set to `${CLAUDE_PLUGIN_ROOT}/references/notion-schema.json`. If properties were added/removed/retyped, note it.

4. **Filter** by `$ARGUMENTS` if a page was given (e.g. only `Page = Home`).

5. **Present** pending rows as a table, ordered by `Order` (and `Priority`/`Criticality` where set):

   | Order | Section | Page | Desired changes (summary) | Section File / Template |
   |-------|---------|------|---------------------------|-------------------------|

   For each, summarize the desired change in one line and show both `Section File` and `Template / JSON Template` (flag that these may be stale and need tracing to the real file).

6. **End by asking** which row(s) to act on — or, if the user already said to proceed, hand each chosen row to the `section-builder` agent for implementation. Do not edit anything in this command; it is read-only triage.
