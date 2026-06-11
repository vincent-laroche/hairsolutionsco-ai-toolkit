---
description: Push theme changes to Hair Solutions Co. Shopify store
allowed-tools: Read, Bash(ls:*, cat:*)
argument-hint: [method?] — zip | cli | manual (default: guide user to best method)
---

Help deploy Shopify theme changes to the Hair Solutions Co. store: $ARGUMENTS

## Store Context

- **Store**: one-head-hair.myshopify.com
- **Theme location**: `shopify-theme/live_theme_2025-11-26/`
- **Theme**: Horizon 3.1.0

## Step 1: Determine Deployment Method

Ask the user which method they want to use, or recommend based on context:

| Method | Best For | Risk |
|--------|----------|------|
| **ZIP Upload** | Large changes, new theme version | Low — can preview before publishing |
| **Shopify CLI** | Individual file pushes during dev | Medium — pushes to dev theme |
| **Manual Upload** | Single file fixes | Low — targeted, visible |

## Step 2: Execute Deployment

### Method A: ZIP Upload (Recommended for multiple changes)

1. Navigate to the theme folder: `cd shopify-theme/live_theme_2025-11-26/`
2. Zip the theme: `zip -r ../theme-$(date +%Y%m%d).zip . --exclude "*.DS_Store"`
3. Go to Shopify Admin → Online Store → Themes
4. Click "Add theme" → "Upload zip file"
5. Upload the zip — this creates a NEW inactive theme copy
6. Preview before publishing with "Preview theme"
7. Publish when satisfied

### Method B: Shopify CLI (Best for dev iteration)

```bash
# Install if needed
npm install -g @shopify/cli @shopify/theme

# Pull latest from store (backup before making changes)
shopify theme pull --store one-head-hair.myshopify.com

# Push to dev theme (does NOT affect live store)
shopify theme dev --store one-head-hair.myshopify.com

# Push specific files only
shopify theme push --only sections/my-section.liquid --store one-head-hair.myshopify.com

# Push all (use with caution — overwrites live theme files)
shopify theme push --store one-head-hair.myshopify.com
```

### Method C: Manual File Upload (Best for single-file fixes)

1. Go to Shopify Admin → Online Store → Themes
2. Click "..." → "Edit code" on the live theme
3. Navigate to the file (e.g., `sections/` → find the section)
4. Paste the updated content
5. Click "Save"

## Step 3: Pre-Push Checklist

Before pushing any changes:

- [ ] Tested in dev theme or local preview
- [ ] Checked on mobile (390px viewport)
- [ ] Verified critical pages: Homepage, PDP, Collection, Cart, KB pages
- [ ] No console errors in browser devtools
- [ ] SEO tags intact (`<title>`, meta description)
- [ ] Images load (no broken paths)
- [ ] Third-party app sections untouched (`ecom-*`, `ss-*`, `foxify-*`)

## Step 4: Post-Deploy Verification

After publishing, check:
1. Homepage renders correctly
2. Product pages load with correct variant options
3. Cart and checkout function
4. KB section pages load (`kb_home.liquid`, `kb_category.liquid`, `kb_article.liquid`)
5. Mobile layout on real device

## Templates Reference

| Template file | Controls |
|--------------|----------|
| `templates/index.json` | Homepage |
| `templates/collection.json` | Collection pages |
| `templates/product.json` | Product detail pages |
| `templates/page.json` | Standard pages |

## Rollback

If something breaks after publishing:
1. Shopify Admin → Online Store → Themes
2. Find the previous theme version
3. Click "Publish" to instantly roll back
4. Always keep at least 1 backup theme available

