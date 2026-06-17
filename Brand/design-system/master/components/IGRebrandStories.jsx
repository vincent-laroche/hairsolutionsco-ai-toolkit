// IGRebrandStories.jsx — 5 launch stories that form a launch-day sequence.
// Each is 1080×1920 (previewed at 260×462). Posted in this order over the
// launch day, they build awareness → curiosity → proof → offer → urgency.
//
// 01 · Reveal             09:00 — new wordmark drops on white
// 02 · Founder voice      10:00 — short pull from Daniel, portrait inset
// 03 · Behind the scenes  13:00 — workshop macro + "swipe to read"
// 04 · Client proof       16:00 — testimonial card with portrait + reaction
// 05 · Final hours        20:00 — countdown to the offer cutoff (May 31)

// ─── Shared Story chrome (status bar + reply field + IG tap targets) ────────
const StoryFrame = ({ children, bg = "oklch(0.99 0.002 250)", color = "oklch(0.14 0.004 60)", label, progress = 0 }) => (
  <div>
    <div style={{
      width: 260, height: 462,
      background: bg, color,
      borderRadius: 8, overflow: "hidden",
      position: "relative", fontFamily: "var(--f-sans)",
      border: "1px solid var(--border)",
    }}>
      {/* Top progress bars */}
      <div style={{ position: "absolute", left: 12, right: 12, top: 12, zIndex: 4, display: "flex", gap: 4 }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            flex: 1, height: 2, borderRadius: 2,
            background: i < progress ? (bg === "oklch(0.14 0.004 60)" ? "oklch(0.99 0.002 250)" : "oklch(0.14 0.004 60)")
                       : (bg === "oklch(0.14 0.004 60)" ? "rgba(255,255,255,0.32)" : "rgba(10,10,10,0.18)"),
          }} />
        ))}
      </div>
      {/* Profile chip */}
      <div style={{ position: "absolute", left: 12, top: 24, zIndex: 4, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 999, background: bg === "oklch(0.14 0.004 60)" ? "oklch(0.99 0.002 250)" : "oklch(0.14 0.004 60)", padding: 2 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 999, background: bg === "oklch(0.14 0.004 60)" ? "oklch(0.14 0.004 60)" : "oklch(0.99 0.002 250)" }} />
        </div>
        <p style={{ margin: 0, fontSize: 10, fontWeight: 700 }}>hairsolutionsco</p>
        <p style={{ margin: 0, fontSize: 9, color: bg === "oklch(0.14 0.004 60)" ? "rgba(255,255,255,0.55)" : "oklch(0.52 0.005 60)" }}>{label}</p>
      </div>
      {/* Content */}
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>
      {/* Reply field */}
      <div style={{ position: "absolute", left: 12, right: 12, bottom: 14, zIndex: 4, display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{
          flex: 1, padding: "7px 12px",
          border: "1px solid " + (bg === "oklch(0.14 0.004 60)" ? "rgba(255,255,255,0.4)" : "rgba(10,10,10,0.2)"),
          borderRadius: 999, fontSize: 9,
          color: bg === "oklch(0.14 0.004 60)" ? "rgba(255,255,255,0.7)" : "oklch(0.52 0.005 60)",
        }}>Send message</div>
        <span style={{ fontSize: 13 }}>♡</span>
        <span style={{ fontSize: 13 }}>↗</span>
      </div>
    </div>
  </div>
);

const StoryLabel = ({ children }) => (
  <p style={{ margin: "10px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", textAlign: "center" }}>{children}</p>
);

