# Homepage section → file map (`templates/index.json`)

Condensed map of the live homepage, in render order, so a section/Notion row name can be traced to its file fast without re-reading `templates/index.json` end to end. Cached snapshot — verify against the live `templates/index.json` if anything seems off (sections can be reordered/added in the theme editor).

| Order | JSON key | Section type (file) | Variant / layout | What it is |
|-------|----------|----------------------|-------------------|------------|
| 1 | `hero` | `sections/hs-home-band.liquid` | `layout: hero`, `tone: media`, `title_style: display` | Full-bleed hero — "Confidence starts at the top" |
| 2 | `stats` | `sections/hs-home-grid.liquid` | `variant: stats`, `tone: dark`, 4 cols | Trust stat tiles (100,000+ customers, 15+ years, 200+ salons, Expert support) |
| 3 | `problem` | `sections/hs-home-band.liquid` | `layout: media`, `tone: media`, `title_style: serif` | Problem/agitation band — "Hat on before you leave the house?" |
| 4 | `solution` | `sections/hs-home-band.liquid` | `layout: split`, `tone: paper`, `image_side: right`, `title_style: serif` | Solution intro — "Modern hair replacement that actually looks real" |
| 5 | `highlights` | `sections/hs-home-grid.liquid` | `variant: features`, `tone: paper`, 4 cols | Feature/benefit tiles (undetectable, fits your life, you control specs, instant transformation) |
| 6 | `categories` | `sections/hs-home-grid.liquid` | `variant: categories`, 3 cols, 6 blocks | "Find your perfect hair system" — Lace/Skin/Mono/Hybrid/Frontal/Maintenance category cards |
| 7 | `process` | `sections/hs-home-process.liquid` | tabbed steps, `title_style: display`, has `accent_color` + video CTA | "Getting started is easier than you think" — 4-step Choose/Customise/Install/Maintain, plus Brian Friedman video testimonial |
| 8 | `testimonials` | `sections/hs-home-grid.liquid` | `variant: testimonials`, `tone: dark`, 2 cols, 4 blocks | "Real men. Real results. Real confidence." customer quotes |
| 9 | `transformation` | `sections/hs-home-band.liquid` | `layout: split`, `tone: paper`, `image_side: left`, `title_style: serif` | "Two paths forward" — without action vs. with Hair Solutions Co. |
| 10 | `faq` | `sections/hs-home-faq.liquid` | 9 FAQ blocks | "Answers to the questions men actually ask before choosing their first system" |
| 11 | `final_cta` | `sections/hs-home-band.liquid` | `layout: cta`, `tone: dark`, `title_style: serif` | Closing CTA — "Your confidence shouldn't have to wait" |
| 12 | `seo_text` | `sections/hs-home-seo.liquid` | — | Hidden/below-fold SEO copy block about Hair Solutions Co. |

## Notes

- Three section types do almost all the homepage's heavy lifting: `hs-home-band` (5 instances — hero/problem/solution/transformation/final_cta, distinguished by `layout` + `tone` + `title_style`), `hs-home-grid` (4 instances — stats/highlights/categories/testimonials, distinguished by `variant`), plus the one-off `hs-home-process` and `hs-home-faq`/`hs-home-seo`.
- When a Notion "Sections" row names a section by its on-page role (e.g. "Hero", "Testimonials", "FAQ"), match it to the `JSON key` column above, then open the corresponding file in `sections/` — but always check the block's `settings`/`type`/`variant` values too, since the same `.liquid` file renders very differently depending on those.
- Image references (`shopify://shop_images/...`) live in `templates/index.json` itself, not in the section files — when swapping homepage imagery, edit the relevant block's `image`/`image_mobile`/`poster` setting in `templates/index.json`.
