import { useEffect, useState } from "react";
import { LANGS, useLanguage, type Lang } from "@/lib/i18n";

// Asset URLs from CDN
const ASSETS = {
  logo: "/assets/brave_society_logo.png",
  heroVideo: "/assets/ref_miami_skyline.jpg",
  yachtNight: "/assets/ref_yacht_miami_night.jpg",
  dinnerCandle: "/assets/ref_dinner_candle.jpg",
  winecellar: "https://assets.cdn.filesafe.space/dkM0aNpySiIFf3uusFTa/media/6a567397f1f33d94433358d2.png",
  ironman: "https://assets.cdn.filesafe.space/dkM0aNpySiIFf3uusFTa/media/6a542870180dde3f86913597.jpeg",
  premiumExperiences: "/assets/premium_experiences.png",
  businessHub: "/assets/pillar_business_hub.jpg",
  infrastructure: "/assets/pillar_infrastructure.jpg",
  founderEduardo: "/assets/founder_eduardo.jpg",
  founderHewerton: "/assets/founder_hewerton.png",
};

// Founder names (not translated)
const FOUNDER_NAMES = ["Eduardo Alaska", "Hewerton Scheidegger"];
const FOUNDER_IMAGES = [ASSETS.founderEduardo, ASSETS.founderHewerton];

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Language switcher
function LangSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label="Language"
    >
      {LANGS.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span
              className="mx-1"
              style={{ color: "rgba(200,155,69,0.35)", fontSize: "11px" }}
            >
              |
            </span>
          )}
          <button
            onClick={() => setLang(code as Lang)}
            className="eyebrow transition-colors duration-300"
            style={{
              color: lang === code ? "#C89B45" : "#8A7B5E",
              fontWeight: lang === code ? 700 : 400,
            }}
            aria-pressed={lang === code}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}

