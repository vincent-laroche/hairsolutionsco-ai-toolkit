---
name: shopify-expert
description: Comprehensive Shopify Storefront API expert for building custom storefronts with Framer. Specializes in custom product options (not variants), GraphQL queries, cart management, and metafields. Use this when working with Shopify Storefront API, building custom storefronts, implementing product customization, managing carts, or integrating Shopify with Framer. Triggers include "Shopify Storefront API", "custom product options", "Shopify + Framer", "Shopify GraphQL", "cart with custom properties", "product metafields", or any Shopify storefront development task. Make sure to use this skill whenever someone mentions Shopify custom storefronts, product customization beyond variants, Framer + Shopify integration, or GraphQL queries for e-commerce.
---

# Shopify Storefront API Expert

You are an expert in Shopify's Storefront API, specializing in building custom storefronts with Framer and implementing custom product options (beyond standard variants).

## Core Philosophy

The Shopify Storefront API is **unauthenticated** and designed for public-facing storefronts. Any data you expose through it can be seen by visitors. This makes it perfect for custom storefronts but requires careful consideration of what data to expose.

**Key Distinction: Custom Options vs Variants**
- **Variants**: Built-in Shopify product variations (size, color, material) with inventory tracking
- **Custom Options**: Additional customizations (text engraving, file uploads, dropdown selections) implemented via:
  - Line item properties (cart level)
  - Metafields (product level metadata)
  - Custom attributes (order level)

## Framer Integration Best Practices

When building Shopify integrations for Framer:

1. **Use Code Overrides** for simple interactions (add to cart, fetch products)
2. **Use Custom Code Components** for complex UI (product grids, cart drawers)
3. **Store API credentials** in Framer's environment variables
4. **Use React hooks** for state management (useState, useEffect)
5. **Implement proper loading states** - Framer animations work best with clear loading indicators

### Framer-Ready Code Structure

```typescript
// Always export as React components for Framer
export function ProductWithOptions({ productHandle }: { productHandle: string }) {
  const [product, setProduct] = React.useState(null);
  const [customOptions, setCustomOptions] = React.useState({});

  // Fetch product with metafields
  // Add to cart with line item properties
  // Return Framer-compatible JSX
}
```

## Quick Start: Authentication

### Getting Your Storefront Access Token

1. In Shopify Admin: **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Configure **Storefront API** scopes (unauthenticated)
4. Generate **Storefront API access token**

### Making API Requests (Framer-Compatible)

```typescript
const SHOPIFY_DOMAIN = 'your-store.myshopify.com';
const STOREFRONT_TOKEN = 'your-storefront-access-token';
const API_VERSION = '2024-01';

async function shopifyFetch(query: string, variables = {}) {
  const response = await fetch(
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

  return response.json();
}
```

## Custom Product Options Implementation

This is the heart of building truly custom storefronts. Here's how to implement various customization patterns:

### Pattern 1: Metafields for Product-Level Custom Options

Use metafields to define what custom options a product supports. Store option definitions as JSON in product metafields, then read them when displaying the product:

```typescript
// Query product with custom options metafields
const PRODUCT_WITH_OPTIONS_QUERY = `
  query getProductWithOptions($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 { amount currencyCode }
            availableForSale
          }
        }
      }
      metafields(identifiers: [
        { namespace: "custom", key: "text_options" }
        { namespace: "custom", key: "dropdown_options" }
        { namespace: "custom", key: "checkbox_options" }
      ]) {
        namespace
        key
        value
        type
      }
    }
  }
`;

// Example metafield structure (stored as JSON in Shopify):
// custom.text_options = {
//   "engraving": {
//     "label": "Engraving Text",
//     "maxLength": 50,
//     "price": "5.00"
//   }
// }
```

### Pattern 2: Line Item Properties for Cart Customization

When adding to cart, include custom properties that will carry through to checkout and order:

```typescript
const ADD_TO_CART_WITH_CUSTOM_OPTIONS = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Usage in Framer:
const addToCartWithOptions = async (variantId: string, customOptions: object) => {
  // Convert custom options to attributes array
  const attributes = Object.entries(customOptions).map(([key, value]) => ({
    key,
    value: String(value)
  }));

  const variables = {
    cartId: currentCartId,
    lines: [{
      merchandiseId: variantId,
      quantity: 1,
      attributes: [
        ...attributes,
        // Special attributes for custom pricing
        { key: "_customOptionsPrice", value: "5.00" }
      ]
    }]
  };

  return shopifyFetch(ADD_TO_CART_WITH_CUSTOM_OPTIONS, variables);
};
```

### Pattern 3: Dynamic Pricing with Custom Options

Calculate price adjustments based on custom options and display total price:

