// WebPages.jsx — full top-to-bottom web pages
// Four pages: Home, About, Collection, Product. Each is composed of named
// section blocks; the page renders as an AnnotatedStack so each section
// shows its label in the right gutter.

// ─── PRIMITIVES ─────────────────────────────────────────────────────────────

const WPage = ({ direction = "refined", children, width = 1440 }) => (
  <div className={`hsc-surface dir-${direction}`} style={{
    background: "var(--bg)", width, maxWidth: "100%",
    overflow: "hidden", borderRadius: "var(--r-card)",
    border: "1px solid var(--border)",
  }}>{children}</div>
);

const WSection = ({ children, pad = "96px 64px", bg = "transparent", color, style }) => (
  <div style={{ padding: pad, background: bg, color, ...style }}>{children}</div>
);

const WContainer = ({ children, max = 1240, style }) => (
  <div style={{ maxWidth: max, margin: "0 auto", ...style }}>{children}</div>
);

// ─── NAV + ANNOUNCEMENT BAR + FOOTER ────────────────────────────────────────
const WAnnouncement = ({ text = "Spring 26 systems · 10-day build · free first-order returns" }) => (
  <div style={{
    background: "var(--ink)", color: "var(--paper)",
    textAlign: "center", padding: "10px 16px",
    fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
  }}>{text}</div>
);

const WMainNav = () => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 48px", borderBottom: "1px solid var(--border)",
    background: "var(--paper)",
  }}>
    <Logo height={22} />
    <div style={{ display: "flex", gap: 32 }}>
      {["Systems", "Care kit", "How it works", "Journal", "About"].map(l => (
        <span key={l} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>{l}</span>
      ))}
    </div>
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <span style={{ fontSize: 12, fontWeight: 600 }}>Account</span>
      <span style={{ fontSize: 12, fontWeight: 600 }}>EN · CAD</span>
      <Btn variant="primary" style={{ padding: "10px 18px", fontSize: 11 }}>Find my fit</Btn>
    </div>
  </div>
);

