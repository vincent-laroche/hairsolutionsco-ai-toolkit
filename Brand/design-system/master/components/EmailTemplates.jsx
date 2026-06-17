// EmailTemplates.jsx
// Ten full top-to-bottom marketing emails for Hair Solutions Co.
// Each renders as an EmailFrame containing an AnnotatedStack of section blocks.
// AnnotatedStack labels each section on the right edge with its name.

// All templates render at 640px email width; artboards account for the +220px
// annotation gutter, so use width >= 900.

const EmailTemplate = ({ direction = "refined", items, gap = 16 }) => (
  <EmailFrame direction={direction}>
    <AnnotatedStack items={items} gap={gap} />
  </EmailFrame>
);

// 01 · ANNOUNCEMENT
const Email_Announcement = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Announcement bar", node: <EAnnouncementStripe text="Now open · Toronto fitting room" /> },
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Hero · full-bleed image + overlay", node:
      <EHeroFullBleed
        overlay
        ratio="5 / 4"
        eyebrow="Announcement · May 2026"
        title="The Toronto fitting room opens May 12."
        body="A private, by-appointment room where we mould, fit and adjust your system in person. 30-minute sessions, walking distance from Yonge–Dundas."
        ctaLabel="Book a session"
      />
    },
    { name: "Personal note · founder", node:
      <EPersonalNote greeting="Marcus,">
        Three years in, this is the first physical room we've opened. The reason is simple — measuring on Zoom only gets you 80% of the way to a perfect fit. The other 20% is hands and chairlight. If you're in the city in May, come sit for thirty minutes and we'll show you the difference.
      </EPersonalNote>
    },
    { name: "Three pillars · what changes", node:
      <EThreeColPillars items={[
        ["01", "In-person moulding", "Tape-and-cling cast made on you in 8 minutes. No more phone-photo measurements."],
        ["02", "Colour-match in light", "Match against your real ambient light, not your camera's white balance."],
        ["03", "Wear-test the base", "Try French Lace, Skin, and Mono Top on before you commit."],
      ]} />
    },
    { name: "Image strip · the space", node:
      <div className="hsc-card" style={{ padding: 0 }}>
        <PhotoPlaceholder ratio="2 / 1" subject="portrait" />
      </div>
    },
    { name: "Address + hours card", node:
      <div className="hsc-card" style={{ padding: "28px 40px" }}>
        <Eyebrow>Where to find us</Eyebrow>
        <p style={{ margin: "10px 0 4px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>10 Dundas Street East · Suite 504</p>
        <p className="hsc-small" style={{ margin: "0 0 14px" }}>Toronto · ON · M5B 2G9</p>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)" }}>Tuesday – Saturday · 10am – 6pm · By appointment only</p>
      </div>
    },
    { name: "Primary CTA card", node:
      <div className="hsc-card" style={{ padding: "32px 40px", textAlign: "center" }}>
        <Btn variant="primary">Book a 30-minute fitting</Btn>
        <p className="hsc-small" style={{ margin: "14px 0 0" }}>No payment required at booking. Reschedule any time.</p>
      </div>
    },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 02 · WELCOME EMAIL
const Email_Welcome = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Hero · welcome", node:
      <EHeroFullBleed
        ratio="4 / 5"
        eyebrow="Welcome · Member 04284"
        title="Welcome to Hair Solutions Co."
        body="You've signed up at the right time — Spring 26 systems start shipping in two weeks. Here's what to know before your first order."
        ctaLabel="Start my consult"
        subject="portrait"
      />
    },
    { name: "Personal note · founder signature", node:
      <EPersonalNote greeting="Hi Marcus —" signoff="— Daniel Park · founder, Hair Solutions Co.">
        Before anything else, thank you. The men who join us are mostly here because someone they trust told them we'd take their hair seriously. We will. This email is the only one I write myself — every other note from us is a system update, an order status, or a recap.
      </EPersonalNote>
    },
    { name: "Three pillars · what to know", node:
      <EThreeColPillars items={[
        ["01", "Every system is custom", "We do not stock caps. Yours is cut to a mould of your scalp."],
        ["02", "10-day build window", "From confirmed mould to your door. We ship one system at a time."],
        ["03", "Three-month warranty", "If the fit drifts in the first 90 days, we re-cut at no charge."],
      ]} />
    },
    { name: "Numbered steps · what to expect", node:
      <ENumberedSteps eyebrow="Your first 30 days" items={[
        ["Start your consult", "Answer 12 questions about your hair, your goals, and your timeline. ~6 minutes."],
        ["Receive your mould kit", "A tape-and-cling kit arrives in 4–5 business days. Make your mould at home, or at our Toronto room."],
        ["We cut and ventilate", "Your system enters production. You'll get a photo of the hairline before it ships."],
        ["First wear", "A fitting guide arrives 48 hours before your system. Most clients are wearing within 10 days of starting."],
      ]} />
    },
    { name: "Single product card · most-picked base", node:
      <ESingleProductCard
        title="Most-picked: French Lace"
        sub="Invisible hairline · 3–4 month lifespan · best for first-timers"
        ctaLabel="Explore French Lace"
      />
    },
    { name: "Testimonial", node: <EmailTestimonial direction={direction} /> },
    { name: "Dark breaker · CTA", node:
      <EmailDarkBreaker direction={direction} />
    },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 03 · ABANDONED CART
