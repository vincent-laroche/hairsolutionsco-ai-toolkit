// EmailRebrand.jsx — Three rebrand-launch emails (A/B/C) using the polished
// copy supplied May 15, 2026. Structure mirrors the brand team's section
// outline; design language is the v3 brand system (black/white/cream,
// 18px radius, Geist/Geist, B&W editorial photography).
//
//   A · Premium rebrand announcement   — confident editorial reveal
//   B · Personal founder letter        — quieter, story-first
//   C · Bold launch / conversion       — sharper, offer-led

// ─── SHARED BLOCKS ─────────────────────────────────────────────────────────

const RebrandStripe = ({ tone = "dark", text = "New chapter · same craft · May 15, 2026" }) => (
  <div style={{
    background: tone === "dark" ? "oklch(0.14 0.004 60)" : "oklch(0.95 0.025 85)",
    color: tone === "dark" ? "oklch(0.99 0.002 250)" : "oklch(0.14 0.004 60)",
    padding: "12px 16px", textAlign: "center",
    fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
    borderRadius: "var(--r-card)",
  }}>{text}</div>
);

const RebrandHeader = ({ tone = "light" }) => (
  <div style={{
    padding: "28px 40px",
    background: tone === "dark" ? "oklch(0.14 0.004 60)" : "oklch(0.99 0.002 250)",
    color: tone === "dark" ? "oklch(0.99 0.002 250)" : "oklch(0.14 0.004 60)",
    borderRadius: "var(--r-card)",
    border: "1px solid " + (tone === "dark" ? "rgba(255,255,255,0.08)" : "rgba(10,10,10,0.08)"),
    display: "flex", alignItems: "center", justifyContent: "space-between",
  }}>
    <Logo tone={tone === "dark" ? "light" : "dark"} height={20} />
    <div style={{ display: "flex", gap: 22 }}>
      {["Shop", "Guide", "Help"].map(l => (
        <span key={l} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>{l}</span>
      ))}
    </div>
  </div>
);

const ERebrandWordmarkPair = () => (
  <div className="hsc-card" style={{ padding: 0, overflow: "hidden" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ padding: "44px 32px", borderRight: "1px solid var(--border)", textAlign: "center", background: "oklch(0.955 0.002 250)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.005 60)", marginBottom: 22 }}>Before · 2024</div>
        <Logo height={22} />
        <p style={{ margin: "16px 0 0", fontSize: 11, color: "oklch(0.52 0.005 60)", fontStyle: "italic" }}>The original mark</p>
      </div>
      <div style={{ padding: "44px 32px", textAlign: "center", background: "oklch(0.99 0.002 250)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.005 60)", marginBottom: 22 }}>After · 2026</div>
        <Logo height={22} />
        <p style={{ margin: "16px 0 0", fontSize: 11, color: "oklch(0.52 0.005 60)", fontStyle: "italic" }}>Refined for confidence</p>
      </div>
    </div>
  </div>
);