const LinkSticker = ({ text = "Visit hairsolutions.co" }) => (
  <div style={{
    padding: "8px 12px", background: "rgba(255,255,255,0.96)", color: "oklch(0.14 0.004 60)",
    borderRadius: 12, fontSize: 10, fontWeight: 700,
    display: "inline-flex", alignItems: "center", gap: 6,
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
  }}>
    <span style={{ width: 14, height: 14, borderRadius: 999, background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>↗</span>
    {text}
  </div>
);

// ─── 01 · Reveal ────────────────────────────────────────────────────────────
const IGRebrandStory_Reveal = () => (
  <div>
    <StoryFrame bg="oklch(0.955 0.002 250)" color="oklch(0.14 0.004 60)" label="now · launch day" progress={1}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", textAlign: "center" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "oklch(0.52 0.005 60)", marginBottom: 28 }}>
          May 15, 2026
        </div>
        <Logo tone="dark" variant="rect" height={28} />
        <p style={{ margin: "32px 0 0", fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.0, textTransform: "uppercase" }}>
          A new chapter.
        </p>
        <p style={{ margin: "12px 0 0", fontSize: 11, color: "oklch(0.52 0.005 60)", lineHeight: 1.5, maxWidth: "28ch" }}>
          Same craft. Same builders. Sharper storefront.
        </p>
      </div>
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 56, display: "flex", justifyContent: "center" }}>
        <LinkSticker text="See what's new →" />
      </div>
    </StoryFrame>
    <StoryLabel>01 · Reveal · 09:00</StoryLabel>
  </div>
);

// ─── 02 · Founder voice ─────────────────────────────────────────────────────
const IGRebrandStory_Founder = () => (
  <div>
    <StoryFrame bg="oklch(0.14 0.004 60)" color="oklch(0.99 0.002 250)" label="1h ago" progress={2}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0, opacity: 0.32 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.65), rgba(10,10,10,0.85))" }} />
      </div>
      <div style={{ position: "relative", padding: "82px 22px 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.95 0.025 85)", marginBottom: 14 }}>
            ✎ &nbsp;A note from Daniel
          </div>
          <p style={{ margin: 0, fontSize: 19, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.4 }}>
            "Same hands at the same chairs. We just gave the storefront the seriousness it always deserved."
          </p>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: "oklch(0.99 0.002 250)", overflow: "hidden" }}>
              <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, fontStyle: "italic" }}>Daniel Park</p>
              <p style={{ margin: "2px 0 0", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Founder</p>
            </div>
          </div>
          <LinkSticker text="Read the letter →" />
        </div>
      </div>
    </StoryFrame>
    <StoryLabel>02 · Founder voice · 10:00</StoryLabel>
  </div>
);

// ─── 03 · Behind the scenes ─────────────────────────────────────────────────
const IGRebrandStory_BTS = () => (
  <div>
    <StoryFrame bg="oklch(0.14 0.004 60)" color="oklch(0.99 0.002 250)" label="3h ago · workshop" progress={3}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 75%, rgba(10,10,10,0.95))" }} />
      </div>
      <div style={{ position: "absolute", left: 18, top: 72, zIndex: 3 }}>
        <div style={{
          background: "oklch(0.95 0.025 85)", color: "oklch(0.14 0.004 60)",
          padding: "5px 11px", borderRadius: 999,
          fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          display: "inline-block", transform: "rotate(-3deg)",
        }}>
          Behind the scenes
        </div>
      </div>
      <div style={{ position: "absolute", left: 18, right: 18, bottom: 86, zIndex: 3 }}>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.0, textTransform: "uppercase" }}>
          22 hours.<br/>One hairline.
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 11, color: "rgba(255,255,255,0.78)", lineHeight: 1.45, maxWidth: "32ch" }}>
          The single-knot front is 12 millimetres of work. Watch how it's made.
        </p>
      </div>
      <div style={{ position: "absolute", left: 18, right: 18, bottom: 50, zIndex: 3, display: "flex", justifyContent: "center" }}>
        <LinkSticker text="Watch the reel →" />
      </div>
    </StoryFrame>
    <StoryLabel>03 · Behind the scenes · 13:00</StoryLabel>
  </div>
);