const Email_AbandonedCart = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Hero · text only", node:
      <EHeroTextOnly
        eyebrow="You left these behind"
        title="Your bag is still warm."
        body="We saved the build spec you were configuring. Pick up where you left off — no need to re-enter measurements."
        ctaLabel="Return to checkout"
        secondary="Adjust the spec"
      />
    },
    { name: "Cart items list", node: <ECartItems /> },
    { name: "Price summary + CTA", node: <EPriceSummary /> },
    { name: "Reassurance row · 3 pillars", node: <EReassurance /> },
    { name: "FAQ · two quick answers", node: <EFaqMini /> },
    { name: "Testimonial", node: <EmailTestimonial direction={direction} /> },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 04 · NEWSLETTER
const Email_Newsletter = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Masthead", node: <EMasthead issue="Issue 14" date="April 28, 2026" /> },
    { name: "Featured story · lead piece", node:
      <EFeaturedStory
        kicker="Lead story · 6 min read"
        title="Why your hairline matters more than your density."
        body="The single biggest realism cue, and the one most stock systems get wrong. Our master builder explains why the front 12 millimetres are 80% of the result."
      />
    },
    { name: "Two-story row · short reads", node:
      <ETwoStoryRow items={[
        ["Care kit · 4 min", "How often should you re-tape?", "A behavioural rule, not a calendar one. Here's what to watch for."],
        ["Process · 5 min", "Inside a colour match.", "What we look at in your ambient light photos — and what we ignore."],
      ]} />
    },
    { name: "Pull quote", node:
      <EPullQuote attribution="Daniel Park · founder">
        Realism is a discipline of restraint. Most of the work is what you choose not to do.
      </EPullQuote>
    },
    { name: "Two-story row · brand notes", node:
      <ETwoStoryRow items={[
        ["Notes · 2 min", "Toronto fitting room opens May 12.", "By-appointment moulding and colour-match in real light."],
        ["Product · 3 min", "New: cool-ash graphite ratio.", "For men with cool-toned natural hair. Now available on French Lace."],
      ]} />
    },
    { name: "Sign-off · subscribe to journey", node:
      <div className="hsc-card" style={{ padding: "28px 40px", textAlign: "center" }}>
        <Eyebrow>Forwarded by a friend?</Eyebrow>
        <p style={{ margin: "10px 0 14px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Get the next one in your inbox.</p>
        <Btn variant="primary">Subscribe</Btn>
      </div>
    },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 05 · PRODUCT RECOMMENDATION
const Email_ProductRecommendation = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Hero · text only", node:
      <EHeroTextOnly
        eyebrow="Picked for you · Spring 26"
        title="Based on your last system, three to consider."
        body="You ordered a French Lace at 115% density in February. These are the bases most likely to feel like an upgrade — not a sidestep."
        ctaLabel="See the picks"
      />
    },
    { name: "Personal stats · what we used", node:
      <EPersonalStats rows={[
        ["Last base", "French Lace"],
        ["Density", "115%"],
        ["Match", "#2 graphite"],
      ]} />
    },
    { name: "Product grid · 2x2 picks", node: <EmailProductGrid /> },
    { name: "Expert pick · single product card", node:
      <ESingleProductCard
        title="Our pick: French Lace · 120%"
        sub="Same hairline you already love · 5% more density · still under 4 oz."
        ctaLabel="View this base"
      />
    },
    { name: "Split media · care kit upsell", node: <EmailSplitMedia direction={direction} /> },
    { name: "Testimonial", node: <EmailTestimonial direction={direction} /> },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 06 · PRODUCT UPDATE
const Email_ProductUpdate = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Hero · text only · changelog", node:
      <EHeroTextOnly
        eyebrow="Changelog · v 2.4"
        title="The hairline got finer. Here's the proof."
        body="A six-month re-engineering pass on knotting density and adhesive contact. The same base, sharper at every point that matters."
        ctaLabel="See the side-by-side"
        secondary="Read the full notes"
      />
    },
    { name: "Changelog · what's new list", node: <EChangelog /> },
    { name: "Before/after · visual comparison", node: <EBeforeAfter /> },
    { name: "Spec table · by the numbers", node: <ESpecTable /> },
    { name: "Single product card · the upgraded base", node:
      <ESingleProductCard
        title="French Lace · v 2.4"
        sub="Same fit · finer knotting · two new graphite ratios"
        ctaLabel="Order the new build"
      />
    },
    { name: "Dark breaker · members credit", node:
      <EHeroDark
        eyebrow="Members"
        title="Existing systems get a free re-knot."
        body="If you bought a French Lace in the last six months, send it back and we'll re-knot the hairline to v 2.4 specs. Free turnaround, same week."
        ctaLabel="Submit for re-knot"
      />
    },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 07 · SALE / PROMOTION
