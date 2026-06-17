// EmailBlocks2.jsx
// Additional email-section blocks the 10 marketing templates need.
// Imports nothing — relies on globals (Logo, Eyebrow, Btn, PhotoPlaceholder).

// ─── HEADERS ────────────────────────────────────────────────────────────────
const EHeaderLogoBar = ({ tone = "light" }) => (
  <div style={{
    padding: "26px 40px",
    background: tone === "dark" ? "var(--obsidian)" : "var(--paper)",
    borderRadius: "var(--r-card)",
    border: "1px solid " + (tone === "dark" ? "var(--dark-border)" : "var(--border)"),
    display: "flex", alignItems: "center", justifyContent: "space-between",
  }}>
    <Logo tone={tone === "dark" ? "light" : "dark"} height={18} />
    <div style={{ display: "flex", gap: 18 }}>
      {["Shop", "How it works", "Account"].map(l => (
        <span key={l} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: tone === "dark" ? "oklch(0.85 0.005 85)" : "var(--ink)" }}>{l}</span>
      ))}
    </div>
  </div>
);

const EAnnouncementStripe = ({ text = "Site-wide announcement · April 26" }) => (
  <div style={{
    background: "var(--ink)",
    color: "var(--paper)",
    textAlign: "center",
    padding: "12px 16px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    borderRadius: "var(--r-card)",
  }}>{text}</div>
);

