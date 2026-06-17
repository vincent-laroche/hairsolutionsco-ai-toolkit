// SocialFull.jsx — Instagram-specific extras beyond SocialBlocks.jsx.
// Adds: two Reel covers (how-to + before/after) and a phone-feed preview that
// composes the existing posts in a 3-up grid. Existing posts (7) + new reels
// (2) + stories (3) = the full set the brief asked for.

const IGReelCanvas = ({ children, bg = "var(--obsidian)", color = "var(--paper)", label }) => (
  <div>
    <div style={{
      width: 220, height: 390,
      background: bg, color,
      borderRadius: 6, overflow: "hidden",
      display: "flex", flexDirection: "column", position: "relative",
      fontFamily: "var(--f-sans)", border: "1px solid var(--border)",
    }}>
      {children}
      {/* IG Reel UI overlay */}
      <div style={{ position: "absolute", right: 8, bottom: 90, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", opacity: 0.85 }}>
        {[["♡","42K"],["💬","890"],["↗",""],["⋮",""]].map(([i, n]) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, lineHeight: 1, color }}>{i}</div>
            {n && <div style={{ fontSize: 9, fontWeight: 700, color, marginTop: 2 }}>{n}</div>}
          </div>
        ))}
      </div>
      <div style={{
        position: "absolute", left: 12, bottom: 12, display: "flex", alignItems: "center", gap: 6,
        padding: "4px 8px", background: "oklch(0 0 0 / 35%)", borderRadius: 999,
        fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper)",
      }}>
        ▶ Reel · 0:24
      </div>
    </div>
    {label && <p style={{ margin: "8px 0 0", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{label}</p>}
  </div>
);

// 08 · Reel — How-it-works
const IGReelHowTo = () => (
  <IGReelCanvas label="08 · Reel · how-to">
    <div style={{ position: "absolute", inset: 0 }}>
      <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, oklch(0 0 0 / 0%) 40%, oklch(0 0 0 / 70%))" }} />
    </div>
    <div style={{ position: "relative", padding: "22px 20px 90px", marginTop: "auto" }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.85 0.04 70)", marginBottom: 10 }}>How it works · 04</div>
      <p style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, textTransform: "uppercase", color: "var(--paper)" }}>
        How we cut<br/>a hairline.
      </p>
      <p style={{ margin: "10px 0 0", fontSize: 11, color: "oklch(0.88 0.005 85)", lineHeight: 1.45 }}>
        Single-knot, 12 millimetres of work, two hours per system.
      </p>
    </div>
  </IGReelCanvas>
);

// 09 · Reel — Before / After
const IGReelBeforeAfter = () => (
  <IGReelCanvas bg="var(--paper)" color="var(--ink)" label="09 · Reel · before / after">
    <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "1fr 1fr" }}>
      <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
      <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
    </div>
    <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "1fr 1fr", pointerEvents: "none" }}>
      <div style={{ padding: 16, color: "var(--paper)", mixBlendMode: "difference" }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>Before</div>
      </div>
      <div style={{ padding: 16, alignSelf: "end", color: "var(--paper)", mixBlendMode: "difference" }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>After</div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: "var(--paper)", transform: "translateY(-1px)" }} />
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 32, height: 32, marginLeft: -16, marginTop: -16, borderRadius: 999, background: "var(--paper)", border: "2px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>↔</div>
  </IGReelCanvas>
);

// ─── A small grid that previews the full 9-tile feed look at brand-block level
const IGFeedPreview = ({ direction = "refined" }) => (
  <div className={`hsc-surface dir-${direction}`} style={{ padding: 20, background: "var(--paper)", border: "1px solid var(--border)", borderRadius: 12, width: 600 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: "0 4px" }}>
      <div style={{ width: 56, height: 56, borderRadius: 999, overflow: "hidden", border: "1.5px solid var(--ink)" }}>
        <Logo variant="square" tone="dark" height={56} />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>@hairsolutionsco</p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--ink-muted)" }}>4,218 posts · 38.2K followers · 412 following</p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--ink-soft)" }}>Mens hair systems · custom from scratch · Toronto</p>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
      {[
        ["obsidian","No stock\ncaps."],
        ["paper","French Lace"],
        ["paper","Hairline."],
        ["paper","Quote"],
        ["obsidian","−15%"],
        ["paper","Article"],
        ["paper","Collection"],
        ["paper","Builder"],
        ["obsidian","Spring 26"],
      ].map(([tone, label], i) => (
        <div key={i} style={{
          aspectRatio: "1",
          background: tone === "obsidian" ? "var(--obsidian)" : "var(--bg)",
          color: tone === "obsidian" ? "var(--paper)" : "var(--ink)",
          display: "flex", alignItems: "flex-end", padding: 10,
          fontSize: 11, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.1,
          whiteSpace: "pre-line",
          position: "relative",
          overflow: "hidden",
        }}>
          {i % 3 === 0 && <div style={{ position: "absolute", inset: 0 }}><PhotoPlaceholder ratio={undefined} subject={i % 2 ? "product" : "portrait"} style={{ width: "100%", height: "100%", borderRadius: 0, opacity: 0.85 }} /></div>}
          <span style={{ position: "relative" }}>{label}</span>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 14, padding: "12px 4px 0", borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--ink-muted)", textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
      9-tile cadence · 1 hero · 1 collection · 2 product · 2 blog/quote · 1 sale · 2 imagery
    </div>
  </div>
);

Object.assign(window, { IGReelHowTo, IGReelBeforeAfter, IGFeedPreview });
