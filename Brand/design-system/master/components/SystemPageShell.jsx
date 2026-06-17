// Shared header/footer for the three deep system pages.
// Use only on .html files that already include tokens.css.

const SystemHeader = ({ title, subtitle, current }) => (
  <header style={{
    background: "var(--paper)",
    borderBottom: "1px solid var(--border)",
    padding: "32px 48px 28px",
    fontFamily: "var(--f-sans)",
  }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
          Hair Solutions Co. · Design System
        </div>
        <h1 style={{ fontFamily: "var(--f-serif)", margin: "6px 0 4px", fontSize: 38, letterSpacing: "-0.02em", lineHeight: 1.05, fontWeight: 400 }}>{title}</h1>
        <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>{subtitle}</p>
      </div>
      <nav style={{ display: "flex", gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {[
          ["Master", "Hair Solutions Co - Design System v2.html"],
          ["Email", "Hair Solutions Co - Email System.html"],
          ["Web", "Hair Solutions Co - Web System.html"],
          ["Social", "Hair Solutions Co - Social System.html"],
        ].map(([l, h]) => {
          const active = current === l;
          return (
            <a key={l} href={h} style={{
              padding: "10px 14px",
              border: "1px solid " + (active ? "var(--ink)" : "var(--border-strong)"),
              borderRadius: 999,
              background: active ? "var(--ink)" : "transparent",
              color: active ? "var(--paper)" : "var(--ink)",
              textDecoration: "none",
            }}>{l}</a>
          );
        })}
      </nav>
    </div>
  </header>
);

const Section = ({ id, eyebrow, title, intro, children, dark }) => (
  <section id={id} style={{
    padding: "56px 48px",
    background: dark ? "var(--obsidian)" : "transparent",
    color: dark ? "var(--paper)" : "var(--ink)",
    borderTop: "1px solid var(--border)",
  }}>
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 32, marginBottom: 28 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: dark ? "var(--dark-muted)" : "var(--ink-muted)" }}>{eyebrow}</div>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: "10px 0 0", fontSize: 28, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>{title}</h2>
      </div>
      {intro && <p style={{ margin: 0, alignSelf: "end", fontSize: 15, lineHeight: 1.6, color: dark ? "var(--dark-muted)" : "var(--ink-soft)", maxWidth: 64 + "ch" }}>{intro}</p>}
    </div>
    <div>{children}</div>
  </section>
);

const SubHead = ({ children, dark }) => (
  <h3 style={{
    margin: "0 0 14px",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: dark ? "var(--dark-muted)" : "var(--ink-muted)",
  }}>{children}</h3>
);

const Rule = ({ children, dark }) => (
  <li style={{ padding: "10px 0", borderTop: "1px solid " + (dark ? "var(--dark-border)" : "var(--border)"), fontSize: 14, lineHeight: 1.55 }}>{children}</li>
);

const RuleList = ({ items, dark }) => (
  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
    {items.map((it, i) => <Rule key={i} dark={dark}>{it}</Rule>)}
  </ul>
);

const Code = ({ children }) => (
  <pre style={{
    margin: 0,
    background: "oklch(0.96 0.003 250)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: 16,
    fontFamily: "var(--f-mono)",
    fontSize: 12,
    lineHeight: 1.6,
    overflowX: "auto",
    color: "var(--ink)",
    whiteSpace: "pre",
  }}>{children}</pre>
);

const DoDont = ({ doItem, dontItem }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    <div className="hsc-card" style={{ padding: 18, borderColor: "oklch(0.74 0.13 155 / 50%)" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "oklch(0.45 0.13 155)", marginBottom: 8 }}>Do</div>
      {doItem}
    </div>
    <div className="hsc-card" style={{ padding: 18, borderColor: "oklch(0.6 0.18 25 / 35%)" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "oklch(0.5 0.16 25)", marginBottom: 8 }}>Don't</div>
      {dontItem}
    </div>
  </div>
);

Object.assign(window, { SystemHeader, Section, SubHead, RuleList, Code, DoDont });