// ─── HEROES ─────────────────────────────────────────────────────────────────
const EHeroFullBleed = ({ eyebrow, title, body, ctaLabel, subject = "portrait", ratio = "5 / 4", overlay = false }) => (
  <div className="hsc-card" style={{ padding: 0, position: "relative" }}>
    <PhotoPlaceholder ratio={ratio} subject={subject} />
    {overlay ? (
      <div style={{ position: "absolute", inset: 0, padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "var(--paper)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.85 }}>{eyebrow}</div>
        <h1 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 12px", fontSize: 40, lineHeight: 1.05, fontWeight: 400, letterSpacing: "-0.02em", maxWidth: "16ch" }}>{title}</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, opacity: 0.9, maxWidth: "48ch" }}>{body}</p>
        {ctaLabel && <div style={{ marginTop: 22 }}><Btn variant="primary">{ctaLabel}</Btn></div>}
      </div>
    ) : (
      <div style={{ padding: "36px 40px 40px" }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="hsc-h1" style={{ margin: "10px 0 14px", maxWidth: "18ch" }}>{title}</h1>
        <p className="hsc-body" style={{ margin: 0, color: "var(--ink-soft)", maxWidth: "52ch" }}>{body}</p>
        {ctaLabel && <div style={{ marginTop: 24 }}><Btn variant="primary">{ctaLabel}</Btn></div>}
      </div>
    )}
  </div>
);

const EHeroTextOnly = ({ eyebrow, title, body, ctaLabel, secondary, align = "left" }) => (
  <div className="hsc-card" style={{ padding: "48px 44px", textAlign: align }}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1 className="hsc-h1" style={{ margin: "12px auto 16px", maxWidth: "18ch", marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{title}</h1>
    <p className="hsc-body" style={{ margin: "0 auto 24px", color: "var(--ink-soft)", maxWidth: "52ch", marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{body}</p>
    <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap" }}>
      <Btn variant="primary">{ctaLabel}</Btn>
      {secondary && <Btn variant="secondary">{secondary}</Btn>}
    </div>
  </div>
);

const EHeroDark = ({ eyebrow, title, body, ctaLabel, secondary, footnote }) => (
  <div className="hsc-card hsc-dark" style={{ padding: "60px 44px", textAlign: "center", background: "var(--obsidian)" }}>
    <Eyebrow style={{ color: "var(--clay)" }}>{eyebrow}</Eyebrow>
    <h1 style={{ margin: "16px auto 18px", fontSize: 56, lineHeight: 0.98, fontWeight: 800, letterSpacing: "-0.035em", textTransform: "uppercase", color: "var(--paper)", maxWidth: "14ch" }}>{title}</h1>
    <p style={{ margin: "0 auto 26px", fontSize: 15, lineHeight: 1.55, color: "oklch(0.78 0.006 85)", maxWidth: "44ch" }}>{body}</p>
    <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap" }}>
      <Btn variant="primary">{ctaLabel}</Btn>
      {secondary && <Btn variant="secondary">{secondary}</Btn>}
    </div>
    {footnote && <p style={{ margin: "20px 0 0", fontSize: 11, color: "oklch(0.7 0.006 85)", letterSpacing: "0.04em" }}>{footnote}</p>}
  </div>
);

const EHeroStatus = ({ status = "Order confirmed", title, body, meta }) => (
  <div className="hsc-card" style={{ padding: "44px 44px 36px" }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: "oklch(0.92 0.05 155)", color: "oklch(0.32 0.13 155)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: "oklch(0.5 0.16 155)" }} /> {status}
    </div>
    <h1 className="hsc-h1" style={{ margin: "16px 0 14px", maxWidth: "20ch" }}>{title}</h1>
    <p className="hsc-body" style={{ margin: 0, color: "var(--ink-soft)", maxWidth: "54ch" }}>{body}</p>
    {meta && (
      <div style={{ display: "flex", gap: 24, marginTop: 26, flexWrap: "wrap" }}>
        {meta.map(([k, v]) => (
          <div key={k}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{k}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, fontFamily: "var(--f-mono)" }}>{v}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ─── COPY BLOCKS ────────────────────────────────────────────────────────────
const EPersonalNote = ({ greeting = "Marcus,", children, signoff = "— Daniel · founder" }) => (
  <div className="hsc-card" style={{ padding: "32px 40px" }}>
    <p style={{ margin: "0 0 12px", fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{greeting}</p>
    <div className="hsc-body" style={{ color: "var(--ink-soft)" }}>{children}</div>
    <p style={{ margin: "20px 0 0", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{signoff}</p>
  </div>
);

const EThreeColPillars = ({ items }) => (
  <div className="hsc-card" style={{ padding: "32px 40px" }}>
    <Eyebrow>Three things to know</Eyebrow>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 18 }}>
      {items.map(([n, t, d]) => (
        <div key={t}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)" }}>{n}</div>
          <p style={{ margin: "8px 0 6px", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{t}</p>
          <p className="hsc-small" style={{ margin: 0 }}>{d}</p>
        </div>
      ))}
    </div>
  </div>
);

const EWhatToExpectList = ({ items }) => (
  <div className="hsc-card" style={{ padding: "32px 40px" }}>
    <Eyebrow>What happens next</Eyebrow>
    <ol style={{ margin: "18px 0 0", padding: 0, listStyle: "none", counterReset: "step" }}>
      {items.map(([t, d]) => (
        <li key={t} style={{
          counterIncrement: "step",
          padding: "16px 0",
          borderTop: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "40px 1fr",
          gap: 12,
        }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)", paddingTop: 2 }}>
            <span style={{ display: "inline-block", border: "1px solid var(--border-strong)", borderRadius: 999, padding: "3px 8px" }}>0&NewLine;</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{t}</p>
            <p className="hsc-small" style={{ margin: "4px 0 0" }}>{d}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

// Numbered list (used by What-to-expect with real numbers)
const ENumberedSteps = ({ items, eyebrow = "What happens next" }) => (
  <div className="hsc-card" style={{ padding: "32px 40px" }}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <ol style={{ margin: "18px 0 0", padding: 0, listStyle: "none" }}>
      {items.map(([t, d], i) => (
        <li key={t} style={{
          padding: "16px 0",
          borderTop: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "44px 1fr",
          gap: 14,
        }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)" }}>
            <span style={{ display: "inline-block", border: "1px solid var(--border-strong)", borderRadius: 999, padding: "3px 9px" }}>{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{t}</p>
            <p className="hsc-small" style={{ margin: "4px 0 0" }}>{d}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

// ─── CART + COMMERCE BLOCKS ─────────────────────────────────────────────────
const ECartItems = ({ items = [
  ["French Lace · 115%", "European straight · #2 graphite", "$1,840"],
  ["Care kit · Refill", "Adhesive + tape + brush", "$84"],
] }) => (
  <div className="hsc-card" style={{ padding: "28px 32px" }}>
    <Eyebrow>Your bag · 2 items</Eyebrow>
    <div style={{ marginTop: 16 }}>
      {items.map(([title, sub, price], i) => (
        <div key={title} style={{
          display: "grid",
          gridTemplateColumns: "72px 1fr auto",
          gap: 16,
          padding: "16px 0",
          borderTop: i === 0 ? "none" : "1px solid var(--border)",
          alignItems: "center",
        }}>
          <div style={{ width: 72, height: 72, borderRadius: 8, overflow: "hidden" }}>
            <PhotoPlaceholder ratio="1 / 1" subject="product" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</p>
            <p className="hsc-small" style={{ margin: "4px 0 0" }}>{sub}</p>
          </div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 13, fontWeight: 700 }}>{price}</div>
        </div>
      ))}
    </div>
  </div>
);

const EPriceSummary = ({ rows = [["Subtotal","$1,924"],["Shipping","Calculated at checkout"],["Total","$1,924"]] }) => (
  <div className="hsc-card" style={{ padding: "24px 32px" }}>
    <div>
      {rows.map(([k, v], i) => {
        const isTotal = i === rows.length - 1;
        return (
          <div key={k} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderTop: i === 0 ? "none" : "1px solid var(--border)",
            fontSize: isTotal ? 16 : 13,
            fontWeight: isTotal ? 700 : 500,
            color: isTotal ? "var(--ink)" : "var(--ink-soft)",
          }}>
            <span>{k}</span>
            <span style={{ fontFamily: "var(--f-mono)" }}>{v}</span>
          </div>
        );
      })}
    </div>
    <div style={{ marginTop: 20 }}><Btn variant="primary">Return to checkout</Btn></div>
  </div>
);

const EReassurance = ({ items = [
  ["14-day", "Build window"],
  ["3-month", "Fit warranty"],
  ["Free", "Returns on first system"],
] }) => (
  <div className="hsc-card" style={{ padding: "24px 32px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
    {items.map(([k, v]) => (
      <div key={v} style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{k}</div>
        <div className="hsc-small" style={{ marginTop: 4 }}>{v}</div>
      </div>
    ))}
  </div>
);

const ESingleProductCard = ({ title, sub, price, ctaLabel = "View product" }) => (
  <div className="hsc-card" style={{ padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
    <PhotoPlaceholder ratio="1 / 1" subject="product" style={{ borderRadius: 0 }} />
    <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Eyebrow>Recommended</Eyebrow>
      <p style={{ margin: "10px 0 6px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{title}</p>
      <p className="hsc-small" style={{ margin: "0 0 12px" }}>{sub}</p>
      {price && <p style={{ margin: "0 0 18px", fontFamily: "var(--f-mono)", fontSize: 14, fontWeight: 700 }}>{price}</p>}
      <Btn variant="primary" style={{ alignSelf: "flex-start" }}>{ctaLabel}</Btn>
    </div>
  </div>
);

// ─── DEALS / PROMOTION ──────────────────────────────────────────────────────
const ECountdown = ({ ends = "Sunday · midnight ET" }) => (
  <div className="hsc-card hsc-dark" style={{ padding: "22px 40px", background: "var(--obsidian-soft)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
    <div>
      <Eyebrow style={{ color: "var(--clay)" }}>Ends</Eyebrow>
      <p style={{ margin: "4px 0 0", fontSize: 16, fontWeight: 600, color: "var(--paper)" }}>{ends}</p>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {[["03","DAYS"],["12","HRS"],["44","MIN"]].map(([n, l]) => (
        <div key={l} style={{ background: "var(--obsidian)", padding: "10px 14px", borderRadius: 6, textAlign: "center", border: "1px solid oklch(1 0 0 / 10%)" }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 22, fontWeight: 700, color: "var(--paper)" }}>{n}</div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: "oklch(0.7 0.006 85)" }}>{l}</div>
        </div>
      ))}
    </div>
  </div>
);

const ECodeBox = ({ code = "CAREKIT15", desc = "15% off your refill · this week only" }) => (
  <div className="hsc-card" style={{ padding: "32px 40px", textAlign: "center", borderStyle: "dashed", borderWidth: 1.5, borderColor: "var(--ink)" }}>
    <Eyebrow>Your code</Eyebrow>
    <p style={{ margin: "10px 0 12px", fontFamily: "var(--f-mono)", fontSize: 36, fontWeight: 700, letterSpacing: "0.04em" }}>{code}</p>
    <p className="hsc-small" style={{ margin: 0 }}>{desc}</p>
  </div>
);

const ETerms = ({ children }) => (
  <div style={{ padding: "20px 40px 0", fontSize: 11, lineHeight: 1.6, color: "var(--ink-muted)" }}>
    {children}
  </div>
);

// ─── NEWSLETTER ─────────────────────────────────────────────────────────────
const EMasthead = ({ issue = "Issue 14", date = "April 28, 2026" }) => (
  <div className="hsc-card" style={{ padding: "40px 44px", textAlign: "center" }}>
    <Eyebrow>The Field Notes</Eyebrow>
    <p style={{ fontFamily: "var(--f-serif)", margin: "10px 0 6px", fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>The Field Notes</p>
    <p className="hsc-small" style={{ margin: 0, letterSpacing: "0.04em" }}>{issue} · {date}</p>
  </div>
);

const EFeaturedStory = ({ kicker = "Lead story", title, body, ctaLabel = "Read the piece" }) => (
  <div className="hsc-card" style={{ padding: 0 }}>
    <PhotoPlaceholder ratio="16 / 9" subject="portrait" />
    <div style={{ padding: "32px 40px 40px" }}>
      <Eyebrow>{kicker}</Eyebrow>
      <h2 className="hsc-h2" style={{ margin: "10px 0 14px", maxWidth: "24ch" }}>{title}</h2>
      <p className="hsc-body" style={{ margin: "0 0 24px", color: "var(--ink-soft)", maxWidth: "54ch" }}>{body}</p>
      <Btn variant="secondary">{ctaLabel}</Btn>
    </div>
  </div>
);

const ETwoStoryRow = ({ items }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    {items.map(([k, t, d]) => (
      <div key={t} className="hsc-card" style={{ padding: 0 }}>
        <PhotoPlaceholder ratio="4 / 3" subject="product" />
        <div style={{ padding: "20px 22px 24px" }}>
          <Eyebrow>{k}</Eyebrow>
          <h3 className="hsc-h3" style={{ margin: "8px 0 8px" }}>{t}</h3>
          <p className="hsc-small" style={{ margin: 0 }}>{d}</p>
        </div>
      </div>
    ))}
  </div>
);

const EPullQuote = ({ children, attribution }) => (
  <div className="hsc-card" style={{ padding: "44px 44px", textAlign: "center", background: "var(--bg-deep)" }}>
    <p style={{ margin: 0, fontSize: 26, lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.015em", maxWidth: "30ch", marginLeft: "auto", marginRight: "auto" }}>"{children}"</p>
    {attribution && <p style={{ margin: "20px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)" }}>— {attribution}</p>}
  </div>
);

// ─── CHANGELOG / UPDATE ─────────────────────────────────────────────────────
const EChangelog = ({ version = "v 2.4", items = [
  ["Added", "Two new graphite ratios (cool ash, warm coffee) on French Lace bases."],
  ["Improved", "Hairline knotting is now 30% finer. Most clients can't see the line at 8\"."],
  ["Fixed", "Care-kit packaging now ships flat — easier mailbox delivery."],
] }) => (
  <div className="hsc-card" style={{ padding: "32px 40px" }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
      <Eyebrow>What's new · this drop</Eyebrow>
      <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)" }}>{version}</span>
    </div>
    <div>
      {items.map(([tag, body]) => (
        <div key={body} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 16, padding: "16px 0", borderTop: "1px solid var(--border)", alignItems: "baseline" }}>
          <div>
            <span style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: 999,
              background: tag === "Added" ? "oklch(0.92 0.05 155)" : tag === "Improved" ? "oklch(0.93 0.05 80)" : "oklch(0.92 0.04 250)",
              color: tag === "Added" ? "oklch(0.32 0.13 155)" : tag === "Improved" ? "oklch(0.42 0.16 80)" : "oklch(0.34 0.1 250)",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            }}>{tag}</span>
          </div>
          <p className="hsc-body" style={{ margin: 0, fontSize: 14 }}>{body}</p>
        </div>
      ))}
    </div>
  </div>
);

const EBeforeAfter = () => (
  <div className="hsc-card" style={{ padding: "28px 32px" }}>
    <Eyebrow>Knotting · side by side</Eyebrow>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
      {[["Before · v 2.3", "product"], ["After · v 2.4", "portrait"]].map(([label, subj]) => (
        <div key={label}>
          <PhotoPlaceholder ratio="1 / 1" subject={subj} />
          <p style={{ margin: "10px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{label}</p>
        </div>
      ))}
    </div>
  </div>
);

const ESpecTable = ({ rows = [
  ["Knot density at hairline", "32/cm²", "44/cm²"],
  ["Adhesive contact area", "62%", "70%"],
  ["First-wear lifespan", "10 weeks", "12 weeks"],
] }) => (
  <div className="hsc-card" style={{ padding: "24px 32px" }}>
    <Eyebrow>By the numbers</Eyebrow>
    <table style={{ width: "100%", marginTop: 14, borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ textAlign: "left", color: "var(--ink-muted)" }}>
          <th style={{ padding: "10px 0", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Metric</th>
          <th style={{ padding: "10px 0", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textAlign: "right" }}>Before</th>
          <th style={{ padding: "10px 0", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textAlign: "right" }}>After</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r[0]} style={{ borderTop: "1px solid var(--border)" }}>
            <td style={{ padding: "12px 0", fontWeight: 500 }}>{r[0]}</td>
            <td style={{ padding: "12px 0", textAlign: "right", fontFamily: "var(--f-mono)", color: "var(--ink-muted)" }}>{r[1]}</td>
            <td style={{ padding: "12px 0", textAlign: "right", fontFamily: "var(--f-mono)", fontWeight: 700 }}>{r[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── PERSONALIZATION ────────────────────────────────────────────────────────
const EPersonalStats = ({ rows = [
  ["First system", "Mar 2024"],
  ["Total systems", "3"],
  ["Days since last order", "97"],
] }) => (
  <div className="hsc-card" style={{ padding: "28px 40px" }}>
    <Eyebrow>Your file with us</Eyebrow>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16, borderLeft: "2px solid var(--ink)", paddingLeft: 18 }}>
      {rows.map(([k, v]) => (
        <div key={k}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{k}</p>
          <p style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{v}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── SHIPPING / TIMELINE ────────────────────────────────────────────────────
const EShippingTimeline = () => (
  <div className="hsc-card" style={{ padding: "28px 40px" }}>
    <Eyebrow>Where your system is</Eyebrow>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 22, position: "relative" }}>
      <div style={{ position: "absolute", top: 11, left: "12.5%", right: "12.5%", height: 1, background: "var(--border-strong)" }} />
      {[
        ["Confirmed", true],
        ["In production", true],
        ["Shipped", false],
        ["Delivered", false],
      ].map(([t, done], i) => (
        <div key={t} style={{ textAlign: "center", position: "relative" }}>
          <div style={{
            width: 22, height: 22, margin: "0 auto", borderRadius: 999,
            background: done ? "var(--ink)" : "var(--paper)",
            border: "1px solid " + (done ? "var(--ink)" : "var(--border-strong)"),
          }} />
          <p style={{ margin: "10px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: done ? "var(--ink)" : "var(--ink-muted)" }}>{t}</p>
        </div>
      ))}
    </div>
    <p className="hsc-small" style={{ margin: "20px 0 0", textAlign: "center" }}>Estimated delivery · May 14 – May 17</p>
  </div>
);

// ─── INCENTIVE PILLAR ───────────────────────────────────────────────────────
const EIncentive = ({ title = "Come back — first refill is on us.", body = "We'll cover your next care kit refill. No code needed; we've already attached it to your account.", ctaLabel = "Claim it" }) => (
  <div className="hsc-card" style={{ padding: "36px 40px", background: "var(--cream)", borderColor: "oklch(0.85 0.04 70)" }}>
    <Eyebrow style={{ color: "oklch(0.45 0.1 60)" }}>For you</Eyebrow>
    <h2 className="hsc-h2" style={{ margin: "10px 0 12px", maxWidth: "20ch" }}>{title}</h2>
    <p className="hsc-body" style={{ margin: "0 0 22px", color: "var(--ink-soft)", maxWidth: "54ch" }}>{body}</p>
    <Btn variant="primary">{ctaLabel}</Btn>
  </div>
);

// ─── FAQ MINI ───────────────────────────────────────────────────────────────
const EFaqMini = ({ items = [
  ["When does it ship?", "We ship within 10 business days. You'll get a tracking link the day it leaves."],
  ["Can I edit the spec?", "Yes — reply to this email within 48 hours to change density, length, or ratio."],
] }) => (
  <div className="hsc-card" style={{ padding: "24px 32px" }}>
    <Eyebrow>Quick answers</Eyebrow>
    <div style={{ marginTop: 14 }}>
      {items.map(([q, a]) => (
        <div key={q} style={{ padding: "14px 0", borderTop: "1px solid var(--border)" }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{q}</p>
          <p className="hsc-small" style={{ margin: "4px 0 0" }}>{a}</p>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, {
  EHeaderLogoBar, EAnnouncementStripe,
  EHeroFullBleed, EHeroTextOnly, EHeroDark, EHeroStatus,
  EPersonalNote, EThreeColPillars, EWhatToExpectList, ENumberedSteps,
  ECartItems, EPriceSummary, EReassurance, ESingleProductCard,
  ECountdown, ECodeBox, ETerms,
  EMasthead, EFeaturedStory, ETwoStoryRow, EPullQuote,
  EChangelog, EBeforeAfter, ESpecTable,
  EPersonalStats, EShippingTimeline, EIncentive, EFaqMini,
});
