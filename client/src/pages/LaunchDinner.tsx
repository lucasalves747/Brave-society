import { useEffect, useState } from "react";

// Asset URLs
const ASSETS = {
  logo: "/assets/brave_society_logo.png",
  hero: "/assets/ref_dinner_candle.jpg",
  cellar: "/assets/ref_wine_cellar.jpg",
};

// Checkout destination
const CHECKOUT_URL = "https://compra.bravesocietyusa.com/carrinho";

// CRM endpoint (same as the main site application form)
const CRM_URL =
  "https://contact-blossom-39.lovable.app/api/public/contatos/ck_8dc7a9ed_8dc7a9edb2a6a6dbcb7b7141e8f41ae82ffa0b55333dca75b156023b64d17fab";

// Smooth-scroll to a section by id
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// Scroll to the reservation form
function scrollToForm() {
  scrollToId("reservar");
}

// Event details
const EVENT = {
  title: "Jantar de Lançamento",
  date: "Terça-feira, 28 de Julho",
  time: "7:30 PM",
  venue: "Adega Gaúcha Deerfield",
  address: "240 S Federal Hwy, Deerfield Beach",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Adega+Gaucha+240+S+Federal+Hwy+Deerfield+Beach",
};

// Scroll reveal hook (matches Home)
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

const NAV_LINKS = [
  { label: "O Evento", id: "detalhes" },
  { label: "A Experiência", id: "experiencia" },
  { label: "Reservar", id: "reservar" },
];

