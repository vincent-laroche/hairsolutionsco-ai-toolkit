// IGRebrandPosts.jsx — the 3 launch feed posts (first row of the grid).
// Designed as a triptych: when viewed as a 3-tile row on the profile they
// read as one continuous reveal.
// Each post is 360×360 at preview (1080×1080 at export).

// Shared canvas
const IGLaunchCanvas = ({ children, bg, color = "oklch(0.99 0.002 250)", label, urlColor }) => (
  <div>
    <div style={{
      width: 360, height: 360, background: bg, color,
      position: "relative", overflow: "hidden",
      fontFamily: "var(--f-sans)", border: "1px solid var(--border)",
    }}>
      {children}
      {/* URL footer — centered "hairsolutions.co" on every post */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 16,
        textAlign: "center",
        fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
        color: urlColor || (bg === "oklch(0.14 0.004 60)" ? "rgba(255,255,255,0.65)" : "oklch(0.52 0.005 60)"),
      }}>hairsolutions.co</div>
    </div>
    {label && <p style={{ margin: "10px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{label}</p>}
  </div>
);

// 1 · TEASE — pure black + cream dot accent
const IGLaunch1_Tease = () => (
  <IGLaunchCanvas bg="oklch(0.14 0.004 60)" label="01 · Tease · pre-reveal">
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px" }}>
      <p style={{
        margin: 0,
        fontSize: 38, fontWeight: 600,
        letterSpacing: "-0.025em", lineHeight: 1.08,
        textAlign: "center", color: "oklch(0.99 0.002 250)",
        maxWidth: "16ch",
      }}>
        Something quiet is about to change.
      </p>
      <div style={{ marginTop: 28, width: 14, height: 14, borderRadius: 999, background: "oklch(0.95 0.025 85)" }} />
    </div>
  </IGLaunchCanvas>
);

// 2 · REVEAL — centred wordmark big (the logo IS the design)
const IGLaunch2_Reveal = () => (
  <IGLaunchCanvas bg="oklch(0.955 0.002 250)" color="oklch(0.14 0.004 60)" label="02 · Reveal · the wordmark">
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", textAlign: "center" }}>
      <Logo tone="dark" variant="rect" height={64} />
      <p style={{
        margin: "36px 0 0",
        fontSize: 17, fontWeight: 500,
        letterSpacing: "-0.01em", lineHeight: 1.35,
        color: "oklch(0.19 0.005 60)",
        maxWidth: "30ch",
      }}>
        A new chapter for men's hair systems. Same craft. Same builders.
      </p>
    </div>
  </IGLaunchCanvas>
);

// 3 · INVITE — the 50% offer
const IGLaunch3_Invite = () => (
  <IGLaunchCanvas bg="oklch(0.14 0.004 60)" label="03 · Invite · offer">
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--f-serif)",
        margin: 0, fontSize: 96, fontWeight: 400,
        letterSpacing: "-0.02em", lineHeight: 0.9,
        color: "oklch(0.95 0.025 85)",
      }}>−50%</p>
      <p style={{ margin: "16px 0 0", fontSize: 17, fontWeight: 500, color: "oklch(0.99 0.002 250)", letterSpacing: "-0.01em" }}>
        on your first system
      </p>
      <p style={{
        margin: "20px auto 0",
        padding: "6px 14px",
        border: "1px solid rgba(255,255,255,0.22)",
        borderRadius: 999,
        fontFamily: "var(--f-mono)",
        fontSize: 12, fontWeight: 600,
        letterSpacing: "0.04em", color: "oklch(0.99 0.002 250)",
      }}>
        Code · NEWERA50
      </p>
    </div>
  </IGLaunchCanvas>
);

Object.assign(window, { IGLaunch1_Tease, IGLaunch2_Reveal, IGLaunch3_Invite });
