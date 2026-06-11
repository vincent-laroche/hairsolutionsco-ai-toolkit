# Responsive Design in Horizon

## Mobile-First Philosophy

Horizon is built mobile-first. Always design for mobile, then enhance for desktop.

## Breakpoints

Horizon uses standard Shopify breakpoints:

```css
/* Mobile: Default (< 750px) */

/* Tablet: 750px - 989px */
@media (min-width: 750px) {
  /* Tablet styles */
}

/* Desktop: 990px+ */
@media (min-width: 990px) {
  /* Desktop styles */
}

/* Large Desktop: 1200px+ */
@media (min-width: 1200px) {
  /* Large desktop styles */
}
```

## Different Images for Desktop/Mobile

### Method 1: Using Section Settings (Recommended)

**Section Schema:**

```json
{
  "settings": [
    {
      "type": "image_picker",
      "id": "desktop_image",
      "label": "Desktop image"
    },
    {
      "type": "image_picker",
      "id": "mobile_image",
      "label": "Mobile image"
    }
  ]
}
```

**Section Liquid:**

```liquid
{% if section.settings.mobile_image %}
  <div class="image-mobile">
    {{ section.settings.mobile_image | image_url: width: 750 | image_tag: 
      loading: 'lazy',
      widths: '375, 550, 750',
      sizes: '100vw'
    }}
  </div>
{% endif %}

{% if section.settings.desktop_image %}
  <div class="image-desktop">
    {{ section.settings.desktop_image | image_url: width: 1400 | image_tag: 
      loading: 'lazy',
      widths: '750, 990, 1200, 1400',
      sizes: '100vw'
    }}
  </div>
{% endif %}

<style>
  .image-mobile { display: block; }
  .image-desktop { display: none; }
  
  @media (min-width: 750px) {
    .image-mobile { display: none; }
    .image-desktop { display: block; }
  }
</style>
```

### Method 2: Using Picture Element

```liquid
<picture>
  <source 
    media="(min-width: 750px)" 
    srcset="{{ section.settings.desktop_image | image_url: width: 1400 }}">
  <img 
    src="{{ section.settings.mobile_image | image_url: width: 750 }}"
    alt="{{ section.settings.heading }}">
</picture>
```

### Method 3: CSS Background Images

```liquid
<div class="hero-section section-{{ section.id }}"></div>

<style>
  .section-{{ section.id }} {
    background-image: url('{{ section.settings.mobile_image | image_url: width: 750 }}');
    background-size: cover;
    background-position: center;
  }
  
  @media (min-width: 750px) {
    .section-{{ section.id }} {
      background-image: url('{{ section.settings.desktop_image | image_url: width: 1400 }}');
    }
  }
</style>
```

## Responsive Grid Layouts

### CSS Grid Pattern

```liquid
<div class="grid-container">
  {% for product in collection.products limit: 12 %}
    <div class="grid-item">
      {% render 'product-card', product: product %}
    </div>
  {% endfor %}
</div>

<style>
  .grid-container {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr); /* 2 columns on mobile */
  }
  
  @media (min-width: 750px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr); /* 3 columns on tablet */
    }
  }
  
  @media (min-width: 990px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr); /* 4 columns on desktop */
    }
  }
</style>
```

### Dynamic Grid with Settings

**Schema:**

```json
{
  "type": "range",
  "id": "columns_mobile",
  "label": "Columns on mobile",
  "min": 1,
  "max": 2,
  "default": 2
},
{
  "type": "range",
  "id": "columns_desktop",
  "label": "Columns on desktop",
  "min": 2,
  "max": 5,
  "default": 4
}
```

**Liquid:**

```liquid
<div class="grid-container section-{{ section.id }}">
  <!-- Grid items -->
</div>

<style>
  .section-{{ section.id }} .grid-container {
    display: grid;
    gap: var(--grid-gap, 20px);
    grid-template-columns: repeat({{ section.settings.columns_mobile }}, 1fr);
  }
  
  @media (min-width: 750px) {
    .section-{{ section.id }} .grid-container {
      grid-template-columns: repeat({{ section.settings.columns_desktop }}, 1fr);
    }
  }
</style>
```

## Responsive Typography

### Method 1: Media Query Approach

