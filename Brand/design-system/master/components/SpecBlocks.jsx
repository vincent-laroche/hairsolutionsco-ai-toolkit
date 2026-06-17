// Token spec card + Email Design spec section + Migration plan card.

const SwatchRow = ({ items }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
    {items.map(([name, val, fg]) => (
      <div key={name} style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", background: "var(--paper)" }}>
        <div style={{ background: val, height: 64, color: fg || "var(--ink)", padding: 8, fontSize: 9, fontFamily: "var(--f-mono)", letterSpacing: "0.08em" }}>{name}</div>
        <div style={{ padding: "8px 10px", fontSize: 10, fontFamily: "var(--f-mono)", color: "var(--ink-muted)" }}>{val}</div>
      </div>
    ))}
  </div>
);

const TokenSpec = ({ direction }) => (
  <div className={`hsc-surface dir-${direction}`} style={{ padding: 32, background: "var(--bg)", width: 1240, maxWidth: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
    <div className="hsc-card" style={{ padding: 24 }}>
      <Eyebrow>Palette · Light</Eyebrow>
      <div style={{ marginTop: 12 }}>
        <SwatchRow items={[
          ["Off-white (canvas)", "oklch(0.955 0.002 250)"],
          ["Paper (card)", "oklch(0.99 0.002 250)"],
          ["Ink (text)", "oklch(0.17 0.006 60)", "#fff"],
          ["Stone (rule)", "oklch(0.88 0.003 250)"],
        ]} />
      </div>
      <Eyebrow style={{ marginTop: 22 }}>Palette · Dark</Eyebrow>
      <div style={{ marginTop: 12 }}>
        <SwatchRow items={[
          ["Obsidian", "oklch(0.14 0.004 60)", "#fff"],
          ["Obsidian soft", "oklch(0.19 0.005 60)", "#fff"],
          ["Cream", "oklch(0.95 0.025 85)"],
          ["Clay (accent)", "oklch(0.72 0.06 55)", "#fff"],
        ]} />
      </div>
    </div>
    <div className="hsc-card" style={{ padding: 24 }}>
      <Eyebrow>Type scale</Eyebrow>
      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        <div className="hsc-display" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>Display</div>
        <div className="hsc-h1" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>H1 · 46/60px</div>
        <div className="hsc-h2" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>H2 · 32/38px</div>
        <div className="hsc-h3" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>H3 · 20/22px</div>
        <div className="hsc-body" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>Body · 15px / 1.55</div>
        <div className="hsc-small" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>Small · 13px / 1.55</div>
        <div className="hsc-eyebrow" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>Eyebrow · 10px / 0.16em</div>
      </div>
    </div>
    <div className="hsc-card" style={{ padding: 24 }}>
      <Eyebrow>Buttons · {direction}</Eyebrow>
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <Btn variant="primary">Primary</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="ghost">Ghost link</Btn>
      </div>
      <Eyebrow style={{ marginTop: 22 }}>On dark</Eyebrow>
      <div className="hsc-dark" style={{ display: "flex", gap: 10, marginTop: 12, padding: 16, borderRadius: 12, background: "var(--obsidian)", flexWrap: "wrap" }}>
        <Btn variant="primary">Primary</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="ghost">Ghost link</Btn>
      </div>
    </div>
    <div className="hsc-card" style={{ padding: 24 }}>
      <Eyebrow>Cards · {direction}</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
        <div className="hsc-card" style={{ padding: 18 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>Card · default</p>
          <p className="hsc-small" style={{ margin: "6px 0 0" }}>r {direction === "experimental" ? "4px" : "14px"} · hairline border · {direction === "experimental" ? "no shadow" : "soft shadow"}</p>
        </div>
        <div className="hsc-card hsc-card-float" style={{ padding: 18 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>Card · floating</p>
          <p className="hsc-small" style={{ margin: "6px 0 0" }}>{direction === "experimental" ? "8px hard offset" : "lifted shadow"}</p>
        </div>
      </div>
      <Eyebrow style={{ marginTop: 22 }}>Radii / spacing</Eyebrow>
      <p className="hsc-small" style={{ margin: "8px 0 0" }}>
        Card {direction === "experimental" ? 4 : 14}px · Button {direction === "experimental" ? 8 : 10}px · Image {direction === "experimental" ? 2 : 14}px<br/>
        Email canvas: 640px · gutter 32px · stack rhythm 16/24/40
      </p>
    </div>
  </div>
);

const SpecSheet = ({ children, title }) => (
  <div style={{ padding: 32, background: "var(--paper)", width: 1240, maxWidth: "100%", color: "var(--ink)", fontFamily: "var(--f-sans)" }}>
    <h2 className="hsc-h2" style={{ margin: "0 0 24px" }}>{title}</h2>
    {children}
  </div>
);

const EmailDesignSpec = () => (
  <SpecSheet title="Email Design — system rules">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <Eyebrow>Canvas</Eyebrow>
        <ul style={{ margin: "10px 0 22px", paddingLeft: 18, lineHeight: 1.7, fontSize: 14 }}>
          <li>Width <b>640px</b> (was 600). Outer body bg = <b>Sand</b> (#F2F0EC).</li>
          <li>Cards sit on Sand with <b>1px ink/10% hairline</b>, radius <b>14px</b> (refined) / <b>4px</b> (experimental).</li>
          <li>Vertical rhythm between blocks: <b>16px</b>. Card inner padding: <b>32–40px</b> top/bottom, <b>40px</b> sides.</li>
          <li>Use a <b>"floating" treatment</b> only on hero + dark-breaker — not on every block (kills the rhythm).</li>
        </ul>
        <Eyebrow>Type rules</Eyebrow>
        <ul style={{ margin: "10px 0 22px", paddingLeft: 18, lineHeight: 1.7, fontSize: 14 }}>
          <li>System stack only: <code>-apple-system, "Segoe UI", Geist Fallback, Arial</code>. Geist via web font for clients that allow it.</li>
          <li>Eyebrow: 10px / 0.16em / 700 / uppercase / muted ink. Always above H1/H3.</li>
          <li>H1 hero: 36px refined / 48px experimental (uppercase). H3 block title: 20px.</li>
          <li>Body 15/1.55, small 13/1.55. Never below 13.</li>
          <li>Italic reserved for refined-direction testimonials only. Experimental uses uppercase weight instead.</li>
        </ul>
        <Eyebrow>Buttons (CTA)</Eyebrow>
        <ul style={{ margin: "10px 0 0", paddingLeft: 18, lineHeight: 1.7, fontSize: 14 }}>
          <li>Primary: <b>ink bg</b> / paper text · radius 10px · 14×24 padding · uppercase 13/700/0.02em.</li>
          <li>On dark sections: invert (paper bg / ink text).</li>
          <li>Secondary: transparent + 1px ink/18% border. Ghost: text + animated underline arrow.</li>
          <li>Min hit-area 44px. Always wrap with bulletproof VML for Outlook.</li>
        </ul>
      </div>
      <div>
        <Eyebrow>Imagery</Eyebrow>
        <ul style={{ margin: "10px 0 22px", paddingLeft: 18, lineHeight: 1.7, fontSize: 14 }}>
          <li>Hero ratio <b>4:5</b> (refined) or <b>5:4</b> (experimental landscape). Full-bleed inside card, no inner padding above.</li>
          <li>Product/portrait: ratio 1:1 or 4:5. <b>Sand or obsidian backdrop</b>, no white cutouts.</li>
          <li>Image radius matches card radius (14 / 2). Never round just one corner.</li>
          <li>Use HubSpot's <code>fluid</code> class + <code>max-width:100%</code>. Provide @2x src for retina.</li>
          <li>Alt text required on every image — fall back to copy-led layout if blocked.</li>
        </ul>
        <Eyebrow>Light + dark cadence</Eyebrow>
        <ul style={{ margin: "10px 0 22px", paddingLeft: 18, lineHeight: 1.7, fontSize: 14 }}>
          <li>Default = light. Reserve dark for: hero (rare), pre-CTA breaker, members-only / loyalty.</li>
          <li>Max <b>one</b> dark section per email. It is the punctuation, not the page.</li>
          <li>Dark section bg = Obsidian (#1B1B19). Card-on-dark uses Obsidian-soft (#262624) + 1px white/10%.</li>
        </ul>
        <Eyebrow>Block library — naming</Eyebrow>
        <ul style={{ margin: "10px 0 0", paddingLeft: 18, lineHeight: 1.7, fontSize: 14 }}>
          <li><code>hsc/header/*</code>, <code>hsc/hero/*</code>, <code>hsc/section/*</code>, <code>hsc/data/*</code> (snapshot, order), <code>hsc/cta/*</code>, <code>hsc/footer/*</code>.</li>
          <li>Every module gets a <code>tone</code> field (light / dark) and a <code>direction</code> field (refined / experimental) — picks the right token set automatically.</li>
          <li>Drop the suffix duplicates (<code>_block</code>) — keep one canonical name per module.</li>
        </ul>
      </div>
    </div>
  </SpecSheet>
);

const MigrationPlan = () => (
  <SpecSheet title="Migration plan — blocks, sections, templates">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, fontSize: 14, lineHeight: 1.6 }}>
      <div>
        <Eyebrow>Phase 0 · Foundation (½ day)</Eyebrow>
        <ol style={{ paddingLeft: 18, margin: "10px 0 22px" }}>
          <li>Promote tokens to a HubSpot <b>theme.json</b> + <code>tokens.css</code> module so every block reads the same vars.</li>
          <li>Add a single <b>brand color set</b> (sand, paper, ink, obsidian, cream, clay) in HubSpot Brand Kit.</li>
          <li>Stand up the <b>Geist</b> webfont via theme settings; keep system stack as fallback.</li>
        </ol>
        <Eyebrow>Phase 1 · Atoms (1 day)</Eyebrow>
        <ol style={{ paddingLeft: 18, margin: "10px 0 22px" }}>
          <li><code>hsc_cta_button</code> — restyle to spec (radius 10, uppercase 13/700, ink/paper inversion). Add <code>tone</code> + <code>direction</code> fields.</li>
          <li><code>hsc_email_header</code> + <code>brand-header</code> — <b>collapse to one</b> (<code>hsc_email_header</code>). Switch to flexed centered logo, add tone field, increase pad to 32/40.</li>
          <li><code>hsc_email_footer</code> — switch type to 11/1.7 muted ink, single underline link style, drop the bold company line in favour of the eyebrow style.</li>
          <li><code>sec-spacer</code>, <code>sec-intro-richtext</code> — bake spec spacings (16/24/40) and body 15/1.55.</li>
        </ol>
        <Eyebrow>Phase 2 · Data blocks (1 day)</Eyebrow>
        <ol style={{ paddingLeft: 18, margin: "10px 0 22px" }}>
          <li><code>hsc_customer_snapshot</code> + <code>hsc_customer_snapshot_block</code> → <b>merge into one</b>. Replace the 3px black left rule with a 2px ink rule, switch rows to dashed-border list (matches spec mock).</li>
          <li><code>hsc_order_summary_block</code> → 14px outer radius (was 24), zebra rows on Sand instead of #f7f7f7, tracking row promoted to inline link with arrow.</li>
          <li><code>hsc_lifespan_next_step</code> + <code>_block</code> → <b>merge</b>. CTA inherits <code>hsc_cta_button</code> partial.</li>
          <li><code>hsc_base_type_guidance</code> + <code>_block</code> → <b>merge</b>. Add <code>show_eyebrow</code> field; default eyebrow "Based on your last system".</li>
          <li><code>hsc_goal_based_recommendation</code> + <code>_block</code> → <b>merge</b>. Add eyebrow + H3, restructure to title/body/CTA stack matching the mock.</li>
          <li><code>hsc_testimonial_block</code> → 18px refined / 22px experimental (uppercase) quote; rule = 2px ink, not 3.</li>
        </ol>
      </div>
      <div>
        <Eyebrow>Phase 3 · Layout sections (1 day)</Eyebrow>
        <ol style={{ paddingLeft: 18, margin: "10px 0 22px" }}>
          <li><code>sec-hero-image</code> → wrap in card, add eyebrow + title + body + CTA fields above image (currently image-only).</li>
          <li><code>sec-split-copy-image-6-6</code>, <code>sec-split-image-copy-6-6</code> → <b>collapse to one</b> (<code>sec-split-copy-media</code>) with a <code>media_side</code> select. Pad 28/32, image full-bleed inside card column.</li>
          <li><code>sec-split-two-images-6-6</code> → keep, add caption fields under each image.</li>
          <li><code>sec-split-copy-dual-cta-7-5</code> → align CTAs to spec (primary + secondary pair).</li>
          <li><code>sec-split-media-cta</code>, <code>sec-story</code> → keep, swap CTA HTML to the <code>hsc_cta_button</code> partial so style updates propagate.</li>
          <li><code>sec-product-grid</code>, <code>sec-dense-promo</code> → 16px gap, image radius 14/2 by direction, rule between cells = 1px stone (not #d8d8d8).</li>
          <li><code>sec-prefooter-signal</code>, <code>sec-image-social</code> → unify social pill style; drop the "Web" label and use the wordmark.</li>
          <li><b>New</b>: <code>sec-dark-breaker</code> — captures the obsidian section (members / loyalty / brand line).</li>
          <li><b>New</b>: <code>sec-product-pair-2</code> — 2-up product cards (used in the Frame.io ref).</li>
        </ol>
        <Eyebrow>Phase 4 · Templates (½ day each)</Eyebrow>
        <ol style={{ paddingLeft: 18, margin: "10px 0 22px" }}>
          <li>Audit each existing template in <code>pipeline/production</code>: replace ad-hoc HTML with the updated modules. Keep copy.</li>
          <li>Set every template's body bg → <b>Sand</b>. Drop legacy <code>#f0f0f0</code>, <code>#f7f7f7</code> hex.</li>
          <li>Add a top-of-template comment listing the modules used + which direction (refined / experimental).</li>
        </ol>
        <Eyebrow>Phase 5 · QA matrix</Eyebrow>
        <ul style={{ paddingLeft: 18, margin: "10px 0 0" }}>
          <li>Litmus / Email on Acid: Gmail, Outlook 2016/365, Apple Mail, iOS, Yahoo, Superhuman, dark-mode invert.</li>
          <li>Verify VML button fallback in Outlook + Sand bg via <code>&lt;v:background&gt;</code>.</li>
          <li>Direction toggle ships as a <b>theme-level switch</b>; per-email override allowed but discouraged.</li>
        </ul>
      </div>
    </div>
    <hr className="hsc-rule" style={{ margin: "28px 0" }} />
    <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>
      <b>Folder reorg suggestion:</b><br/>
      <code>sections-library/</code> →
      <code> 01-foundation/</code> (cta-button, header, footer, spacer, rich-text, dark-breaker)
      · <code>02-hero/</code>
      · <code>03-content/</code> (split-*, story, intro)
      · <code>04-grid/</code> (product-grid, dense-promo, product-pair)
      · <code>05-personalized/</code> (snapshot, order-summary, lifespan, base-type-guidance, goal-recommendation, testimonial)
      · <code>06-social/</code> (prefooter-signal, image-social).
      Drop <code>_block</code> duplicates after merging.
    </div>
  </SpecSheet>
);

Object.assign(window, { TokenSpec, SpecSheet, EmailDesignSpec, MigrationPlan });
