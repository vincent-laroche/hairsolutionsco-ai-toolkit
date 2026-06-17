// WebTypography.jsx — exact font-size + weight per web section.
// A reference card showing every text style used by the four web pages.

const TypeRow = ({ label, sample, family = "Instrument Serif", size, weight, lh, tracking, transform, color = "var(--ink)", element }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "240px 1fr 360px",
    gap: 24,
    padding: "20px 0",
    borderTop: "1px solid var(--border)",
    alignItems: "baseline",
  }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>{label}</div>
      <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-muted)", marginTop: 2 }}>{element}</div>
    </div>
    <div style={{
      fontFamily: family === "Geist Mono" ? "var(--f-mono)" : "var(--f-sans)",
      fontSize: size,
      fontWeight: weight,
      lineHeight: lh,
      letterSpacing: tracking,
      textTransform: transform,
      color,
      maxWidth: "100%",
      overflow: "hidden",
    }}>{sample}</div>
    <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.7 }}>
      <div><b>family</b> {family}</div>
      <div><b>size / lh</b> {size}px · {lh}</div>
      <div><b>weight</b> {weight}</div>
      <div><b>tracking</b> {tracking || "0"}</div>
      {transform && <div><b>transform</b> {transform}</div>}
    </div>
  </div>
);

const TypeGroup = ({ title, intro, rows }) => (
  <div className="hsc-card" style={{ padding: "28px 32px 12px", marginBottom: 18 }}>
    <div style={{ marginBottom: 10 }}>
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{title}</h3>
      {intro && <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ink-muted)", lineHeight: 1.55, maxWidth: "72ch" }}>{intro}</p>}
    </div>
    <div>{rows.map((r, i) => <TypeRow key={i} {...r} />)}</div>
  </div>
);

