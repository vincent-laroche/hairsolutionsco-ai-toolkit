// WebPages2.jsx — brand-aligned additions (v3 · post-rebrand)
// Adds blocks that match the BYSIX-style reference + brand guide:
//   • Full-bleed dark editorial hero with B&W portrait
//   • 100,000+ marquee strip
//   • Big ALL-CAPS display statement
//   • Three big editorial cards with overlay labels + arrows
//   • Press logos row ("They talk about us")
//   • Loyalty program block
//   • Stats band (Payment / Delivery / Salons / Support)
// And updated HomePage / AboutPage / CollectionPage / ProductPage
// assemblies that compose these into the new look.

// Slim arrow inside a circle, matching the reference button affordance.
const ArrowCircle = ({ size = 28, bg = "oklch(0.99 0.002 250)", fg = "oklch(0.14 0.004 60)" }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: size, height: size, borderRadius: 999,
    background: bg, color: fg, flex: "0 0 auto",
  }}>
    <svg width="12" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square"/>
    </svg>
  </span>
);

// Pill CTA — white pill with arrow circle right side. Used on dark hero.
const PillCta = ({ children, tone = "light" }) => {
  const isLight = tone === "light";
  return (
    <a href="#" style={{
      display: "inline-flex", alignItems: "center", gap: 14,
      padding: "8px 8px 8px 24px",
      borderRadius: 999,
      background: isLight ? "oklch(0.99 0.002 250)" : "oklch(0.14 0.004 60)",
      color: isLight ? "oklch(0.14 0.004 60)" : "oklch(0.99 0.002 250)",
      fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
      textDecoration: "none",
      transition: "transform 160ms ease",
    }}>
      <span>{children}</span>
      <ArrowCircle bg={isLight ? "oklch(0.14 0.004 60)" : "oklch(0.99 0.002 250)"} fg={isLight ? "oklch(0.99 0.002 250)" : "oklch(0.14 0.004 60)"} />
    </a>
  );
};

// ─── ANNOUNCEMENT + NAV (overlay style on dark hero) ────────────────────────
const WAnnouncementDark = ({ text = "Temporary increase in delivery charges" }) => (
  <div style={{
    background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)",
    textAlign: "center", padding: "10px 16px",
    fontSize: 11, fontWeight: 500, letterSpacing: "0.04em",
    display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
  }}>
    <span style={{ display: "inline-flex", width: 14, height: 14, borderRadius: 999, border: "1px solid oklch(0.99 0.002 250)", alignItems: "center", justifyContent: "center", fontSize: 9 }}>!</span>
    {text}
  </div>
);

const WNavDark = () => (
  <div style={{
    display: "grid", gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "20px 40px",
    background: "transparent",
    color: "oklch(0.99 0.002 250)",
    position: "absolute", left: 0, right: 0, top: 36,
    zIndex: 2,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <Logo tone="light" height={20} />
    </div>
    <div style={{ display: "flex", gap: 36, justifyContent: "center" }}>
      {["Shop", "Guide", "Pro", "Help", "Salons"].map(l => (
        <span key={l} style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em" }}>{l}</span>
      ))}
    </div>
    <div style={{ display: "flex", gap: 16, justifyContent: "flex-end", alignItems: "center" }}>
      {["⌕", "⌖", "✉", "👤", "🛍"].map((g, i) => (
        <span key={i} style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 999, fontSize: 14 }}>{g}</span>
      ))}
    </div>
  </div>
);