// 50% offer — cream accent treatment, used by A + C
const ERebrandOffer = ({ ctaLabel = "Claim your launch offer" }) => (
  <div className="hsc-card" style={{ padding: "44px 44px", textAlign: "center", background: "oklch(0.95 0.025 85)", border: "1px solid rgba(10,10,10,0.08)" }}>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.30 0.02 70)", marginBottom: 14 }}>Special launch offer · new customers</div>
    <p style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 80, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 0.95, color: "oklch(0.14 0.004 60)" }}>−50%</p>
    <p style={{ margin: "14px 0 12px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.015em", color: "oklch(0.14 0.004 60)" }}>Off your first hair system.</p>
    <p style={{ margin: "0 auto 22px", fontSize: 14, color: "oklch(0.30 0.02 70)", lineHeight: 1.6, maxWidth: "52ch" }}>
      Your first system is often the most important one. It helps you understand your preferred look, base type, density, and what feels right for your lifestyle. This launch offer was created to make that first step easier.
    </p>
    <a href="https://www.hairsolutions.co" style={{ display: "inline-block", padding: "14px 28px", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>{ctaLabel}</a>
    <p style={{ margin: "20px 0 0", fontSize: 10, color: "oklch(0.30 0.02 70)", letterSpacing: "0.04em" }}>Limited-time offer · applies to first system only · availability may vary by stock and selection</p>
  </div>
);

// Inline / compact offer used by B (offer late in the letter)
const ERebrandOfferInline = () => (
  <div className="hsc-card" style={{ padding: "36px 40px", background: "oklch(0.95 0.025 85)", border: "1px solid rgba(10,10,10,0.08)" }}>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.30 0.02 70)", marginBottom: 12 }}>A launch offer for new customers</div>
    <p style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 36, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.0, color: "oklch(0.14 0.004 60)" }}>50% off your first system.</p>
    <p style={{ margin: "14px 0 22px", fontSize: 14, color: "oklch(0.30 0.02 70)", lineHeight: 1.65, maxWidth: "60ch" }}>
      I wanted this launch offer to feel meaningful because I know the first step is often the hardest. There is always a moment where you wonder — will this look natural? Will people notice? Will I know how to maintain it? That is exactly why we want to make the first experience easier to access.
    </p>
    <a href="https://www.hairsolutions.co" style={{ display: "inline-block", padding: "14px 24px", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Get 50% off your first system</a>
  </div>
);

// Testimonials — three real client portraits with quotes
const ERebrandTestimonials = ({ eyebrow = "What customers are saying", title = "Why 100,000+ men trust us." }) => {
  const photos = [HSC_PHOTOS.marcus.src, HSC_PHOTOS.ben.src, HSC_PHOTOS.raphael.src];
  const items = [
    [photos[0], 5, "I was nervous before ordering because I didn't know what would look natural on me. The experience made everything feel much clearer, and the result was better than I expected.", "Verified customer"],
    [photos[1], 5, "The biggest difference for me was confidence. I stopped thinking about my hair all the time. It just became part of how I show up every day.", "Verified customer"],
    [photos[2], 5, "The system looked natural, felt comfortable, and gave me a result I honestly wish I had tried sooner.", "Verified customer"],
  ];
  return (
    <div className="hsc-card" style={{ padding: "36px 32px" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 24px", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>{title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {items.map(([src, r, q, attr], i) => (
          <div key={i} style={{ background: "oklch(0.955 0.002 250)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ aspectRatio: "1", overflow: "hidden" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "18px 18px 20px" }}>
              <div style={{ fontSize: 13, color: "oklch(0.14 0.004 60)", marginBottom: 10 }}>{"★".repeat(r)}</div>
              <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.55, color: "oklch(0.19 0.005 60)" }}>"{q}"</p>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>— {attr}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Light footer
const RebrandFooter = ({ tagline = "Natural-looking hair systems designed for confidence, clarity, and everyday wear." }) => (
  <div style={{ textAlign: "center", padding: "32px 28px 12px", fontSize: 11, color: "var(--ink-muted)", lineHeight: 1.7 }}>
    <Logo height={16} />
    <p style={{ margin: "14px 0 6px", maxWidth: "60ch", marginLeft: "auto", marginRight: "auto" }}>{tagline}</p>
    <p style={{ margin: "6px 0" }}>www.hairsolutions.co · 10 Dundas East · Toronto, ON</p>
    <p style={{ margin: "0 0 6px" }}>
      <a href="#" style={{ color: "inherit", textDecoration: "underline", margin: "0 8px" }}>Instagram</a>
      <a href="#" style={{ color: "inherit", textDecoration: "underline", margin: "0 8px" }}>YouTube</a>
      <a href="#" style={{ color: "inherit", textDecoration: "underline", margin: "0 8px" }}>TikTok</a>
    </p>
    <p style={{ margin: 0 }}>
      <a href="#" style={{ color: "inherit", textDecoration: "underline" }}>Unsubscribe</a> · <a href="#" style={{ color: "inherit", textDecoration: "underline" }}>Privacy</a>
    </p>
  </div>
);

// Reusable rich text block — preserves paragraph rhythm without inventing copy
const ERichText = ({ paragraphs, maxCh = 64 }) => (
  <div style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)" }}>
    {paragraphs.map((p, i) => (
      <p key={i} style={{ margin: i === 0 ? "0 0 14px" : "0 0 14px", maxWidth: `${maxCh}ch` }}>{p}</p>
    ))}
  </div>
);

// =============================================================================
// VARIANT A · PREMIUM REBRAND ANNOUNCEMENT
// =============================================================================

const ERebrandA_Hero = () => (
  <div className="hsc-card" style={{ padding: 0, overflow: "hidden", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", position: "relative" }}>
    <div style={{ position: "relative" }}>
      <HscPhoto
        src={HSC_PHOTOS.heroPlaid.src}
        alt="A new era for Hair Solutions Co."
        ratio="4 / 5" vignette={false}
        overlay="linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.15) 35%, rgba(10,10,10,0.85) 100%)"
      />
      <div style={{ position: "absolute", left: 28, top: 28, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "rgba(255,255,255,0.14)", backdropFilter: "blur(4px)", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.99 0.002 250)" }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "oklch(0.95 0.025 85)" }} /> New chapter
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "32px 36px 36px" }}>
        <p style={{ fontFamily: "var(--f-serif)", margin: 0, fontSize: 48, lineHeight: 1.0, letterSpacing: "-0.02em", fontWeight: 400 }}>
          A new era for Hair Solutions Co.
        </p>
        <p style={{ margin: "20px 0 0", fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.82)", maxWidth: "48ch" }}>
          We rebuilt the Hair Solutions Co. experience to make finding the right hair system clearer, simpler, and more confidence-driven from the very first visit. Same commitment. Same attention to detail. A sharper way to help you move forward.
        </p>
        <div style={{ marginTop: 24 }}>
          <a href="https://www.hairsolutions.co" style={{ display: "inline-block", padding: "12px 22px", background: "oklch(0.99 0.002 250)", color: "oklch(0.14 0.004 60)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Explore the new website</a>
        </div>
      </div>
    </div>
  </div>
);

const ERebrandA_Opening = () => (
  <div className="hsc-card" style={{ padding: "36px 40px" }}>
    <Eyebrow>Opening</Eyebrow>
    <h2 style={{ margin: "12px 0 18px", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
      Hair Solutions Co. has entered a new chapter.
    </h2>
    <ERichText paragraphs={[
      "Over the past months, we have been rethinking not only how our brand looks, but how the entire experience should feel for someone considering a hair system — especially for the first time.",
      "Because choosing a hair system is not just a product decision. It is personal. It is emotional. It is practical. It affects how you look, how you show up, how you feel in photos, in conversations, at work, on dates, and in your everyday life.",
      "So we rebuilt the website with one goal in mind: to make the process feel less overwhelming, more transparent, and far more guided.",
    ]} />
  </div>
);

const ERebrandA_WhatsNew = () => {
  const items = [
    ["A clearer way to understand your options", "We simplified the way our systems are presented, so you can compare base types, density, realism, durability, comfort, and maintenance needs without feeling lost in technical language."],
    ["A more premium shopping experience", "The new website is cleaner, faster, easier to navigate, and designed to help you find the right solution with fewer doubts and fewer unnecessary steps."],
    ["Better education before purchase", "We added clearer explanations around hair systems, application, maintenance, lifestyle fit, and what to expect — because the right choice should be made with confidence, not confusion."],
    ["A stronger focus on natural results", "Our positioning has evolved around what matters most: systems that look realistic, feel wearable, and help men feel like themselves again."],
    ["A more guided customer journey", "Whether you are brand new to hair systems or already know exactly what you need, the new Hair Solutions Co. experience is built to meet you where you are."],
  ];
  return (
    <div className="hsc-card" style={{ padding: "36px 40px" }}>
      <Eyebrow>What's new</Eyebrow>
      <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 12px", fontSize: 30, fontWeight: 400, letterSpacing: "-0.02em" }}>The new experience.</h2>
      <p style={{ margin: "0 0 22px", fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: "62ch" }}>
        The new Hair Solutions Co. was designed to give you more clarity before you buy, more confidence while choosing, and more support after your order.
      </p>
      <div>
        {items.map(([t, d], i) => (
          <div key={t} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 16, padding: "18px 0", borderTop: i === 0 ? "1px solid var(--border)" : "1px solid var(--border)" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)", letterSpacing: "0.12em", paddingTop: 4 }}>0{i + 1}</div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>{t}</p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ERebrandA_Founder = () => (
  <div className="hsc-card" style={{ padding: 0, overflow: "hidden" }}>
    <HscPhoto src={HSC_PHOTOS.silverFox.src} alt="The Hair Solutions Co. Team" ratio="16 / 9" position="center 30%" />
    <div style={{ padding: "36px 40px" }}>
      <Eyebrow>A word from the founder</Eyebrow>
      <h2 style={{ margin: "12px 0 18px", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        Why we rebuilt — and what stays the same.
      </h2>
      <ERichText paragraphs={[
        "There is a reason we decided to rebuild Hair Solutions Co. instead of simply refreshing the logo or changing a few pages.",
        "After speaking with customers, reviewing the questions people ask before buying, and seeing where most men hesitate, one thing became obvious: the industry often makes hair systems feel more complicated than they need to be. Too many brands focus only on the product. Not enough focus on the person behind the decision.",
        "We wanted Hair Solutions Co. to feel different. More honest. More refined. More educational. More direct. More human.",
        "Our goal is not just to sell a system. Our goal is to help you understand what will actually work for your lifestyle, your expectations, your comfort level, and your desired result.",
        "This rebrand is our way of raising the standard — not only in how we present ourselves, but in how we support every man who comes to us looking for a real solution.",
        "Thank you for being part of this next chapter.",
      ]} />
      <p style={{ margin: "22px 0 0", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>— The Hair Solutions Co. Team</p>
    </div>
  </div>
);

const ERebrandA_Products = () => (
  <div className="hsc-card" style={{ padding: "36px 32px" }}>
    <Eyebrow>Our hair systems</Eyebrow>
    <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 8px", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>Made for everyday wear.</h2>
    <p style={{ margin: "0 0 24px", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: "60ch" }}>
      Our systems are designed for men who want a realistic, comfortable, and confidence-restoring solution — without the outdated look or heavy feel people often associate with traditional hair replacement.
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
      {[
        [HSC_PHOTOS.heroPlaid.src,  "Natural-looking systems",       "Built to blend with your features, your style, and your lifestyle. Selected for realism, comfort, and the kind of finish that looks natural in real life — not just under perfect lighting."],
        [HSC_PHOTOS.pinstripe.src,  "Options for different needs",   "Whether you prioritize the most natural hairline, easier maintenance, longer wear, or a balanced everyday option, our range helps you choose based on what actually matters to you."],
        [HSC_PHOTOS.matureBw.src,   "Designed for confidence",       "A great hair system should not remind you that you are wearing one. It should let you move through your day with more ease, more confidence, and less self-consciousness."],
      ].map(([src, t, d]) => (
        <div key={t} style={{ background: "oklch(0.955 0.002 250)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ aspectRatio: "1", overflow: "hidden" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "14px 18px 18px" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em" }}>{t}</p>
            <p style={{ margin: "6px 0 0", fontSize: 12, lineHeight: 1.55, color: "var(--ink-soft)" }}>{d}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ERebrandA_FinalCta = () => (
  <div className="hsc-card hsc-dark" style={{ padding: "48px 40px", textAlign: "center", background: "oklch(0.14 0.004 60)" }}>
    <Eyebrow style={{ color: "oklch(0.95 0.025 85)" }}>Ready to see what changed?</Eyebrow>
    <h2 style={{ fontFamily: "var(--f-serif)", margin: "16px auto 18px", fontSize: 36, fontWeight: 400, letterSpacing: "-0.02em", color: "oklch(0.99 0.002 250)", maxWidth: "20ch", lineHeight: 1.05 }}>
      Visit the new Hair Solutions Co.
    </h2>
    <p style={{ margin: "0 auto 26px", fontSize: 14, color: "rgba(255,255,255,0.78)", maxWidth: "52ch", lineHeight: 1.6 }}>
      The new Hair Solutions Co. was built to help you make a better, more confident decision. Explore the new website, compare your options, and take advantage of the limited launch offer while it is available.
    </p>
    <a href="https://www.hairsolutions.co" style={{ display: "inline-block", padding: "14px 28px", background: "oklch(0.95 0.025 85)", color: "oklch(0.14 0.004 60)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Visit hairsolutions.co</a>
  </div>
);

const Email_Rebrand_A = ({ direction = "refined" }) => (
  <EmailFrame direction={direction}>
    <AnnotatedStack items={[
      { name: "Top stripe · new chapter", node: <RebrandStripe /> },
      { name: "Header · wordmark + nav", node: <RebrandHeader /> },
      { name: "Hero · 'A new era' + portrait + CTA", node: <ERebrandA_Hero /> },
      { name: "Opening message · paragraph block", node: <ERebrandA_Opening /> },
      { name: "Wordmark · before / after", node: <ERebrandWordmarkPair /> },
      { name: "What's new · 5 reasons", node: <ERebrandA_WhatsNew /> },
      { name: "Word from the Founder · long form", node: <ERebrandA_Founder /> },
      { name: "Our hair systems · 3-card row", node: <ERebrandA_Products /> },
      { name: "Special launch offer · 50% (cream)", node: <ERebrandOffer ctaLabel="Claim your launch offer" /> },
      { name: "Testimonials · 3 verified customers", node: <ERebrandTestimonials /> },
      { name: "Final CTA · 'visit hairsolutions.co'", node: <ERebrandA_FinalCta /> },
      { name: "Footer", node: <RebrandFooter /> },
    ]} />
  </EmailFrame>
);

// =============================================================================
// VARIANT B · PERSONAL FOUNDER LETTER
// =============================================================================

const ERebrandB_Hero = () => (
  <div className="hsc-card" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1.1fr 1fr" }}>
    <div style={{ padding: "44px 36px 40px", alignSelf: "center" }}>
      <Eyebrow>An open letter · May 15, 2026</Eyebrow>
      <p style={{ fontFamily: "var(--f-serif)", margin: "16px 0 18px", fontSize: 34, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: "22ch" }}>
        We rebuilt Hair Solutions Co. for the men who needed more than a product page.
      </p>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "42ch" }}>
        A personal note on what changed, why it changed, and where Hair Solutions Co. is going next.
      </p>
    </div>
    <HscPhoto src={HSC_PHOTOS.matureBw.src} alt="" ratio={undefined} style={{ height: "100%", borderRadius: 0 }} position="center 30%" vignette={false} />
  </div>
);

const ERebrandB_Letter = () => (
  <div className="hsc-card" style={{ padding: "36px 44px" }}>
    <p style={{ margin: "0 0 18px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Hi,</p>
    <ERichText paragraphs={[
      "I wanted to write this personally because the new Hair Solutions Co. is not just a visual update.",
      "It is the result of listening. Listening to the men who were curious but unsure. Listening to the customers who had questions before placing their first order. Listening to the people who wanted a hair system, but did not want to feel sold to, rushed, or confused.",
      "And the truth is, that hesitation makes sense. Buying a hair system is not like buying a shirt or a pair of shoes. It is deeply personal. You are making a decision about how you want to see yourself again — and how you want to be seen by others. That kind of decision deserves more care.",
      "So we rebuilt Hair Solutions Co. around a better idea: a customer should never feel lost, embarrassed, or pressured while trying to solve hair loss. They should feel informed. Supported. Respected. And confident.",
      "That is what this new chapter is about.",
    ]} />
    <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 14, paddingTop: 22, borderTop: "1px solid var(--border)" }}>
      <div style={{ width: 48, height: 48, borderRadius: 999, overflow: "hidden", background: "oklch(0.14 0.004 60)" }}>
        <img src={HSC_PHOTOS.silverFox.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, fontStyle: "italic" }}>Daniel Park</p>
        <p style={{ margin: "2px 0 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Founder · Hair Solutions Co.</p>
      </div>
    </div>
  </div>
);

const ERebrandB_WhatChanged = () => {
  const items = [
    ["The website is now easier to navigate", "We redesigned the experience so you can move through the site naturally — from understanding hair systems, to comparing options, to choosing the right first system."],
    ["The product information is clearer", "We improved the way we explain base types, hairlines, density, comfort, wear time, and maintenance so you can make a decision based on your real needs."],
    ["The brand feels more aligned with the result", "Hair systems should not feel outdated, clinical, or intimidating. The new brand reflects what we believe the experience should be: modern, discreet, elevated, and confidence-focused."],
    ["The customer journey is more thoughtful", "Instead of simply showing products, the new website helps guide you through the decision. It is built for both first-time buyers and experienced hair system users."],
  ];
  return (
    <div className="hsc-card" style={{ padding: "36px 40px" }}>
      <Eyebrow>What has changed</Eyebrow>
      <h2 style={{ margin: "12px 0 22px", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>The new Hair Solutions Co.</h2>
      <p style={{ margin: "0 0 22px", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: "62ch" }}>
        The new Hair Solutions Co. website was created to make the entire experience more transparent, more premium, and much easier to understand. Here is what changed.
      </p>
      {items.map(([t, d], i) => (
        <div key={t} style={{ padding: "16px 0", borderTop: "1px solid var(--border)" }}>
          <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>{t}</p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>{d}</p>
        </div>
      ))}
    </div>
  );
};

const ERebrandB_WhyMatters = () => (
  <div className="hsc-card" style={{ padding: "44px 44px", background: "oklch(0.955 0.002 250)", textAlign: "center" }}>
    <Eyebrow>Why this matters</Eyebrow>
    <p style={{ margin: "16px auto 22px", fontSize: 26, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.3, maxWidth: "32ch" }}>
      For many men, hair loss becomes something they quietly manage every day.
    </p>
    <div style={{ margin: "0 auto 22px", maxWidth: "44ch", textAlign: "left", fontSize: 14, lineHeight: 1.8, color: "var(--ink-soft)" }}>
      <div>They adjust the lighting.</div>
      <div>They avoid certain angles.</div>
      <div>They wear hats more often.</div>
      <div>They stop liking photos.</div>
      <div>They feel older than they actually feel.</div>
    </div>
    <p style={{ margin: "0 auto 0", fontSize: 15, lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: "56ch", textAlign: "left" }}>
      A hair system does not solve everything in life. But the right one can remove a daily source of stress. That is why we take this seriously. The goal is not to make you look like someone else. The goal is to help you feel like yourself again — with a result that looks natural, fits your lifestyle, and gives you back a level of ease you may not have realized you were missing.
    </p>
  </div>
);

const ERebrandB_Products = () => (
  <div className="hsc-card" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1.1fr" }}>
    <HscPhoto src={HSC_PHOTOS.hairlineMacro.src} alt="" ratio={undefined} style={{ height: "100%", borderRadius: 0 }} />
    <div style={{ padding: "36px 36px", alignSelf: "center" }}>
      <Eyebrow>Our products</Eyebrow>
      <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 12px", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>Realism. Comfort. Confidence.</h2>
      <ERichText paragraphs={[
        "Our systems are selected around three priorities. We focus on hair systems that are wearable in real life — systems that can look natural up close, feel comfortable through the day, and support the kind of lifestyle our customers actually live.",
        "Whether you are looking for an undetectable hairline, a durable everyday system, or a balanced first option, the new website makes it easier to understand what each system is best for.",
        "You should not have to become an expert before making your first decision. That is our job.",
      ]} maxCh={50} />
    </div>
  </div>
);

const ERebrandB_ClosingNote = () => (
  <div className="hsc-card" style={{ padding: "36px 44px" }}>
    <Eyebrow>A closing note</Eyebrow>
    <h2 style={{ margin: "12px 0 18px", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>This rebrand is a beginning.</h2>
    <ERichText paragraphs={[
      "We are going to keep improving the education, the product experience, the customer support, and the way men discover hair systems for the first time.",
      "If you have been with us before, thank you.",
      "If you are discovering us now, welcome.",
      "And if you have been thinking about taking the first step, I hope the new Hair Solutions Co. makes that decision feel a little easier.",
    ]} />
    <p style={{ margin: "22px 0 24px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>— Daniel Park · Founder, Hair Solutions Co.</p>
    <a href="https://www.hairsolutions.co" style={{ display: "inline-block", padding: "14px 24px", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Explore the new Hair Solutions Co.</a>
  </div>
);

const Email_Rebrand_B = ({ direction = "refined" }) => (
  <EmailFrame direction={direction}>
    <AnnotatedStack items={[
      { name: "Top stripe · open letter", node: <RebrandStripe text="A personal note · May 15, 2026" /> },
      { name: "Header · wordmark + nav", node: <RebrandHeader /> },
      { name: "Hero · letter open + portrait", node: <ERebrandB_Hero /> },
      { name: "Founder letter · the listening note", node: <ERebrandB_Letter /> },
      { name: "What has changed · 4 reasons", node: <ERebrandB_WhatChanged /> },
      { name: "Why this matters · emotional pull", node: <ERebrandB_WhyMatters /> },
      { name: "Our products · realism, comfort, confidence", node: <ERebrandB_Products /> },
      { name: "Launch offer · 50% inline", node: <ERebrandOfferInline /> },
      { name: "Testimonials · 3 customer quotes", node: <ERebrandTestimonials title="What customers have shared with us." /> },
      { name: "Closing founder note + final CTA", node: <ERebrandB_ClosingNote /> },
      { name: "Footer", node: <RebrandFooter /> },
    ]} />
  </EmailFrame>
);

// =============================================================================
// VARIANT C · BOLD LAUNCH / CONVERSION-FOCUSED
// =============================================================================

const ERebrandC_Hero = () => (
  <div className="hsc-card" style={{ padding: 0, overflow: "hidden", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)", position: "relative" }}>
    <div style={{ position: "relative", aspectRatio: "16 / 11" }}>
      <HscPhoto src={HSC_PHOTOS.profileBw.src} alt="" ratio={undefined}
        style={{ position: "absolute", inset: 0, borderRadius: 0 }}
        position="center 25%" vignette={false}
        overlay="linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.92) 100%)"
      />
      <div style={{ position: "absolute", inset: 0, padding: "44px 36px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.95 0.025 85)", marginBottom: 14 }}>The new Hair Solutions Co. is live</div>
        <p style={{ margin: 0, fontSize: 80, lineHeight: 0.92, letterSpacing: "-0.04em", fontWeight: 800, color: "oklch(0.99 0.002 250)", textTransform: "uppercase" }}>
          New look.<br/>Same mission.
        </p>
        <p style={{ margin: "22px auto 22px", fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.85)", maxWidth: "52ch" }}>
          Hair Solutions Co. has relaunched with a sharper website, clearer product guidance, and a limited-time offer: 50% off your first system.
        </p>
        <div>
          <a href="https://www.hairsolutions.co" style={{ display: "inline-block", padding: "14px 26px", background: "oklch(0.95 0.025 85)", color: "oklch(0.14 0.004 60)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Shop the launch offer</a>
        </div>
      </div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", borderBottom: "1px solid rgba(255,255,255,0.10)", background: "oklch(0.14 0.004 60)", overflow: "hidden" }}>
      <img
        src="assets/email-marquee-strip.png"
        srcSet="assets/email-marquee-strip.png 1x, assets/email-marquee-strip-2x.png 2x"
        alt="Same craft — New look — 100,000+ men"
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </div>
  </div>
);

const ERebrandC_Opening = () => (
  <div className="hsc-card" style={{ padding: "36px 40px" }}>
    <Eyebrow>The launch</Eyebrow>
    <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 18px", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>
      Hair Solutions Co. has officially relaunched.
    </h2>
    <p style={{ margin: "0 0 18px", fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "62ch" }}>
      The new website is live, and it was built to make one thing easier: helping men find a natural-looking hair system without confusion, pressure, or guesswork. Because the problem was never just hair loss. The problem was the uncertainty around what to do next.
    </p>
    <div style={{ padding: "20px 24px", background: "var(--bg)", borderRadius: 12, fontSize: 14, lineHeight: 1.9, color: "var(--ink)", fontWeight: 500, maxWidth: "60ch" }}>
      <div>Which system should you choose?</div>
      <div>What will look natural?</div>
      <div>How long will it last?</div>
      <div>What kind of maintenance does it require?</div>
      <div>Will it fit your lifestyle?</div>
      <div>Will it actually feel like you?</div>
    </div>
    <p style={{ margin: "18px 0 0", fontSize: 14, lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: "62ch" }}>
      The new Hair Solutions Co. experience was designed to answer those questions more clearly.
    </p>
  </div>
);

const ERebrandC_WhatsNew = () => {
  const items = [
    ["A cleaner, more premium website",  "We redesigned the entire online experience so it feels more modern, more discreet, and easier to use."],
    ["Better product guidance",          "You can now understand your options more clearly, compare systems more easily, and choose with more confidence."],
    ["More education before you buy",    "We are making the process less intimidating by giving you clearer explanations around base types, realism, comfort, maintenance, and first-time expectations."],
    ["A stronger focus on real-life results", "Our systems are presented around how they actually perform in daily life — not just how they look in perfect photos."],
    ["A limited launch offer",           "For a short time, first-time customers can receive 50% off their first system."],
  ];
  return (
    <div className="hsc-card" style={{ padding: "36px 40px" }}>
      <Eyebrow>What's new</Eyebrow>
      <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 22px", fontSize: 30, fontWeight: 400, letterSpacing: "-0.02em" }}>Five things we changed.</h2>
      <div>
        {items.map(([t, d], i) => (
          <div key={t} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 16, padding: "16px 0", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 700, color: "var(--ink-muted)", letterSpacing: "0.12em", paddingTop: 4 }}>0{i + 1}</div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>{t}</p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ERebrandC_BuiltFor = () => (
  <div className="hsc-card hsc-dark" style={{ padding: "48px 40px", background: "oklch(0.14 0.004 60)", color: "oklch(0.99 0.002 250)" }}>
    <Eyebrow style={{ color: "oklch(0.95 0.025 85)" }}>Built for men who want a real solution</Eyebrow>
    <h2 style={{ fontFamily: "var(--f-serif)", margin: "16px 0 22px", fontSize: 36, fontWeight: 400, letterSpacing: "-0.02em", color: "oklch(0.99 0.002 250)", lineHeight: 1.05, maxWidth: "20ch" }}>
      Hair systems have changed.
    </h2>
    <p style={{ margin: "0 0 22px", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.82)", maxWidth: "58ch" }}>
      The old stereotypes no longer reflect what is possible today. A well-chosen, properly fitted system can look natural, feel comfortable, and become part of your everyday routine without drawing attention. That is the standard Hair Solutions Co. is built around.
    </p>
    <div style={{ display: "grid", gap: 10, marginBottom: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.78)" }}>
      <div>Not dramatic transformations that feel unrealistic.</div>
      <div>Not confusing product pages that assume you already know everything.</div>
      <div>Not cheap solutions that create more problems later.</div>
      <div style={{ marginTop: 8, color: "oklch(0.99 0.002 250)", fontWeight: 600 }}>Just a clearer path toward a result that helps you feel more confident again.</div>
    </div>
  </div>
);

const ERebrandC_Founder = () => (
  <div className="hsc-card" style={{ padding: "36px 40px" }}>
    <Eyebrow>A word from the founder</Eyebrow>
    <h2 style={{ margin: "12px 0 18px", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>Guidance, not just products.</h2>
    <ERichText paragraphs={[
      "When we looked at the old experience, we realized something important. The website was showing products, but it was not doing enough to guide the person behind the purchase.",
      "And in this industry, guidance matters.",
      "A man considering his first hair system is often carrying years of frustration, doubt, and hesitation. He does not need exaggerated promises. He needs clarity. He needs honest information. He needs a brand that treats the decision with respect.",
      "That is why we rebuilt Hair Solutions Co. The new website is more than a rebrand. It is a better foundation for how we want to serve customers going forward.",
    ]} />
    <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
      {["More education.","More transparency.","More confidence.","A better first step."].map(s => (
        <div key={s} style={{ padding: "12px 14px", background: "var(--bg)", borderRadius: 10, fontSize: 13, fontWeight: 600, textAlign: "center" }}>{s}</div>
      ))}
    </div>
    <p style={{ margin: "20px 0 0", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>— Daniel Park · Founder</p>
  </div>
);

const ERebrandC_Products = () => (
  <div className="hsc-card" style={{ padding: "36px 32px" }}>
    <Eyebrow>Our hair systems</Eyebrow>
    <h2 style={{ fontFamily: "var(--f-serif)", margin: "12px 0 8px", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>Designed for daily life.</h2>
    <p style={{ margin: "0 0 22px", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: "62ch" }}>
      Our systems are designed for men who want a natural-looking, wearable, and confidence-restoring solution to hair loss.
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {[
        [HSC_PHOTOS.hairlineMacro.src, "Natural hairlines",       "Selected to create a realistic front hairline that blends naturally and avoids the heavy, artificial look people often fear."],
        [HSC_PHOTOS.heroPlaid.src,     "Comfortable bases",       "Options designed for different priorities, including realism, breathability, durability, and ease of maintenance."],
        [HSC_PHOTOS.pinstripe.src,     "Everyday wear",           "Built for men who want to go through daily life with more confidence — at work, socially, in photos, and in the mirror."],
        [HSC_PHOTOS.transformation.src,"First-time friendly",     "If this is your first system, the new website helps you understand which option may be the easiest and most practical place to start."],
      ].map(([src, t, d]) => (
        <div key={t} style={{ display: "grid", gridTemplateColumns: "112px 1fr", gap: 14, padding: "14px", background: "oklch(0.955 0.002 250)", borderRadius: 14 }}>
          <div style={{ aspectRatio: "1", overflow: "hidden", borderRadius: 10 }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ alignSelf: "center" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em" }}>{t}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, lineHeight: 1.55, color: "var(--ink-soft)" }}>{d}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ERebrandC_FinalCta = () => (
  <div className="hsc-card hsc-dark" style={{ padding: "56px 40px", textAlign: "center", background: "oklch(0.14 0.004 60)" }}>
    <Eyebrow style={{ color: "oklch(0.95 0.025 85)" }}>The next chapter is here</Eyebrow>
    <h2 style={{ margin: "16px auto 18px", fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", color: "oklch(0.99 0.002 250)", lineHeight: 1.0, maxWidth: "22ch", textTransform: "uppercase" }}>
      The new Hair Solutions Co. is live.
    </h2>
    <p style={{ margin: "0 auto 26px", fontSize: 14, color: "rgba(255,255,255,0.78)", maxWidth: "52ch", lineHeight: 1.65 }}>
      Explore the new website, learn more about your options, and take advantage of the limited launch offer while it is available.
    </p>
    <a href="https://www.hairsolutions.co" style={{ display: "inline-block", padding: "14px 28px", background: "oklch(0.95 0.025 85)", color: "oklch(0.14 0.004 60)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Visit hairsolutions.co</a>
  </div>
);

const Email_Rebrand_C = ({ direction = "refined" }) => (
  <EmailFrame direction={direction}>
    <AnnotatedStack items={[
      { name: "Top stripe · cream variant", node: <RebrandStripe tone="cream" text="Hair Solutions Co. has relaunched · May 15, 2026" /> },
      { name: "Header · dark wordmark + nav", node: <RebrandHeader tone="dark" /> },
      { name: "Hero · 'New look. Same mission.' + marquee", node: <ERebrandC_Hero /> },
      { name: "Opening · questions block", node: <ERebrandC_Opening /> },
      { name: "What's new · 5 reasons", node: <ERebrandC_WhatsNew /> },
      { name: "Built for men who want a real solution", node: <ERebrandC_BuiltFor /> },
      { name: "Word from the Founder · 4 pillars", node: <ERebrandC_Founder /> },
      { name: "Our hair systems · 4-card grid", node: <ERebrandC_Products /> },
      { name: "Limited launch offer · 50% (cream)", node: <ERebrandOffer ctaLabel="Claim 50% off" /> },
      { name: "Customer results · 3 testimonials", node: <ERebrandTestimonials eyebrow="Customer results" title="Real men. Real results." /> },
      { name: "Final CTA · 'visit hairsolutions.co'", node: <ERebrandC_FinalCta /> },
      { name: "Footer", node: <RebrandFooter tagline="Natural-looking hair systems for men who want clarity, confidence, and a better way forward." /> },
    ]} />
  </EmailFrame>
);

// ─── REGISTRY ──────────────────────────────────────────────────────────────

const REBRAND_EMAILS = [
  { id: "rebrand-a", label: "A · Premium rebrand announcement",
    height: 5800, Component: Email_Rebrand_A,
    angle: "Premium editorial reveal. Confident, story-led, photography forward.",
    subject: "A new era for Hair Solutions Co.",
    preheader: "A more refined website, clearer guidance, upgraded education, and a special launch offer for your first system.",
  },
  { id: "rebrand-b", label: "B · Personal founder letter",
    height: 5800, Component: Email_Rebrand_B,
    angle: "Personal founder letter. Quieter, story-first, emotional resonance.",
    subject: "I wanted to personally explain why we changed.",
    preheader: "This is more than a new website. It is a better way to help men choose their first hair system with confidence.",
  },
  { id: "rebrand-c", label: "C · Bold launch · conversion-focused",
    height: 5800, Component: Email_Rebrand_C,
    angle: "Direct sales-led angle. Bold uppercase hero, marquee, offer-first structure.",
    subject: "Hair Solutions Co. just relaunched — and your first system is 50% off.",
    preheader: "We rebuilt the website, refined the experience, and launched a limited offer for first-time customers.",
  },
];

Object.assign(window, {
  Email_Rebrand_A, Email_Rebrand_B, Email_Rebrand_C,
  REBRAND_EMAILS,
});
