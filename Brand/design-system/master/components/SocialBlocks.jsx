// Instagram post variants (1080x1080 → rendered 360x360 inside the system page)
// 6 distinct post types + 3 story templates.

const IGCanvas = ({ children, bg = "var(--paper)", color = "var(--ink)", border = true, label }) => (
  <div>
    <div style={{
      width: 360, height: 360,
      background: bg, color,
      padding: 28,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      position: "relative", overflow: "hidden",
      fontFamily: "var(--f-sans)",
      border: border ? "1px solid var(--border)" : "none",
    }}>{children}</div>
    {label && <p style={{ margin: "8px 0 0", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{label}</p>}
  </div>
);

const IGTopMeta = ({ left = "HSC · Toronto", right = "04 / 26", color }) => (
  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, opacity: 0.7, color }}>
    <span>{left}</span><span>{right}</span>
  </div>
);

const IGFooter = ({ tone = "dark", cta = "Link in bio →" }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
    <Logo tone={tone === "dark" ? "dark" : "light"} variant="rect" height={14} />
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{cta}</span>
  </div>
);

// 1. Blog article
const IGBlogPost = () => (
  <IGCanvas bg="var(--paper)" label="01 · Blog article">
    <IGTopMeta left="Journal · 04" right="6 min read" />
    <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 14 }}>How it works</div>
      <p style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 30, lineHeight: 1.02, fontWeight: 400, letterSpacing: "-0.02em" }}>Why your hairline matters more than your density.</p>
      <p style={{ margin: "14px 0 0", fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.5 }}>The single biggest realism cue, and the one most stock systems get wrong.</p>
    </div>
    <IGFooter tone="dark" cta="Read it · link in bio" />
  </IGCanvas>
);

// 2. Single product
const IGProductPost = () => (
  <IGCanvas bg="var(--paper)" label="02 · Single product">
    <IGTopMeta left="New · Spring 26" right="French Lace" />
    <div style={{ position: "absolute", inset: "60px 24px 100px", borderRadius: 6, overflow: "hidden" }}>
      <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
    </div>
    <div style={{ position: "relative", marginTop: "auto" }}>
      <p style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>French Lace · 115%</p>
      <p style={{ margin: "4px 0 12px", fontSize: 11, color: "var(--ink-muted)" }}>Invisible hairline · 3–4 mo lifespan</p>
      <IGFooter tone="dark" cta="Shop · link in bio" />
    </div>
  </IGCanvas>
);

// 3. Collection
const IGCollectionPost = () => (
  <IGCanvas bg="var(--obsidian)" color="var(--paper)" border={false} label="03 · Collection">
    <IGTopMeta left="Collection" right="04 / 26" color="oklch(0.7 0.006 85)" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{ aspectRatio: "1", borderRadius: 4, overflow: "hidden" }}>
          <PhotoPlaceholder ratio={undefined} subject={i % 2 ? "product" : "portrait"} style={{ width: "100%", height: "100%", borderRadius: 0 }} />
        </div>
      ))}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>The bases collection.</p>
      <p style={{ margin: "4px 0 14px", fontSize: 11, color: "oklch(0.7 0.006 85)" }}>Four ways to wear · pick the one that fits your life.</p>
      <IGFooter tone="light" cta="Browse · link in bio" />
    </div>
  </IGCanvas>
);

// 4. Hero / brand statement
const IGHeroPost = () => (
  <IGCanvas bg="var(--paper)" label="04 · Hero / brand">
    <IGTopMeta />
    <div>
      <p style={{ margin: 0, fontSize: 44, lineHeight: 0.96, fontWeight: 800, letterSpacing: "-0.04em", textTransform: "uppercase" }}>
        No stock<br/>caps.<br/>Ever.
      </p>
      <p style={{ margin: "16px 0 0", fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.5, maxWidth: "32ch" }}>
        Every Hair Solutions Co. system is cut to a mould of your scalp.
      </p>
    </div>
    <IGFooter tone="dark" cta="Start · link in bio" />
  </IGCanvas>
);

