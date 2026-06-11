# JavaScript Patterns — Hair Solutions Co.

## Custom Elements (preferred pattern)

```javascript
class ProductQuickView extends HTMLElement {
  connectedCallback() {
    this.querySelector('[data-trigger]')
      ?.addEventListener('click', this.open.bind(this));
  }
  open() {
    const productUrl = this.dataset.productUrl;
    // fetch and display
  }
}
customElements.define('product-quick-view', ProductQuickView);
```

## Event-Driven Communication

```javascript
// Dispatch a custom event
document.dispatchEvent(new CustomEvent('cart:updated', {
  bubbles: true,
  detail: { count: 3, total: 8900 }
}));

// Listen from anywhere
document.addEventListener('cart:updated', ({ detail }) => {
  document.querySelector('.cart-count').textContent = detail.count;
});
```

## Debounce / Throttle

```javascript
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// Usage: search input
searchInput.addEventListener('input', debounce(handleSearch, 400));
```

## Intersection Observer (lazy loading / animations)

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

## Fetch with Error Handling

```javascript
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
```

## Shopify Cart API

```javascript
// Add to cart
async function addToCart(variantId, quantity = 1) {
  return fetchJSON('/cart/add.js', {
    method: 'POST',
    body: JSON.stringify({ id: variantId, quantity })
  });
}

// Get cart
async function getCart() {
  return fetchJSON('/cart.js');
}

// Update line item
async function updateCartItem(lineKey, quantity) {
  return fetchJSON('/cart/change.js', {
    method: 'POST',
    body: JSON.stringify({ id: lineKey, quantity })
  });
}
```

## Alpine.js (if installed)

<!-- TODO: Is Alpine.js installed in the theme? If yes, document how it's used. -->
[PLACEHOLDER — confirm if Alpine is in use and add patterns]

## Theme Global Variables

<!-- TODO: What global JS variables does theme.liquid set?
e.g. window.Shopify, window.theme, window.routes -->
[PLACEHOLDER — inspect theme.liquid and list globals]

## EComposer JS Dependencies

<!-- TODO: What JS does EComposer load that you need to be aware of?
Avoid conflicts with it. -->
[PLACEHOLDER]