// ─── 04 · Client proof ──────────────────────────────────────────────────────
const IGRebrandStory_Proof = () => (
  <div>
    <StoryFrame bg="oklch(0.955 0.002 250)" color="oklch(0.14 0.004 60)" label="6h ago · client review" progress={4}>
      <div style={{ position: "absolute", inset: 0, padding: "70px 20px 70px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{
          background: "oklch(0.99 0.002 250)", borderRadius: 16, padding: "20px 22px",
          boxShadow: "0 8px 24px rgba(10,10,10,0.10)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>MT</div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700 }}>Marcus T.</p>
              <p style={{ margin: "2px 0 0", fontSize: 9, color: "oklch(0.52 0.005 60)", letterSpacing: "0.08em" }}>★★★★★ · Toronto</p>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
            "I forgot it was on. Three months in, the hairline still passes when my barber lifts it."
          </p>
          <p style={{ margin: "12px 0 0", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.52 0.005 60)" }}>
            ✓ Verified · Ultra HD · 115%
          </p>
        </div>

        {/* Emoji reaction slider sticker */}
        <div style={{ background: "rgba(255,255,255,0.92)", padding: "14px 18px", borderRadius: 16, boxShadow: "0 6px 18px rgba(10,10,10,0.08)" }}>
          <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(0.52 0.005 60)" }}>How much do you trust us?</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 999, background: "linear-gradient(90deg, oklch(0.95 0.025 85), oklch(0.14 0.004 60))" }}>
              <div style={{ position: "relative", width: 20, height: 20, borderRadius: 999, background: "oklch(0.99 0.002 250)", boxShadow: "0 2px 6px rgba(0,0,0,0.2)", top: -7, left: "70%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>👌</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <LinkSticker text="See more reviews →" />
        </div>
      </div>
    </StoryFrame>
    <StoryLabel>04 · Client proof · 16:00</StoryLabel>
  </div>
);

// ─── 05 · Final hours / countdown ───────────────────────────────────────────
const IGRebrandStory_Countdown = () => (
  <div>
    <StoryFrame bg="oklch(0.14 0.004 60)" color="oklch(0.99 0.002 250)" label="now · don't miss it" progress={5}>
      <div style={{ position: "absolute", inset: 0, padding: "72px 22px 70px", display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "oklch(0.95 0.025 85)", marginBottom: 14 }}>
            ★ Launch offer · final hours
          </div>
          <p style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 84, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 0.9, color: "oklch(0.95 0.025 85)" }}>−50%</p>
          <p style={{ margin: "12px 0 0", fontSize: 14, fontWeight: 700, color: "oklch(0.99 0.002 250)" }}>on your first system</p>
        </div>

        {/* Countdown sticker */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Ends May 31, 23:59 ET</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
            {[["12","DAYS"],["04","HRS"],["18","MIN"]].map(([n, l]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", padding: "10px 12px", borderRadius: 10, minWidth: 50 }}>
                <p style={{ margin: 0, fontFamily: "var(--f-mono)", fontSize: 22, fontWeight: 700 }}>{n}</p>
                <p style={{ margin: 0, fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.55)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code + link sticker stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <div style={{
            padding: "8px 14px", background: "oklch(0.95 0.025 85)", color: "oklch(0.14 0.004 60)",
            borderRadius: 12, fontFamily: "var(--f-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em",
          }}>NEWERA50 · tap to copy</div>
          <LinkSticker text="Redeem on hairsolutions.co →" />
        </div>
      </div>
    </StoryFrame>
    <StoryLabel>05 · Final hours · 20:00</StoryLabel>
  </div>
);

// ─── Sequence preview (5 stories tiled) ─────────────────────────────────────
const IGRebrandStorySequence = () => (
  <div style={{ padding: 28, background: "var(--bg)", display: "flex", flexDirection: "column", gap: 22 }}>
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: 18 }}>
        <Eyebrow>Launch day sequence</Eyebrow>
        <p style={{ margin: "10px 0 4px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Five stories. One arc.</p>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", maxWidth: "62ch", lineHeight: 1.55 }}>
          Posted over launch day: <b>09:00 reveal</b> → <b>10:00 founder</b> → <b>13:00 behind the scenes</b> → <b>16:00 client proof</b> → <b>20:00 final hours</b>. Each story carries its own link sticker pointing to hairsolutions.co.
        </p>
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <IGRebrandStory_Reveal />
        <IGRebrandStory_Founder />
        <IGRebrandStory_BTS />
        <IGRebrandStory_Proof />
        <IGRebrandStory_Countdown />
      </div>
    </div>
  </div>
);

Object.assign(window, {
  IGRebrandStory_Reveal, IGRebrandStory_Founder, IGRebrandStory_BTS,
  IGRebrandStory_Proof, IGRebrandStory_Countdown,
  IGRebrandStorySequence,
});
