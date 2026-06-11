# Hair Solutions Co. — AI Toolkit

A vendor-neutral marketplace of **Hair Solutions Co.** plugins, skills, agents, and commands for AI coding/agent apps (Claude Code / Cowork, Cursor, and others). The content (skills, commands, scripts, references) is app-agnostic; only the small catalog/manifest files are app-specific.

- **Marketplace slug:** `hairsolutionsco`
- **Owner:** Vincent Laroche
- **Repo:** `vincent-laroche/hairsolutionsco-ai-toolkit`

## Install (Claude Code / Cowork)

**Cowork:** + → Plugins → **Add plugin** → **Add marketplace** → enter `vincent-laroche/hairsolutionsco-ai-toolkit` → **Sync**, then install any plugin from the list.

**Claude Code terminal:**

```shell
/plugin marketplace add vincent-laroche/hairsolutionsco-ai-toolkit
/plugin install shopify-theme-dev@hairsolutionsco
/reload-plugins
```

## Plugins in this marketplace

| Plugin | What it does |
|--------|--------------|
| **shopify-theme-dev** | Designer-in-Chief / Creative Director / Liquid toolkit for the hairsolutions.co storefront — brand system, OS 2.0 sections, Cloudinary AssetLink media, Notion change-tracker, ship-to-`main` workflow. |
| **shopify-liquid-designer** | Liquid/theme design + frontend skills for the Hair Solutions storefront. |
| **shopify-design** | Shopify design skills. |
| **shopify-developer** | Shopify developer skills. |
| **ai-video** | AI video generation workflow skills. |
| **analytics-ads** | Analytics + paid-ads skills. |
| **marketing-content** | Marketing content creation skills. |
| **business-integrations** | Business/SaaS integration skills. |
| **hubspot** | HubSpot CMS / CRM skills. |

Each plugin lives under `plugins/<name>/` with its own `.claude-plugin/plugin.json` and `skills/ commands/ agents/ hooks/` as applicable. The marketplace catalog is `.claude-plugin/marketplace.json`.

## Structure

```
hairsolutionsco-ai-toolkit/
├── .claude-plugin/
│   └── marketplace.json        ← the catalog (lists every plugin)
├── plugins/
│   └── <plugin>/               ← one folder per plugin
│       ├── .claude-plugin/plugin.json
│       ├── skills/  commands/  agents/  hooks/ ...
└── README.md
```

## Adding a new plugin later

1. Drop the plugin folder under `plugins/<name>/` (must contain `.claude-plugin/plugin.json`).
2. Add an entry to `.claude-plugin/marketplace.json` with `"source": "./plugins/<name>"`.
3. Commit + push. Users run `/plugin marketplace update hairsolutionsco` to pick it up.

To target other AI apps, add the matching catalog file alongside `.claude-plugin/` (e.g. `.cursor-plugin/marketplace.json`) pointing at the same `plugins/` folders.
