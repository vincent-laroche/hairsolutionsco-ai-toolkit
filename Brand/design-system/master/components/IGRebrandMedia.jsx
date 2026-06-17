// IGRebrandMedia.jsx — Story + Reel cover for the launch.

// ─── STORY · 1080×1920 → previewed at 260×462 ──────────────────────────────
const IGRebrandStory = () => (
  <div>
    <div style={{
      width: 260, height: 462,
      background: "oklch(0.14 0.004 60)",
      borderRadius: 8, overflow: "hidden",
      display: "flex", flexDirection: "column", position: "relative",
      fontFamily: "var(--f-sans)", border: "1px solid var(--border)",
      color: "oklch(0.99 0.002 250)",
    }}>
      {/* IG UI top: profile + progress bars */}
      <div style={{ position: "absolute", left: 12, right: 12, top: 12, zIndex: 3 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 2, background: "oklch(0.99 0.002 250)", borderRadius: 2 }} />
          <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
          <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 999, background: "oklch(0.99 0.002 250)", padding: 2 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 999, background: "oklch(0.14 0.004 60)" }} />
          </div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700 }}>hairsolutionsco</p>
          <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.6)" }}>now</p>
        </div>
      </div>

      {/* Editorial portrait fills the canvas */}
      <div style={{ position: "absolute", inset: 0 }}>
        <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.9) 100%)" }} />
      </div>

      {/* Mid · headline */}
      <div style={{ position: "relative", marginTop: 78, padding: "0 22px", zIndex: 2 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.95 0.025 85)", marginBottom: 14 }}>
          ★ New chapter
        </div>
        <p style={{ margin: 0, fontSize: 38, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 0.95, textTransform: "uppercase" }}>
          New<br/>era.
        </p>
      </div>

      {/* Bottom · sticker stack */}
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 70, zIndex: 2 }}>
        <div style={{ padding: "10px 14px", background: "oklch(0.95 0.025 85)", color: "oklch(0.14 0.004 60)", borderRadius: 14, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>−50% your first system</span>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10 }}>NEWERA50</span>
        </div>
        <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.95)", color: "oklch(0.14 0.004 60)", borderRadius: 14, fontSize: 11, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 14, borderRadius: 999, background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>↗</span>
            VISIT &nbsp;hairsolutions.co
          </span>
          <span style={{ fontSize: 9, color: "oklch(0.52 0.005 60)" }}>Tap →</span>
        </div>
      </div>

      {/* IG reply field */}
      <div style={{ position: "absolute", left: 12, right: 12, bottom: 16, zIndex: 2, display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ flex: 1, padding: "7px 12px", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 999, fontSize: 10, color: "rgba(255,255,255,0.85)" }}>Send message</div>
        <span style={{ fontSize: 14 }}>♡</span>
        <span style={{ fontSize: 14 }}>↗</span>
      </div>
    </div>
    <p style={{ margin: "10px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Story · launch announcement</p>
  </div>
);

// ─── REEL · idea board (cover + scene plan) ────────────────────────────────
const IGRebrandReel = () => (
  <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24 }}>
    {/* Reel cover */}
    <div>
      <div style={{
        width: 260, height: 462,
        background: "oklch(0.14 0.004 60)",
        borderRadius: 8, overflow: "hidden",
        position: "relative",
        fontFamily: "var(--f-sans)", border: "1px solid var(--border)",
        color: "oklch(0.99 0.002 250)",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.6), rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.9))" }} />
        </div>
        <div style={{ position: "absolute", left: 16, top: 16, display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "rgba(0,0,0,0.55)", borderRadius: 999, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          ▶ Reel · 0:42
        </div>
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 110, textAlign: "center" }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.95 0.025 85)", marginBottom: 12 }}>
            Behind the rebrand
          </div>
          <p style={{ margin: 0, fontSize: 36, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 0.94, textTransform: "uppercase" }}>
            Same hands.<br/>New look.
          </p>
        </div>
        {/* Reel UI right rail */}
        <div style={{ position: "absolute", right: 8, bottom: 100, display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          {[["♡","12.4K"],["💬","320"],["↗",""],["⋮",""]].map(([i, n]) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16 }}>{i}</div>
              {n && <div style={{ fontSize: 8, fontWeight: 700, marginTop: 2 }}>{n}</div>}
            </div>
          ))}
        </div>
        {/* Audio strip */}
        <div style={{ position: "absolute", left: 12, right: 12, bottom: 16, padding: "6px 10px", background: "rgba(0,0,0,0.5)", borderRadius: 999, display: "flex", alignItems: "center", gap: 6, fontSize: 9 }}>
          <span style={{ width: 14, height: 14, borderRadius: 999, background: "oklch(0.99 0.002 250)", color: "oklch(0.14 0.004 60)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>♫</span>
          <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>hairsolutionsco · Original audio</span>
        </div>
      </div>
      <p style={{ margin: "10px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Reel cover · 9:16</p>
    </div>

    {/* Reel storyboard / scene plan */}
    <div className="hsc-card" style={{ padding: "28px 32px", alignSelf: "flex-start" }}>
      <Eyebrow>Reel concept · ~42 seconds</Eyebrow>
      <h3 style={{ margin: "12px 0 6px", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>"Same hands. New look."</h3>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.55, maxWidth: "56ch" }}>
        Shot in the Toronto workshop. Macro close-ups of the craft — knotting, scissors, hairline — cut against full-frame title cards. No talking head. Audio: a single ambient hum + scissor snips, soft strings into the title moment.
      </p>
      <div style={{ borderTop: "1px solid var(--border)" }}>
        {[
          ["0:00 – 0:04", "Macro close-up of single-knot ventilation on French Lace. Black title card overlay: 'Since 2022.'"],
          ["0:04 – 0:10", "Scissors snipping at the hairline. Cream dot timer ticks in lower-right."],
          ["0:10 – 0:16", "Hands pressing a system to a mould. Beat drops. Cut to black."],
          ["0:16 – 0:22", "Old wordmark fades in centred. Holds for 1 sec. Cuts left."],
          ["0:22 – 0:28", "New wordmark slides in from the right. Holds. Audio swells."],
          ["0:28 – 0:36", "Three-second clips of B&W portrait wearers. Each holds for ~1s. Title card: 'Same hands. New look.'"],
          ["0:36 – 0:42", "End card: hairsolutions.co · −50% NEWERA50 · cream accent. CTA sticker bottom-right."],
        ].map(([t, d]) => (
          <div key={t} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "80px 1fr", gap: 14, alignItems: "baseline" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)" }}>{t}</div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.55 }}>{d}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, fontSize: 11 }}>
        {[
          ["Hook", "First 2 seconds = macro scissor snip + black title"],
          ["Hashtags", "#hairsolutions #hairsystem #mensgrooming #toronto"],
          ["CTA", "Link sticker → hairsolutions.co"],
        ].map(([k, v]) => (
          <div key={k} style={{ padding: "10px 12px", background: "var(--bg-deep)", borderRadius: 8 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{k}</div>
            <div style={{ marginTop: 4, color: "var(--ink-soft)", lineHeight: 1.45 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Profile preview of the 3-post launch row ──────────────────────────────
const IGRebrandRowPreview = () => (
  <div className="hsc-surface dir-refined" style={{ padding: 24, background: "oklch(0.99 0.002 250)", border: "1px solid var(--border)", borderRadius: 12, width: 800 }}>
    <div style={{ marginBottom: 16, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
      ★ First row of the @hairsolutionsco grid · launch day
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
      {[<IGLaunch1_Tease />, <IGLaunch2_Reveal />, <IGLaunch3_Invite />].map((P, i) => (
        <div key={i} style={{ aspectRatio: "1", overflow: "hidden", position: "relative" }}>
          <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: 360 / 0.65, height: 360 / 0.65 }}>
            {P}
          </div>
        </div>
      ))}
    </div>
    <p style={{ margin: "14px 0 0", fontSize: 12, color: "var(--ink-muted)", textAlign: "center" }}>
      Posted left → right, 30 minutes apart. Reads as a triptych: tease · reveal · invite.
    </p>
  </div>
);

Object.assign(window, { IGRebrandStory, IGRebrandReel, IGRebrandRowPreview });
