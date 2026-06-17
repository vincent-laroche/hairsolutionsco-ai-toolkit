// Shared visual primitives used across both directions.
// Both directions share the same markup — direction-specific visuals come from CSS tokens.

const Logo = ({ variant = "rect", tone = "dark", height = 18 }) => {
  const src = variant === "square"
    ? (tone === "light" ? "assets/logo-square-white.png" : "assets/logo-square-black.png")
    : (tone === "light" ? "assets/logo-rect-white.png" : "assets/logo-rect-black.png");
  return <img src={src} alt="Hair Solutions Co." style={{ height, width: "auto", display: "block" }} />;
};

const Eyebrow = ({ children, style }) => (
  <div className="hsc-eyebrow" style={style}>{children}</div>
);

const Btn = ({ children, variant = "primary", as: As = "a", style, ...rest }) => (
  <As className={`hsc-btn hsc-btn-${variant}`} style={style} {...rest}>
    {children}
    {variant === "primary" && <Arrow />}
  </As>
);

const Arrow = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
    <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
  </svg>
);

// Placeholder image — solid neutral with an editorial diagonal cross, zero AI-slop.
const Placeholder = ({ label, ratio = "4 / 5", tone = "stone", style }) => {
  const palette = {
    stone:  { bg: "oklch(0.88 0.003 250)", fg: "oklch(0.52 0.005 60)" },
    dark:   { bg: "oklch(0.19 0.005 60)", fg: "oklch(0.70 0.004 60)" },
    warm:   { bg: "oklch(0.95 0.025 85)", fg: "oklch(0.30 0.02 70)" },
    clay:   { bg: "oklch(0.95 0.025 85)", fg: "oklch(0.14 0.004 60)" },
  }[tone] || { bg: "oklch(0.88 0.003 250)", fg: "oklch(0.52 0.005 60)" };
  return (
    <div
      className="hsc-image"
      style={{
        aspectRatio: ratio,
        background: palette.bg,
        color: palette.fg,
        display: "flex",
        alignItems: "flex-end",
        padding: 16,
        ...style,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(135deg, transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 0.5px))," +
          "linear-gradient(45deg,  transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 0.5px))",
        opacity: 0.18,
      }}/>
      <div style={{
        position: "relative",
        fontFamily: "var(--f-mono)",
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}>{label}</div>
    </div>
  );
};

// For photo-like placeholders, use a high-contrast B&W editorial gradient.
// Brand uses B&W for hero / editorial, warm tones reserved for transformation
// portraits only (passed as subject="transformation").
const PhotoPlaceholder = ({ label, ratio = "4 / 5", subject = "portrait", style }) => (
  <div className="hsc-image" style={{ aspectRatio: ratio, position: "relative", background: "oklch(0.14 0.004 60)", ...style }}>
    <div style={{
      position: "absolute", inset: 0,
      background: subject === "portrait"
        ? "radial-gradient(ellipse 60% 50% at 50% 38%, oklch(0.52 0.005 60) 0%, oklch(0.19 0.005 60) 55%, oklch(0.14 0.004 60) 100%)"
        : subject === "product"
        ? "radial-gradient(ellipse 70% 55% at 50% 55%, oklch(0.99 0.002 250), oklch(0.88 0.003 250) 55%, oklch(0.82 0.003 250))"
        : subject === "transformation"
        ? "linear-gradient(120deg, oklch(0.45 0.02 70), oklch(0.20 0.006 60) 60%, oklch(0.12 0.005 60))"
        : "linear-gradient(180deg, oklch(0.25 0.005 60), oklch(0.14 0.004 60))",
    }}/>
    {subject === "portrait" && (
      <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMax meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.92 }} aria-hidden>
        <defs>
          <radialGradient id="bw-skin" cx="50%" cy="35%" r="42%">
            <stop offset="0%" stopColor="oklch(0.70 0.004 60)"/>
            <stop offset="60%" stopColor="#3A3A3A"/>
            <stop offset="100%" stopColor="#0F0F0F"/>
          </radialGradient>
          <linearGradient id="bw-hair" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.25 0.005 60)"/>
            <stop offset="100%" stopColor="oklch(0.14 0.004 60)"/>
          </linearGradient>
        </defs>
        {/* Hair mass / silhouette top */}
        <path d="M28 22 Q34 8 50 8 Q66 8 72 22 Q74 32 70 40 Q60 32 50 32 Q40 32 30 40 Q26 32 28 22Z" fill="url(#bw-hair)"/>
        {/* Face */}
        <path d="M50 16 Q67 16 67 40 Q67 58 50 60 Q33 58 33 40 Q33 16 50 16Z" fill="url(#bw-skin)"/>
        {/* Shoulders */}
        <path d="M14 120 Q22 80 50 74 Q78 80 86 120 Z" fill="oklch(0.14 0.004 60)"/>
      </svg>
    )}
    {subject === "product" && (
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden>
        {/* Hair system top (cap) */}
        <defs>
          <linearGradient id="cap-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.70 0.004 60)"/>
            <stop offset="100%" stopColor="#3F3F3F"/>
          </linearGradient>
          <linearGradient id="hair-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.25 0.005 60)"/>
            <stop offset="100%" stopColor="#0F0F0F"/>
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="42" rx="34" ry="22" fill="url(#cap-grad)"/>
        <path d="M16 50 Q24 64 50 66 Q76 64 84 50 Q80 70 50 72 Q20 70 16 50Z" fill="url(#hair-grad)"/>
        <path d="M22 48 Q50 56 78 48" stroke="oklch(0.955 0.002 250)" strokeWidth="0.4" fill="none" opacity="0.5"/>
      </svg>
    )}
    {/* Editorial vignette */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 80% at 50% 40%, transparent 50%, rgba(0,0,0,0.35) 100%)", pointerEvents: "none" }} />
    {label && (
      <div style={{
        position: "absolute", left: 16, bottom: 14,
        fontFamily: "var(--f-mono)",
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "oklch(0.99 0.002 250)",
        textShadow: "0 1px 2px rgba(0,0,0,0.5)",
      }}>{label}</div>
    )}
  </div>
);

Object.assign(window, { Logo, Eyebrow, Btn, Arrow, Placeholder, PhotoPlaceholder });