// ─── HERO — full-bleed dark, B&W editorial portrait, big display ────────────
const WHeroBigDark = () => (
  <div style={{ position: "relative", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", minHeight: 720 }}>
    {/* Background portrait */}
    <div style={{ position: "absolute", inset: 0 }}>
      <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0) 65%)" }} />
    </div>

    <div style={{ position: "relative", padding: "180px 64px 80px", maxWidth: 1440, margin: "0 auto", color: "oklch(0.99 0.002 250)" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(6px)",
        padding: "6px 14px", borderRadius: 999,
        fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
        marginBottom: 36,
      }}>
        ★ 4.8/5 across 2,000+ reviews
      </div>
      <h1 style={{ fontFamily: "var(--f-serif)", margin: "0 0 12px", fontSize: 104, lineHeight: 0.95, letterSpacing: "-0.02em", fontWeight: 400 }}>
        Your hair.
      </h1>
      <h1 style={{ fontFamily: "var(--f-serif)", margin: "0 0 30px", fontSize: 104, lineHeight: 0.95, letterSpacing: "-0.02em", fontWeight: 400 }}>
        Your secret.
      </h1>
      <p style={{ margin: "0 0 32px", fontSize: 17, lineHeight: 1.55, maxWidth: "48ch", color: "rgba(255,255,255,0.78)" }}>
        The thinnest hair system on the market, worn by over 100,000 men. Undetectable, comfortable, instant — no surgery, no compromise.
      </p>
      <div style={{ display: "flex", gap: 22, alignItems: "center", marginBottom: 40 }}>
        {[
          ["♔", "Undetectable"],
          ["◆", "Comfortable"],
          ["⏱", "Instantaneous"],
        ].map(([i, l]) => (
          <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
            <span style={{ width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)", fontSize: 10 }}>{i}</span>
            {l}
          </span>
        ))}
      </div>
      <PillCta tone="light">Learn more</PillCta>
    </div>
  </div>
);

// ─── INTRO BAND ("The difference, in a glance") + 3 editorial cards ────────
const WIntroGlance = () => (
  <WSection pad="120px 64px 48px" bg="oklch(0.99 0.002 250)">
    <WContainer>
      <h2 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 56, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>The difference, in a glance.</h2>
      <p style={{ margin: "16px 0 56px", fontSize: 16, color: "oklch(0.52 0.005 60)", lineHeight: 1.6, maxWidth: "62ch" }}>
        The Hair Solutions Co. system adapts to your natural implant for a completely undetectable result. Rain, shower, sport — it stays put in all conditions. Live without a thought.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {[
          ["Ultra HD", "portrait"],
          ["Learn more", "portrait"],
          ["Learn more", "portrait"],
        ].map(([label, subj], i) => (
          <div key={i} className="hsc-card" style={{ padding: 0, position: "relative", aspectRatio: "4 / 5", overflow: "hidden", border: "none", borderRadius: 18 }}>
            <PhotoPlaceholder ratio={undefined} subject={subj} style={{ width: "100%", height: "100%", borderRadius: 18 }} />
            <div style={{
              position: "absolute", left: 0, right: 0, bottom: 0,
              padding: "28px 28px",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.65) 100%)",
              color: "oklch(0.99 0.002 250)",
            }}>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.015em" }}>{label}</span>
              <ArrowCircle bg="rgba(255,255,255,0.18)" fg="oklch(0.99 0.002 250)" size={36} />
            </div>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

// ─── 100,000+ marquee ───────────────────────────────────────────────────────
const WSatisfiedMarquee = () => (
  <div style={{ background: "oklch(0.99 0.002 250)", padding: "32px 0" }}>
    <div className="hsc-marquee" style={{ background: "transparent" }}>
      <div className="hsc-marquee-track">
        {Array.from({ length: 2 }).flatMap((_, set) =>
          Array.from({ length: 4 }).map((__, j) => (
            <React.Fragment key={`${set}-${j}`}>
              <span>100,000+ satisfied customers</span>
              <span className="hsc-marquee-dot"></span>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  </div>
);

// ─── Collections grid · big editorial cards ─────────────────────────────────
const WCollectionsBig = () => (
  <WSection pad="80px 64px" bg="oklch(0.99 0.002 250)">
    <WContainer>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 36 }}>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 56, fontWeight: 400, letterSpacing: "-0.02em" }}>The collections</h2>
        <span style={{ fontSize: 13, color: "oklch(0.52 0.005 60)" }}>Order your hair system, your fixing products and your care.</span>
        <a href="#" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", border: "1px solid rgba(10,10,10,0.2)", padding: "10px 18px", borderRadius: 999, textDecoration: "none", color: "oklch(0.14 0.004 60)" }}>All products →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {/* Big left card */}
        <div style={{ gridRow: "1 / 3", borderRadius: 18, overflow: "hidden", position: "relative", aspectRatio: "4 / 5" }}>
          <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 18 }} />
          <div style={{ position: "absolute", left: 28, right: 28, bottom: 24, color: "oklch(0.99 0.002 250)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>Standard hair systems</p>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.78)" }}>Our models in stock</p>
            </div>
            <ArrowCircle bg="rgba(255,255,255,0.18)" fg="oklch(0.99 0.002 250)" size={36} />
          </div>
        </div>
        {/* Top-right two cards */}
        <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", aspectRatio: "16 / 9", background: "oklch(0.14 0.004 60)" }}>
          <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 18 }} />
          <div style={{ position: "absolute", left: 24, right: 24, bottom: 20, color: "oklch(0.99 0.002 250)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Glues & adhesives</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.78)" }}>Fixation of the system</p>
            </div>
            <ArrowCircle bg="rgba(255,255,255,0.18)" fg="oklch(0.99 0.002 250)" size={32} />
          </div>
        </div>
        <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", aspectRatio: "16 / 9", background: "oklch(0.19 0.005 60)" }}>
          <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 18 }} />
        </div>
        {/* Bottom-right two */}
        <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", aspectRatio: "16 / 9", background: "oklch(0.955 0.002 250)" }}>
          <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 18 }} />
          <div style={{ position: "absolute", left: 24, right: 24, bottom: 20, color: "oklch(0.99 0.002 250)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Care & styling</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.78)" }}>Hydrate and nourish</p>
            </div>
            <ArrowCircle bg="rgba(255,255,255,0.18)" fg="oklch(0.99 0.002 250)" size={32} />
          </div>
        </div>
        <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", aspectRatio: "16 / 9", background: "oklch(0.14 0.004 60)" }}>
          <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 18 }} />
          <div style={{ position: "absolute", left: 24, right: 24, bottom: 20, color: "oklch(0.99 0.002 250)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>The accessories</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.78)" }}>Accessories and colour chart</p>
            </div>
            <ArrowCircle bg="rgba(255,255,255,0.18)" fg="oklch(0.99 0.002 250)" size={32} />
          </div>
        </div>
      </div>
    </WContainer>
  </WSection>
);

