# Hair Solutions Co — Shopify Theme Workflow

Operational guide for working with the Horizon theme on one-head-hair.myshopify.com.

## Store Details

- **Store URL**: one-head-hair.myshopify.com
- **Theme**: Horizon 3.1.0
- **Theme folder**: `shopify-theme/live_theme_2025-11-26/`
- **Admin**: shopify.com/admin → one-head-hair

## Theme File Structure

```
shopify-theme/live_theme_2025-11-26/
├── assets/          CSS, JS, images, fonts
├── blocks/          Theme blocks (reusable across sections)
├── config/          settings_schema.json, settings_data.json
├── layout/          theme.liquid, password.liquid
├── locales/         Translation files
├── sections/        Section files (.liquid)
├── snippets/        Reusable Liquid snippets
└── templates/       Page templates (.json)
```

## Pulling Theme Files

### Method 1: Shopify CLI (Recommended)

```bash
# One-time setup
npm install -g @shopify/cli @shopify/theme

# Pull all theme files
shopify theme pull \
  --store one-head-hair.myshopify.com \
  --path shopify-theme/live_theme_2025-11-26

# Pull only specific files
shopify theme pull \
  --only sections/hero.liquid \
  --store one-head-hair.myshopify.com
```

### Method 2: Shopify Admin (Manual)

1. Shopify Admin → Online Store → Themes
2. Click "..." → "Edit code"
3. Navigate to file → copy content manually

## Pushing Theme Changes

### Push to Dev Theme (Safe — does not affect live store)

```bash
shopify theme dev --store one-head-hair.myshopify.com
```

This starts a local development server. Changes preview in real-time without touching the live theme.

### Push Specific Files to Live

```bash
# Single file
shopify theme push \
  --only sections/my-section.liquid \
  --store one-head-hair.myshopify.com

# Multiple files
shopify theme push \
  --only "sections/hero.liquid sections/features.liquid" \
  --store one-head-hair.myshopify.com
```

### Push via ZIP Upload

1. Zip the theme folder: `zip -r theme-YYYYMMDD.zip shopify-theme/live_theme_2025-11-26/`
2. Shopify Admin → Online Store → Themes → "Add theme" → "Upload zip"
3. This creates an inactive duplicate — preview before publishing
4. Click "Publish" when ready

### Manual Single-File Upload

1. Shopify Admin → Online Store → Themes → "Edit code"
2. Find the file in the sidebar
3. Paste new content → Save

## Testing Workflow

1. Make changes locally in `shopify-theme/live_theme_2025-11-26/`
2. Push to dev theme: `shopify theme dev`
3. Test critical pages:
   - Homepage (`/`)
   - Product page (e.g., `/products/hs1v-natural-wave`)
   - Collection page (e.g., `/collections/all`)
   - Cart (`/cart`)
   - KB Home, Category, Article pages
4. Check mobile at 390px viewport
5. Run SEO checks (title tags, meta descriptions, image alt text)
6. Push to live when satisfied

## Custom Knowledge Base Pages

The store has a custom knowledge base with 3 template files:

| Template | Path | Controls |
|----------|------|----------|
| KB Home | `sections/kb_home.liquid` | Main knowledge base landing |
| KB Category | `sections/kb_category.liquid` | Category listing |
| KB Article | `sections/kb_article.liquid` | Individual articles |

These are custom sections — safe to modify (not third-party app files).

## Template Files

| Template | File | Purpose |
|----------|------|---------|
| Homepage | `templates/index.json` | Homepage section layout |
| Collections | `templates/collection.json` | Collection pages |
| Products | `templates/product.json` | Product detail pages |
| Pages | `templates/page.json` | Standard content pages |

## Third-Party App File Safety

Never modify these without understanding app dependencies:

| Prefix | App | Risk |
|--------|-----|------|
| `ecom-*` | EComposer | Breaks visual page builder |
| `ss-*` | SectionStore | Breaks purchased sections |
| `foxify-*` | Foxify | Breaks theme functionality |
| `hs-custom-*` | Custom/in-house | ✅ Safe to modify |

## Common Tasks

### Add a New Section

1. Create `sections/section-name.liquid` with full Liquid + schema
2. Add to relevant template JSON: `"sections": { "my-section": { "type": "section-name" } }`
3. Test in theme editor that settings appear correctly
4. Push to dev, verify, then push to live

### Modify an Existing Section

1. Pull latest: `shopify theme pull --only sections/name.liquid`
2. Edit locally
3. Test: `shopify theme dev`
4. Push: `shopify theme push --only sections/name.liquid`

### Add a New Theme Block

1. Create `blocks/block-name.liquid` with schema
2. Ensure target sections accept `{ "type": "@theme" }` in their schema
3. Blocks appear automatically in theme editor once file exists

### Update Global Settings

1. Edit `config/settings_schema.json` to add settings
2. Edit `config/settings_data.json` to set default values
3. Access in Liquid via `{{ settings.your_setting }}`

## Rollback Procedure

If a live push causes issues:
1. Shopify Admin → Online Store → Themes
2. Find previous theme version in "Theme library"
3. Click "Publish" to instantly switch back
4. Shopify keeps the last 20 theme saves

Always keep at least one backup theme available in the theme library.