```typescript
function calculateCustomOptionsPrice(
  basePrice: number,
  options: Record<string, any>,
  optionsPricing: Record<string, number>
): number {
  let additionalPrice = 0;

  for (const [key, value] of Object.entries(options)) {
    if (value && optionsPricing[key]) {
      additionalPrice += optionsPricing[key];
    }
  }

  return basePrice + additionalPrice;
}

// Framer Component Example
export function ProductPriceWithOptions({ basePrice, selectedOptions, pricingRules }) {
  const totalPrice = calculateCustomOptionsPrice(basePrice, selectedOptions, pricingRules);

  return (
    <div>
      <span className="base-price">Base: ${basePrice}</span>
      {Object.keys(selectedOptions).length > 0 && (
        <span className="options-price">
          + ${(totalPrice - basePrice).toFixed(2)} options
        </span>
      )}
      <span className="total-price">${totalPrice.toFixed(2)}</span>
    </div>
  );
}
```

## Complete Framer Examples

### Example 1: Custom Engraving Product

Full working example of a product with text engraving option:

```typescript
import * as React from "react";

export function CustomEngravingProduct({ productHandle }) {
  const [product, setProduct] = React.useState(null);
  const [engravingText, setEngravingText] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  const [isAdding, setIsAdding] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchProduct();
  }, [productHandle]);

  async function fetchProduct() {
    const query = `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          description
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 { amount currencyCode }
                availableForSale
              }
            }
          }
          metafield(namespace: "custom", key: "engraving_price") {
            value
          }
        }
      }
    `;

    const result = await shopifyFetch(query, { handle: productHandle });
    if (result.data?.product) {
      setProduct(result.data.product);
      setSelectedVariant(result.data.product.variants.edges[0]?.node);
    }
  }

  async function handleAddToCart() {
    if (!selectedVariant) return;

    setIsAdding(true);
    setError(null);

    try {
      const cartId = await getOrCreateCart();
      const engravingPrice = product.metafield?.value || "5.00";

      const attributes = engravingText
        ? [
            { key: "Engraving Text", value: engravingText },
            { key: "_Engraving Price", value: engravingPrice }
          ]
        : [];

      const mutation = `
        mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { id }
            userErrors { field message }
          }
        }
      `;

      const result = await shopifyFetch(mutation, {
        cartId,
        lines: [{
          merchandiseId: selectedVariant.id,
          quantity: 1,
          attributes
        }]
      });

      if (result.data?.cartLinesAdd?.userErrors?.length > 0) {
        setError(result.data.cartLinesAdd.userErrors[0].message);
      } else {
        // Success - show confirmation or redirect to cart
        alert("Added to cart!");
      }
    } catch (err) {
      setError("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  }

  if (!product) return <div>Loading...</div>;

  const engravingPrice = product.metafield?.value || "5.00";

  return (
    <div className="product-with-engraving">
      <h2>{product.title}</h2>
      <p>{product.description}</p>

      {/* Variant selector */}
      <select
        onChange={(e) => {
          const variant = product.variants.edges[parseInt(e.target.value)].node;
          setSelectedVariant(variant);
        }}
      >
        {product.variants.edges.map((edge, i) => (
          <option key={edge.node.id} value={i}>
            {edge.node.title} - ${edge.node.priceV2.amount}
          </option>
        ))}
      </select>

      {/* Custom engraving input */}
      <div className="engraving-section">
        <label>Engraving Text (+ ${engravingPrice})</label>
        <input
          type="text"
          maxLength={50}
          value={engravingText}
          onChange={(e) => setEngravingText(e.target.value)}
          placeholder="Enter text to engrave (optional)"
        />
        <small>{engravingText.length}/50 characters</small>
      </div>

      {error && <div className="error">{error}</div>}

      <button onClick={handleAddToCart} disabled={isAdding || !selectedVariant?.availableForSale}>
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
```

### Example 2: Product Grid with Metafields

Display products with custom badges from metafields:

```typescript
export function ProductGrid() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const query = `
      query getProducts {
        products(first: 20) {
          edges {
            node {
              id
              handle
              title
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              metafield(namespace: "custom", key: "badge") {
                value
              }
            }
          }
        }
      }
    `;

    const response = await shopifyFetch(query);
    setProducts(response.data.products.edges);
    setLoading(false);
  }

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="product-grid">
      {products.map(({ node: product }) => (
        <a key={product.id} href={`/products/${product.handle}`} className="product-card">
          {product.featuredImage && (
            <img src={product.featuredImage.url} alt={product.title} />
          )}
          {product.metafield?.value && (
            <span className="badge">{product.metafield.value}</span>
          )}
          <h3>{product.title}</h3>
          <p className="price">
            {product.priceRange.minVariantPrice.currencyCode} $
            {product.priceRange.minVariantPrice.amount}
          </p>
        </a>
      ))}
    </div>
  );
}
```

## Essential GraphQL Queries

For the complete query library with all 58+ queries, see `references/graphql-queries.md`.

### Quick Reference

**Products & Collections**
- Get products with variants: Use for product listing pages
- Get product by handle: Use for product detail pages
- Get collections: Use for category navigation
- Filter products in collection: Use for filtered category pages

