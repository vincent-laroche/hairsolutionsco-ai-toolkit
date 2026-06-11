# Common Shopify Liquid Patterns

Complete, production-ready code patterns for the most common Shopify section types.

## Hero Section with Image/Video Background

```liquid
{%- style -%}
  #shopify-section-{{ section.id }} .hero {
    min-height: {{ section.settings.min_height }}vh;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  #shopify-section-{{ section.id }} .hero__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, {{ section.settings.overlay_opacity | divided_by: 100.0 }});
    z-index: 1;
  }
  #shopify-section-{{ section.id }} .hero__content {
    position: relative;
    z-index: 2;
    text-align: {{ section.settings.text_alignment }};
    color: {{ section.settings.text_color }};
    padding: 80px 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 767px) {
    #shopify-section-{{ section.id }} .hero__content {
      padding: 48px 20px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    #shopify-section-{{ section.id }} video { display: none; }
    #shopify-section-{{ section.id }} .hero__image { display: block !important; }
  }
{%- endstyle -%}

<section class="hero" aria-label="{{ section.settings.heading | escape }}">
  <div class="hero__overlay" aria-hidden="true"></div>

  {%- if section.settings.video != blank -%}
    <video
      class="hero__video"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
      style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
    >
      <source src="{{ section.settings.video }}" type="video/mp4">
    </video>
    {%- if section.settings.image != blank -%}
      {{- section.settings.image | image_url: width: 1500 | image_tag:
        loading: 'eager',
        fetchpriority: 'high',
        alt: section.settings.image.alt | escape,
        class: 'hero__image',
        style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none;'
      -}}
    {%- endif -%}
  {%- elsif section.settings.image != blank -%}
    {{- section.settings.image | image_url: width: 1500 | image_tag:
      loading: 'eager',
      fetchpriority: 'high',
      alt: section.settings.image.alt | escape,
      style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;'
    -}}
  {%- endif -%}

  <div class="hero__content">
    {%- if section.settings.subheading != blank -%}
      <p class="hero__subheading">{{ section.settings.subheading | escape }}</p>
    {%- endif -%}
    {%- if section.settings.heading != blank -%}
      <h1 class="hero__heading">{{ section.settings.heading | escape }}</h1>
    {%- endif -%}
    {%- if section.settings.body != blank -%}
      <div class="hero__body">{{ section.settings.body }}</div>
    {%- endif -%}
    {%- if section.settings.button_label != blank -%}
      <a
        href="{{ section.settings.button_url }}"
        class="hero__cta button"
        {%- if section.settings.button_url == blank %} aria-disabled="true"{%- endif -%}
      >
        {{ section.settings.button_label | escape }}
      </a>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Hero",
  "tag": "section",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Background image"
    },
    {
      "type": "url",
      "id": "video",
      "label": "Background video URL (.mp4)",
      "info": "Video plays silently. Image shows as fallback or when reduced motion is enabled."
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Welcome to our store"
    },
    {
      "type": "richtext",
      "id": "body",
      "label": "Body text"
    },
    {
      "type": "text",
      "id": "button_label",
      "label": "Button label",
      "default": "Shop now"
    },
    {
      "type": "url",
      "id": "button_url",
      "label": "Button link"
    },
    {
      "type": "range",
      "id": "min_height",
      "min": 40,
      "max": 100,
      "step": 5,
      "unit": "vh",
      "label": "Section height",
      "default": 70
    },
    {
      "type": "range",
      "id": "overlay_opacity",
      "min": 0,
      "max": 80,
      "step": 5,
      "unit": "%",
      "label": "Image overlay opacity",
      "default": 40
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text color",
      "default": "#ffffff"
    },
    {
      "type": "select",
      "id": "text_alignment",
      "label": "Text alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ],
      "default": "center"
    }
  ],
  "presets": [
    { "name": "Hero" }
  ]
}
{% endschema %}
```

---

## FAQ Accordion

