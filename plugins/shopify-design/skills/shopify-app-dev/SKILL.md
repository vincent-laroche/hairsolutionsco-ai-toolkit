---
name: shopify-app-dev
description: "Build Shopify apps — Remix framework, App Bridge, OAuth, session tokens, webhooks, billing API, and extension development. Use when creating Shopify apps, building embedded apps, implementing Shopify OAuth, working with App Bridge, creating theme extensions, or building checkout extensions. Triggers: \"shopify app\", \"app bridge\", \"shopify remix\", \"embedded app\", \"shopify oauth\", \"checkout extension\", \"theme extension\"."
---

# Shopify App Development

Build embedded Shopify apps using the Remix framework and Shopify App CLI.

## Setup

```bash
npm init @shopify/app@latest my-app
cd my-app
npm run dev
```

## App Structure (Remix)

```
app/
├── routes/
│   ├── app._index.jsx         # Home page
│   ├── app.products.jsx       # Products page
│   └── webhooks.jsx           # Webhook handlers
├── shopify.server.js          # Shopify session/auth config
└── entry.server.jsx
```

## Authentication

Shopify handles OAuth via `@shopify/shopify-app-remix`:

```javascript
// shopify.server.js
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";

export const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ["read_products", "write_products", "read_orders"],
  appUrl: process.env.SHOPIFY_APP_URL,
  sessionStorage: new PrismaSessionStorage(prisma),
});
```

## Making API Calls

```javascript
// In a route loader
export async function loader({ request }) {
  const { admin } = await shopify.authenticate.admin(request);
  
  const response = await admin.graphql(`
    query {
      products(first: 10) {
        edges {
          node { id title }
        }
      }
    }
  `);
  
  const data = await response.json();
  return json(data.data.products);
}
```

## Webhooks

```javascript
// webhooks.jsx
export const action = async ({ request }) => {
  const { topic, shop, payload } = await shopify.authenticate.webhook(request);
  
  switch(topic) {
    case "ORDERS_CREATE":
      await processNewOrder(payload);
      break;
    case "PRODUCTS_UPDATE":
      await syncProduct(payload);
      break;
  }
  
  return new Response();
};
```

## App Bridge (Embedded UI)

```jsx
// In a React component
import { useAppBridge } from "@shopify/app-bridge-react";
import { Toast, Modal } from "@shopify/polaris";

function ProductsPage() {
  const shopify = useAppBridge();
  
  const showToast = () => {
    shopify.toast.show("Products saved!", { duration: 3000 });
  };
  
  return <Button onClick={showToast}>Save</Button>;
}
```

## Billing API

```javascript
// Request subscription
const billingCheck = await shopify.billing.require({
  request,
  plans: [{
    name: "Pro Plan",
    amount: 29.99,
    currencyCode: "USD",
    interval: BillingInterval.Every30Days,
  }],
  onFailure: async () => shopify.billing.request({ request, plan: "Pro Plan" })
});
```

## Theme App Extension

```bash
# Add theme extension to app
shopify app generate extension --type theme_app_extension

# Extension file structure
extensions/my-extension/
├── blocks/
│   └── my-block.liquid      # Custom block for themes
├── assets/
│   └── custom.css
└── shopify.extension.toml
```
