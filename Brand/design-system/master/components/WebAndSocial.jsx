// Web (hairsolutions.co) and Instagram surfaces — share token system.

const WebFrame = ({ direction, children, width = 1240 }) => (
  <div className={`hsc-surface dir-${direction}`} style={{
    background: "var(--bg)",
    width,
    maxWidth: "100%",
    overflow: "hidden",
    borderRadius: "var(--r-card)",
    border: "1px solid var(--border)",
  }}>{children}</div>
);

const WebNav = () => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 32px",
    borderBottom: "1px solid var(--border)",
    background: "var(--paper)",
  }}>
    <Logo height={20} />
    <div style={{ display: "flex", gap: 28 }}>
      {["Systems", "Care kit", "How it works", "Stories", "Account"].map(l => (
        <span key={l} style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>{l}</span>
      ))}
    </div>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <span style={{ fontSize: 12, fontWeight: 600 }}>EN</span>
      <Btn variant="primary" style={{ padding: "10px 18px", fontSize: 11 }}>Find my fit</Btn>
    </div>
  </div>
);

const WebHero = ({ direction }) => (
  <div style={{ padding: "48px 32px 32px", display: "grid", gridTemplateColumns: direction === "experimental" ? "1fr" : "1.05fr 1fr", gap: 32, alignItems: "end" }}>
    <div>
      <Eyebrow>Mens hair systems · made-to-measure</Eyebrow>
      <h1 className={direction === "experimental" ? "hsc-display" : "hsc-h1"} style={{
        margin: "16px 0 18px",
        textTransform: direction === "experimental" ? "uppercase" : "none",
      }}>
        {direction === "experimental"
          ? <>A second<br/>chance at<br/>your hairline.</>
          : <>A second chance at the hairline you remember.</>}
      </h1>
      <p className="hsc-body" style={{ maxWidth: "52ch", color: "var(--ink-soft)", margin: 0 }}>
        We measure, match, and ship a system built for your scalp — not a stock cap. Most clients are wearing within ten days of starting.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
        <Btn variant="primary">Start my consult</Btn>
        <Btn variant="secondary">See how it works</Btn>
      </div>
    </div>
    {direction !== "experimental" && (
      <div className="hsc-card hsc-card-float" style={{ padding: 0 }}>
        <PhotoPlaceholder ratio="4 / 5" subject="portrait" />
      </div>
    )}
  </div>
);

const WebExperimentalHeroMedia = () => (
  <div style={{ padding: "0 32px 32px" }}>
    <div className="hsc-card" style={{ padding: 0 }}>
      <PhotoPlaceholder ratio="21 / 9" subject="portrait" />
    </div>
  </div>
);