const Email_SalePromo = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Announcement bar · sale stripe", node:
      <EAnnouncementStripe text="Members week · 15% off care kits · ends Sunday" />
    },
    { name: "Header · dark logo bar", node: <EHeaderLogoBar tone="dark" /> },
    { name: "Hero · dark sale headline", node:
      <EHeroDark
        eyebrow="Members week · April"
        title="−15% on every care kit."
        body="One week. No subscription required. The discount stacks with the auto-ship credit if you're already a refill member."
        ctaLabel="Shop care kits"
        secondary="See what's included"
        footnote="Excludes new system builds. One use per account."
      />
    },
    { name: "Countdown row", node: <ECountdown /> },
    { name: "Product grid · the sale items", node: <EmailProductGrid /> },
    { name: "Code box · promo code", node: <ECodeBox code="CAREKIT15" desc="Auto-applies at checkout · expires Sunday May 4, 23:59 ET" /> },
    { name: "Reassurance · returns + warranty", node: <EReassurance items={[
      ["Free", "Returns within 30 days"],
      ["3-month", "Care-kit warranty"],
      ["48-hour", "Refund processing"],
    ]} /> },
    { name: "Terms · fine print", node:
      <ETerms>
        Offer valid April 28 – May 4, 2026 (23:59 ET). One redemption per account. Excludes custom system builds, gift cards, and items already on promotion. Hair Solutions Co. reserves the right to amend or withdraw the offer.
      </ETerms>
    },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 08 · RE-ENGAGEMENT