```css
.heading {
  font-size: 24px;
  line-height: 1.2;
}

@media (min-width: 750px) {
  .heading {
    font-size: 32px;
  }
}

@media (min-width: 990px) {
  .heading {
    font-size: 48px;
  }
}
```

### Method 2: CSS Clamp (Modern, Fluid)

```css
.heading {
  font-size: clamp(24px, 4vw, 48px);
  /* Min: 24px, Preferred: 4% of viewport width, Max: 48px */
}
```

### Method 3: Dynamic with Settings

**Schema:**

```json
{
  "type": "range",
  "id": "heading_size_mobile",
  "label": "Heading size (mobile)",
  "min": 16,
  "max": 40,
  "unit": "px",
  "default": 24
},
{
  "type": "range",
  "id": "heading_size_desktop",
  "label": "Heading size (desktop)",
  "min": 24,
  "max": 72,
  "unit": "px",
  "default": 48
}
```

**Liquid:**

```liquid
<style>
  .section-{{ section.id }} .heading {
    font-size: {{ section.settings.heading_size_mobile }}px;
  }
  
  @media (min-width: 750px) {
    .section-{{ section.id }} .heading {
      font-size: {{ section.settings.heading_size_desktop }}px;
    }
  }
</style>
```

## Responsive Spacing

### Padding Settings

**Schema:**

```json
{
  "type": "range",
  "id": "padding_top_mobile",
  "label": "Top padding (mobile)",
  "min": 0,
  "max": 100,
  "step": 5,
  "unit": "px",
  "default": 30
},
{
  "type": "range",
  "id": "padding_top_desktop",
  "label": "Top padding (desktop)",
  "min": 0,
  "max": 150,
  "step": 5,
  "unit": "px",
  "default": 60
}
```

**Liquid:**

```liquid
<style>
  .section-{{ section.id }} {
    padding-top: {{ section.settings.padding_top_mobile }}px;
    padding-bottom: {{ section.settings.padding_bottom_mobile }}px;
  }
  
  @media (min-width: 750px) {
    .section-{{ section.id }} {
      padding-top: {{ section.settings.padding_top_desktop }}px;
      padding-bottom: {{ section.settings.padding_bottom_desktop }}px;
    }
  }
</style>
```

## Responsive Content Alignment

```liquid
<div class="content-container section-{{ section.id }}">
  <h2>{{ section.settings.heading }}</h2>
  <p>{{ section.settings.text }}</p>
</div>

<style>
  .section-{{ section.id }} .content-container {
    text-align: {{ section.settings.alignment_mobile }};
  }
  
  @media (min-width: 750px) {
    .section-{{ section.id }} .content-container {
      text-align: {{ section.settings.alignment_desktop }};
    }
  }
</style>
```

**Schema:**

```json
{
  "type": "select",
  "id": "alignment_mobile",
  "label": "Text alignment (mobile)",
  "options": [
    { "value": "left", "label": "Left" },
    { "value": "center", "label": "Center" },
    { "value": "right", "label": "Right" }
  ],
  "default": "center"
},
{
  "type": "select",
  "id": "alignment_desktop",
  "label": "Text alignment (desktop)",
  "options": [
    { "value": "left", "label": "Left" },
    { "value": "center", "label": "Center" },
    { "value": "right", "label": "Right" }
  ],
  "default": "left"
}
```

## Show/Hide Elements by Device

### Using Display Settings

**Schema:**

```json
{
  "type": "checkbox",
  "id": "show_on_mobile",
  "label": "Show on mobile",
  "default": true
},
{
  "type": "checkbox",
  "id": "show_on_desktop",
  "label": "Show on desktop",
  "default": true
}
```

**Liquid:**

```liquid
<div class="element section-{{ section.id }}-element">
  <!-- Content -->
</div>

<style>
  .section-{{ section.id }}-element {
    {% unless section.settings.show_on_mobile %}
      display: none;
    {% endunless %}
  }
  
  @media (min-width: 750px) {
    .section-{{ section.id }}-element {
      {% if section.settings.show_on_mobile and section.settings.show_on_desktop %}
        display: block;
      {% elsif section.settings.show_on_desktop %}
        display: block;
      {% else %}
        display: none;
      {% endif %}
    }
  }
</style>
```

## Responsive Videos

### Video with Different Sources

