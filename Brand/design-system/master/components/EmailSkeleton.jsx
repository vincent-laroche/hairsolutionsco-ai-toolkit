// EmailSkeleton.jsx
// Renders one skeleton (in-email wireframe) per record. Uses the v2 token system.
// Each record gets a recipe-driven block stack: promotional / transactional / recap / nurture.

const RECIPES = {
  // journey_code → block sequence + tone hints
  J1:        { recipe: "nurture",    notes: "Lead-magnet welcome series; 5 touches over ~14 days." },
  J2:        { recipe: "nurture",    notes: "Newsletter / educational; 5 emails, no hard sell." },
  WELCOME:   { recipe: "nurture",    notes: "Subscriber welcome; convert to first purchase." },
  WINBACK:   { recipe: "winback",    notes: "Re-engagement series; 4 touches escalating to goodbye." },
  BROWSE:    { recipe: "browse",     notes: "Browse-abandon; behavioral, very short." },
  CAMPAIGN:  { recipe: "promotional",notes: "Site relaunch + first-order activation." },
  CM:        { recipe: "operations", notes: "Legacy ops emails — review/referral/win-back/VIP." },
};

const STATUS_PILL = (s) => {
  const v = (s||"").toLowerCase();
  if (v.includes("ready"))   return ["pill-keep",   "Copy ready"];
  if (v.includes("draft"))   return ["pill-merge",  "Draft"];
  if (v.includes("review"))  return ["pill-merge",  "In review"];
  if (v.includes("blocked")) return ["pill-delete", "Blocked"];
  if (v.includes("live"))    return ["pill-keep",   "Live"];
  return ["pill-merge", s || "—"];
};

// ─── Skeleton primitives (echo email block proportions, no real copy) ─────────
const SkLine = ({ w = "100%", h = 10, c = "var(--stone)", style }) => (
  <div style={{ width: w, height: h, background: c, borderRadius: 2, ...style }} />
);
const SkStack = ({ children, gap = 8 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap }}>{children}</div>
);

const SkHeader = () => (
  <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "center" }}>
    <div style={{ width: 96, height: 14, background: "var(--ink)", borderRadius: 2 }} />
  </div>
);

const SkHero = ({ subject, preheader, eyebrow }) => (
  <div style={{ padding: "32px 28px 28px", borderBottom: "1px solid var(--border)" }}>
    {eyebrow && <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 12 }}>{eyebrow}</div>}
    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ink)", marginBottom: 6 }}>{subject || "—"}</div>
    {preheader && <div style={{ fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.5 }}>{preheader}</div>}
  </div>
);

const SkParagraph = () => (
  <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)" }}>
    <SkStack gap={6}>
      <SkLine w="92%" />
      <SkLine w="86%" />
      <SkLine w="60%" />
    </SkStack>
  </div>
);

const SkInsightCard = ({ label = "Personalized snapshot" }) => (
  <div style={{ padding: "20px 28px" }}>
    <div style={{ background: "var(--bg-deep)", borderRadius: 12, padding: 18, border: "1px solid var(--border)" }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>{label}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ background: "var(--paper)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ height: 18, width: 24, margin: "0 auto 4px", background: "var(--ink)", borderRadius: 2 }} />
            <SkLine w={50} h={6} style={{ margin: "0 auto" }} />
          </div>
        ))}
      </div>
      <SkLine w="80%" />
    </div>
  </div>
);

const SkSplit = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--border)" }}>
    <div style={{ padding: "20px 14px 20px 28px" }}>
      <SkStack gap={6}>
        <div style={{ width: 60, height: 8, background: "var(--ink)", borderRadius: 2 }} />
        <SkLine w="80%" h={12} />
        <SkLine w="92%" />
        <SkLine w="70%" />
      </SkStack>
    </div>
    <div style={{ padding: "20px 28px 20px 14px" }}>
      <div style={{ aspectRatio: "4/3", background: "var(--stone)", borderRadius: 10 }} />
    </div>
  </div>
);

const SkProductGrid = () => (
  <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {[0,1,2,3].map(i => (
        <div key={i}>
          <div style={{ aspectRatio: "1", background: "var(--stone)", borderRadius: 8, marginBottom: 8 }} />
          <SkLine w="70%" h={8} />
          <div style={{ height: 6 }} />
          <SkLine w="90%" h={6} />
        </div>
      ))}
    </div>
  </div>
);

const SkOrderTable = () => (
  <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)" }}>
    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>Order summary</div>
    <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
      {["Order","Base type","Density","Hair type"].map((label, i) => (
        <div key={label} style={{ display: "flex", padding: "10px 14px", background: i % 2 ? "var(--paper)" : "var(--bg-deep)", borderTop: i ? "1px solid var(--border)" : "none", fontSize: 11 }}>
          <div style={{ width: "40%", fontWeight: 700, color: "var(--ink)" }}>{label}</div>
          <SkLine w={80} h={8} style={{ alignSelf: "center" }} />
        </div>
      ))}
    </div>
  </div>
);

const SkTestimonial = () => (
  <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)" }}>
    <div style={{ borderLeft: "2px solid var(--ink)", paddingLeft: 14 }}>
      <SkLine w="92%" />
      <div style={{ height: 6 }} />
      <SkLine w="78%" />
      <div style={{ height: 12 }} />
      <SkLine w={80} h={7} c="var(--ink)" />
    </div>
  </div>
);