const Email_ReEngagement = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Hero · text only · we miss you", node:
      <EHeroTextOnly
        eyebrow="It's been a while"
        title="Your last system was three months ago."
        body="Most French Lace bases start asking for a refresh around month four. We've kept your spec on file — if you want a re-cut, it's two clicks."
        ctaLabel="Rebuild from my spec"
      />
    },
    { name: "Personal stats · the file we have", node:
      <EPersonalStats rows={[
        ["First system", "Mar 2024"],
        ["Total systems", "3"],
        ["Days since last order", "97"],
      ]} />
    },
    { name: "Single product card · the most likely reorder", node:
      <ESingleProductCard
        title="French Lace · 115% · #2 graphite"
        sub="Your exact last spec · ready to re-cut · 10-day build"
        ctaLabel="Reorder this build"
      />
    },
    { name: "Incentive card · first refill on us", node:
      <EIncentive
        title="Come back this month — your refill kit is on us."
        body="Reorder by May 15 and we'll include a free care-kit refill ($84 value). Already attached to your account; no code required."
        ctaLabel="Reorder & claim"
      />
    },
    { name: "Survey card · why did you leave?", node:
      <div className="hsc-card" style={{ padding: "28px 40px" }}>
        <Eyebrow>Or — tell us what's off</Eyebrow>
        <p style={{ margin: "10px 0 14px", fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>Three questions, two minutes. We read every one.</p>
        <Btn variant="secondary">Open the survey</Btn>
      </div>
    },
    { name: "Unsubscribe nudge", node:
      <div style={{ padding: "16px 40px 0", textAlign: "center", fontSize: 12, color: "var(--ink-muted)" }}>
        If you'd rather not hear from us, <a href="#" style={{ color: "inherit", textDecoration: "underline" }}>unsubscribe here</a>. No hard feelings.
      </div>
    },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 09 · ORDER CONFIRMATION
const Email_OrderConfirmation = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Hero · status confirmed", node:
      <EHeroStatus
        status="Order confirmed"
        title="We've started cutting your system."
        body="Order #HSC-10428 is in the queue. Your master builder is Daniel Park. We'll email you a tracking link the day it ships, usually within 10 business days."
        meta={[["Order","#HSC-10428"],["Est. delivery","May 14 – 17"],["Total","$1,924"]]}
      />
    },
    { name: "Order summary table", node: <EmailOrderSummary /> },
    { name: "Shipping timeline · status track", node: <EShippingTimeline /> },
    { name: "Numbered steps · what's next", node:
      <ENumberedSteps eyebrow="What happens next" items={[
        ["We cut and ventilate", "Production takes 8–10 business days. We'll send a photo of the hairline before it ships."],
        ["Fitting guide arrives", "An email walkthrough 48 hours before delivery. Tape, scissors, and chairlight."],
        ["First wear", "A 20-minute first-wear video call is included. Pick a slot when you receive your shipping notice."],
      ]} />
    },
    { name: "Single product card · care kit upsell", node:
      <ESingleProductCard
        title="Care kit · refill"
        sub="Adhesive, tape, brush · ships with your system"
        price="$84 · add to order"
        ctaLabel="Add care kit"
      />
    },
    { name: "FAQ · quick answers", node: <EFaqMini /> },
    { name: "Need help row", node:
      <div className="hsc-card" style={{ padding: "24px 40px", textAlign: "center" }}>
        <Eyebrow>Need to change something?</Eyebrow>
        <p style={{ margin: "10px 0 14px", fontSize: 14, color: "var(--ink-soft)" }}>Reply to this email within 48 hours. After that, the system is in production and changes cost a re-cut.</p>
        <Btn variant="secondary">Email support</Btn>
      </div>
    },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// 10 · PERSONALIZED EMAIL (recap / annual)
const Email_Personalized = ({ direction = "refined" }) => (
  <EmailTemplate direction={direction} items={[
    { name: "Header · logo + nav", node: <EHeaderLogoBar /> },
    { name: "Hero · personal recap", node:
      <EmailHero
        direction={direction}
        eyebrow="Recap · 2026 · Marcus"
        title={direction === "experimental" ? "Three years in." : "Three years, well-worn."}
        body="You've ordered three systems with us, the last one a French Lace at 115% density. Here's what we've learned about your fit — and what we'd recommend next."
        ctaLabel="Open my full recap"
      />
    },
    { name: "Personal note · intro", node:
      <EmailIntroCopy>
        Hi Marcus, this is the short version of your file with us. The data isn't shared anywhere — it's just so the next system fits even better than the last.
      </EmailIntroCopy>
    },
    { name: "Account snapshot · key stats", node: <EmailSnapshot /> },
    { name: "Personal stats · annual breakdown", node:
      <EPersonalStats rows={[
        ["Systems worn", "3"],
        ["Wear days · 2025", "317"],
        ["Avg lifespan", "14 weeks"],
      ]} />
    },
    { name: "Personalized recommendation card", node: <EmailRecommendation direction={direction} /> },
    { name: "Dark breaker · loyalty offer", node: <EmailDarkBreaker direction={direction} /> },
    { name: "Testimonial · client + you", node: <EmailTestimonial direction={direction} /> },
    { name: "Split media · care kit refill", node: <EmailSplitMedia direction={direction} /> },
    { name: "Footer", node: <EmailFooter /> },
  ]} />
);

// Registry for the canvas
const EMAIL_TEMPLATES = [
  { id: "announcement",  label: "01 · Announcement",          height: 2920, Component: Email_Announcement },
  { id: "welcome",       label: "02 · Welcome",               height: 3320, Component: Email_Welcome },
  { id: "cart",          label: "03 · Abandoned Cart",        height: 2480, Component: Email_AbandonedCart },
  { id: "newsletter",    label: "04 · Newsletter",            height: 3400, Component: Email_Newsletter },
  { id: "recommend",     label: "05 · Product Recommendation",height: 3120, Component: Email_ProductRecommendation },
  { id: "update",        label: "06 · Product Update",        height: 3320, Component: Email_ProductUpdate },
  { id: "sale",          label: "07 · Sale / Promotion",      height: 3360, Component: Email_SalePromo },
  { id: "reengage",      label: "08 · Re-Engagement",         height: 2720, Component: Email_ReEngagement },
  { id: "order",         label: "09 · Order Confirmation",    height: 3320, Component: Email_OrderConfirmation },
  { id: "personalized",  label: "10 · Personalized Email",    height: 3680, Component: Email_Personalized },
];

Object.assign(window, {
  Email_Announcement, Email_Welcome, Email_AbandonedCart,
  Email_Newsletter, Email_ProductRecommendation, Email_ProductUpdate,
  Email_SalePromo, Email_ReEngagement, Email_OrderConfirmation,
  Email_Personalized,
  EMAIL_TEMPLATES,
});