// ─── Big ALL-CAPS display statement ─────────────────────────────────────────
const WBigStatement = ({ text = "The Ultra HD standard offers a totally undetectable and natural result thanks to its thickness of 0.03 mm.", bg = "oklch(0.99 0.002 250)", color = "oklch(0.14 0.004 60)" }) => (
  <WSection pad="120px 64px" bg={bg} color={color}>
    <WContainer max={1100}>
      <p style={{ margin: 0, textAlign: "center", fontSize: 80, lineHeight: 1.0, letterSpacing: "-0.035em", fontWeight: 800, textTransform: "uppercase" }}>
        {text}
      </p>
    </WContainer>
  </WSection>
);

// ─── Big editorial pull on dark — "Undetectable implantation" overlay ───────
const WEditorialFullBleed = ({ title = "Undetectable implantation" }) => (
  <div style={{ position: "relative", background: "oklch(0.14 0.004 60)", aspectRatio: "16 / 8", overflow: "hidden" }}>
    <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.7) 100%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, textAlign: "center", color: "oklch(0.99 0.002 250)" }}>
      <p style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 96, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.0 }}>{title}</p>
    </div>
  </div>
);

// ─── Press logos · "They talk about us" ─────────────────────────────────────
const WPressLogos = () => (
  <WSection pad="80px 64px" bg="oklch(0.99 0.002 250)">
    <WContainer>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>They talk about us</h2>
        <p style={{ margin: "12px 0 0", fontSize: 14, color: "oklch(0.52 0.005 60)" }}>Find all our appearances in the press and media here.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap", opacity: 0.85 }}>
        {["C'EST MON CHOIX","SIMON VENDEME","CHAÎNE QUI PEUT","M6","GENTSIDE","Le Monde","LIVE COIFFURE"].map(b => (
          <span key={b} style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em", color: "oklch(0.14 0.004 60)" }}>{b}</span>
        ))}
      </div>
    </WContainer>
  </WSection>
);

// ─── Stats band — 4 utility cards (dark) ────────────────────────────────────
const WStatsBand = () => (
  <WSection pad="48px 64px" bg="oklch(0.14 0.004 60)">
    <WContainer>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          ["▦","Payment in installments","Spread your payments over 2 or 3 instalments with our partner."],
          ["⛟","Free delivery","Enjoy free delivery on purchases over €330 in France and Belgium."],
          ["⌖","Partner salons","Contact one of our partner salons in France and Belgium."],
          ["✉","By your side","Contact our support team for advice and answers to your questions."],
        ].map(([i, t, d]) => (
          <div key={t} style={{ background: "oklch(0.19 0.005 60)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "28px 24px", textAlign: "center", color: "oklch(0.99 0.002 250)" }}>
            <div style={{ fontSize: 22, marginBottom: 14, color: "oklch(0.95 0.025 85)" }}>{i}</div>
            <p style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700 }}>{t}</p>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{d}</p>
          </div>
        ))}
      </div>
    </WContainer>
  </WSection>
);