const SkDarkBreaker = ({ ctaLabel }) => (
  <div style={{ background: "var(--obsidian)", padding: "28px 28px", color: "var(--paper)", textAlign: "center" }}>
    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.7 0.006 85)", marginBottom: 10 }}>The next step</div>
    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16 }}>—</div>
    <div style={{ display: "inline-block", padding: "10px 18px", background: "var(--paper)", color: "var(--ink)", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{ctaLabel || "Primary CTA"}</div>
  </div>
);

const SkCTA = ({ label, secondary }) => (
  <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
    <div style={{ padding: "10px 18px", background: "var(--ink)", color: "var(--paper)", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label || "Primary CTA"}</div>
    {secondary && <div style={{ padding: "10px 18px", background: "transparent", color: "var(--ink)", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", border: "1px solid var(--border-strong)" }}>{secondary}</div>}
  </div>
);

const SkFooter = () => (
  <div style={{ padding: "20px 28px", textAlign: "center", background: "var(--bg-deep)" }}>
    <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 10 }}>
      {["IG","FB","Web"].map(s => <div key={s} style={{ fontSize: 9, color: "var(--ink-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s}</div>)}
    </div>
    <SkLine w={120} h={6} c="var(--ink-muted)" style={{ margin: "0 auto 6px" }} />
    <SkLine w={80} h={6} c="var(--ink-muted)" style={{ margin: "0 auto" }} />
  </div>
);

// ─── Recipe-driven assembly ──────────────────────────────────────────────────
function buildBlocks(rec) {
  const recipe = RECIPES[rec.jc]?.recipe || "nurture";
  const ctas = (rec.cta || "").split(/[,;]|\((primary|secondary)\)/i).map(s => s && s.trim()).filter(Boolean);
  const primaryCta = ctas[0] || "Primary CTA";
  const secondaryCta = ctas.find((c, i) => i > 0 && c.length < 40);

  const blocks = ["header"];

  // hero is always present
  blocks.push("hero");

  if (recipe === "nurture") {
    blocks.push("paragraph", "split", "testimonial", "cta", "darkBreaker");
  } else if (recipe === "winback") {
    blocks.push("paragraph", "insight", "split", "cta");
    if (/offer|discount|incentive/i.test(rec.name)) blocks.splice(blocks.length-1, 0, "darkBreaker");
  } else if (recipe === "browse") {
    blocks.push("split", "productGrid", "cta");
  } else if (recipe === "promotional") {
    blocks.push("paragraph", "productGrid", "testimonial", "darkBreaker");
  } else if (recipe === "operations") {
    if (/order|delivery|shipped|warranty/i.test(rec.name)) blocks.push("paragraph", "orderTable", "cta");
    else if (/review/i.test(rec.name))                    blocks.push("paragraph", "testimonial", "cta");
    else if (/referral|VIP|thank/i.test(rec.name))        blocks.push("paragraph", "split", "cta");
    else if (/cart/i.test(rec.name))                      blocks.push("split", "productGrid", "cta");
    else                                                  blocks.push("paragraph", "split", "cta");
  }
  blocks.push("footer");
  return { blocks, primaryCta, secondaryCta };
}

const SkBlock = ({ kind, rec, primaryCta, secondaryCta }) => {
  switch (kind) {
    case "header":       return <SkHeader />;
    case "hero":         return <SkHero subject={rec.subject} preheader={rec.preheader} eyebrow={rec.id} />;
    case "paragraph":    return <SkParagraph />;
    case "insight":      return <SkInsightCard label={rec.audience === "elite" ? "Your account · this year" : "Personalized snapshot"} />;
    case "split":        return <SkSplit />;
    case "productGrid":  return <SkProductGrid />;
    case "orderTable":   return <SkOrderTable />;
    case "testimonial":  return <SkTestimonial />;
    case "darkBreaker":  return <SkDarkBreaker ctaLabel={primaryCta} />;
    case "cta":          return <SkCTA label={primaryCta} secondary={secondaryCta} />;
    case "footer":       return <SkFooter />;
    default: return null;
  }
};

const EmailSkeleton = ({ rec }) => {
  const { blocks, primaryCta, secondaryCta } = buildBlocks(rec);
  const [pillCls, pillLabel] = STATUS_PILL(rec.status);

  return (
    <div className="hsc-card" style={{ padding: 0, overflow: "hidden", background: "var(--paper)" }}>
      {/* Meta strip */}
      <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", background: "var(--bg)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)", letterSpacing: "0.08em" }}>{rec.id}</div>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 2 }}>{rec.name}</div>
        </div>
        <span className={"pill " + pillCls}>{pillLabel}</span>
      </div>

      {/* Subject + meta details */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5 }}>
        <div><span style={{ fontWeight: 600 }}>Subject:</span> {rec.subject || "—"}</div>
        {rec.preheader && <div style={{ color: "var(--ink-muted)", marginTop: 4 }}><span style={{ fontWeight: 600 }}>Preheader:</span> {rec.preheader}</div>}
        <div style={{ marginTop: 6, display: "flex", gap: 14, flexWrap: "wrap", fontSize: 11, color: "var(--ink-muted)", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 }}>
          {rec.audience && <span>{rec.audience}</span>}
          {rec.timing && <span>· {rec.timing.slice(0, 38)}{rec.timing.length > 38 ? "…" : ""}</span>}
          {rec.kpi && <span>· KPI: {rec.kpi.slice(0, 22)}{rec.kpi.length > 22 ? "…" : ""}</span>}
        </div>
      </div>

      {/* Skeleton stack */}
      <div style={{ background: "var(--bg)" }}>
        <div style={{ maxWidth: 480, margin: "16px auto", background: "var(--paper)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          {blocks.map((k, i) => <SkBlock key={i} kind={k} rec={rec} primaryCta={primaryCta} secondaryCta={secondaryCta} />)}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { EmailSkeleton, RECIPES });
