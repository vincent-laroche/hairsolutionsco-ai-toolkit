# Connectors

## How tool references work

Plugin files use `~~category` as a placeholder for whatever tool the user
connects in that category. Plugins are tool-agnostic — connect the tools
you already use and the plugin adapts to them.

## Connectors for this plugin

| Category | Placeholder | Included servers | What it unlocks |
|----------|-------------|-----------------|-----------------|
| Design | `~~design tool` | Figma | Read design specs directly in `/design-section` and `/design-theme` commands — no copy-pasting required |
| E-commerce | `~~shopify store` | Shopify | Query your live store's theme files, product data, and metafields in real time from `/deploy-theme` and all code generation tasks |

## Setup

### Figma
Used by: `/design-section`, `/design-theme`

Connect Figma to let Claude pull design specs, component properties, variable
tokens, and screenshots directly from your Figma files — enabling true
design-first Liquid generation without leaving the chat.

### Shopify
Used by: `/deploy-theme`, all Liquid code tasks

Connect your Shopify store to let Claude inspect live theme files, validate
metafield definitions, and verify section/block structure against what's
actually deployed on `hairsolutionsco.myshopify.com`.

## Notes

- Both connectors work together or independently — connect one, both, or neither
- Without connectors, all commands still work: paste Figma specs as text and
  reference theme files from your local folder
- Figma is already connected ✅ — connect Shopify to complete the setup