// Fixed header — announcement strip + navigation
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0" style={{ zIndex: 50 }}>
      {/* Announcement strip — collapses on scroll */}
      <div
        className="overflow-hidden"
        style={{
          backgroundColor: "#C89B45",
          maxHeight: scrolled ? "0px" : "60px",
          transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          className="container flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-3 py-3 text-center"
          style={{ color: "#05070B" }}
        >
          <span
            className="font-body whitespace-nowrap"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            28 de Julho de 2026
          </span>
          <span aria-hidden="true" style={{ opacity: 0.55 }}>
            ✦
          </span>
          <span
            className="font-body whitespace-nowrap"
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            7:30 PM
          </span>
          <span
            className="hidden sm:inline"
            aria-hidden="true"
            style={{ opacity: 0.55 }}
          >
            ✦
          </span>
          <span
            className="hidden sm:inline font-body whitespace-nowrap"
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Adega Gaúcha · Deerfield
          </span>
        </div>
      </div>

      {/* Nav row */}
      <div
        style={{
          backgroundColor: scrolled ? "rgba(5,7,11,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${
            scrolled ? "rgba(200,155,69,0.14)" : "transparent"
          }`,
          transition:
            "background-color 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        <div className="container flex items-center justify-between gap-2 py-4">
          <a
            href="#top"
            className="flex items-center gap-2 sm:gap-3 min-w-0"
            style={{ textDecoration: "none" }}
          >
            <img
              src={ASSETS.logo}
              alt="Brave Society"
              className="object-contain shrink-0 w-8 h-8 sm:w-9 sm:h-9"
            />
            <span
              className="font-display font-semibold whitespace-nowrap"
              style={{
                color: "#F4E8D0",
                fontSize: "clamp(13px, 3.6vw, 18px)",
                letterSpacing: "clamp(0.1em, 0.5vw, 0.24em)",
                lineHeight: 1,
              }}
            >
              BRAVE SOCIETY
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToId(link.id)}
                className="font-body ld-underline"
                style={{
                  color: "rgba(244,232,208,0.82)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  background: "transparent",
                  border: "none",
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={scrollToForm}
            className="btn-gold-filled shrink-0 whitespace-nowrap"
            style={{ padding: "9px 14px", fontSize: "11px" }}
          >
            <span className="md:hidden">Reservar</span>
            <span className="hidden md:inline">Garantir Presença</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// Ornamental seal divider — hairlines drawing outward from the mark
function Seal() {
  return (
    <div className="ld-seal my-2">
      <span />
      <img
        src={ASSETS.logo}
        alt=""
        aria-hidden="true"
        className="w-6 h-6 object-contain opacity-70"
      />
      <span />
    </div>
  );
}

// Hero
function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-start md:items-center overflow-hidden"
      style={{ backgroundColor: "#05070B", minHeight: "100svh" }}
    >
      {/* Background image — biased to the right so the copy reads on the left */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${ASSETS.hero})`,
          backgroundPosition: "right center",
          transform: "scale(1.03)",
        }}
      />
      {/* Horizontal wash — deep noir on the left, image breathing on the right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,7,11,0.97) 0%, rgba(5,7,11,0.9) 38%, rgba(5,7,11,0.55) 68%, rgba(5,7,11,0.4) 100%)",
        }}
      />
      {/* Bottom fade to ground the meta row and blend into the page */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "40%",
          background:
            "linear-gradient(to bottom, rgba(5,7,11,0) 0%, rgba(5,7,11,0.85) 100%)",
        }}
      />

      <div
        className="container relative z-10 w-full"
        style={{ paddingTop: "clamp(120px, 18vw, 140px)", paddingBottom: "48px" }}
      >
        <div className="text-left" style={{ maxWidth: "40rem" }}>
          {/* Eyebrow with a leading gold rule */}
          <div
            className="ld-rise flex items-center gap-4 mb-7"
            style={{ ["--ld-delay" as string]: "0.1s" }}
          >
            <span
              className="hairline"
              style={{ width: "2.5rem", opacity: 0.85 }}
            />
            <span
              className="eyebrow"
              style={{ color: "#C89B45", letterSpacing: "0.32em" }}
            >
              Confiança · Relacionamento · Legado
            </span>
          </div>

          <h1
            className="ld-rise font-display font-semibold mb-8"
            style={{
              ["--ld-delay" as string]: "0.22s",
              color: "#F4E8D0",
              fontSize: "clamp(40px, 6.4vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              textWrap: "balance",
            }}
          >
            O início de uma sociedade
            <br />
            <span style={{ color: "#C89B45" }}>
              que não estará aberta para todos.
            </span>
          </h1>

          <div
            className="ld-rise mb-9"
            style={{ ["--ld-delay" as string]: "0.36s", maxWidth: "34rem" }}
          >
            <p
              className="font-body leading-relaxed mb-4"
              style={{ color: "rgba(244,232,208,0.78)", fontSize: "16px" }}
            >
              Nesta noite, os primeiros membros fundadores serão convidados a
              fazer parte de uma comunidade formada por empresários que acreditam
              que grandes resultados são construídos sobre confiança,
              relacionamentos sólidos e propósito.
            </p>
            <p
              className="font-body leading-relaxed"
              style={{ color: "rgba(244,232,208,0.78)", fontSize: "16px" }}
            >
              Mais do que um jantar, este será o primeiro capítulo de uma
              sociedade criada para conectar líderes, gerar oportunidades e
              construir um legado que transcende os negócios.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="ld-rise flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            style={{ ["--ld-delay" as string]: "0.5s" }}
          >
            <button onClick={scrollToForm} className="btn-gold-filled">
              Garantir Presença
            </button>
            <button onClick={() => scrollToId("detalhes")} className="btn-gold">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Event details — editorial hairline rows
