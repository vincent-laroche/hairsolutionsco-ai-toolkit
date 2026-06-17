// PhotoLibrary.jsx — visual catalog of the brand photo set with intended uses.
// Renders inside an artboard in the master design system.

const PhotoLibrary = () => (
  <div style={{ padding: 40, background: "oklch(0.99 0.002 250)", color: "oklch(0.14 0.004 60)", fontFamily: "var(--f-sans)", width: 1440, maxWidth: "100%" }}>
    <Eyebrow>Brand · Photo library</Eyebrow>
    <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 8px", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em" }}>The shot list.</h2>
    <p style={{ margin: 0, fontSize: 15, color: "oklch(0.52 0.005 60)", lineHeight: 1.55, maxWidth: "72ch" }}>
      Fourteen photographs. Each is tagged with the moment in the brand it owns — emails, stories, reels, product pages. When the launch campaign ships, every placeholder block falls back to one of these.
    </p>

    <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
      {Object.entries(HSC_PHOTOS).map(([key, p]) => (
        <div key={key} className="hsc-card" style={{ padding: 0 }}>
          <div style={{ aspectRatio: "4 / 5", overflow: "hidden", background: "oklch(0.14 0.004 60)" }}>
            <img src={p.src} alt={p.use} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "14px 16px 16px" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "oklch(0.52 0.005 60)", marginBottom: 6 }}>{key}</div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.4 }}>{p.use}</p>
          </div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 36 }} className="hsc-card">
      <div style={{ padding: 28 }}>
        <SubHead>Suggested next shots (gaps in the library)</SubHead>
        <RuleList items={[
          <><b>Hands-on craft macro</b> — close-up of single-knot ventilation at the hairline. Same lighting as the existing macro shot.</>,
          <><b>Workshop ambient · wide</b> — full room shot, four builders at chairs, no faces required.</>,
          <><b>Founder portrait · clean</b> — formal B&W headshot of Daniel against neutral grey for the About page and founder email.</>,
          <><b>Product still life</b> — system on a plain studio surface, top-down, no hand. For PDP gallery thumbnail 2.</>,
          <><b>Care-kit unboxing</b> — flatlay of adhesive, tape, brush, scissors. For the care-kit upsell email block.</>,
        ]} />
      </div>
    </div>
  </div>
);

Object.assign(window, { PhotoLibrary });
