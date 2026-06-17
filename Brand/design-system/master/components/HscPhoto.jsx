// HscPhoto.jsx — image wrapper for real photography.
// Same interface as PhotoPlaceholder (ratio, subject, style, label).
// If `src` is provided, renders an <img> with the brand image treatment
// (rounded corners, vignette overlay, object-cover). If `src` is missing
// or fails to load, falls back to PhotoPlaceholder so designs never break.

const HscPhoto = ({
  src,
  alt = "",
  ratio,
  subject = "portrait",
  position = "center",
  style,
  vignette = true,
  overlay,
  children,
  label,
}) => {
  const [failed, setFailed] = React.useState(false);
  if (!src || failed) {
    return <PhotoPlaceholder ratio={ratio} subject={subject} label={label} style={style} />;
  }
  return (
    <div className="hsc-image" style={{
      aspectRatio: ratio, position: "relative", background: "oklch(0.14 0.004 60)",
      ...style,
    }}>
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        style={{
          width: "100%", height: "100%",
          display: "block", objectFit: "cover",
          objectPosition: position,
        }}
      />
      {vignette && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 100% 80% at 50% 40%, transparent 55%, rgba(0,0,0,0.25) 100%)",
        }}/>
      )}
      {overlay && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: overlay }}/>
      )}
      {children}
      {label && (
        <div style={{
          position: "absolute", left: 16, bottom: 14,
          fontFamily: "var(--f-mono)",
          fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "oklch(0.99 0.002 250)", textShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}>{label}</div>
      )}
    </div>
  );
};

// Catalog of all chosen brand photos with their intended uses.
const HSC_PHOTOS = {
  heroPlaid:     { src: "assets/photos/portrait-hero-plaid.jpg",         use: "Variant A hero · confident editorial", subject: "portrait" },
  silverFox:     { src: "assets/photos/portrait-founder-silverfox.png",  use: "Founder block · loyalty hero",         subject: "portrait" },
  matureBw:      { src: "assets/photos/portrait-mature-bw.png",          use: "Variant B hero · personal letter",     subject: "portrait" },
  profileBw:     { src: "assets/photos/portrait-profile-bw.png",         use: "Variant C hero · bold typographic",    subject: "portrait" },
  confidentBw:   { src: "assets/photos/portrait-confident-bw.png",       use: "Editorial card · About hero",          subject: "portrait" },
  pinstripe:     { src: "assets/photos/portrait-pinstripe.jpg",          use: "Editorial product / lifestyle",        subject: "portrait" },
  hairlineMacro: { src: "assets/photos/macro-hairline-detail.jpg",       use: "'The craft' macro · spec proof",       subject: "product" },
  marcus:        { src: "assets/photos/testimonial-marcus.jpg",          use: "Testimonial · Marcus T. (denim)",      subject: "portrait" },
  ben:           { src: "assets/photos/testimonial-ben.jpg",             use: "Testimonial · Ben F. (sweater)",       subject: "portrait" },
  raphael:       { src: "assets/photos/testimonial-raphael.jpg",         use: "Testimonial · Raphael B. (navy)",      subject: "portrait" },
  workshopStyle: { src: "assets/photos/workshop-styling.jpg",            use: "Reel cover · 'same hands' BTS",        subject: "portrait" },
  workshopSpray: { src: "assets/photos/workshop-spray.jpg",              use: "Story · behind the scenes",            subject: "portrait" },
  transformation:{ src: "assets/photos/transformation-before-after.jpg", use: "Before / after editorial",             subject: "transformation" },
  founder:       { src: "assets/photos/founder-portrait.webp",           use: "Founder workshop scene",               subject: "portrait" },
};

Object.assign(window, { HscPhoto, HSC_PHOTOS });
