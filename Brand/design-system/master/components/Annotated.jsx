// Annotated.jsx
// Wraps any block with a section-name annotation visible on the design itself.
// Two visual modes:
//   - "side"   → label floats to the right of the block (used for emails)
//   - "inline" → small chip in the top-right corner of the block (used for web)

const Annotated = ({ name, idx, children, mode = "side", tone = "light", style }) => {
  const isDark = tone === "dark";
  const color = isDark ? "oklch(0.78 0.006 85)" : "var(--ink-muted)";
  const stripe = isDark ? "oklch(0.78 0.006 85 / 50%)" : "var(--border-strong)";

  if (mode === "inline") {
    return (
      <div style={{ position: "relative", ...style }}>
        <div style={{
          position: "absolute",
          top: 12, right: 12,
          fontFamily: "var(--f-mono)",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color,
          background: isDark ? "oklch(0 0 0 / 35%)" : "oklch(1 0 0 / 75%)",
          border: "1px solid " + stripe,
          padding: "4px 8px",
          borderRadius: 4,
          backdropFilter: "blur(4px)",
          pointerEvents: "none",
          zIndex: 2,
        }}>
          {idx != null && <span style={{ opacity: 0.5, marginRight: 6 }}>{String(idx).padStart(2, "0")}</span>}
          {name}
        </div>
        {children}
      </div>
    );
  }

  // side mode
  return (
    <div style={{ position: "relative", ...style }}>
      {children}
      <div style={{
        position: "absolute",
        left: "100%",
        top: 16,
        marginLeft: 16,
        width: 200,
        fontFamily: "var(--f-mono)",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color,
        lineHeight: 1.5,
        pointerEvents: "none",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{
            display: "inline-block",
            width: 28,
            height: 1,
            background: stripe,
          }}/>
          <span style={{ opacity: 0.55 }}>{idx != null ? String(idx).padStart(2, "0") : "—"}</span>
        </div>
        <div style={{ marginTop: 4, color: isDark ? "oklch(0.92 0.005 85)" : "var(--ink)" }}>{name}</div>
      </div>
    </div>
  );
};

// AnnotatedStack: a column of blocks where each child is wrapped with an
// auto-numbered side annotation. Accepts an array of { name, node } objects.
const AnnotatedStack = ({ items, mode = "side", tone = "light", gap = 0 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap }}>
    {items.map((it, i) => (
      <Annotated key={i} name={it.name} idx={i + 1} mode={mode} tone={it.tone || tone}>
        {it.node}
      </Annotated>
    ))}
  </div>
);

Object.assign(window, { Annotated, AnnotatedStack });
