---
name: connect-apps
description: "Connect Claude to 1000+ external apps and services using Composio Tool Router. Use this skill when working with app integrations, automating cross-platform workflows, connecting to Gmail, Slack, GitHub, HubSpot, Notion, Google Sheets, Airtable, PostgreSQL, or any other SaaS tool. Triggers: \"connect to\", \"integrate with\", \"automate across apps\", \"composio\", \"tool router\", \"app integration\"."
---

# Composio Connect Apps

Connect Claude to 1000+ apps using Composio's Tool Router — a universal integration layer that handles OAuth, authentication, and API complexity automatically.

## Setup

Install the Composio Tool Router plugin first:
```
/plugin install composio-toolrouter
/composio-toolrouter:setup
```

## How It Works

**4-Step Flow:**
1. User describes what they want to do across apps
2. Tool Router identifies the right tool (from 1000+ available)
3. OAuth prompt appears if first connection (one-time)
4. Action executes and returns results

## Supported Apps (Selection)

**Productivity**: Gmail, Google Calendar, Google Sheets, Google Drive, Notion, Airtable  
**CRM**: HubSpot, Salesforce, Pipedrive  
**Communication**: Slack, Discord, Microsoft Teams, WhatsApp  
**Dev Tools**: GitHub, GitLab, Jira, Linear, Asana  
**E-commerce**: Shopify, WooCommerce, Stripe  
**Database**: PostgreSQL, MySQL, MongoDB, Supabase  
**Social**: Instagram, Twitter/X, LinkedIn, TikTok  

## Usage Patterns

**Cross-app automation:**
```
"When a new HubSpot contact is added, create a Notion database entry and send a Slack notification"
```

**Data sync:**
```
"Pull all orders from Shopify from the last 7 days and add them to a Google Sheet"
```

**Content publishing:**
```
"Post this caption to Instagram and Twitter simultaneously"
```

## Authentication

Composio handles all OAuth flows. Each app connects once — credentials are stored securely and reused. Supports:
- OAuth 2.0 (most SaaS apps)
- API key injection
- Bearer tokens
- Basic auth

## Best Practices

- Describe the desired outcome, not the specific API calls
- Use natural language — the Tool Router translates intent to actions
- Chain multiple app actions in a single prompt
- Specify date ranges, filters, or limits when querying data

## Troubleshooting

If a connection fails:
- Run `/composio-toolrouter:setup` again
- Check if the app requires re-authentication
- Verify the app is in the supported list at composio.dev