```liquid
{%- style -%}
  #shopify-section-{{ section.id }} .faq { padding: 80px 40px; }
  #shopify-section-{{ section.id }} .faq__item {
    border-bottom: 1px solid currentColor;
    opacity: 0.2;
  }
  #shopify-section-{{ section.id }} .faq__question {
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    padding: 24px 0;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    min-height: 44px; /* touch target */
  }
  #shopify-section-{{ section.id }} .faq__question:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
    border-radius: 2px;
  }
  #shopify-section-{{ section.id }} .faq__answer {
    overflow: hidden;
    transition: max-height 250ms ease;
    max-height: 0;
  }
  #shopify-section-{{ section.id }} .faq__answer[aria-hidden="false"] {
    max-height: 500px;
  }
  @media (prefers-reduced-motion: reduce) {
    #shopify-section-{{ section.id }} .faq__answer { transition: none; }
  }
  @media (max-width: 767px) {
    #shopify-section-{{ section.id }} .faq { padding: 48px 20px; }
  }
{%- endstyle -%}

<div class="faq">
  {%- if section.settings.heading != blank -%}
    <h2>{{ section.settings.heading | escape }}</h2>
  {%- endif -%}

  {%- for block in section.blocks -%}
    {%- case block.type -%}
      {%- when 'question' -%}
        <div class="faq__item" {{ block.shopify_attributes }}>
          <button
            class="faq__question"
            aria-expanded="false"
            aria-controls="faq-answer-{{ block.id }}"
            id="faq-question-{{ block.id }}"
          >
            {{ block.settings.question | escape }}
            <span aria-hidden="true" class="faq__icon">+</span>
          </button>
          <div
            class="faq__answer"
            id="faq-answer-{{ block.id }}"
            role="region"
            aria-labelledby="faq-question-{{ block.id }}"
            aria-hidden="true"
          >
            <div style="padding-bottom: 24px;">{{ block.settings.answer }}</div>
          </div>
        </div>
    {%- endcase -%}
  {%- endfor -%}
</div>

<script>
  (function() {
    var section = document.getElementById('shopify-section-{{ section.id }}');
    section.querySelectorAll('.faq__question').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        var answer = section.querySelector('#' + this.getAttribute('aria-controls'));
        this.setAttribute('aria-expanded', !expanded);
        answer.setAttribute('aria-hidden', expanded);
        this.querySelector('.faq__icon').textContent = expanded ? '+' : '−';
      });
    });
  })();
</script>

{% schema %}
{
  "name": "FAQ",
  "blocks": [
    {
      "type": "question",
      "name": "Question",
      "settings": [
        { "type": "text", "id": "question", "label": "Question", "default": "Frequently asked question" },
        { "type": "richtext", "id": "answer", "label": "Answer", "default": "<p>Your answer here.</p>" }
      ]
    }
  ],
  "settings": [
    { "type": "text", "id": "heading", "label": "Section heading", "default": "Frequently asked questions" }
  ],
  "presets": [{ "name": "FAQ" }]
}
{% endschema %}
```

---

## Before/After Image Slider (Hair & Beauty)

