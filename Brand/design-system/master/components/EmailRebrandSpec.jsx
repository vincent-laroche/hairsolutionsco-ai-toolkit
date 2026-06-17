// EmailRebrandSpec.jsx — production deliverable spec for the marquee GIF.
// Rendered as its own artboard in the master design system so production
// knows exactly what to produce.

const EmailRebrandSpec = () => (
  <div style={{ padding: 40, background: "oklch(0.99 0.002 250)", color: "oklch(0.14 0.004 60)", fontFamily: "var(--f-sans)", width: 1240, maxWidth: "100%" }}>
    <Eyebrow>Production spec · marquee GIF</Eyebrow>
    <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 8px", fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>Animated marquee — GIF deliverable</h2>
    <p style={{ margin: "0 0 28px", fontSize: 15, color: "var(--ink-soft)", maxWidth: "70ch", lineHeight: 1.55 }}>
      We use a GIF (not CSS animation) because Outlook, Gmail and most clients strip CSS @keyframes. GIFs render in every major client — Outlook shows the first frame as a static fallback, which is a usable degradation.
    </p>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div className="hsc-card" style={{ padding: 28 }}>
        <SubHead>What to produce</SubHead>
        <RuleList items={[
          <><b>File:</b> <code>assets/email-marquee.gif</code></>,
          <><b>Dimensions:</b> 1200 × 64 px (the visible strip). Render content at 2400 × 128 internally for retina, then downsample.</>,
          <><b>Frames:</b> 36 frames · 18 fps · loops infinitely (≈2.0 s per loop).</>,
          <><b>Motion:</b> the strip translates horizontally <code>-50%</code> of its own width over one loop — phrases scroll right→left, then seamlessly repeat. No easing — linear only.</>,
          <><b>Source pattern</b> (repeat to fill the strip 2× across):<br/>
            <code>"Same craft  —  New look  —  100,000+ men  —"</code></>,
          <><b>Type:</b> Geist Extra Bold 800 · 32 px · tracking -0.02em · uppercase.</>,
          <><b>Colours:</b> bg <code>oklch(0.14 0.004 60)</code> · white text <code>oklch(0.99 0.002 250)</code> · cream dash <code>oklch(0.95 0.025 85)</code> · top + bottom hairline <code>rgba(255,255,255,0.10)</code>.</>,
          <><b>Padding:</b> 16 px top + bottom inside the strip · 40 px gap between phrases.</>,
          <><b>File size:</b> target ≤ 200 KB · max 500 KB. Use 64-colour palette + Floyd-Steinberg dither.</>,
        ]} />
      </div>
      <div className="hsc-card" style={{ padding: 28 }}>
        <SubHead>How to render in the email</SubHead>
        <Code>{`<!-- HTML (use in HubSpot module) -->
<a href="https://www.hairsolutions.co" style="display:block;background:oklch(0.14 0.004 60);">
  <img
    src="https://cdn.hairsolutions.co/email/marquee.gif"
    width="600"
    alt="Same craft — New look — 100,000+ men"
    style="display:block;width:100%;height:auto;border:0;outline:none;text-decoration:none;"
  />
</a>`}</Code>
        <p style={{ margin: "14px 0 0", fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.6 }}>
          Always wrap the GIF in an anchor pointing to hairsolutions.co — Outlook shows the first frame, so the first frame must read as a CTA on its own.
        </p>
      </div>
    </div>

    <div style={{ marginTop: 24 }} className="hsc-card">
      <div style={{ padding: 28 }}>
        <SubHead>Client support matrix</SubHead>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "var(--ink-muted)" }}>
              {["Client", "GIF support", "Fallback behaviour"].map(h => (
                <th key={h} style={{ padding: "10px 0", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Apple Mail (Mac · iOS)", "✓ Animates", "—"],
              ["Gmail (web · app)", "✓ Animates", "—"],
              ["Outlook 365 (web)", "✓ Animates", "—"],
              ["Outlook 2019 / desktop Win", "✗ First frame only", "Static fallback — designs frame 1 to read as a static ticker"],
              ["Yahoo / AOL", "✓ Animates", "—"],
              ["Superhuman · Hey", "✓ Animates", "—"],
              ["Dark-mode (all)", "✓ Animates", "Strip is already dark — no inversion concern"],
            ].map(r => (
              <tr key={r[0]} style={{ borderTop: "1px solid var(--border)" }}>
                {r.map((c, i) => (
                  <td key={i} style={{ padding: "10px 0", fontFamily: i === 1 ? "var(--f-mono)" : "var(--f-sans)", fontSize: 13, color: i === 0 ? "var(--ink)" : "var(--ink-soft)" }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div style={{ marginTop: 24 }} className="hsc-card">
      <div style={{ padding: 28 }}>
        <SubHead>Static frame preview (the Outlook fallback + design system preview)</SubHead>
        <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
          <img src="assets/email-marquee-strip.png" alt="Marquee preview" style={{ display: "block", width: "100%", height: "auto" }} />
        </div>
        <p style={{ margin: "14px 0 0", fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.6 }}>
          This still PNG is what currently renders in the design system preview and serves as the Outlook fallback. The production GIF will animate this exact strip horizontally.
        </p>
      </div>
    </div>
  </div>
);

Object.assign(window, { EmailRebrandSpec });
