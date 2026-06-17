// Email surface — fixed-width column at 640px, sand-warm background.
// Two directions share the markup; CSS tokens shift the look.
// Renders inline (no iframe) so it scales nicely inside design canvas artboards.

const EmailFrame = ({ direction, children, width = 640, bg }) => (
  <div className={`hsc-surface dir-${direction}`} style={{
    background: bg || "var(--bg)",
    padding: "32px 24px 48px",
    minHeight: "100%",
  }}>
    <div style={{
      width,
      maxWidth: "100%",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}>{children}</div>
  </div>
);

const EmailHeader = ({ tone = "light" }) => (
  <div className={`hsc-card ${tone === "dark" ? "hsc-dark" : ""}`} style={{
    padding: "32px 28px 24px",
    background: tone === "dark" ? "var(--obsidian)" : "var(--paper)",
    textAlign: "center",
    borderBottom: tone === "dark" ? "1px solid var(--dark-border)" : "1px solid var(--border)",
    boxShadow: "none",
    borderRadius: "var(--r-card)",
  }}>
    <Logo tone={tone === "dark" ? "light" : "dark"} height={20} />
    <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 16 }}>
      {["Systems", "Care", "Support"].map(l => (
        <span key={l} style={{
          fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: tone === "dark" ? "var(--dark-ink)" : "var(--ink)",
        }}>{l}</span>
      ))}
    </div>
  </div>
);

