# Shopify Storefront API Reference

For headless storefronts (Framer, custom React, etc.) or Ajax-driven Liquid themes.

## Authentication Setup

```typescript
const SHOPIFY_DOMAIN = 'your-store.myshopify.com';
const STOREFRONT_TOKEN = 'your-storefront-access-token'; // Public — safe in client code
const API_VERSION = '2024-01';

async function shopifyFetch(query: string, variables = {}) {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data;
}
```

## Core Queries

### Product with Variants + Metafields

```graphql
query ProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    handle
    featuredImage { url altText }
    images(first: 10) {
      nodes { url altText width height }
    }
    variants(first: 50) {
      nodes {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
        image { url altText }
      }
    }
    metafield(namespace: "custom", key: "ingredients") {
      value type
    }
  }
}
```

### Collection Product Grid

```graphql
query Collection($handle: String!, $first: Int!, $after: String) {
  collection(handle: $handle) {
    title
    description
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id handle title
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        featuredImage { url(transform: { maxWidth: 600 }) altText }
        variants(first: 1) {
          nodes { id availableForSale }
        }
      }
    }
  }
}
```

## Cart Operations

### Create Cart

```graphql
mutation CartCreate($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      id checkoutUrl
      cost { totalAmount { amount currencyCode } }
      lines(first: 50) {
        nodes {
          id quantity
          merchandise { ... on ProductVariant { id title product { title } price { amount } } }
          attributes { key value }
        }
      }
    }
    userErrors { field message }
  }
}
```

### Add Line with Custom Properties

```typescript
// Custom product options (not variants) via line item attributes
const lines = [{
  merchandiseId: variantGid,       // "gid://shopify/ProductVariant/123"
  quantity: 1,
  attributes: [
    { key: "Engraving text", value: customerText },
    { key: "Font style", value: selectedFont },
  ]
}];
```

### Update Cart Line

```graphql
mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart { id cost { totalAmount { amount currencyCode } } }
    userErrors { field message }
  }
}
```

## Custom Options Pattern (Beyond Variants)

Use line item properties for customizations that don't affect inventory:
- Engravings / personalizations
- File uploads (link via URL)
- Gift messages
- Installation preferences

```typescript
// In Liquid: expose via form attributes
// In Storefront API: pass as CartLineInput.attributes
// In order: visible in admin under line item properties

const customOptions = {
  "Color match": selectedColor,    // e.g., from a custom color picker
  "Rush order": rushSelected ? "Yes" : "No",
  "Special instructions": notes,
};

const attributes = Object.entries(customOptions)
  .filter(([_, v]) => v)
  .map(([key, value]) => ({ key, value }));
```

## Framer Component Pattern

```typescript
import { addPropertyControls, ControlType } from "framer"

export function AddToCartButton({ productHandle, variantId, label }) {
  const [loading, setLoading] = React.useState(false)
  const [cartId, setCartId] = React.useState(
    () => localStorage.getItem('shopify_cart_id')
  )

  async function handleAdd() {
    setLoading(true)
    try {
      if (!cartId) {
        const data = await shopifyFetch(CART_CREATE_MUTATION, {
          lines: [{ merchandiseId: variantId, quantity: 1 }]
        })
        const newCartId = data.cartCreate.cart.id
        localStorage.setItem('shopify_cart_id', newCartId)
        setCartId(newCartId)
      } else {
        await shopifyFetch(CART_LINES_ADD_MUTATION, {
          cartId,
          lines: [{ merchandiseId: variantId, quantity: 1 }]
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      style={{ cursor: loading ? 'wait' : 'pointer', minHeight: 44, minWidth: 44 }}
      aria-label={loading ? 'Adding to cart...' : label}
    >
      {loading ? 'Adding...' : label}
    </button>
  )
}

addPropertyControls(AddToCartButton, {
  productHandle: { type: ControlType.String, title: "Product handle" },
  variantId: { type: ControlType.String, title: "Variant GID" },
  label: { type: ControlType.String, title: "Button label", defaultValue: "Add to cart" },
})
```

## Metafields for Rich Product Data

```graphql
# In product query, request metafields:
metafields(identifiers: [
  { namespace: "custom", key: "ingredients" },
  { namespace: "custom", key: "how_to_use" },
  { namespace: "reviews", key: "rating" }
]) {
  key namespace value type
}
```

Types: `single_line_text_field`, `multi_line_text_field`, `json`, `number_decimal`, `rating`, `file_reference`, `list.metaobject_reference`