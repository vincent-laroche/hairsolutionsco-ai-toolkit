---
name: frontend-design
description: "Make design decisions for Shopify stores — color systems, typography, spacing, component patterns, accessibility, responsive design, and CSS architecture. Use when making design decisions, choosing colors and fonts, building design systems, creating CSS custom properties, ensuring accessibility, or establishing visual hierarchy. Triggers: \"design decisions\", \"color palette\", \"typography\", \"design system\", \"CSS variables\", \"visual hierarchy\", \"brand colors\", \"font choice\"."
---

# Frontend Design Decisions for Shopify

Make systematic design decisions for Shopify storefronts — color systems, typography hierarchies, spacing scales, and component patterns.

## Color System

### Setting Up CSS Custom Properties
```css
:root {
  /* Brand Colors */
  --color-primary: #1a1a2e;
  --color-primary-hover: #16213e;
  --color-accent: #d4a853;
  --color-accent-hover: #b8922e;
  
  /* Neutrals */
  --color-white: #ffffff;
  --color-gray-100: #f8f9fa;
  --color-gray-200: #e9ecef;
  --color-gray-500: #6c757d;
  --color-gray-800: #343a40;
  --color-black: #1a1a1a;
  
  /* Semantic */
  --color-text: var(--color-black);
  --color-text-muted: var(--color-gray-500);
  --color-background: var(--color-white);
  --color-surface: var(--color-gray-100);
  --color-border: var(--color-gray-200);
  --color-success: #28a745;
  --color-error: #dc3545;
}
```

### Color Palette Principles
- **60-30-10 Rule**: 60% neutral/background, 30% primary, 10% accent
- Beauty/Hair industry: soft golds, creams, deep navy or forest green perform well
- Ensure 4.5:1 contrast ratio for body text (WCAG AA)
- Test in both light and dark conditions

## Typography System

### Type Scale
```css
:root {
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}
```

### Font Pairing Recommendations for Hair/Beauty

| Combination | Mood | Usage |
|-------------|------|-------|
| Playfair Display + Inter | Luxury, editorial | Premium salon, high-end products |
| Cormorant Garamond + Montserrat | Elegant, modern | Boutique beauty brands |
| DM Serif Display + DM Sans | Clean, contemporary | Modern hair care |
| Libre Baskerville + Source Sans | Classic, trustworthy | Established salon brand |

## Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

## Component Design Patterns

### Button System
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border-radius: 4px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn--primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn--outline {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}
```

### Card System
```css
.card {
  background: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

## Responsive Design

### Breakpoints
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Mobile-first approach */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
```

## Accessibility Checklist

- [ ] Focus states visible on all interactive elements (outline or custom)
- [ ] Color contrast 4.5:1 minimum for normal text, 3:1 for large text
- [ ] All images have meaningful `alt` text (or `alt=""` for decorative)
- [ ] Form inputs have associated `<label>` elements
- [ ] Buttons describe their action (not just "Click here")
- [ ] Skip navigation link for keyboard users
- [ ] Reduced motion query respected:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Visual Hierarchy Principles

1. **Size** — larger = more important
2. **Color** — high contrast = more attention
3. **Weight** — bold text draws eye first
4. **Whitespace** — isolation creates emphasis
5. **Position** — top-left reads first (F-pattern)

### Hero Section Priority Order
```
1. Headline (largest, boldest)
2. Subheadline (clarifies/expands)
3. CTA button (high contrast, prominent)
4. Hero image (complements, doesn't compete)
5. Trust signals (smaller, beneath CTA)
```