// 5. Quotation / testimonial
const IGQuotePost = () => (
  <IGCanvas bg="var(--bg)" label="05 · Testimonial">
    <IGTopMeta left="Client · M.T." right="Toronto" />
    <div style={{ borderLeft: "2px solid var(--ink)", paddingLeft: 18 }}>
      <p style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.01em" }}>
        “I forgot it was on. Three months in, the hairline still passes when my barber lifts it.”
      </p>
      <p style={{ margin: "16px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>— Marcus T.</p>
    </div>
    <IGFooter tone="dark" cta="Read more · link in bio" />
  </IGCanvas>
);

// 6. Sale / promo
const IGSalePost = () => (
  <IGCanvas bg="var(--obsidian)" color="var(--paper)" border={false} label="06 · Sale / promo">
    <IGTopMeta left="Members · April" right="Save 15%" color="oklch(0.7 0.006 85)" />
    <div>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.78 0.06 55)" }}>Care kit refill</p>
      <p style={{ margin: "12px 0 0", fontSize: 56, lineHeight: 0.92, fontWeight: 800, letterSpacing: "-0.045em", textTransform: "uppercase" }}>
        −15%<br/>this week.
      </p>
      <p style={{ margin: "14px 0 0", fontSize: 12, color: "oklch(0.78 0.006 85)", lineHeight: 1.5 }}>Code <b>CAREKIT</b> at checkout · ends Sunday</p>
    </div>
    <IGFooter tone="light" cta="Shop · link in bio" />
  </IGCanvas>
);

// 7. Announcement / brand news
const IGAnnouncementPost = () => (
  <IGCanvas bg="var(--paper)" label="07 · Announcement">
    <IGTopMeta left="Announcement" right="04 / 26" />
    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
      <div>
        <p style={{ margin: 0, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--clay)" }}>NEW LOCATION</p>
        <p style={{ fontFamily: "var(--f-serif)", margin: "12px 0 0", fontSize: 32, lineHeight: 1.02, fontWeight: 400, letterSpacing: "-0.02em" }}>The Toronto fitting room opens May 12.</p>
        <p style={{ margin: "14px 0 0", fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.5 }}>10 Dundas E · By appointment · 30-min consults</p>
      </div>
    </div>
    <IGFooter tone="dark" cta="Book · link in bio" />
  </IGCanvas>
);

// Stories (1080x1920 → rendered 220x390)
const IGStoryCanvas = ({ children, bg = "var(--paper)", color = "var(--ink)", label }) => (
  <div>
    <div style={{
      width: 220, height: 390,
      background: bg, color,
      borderRadius: 6, overflow: "hidden",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-sans)", border: "1px solid var(--border)",
    }}>{children}</div>
    {label && <p style={{ margin: "8px 0 0", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{label}</p>}
  </div>
);

const IGStoryProduct = () => (
  <IGStoryCanvas label="Product story">
    <div style={{ flex: 1, position: "relative" }}>
      <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
    </div>
    <div style={{ padding: 16 }}>
      <Eyebrow>New drop</Eyebrow>
      <p style={{ margin: "8px 0 4px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.05 }}>French Lace · 115%</p>
      <p style={{ margin: 0, fontSize: 10, color: "var(--ink-muted)" }}>Tap → start consult</p>
    </div>
  </IGStoryCanvas>
);

const IGStoryQuote = () => (
  <IGStoryCanvas bg="var(--obsidian)" color="var(--paper)" label="Quote story">
    <div style={{ padding: 22, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.7 0.006 85)" }}>Client</div>
      <p style={{ margin: 0, fontSize: 22, lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.02em" }}>
        “I forgot it was on.”
      </p>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 10, color: "oklch(0.7 0.006 85)" }}>— Marcus T. · Toronto</p>
        <Logo tone="light" variant="rect" height={12} />
      </div>
    </div>
  </IGStoryCanvas>
);

const IGStorySale = () => (
  <IGStoryCanvas bg="var(--bg)" label="Sale story">
    <div style={{ padding: 22, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
      <Eyebrow style={{ color: "var(--clay)" }}>This week</Eyebrow>
      <p style={{ margin: "12px 0 0", fontSize: 44, lineHeight: 0.95, fontWeight: 800, letterSpacing: "-0.04em", textTransform: "uppercase" }}>−15%</p>
      <p style={{ margin: "10px 0 0", fontSize: 14, fontWeight: 600 }}>Care kit refill</p>
      <p style={{ margin: "6px 0 0", fontSize: 10, color: "var(--ink-muted)" }}>Code CAREKIT · swipe up</p>
    </div>
  </IGStoryCanvas>
);

Object.assign(window, { IGBlogPost, IGProductPost, IGCollectionPost, IGHeroPost, IGQuotePost, IGSalePost, IGAnnouncementPost, IGStoryProduct, IGStoryQuote, IGStorySale });