function Details() {
  const items = [
    { label: "Data", value: EVENT.date },
    { label: "Horário", value: EVENT.time },
    { label: "Local", value: EVENT.venue },
    { label: "Endereço", value: EVENT.address },
  ];

  return (
    <section
      id="detalhes"
      className="py-12 md:py-16"
      style={{ backgroundColor: "#07111F", scrollMarginTop: "72px" }}
    >
      <div className="container max-w-3xl mx-auto">
        <div className="reveal text-center mb-14">
          <Seal />
          <p className="eyebrow mb-4 mt-6">O Evento</p>
          <h2
            className="font-display font-bold"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(34px, 5vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              textWrap: "balance",
            }}
          >
            Detalhes da Noite
          </h2>
        </div>

        <div className="reveal reveal-delay-1">
          {items.map((item) => (
            <div key={item.label} className="ld-detail-row">
              <p
                className="eyebrow"
                style={{ color: "#C89B45", paddingTop: "0.35rem" }}
              >
                {item.label}
              </p>
              <p
                className="font-display font-semibold"
                style={{
                  color: "#F4E8D0",
                  fontSize: "clamp(21px, 2.4vw, 28px)",
                  lineHeight: 1.25,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal reveal-delay-2 text-center mt-12">
          <a
            href={EVENT.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Ver no Mapa
          </a>
        </div>
      </div>
    </section>
  );
}

// About the venue / experience
function Experience() {
  return (
    <section
      id="experiencia"
      className="py-12 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: "#05070B", scrollMarginTop: "72px" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${ASSETS.cellar})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,7,11,0.9) 0%, rgba(5,7,11,0.78) 50%, rgba(5,7,11,0.94) 100%)",
        }}
      />

      <div className="container relative z-10 max-w-3xl mx-auto text-center">
        <div className="reveal">
          <p className="eyebrow mb-8">A Experiência</p>
        </div>

        <blockquote
          className="reveal reveal-delay-1 font-display font-light mb-10"
          style={{
            color: "#F4E8D0",
            fontSize: "clamp(26px, 4vw, 40px)",
            lineHeight: 1.42,
            textWrap: "balance",
          }}
        >
          Uma noite de alta gastronomia na{" "}
          <em style={{ color: "#C89B45" }}>Adega Gaúcha</em>, onde os fundadores
          se sentam à mesma mesa e o legado começa a ser escrito.
        </blockquote>

        <div
          className="reveal reveal-delay-2 hairline mx-auto mb-10"
          style={{ width: "3rem", height: "2px", opacity: 0.7 }}
        />

        <p
          className="reveal reveal-delay-2 font-body leading-relaxed mx-auto"
          style={{
            color: "rgba(244,232,208,0.62)",
            fontSize: "16px",
            maxWidth: "44ch",
          }}
        >
          Jantar assinado, seleção de vinhos e o encontro que marca o início da
          Brave Society. Um ambiente reservado para quem entende que confiança
          precede oportunidade.
        </p>
      </div>
    </section>
  );
}

const FIELDS = [
  {
    name: "name",
    label: "Nome",
    type: "text",
    placeholder: "Seu nome completo",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "seu@email.com",
    required: true,
  },
  {
    name: "phone",
    label: "Telefone",
    type: "tel",
    placeholder: "(000) 000-0000",
    required: true,
  },
  {
    name: "region",
    label: "Região",
    type: "text",
    placeholder: "Cidade - Estado",
    required: true,
  },
  {
    name: "profession",
    label: "Profissão",
    type: "select",
    placeholder: "Selecione sua área de atuação",
    required: true,
    options: [
      "Limpeza residencial e comercial",
      "Construção civil",
      "Pintura",
      "Flooring / pisos",
      "Roofing / telhados",
      "Landscaping / jardinagem",
      "Moving / mudanças",
      "Delivery e transporte",
      "Restaurantes e alimentação",
      "Salões de beleza e estética",
      "Real Estate",
      "Property management",
      "Airbnb / vacation rental",
      "Serviços automotivos",
      "Contabilidade e tax services",
      "Seguros",
      "Consultoria migratória e documental",
      "Marketing digital",
      "Eventos e entretenimento",
      "E-commerce",
    ],
  },
  {
    name: "social",
    label: "Redes Sociais",
    type: "text",
    placeholder: "@seuinstagram, linkedin.com/in/voce",
    required: false,
  },
] as const;

// Reservation form — captures the lead, then sends to checkout
function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    profession: "",
    social: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      regiao: form.region,
      profissao: form.profession,
      redes_sociais: form.social
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      comentario: "Jantar de Lançamento — Adega Gaúcha Deerfield · 28/07",
      tags: ["braves"],
    };

    try {
      await fetch(CRM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Erro ao enviar reserva:", err);
    }

    // Continue to checkout regardless of CRM result, passing the lead data
    const params = new URLSearchParams({
      full_name: form.name,
      email: form.email,
      phone: form.phone.replace(/\D/g, ""),
    });
    window.location.href = `${CHECKOUT_URL}?${params.toString()}`;
  };

  return (
    <section
      id="reservar"
      className="py-12 md:py-16"
      style={{ backgroundColor: "#07111F", scrollMarginTop: "72px" }}
    >
      <div className="container max-w-xl mx-auto text-center">
        <div className="reveal mb-10">
          <p className="eyebrow mb-6">Reserve o seu lugar</p>
          <h2
            className="font-display font-bold mb-6"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              textWrap: "balance",
            }}
          >
            Sua presença
            <br />
            é o convite.
          </h2>
          <p
            className="font-body leading-relaxed mx-auto mb-9"
            style={{ color: "rgba(244,232,208,0.62)", maxWidth: "30rem" }}
          >
            Preencha seus dados para garantir seu lugar no jantar de lançamento.
            Lugares limitados.
          </p>

          <div
            className="inline-flex items-stretch"
            style={{
              border: "1px solid rgba(200,155,69,0.35)",
              backgroundColor: "rgba(5,7,11,0.4)",
            }}
          >
            <div className="flex flex-col justify-center text-left px-5 sm:px-7 py-5">
              <span
                className="eyebrow"
                style={{ color: "#C89B45", marginBottom: "4px" }}
              >
                Contribuição
              </span>
              <span
                className="font-body"
                style={{ color: "rgba(244,232,208,0.6)", fontSize: "13px" }}
              >
                por pessoa
              </span>
            </div>
            <div
              className="hairline self-stretch"
              style={{ width: "1px", height: "auto", opacity: 0.35 }}
            />
            <div className="flex items-start px-6 sm:px-8 py-4">
              <span
                className="font-display"
                style={{
                  color: "#C89B45",
                  fontSize: "clamp(18px, 2.4vw, 24px)",
                  lineHeight: 1,
                  marginTop: "clamp(6px, 1.2vw, 10px)",
                  marginRight: "3px",
                }}
              >
                $
              </span>
              <span
                className="font-display font-bold"
                style={{
                  color: "#F4E8D0",
                  fontSize: "clamp(48px, 7vw, 68px)",
                  lineHeight: 1,
                }}
              >
                60
              </span>
            </div>
          </div>

          <p
            className="font-body mt-5"
            style={{
              color: "rgba(244,232,208,0.5)",
              fontSize: "13px",
              letterSpacing: "0.02em",
            }}
          >
            Jantar assinado e seleção de vinhos inclusos.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="reveal reveal-delay-1 space-y-5 text-left"
        >
          {FIELDS.map((field) => (
            <div key={field.name}>
              <label className="eyebrow block mb-2" style={{ color: "#C89B45" }}>
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="ld-field"
                  style={{
                    color: form[field.name]
                      ? "#F4E8D0"
                      : "rgba(244,232,208,0.42)",
                  }}
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="ld-field"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold-filled w-full"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Enviando..." : "Garantir Presença"}
            </button>
          </div>

          <p
            className="text-center font-body text-xs pt-2"
            style={{ color: "rgba(244,232,208,0.35)" }}
          >
            Ao continuar, você será direcionado para finalizar a reserva.
          </p>
        </form>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer
      className="py-10"
      style={{
        backgroundColor: "#05070B",
        borderTop: "1px solid rgba(200,155,69,0.12)",
      }}
    >
      <div className="container text-center">
        <div className="flex justify-center mb-5">
          <img
            src={ASSETS.logo}
            alt="Brave Society"
            className="w-12 h-12 object-contain"
          />
        </div>
        <p
          className="font-display font-semibold mb-3"
          style={{ color: "#F4E8D0", fontSize: "16px", letterSpacing: "0.22em" }}
        >
          BRAVE SOCIETY
        </p>
        <p className="eyebrow" style={{ color: "rgba(200,155,69,0.5)" }}>
          {EVENT.venue} · {EVENT.date}
        </p>
      </div>
    </footer>
  );
}

export default function LaunchDinner() {
  useScrollReveal();

  return (
    <div style={{ backgroundColor: "#05070B" }}>
      <Header />
      <Hero />
      <Details />
      <Experience />
      <ReservationForm />
      <Footer />
    </div>
  );
}
