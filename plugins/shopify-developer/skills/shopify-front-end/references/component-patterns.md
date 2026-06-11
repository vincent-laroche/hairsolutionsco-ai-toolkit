# Component Patterns — Hair Solutions Co.

## Product Card

```liquid
<div class="product-card">
  <a href="{{ product.url }}" class="product-card__image-link">
    {{
      product.featured_image
      | image_url: width: 800
      | image_tag:
        loading: 'lazy',
        widths: '375, 550, 800',
        sizes: '(max-width: 768px) 50vw, 25vw',
        class: 'product-card__image',
        alt: product.featured_image.alt
    }}
  </a>
  <div class="product-card__info">
    <h3 class="product-card__title">{{ product.title }}</h3>
    <p class="product-card__price">{{ product.price | money }}</p>
  </div>
</div>
```

## Responsive Grid

```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .products-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .products-grid { grid-template-columns: 1fr; gap: 16px; } }
```

## Button Patterns

```html
<!-- Primary button -->
<button class="btn btn--primary" type="button">Shop Now</button>

<!-- Secondary / outline button -->
<button class="btn btn--secondary" type="button">Learn More</button>

<!-- Loading state -->
<button class="btn btn--primary btn--loading" type="button" disabled>
  <span class="btn__text">Add to Cart</span>
  <span class="btn__spinner" aria-hidden="true"></span>
</button>
```

## Sticky Header Pattern

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-background);
  transition: box-shadow 0.2s ease;
}
.site-header.scrolled {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
```

## Accordion / FAQ

```html
<div class="accordion">
  <button class="accordion__trigger" aria-expanded="false" aria-controls="panel-1">
    Question text
  </button>
  <div class="accordion__panel" id="panel-1" hidden>
    Answer text
  </div>
</div>
```
```javascript
document.querySelectorAll('.accordion__trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    panel.hidden = expanded;
  });
});
```

## Modal Pattern

```html
<dialog class="modal" id="modal-1">
  <div class="modal__inner">
    <button class="modal__close" aria-label="Close">✕</button>
    <!-- content -->
  </div>
</dialog>
```
```javascript
const modal = document.getElementById('modal-1');
document.querySelector('[data-modal-open="modal-1"]').addEventListener('click', () => modal.showModal());
modal.querySelector('.modal__close').addEventListener('click', () => modal.close());
```