```liquid
<div class="video-container">
  {% if section.settings.video_mobile and section.settings.video_desktop %}
    <video class="video-mobile" autoplay muted loop playsinline>
      <source src="{{ section.settings.video_mobile }}" type="video/mp4">
    </video>
    <video class="video-desktop" autoplay muted loop playsinline>
      <source src="{{ section.settings.video_desktop }}" type="video/mp4">
    </video>
  {% elsif section.settings.video %}
    <video autoplay muted loop playsinline>
      <source src="{{ section.settings.video }}" type="video/mp4">
    </video>
  {% endif %}
</div>

<style>
  .video-mobile { display: block; }
  .video-desktop { display: none; }
  
  @media (min-width: 750px) {
    .video-mobile { display: none; }
    .video-desktop { display: block; }
  }
</style>
```

## Flexbox Responsive Patterns

### Stack on Mobile, Row on Desktop

```liquid
<div class="flex-container">
  <div class="flex-item">Content 1</div>
  <div class="flex-item">Content 2</div>
  <div class="flex-item">Content 3</div>
</div>

<style>
  .flex-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  @media (min-width: 750px) {
    .flex-container {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
```

### Reverse Order on Mobile

```liquid
<div class="flex-container">
  <div class="flex-item image">Image</div>
  <div class="flex-item text">Text</div>
</div>

<style>
  .flex-container {
    display: flex;
    flex-direction: column-reverse; /* Text first, then image on mobile */
  }
  
  @media (min-width: 750px) {
    .flex-container {
      flex-direction: row; /* Image left, text right on desktop */
    }
  }
</style>
```

## Container Width Control

```liquid
<div class="section-container section-{{ section.id }}">
  <div class="content-wrapper">
    <!-- Content -->
  </div>
</div>

<style>
  .section-{{ section.id }} .content-wrapper {
    max-width: 100%;
    padding: 0 20px;
  }
  
  @media (min-width: 750px) {
    .section-{{ section.id }} .content-wrapper {
      max-width: {{ section.settings.container_width }}px;
      margin: 0 auto;
      padding: 0 40px;
    }
  }
</style>
```

**Schema:**

```json
{
  "type": "select",
  "id": "container_width",
  "label": "Container width",
  "options": [
    { "value": "1200", "label": "Standard (1200px)" },
    { "value": "1400", "label": "Wide (1400px)" },
    { "value": "100%", "label": "Full width" }
  ],
  "default": "1200"
}
```

## Touch-Friendly Design

### Larger Tap Targets on Mobile

```css
.button {
  padding: 12px 24px;
  min-height: 44px; /* Apple's recommended minimum */
  font-size: 16px;
}

@media (min-width: 750px) {
  .button {
    padding: 10px 20px;
    min-height: auto;
    font-size: 14px;
  }
}
```

### Mobile Navigation Patterns

```liquid
<nav class="main-nav">
  <button class="mobile-menu-toggle">
    Menu
  </button>
  
  <ul class="nav-links">
    {% for link in linklists.main-menu.links %}
      <li><a href="{{ link.url }}">{{ link.title }}</a></li>
    {% endfor %}
  </ul>
</nav>

<style>
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-links {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: white;
  }
  
  .nav-links.is-open {
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 990px) {
    .mobile-menu-toggle {
      display: none;
    }
    
    .nav-links {
      display: flex !important;
      position: static;
      height: auto;
      flex-direction: row;
    }
  }
</style>
```

## Best Practices

1. **Test on real devices**: Simulators don't always match real performance
2. **Optimize images**: Use `widths` and `sizes` attributes
3. **Touch targets**: Minimum 44x44px on mobile
4. **Font sizes**: Minimum 16px to prevent auto-zoom on iOS
5. **Avoid horizontal scrolling**: Set `max-width: 100%` on large elements
6. **Performance first**: Mobile users often have slower connections
7. **Progressive enhancement**: Core functionality works without JS

## Common Responsive Issues

### Images Breaking Layout

```css
img {
  max-width: 100%;
  height: auto;
}
```

### Text Overflow

```css
.text-container {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

### Fixed Width Elements

```css
/* Bad */
.element { width: 500px; }

/* Good */
.element { 
  width: 100%; 
  max-width: 500px; 
}
```
