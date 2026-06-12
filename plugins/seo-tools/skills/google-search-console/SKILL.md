---
name: google-search-console
description: Connects to Google Search Console to fetch performance data, inspect URLs, and manage sitemaps.
---

# Google Search Console Skill

This skill empowers AI agents to interact directly with the Hair Solutions Co. Google Search Console data via a dedicated Python CLI tool.

## Prerequisites

To use this skill, the host environment must have:
1. Python 3 with the `google-api-python-client` and `google-auth` packages installed.
2. The user must be authenticated via the Google Cloud CLI using Application Default Credentials with the Search Console scope. If authentication fails, the agent should instruct the user to run `gcloud auth application-default login --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters.readonly"`.

## When to use

- **SEO Audits:** When you need to determine the top queries, pages, or general search performance of the domain.
- **Troubleshooting:** When investigating why a page isn't getting traffic (use URL inspection).
- **Post-Launch:** To verify that newly published pages are indexed or submitted in a sitemap.
- **Property Discovery:** To confirm which GSC properties the agent has access to.

## Available Commands

You will use the `run_command` tool to execute `gsc_tool.py` located in the `plugins/seo-tools/commands/` directory.

### 1. List Properties
Run this to confirm the exact string to use for the `--site` argument in other commands.
```shell
./plugins/seo-tools/commands/gsc_tool.py list-sites
```

### 2. Performance Reporting
Fetches clicks, impressions, CTR, and average position.
```shell
./plugins/seo-tools/commands/gsc_tool.py performance --site "sc-domain:hairsolutions.co" --start "2024-01-01" --end "2024-01-31" --dimensions "query,page"
```
*Note: Available dimensions are `date`, `query`, `page`, `country`, `device`.*

### 3. URL Inspection
Checks the indexing status, canonicalization, and mobile-usability of a specific URL.
```shell
./plugins/seo-tools/commands/gsc_tool.py inspect --site "sc-domain:hairsolutions.co" --url "https://hairsolutions.co/products/example"
```

### 4. Sitemaps
Lists submitted sitemaps and their processing status (e.g., warnings or errors).
```shell
./plugins/seo-tools/commands/gsc_tool.py sitemaps --site "sc-domain:hairsolutions.co"
```

## Interpreting Results

- **Coverage State:** Tells you if a page is "Indexed", "Crawled - currently not indexed", or "Discovered - currently not indexed". Use this to diagnose indexing pipeline issues.
- **Position:** In GSC, position is 1-indexed (1 is the top result). Lower numbers are better.
- If the CLI returns "No data found", ensure the date range is valid (GSC data is typically delayed by ~48 hours) and the property string exactly matches the `list-sites` output.