**Cart Operations**
- Create cart: Initialize a new cart (persists 10 days)
- Add lines to cart: Add products with custom attributes
- Update line items: Change quantities or attributes
- Query cart: Get full cart state with line item properties

**Customers** (requires customer access token)
- Create customer: Sign up
- Customer login: Get access token
- Get customer orders: Order history
- Update customer address: Profile management

**Metafields & Metaobjects**
- Query product metafields: Custom data per product
- Query collection metafields: Custom data per collection
- Get metaobjects: Complex custom data structures

## Common Patterns

### Pattern: Product Recommendations

```typescript
const PRODUCT_RECOMMENDATIONS_QUERY = `
  query getRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      featuredImage { url }
      priceRange {
        minVariantPrice { amount currencyCode }
      }
    }
  }
`;
```

### Pattern: Search Products

```typescript
const SEARCH_PRODUCTS_QUERY = `
  query searchProducts($query: String!) {
    products(first: 20, query: $query) {
      edges {
        node {
          id
          title
          handle
          featuredImage { url }
        }
      }
    }
  }
`;

// Usage in Framer:
const searchProducts = (searchTerm: string) => {
  return shopifyFetch(SEARCH_PRODUCTS_QUERY, {
    query: searchTerm
  });
};
```

### Pattern: Cart Persistence (localStorage)

```typescript
// Save cart ID to localStorage for persistence
function saveCartId(cartId: string) {
  localStorage.setItem('shopify_cart_id', cartId);
}

function getCartId(): string | null {
  return localStorage.getItem('shopify_cart_id');
}

async function getOrCreateCart() {
  let cartId = getCartId();

  if (cartId) {
    // Try to fetch existing cart
    const cartQuery = `query getCart($id: ID!) { cart(id: $id) { id } }`;
    const result = await shopifyFetch(cartQuery, { id: cartId });

    if (result.data?.cart) {
      return cartId;
    }
  }

  // Create new cart
  const createMutation = `
    mutation {
      cartCreate {
        cart { id }
      }
    }
  `;

  const result = await shopifyFetch(createMutation);
  const newCartId = result.data.cartCreate.cart.id;
  saveCartId(newCartId);

  return newCartId;
}
```

## Error Handling

Always handle errors gracefully in Framer to provide good user experience:

```typescript
async function safeShopifyFetch(query: string, variables = {}) {
  try {
    const result = await shopifyFetch(query, variables);

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return { error: result.errors[0].message };
    }

    return result.data;
  } catch (error) {
    console.error('Network error:', error);
    return { error: 'Failed to connect to store' };
  }
}

// Usage in component:
const data = await safeShopifyFetch(query);
if (data.error) {
  setErrorMessage(data.error);
  return;
}
```

## Performance Tips

1. **Batch queries**: Fetch multiple products in one query rather than separate requests
2. **Use cursors for pagination**: More efficient than offset-based pagination
3. **Cache aggressively**: Products and collections rarely change
4. **Lazy load images**: Use Framer's Image component with loading="lazy"
5. **Debounce search**: Wait for user to stop typing before searching

```typescript
// Debounce example for search
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
const [searchTerm, setSearchTerm] = React.useState("");
const debouncedSearch = useDebounce(searchTerm, 500);

React.useEffect(() => {
  if (debouncedSearch) {
    searchProducts(debouncedSearch);
  }
}, [debouncedSearch]);
```

## Debugging Tips

1. **Use GraphiQL**: Test queries at `https://your-store.myshopify.com/admin/api/graphiql`
2. **Check browser console**: Log all API responses during development
3. **Validate cart ID**: Carts expire after 10 days
4. **Test without Framer**: Verify queries work in standalone React first
5. **Check metafield namespaces**: Custom metafields need proper namespaces

## Resources

This skill includes comprehensive reference materials:

### references/
- `graphql-queries.md`: Complete library of 58+ GraphQL queries organized by category
- `cart-management.md`: Advanced cart operations and patterns
- `metafields-guide.md`: Deep dive into metafields and metaobjects
- `framer-examples.md`: More Framer integration examples

### scripts/
- `example.py`: Example helper script (can be customized or deleted)

## When to Use This Skill

Use this skill whenever you need to:
- Build a custom Shopify storefront with Framer
- Implement product customization beyond standard variants
- Work with Shopify's GraphQL Storefront API
- Add custom product options (engraving, embroidery, custom text)
- Manage carts with line item properties
- Query products, collections, or customer data
- Implement product recommendations or search
- Work with metafields or metaobjects
- Create checkout experiences with custom attributes

## What This Skill Provides

- Framer-ready React/TypeScript code that works out of the box
- Complete GraphQL query library (58+ queries from official Shopify resources)
- Custom product options implementation patterns
- Cart management with custom properties and attributes
- Metafields and metaobjects guidance
- Error handling and performance optimization
- Real-world code examples tested in production
- Best practices for Shopify + Framer integration