// ─── Footer · dark, multi-column ────────────────────────────────────────────
const WFooterDark = () => (
  <div style={{ background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", padding: "72px 64px 36px" }}>
    <WContainer>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr) 1.2fr", gap: 32, marginBottom: 48 }}>
        {[
          ["Shop", ["All products","Custom made","Gift card","My account","Loyalty"]],
          ["Help", ["Help Center","Contact us","Your diagnosis","Comparator","Track order"]],
          ["Info", ["About","The salons","Delivery and returns","Means of payment","Affiliate program"]],
          ["Pro", ["Discover HSC Pro","Request a pro account","Training","Branding kit","Login"]],
        ].map(([h, items]) => (
          <div key={h}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>{h}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
              {items.map(i => <li key={i} style={{ color: "rgba(255,255,255,0.9)" }}>{i}</li>)}
            </ul>
          </div>
        ))}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Stay informed about the latest news</div>
          <div style={{ display: "flex", gap: 0, background: "transparent", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 999, padding: 6 }}>
            <input placeholder="Enter your email" style={{ flex: 1, padding: "10px 14px", border: "none", background: "transparent", color: "oklch(0.99 0.002 250)", fontSize: 13 }} />
            <ArrowCircle size={36} bg="oklch(0.99 0.002 250)" fg="oklch(0.14 0.004 60)" />
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 22, color: "rgba(255,255,255,0.7)", fontSize: 16 }}>
            {["f","ig","yt","tt"].map(s => <span key={s} style={{ display: "inline-flex", width: 28, height: 28, borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{s}</span>)}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
        <div>© 2013–2026 Hair Solutions Co. · Registered trademark · Toronto, Canada</div>
        <div style={{ display: "flex", gap: 18 }}>
          {["Refund policy","Privacy policy","Terms of service","Shipping policy","Legal notice","Cancellation policy"].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>
    </WContainer>
  </div>
);

// ─── About hero · big bold dark ─────────────────────────────────────────────
const WAboutHeroDark = () => (
  <div style={{ position: "relative", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", minHeight: 560 }}>
    <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
      <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.7), rgba(10,10,10,0.92))" }} />
    </div>
    <div style={{ position: "relative", padding: "160px 64px 80px", maxWidth: 1240, margin: "0 auto" }}>
      <Eyebrow style={{ color: "rgba(255,255,255,0.7)" }}>About Hair Solutions Co.</Eyebrow>
      <h1 style={{ fontFamily: "var(--f-serif)", margin: "16px 0 22px", fontSize: 96, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 0.96 }}>
        Confidence starts at the top.
      </h1>
      <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", maxWidth: "58ch" }}>
        Premium non-surgical hair replacement systems for men who refuse to let hair loss define them. Undetectable, comfortable, and built to last — 100,000+ men have already made the switch.
      </p>
    </div>
  </div>
);

// ─── Loyalty program block ──────────────────────────────────────────────────
const WLoyaltyProgram = () => (
  <div>
    <div style={{ position: "relative", background: "oklch(0.14 0.004 60)", padding: "80px 64px", color: "oklch(0.99 0.002 250)" }}>
      <WContainer max={1240}>
        <Eyebrow style={{ color: "rgba(255,255,255,0.7)" }}>Loyalty program</Eyebrow>
        <h2 style={{ fontFamily: "var(--f-serif)", margin: "16px 0 22px", fontSize: 72, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>HSC <span style={{ fontStyle: "italic", fontWeight: 400 }}>& You.</span></h2>
        <p style={{ margin: "0 0 28px", fontSize: 15, color: "rgba(255,255,255,0.78)", maxWidth: "44ch" }}>
          Earn rewards after every purchase or on your birthday. Points can be redeemed for discounts.
        </p>
        <PillCta tone="light">Join the program</PillCta>
      </WContainer>
    </div>
    <WSection pad="80px 64px" bg="oklch(0.955 0.002 250)">
      <WContainer>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h3 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>How it works</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, textAlign: "center" }}>
          {[
            ["◉","Register","Sign up to start earning points"],
            ["⌖","Earn","Purchase or complete special actions"],
            ["✦","Redeem","Convert your points to get discounts"],
          ].map(([i, t, d]) => (
            <div key={t}>
              <div style={{ fontSize: 22, marginBottom: 14, color: "oklch(0.14 0.004 60)" }}>{i}</div>
              <p style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.015em" }}>{t}</p>
              <p style={{ margin: 0, fontSize: 13, color: "oklch(0.52 0.005 60)" }}>{d}</p>
            </div>
          ))}
        </div>
      </WContainer>
    </WSection>
    <WSection pad="80px 64px" bg="oklch(0.14 0.004 60)" color="oklch(0.99 0.002 250)">
      <WContainer>
        <h3 style={{ fontFamily: "var(--f-serif)", margin: 0, textAlign: "center", fontSize: 56, fontWeight: 400, letterSpacing: "-0.02em" }}>Earn points</h3>
        <p style={{ margin: "12px 0 40px", textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Earn more points for different actions and unlock your discounts.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            ["Purchase","🛍","Place an order","Earn 1 point for every €1 spent in the shop"],
            ["Event","🎂","Birthday","Receive 100 points on your birthday"],
            ["Social","ⓘ","Instagram follow","Follow HSC on Instagram and get 50 points"],
          ].map(([k, ico, t, d]) => (
            <div key={t} style={{ background: "oklch(0.19 0.005 60)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>{k}</div>
              <div style={{ fontSize: 22, color: "oklch(0.95 0.025 85)", marginBottom: 14 }}>{ico}</div>
              <p style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>{t}</p>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{d}</p>
            </div>
          ))}
        </div>
      </WContainer>
    </WSection>
  </div>
);

// ─── Editorial product gallery row · BYSIX-style PDP gallery ────────────────
const WBigProductGallery = () => (
  <WSection pad="40px 64px 56px" bg="oklch(0.99 0.002 250)">
    <WContainer>
      <div style={{ fontSize: 11, color: "oklch(0.52 0.005 60)", marginBottom: 16, fontWeight: 500, letterSpacing: "0.06em" }}>
        ⌂ &nbsp;/&nbsp; All products &nbsp;/&nbsp; <span style={{ color: "oklch(0.14 0.004 60)" }}>Ultra HD</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }}>
        {/* Gallery */}
        <div>
          <div style={{ borderRadius: 18, overflow: "hidden", background: "oklch(0.955 0.002 250)", aspectRatio: "1" }}>
            <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 18 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: 12 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 12, overflow: "hidden", background: "oklch(0.955 0.002 250)", border: i === 0 ? "2px solid oklch(0.14 0.004 60)" : "1px solid rgba(10,10,10,0.08)" }}>
                <PhotoPlaceholder ratio={undefined} subject={i % 2 ? "portrait" : "product"} style={{ width: "100%", height: "100%", borderRadius: 12 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "18px 20px", background: "oklch(0.955 0.002 250)", borderRadius: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "oklch(0.52 0.005 60)", marginBottom: 14 }}>Specifications · Ultra HD</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                ["0.03 mm","Thickness"],
                ["90–100%","Density"],
                ["1–2 mo","Lifespan"],
                ["Polyurethane","Material"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>{n}</div>
                  <div style={{ fontSize: 11, color: "oklch(0.52 0.005 60)", letterSpacing: "0.04em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Buy box */}
        <div>
          <div style={{ marginBottom: 18, padding: "12px 18px", background: "oklch(0.955 0.002 250)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13 }}>This model is also available <b>custom-made</b>.</span>
            <a href="#" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 14px", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", borderRadius: 999, textDecoration: "none" }}>View details</a>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h1 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 48, fontWeight: 400, letterSpacing: "-0.02em" }}>Ultra HD</h1>
            <span style={{ fontFamily: "var(--f-serif)", fontSize: 28, fontWeight: 400 }}>260,00€</span>
          </div>
          <p style={{ margin: "10px 0 12px", fontSize: 13, color: "oklch(0.52 0.005 60)" }}>Estimated delivery between 22/05 and 25/05.</p>
          <p style={{ margin: "0 0 24px", fontSize: 15, lineHeight: 1.6, color: "oklch(0.19 0.005 60)" }}>
            This base offers a perfectly undetectable result on the frontal line thanks to its thickness of 0.03 mm. The most appreciated system by our users.
          </p>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Select a colour</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ width: 44, height: 44, borderRadius: 8, overflow: "hidden", border: i === 0 ? "2px solid oklch(0.14 0.004 60)" : "1px solid rgba(10,10,10,0.1)" }}>
                  <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Purchase options</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ padding: "16px 18px", border: "2px solid oklch(0.14 0.004 60)", borderRadius: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>One-time purchase</div>
              </div>
              <div style={{ padding: "16px 18px", border: "1px solid rgba(10,10,10,0.1)", borderRadius: 14, position: "relative" }}>
                <div style={{ position: "absolute", top: 8, right: 10, fontSize: 9, fontWeight: 700, background: "oklch(0.95 0.025 85)", color: "oklch(0.14 0.004 60)", padding: "2px 8px", borderRadius: 999 }}>SAVE 5%</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Subscribe and save</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", border: "1px solid rgba(10,10,10,0.15)", borderRadius: 999 }}>
              <span>−</span><span style={{ fontWeight: 700 }}>1</span><span>+</span>
            </div>
            <a href="#" style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Add to cart · 260,00€</a>
          </div>
          <div style={{ padding: "12px 16px", background: "oklch(0.955 0.002 250)", borderRadius: 999, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
            <span><b>Alma</b> &nbsp;·&nbsp; 2× &nbsp; 3× &nbsp; 4×</span>
            <span style={{ color: "oklch(0.52 0.005 60)" }}>From €50.00</span>
          </div>
        </div>
      </div>
    </WContainer>
  </WSection>
);

// ─── ASSEMBLIES ─────────────────────────────────────────────────────────────
const HomePageV2 = ({ direction = "refined" }) => (
  <WPage direction={direction}>
    <AnnotatedStack mode="inline" items={[
      { name: "Top announcement bar", node: <WAnnouncementDark /> },
      { name: "Hero · full-bleed B&W portrait + display", node: (
        <div style={{ position: "relative" }}>
          <WNavDark />
          <WHeroBigDark />
        </div>
      ) },
      { name: "Intro band · 'The difference, in a glance' + 3 portrait cards", node: <WIntroGlance /> },
      { name: "Marquee · 100,000+ satisfied customers", node: <WSatisfiedMarquee /> },
      { name: "Collections grid · 5 editorial tiles", node: <WCollectionsBig /> },
      { name: "Big display statement · ALL CAPS Ultra HD", node: <WBigStatement /> },
      { name: "Editorial full-bleed · 'Undetectable implantation'", node: <WEditorialFullBleed /> },
      { name: "Press logos · 'They talk about us'", node: <WPressLogos /> },
      { name: "Stats band · payment / delivery / salons / support", node: <WStatsBand /> },
      { name: "Footer · dark, multi-column", node: <WFooterDark /> },
    ]} />
  </WPage>
);

const AboutPageV2 = ({ direction = "refined" }) => (
  <WPage direction={direction}>
    <AnnotatedStack mode="inline" items={[
      { name: "Top announcement bar", node: <WAnnouncementDark /> },
      { name: "About hero · dark + 'Confidence starts at the top'", node: (
        <div style={{ position: "relative" }}>
          <WNavDark />
          <WAboutHeroDark />
        </div>
      ) },
      { name: "Big statement · the mission", node:
        <WBigStatement bg="oklch(0.99 0.002 250)" text="To give every man a second storyline — one where hair loss doesn't hold them back." />
      },
      { name: "Values · four principles", node: <WAboutValues /> },
      { name: "Team grid · four builders", node: <WAboutTeam /> },
      { name: "Editorial full-bleed · the craft", node: <WEditorialFullBleed title="Exceptional know-how" /> },
      { name: "Timeline · five milestones", node: <WAboutTimeline /> },
      { name: "Press logos · they talk about us", node: <WPressLogos /> },
      { name: "Loyalty · HSC & You", node: <WLoyaltyProgram /> },
      { name: "Stats band · payment / delivery / salons / support", node: <WStatsBand /> },
      { name: "Footer", node: <WFooterDark /> },
    ]} />
  </WPage>
);

const CollectionPageV2 = ({ direction = "refined" }) => (
  <WPage direction={direction}>
    <AnnotatedStack mode="inline" items={[
      { name: "Top announcement bar", node: <WAnnouncementDark /> },
      { name: "Main navigation (light)", node: <WMainNav /> },
      { name: "Collection hero · 'All products'", node:
        <WSection pad="40px 64px 24px" bg="oklch(0.99 0.002 250)">
          <WContainer>
            <div style={{ fontSize: 11, color: "oklch(0.52 0.005 60)", marginBottom: 8, fontWeight: 500, letterSpacing: "0.06em" }}>⌂ &nbsp;/&nbsp; All products</div>
            <h1 style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 96, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>All products</h1>
          </WContainer>
        </WSection>
      },
      { name: "Filter bar · 41 products + sort", node:
        <WSection pad="16px 64px 24px" bg="oklch(0.99 0.002 250)">
          <WContainer>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span style={{ padding: "10px 16px", border: "1px solid rgba(10,10,10,0.12)", borderRadius: 12, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>≡ Show filters</span>
                <span style={{ fontSize: 13, color: "oklch(0.52 0.005 60)" }}>41 products</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "oklch(0.52 0.005 60)" }}>Sort by:</span>
                <span style={{ padding: "10px 16px", border: "1px solid rgba(10,10,10,0.12)", borderRadius: 12, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 10 }}>Featured ●</span>
              </div>
            </div>
          </WContainer>
        </WSection>
      },
      { name: "Product grid · 12 cards (4-wide)", node:
        <WSection pad="0 64px 48px" bg="oklch(0.99 0.002 250)">
          <WContainer>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {/* Lead-in dark card */}
              <div style={{ borderRadius: 18, overflow: "hidden", background: "oklch(0.19 0.005 60)", color: "oklch(0.99 0.002 250)", padding: 0, position: "relative", aspectRatio: "1" }}>
                <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 18 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "oklch(0.99 0.002 250)", padding: 24, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.015em" }}>Extreme fixation</p>
                  <p style={{ margin: "8px 0 20px", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Choose the best products</p>
                  <a href="#" style={{ padding: "10px 18px", background: "oklch(0.99 0.002 250)", color: "oklch(0.14 0.004 60)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Learn more →</a>
                </div>
              </div>
              {[
                ["Ultra HD", "260,00€", "Undetectable", "0.03 mm", "90–100%", "Bestseller"],
                ["Ultra HD Plus", "271,00€", "Natural", "0.05 mm", "115%", null],
                ["Smart HD", "From 268,00€", "Natural", "0.04 mm", "100–110%", null],
                ["Micro HD", "279,00€", "Perceptible", "0.07 mm", "120%", null],
                ["Micro HD Plus", "290,00€", "Perceptible", "0.09 mm", "120%", null],
                ["Total HD", "365,00€", "Natural", "90–100%", "4 to 6 mo", null],
                ["D-Pro", "365,00€", "Natural", "120%", "4 to 6 mo", "Sold out"],
                ["U-Pro", "365,00€", "Natural", "100–110%", "4 to 6 mo", null],
                ["Color ring", "71,00€", null, null, null, "Locator"],
                ["Power full glue", "From 21,90€", null, null, null, "Bestseller"],
                ["GO FAST Adhesive", "19,90€", null, null, null, "New"],
              ].map(([t, p, style, thick, dens, badge]) => (
                <div key={t} className="hsc-card" style={{ padding: 0, position: "relative" }}>
                  {badge && <span style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 4, background: badge === "Sold out" ? "rgba(10,10,10,0.06)" : "oklch(0.14 0.004 60)", color: badge === "Sold out" ? "oklch(0.52 0.005 60)" : "oklch(0.99 0.002 250)", letterSpacing: "0.04em", zIndex: 2 }}>{badge}</span>}
                  <span style={{ position: "absolute", top: 12, right: 12, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.92)", color: "oklch(0.14 0.004 60)", zIndex: 2 }}>★ 4.7</span>
                  <div style={{ aspectRatio: "1", background: "oklch(0.955 0.002 250)" }}>
                    <PhotoPlaceholder ratio={undefined} subject="product" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                  </div>
                  <div style={{ padding: "16px 18px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{t}</p>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{p}</p>
                    </div>
                    {style && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, paddingTop: 10, borderTop: "1px solid rgba(10,10,10,0.08)" }}>
                        {[["♔", style, "Style"], ["▦", thick, "Thickness"], ["✦", dens, "Density"]].map(([i, v, l]) => (
                          <div key={l} style={{ fontSize: 10 }}>
                            <div style={{ color: "oklch(0.52 0.005 60)", letterSpacing: "0.04em" }}>{i} {v}</div>
                            <div style={{ color: "oklch(0.70 0.004 60)", marginTop: 2 }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </WContainer>
        </WSection>
      },
      { name: "Reviews showcase · floating cards", node:
        <WSection pad="120px 64px" bg="oklch(0.955 0.002 250)">
          <WContainer>
            <h2 style={{ margin: "0 0 56px", textAlign: "center", fontSize: 64, fontWeight: 800, letterSpacing: "-0.035em", textTransform: "uppercase" }}>Our customers' reviews</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                ["Benjamin F.", "Power full glue", "This adhesive is exceptional. No reactions, holds beautifully for weeks."],
                ["Jacques A.", "Purity Shampoo", "Even better than the previous formulation. Pleasant scent, hair stays soft."],
                ["Raphael B.", "Smart-HD", "Very high-quality system. The hair is soft and the curls look completely natural."],
              ].map(([n, p, q]) => (
                <div key={n} className="hsc-card" style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 999, background: "oklch(0.14 0.004 60)" }}></div>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{n}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: "oklch(0.52 0.005 60)", fontStyle: "italic" }}>{p}</p>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{q}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <PillCta tone="dark">All reviews</PillCta>
            </div>
          </WContainer>
        </WSection>
      },
      { name: "Stats band · payment / delivery / salons / support", node: <WStatsBand /> },
      { name: "Footer", node: <WFooterDark /> },
    ]} />
  </WPage>
);

const ProductPageV2 = ({ direction = "refined" }) => (
  <WPage direction={direction}>
    <AnnotatedStack mode="inline" items={[
      { name: "Top announcement bar", node: <WAnnouncementDark /> },
      { name: "Main navigation (light)", node: <WMainNav /> },
      { name: "Gallery + buy box · BYSIX-style PDP", node: <WBigProductGallery /> },
      { name: "Information panel · full specifications", node:
        <WSection pad="40px 64px 80px" bg="oklch(0.99 0.002 250)">
          <WContainer>
            <h2 style={{ fontFamily: "var(--f-serif)", margin: "0 0 24px", fontSize: 56, fontWeight: 400, letterSpacing: "-0.02em" }}>Information</h2>
            <div style={{ background: "oklch(0.955 0.002 250)", borderRadius: 18, padding: "32px 36px" }}>
              <h3 style={{ margin: "0 0 28px", fontSize: 24, fontWeight: 700 }}>📄 &nbsp; The Ultra HD in detail</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 64px" }}>
                {[
                  ["Base type", "Polyurethane base"],
                  ["Base thickness", "0.03 millimeters"],
                  ["Density", "Overall density of 90 to 100% with undetectable implantation at the frontal line."],
                  ["Hair length", "15 centimeters"],
                  ["Hair type", "100% Remy Human Hair"],
                  ["Implantation", "Freestyle movement style"],
                  ["Wave", "Slightly wavy"],
                  ["Frontal edge", "\"A\" shape"],
                  ["Base dimensions", "20 × 25 cm (width × length). 20 cm ear-to-ear, 25 cm forehead-to-nape."],
                  ["Frontal line", "5/5: undetectable implantation"],
                  ["Durability", "Approximately 1 to 2 months. Most users keep this model for 3 to 4 months."],
                  ["Usage", "Ready-to-install model, cut to size, with the excess front removed."],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.52 0.005 60)", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 14, color: "oklch(0.14 0.004 60)" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </WContainer>
        </WSection>
      },
      { name: "Editorial split · 'Ultra High Definition'", node:
        <WSection pad="80px 64px" bg="oklch(0.99 0.002 250)">
          <WContainer>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
              <div style={{ borderRadius: 18, overflow: "hidden", aspectRatio: "4 / 5" }}>
                <PhotoPlaceholder ratio={undefined} subject="portrait" style={{ width: "100%", height: "100%", borderRadius: 18 }} />
              </div>
              <div>
                <h2 style={{ fontFamily: "var(--f-serif)", margin: "0 0 16px", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em" }}>Ultra High Definition</h2>
                <p style={{ margin: "0 0 28px", fontSize: 15, lineHeight: 1.6, color: "oklch(0.19 0.005 60)" }}>
                  This system is ideal if you want to style your hair backwards and achieve a perfectly undetectable result. Thanks to the tailor-made confection, you can also fully personalise your system.
                </p>
                {[
                  ["Frontal line", "Visible", "Undetectable", 5],
                  ["Sustainability", "Low", "High", 3],
                  ["Comfort", "Down", "Pupil", 4],
                  ["Setup", "Complex", "Simple", 4],
                ].map(([label, a, b, fill]) => (
                  <div key={label} style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{label}</div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1,2,3,4,5].map(n => (
                        <div key={n} style={{ flex: 1, height: 8, borderRadius: 4, background: n <= fill ? "oklch(0.14 0.004 60)" : "oklch(0.88 0.003 250)" }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "oklch(0.52 0.005 60)", marginTop: 4 }}>
                      <span>{a}</span><span>{b}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WContainer>
        </WSection>
      },
      { name: "Know-how editorial split", node: <WFeatureSplit /> },
      { name: "Customer reviews · numbered card", node:
        <WSection pad="80px 64px" bg="oklch(0.99 0.002 250)">
          <WContainer max={900}>
            <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 48, marginBottom: 32 }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.52 0.005 60)" }}>Customer reviews</p>
                <p style={{ fontFamily: "var(--f-serif)", margin: "14px 0 8px", fontSize: 56, fontWeight: 400, letterSpacing: "-0.02em" }}>4.61</p>
                <div style={{ fontSize: 16, color: "oklch(0.14 0.004 60)" }}>★★★★½</div>
                <p style={{ margin: "8px 0 0", fontSize: 12, color: "oklch(0.52 0.005 60)" }}>243 reviews</p>
              </div>
              <div>
                {["Search ⌕","Sort by: Latest","Rating ▾"].map(p => (
                  <span key={p} style={{ display: "inline-block", margin: "0 8px 10px 0", padding: "10px 14px", border: "1px solid rgba(10,10,10,0.1)", borderRadius: 10, fontSize: 12 }}>{p}</span>
                ))}
                {[
                  ["JH","Jean-Christophe","5","Excellent quality.", "7 days ago"],
                  ["AT","Agussol T","4","Bien. Très satisfait du résultat.", "20 days ago"],
                  ["SV","Shana V","5","Top. Conforme à mes attentes.", "Last month"],
                ].map(([init, n, r, q, d]) => (
                  <div key={n} style={{ padding: "20px 0", borderTop: "1px solid rgba(10,10,10,0.08)" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 999, background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{init}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{n} <span style={{ fontSize: 10, color: "oklch(0.52 0.005 60)", fontWeight: 500, marginLeft: 8 }}>✓ Verified buyer</span></p>
                          <p style={{ margin: 0, fontSize: 11, color: "oklch(0.52 0.005 60)" }}>{d}</p>
                        </div>
                        <div style={{ fontSize: 13, margin: "6px 0" }}>{"★".repeat(parseInt(r)) + "☆".repeat(5 - parseInt(r))}</div>
                        <p style={{ margin: 0, fontSize: 13, color: "oklch(0.19 0.005 60)" }}>{q}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ textAlign: "center", marginTop: 32 }}><PillCta tone="dark">See more reviews</PillCta></div>
              </div>
            </div>
          </WContainer>
        </WSection>
      },
      { name: "Feature marquee · 'Optimised fixation · Undetectable border · Natural implantation · Comfortable'", node:
        <div style={{ background: "oklch(0.99 0.002 250)", padding: "32px 0", borderTop: "1px solid rgba(10,10,10,0.08)", borderBottom: "1px solid rgba(10,10,10,0.08)" }}>
          <div className="hsc-marquee" style={{ background: "transparent", border: "none" }}>
            <div className="hsc-marquee-track" style={{ fontSize: 32, color: "rgba(10,10,10,0.4)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
              {Array.from({ length: 2 }).flatMap((_, set) =>
                ["Optimised fixation","Undetectable border","Natural implantation","Comfortable","100% Remy Human Hair"].map((w, j) => (
                  <React.Fragment key={`${set}-${j}`}>
                    <span>{w}</span>
                    <span className="hsc-marquee-dot"></span>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      },
      { name: "Recommended products · 4-up", node: <WCrossSell /> },
      { name: "Stats band", node: <WStatsBand /> },
      { name: "Footer", node: <WFooterDark /> },
    ]} />
  </WPage>
);

Object.assign(window, {
  ArrowCircle, PillCta,
  WAnnouncementDark, WNavDark,
  WHeroBigDark, WIntroGlance, WSatisfiedMarquee, WCollectionsBig,
  WBigStatement, WEditorialFullBleed, WPressLogos, WStatsBand, WFooterDark,
  WAboutHeroDark, WLoyaltyProgram, WBigProductGallery,
  // Replace v1 assemblies with v2
  HomePage: HomePageV2,
  AboutPage: AboutPageV2,
  CollectionPage: CollectionPageV2,
  ProductPage: ProductPageV2,
});