const WFooter = () => (
  <div style={{ background: "var(--obsidian)", color: "var(--paper)", padding: "72px 48px 40px" }}>
    <WContainer>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1.2fr", gap: 40, marginBottom: 48 }}>
        <div>
          <Logo tone="light" height={22} />
          <p style={{ margin: "20px 0 0", fontSize: 13, lineHeight: 1.6, color: "oklch(0.78 0.006 85)", maxWidth: "34ch" }}>
            Men's hair systems, custom from scratch. Built in Toronto. Worn worldwide.
          </p>
        </div>
        {[
          ["Shop", ["French Lace","Skin / Poly","Mono Top","Hybrid","Care kit"]],
          ["Learn", ["How it works","Sizing","Lifespan","Journal","FAQ"]],
          ["Account", ["My orders","My measurements","Reorder","Refer a friend"]],
        ].map(([h, items]) => (
          <div key={h}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.7 0.006 85)", marginBottom: 18 }}>{h}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
              {items.map(i => <li key={i} style={{ color: "oklch(0.92 0.005 85)" }}>{i}</li>)}
            </ul>
          </div>
        ))}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.7 0.006 85)", marginBottom: 18 }}>Field Notes</div>
          <p style={{ margin: "0 0 14px", fontSize: 13, lineHeight: 1.6, color: "oklch(0.85 0.005 85)" }}>One email per month. No marketing.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="Email" style={{ flex: 1, padding: "12px 14px", border: "1px solid oklch(1 0 0 / 18%)", background: "transparent", color: "var(--paper)", borderRadius: 8, fontSize: 13 }} />
            <Btn variant="primary" style={{ padding: "10px 18px", fontSize: 11 }}>Join</Btn>
          </div>
        </div>
      </div>
      <hr style={{ border: 0, height: 1, background: "oklch(1 0 0 / 10%)", margin: "0 0 24px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, fontSize: 11, color: "oklch(0.7 0.006 85)" }}>
        <div>© 2026 Hair Solutions Co. · Toronto, Canada</div>
        <div style={{ display: "flex", gap: 18 }}>
          {["Instagram","YouTube","TikTok","Privacy","Terms"].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>
    </WContainer>
  </div>
);

// ─── SHARED HOMEPAGE BLOCKS ─────────────────────────────────────────────────
const WHomeHero = () => (
  <WSection pad="80px 64px 56px">
    <WContainer>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <Eyebrow>Mens hair systems · made-to-measure</Eyebrow>
          <h1 style={{ fontFamily: "var(--f-serif)", margin: "18px 0 22px", fontSize: 72, lineHeight: 0.98, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: "14ch" }}>
            A second chance at the hairline you remember.
          </h1>
          <p style={{ margin: "0 0 28px", fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: "48ch" }}>
            We measure, match, and ship a system built for your scalp — not a stock cap. Most clients are wearing within ten days of starting.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Btn variant="primary">Start my consult</Btn>
            <Btn variant="secondary">See how it works</Btn>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--border)" }}>
            {[["4,200+","Systems built"],["96%","First-fit pass"],["10 days","Build to door"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--f-serif)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontSize: 11, color: "var(--ink-muted)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hsc-card hsc-card-float" style={{ padding: 0 }}>
          <PhotoPlaceholder ratio="4 / 5" subject="portrait" />
        </div>
      </div>
    </WContainer>
  </WSection>
);

const WProductRow4 = ({ title = "Pick your base." }) => (
  <WSection pad="56px 64px">
    <WContainer>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>{title}</h2>
        <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>4 bases · 1 perfect fit</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {[
          ["French Lace", "Invisible hairline", "from $1,840"],
          ["Skin / Poly", "Crisp edge, low-effort", "from $1,640"],
          ["Mono Top", "Long-wear, durable", "from $1,720"],
          ["Hybrid", "Realism + durability", "from $1,920"],
        ].map(([t, d, p]) => (
          <div key={t} className="hsc-card" style={{ padding: 0 }}>
            <PhotoPlaceholder ratio="4 / 5" subject="product" />
            <div style={{ padding: "20px 22px 24px" }}>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{t}</p>
              <p style={{ margin: "4px 0 14px", fontSize: 13, color: "var(--ink-muted)" }}>{d}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, fontWeight: 700 }}>{p}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>View →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

const WFeatureSplit = ({ reverse = false }) => (
  <WSection pad="96px 64px">
    <WContainer>
      <div style={{ display: "grid", gridTemplateColumns: reverse ? "1fr 1fr" : "1fr 1fr", gap: 56, alignItems: "center" }}>
        {reverse ? null : (
          <div className="hsc-card" style={{ padding: 0 }}>
            <PhotoPlaceholder ratio="4 / 5" subject="portrait" />
          </div>
        )}
        <div>
          <Eyebrow>The craft</Eyebrow>
          <h2 style={{ fontFamily: "var(--f-serif)", margin: "16px 0 18px", fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: "18ch" }}>Cut, ventilated, and pressed by hand.</h2>
          <p style={{ margin: "0 0 22px", fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "48ch" }}>
            Every system spends ~22 hours under a builder's hands. The hairline is single-knotted at the front 12 millimetres — the only stretch most observers ever look at.
          </p>
          <Btn variant="secondary">Read the process</Btn>
        </div>
        {reverse && (
          <div className="hsc-card" style={{ padding: 0 }}>
            <PhotoPlaceholder ratio="4 / 5" subject="portrait" />
          </div>
        )}
      </div>
    </WContainer>
  </WSection>
);

const WProcessSteps = ({ dark = false }) => (
  <WSection pad="96px 64px" bg={dark ? "var(--obsidian)" : "transparent"} color={dark ? "var(--paper)" : "var(--ink)"}>
    <WContainer>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <Eyebrow style={{ color: dark ? "var(--clay)" : "var(--ink-muted)" }}>How it works</Eyebrow>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: "14px 0 0", fontSize: 44, letterSpacing: "-0.02em", fontWeight: 400 }}>Four steps. Ten days. Done.</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
        {[
          ["01","Mould","8-minute tape kit, made at home or in our Toronto room."],
          ["02","Match","Ambient-light photos used to colour-match within two shades."],
          ["03","Build","Hand-ventilated by your assigned master builder."],
          ["04","Wear","20-minute fitting call included with your first system."],
        ].map(([n, t, d]) => (
          <div key={t} style={{ paddingTop: 28, borderTop: "1px solid " + (dark ? "oklch(1 0 0 / 16%)" : "var(--border-strong)") }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: dark ? "oklch(0.7 0.006 85)" : "var(--ink-muted)", letterSpacing: "0.12em" }}>{n}</div>
            <p style={{ margin: "20px 0 12px", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>{t}</p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: dark ? "oklch(0.82 0.005 85)" : "var(--ink-soft)" }}>{d}</p>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

const WQuoteBlock = () => (
  <WSection pad="96px 64px" bg="var(--bg-deep)">
    <WContainer max={1000}>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 48, alignItems: "center" }}>
        <div className="hsc-card" style={{ padding: 0, borderRadius: 999, overflow: "hidden", aspectRatio: "1", width: 240 }}>
          <PhotoPlaceholder ratio="1 / 1" subject="portrait" style={{ borderRadius: 999 }} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 32, lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.015em", maxWidth: "32ch" }}>
            "I forgot it was on. Three months in, the hairline still passes when my barber lifts it."
          </p>
          <p style={{ margin: "24px 0 0", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            — Marcus T. · Toronto · Member since 2024
          </p>
        </div>
      </div>
    </WContainer>
  </WSection>
);

const WStoryPair = () => (
  <WSection pad="96px 64px">
    <WContainer>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>From the Journal</h2>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>All stories →</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          ["6 min read","Why your hairline matters more than your density.","The single biggest realism cue, and the one most stock systems get wrong."],
          ["5 min read","Inside a colour match in real ambient light.","What we look at — and what we ignore — when matching to your remaining hair."],
        ].map(([m, t, d]) => (
          <div key={t} className="hsc-card" style={{ padding: 0 }}>
            <PhotoPlaceholder ratio="16 / 10" subject="portrait" />
            <div style={{ padding: "24px 28px 28px" }}>
              <Eyebrow>{m}</Eyebrow>
              <h3 style={{ margin: "10px 0 8px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{t}</h3>
              <p style={{ margin: 0, fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.55 }}>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

const WCTABanner = ({ dark = false }) => (
  <WSection pad="80px 64px" bg={dark ? "var(--obsidian)" : "var(--bg-deep)"} color={dark ? "var(--paper)" : "var(--ink)"}>
    <WContainer max={900}>
      <div style={{ textAlign: "center" }}>
        <Eyebrow style={{ color: dark ? "var(--clay)" : "var(--ink-muted)" }}>Start when you're ready</Eyebrow>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: "16px 0 22px", fontSize: 48, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.05 }}>
          The first system is the hardest. We make it the easiest.
        </h2>
        <div style={{ display: "inline-flex", gap: 12 }}>
          <Btn variant="primary">Start my consult</Btn>
          <Btn variant="secondary">Talk to a builder</Btn>
        </div>
      </div>
    </WContainer>
  </WSection>
);

const WSocialProof = () => (
  <WSection pad="48px 64px" bg="var(--bg-deep)">
    <WContainer>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)" }}>As featured in</span>
        {["GQ","Esquire","The Strategist","Robb Report","Highsnobiety"].map(b => (
          <span key={b} style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink-soft)", fontFamily: "var(--f-mono)" }}>{b}</span>
        ))}
      </div>
    </WContainer>
  </WSection>
);

// ─── ABOUT PAGE BLOCKS ──────────────────────────────────────────────────────
const WAboutHero = () => (
  <WSection pad="96px 64px 48px">
    <WContainer max={1100}>
      <Eyebrow>About</Eyebrow>
      <h1 style={{ fontFamily: "var(--f-serif)", margin: "18px 0 24px", fontSize: 80, lineHeight: 0.98, letterSpacing: "-0.02em", fontWeight: 400 }}>
        We make hair for the men who'd rather not talk about it.
      </h1>
      <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: "58ch" }}>
        Hair Solutions Co. was founded in Toronto in 2022 by Daniel Park, a master barber who'd spent ten years working with stock-cap systems and watching them fail at the hairline. The company exists for one reason: to do the work he couldn't get anyone else to do.
      </p>
    </WContainer>
  </WSection>
);

const WAboutFullBleed = () => (
  <div style={{ padding: "0 64px" }}>
    <div className="hsc-card" style={{ padding: 0 }}>
      <PhotoPlaceholder ratio="21 / 9" subject="portrait" />
    </div>
  </div>
);

const WAboutValues = () => (
  <WSection pad="96px 64px">
    <WContainer>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 56, alignItems: "start" }}>
        <div>
          <Eyebrow>What we believe</Eyebrow>
          <h2 style={{ fontFamily: "var(--f-serif)", margin: "14px 0 0", fontSize: 44, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.05 }}>Four principles.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[
            ["01","No stock caps.","Every system is cut to a mould of your scalp. The mould is the moment we decide whether to work together."],
            ["02","The hairline is everything.","The first 12mm decides realism. We spend a third of build time on a tenth of the surface area."],
            ["03","Build for wear, not for show.","Our systems are tested at three months. If it doesn't hold at three months, the design failed."],
            ["04","One system at a time.","We don't ship in batches. The system you order is the only system that builder is working on that day."],
          ].map(([n, t, d]) => (
            <div key={t} style={{ borderTop: "1px solid var(--border-strong)", paddingTop: 22 }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)" }}>{n}</div>
              <p style={{ margin: "12px 0 10px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.015em" }}>{t}</p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </WContainer>
  </WSection>
);

const WAboutTeam = () => (
  <WSection pad="96px 64px" bg="var(--bg-deep)">
    <WContainer>
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <Eyebrow>The team</Eyebrow>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: "14px 0 0", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em" }}>Four builders. One room.</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {[
          ["Daniel Park","Founder · Master builder","12 years"],
          ["Ana Reyes","Lead ventilator","9 years"],
          ["Marcus Chen","Colour + match","7 years"],
          ["Jonas Velt","Fit + adjustments","6 years"],
        ].map(([n, r, y]) => (
          <div key={n}>
            <PhotoPlaceholder ratio="4 / 5" subject="portrait" />
            <p style={{ margin: "16px 0 4px", fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{n}</p>
            <p style={{ margin: 0, fontSize: 12, color: "var(--ink-muted)" }}>{r} · {y}</p>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

const WAboutTimeline = () => (
  <WSection pad="96px 64px">
    <WContainer>
      <Eyebrow>Timeline</Eyebrow>
      <h2 style={{ fontFamily: "var(--f-serif)", margin: "14px 0 40px", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em" }}>From one chair to four.</h2>
      <div>
        {[
          ["2022","Founded","Daniel cuts his first system out of a single-chair studio in Toronto's east end."],
          ["2023","First builder","Ana joins. We move to a four-seat room and ship 200 systems in the first year."],
          ["2024","Care kit launches","Adhesive, tape and brush in one box. Refill auto-ship at month 4."],
          ["2025","International","First shipments to London, Los Angeles, Sydney. 1,800 systems built."],
          ["2026","Fitting room","Toronto fitting room opens for in-person moulding and colour-match."],
        ].map(([y, t, d]) => (
          <div key={y} style={{ display: "grid", gridTemplateColumns: "120px 220px 1fr", gap: 32, padding: "24px 0", borderTop: "1px solid var(--border-strong)", alignItems: "baseline" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 14, fontWeight: 700 }}>{y}</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{t}</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)" }}>{d}</p>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

// ─── COLLECTION PAGE BLOCKS ─────────────────────────────────────────────────
const WCollectionHero = () => (
  <WSection pad="64px 64px 32px">
    <WContainer>
      <Eyebrow>Collection</Eyebrow>
      <h1 style={{ fontFamily: "var(--f-serif)", margin: "16px 0 12px", fontSize: 68, lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 400 }}>The bases · Spring 26</h1>
      <p style={{ margin: 0, fontSize: 17, color: "var(--ink-soft)", maxWidth: "60ch" }}>
        Four ways to wear. Pick by lifespan, by realism, or by how much you want to think about it. Every base is cut to your scalp.
      </p>
    </WContainer>
  </WSection>
);

const WCollectionFilterBar = () => (
  <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 64px", background: "var(--paper)" }}>
    <WContainer>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["All bases · 12","French Lace · 4","Skin · 3","Mono Top · 3","Hybrid · 2"].map((c, i) => (
            <span key={c} style={{
              padding: "8px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600,
              border: "1px solid var(--border-strong)",
              background: i === 0 ? "var(--ink)" : "transparent",
              color: i === 0 ? "var(--paper)" : "var(--ink)",
            }}>{c}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Sort</span>
          <select style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border-strong)", fontSize: 12, background: "var(--paper)" }}>
            <option>Most popular</option><option>Newest</option><option>Lifespan</option><option>Price</option>
          </select>
        </div>
      </div>
    </WContainer>
  </div>
);

const WCollectionGrid = () => {
  const products = [
    ["French Lace · 115%","$1,840","Invisible hairline · 3–4 mo"],
    ["French Lace · 120%","$1,880","Higher density · same realism"],
    ["French Lace · 130%","$1,940","Full coverage · for thicker natural hair"],
    ["French Lace · Coffee","$1,840","Warm-toned ratio · new this drop"],
    ["Skin · Crisp","$1,640","Sharp edge · 2–3 mo · low-effort"],
    ["Skin · Soft","$1,680","Lighter adhesive contact · 2 mo"],
    ["Skin · Charcoal","$1,720","Cool ratio · new"],
    ["Mono Top · Standard","$1,720","Long-wear · 4–6 mo"],
    ["Mono Top · Sport","$1,780","Reinforced perimeter · for active wear"],
    ["Mono Top · Hybrid","$1,840","Mono crown · lace hairline"],
    ["Hybrid · Front Lace","$1,920","Realism front · durability back"],
    ["Hybrid · Skin Edge","$1,960","Crisp temple · lace crown"],
  ];
  return (
    <WSection pad="48px 64px 96px">
      <WContainer>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {products.map(([t, p, d]) => (
            <div key={t} className="hsc-card" style={{ padding: 0 }}>
              <PhotoPlaceholder ratio="4 / 5" subject="product" />
              <div style={{ padding: "18px 22px 22px" }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{t}</p>
                <p style={{ margin: "4px 0 12px", fontSize: 12, color: "var(--ink-muted)" }}>{d}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, fontWeight: 700 }}>{p}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>View →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Btn variant="secondary">Load more</Btn>
        </div>
      </WContainer>
    </WSection>
  );
};

// ─── PRODUCT PAGE BLOCKS ────────────────────────────────────────────────────
const WBreadcrumbs = () => (
  <div style={{ padding: "16px 64px", borderBottom: "1px solid var(--border)", background: "var(--paper)" }}>
    <WContainer>
      <div style={{ fontSize: 11, color: "var(--ink-muted)", fontWeight: 600, letterSpacing: "0.06em" }}>
        Shop · The bases · <span style={{ color: "var(--ink)" }}>French Lace · 115%</span>
      </div>
    </WContainer>
  </div>
);

const WProductGallery = () => (
  <WSection pad="48px 64px 64px">
    <WContainer>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48 }}>
        <div>
          <div className="hsc-card" style={{ padding: 0, marginBottom: 16 }}>
            <PhotoPlaceholder ratio="4 / 5" subject="portrait" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[0,1,2,3].map(i => (
              <div key={i} className="hsc-card" style={{ padding: 0, border: i === 0 ? "2px solid var(--ink)" : "1px solid var(--border)" }}>
                <PhotoPlaceholder ratio="1 / 1" subject={i % 2 ? "product" : "portrait"} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "sticky", top: 24 }}>
          <Eyebrow>French Lace · v 2.4</Eyebrow>
          <h1 style={{ fontFamily: "var(--f-serif)", margin: "10px 0 8px", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05 }}>French Lace · 115% density</h1>
          <p style={{ margin: "0 0 18px", fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6 }}>The most-picked base. Invisible hairline at conversation distance, 3–4 month lifespan with weekly care.</p>
          <p style={{ margin: "0 0 24px", fontFamily: "var(--f-mono)", fontSize: 24, fontWeight: 700 }}>$1,840 CAD</p>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>Density</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["100%","115%","120%","130%"].map((d, i) => (
                <span key={d} style={{
                  padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: "1px solid " + (i === 1 ? "var(--ink)" : "var(--border-strong)"),
                  background: i === 1 ? "var(--ink)" : "transparent",
                  color: i === 1 ? "var(--paper)" : "var(--ink)",
                }}>{d}</span>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>Graphite ratio</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["#1 Black","#2 Espresso","#3 Coffee","#4 Cool ash"].map((d, i) => (
                <span key={d} style={{
                  padding: "10px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  border: "1px solid " + (i === 1 ? "var(--ink)" : "var(--border-strong)"),
                  background: i === 1 ? "var(--ink)" : "transparent",
                  color: i === 1 ? "var(--paper)" : "var(--ink)",
                }}>{d}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
            <Btn variant="primary" style={{ flex: 1 }}>Start a consult to order</Btn>
            <Btn variant="secondary">Talk to a builder</Btn>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
            {[
              "10-day build window · single builder",
              "3-month fit warranty · free re-cut",
              "Care-kit refill ships every 8 weeks (cancel anytime)",
            ].map(l => <li key={l} style={{ display: "flex", gap: 10, padding: "6px 0" }}><span>✓</span>{l}</li>)}
          </ul>
        </div>
      </div>
    </WContainer>
  </WSection>
);

const WProductSpecs = () => (
  <WSection pad="80px 64px" bg="var(--bg-deep)">
    <WContainer>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 56 }}>
        <div>
          <Eyebrow>Specifications</Eyebrow>
          <h2 style={{ fontFamily: "var(--f-serif)", margin: "14px 0 0", fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>By the numbers.</h2>
        </div>
        <div>
          {[
            ["Base material","Swiss French lace · 1.2 denier"],
            ["Hairline knotting","Single-knot · 44/cm² at front 12mm"],
            ["Body knotting","Double-knot · 28/cm²"],
            ["Average weight","3.6 oz (102g) at 115% density"],
            ["First-wear lifespan","12–16 weeks with weekly re-tape"],
            ["Adhesive contact area","70%"],
            ["Warranty","3 months · free re-cut on fit drift"],
            ["Build window","10 business days · single builder"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", padding: "16px 0", borderTop: "1px solid var(--border-strong)", gap: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 13, color: "var(--ink-soft)", fontFamily: "var(--f-mono)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </WContainer>
  </WSection>
);

const WProductFAQ = () => (
  <WSection pad="80px 64px">
    <WContainer max={900}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Eyebrow>FAQ</Eyebrow>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: "14px 0 0", fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>What men ask before ordering.</h2>
      </div>
      <div>
        {[
          ["How invisible is the hairline really?", "At conversation distance (>30cm), the single-knot hairline passes a barber's lift test in 96% of first-wear fittings."],
          ["What's the actual lifespan?", "12–16 weeks of daily wear with weekly re-tape. Care-kit subscribers average closer to 16."],
          ["Can I swim or shower in it?", "Yes. The Swiss lace is hydrophobic and the adhesive holds in chlorinated water. Salt water needs a freshwater rinse after."],
          ["What if it doesn't fit on the first wear?", "We re-cut for free within the first 90 days. Fit warranty is the whole point."],
          ["How is it different from a stock system?", "A stock cap is built for a head shape. This is built for your head, measured from a tape-and-cling mould."],
        ].map(([q, a], i) => (
          <div key={q} style={{ padding: "24px 0", borderTop: "1px solid var(--border-strong)", display: "grid", gridTemplateColumns: "32px 1fr", gap: 24 }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, fontWeight: 700, color: "var(--ink-muted)" }}>0{i + 1}</div>
            <div>
              <p style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-0.015em" }}>{q}</p>
              <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "62ch" }}>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

const WCrossSell = () => (
  <WSection pad="80px 64px">
    <WContainer>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>You might also consider</h2>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>View all bases →</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {[
          ["French Lace · 120%","$1,880","5% more density · same realism"],
          ["Hybrid · Front Lace","$1,920","Lace front, mono crown"],
          ["Mono Top · Hybrid","$1,840","For longer wear cycles"],
          ["Care kit · Refill","$84","Adhesive + tape + brush"],
        ].map(([t, p, d]) => (
          <div key={t} className="hsc-card" style={{ padding: 0 }}>
            <PhotoPlaceholder ratio="1 / 1" subject="product" />
            <div style={{ padding: "16px 20px 20px" }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{t}</p>
              <p style={{ margin: "4px 0 10px", fontSize: 12, color: "var(--ink-muted)" }}>{d}</p>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, fontWeight: 700 }}>{p}</span>
            </div>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

// ─── PAGE ASSEMBLIES ────────────────────────────────────────────────────────
const HomePage = ({ direction = "refined" }) => (
  <WPage direction={direction}>
    <AnnotatedStack mode="inline" items={[
      { name: "Announcement bar", node: <WAnnouncement /> },
      { name: "Main navigation",   node: <WMainNav /> },
      { name: "Hero · headline + portrait + stats", node: <WHomeHero /> },
      { name: "Social proof · press logos", node: <WSocialProof /> },
      { name: "Product row · 4 bases", node: <WProductRow4 /> },
      { name: "Feature split · craft + image", node: <WFeatureSplit /> },
      { name: "Process · 4 steps (dark)", node: <WProcessSteps dark /> },
      { name: "Quote · single testimonial", node: <WQuoteBlock /> },
      { name: "Journal · two stories", node: <WStoryPair /> },
      { name: "CTA banner · start consult", node: <WCTABanner dark /> },
      { name: "Footer · sitemap + newsletter", node: <WFooter /> },
    ]} />
  </WPage>
);

const AboutPage = ({ direction = "refined" }) => (
  <WPage direction={direction}>
    <AnnotatedStack mode="inline" items={[
      { name: "Announcement bar",  node: <WAnnouncement /> },
      { name: "Main navigation",    node: <WMainNav /> },
      { name: "About hero · headline + intro", node: <WAboutHero /> },
      { name: "Full-bleed image · the room", node: <WAboutFullBleed /> },
      { name: "Values · four principles", node: <WAboutValues /> },
      { name: "Team grid · four builders", node: <WAboutTeam /> },
      { name: "Quote · founder",   node: <WQuoteBlock /> },
      { name: "Timeline · five milestones", node: <WAboutTimeline /> },
      { name: "Process · 4 steps", node: <WProcessSteps /> },
      { name: "CTA banner · start consult", node: <WCTABanner /> },
      { name: "Footer", node: <WFooter /> },
    ]} />
  </WPage>
);

const CollectionPage = ({ direction = "refined" }) => (
  <WPage direction={direction}>
    <AnnotatedStack mode="inline" items={[
      { name: "Announcement bar",  node: <WAnnouncement /> },
      { name: "Main navigation",    node: <WMainNav /> },
      { name: "Collection hero · title + intro", node: <WCollectionHero /> },
      { name: "Filter bar · categories + sort", node: <WCollectionFilterBar /> },
      { name: "Product grid · 12 cards", node: <WCollectionGrid /> },
      { name: "Feature split · lifespan story", node: <WFeatureSplit reverse /> },
      { name: "CTA banner · unsure which base?", node: <WCTABanner /> },
      { name: "Footer", node: <WFooter /> },
    ]} />
  </WPage>
);

const ProductPage = ({ direction = "refined" }) => (
  <WPage direction={direction}>
    <AnnotatedStack mode="inline" items={[
      { name: "Announcement bar",   node: <WAnnouncement /> },
      { name: "Main navigation",     node: <WMainNav /> },
      { name: "Breadcrumbs",         node: <WBreadcrumbs /> },
      { name: "Gallery + buy box",   node: <WProductGallery /> },
      { name: "Specs table",         node: <WProductSpecs /> },
      { name: "Process · 4 steps",   node: <WProcessSteps /> },
      { name: "Quote · client",      node: <WQuoteBlock /> },
      { name: "FAQ · five questions", node: <WProductFAQ /> },
      { name: "Cross-sell · 4 cards", node: <WCrossSell /> },
      { name: "CTA banner · start consult", node: <WCTABanner dark /> },
      { name: "Footer", node: <WFooter /> },
    ]} />
  </WPage>
);

Object.assign(window, {
  WPage, WContainer, WSection,
  WAnnouncement, WMainNav, WFooter,
  WHomeHero, WProductRow4, WFeatureSplit, WProcessSteps, WQuoteBlock,
  WStoryPair, WCTABanner, WSocialProof,
  WAboutHero, WAboutFullBleed, WAboutValues, WAboutTeam, WAboutTimeline,
  WCollectionHero, WCollectionFilterBar, WCollectionGrid,
  WBreadcrumbs, WProductGallery, WProductSpecs, WProductFAQ, WCrossSell,
  HomePage, AboutPage, CollectionPage, ProductPage,
});
