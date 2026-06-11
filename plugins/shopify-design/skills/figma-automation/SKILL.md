---
name: figma-automation
description: Automate Figma workflows — export assets, generate design tokens, sync designs to code, create component variants, and use the Figma API for design automation. Use when exporting Figma assets programmatically, syncing design tokens, automating component generation, reading Figma file data, or integrating Figma into development workflows. Triggers: "figma", "figma api", "design tokens", "export figma", "figma automation", "sync design".
---

# Figma Automation

Automate Figma workflows using the Figma REST API — export assets, extract design tokens, sync designs to code.

## Authentication

```bash
export FIGMA_ACCESS_TOKEN="figd_xxxxx"
export FIGMA_FILE_KEY="your-file-key"  # From Figma URL: figma.com/design/{FILE_KEY}/
```

## Core API Operations

### Get File Structure
```bash
curl "https://api.figma.com/v1/files/$FIGMA_FILE_KEY" \
  -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" | jq '.document.children[].name'
```

### Get Specific Node
```bash
curl "https://api.figma.com/v1/files/$FIGMA_FILE_KEY/nodes?ids=1:2,1:3" \
  -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN"
```

### Export Assets (PNG, SVG, PDF)
```bash
# Get export URLs for nodes
curl "https://api.figma.com/v1/images/$FIGMA_FILE_KEY?ids=1:2&format=svg&scale=1" \
  -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN"

# Response includes temporary image URLs — download them
# URLs expire in ~30 days
```

### Get Local Styles (Colors, Typography)
```bash
curl "https://api.figma.com/v1/files/$FIGMA_FILE_KEY/styles" \
  -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN"
```

### Get Components
```bash
curl "https://api.figma.com/v1/files/$FIGMA_FILE_KEY/components" \
  -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN"
```

## Design Token Extraction

Extract design tokens (colors, typography, spacing) from Figma styles and convert to CSS custom properties or JSON:

```python
import requests
import json

def get_figma_styles(file_key, access_token):
    headers = {"X-Figma-Token": access_token}
    
    # Get file to extract styles
    response = requests.get(
        f"https://api.figma.com/v1/files/{file_key}",
        headers=headers
    )
    data = response.json()
    
    tokens = {"colors": {}, "fonts": {}, "spacing": {}}
    
    # Extract color styles
    for style_id, style in data.get("styles", {}).items():
        if style["styleType"] == "FILL":
            tokens["colors"][style["name"]] = style_id
    
    return tokens

# Output as CSS custom properties
def tokens_to_css(tokens):
    css = ":root {\n"
    for name, value in tokens["colors"].items():
        css_name = name.lower().replace(" ", "-").replace("/", "-")
        css += f"  --color-{css_name}: {value};\n"
    css += "}"
    return css
```

## Sync to Cloudinary

Export Figma assets directly to Cloudinary:

```python
import requests
import cloudinary
import cloudinary.uploader

def sync_figma_to_cloudinary(figma_file_key, node_ids, figma_token, cloudinary_config):
    cloudinary.config(**cloudinary_config)
    
    # Get image URLs from Figma
    ids_param = ",".join(node_ids)
    figma_response = requests.get(
        f"https://api.figma.com/v1/images/{figma_file_key}?ids={ids_param}&format=png&scale=2",
        headers={"X-Figma-Token": figma_token}
    ).json()
    
    # Upload each to Cloudinary
    results = []
    for node_id, image_url in figma_response["images"].items():
        result = cloudinary.uploader.upload(
            image_url,
            folder="figma-exports",
            public_id=f"design-asset-{node_id.replace(':', '-')}"
        )
        results.append(result["secure_url"])
    
    return results
```

## Figma Plugin Development (Basics)

```javascript
// plugin.js — Run inside Figma
figma.showUI(__html__, { width: 300, height: 200 });

// Get selected nodes
figma.currentPage.selection.forEach(node => {
  console.log(node.name, node.type);
  
  if (node.type === 'TEXT') {
    node.characters = node.characters.toUpperCase();
  }
});

// Create rectangle
const rect = figma.createRectangle();
rect.x = 0;
rect.y = 0;
rect.resize(200, 100);
rect.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.2, b: 0.2}}];

figma.closePlugin('Done!');
```

## Workflow Automation Examples

### Auto-export all icons on file change
```bash
# Webhook triggers when file is updated
# 1. Get all components tagged as "icon"
# 2. Export as SVG
# 3. Optimize with SVGO
# 4. Commit to repository
```

### Generate Shopify theme color tokens from Figma
```
Figma → Extract color styles → Generate settings_schema.json defaults
→ Generate CSS custom properties → Push to theme repository
```

## Figma MCP Integration

With Figma MCP connected (available in Claude Cowork via Figma plugin):
- Read design context directly from selected Figma frames
- Generate code from designs in real-time
- No manual export required
- Use `get_design_context` for layout and component code