const WebProductRow = () => (
  <div style={{ padding: "24px 32px 48px" }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
      <h2 className="hsc-h2">Pick your base.</h2>
      <span className="hsc-small">All bases · 4 styles</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {[
        ["French Lace", "Invisible hairline"],
        ["Skin / Poly", "Crisp edge, low-effort"],
        ["Mono Top", "Long-wear, durable"],
        ["Hybrid", "Realism + durability"],
      ].map(([t, d]) => (
        <div key={t} className="hsc-card" style={{ padding: 0 }}>
          <PhotoPlaceholder ratio="1 / 1" subject="product" />
          <div style={{ padding: 16 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{t}</p>
            <p className="hsc-small" style={{ margin: "4px 0 14px" }}>{d}</p>
            <span className="hsc-small" style={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)" }}>View →</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WebDarkSection = ({ direction }) => (
  <div className="hsc-dark" style={{ padding: "60px 32px", textAlign: "center" }}>
    <Eyebrow>Custom from scratch</Eyebrow>
    <h2 className={direction === "experimental" ? "hsc-display" : "hsc-h1"} style={{
      margin: "18px auto 18px",
      maxWidth: "16ch",
      color: "var(--paper)",
      textTransform: direction === "experimental" ? "uppercase" : "none",
      fontSize: direction === "experimental" ? 88 : undefined,
    }}>
      No stock caps. Ever.
    </h2>
    <p className="hsc-body" style={{ margin: "0 auto", maxWidth: "52ch", color: "var(--dark-muted)" }}>
      Every system is cut to a mould of your scalp. The hairline is hand-ventilated to a density you choose, with a graphite ratio matched to your remaining hair.
    </p>
    <div style={{ display: "inline-flex", gap: 12, marginTop: 28 }}>
      <Btn variant="primary">Start my consult</Btn>
      <Btn variant="secondary">Read the process</Btn>
    </div>
  </div>
);

// ─── Instagram ──────────────────────────────────────────────────────────────

const IGPost = ({ direction, kind = "promo" }) => {
  const isExp = direction === "experimental";
  return (
    <div style={{
      width: 320, height: 320,
      background: kind === "dark" ? "var(--obsidian)" : "var(--sand)",
      color: kind === "dark" ? "var(--paper)" : "var(--ink)",
      padding: 28,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: 0,
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--f-sans)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, opacity: 0.7 }}>
        <span>HSC · Toronto</span>
        <span>04 / 26</span>
      </div>
      <div>
        <p style={{
          margin: 0,
          fontSize: isExp ? 44 : 32,
          lineHeight: 0.98,
          fontWeight: isExp ? 800 : 700,
          letterSpacing: isExp ? "-0.04em" : "-0.02em",
          textTransform: isExp ? "uppercase" : "none",
        }}>
          {kind === "promo" ? (isExp ? <>Year three<br/>is on us.</> : <>Year three is on us.</>) :
           kind === "dark"  ? (isExp ? <>No stock<br/>caps. Ever.</> : <>No stock caps. Ever.</>) :
                              (isExp ? <>French<br/>Lace.</> : <>French Lace.</>)}
        </p>
        <p style={{ margin: "12px 0 0", fontSize: 11, opacity: 0.75, lineHeight: 1.4 }}>
          {kind === "promo" ? "Three years a member · your next base is included." :
           kind === "dark"  ? "Every system cut to your scalp." :
                              "Invisible hairline, 3–4 month lifespan."}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Logo tone={kind === "dark" ? "light" : "dark"} variant="rect" height={14} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Link in bio →</span>
      </div>
    </div>
  );
};

const IGStory = ({ direction, kind = "product" }) => {
  const isExp = direction === "experimental";
  return (
    <div style={{
      width: 200, height: 356,
      background: kind === "dark" ? "var(--obsidian)" : "var(--paper)",
      color: kind === "dark" ? "var(--paper)" : "var(--ink)",
      borderRadius: 4,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--f-sans)",
      border: "1px solid var(--border)",
    }}>
      <div style={{ flex: 1, position: "relative" }}>
        <PhotoPlaceholder ratio={undefined} subject={kind === "dark" ? "portrait" : "product"} style={{ width: "100%", height: "100%", borderRadius: 0 }} />
      </div>
      <div style={{ padding: 16 }}>
        <Eyebrow style={{ color: kind === "dark" ? "var(--dark-muted)" : "var(--ink-muted)" }}>New drop</Eyebrow>
        <p style={{
          margin: "8px 0 4px",
          fontSize: isExp ? 22 : 18,
          fontWeight: isExp ? 800 : 600,
          letterSpacing: isExp ? "-0.03em" : "-0.01em",
          lineHeight: 1.05,
          textTransform: isExp ? "uppercase" : "none",
        }}>French Lace · 115%</p>
        <p style={{ margin: 0, fontSize: 10, opacity: 0.7 }}>Tap → start consult</p>
      </div>
    </div>
  );
};

Object.assign(window, { WebFrame, WebNav, WebHero, WebExperimentalHeroMedia, WebProductRow, WebDarkSection, IGPost, IGStory });
