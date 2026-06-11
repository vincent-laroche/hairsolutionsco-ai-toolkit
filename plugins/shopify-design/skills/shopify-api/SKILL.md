---
name: shopify-api
description: "Work with Shopify Admin API and Storefront API — products, orders, customers, inventory, metafields, GraphQL, webhooks, and REST endpoints. Use when querying Shopify data, syncing products, managing orders programmatically, building custom storefronts, using Shopify GraphQL, or managing metafields. Triggers: \"shopify admin api\", \"storefront api\", \"shopify graphql\", \"shopify rest\", \"shopify orders\", \"shopify products API\", \"metafields API\"."
---

# Shopify API

Access Shopify data and functionality through the Admin API (server-side) and Storefront API (client-side/headless).

## Authentication

### Admin API (Private App / Custom App)
```bash
export SHOPIFY_STORE="your-store.myshopify.com"
export SHOPIFY_ACCESS_TOKEN="shpat_xxxxx"

curl "https://$SHOPIFY_STORE/admin/api/2025-01/products.json" \
  -H "X-Shopify-Access-Token: $SHOPIFY_ACCESS_TOKEN"
```

### Storefront API
```bash
export STOREFRONT_TOKEN="your-public-storefront-token"

curl "https://$SHOPIFY_STORE/api/2025-01/graphql.json" \
  -H "X-Shopify-Storefront-Access-Token: $STOREFRONT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ shop { name } }"}'
```

## Admin API — REST Endpoints

### Products
```bash
# List products
GET /admin/api/2025-01/products.json?limit=250&status=active

# Get single product
GET /admin/api/2025-01/products/{product_id}.json

# Create product
POST /admin/api/2025-01/products.json
{
  "product": {
    "title": "Keratin Treatment",
    "body_html": "<p>Professional keratin treatment</p>",
    "product_type": "Hair Treatment",
    "status": "active",
    "variants": [{"price": "149.99", "sku": "KRT-001"}],
    "tags": "treatment, keratin, professional"
  }
}

# Update product
PUT /admin/api/2025-01/products/{product_id}.json
```

### Orders
```bash
# List recent orders
GET /admin/api/2025-01/orders.json?status=any&limit=50&created_at_min=2026-02-01

# Get order with line items
GET /admin/api/2025-01/orders/{order_id}.json

# Update order note
PUT /admin/api/2025-01/orders/{order_id}.json
{"order": {"id": "{order_id}", "note": "VIP customer — priority processing"}}
```

### Customers
```bash
# Search customers
GET /admin/api/2025-01/customers/search.json?query=email:jane@example.com

# Create customer
POST /admin/api/2025-01/customers.json
{
  "customer": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "tags": "vip, salon-client"
  }
}
```

## Storefront API — GraphQL

### Get Products
```graphql
query {
  products(first: 10, query: "product_type:Hair Treatment") {
    edges {
      node {
        id
        title
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 1) {
          edges { node { url altText } }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              price { amount }
              availableForSale
            }
          }
        }
      }
    }
  }
}
```

### Cart Operations
```graphql
# Create cart
mutation {
  cartCreate(input: {
    lines: [{quantity: 1, merchandiseId: "gid://shopify/ProductVariant/xxxxx"}]
  }) {
    cart {
      id
      checkoutUrl
      cost {
        totalAmount { amount currencyCode }
      }
    }
  }
}

# Add to cart
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { id checkoutUrl }
  }
}
```

## Metafields API

```bash
# Create metafield on product
POST /admin/api/2025-01/products/{product_id}/metafields.json
{
  "metafield": {
    "namespace": "custom",
    "key": "ingredients",
    "value": "[\"Keratin\", \"Argan Oil\", \"Vitamin E\"]",
    "type": "list.single_line_text_field"
  }
}

# Get all metafields for product
GET /admin/api/2025-01/products/{product_id}/metafields.json
```

## Webhooks

```bash
# Register webhook
POST /admin/api/2025-01/webhooks.json
{
  "webhook": {
    "topic": "orders/create",
    "address": "https://your-app.com/webhooks/orders",
    "format": "json"
  }
}
```

Available topics: `orders/create`, `orders/updated`, `orders/paid`, `products/create`, `products/update`, `customers/create`, `checkouts/create`, `carts/create`

## API Version

Always specify the version: `/admin/api/2025-01/`  
Shopify releases new versions quarterly. Check deprecation schedule at shopify.dev.

## Rate Limits

- REST: 40 requests/app/store per second (leaky bucket)
- GraphQL: 1000 cost units/second
- Use `X-Shopify-Shop-Api-Call-Limit` header to monitor usage