const EmailHero = ({ direction, eyebrow = "Recap · 2026", title, body, ctaLabel = "Open my recap", subject = "portrait" }) => (
  <div className="hsc-card hsc-card-float" style={{ padding: 0 }}>
    <PhotoPlaceholder ratio={direction === "experimental" ? "5 / 4" : "4 / 5"} subject={subject} />
    <div style={{ padding: direction === "experimental" ? "32px 36px 36px" : "36px 40px 40px" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className={direction === "experimental" ? "hsc-display" : "hsc-h1"} style={{
        margin: "10px 0 16px",
        textTransform: direction === "experimental" ? "uppercase" : "none",
      }}>{title}</h1>
      <p className="hsc-body" style={{ margin: 0, color: "var(--ink-soft)", maxWidth: 52 + "ch" }}>{body}</p>
      <div style={{ marginTop: 24 }}>
        <Btn variant="primary">{ctaLabel}</Btn>
      </div>
    </div>
  </div>
);

const EmailIntroCopy = ({ children }) => (
  <div className="hsc-card" style={{ padding: "28px 40px" }}>
    <div className="hsc-body" style={{ color: "var(--ink-soft)" }}>{children}</div>
  </div>
);

const EmailSnapshot = ({ rows = [
  ["Orders placed", "3"],
  ["First order", "Mar 2024"],
  ["Last system", "French Lace · 120%"],
] }) => (
  <div className="hsc-card" style={{ padding: "28px 40px" }}>
    <Eyebrow>Your account</Eyebrow>
    <div style={{ marginTop: 14, borderLeft: "2px solid var(--ink)", paddingLeft: 18 }}>
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14, borderBottom: "1px dashed var(--border)" }}>
          <span style={{ fontWeight: 600 }}>{k}</span>
          <span style={{ color: "var(--ink-muted)" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

const EmailRecommendation = ({ direction }) => (
  <div className="hsc-card" style={{ padding: "32px 40px" }}>
    <Eyebrow>Based on what you shared</Eyebrow>
    <h3 className="hsc-h3" style={{ margin: "12px 0 10px" }}>You told us realism matters most.</h3>
    <p className="hsc-body" style={{ margin: 0, color: "var(--ink-soft)" }}>
      A French Lace front with poly perimeter gets you the invisible hairline you want, while staying a bit more durable than full lace. Most clients of yours rebuy this every 3–4 months.
    </p>
    <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
      <Btn variant="primary">View French Lace</Btn>
      <Btn variant="secondary">Book a call</Btn>
    </div>
  </div>
);

const EmailOrderSummary = () => (
  <div className="hsc-card" style={{ padding: "28px 40px" }}>
    <Eyebrow>Order summary</Eyebrow>
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 14, fontSize: 13 }}>
      <tbody>
        {[
          ["Order", "#HSC-10428"],
          ["Base type", "French Lace"],
          ["Density", "115%"],
          ["Hair type", "European, straight"],
          ["Tracking", "Track your order →"],
        ].map(([k, v], i) => (
          <tr key={k} style={{ background: i % 2 ? "transparent" : "var(--sand)" }}>
            <td style={{ padding: "12px 16px", fontWeight: 600, width: "40%", borderTop: "1px solid var(--border)" }}>{k}</td>
            <td style={{ padding: "12px 16px", color: "var(--ink-muted)", borderTop: "1px solid var(--border)" }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmailTestimonial = ({ direction }) => (
  <div className="hsc-card" style={{ padding: "32px 40px" }}>
    <Eyebrow>What clients say</Eyebrow>
    <div style={{
      borderLeft: "2px solid var(--ink)",
      paddingLeft: 20,
      marginTop: 18,
    }}>
      <p style={{
        margin: 0,
        fontSize: direction === "experimental" ? 22 : 18,
        lineHeight: 1.45,
        fontWeight: direction === "experimental" ? 600 : 500,
        letterSpacing: "-0.01em",
        fontStyle: direction === "experimental" ? "normal" : "italic",
      }}>
        “I forgot it was on. Three months in, the hairline still passes when my barber lifts it.”
      </p>
      <p style={{ margin: "14px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>— Marcus T. · Toronto</p>
    </div>
  </div>
);

const EmailSplitMedia = ({ direction }) => (
  <div className="hsc-card" style={{ padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
    <PhotoPlaceholder ratio="4 / 5" subject="product" style={{ borderRadius: 0 }} />
    <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Eyebrow>Care kit</Eyebrow>
      <h3 className="hsc-h3" style={{ margin: "10px 0 10px" }}>Refill before you run out.</h3>
      <p className="hsc-small" style={{ margin: "0 0 16px" }}>Auto-ship every 8 weeks. Pause anytime.</p>
      <Btn variant="primary" style={{ alignSelf: "flex-start" }}>Subscribe</Btn>
    </div>
  </div>
);

const EmailDarkBreaker = ({ direction }) => (
  <div className={`hsc-card hsc-dark`} style={{ padding: "44px 40px", textAlign: "center", background: "var(--obsidian)" }}>
    <Eyebrow>Members</Eyebrow>
    <p className={direction === "experimental" ? "hsc-display" : "hsc-h2"} style={{
      margin: "14px 0 16px",
      color: "var(--paper)",
      textTransform: direction === "experimental" ? "uppercase" : "none",
      fontSize: direction === "experimental" ? 56 : undefined,
    }}>
      Year three is on us.
    </p>
    <p className="hsc-body" style={{ margin: "0 auto 24px", maxWidth: "44ch", color: "var(--dark-muted)" }}>
      As a thank-you for sticking with us through three full years of systems, your next base is included.
    </p>
    <Btn variant="primary">Claim my next base</Btn>
  </div>
);

const EmailProductGrid = () => (
  <div className="hsc-card" style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
    {[
      ["French Lace", "Invisible hairline · 3–4 mo lifespan"],
      ["Skin / Poly", "Crisp edge · 2–3 mo lifespan"],
      ["Mono Top", "Long-wear · 4–6 mo lifespan"],
      ["Hybrid", "Balanced realism + durability"],
    ].map(([t, d]) => (
      <div key={t}>
        <PhotoPlaceholder ratio="4 / 5" subject="product" />
        <p style={{ margin: "12px 0 4px", fontWeight: 600, fontSize: 14 }}>{t}</p>
        <p className="hsc-small" style={{ margin: 0 }}>{d}</p>
      </div>
    ))}
  </div>
);

const EmailFooter = () => (
  <div style={{
    textAlign: "center",
    padding: "28px 24px 8px",
    fontSize: 11,
    color: "var(--ink-muted)",
    lineHeight: 1.7,
  }}>
    <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 12 }}>Hair Solutions Co.</p>
    <p style={{ margin: "0 0 8px" }}>10 Dundas Street East · Toronto, ON</p>
    <p style={{ margin: "0 0 8px" }}>
      <a href="#" style={{ color: "inherit", textDecoration: "underline", margin: "0 8px" }}>Instagram</a>
      <a href="#" style={{ color: "inherit", textDecoration: "underline", margin: "0 8px" }}>Facebook</a>
    </p>
    <p style={{ margin: 0 }}>
      <a href="#" style={{ color: "inherit", textDecoration: "underline" }}>Unsubscribe</a> · <a href="#" style={{ color: "inherit", textDecoration: "underline" }}>Privacy</a>
    </p>
  </div>
);

Object.assign(window, {
  EmailFrame, EmailHeader, EmailHero, EmailIntroCopy,
  EmailSnapshot, EmailRecommendation, EmailOrderSummary,
  EmailTestimonial, EmailSplitMedia, EmailDarkBreaker,
  EmailProductGrid, EmailFooter,
});