// Navigation
function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks: [string, string][] = [
    ["about", t.nav.about],
    ["pillars", t.nav.pillars],
    ["founders", t.nav.founders],
    ["membership", t.nav.membership],
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(5,7,11,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,155,69,0.15)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={ASSETS.logo}
            alt="Brave Society"
            className="w-10 h-10 object-contain"
          />
          <span
            className="font-display font-semibold text-base tracking-widest hidden sm:block"
            style={{ color: "#F4E8D0", letterSpacing: "0.15em" }}
          >
            BRAVE SOCIETY
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="eyebrow transition-colors duration-300"
              style={{ color: "#D8C7A1" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#C89B45")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#D8C7A1")
              }
            >
              {label}
            </button>
          ))}
          <LangSwitcher />
          <button
            onClick={() => scrollTo("apply")}
            className="btn-gold text-xs"
          >
            {t.nav.apply}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4">
          <LangSwitcher />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                backgroundColor: "#C89B45",
                transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none",
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                backgroundColor: "#C89B45",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                backgroundColor: "#C89B45",
                transform: menuOpen
                  ? "rotate(-45deg) translate(3px,-3px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden py-6 px-6 flex flex-col gap-5"
          style={{
            backgroundColor: "rgba(5,7,11,0.98)",
            borderTop: "1px solid rgba(200,155,69,0.15)",
          }}
        >
          {[...navLinks, ["apply", t.nav.applyNow] as [string, string]].map(
            ([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="eyebrow text-left"
                style={{ color: "#D8C7A1" }}
              >
                {label}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const { t } = useLanguage();
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#05070B" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.heroVideo})` }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,7,11,0.7) 0%, rgba(5,7,11,0.55) 50%, rgba(5,7,11,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={ASSETS.logo}
            alt="Brave Society"
            className="w-20 h-20 object-contain"
          />
        </div>

        <p className="eyebrow mb-4" style={{ color: "#C89B45" }}>
          {t.hero.eyebrow}
        </p>

        <h1
          className="font-display font-bold leading-none mb-6"
          style={{
            color: "#F4E8D0",
            fontSize: "clamp(52px, 8vw, 96px)",
            lineHeight: 1.0,
          }}
        >
          {t.hero.line1}
          <br />
          {t.hero.line2}
          <br />
          {t.hero.line3}
        </h1>

        <p
          className="font-body text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
          style={{ color: "rgba(244,232,208,0.75)" }}
        >
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#apply" className="btn-gold-filled">
            {t.hero.applyBtn}
          </a>
          <a href="#about" className="btn-gold">
            {t.hero.learnMore}
          </a>
        </div>

        <p
          className="mt-6 font-body text-xs"
          style={{ color: "rgba(200,155,69,0.6)", letterSpacing: "0.1em" }}
        >
          {t.hero.note}
        </p>
      </div>

    </section>
  );
}

// Thesis Section
function ThesisSection() {
  const { t } = useLanguage();
  return (
    <section
      id="about"
      className="py-12 md:py-16"
      style={{ backgroundColor: "#05070B" }}
    >
      <div className="container max-w-3xl mx-auto text-center">
        <div className="reveal">
          <p className="eyebrow mb-8">{t.thesis.eyebrow}</p>
          <div className="hairline w-16 mx-auto mb-8" />
        </div>

        <blockquote
          className="reveal reveal-delay-1 font-display font-light leading-relaxed"
          style={{
            color: "#F4E8D0",
            fontSize: "clamp(24px, 3.5vw, 38px)",
            lineHeight: 1.5,
          }}
        >
          {t.thesis.quotePre}
          <em style={{ color: "#C89B45" }}>{t.thesis.quoteEm}</em>
          {t.thesis.quotePost}
        </blockquote>
      </div>
    </section>
  );
}

// Value Pillars Section
function PillarsSection() {
  const { t } = useLanguage();
  const pillarImages = [
    ASSETS.winecellar,
    ASSETS.businessHub,
    ASSETS.premiumExperiences,
    ASSETS.ironman,
    ASSETS.infrastructure,
  ];
  // crop focus per image; the ironman shot needs the atleta framed, not the crowd's backs
  const pillarFocus = ["", "", "", "center 25%", ""];

  return (
    <section
      id="pillars"
      className="py-12 md:py-16"
      style={{ backgroundColor: "#07111F" }}
    >
      <div className="container">
        <div className="pillars-head flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
          <div>
            <p className="eyebrow mb-4">{t.pillars.eyebrow}</p>
            <h2
              className="font-display font-bold"
              style={{
                color: "#F4E8D0",
                fontSize: "clamp(36px, 5vw, 60px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {t.pillars.titleLine1}
              <br />
              {t.pillars.titleLine2}
            </h2>
          </div>
          <div className="hairline w-full md:w-px md:h-24 md:self-stretch opacity-30" />
        </div>

        <div className="pillars-list">
          {t.pillars.items.map((pillar, i) => (
            <article
              key={i}
              className={`pillar-row${i % 2 === 1 ? " reverse" : ""}`}
            >
              <div className="pillar-media">
                <img
                  src={pillarImages[i]}
                  alt={pillar.title}
                  loading="lazy"
                  style={pillarFocus[i] ? { objectPosition: pillarFocus[i] } : undefined}
                />
                <span className="pillar-frame" aria-hidden="true" />
              </div>
              <div className="pillar-copy">
                <h3 className="pillar-title">{pillar.title}</h3>
                <span className="pillar-rule" aria-hidden="true" />
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Programming Section
function ProgrammingSection() {
  const { t } = useLanguage();
  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: "#05070B" }}
    >
      {/* Background image with heavy overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${ASSETS.yachtNight})` }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(5,7,11,0.8)" }} />

      <div className="container relative z-10">
        <div className="reveal text-center mb-10">
          <p className="eyebrow mb-4">{t.programming.eyebrow}</p>
          <h2
            className="font-display font-bold"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.1,
            }}
          >
            {t.programming.titleLine1}
            <br />
            {t.programming.titleLine2}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border: "1px solid rgba(200,155,69,0.12)" }}>
          {t.programming.events.map((event, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} p-8 md:p-10`}
              style={{ borderBottom: "1px solid rgba(200,155,69,0.12)", borderRight: i % 2 === 0 ? "1px solid rgba(200,155,69,0.12)" : "none" }}
            >
              <p className="eyebrow mb-4" style={{ color: "#C89B45" }}>
                {event.freq}
              </p>
              <h3
                className="font-display font-semibold mb-3"
                style={{ color: "#F4E8D0", fontSize: "clamp(20px, 2vw, 26px)" }}
              >
                {event.title}
              </h3>
              <p
                className="font-body leading-relaxed"
                style={{ color: "rgba(244,232,208,0.6)", fontSize: "15px" }}
              >
                {event.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Code of Conduct Section
function CodeSection() {
  const { t } = useLanguage();
  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: "#07111F" }}
    >
      {/* Watermark seal */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0.04 }}
      >
        <div
          className="w-96 h-96 rounded-full border-8 flex items-center justify-center"
          style={{ borderColor: "#C89B45" }}
        >
          <div
            className="w-72 h-72 rounded-full border-4 flex items-center justify-center"
            style={{ borderColor: "#C89B45" }}
          >
            <span
              className="font-display font-bold"
              style={{ color: "#C89B45", fontSize: "80px" }}
            >
              BS
            </span>
          </div>
        </div>
      </div>

      <div className="container relative z-10 max-w-3xl mx-auto text-center">
        <div className="reveal">
          <p className="eyebrow mb-4">{t.code.eyebrow}</p>
          <h2
            className="font-display font-bold mb-4"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              lineHeight: 1.1,
            }}
          >
            {t.code.titleLine1}
            <br />
            {t.code.titleLine2}
          </h2>
          <div className="hairline w-16 mx-auto mb-4" />
        </div>

        <div className="space-y-6">
          {t.code.items.map((code, i) => (
            <p
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} font-display font-light`}
              style={{
                color: i >= 5 ? "#C89B45" : "rgba(244,232,208,0.85)",
                fontSize: "clamp(18px, 2.2vw, 24px)",
                fontStyle: "italic",
              }}
            >
              {code}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// Founders Section
function FoundersSection() {
  const { t } = useLanguage();
  const founders = t.founders.items.map((item, i) => ({
    ...item,
    name: FOUNDER_NAMES[i],
    img: FOUNDER_IMAGES[i],
  }));

  return (
    <section
      id="founders"
      className="py-12 md:py-16"
      style={{ backgroundColor: "#05070B" }}
    >
      <div className="container">
        <div className="reveal text-center mb-10">
          <p className="eyebrow mb-4">{t.founders.eyebrow}</p>
          <h2
            className="font-display font-bold"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.1,
            }}
          >
            {t.founders.titleLine1}
            <br />
            {t.founders.titleLine2}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 max-w-3xl mx-auto">
          {founders.map((founder, i) => (
            <div
              key={founder.name}
              className={`reveal reveal-delay-${i + 1} flex flex-col`}
            >
              {/* Photo */}
              <div
                className="relative overflow-hidden mb-6"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={founder.img}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
                {/* Gold border on hover */}
                <div
                  className="absolute inset-0 border-2 transition-opacity duration-500 opacity-0"
                  style={{ borderColor: "#C89B45" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0";
                  }}
                />
                {/* Bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(5,7,11,0.8) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Info */}
              <div>
                <p className="eyebrow mb-2" style={{ color: "#C89B45" }}>
                  {founder.title}
                </p>
                <h3
                  className="font-display font-semibold mb-1"
                  style={{ color: "#F4E8D0", fontSize: "clamp(22px, 2vw, 26px)" }}
                >
                  {founder.name}
                </h3>
                <p
                  className="font-body text-sm mb-4"
                  style={{ color: "#C89B45", fontStyle: "italic" }}
                >
                  {founder.role}
                </p>
                <div className="hairline mb-4" style={{ opacity: 0.2 }} />
                <p
                  className="font-body leading-relaxed text-sm whitespace-pre-line"
                  style={{ color: "rgba(244,232,208,0.6)" }}
                >
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Membership Section
function MembershipSection() {
  const { t } = useLanguage();
  return (
    <section
      id="membership"
      className="py-12 md:py-16"
      style={{ backgroundColor: "#07111F" }}
    >
      <div className="container max-w-4xl mx-auto">
        <div className="reveal text-center mb-10">
          <p className="eyebrow mb-4">{t.membership.eyebrow}</p>
          <h2
            className="font-display font-bold mb-4"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.1,
            }}
          >
            {t.membership.title}
          </h2>
          <p
            className="font-display font-light text-xl md:text-2xl"
            style={{ color: "rgba(200,155,69,0.8)", fontStyle: "italic" }}
          >
            {t.membership.quote}
          </p>
        </div>

        {/* Conditions */}
        <div
          className="reveal reveal-delay-2 p-8 md:p-10"
          style={{ border: "1px solid rgba(200,155,69,0.12)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {t.membership.conditions.map(({ val, label }) => (
              <div key={val}>
                <p
                  className="font-display font-bold mb-2"
                  style={{ color: "#C89B45", fontSize: "40px" }}
                >
                  {val}
                </p>
                <p
                  className="eyebrow"
                  style={{
                    color: "rgba(244,232,208,0.5)",
                    whiteSpace: "pre-line",
                    lineHeight: 1.8,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-3 text-center mt-10">
          <p
            className="font-body text-sm mb-6"
            style={{ color: "rgba(244,232,208,0.4)" }}
          >
            {t.membership.disclaimer}
          </p>
          <a href="#apply" className="btn-gold-filled">
            {t.membership.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

// Application Form Section
function ApplySection() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    social: "",
    referral: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nome: form.name,
      email: form.email,
      telefone: form.phone,
      regiao: "",
      profissao: form.company,
      redes_sociais: form.social ? [form.social] : [],
      comentario: form.referral ? `Indicado por: ${form.referral}` : "",
      tags: ["lead", "site"],
    };

    try {
      await fetch(
        "https://contact-blossom-39.lovable.app/api/public/contatos/ck_8dc7a9ed_8dc7a9edb2a6a6dbcb7b7141e8f41ae82ffa0b55333dca75b156023b64d17fab",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(200,155,69,0.2)",
    color: "#F4E8D0",
    padding: "14px 16px",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  return (
    <section
      id="apply"
      className="py-12 md:py-16"
      style={{ backgroundColor: "#05070B" }}
    >
      <div className="container max-w-2xl mx-auto">
        <div className="reveal text-center mb-10">
          <p className="eyebrow mb-4">{t.apply.eyebrow}</p>
          <h2
            className="font-display font-bold mb-4"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.1,
            }}
          >
            {t.apply.titleLine1}
            <br />
            {t.apply.titleLine2}
          </h2>
          <div className="hairline w-16 mx-auto mt-6" />
        </div>

        {submitted ? (
          <div
            className="reveal text-center py-16 px-8"
            style={{ border: "1px solid rgba(200,155,69,0.2)" }}
          >
            <div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-6"
              style={{ borderColor: "#C89B45" }}
            >
              <span style={{ color: "#C89B45", fontSize: "24px" }}>✓</span>
            </div>
            <h3
              className="font-display font-semibold mb-3"
              style={{ color: "#F4E8D0", fontSize: "28px" }}
            >
              {t.apply.successTitle}
            </h3>
            <p
              className="font-body"
              style={{ color: "rgba(244,232,208,0.6)" }}
            >
              {t.apply.successMsg}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reveal reveal-delay-1 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="eyebrow block mb-2" style={{ color: "#C89B45" }}>
                  {t.apply.nameLabel}
                </label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(200,155,69,0.6)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(200,155,69,0.2)")
                  }
                  placeholder={t.apply.namePlaceholder}
                />
              </div>
              <div>
                <label className="eyebrow block mb-2" style={{ color: "#C89B45" }}>
                  {t.apply.emailLabel}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(200,155,69,0.6)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(200,155,69,0.2)")
                  }
                  placeholder={t.apply.emailPlaceholder}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="eyebrow block mb-2" style={{ color: "#C89B45" }}>
                  {t.apply.phoneLabel}
                </label>
                <input
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(200,155,69,0.6)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(200,155,69,0.2)")
                  }
                  placeholder={t.apply.phonePlaceholder}
                />
              </div>
              <div>
                <label className="eyebrow block mb-2" style={{ color: "#C89B45" }}>
                  {t.apply.companyLabel}
                </label>
                <input
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(200,155,69,0.6)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(200,155,69,0.2)")
                  }
                  placeholder={t.apply.companyPlaceholder}
                />
              </div>
            </div>

            <div>
              <label className="eyebrow block mb-2" style={{ color: "#C89B45" }}>
                {t.apply.socialLabel}
              </label>
              <input
                name="social"
                required
                value={form.social}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(200,155,69,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(200,155,69,0.2)")
                }
                placeholder={t.apply.socialPlaceholder}
              />
            </div>

            <div>
              <label className="eyebrow block mb-2" style={{ color: "rgba(200,155,69,0.6)" }}>
                {t.apply.referralLabel}
              </label>
              <input
                name="referral"
                value={form.referral}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(200,155,69,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(200,155,69,0.2)")
                }
                placeholder={t.apply.referralPlaceholder}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-gold-filled w-full"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? t.apply.submitting : t.apply.submit}
              </button>
            </div>

            <p
              className="text-center font-body text-xs pt-2"
              style={{ color: "rgba(244,232,208,0.3)" }}
            >
              {t.apply.disclaimer}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const { t } = useLanguage();
  return (
    <footer
      className="py-10"
      style={{
        backgroundColor: "#05070B",
        borderTop: "1px solid rgba(200,155,69,0.12)",
      }}
    >
      <div className="container text-center">
        {/* Seal */}
        <div className="flex justify-center mb-6">
          <img
            src={ASSETS.logo}
            alt="Brave Society"
            className="w-14 h-14 object-contain"
          />
        </div>

        <p
          className="font-display font-semibold tracking-widest mb-2"
          style={{ color: "#F4E8D0", fontSize: "16px", letterSpacing: "0.2em" }}
        >
          BRAVE SOCIETY
        </p>
        <p className="eyebrow mb-8" style={{ color: "rgba(200,155,69,0.5)" }}>
          {t.footer.tagline}
        </p>

        <div className="hairline w-24 mx-auto mb-8" style={{ opacity: 0.2 }} />

        <p
          className="font-body text-xs"
          style={{ color: "rgba(244,232,208,0.25)" }}
        >
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}

// Main Home
export default function Home() {
  useScrollReveal();

  return (
    <div style={{ backgroundColor: "#05070B" }}>
      <Nav />
      <HeroSection />
      <ThesisSection />
      <PillarsSection />
      <ProgrammingSection />
      <CodeSection />
      <FoundersSection />
      <MembershipSection />
      <ApplySection />
      <Footer />
    </div>
  );
}