```liquid
{%- style -%}
  #shopify-section-{{ section.id }} .before-after {
    position: relative;
    overflow: hidden;
    cursor: ew-resize;
    user-select: none;
    border-radius: {{ section.settings.border_radius }}px;
    max-width: {{ section.settings.max_width }}px;
    margin: 0 auto;
  }
  #shopify-section-{{ section.id }} .before-after__after {
    position: absolute;
    inset: 0;
    overflow: hidden;
    width: 50%;
  }
  #shopify-section-{{ section.id }} .before-after__after img {
    width: calc(100% / 0.5);
    max-width: none;
    height: 100%;
    object-fit: cover;
  }
  #shopify-section-{{ section.id }} .before-after__handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 44px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ew-resize;
  }
  #shopify-section-{{ section.id }} .before-after__handle-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: white;
  }
  #shopify-section-{{ section.id }} .before-after__label {
    position: absolute;
    top: 16px;
    background: rgba(0,0,0,0.6);
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  #shopify-section-{{ section.id }} .before-after__label--before { left: 16px; }
  #shopify-section-{{ section.id }} .before-after__label--after { right: 16px; }
{%- endstyle -%}

<div
  class="before-after"
  role="img"
  aria-label="{{ section.settings.before_label | escape }} and {{ section.settings.after_label | escape }} comparison"
  id="ba-{{ section.id }}"
>
  {%- if section.settings.before_image != blank -%}
    {{- section.settings.before_image | image_url: width: 1200 | image_tag:
      loading: 'lazy',
      alt: section.settings.before_label | append: ' - ' | append: section.settings.before_image.alt | escape,
      style: 'width:100%;height:100%;object-fit:cover;display:block;'
    -}}
  {%- endif -%}

  {%- if section.settings.after_image != blank -%}
    <div class="before-after__after" id="ba-after-{{ section.id }}">
      {{- section.settings.after_image | image_url: width: 1200 | image_tag:
        loading: 'lazy',
        alt: section.settings.after_label | append: ' - ' | append: section.settings.after_image.alt | escape
      -}}
    </div>
  {%- endif -%}

  <div class="before-after__handle" id="ba-handle-{{ section.id }}" aria-hidden="true">
    <div class="before-after__handle-line"></div>
  </div>

  <span class="before-after__label before-after__label--before">{{ section.settings.before_label | escape }}</span>
  <span class="before-after__label before-after__label--after">{{ section.settings.after_label | escape }}</span>
</div>

<script>
(function() {
  var container = document.getElementById('ba-{{ section.id }}');
  var afterEl = document.getElementById('ba-after-{{ section.id }}');
  var handleEl = document.getElementById('ba-handle-{{ section.id }}');
  if (!container || !afterEl) return;

  function setPosition(x) {
    var rect = container.getBoundingClientRect();
    var pct = Math.min(Math.max((x - rect.left) / rect.width, 0.05), 0.95);
    afterEl.style.width = pct * 100 + '%';
    afterEl.querySelector('img').style.width = (100 / pct) + '%';
    handleEl.style.left = pct * 100 + '%';
  }

  var dragging = false;
  container.addEventListener('mousedown', function(e) { dragging = true; setPosition(e.clientX); });
  window.addEventListener('mousemove', function(e) { if (dragging) setPosition(e.clientX); });
  window.addEventListener('mouseup', function() { dragging = false; });
  container.addEventListener('touchmove', function(e) { e.preventDefault(); setPosition(e.touches[0].clientX); }, { passive: false });
})();
</script>

{% schema %}
{
  "name": "Before / After",
  "settings": [
    { "type": "image_picker", "id": "before_image", "label": "Before image" },
    { "type": "image_picker", "id": "after_image", "label": "After image" },
    { "type": "text", "id": "before_label", "label": "Before label", "default": "Before" },
    { "type": "text", "id": "after_label", "label": "After label", "default": "After" },
    { "type": "range", "id": "border_radius", "min": 0, "max": 24, "step": 2, "unit": "px", "label": "Corner radius", "default": 12 },
    { "type": "range", "id": "max_width", "min": 400, "max": 1200, "step": 50, "label": "Max width (px)", "default": 800 }
  ],
  "presets": [{ "name": "Before / After Slider" }]
}
{% endschema %}
```

---

## Announcement Bar with Optional Countdown

```liquid
{%- if section.settings.text != blank -%}
{%- style -%}
  #shopify-section-{{ section.id }} .announcement {
    background: {{ section.settings.background_color }};
    color: {{ section.settings.text_color }};
    padding: 10px 20px;
    text-align: center;
    font-size: 0.875rem;
  }
  #shopify-section-{{ section.id }} .announcement a {
    color: inherit;
    text-decoration: underline;
  }
{%- endstyle -%}
<div class="announcement" role="status" aria-live="polite">
  <p>
    {{ section.settings.text }}
    {%- if section.settings.end_time != blank -%}
      &nbsp;Ends in <span id="countdown-{{ section.id }}" aria-live="off"></span>
    {%- endif -%}
  </p>
</div>

{%- if section.settings.end_time != blank -%}
<script>
(function() {
  var end = new Date("{{ section.settings.end_time }}").getTime();
  var el = document.getElementById('countdown-{{ section.id }}');
  if (!el || isNaN(end)) return;
  function tick() {
    var now = Date.now(), diff = end - now;
    if (diff <= 0) { el.textContent = '00:00:00'; return; }
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    el.textContent = [h, m, s].map(function(n){ return String(n).padStart(2,'0'); }).join(':');
    setTimeout(tick, 1000);
  }
  tick();
})();
</script>
{%- endif -%}
{%- endif -%}

{% schema %}
{
  "name": "Announcement bar",
  "settings": [
    { "type": "richtext", "id": "text", "label": "Announcement text", "default": "<p>Free shipping on orders over $75</p>" },
    { "type": "text", "id": "end_time", "label": "Countdown end time (ISO 8601)", "info": "Example: 2025-12-31T23:59:59. Leave blank to hide countdown." },
    { "type": "color", "id": "background_color", "label": "Background color", "default": "#1a1a1a" },
    { "type": "color", "id": "text_color", "label": "Text color", "default": "#ffffff" }
  ],
  "presets": [{ "name": "Announcement bar" }]
}
{% endschema %}
```