const WebTypographyGuide = ({ direction = "refined" }) => (
  <div className={`hsc-surface dir-${direction}`} style={{ padding: 40, background: "var(--bg)", color: "var(--ink)", width: 1440, maxWidth: "100%" }}>

    <div style={{ marginBottom: 24 }}>
      <Eyebrow>Web · Typography reference</Eyebrow>
      <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 8px", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em" }}>Every text style, by section.</h2>
      <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)", maxWidth: "70ch", lineHeight: 1.55 }}>
        All web type is set in <b>Geist</b> (Regular / Medium / Bold / Extra Bold) with <b>Geist Mono</b> for spec, price and code. Base body is 16px / 1.6. The fallback stack is <code>'Instrument Serif', Geist, 'Helvetica Neue', Helvetica, Arial, sans-serif</code> — every value below is the spec we hand to engineering, not a guideline.
      </p>
    </div>

    {/* ─── Family + scale anchor ───────────────────── */}
    <TypeGroup
      title="01 · Foundations"
      intro="Two families, one body anchor. Everything below scales from a 16px base."
      rows={[
        { label: "Display 1 · hero page", sample: "A second chance.", element: "h1.display", size: 80, weight: 700, lh: 0.98, tracking: "-0.035em" },
        { label: "Display 2 · about hero", sample: "We make hair for the men.", element: "h1.about-hero", size: 72, weight: 700, lh: 0.98, tracking: "-0.032em" },
        { label: "Heading 1", sample: "The bases · Spring 26", element: "h1", size: 68, weight: 700, lh: 1, tracking: "-0.032em" },
        { label: "Heading 2 · section", sample: "Pick your base.", element: "h2", size: 44, weight: 700, lh: 1.05, tracking: "-0.025em" },
        { label: "Heading 3 · sub-section", sample: "Cut, ventilated, pressed.", element: "h3", size: 32, weight: 700, lh: 1.1, tracking: "-0.02em" },
        { label: "Heading 4 · card", sample: "French Lace · 115%", element: "h4", size: 22, weight: 600, lh: 1.25, tracking: "-0.015em" },
        { label: "Body L · intro", sample: "We measure, match, and ship a system built for your scalp — not a stock cap.", element: "p.lead", size: 19, weight: 400, lh: 1.55, tracking: "0", color: "var(--ink-soft)" },
        { label: "Body M · paragraph", sample: "Every system spends about 22 hours under a builder's hands.", element: "p", size: 16, weight: 400, lh: 1.6, color: "var(--ink-soft)" },
        { label: "Body S · caption / fine print", sample: "Excludes new system builds. One use per account.", element: "p.small", size: 13, weight: 400, lh: 1.55, color: "var(--ink-muted)" },
        { label: "Eyebrow · section label", sample: "Mens hair systems · made-to-measure", element: ".eyebrow", size: 11, weight: 700, lh: 1, tracking: "0.16em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Caps utility · cta / pill", sample: "Start my consult", element: ".cta", size: 12, weight: 700, lh: 1, tracking: "0.1em", transform: "uppercase" },
        { label: "Mono · price / spec", sample: "$1,840 CAD", element: "span.mono", family: "Geist Mono", size: 14, weight: 700, lh: 1.4, tracking: "0" },
      ]}
    />

    {/* ─── Navigation + header ─────────────────────── */}
    <TypeGroup
      title="02 · Navigation + announcement bar"
      intro="Persistent across every page."
      rows={[
        { label: "Announcement bar", sample: "Spring 26 systems · 10-day build · free first-order returns", element: "nav.announce", size: 11, weight: 700, lh: 1, tracking: "0.16em", transform: "uppercase", color: "var(--paper)" },
        { label: "Main nav link", sample: "Systems    Care kit    How it works", element: "nav.main a", size: 13, weight: 600, lh: 1.5, tracking: "0.02em" },
        { label: "Utility nav (Account, EN·CAD)", sample: "Account · EN · CAD", element: "nav.utility", size: 12, weight: 600, lh: 1.5, tracking: "0.02em" },
        { label: "Nav CTA · 'Find my fit'", sample: "Find my fit", element: "nav button.primary", size: 11, weight: 700, lh: 1, tracking: "0.1em", transform: "uppercase", color: "var(--paper)" },
      ]}
    />

    {/* ─── Home page hero + stat band ──────────────── */}
    <TypeGroup
      title="03 · Home — hero + stat band"
      intro="The first 1000px of the homepage."
      rows={[
        { label: "Hero eyebrow", sample: "Mens hair systems · made-to-measure", element: ".hero .eyebrow", size: 11, weight: 700, lh: 1, tracking: "0.16em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Hero headline", sample: "A second chance at the hairline you remember.", element: ".hero h1", size: 72, weight: 700, lh: 0.98, tracking: "-0.032em" },
        { label: "Hero supporting copy", sample: "We measure, match, and ship a system built for your scalp.", element: ".hero p.lead", size: 17, weight: 400, lh: 1.55, color: "var(--ink-soft)" },
        { label: "Hero stat number", sample: "4,200+", element: ".stat .number", size: 28, weight: 700, lh: 1, tracking: "-0.02em" },
        { label: "Hero stat label", sample: "Systems built", element: ".stat .label", size: 11, weight: 600, lh: 1, tracking: "0.08em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Primary CTA", sample: "Start my consult", element: ".cta-primary", size: 13, weight: 700, lh: 1, tracking: "0.02em", transform: "uppercase", color: "var(--paper)" },
        { label: "Secondary CTA", sample: "See how it works", element: ".cta-secondary", size: 13, weight: 700, lh: 1, tracking: "0.02em", transform: "uppercase" },
      ]}
    />

    {/* ─── Product cards ───────────────────────────── */}
    <TypeGroup
      title="04 · Product cards + collection grid"
      intro="Used on homepage product row, collection grid, cross-sell."
      rows={[
        { label: "Section title", sample: "Pick your base.", element: "section h2", size: 40, weight: 700, lh: 1.05, tracking: "-0.025em" },
        { label: "Section meta (right-aligned)", sample: "4 bases · 1 perfect fit", element: "section .meta", size: 13, weight: 400, lh: 1.5, color: "var(--ink-muted)" },
        { label: "Card title", sample: "French Lace", element: ".card h4", size: 17, weight: 600, lh: 1.3, tracking: "-0.01em" },
        { label: "Card description", sample: "Invisible hairline", element: ".card p", size: 13, weight: 400, lh: 1.5, color: "var(--ink-muted)" },
        { label: "Card price (mono)", sample: "from $1,840", element: ".card .price", family: "Geist Mono", size: 12, weight: 700, lh: 1.4 },
        { label: "Card 'View →' link", sample: "View →", element: ".card a.cta", size: 11, weight: 700, lh: 1, tracking: "0.1em", transform: "uppercase" },
        { label: "Filter chip — default", sample: "Skin · 3", element: ".filter.chip", size: 12, weight: 600, lh: 1.4 },
        { label: "Filter chip — active", sample: "All bases · 12", element: ".filter.chip.active", size: 12, weight: 600, lh: 1.4, color: "var(--paper)" },
      ]}
    />

    {/* ─── Process steps + feature split ───────────── */}
    <TypeGroup
      title="05 · Process steps + feature split"
      intro="Repeated section blocks; same sizing on Home, About, Product."
      rows={[
        { label: "Section eyebrow", sample: "How it works", element: ".process .eyebrow", size: 11, weight: 700, lh: 1, tracking: "0.16em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Section title (centered)", sample: "Four steps. Ten days. Done.", element: ".process h2", size: 44, weight: 700, lh: 1.05, tracking: "-0.025em" },
        { label: "Step number (mono)", sample: "01", element: ".step .num", family: "Geist Mono", size: 11, weight: 700, lh: 1, tracking: "0.12em", color: "var(--ink-muted)" },
        { label: "Step title", sample: "Mould", element: ".step h3", size: 24, weight: 700, lh: 1.2, tracking: "-0.02em" },
        { label: "Step description", sample: "8-minute tape kit, made at home or in our Toronto room.", element: ".step p", size: 14, weight: 400, lh: 1.55, color: "var(--ink-soft)" },
        { label: "Feature split eyebrow", sample: "The craft", element: ".feature .eyebrow", size: 11, weight: 700, lh: 1, tracking: "0.16em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Feature split headline", sample: "Cut, ventilated, and pressed by hand.", element: ".feature h2", size: 44, weight: 700, lh: 1.05, tracking: "-0.025em" },
        { label: "Feature split body", sample: "Every system spends about 22 hours under a builder's hands.", element: ".feature p", size: 16, weight: 400, lh: 1.6, color: "var(--ink-soft)" },
      ]}
    />

    {/* ─── Quote + journal + CTA banner ────────────── */}
    <TypeGroup
      title="06 · Quote, journal, CTA banner"
      rows={[
        { label: "Quote · pull text", sample: '"I forgot it was on. Three months in, the hairline still passes."', element: ".quote p", size: 32, weight: 500, lh: 1.25, tracking: "-0.015em" },
        { label: "Quote · attribution", sample: "— Marcus T. · Toronto · Member since 2024", element: ".quote .attr", size: 12, weight: 700, lh: 1.5, tracking: "0.14em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Journal · section title", sample: "From the Journal", element: ".journal h2", size: 40, weight: 700, lh: 1.05, tracking: "-0.025em" },
        { label: "Journal · card eyebrow", sample: "6 min read", element: ".journal .meta", size: 11, weight: 700, lh: 1, tracking: "0.16em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Journal · card title", sample: "Why your hairline matters more than your density.", element: ".journal h3", size: 22, weight: 700, lh: 1.25, tracking: "-0.02em" },
        { label: "Journal · card excerpt", sample: "The single biggest realism cue.", element: ".journal p", size: 14, weight: 400, lh: 1.55, color: "var(--ink-muted)" },
        { label: "CTA banner · headline", sample: "The first system is the hardest. We make it the easiest.", element: ".cta-banner h2", size: 48, weight: 700, lh: 1.05, tracking: "-0.025em" },
      ]}
    />

    {/* ─── About page specifics ────────────────────── */}
    <TypeGroup
      title="07 · About page"
      rows={[
        { label: "About hero headline", sample: "We make hair for the men who'd rather not talk about it.", element: ".about-hero h1", size: 80, weight: 700, lh: 0.98, tracking: "-0.035em" },
        { label: "About hero body", sample: "Founded in 2022 by Daniel Park, a master barber.", element: ".about-hero p", size: 19, weight: 400, lh: 1.55, color: "var(--ink-soft)" },
        { label: "Values · principle title", sample: "No stock caps.", element: ".value h3", size: 22, weight: 700, lh: 1.25, tracking: "-0.015em" },
        { label: "Values · principle body", sample: "Every system is cut to a mould of your scalp.", element: ".value p", size: 14, weight: 400, lh: 1.6, color: "var(--ink-soft)" },
        { label: "Team · member name", sample: "Daniel Park", element: ".team h4", size: 17, weight: 600, lh: 1.25, tracking: "-0.01em" },
        { label: "Team · role + tenure", sample: "Founder · Master builder · 12 years", element: ".team .meta", size: 12, weight: 400, lh: 1.55, color: "var(--ink-muted)" },
        { label: "Timeline · year (mono)", sample: "2022", element: ".timeline .year", family: "Geist Mono", size: 14, weight: 700, lh: 1.4 },
        { label: "Timeline · event title", sample: "Founded", element: ".timeline h4", size: 22, weight: 700, lh: 1.25, tracking: "-0.02em" },
        { label: "Timeline · event body", sample: "Daniel cuts his first system out of a single-chair studio.", element: ".timeline p", size: 15, weight: 400, lh: 1.6, color: "var(--ink-soft)" },
      ]}
    />

    {/* ─── Collection page specifics ───────────────── */}
    <TypeGroup
      title="08 · Collection page"
      rows={[
        { label: "Collection hero headline", sample: "The bases · Spring 26", element: ".collection h1", size: 68, weight: 700, lh: 1, tracking: "-0.032em" },
        { label: "Collection hero body", sample: "Four ways to wear. Every base is cut to your scalp.", element: ".collection .lead", size: 17, weight: 400, lh: 1.55, color: "var(--ink-soft)" },
        { label: "Filter bar · sort label", sample: "Sort", element: ".filter .label", size: 11, weight: 700, lh: 1, tracking: "0.12em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Filter bar · sort select", sample: "Most popular", element: ".filter select", size: 12, weight: 400, lh: 1.4 },
      ]}
    />

    {/* ─── Product page specifics ──────────────────── */}
    <TypeGroup
      title="09 · Product page (PDP)"
      rows={[
        { label: "Breadcrumb (muted)", sample: "Shop · The bases · French Lace · 115%", element: ".bc", size: 11, weight: 600, lh: 1.5, tracking: "0.06em", color: "var(--ink-muted)" },
        { label: "Product eyebrow", sample: "French Lace · v 2.4", element: ".pdp .eyebrow", size: 11, weight: 700, lh: 1, tracking: "0.16em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Product title", sample: "French Lace · 115% density", element: ".pdp h1", size: 44, weight: 700, lh: 1.05, tracking: "-0.025em" },
        { label: "Product short description", sample: "The most-picked base. Invisible at conversation distance.", element: ".pdp p.short", size: 15, weight: 400, lh: 1.6, color: "var(--ink-soft)" },
        { label: "Product price (mono)", sample: "$1,840 CAD", element: ".pdp .price", family: "Geist Mono", size: 24, weight: 700, lh: 1.3 },
        { label: "Variant group label", sample: "DENSITY", element: ".variant .label", size: 11, weight: 700, lh: 1, tracking: "0.12em", transform: "uppercase", color: "var(--ink-muted)" },
        { label: "Variant chip", sample: "115%", element: ".variant .chip", size: 13, weight: 600, lh: 1.4 },
        { label: "Bullet list (checks)", sample: "✓ 10-day build window · single builder", element: ".pdp ul li", size: 13, weight: 400, lh: 1.6, color: "var(--ink-soft)" },
        { label: "Spec table · key", sample: "Hairline knotting", element: ".specs .k", size: 13, weight: 600, lh: 1.5 },
        { label: "Spec table · value (mono)", sample: "Single-knot · 44/cm² at front 12mm", element: ".specs .v", family: "Geist Mono", size: 13, weight: 400, lh: 1.6, color: "var(--ink-soft)" },
        { label: "FAQ · question", sample: "How invisible is the hairline really?", element: ".faq h4", size: 19, weight: 600, lh: 1.4, tracking: "-0.015em" },
        { label: "FAQ · answer", sample: "At conversation distance (>30cm), the hairline passes 96% of lift tests.", element: ".faq p", size: 15, weight: 400, lh: 1.6, color: "var(--ink-soft)" },
      ]}
    />

    {/* ─── Footer ──────────────────────────────────── */}
    <TypeGroup
      title="10 · Footer"
      rows={[
        { label: "Brand line", sample: "Men's hair systems, custom from scratch.", element: "footer p.brand", size: 13, weight: 400, lh: 1.6, color: "oklch(0.78 0.006 85)" },
        { label: "Column header", sample: "Shop", element: "footer h4", size: 10, weight: 700, lh: 1, tracking: "0.18em", transform: "uppercase", color: "oklch(0.7 0.006 85)" },
        { label: "Column link", sample: "French Lace", element: "footer a", size: 13, weight: 400, lh: 1.6, color: "oklch(0.92 0.005 85)" },
        { label: "Newsletter copy", sample: "One email per month. No marketing.", element: "footer .nl p", size: 13, weight: 400, lh: 1.6, color: "oklch(0.85 0.005 85)" },
        { label: "Legal row", sample: "© 2026 Hair Solutions Co. · Toronto, Canada", element: "footer .legal", size: 11, weight: 400, lh: 1.5, color: "oklch(0.7 0.006 85)" },
      ]}
    />

    {/* ─── Responsive scaling ──────────────────────── */}
    <div className="hsc-card" style={{ padding: "28px 32px" }}>
      <h3 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>11 · Responsive scaling</h3>
      <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--ink-muted)" }}>Every heading shrinks at md ≤ 1024px and sm ≤ 640px. Body stays 16px.</p>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--ink-muted)" }}>
            {["Style", "xl (≥1440)", "lg (1024–1439)", "md (640–1023)", "sm (<640)"].map(h => (
              <th key={h} style={{ padding: "10px 0", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Display 1 · hero", "80 / 0.98", "64 / 1.0", "48 / 1.05", "40 / 1.05"],
            ["Display 2 · about", "72 / 0.98", "60 / 1.0", "44 / 1.05", "36 / 1.05"],
            ["H1 · page", "68 / 1.0", "56 / 1.05", "40 / 1.1", "34 / 1.1"],
            ["H2 · section", "44 / 1.05", "38 / 1.1", "32 / 1.15", "28 / 1.15"],
            ["H3", "32 / 1.1", "28 / 1.15", "24 / 1.2", "22 / 1.25"],
            ["H4 · card", "22 / 1.25", "20 / 1.3", "18 / 1.35", "17 / 1.35"],
            ["Body L · lead", "19 / 1.55", "17 / 1.55", "16 / 1.6", "16 / 1.6"],
            ["Body M", "16 / 1.6", "16 / 1.6", "15 / 1.6", "15 / 1.6"],
            ["Body S", "13 / 1.55", "13 / 1.55", "13 / 1.55", "13 / 1.55"],
            ["Eyebrow", "11 / 1 · 0.16em", "11 / 1 · 0.16em", "11 / 1 · 0.16em", "10 / 1 · 0.14em"],
          ].map(r => (
            <tr key={r[0]} style={{ borderTop: "1px solid var(--border)" }}>
              {r.map((c, i) => <td key={i} style={{ padding: "10px 0", fontFamily: i === 0 ? "var(--f-sans)" : "var(--f-mono)", fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "var(--ink)" : "var(--ink-soft)" }}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

Object.assign(window, { WebTypographyGuide });
