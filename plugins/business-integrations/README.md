# Business Integrations Plugin

Connect and automate the core business stack for Hair Solutions Co.: HubSpot CRM, Notion workspace, Instagram, n8n workflows, and 1000+ apps via Composio.

## Skills Included

| Skill | Purpose |
|-------|---------|
| `connect-apps` | Composio Tool Router — connect 1000+ apps with natural language |
| `hubspot-integration` | HubSpot CRM — contacts, deals, companies, pipelines, email |
| `notion` | Notion API — read/write pages, query databases, manage blocks |
| `instagram` | Instagram Graph API — publish posts, reels, carousels, analytics |
| `mcp-n8n` | n8n workflow automation — multi-step automations and triggers |

## Required Environment Variables

```bash
HUBSPOT_ACCESS_TOKEN=pat-na1-xxxxx
NOTION_API_KEY=secret_xxxxx
IG_ACCESS_TOKEN=EAAxxxxx
IG_USER_ID=17841400000000000
N8N_URL=https://your-n8n-instance.com
N8N_API_KEY=n8n_api_xxxxx
```

## Common Workflows

- New booking → HubSpot contact + deal + Slack notification
- Sync Notion content calendar with Instagram scheduling
- HubSpot contact created → Notion database entry
- n8n triggers for daily business digest
- Composio: cross-app automation with natural language
