import { useEffect } from "react";

// Asset URLs
const ASSETS = {
  logo: "/assets/brave_society_logo.png",
  hero: "/assets/ref_dinner_candle.jpg",
  cellar: "/assets/ref_wine_cellar.jpg",
};

// Checkout destination
const CHECKOUT_URL = "https://compra.bravesocietyusa.com/carrinho";

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

// Small laurel / seal divider
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <span className="hairline w-12" style={{ opacity: 0.35 }} />
      <img
        src={ASSETS.logo}
        alt=""
        aria-hidden="true"
        className="w-6 h-6 object-contain opacity-70"
      />
      <span className="hairline w-12" style={{ opacity: 0.35 }} />
    </div>
  );
}

// Hero
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#05070B" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.hero})` }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,7,11,0.82) 0%, rgba(5,7,11,0.68) 45%, rgba(5,7,11,0.92) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-24">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={ASSETS.logo}
            alt="Brave Society"
            className="w-20 h-20 object-contain"
          />
        </div>

        <p className="eyebrow mb-6" style={{ color: "#C89B45" }}>
          {EVENT.title}
        </p>

        <h1
          className="font-display font-bold leading-none mb-6"
          style={{
            color: "#F4E8D0",
            fontSize: "clamp(46px, 9vw, 92px)",
            lineHeight: 0.98,
            letterSpacing: "0.02em",
          }}
        >
          BRAVE
          <br />
          SOCIETY
        </h1>

        <p
          className="font-body text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ color: "rgba(244,232,208,0.78)" }}
        >
          A noite em que a sociedade nasce. Um jantar exclusivo para marcar a
          fundação do círculo — brinde, presença e legado.
        </p>

        {/* Date badge */}
        <div
          className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-6 py-4 mb-10"
          style={{ border: "1px solid rgba(200,155,69,0.35)" }}
        >
          <span
            className="font-display font-semibold"
            style={{ color: "#F4E8D0", fontSize: "clamp(18px, 2.4vw, 24px)" }}
          >
            {EVENT.date}
          </span>
          <span
            className="hidden sm:block"
            style={{ color: "rgba(200,155,69,0.5)" }}
          >
            |
          </span>
          <span
            className="font-display font-semibold"
            style={{ color: "#C89B45", fontSize: "clamp(18px, 2.4vw, 24px)" }}
          >
            {EVENT.time}
          </span>
        </div>

        <div className="flex justify-center">
          <a href={CHECKOUT_URL} className="btn-gold-filled">
            Garantir Presença
          </a>
        </div>

        <p
          className="mt-6 font-body text-xs"
          style={{ color: "rgba(200,155,69,0.6)", letterSpacing: "0.1em" }}
        >
          Lugares limitados · Confirmação mediante reserva
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="hairline w-px h-12" style={{ opacity: 0.5 }} />
      </div>
    </section>
  );
}

// Event details
function Details() {
  const items = [
    { label: "Data", value: EVENT.date },
    { label: "Horário", value: EVENT.time },
    { label: "Local", value: EVENT.venue },
    { label: "Endereço", value: EVENT.address },
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#07111F" }}>
      <div className="container max-w-4xl mx-auto">
        <div className="reveal text-center mb-14">
          <p className="eyebrow mb-4">O Evento</p>
          <h2
            className="font-display font-bold"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(32px, 5vw, 54px)",
              lineHeight: 1.1,
            }}
          >
            Detalhes da Noite
          </h2>
        </div>

        <div
          className="reveal reveal-delay-1 grid grid-cols-1 sm:grid-cols-2 gap-px"
          style={{ border: "1px solid rgba(200,155,69,0.12)" }}
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              className="p-8 md:p-10"
              style={{
                borderBottom: "1px solid rgba(200,155,69,0.12)",
                borderRight:
                  i % 2 === 0 ? "1px solid rgba(200,155,69,0.12)" : "none",
              }}
            >
              <p className="eyebrow mb-3" style={{ color: "#C89B45" }}>
                {item.label}
              </p>
              <p
                className="font-display font-semibold"
                style={{ color: "#F4E8D0", fontSize: "clamp(20px, 2.2vw, 28px)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal reveal-delay-2 text-center mt-10">
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
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#05070B" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${ASSETS.cellar})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5,7,11,0.82)" }}
      />

      <div className="container relative z-10 max-w-3xl mx-auto text-center">
        <div className="reveal">
          <Divider />
          <p className="eyebrow mb-6 mt-6">A Experiência</p>
        </div>

        <blockquote
          className="reveal reveal-delay-1 font-display font-light leading-relaxed mb-10"
          style={{
            color: "#F4E8D0",
            fontSize: "clamp(24px, 3.5vw, 38px)",
            lineHeight: 1.5,
          }}
        >
          Uma noite de alta gastronomia na{" "}
          <em style={{ color: "#C89B45" }}>Adega Gaúcha</em> — onde os fundadores
          se sentam à mesma mesa e o legado começa a ser escrito.
        </blockquote>

        <p
          className="reveal reveal-delay-2 font-body leading-relaxed max-w-xl mx-auto"
          style={{ color: "rgba(244,232,208,0.6)", fontSize: "16px" }}
        >
          Jantar assinado, seleção de vinhos e o encontro que marca o início da
          Brave Society. Um ambiente reservado para quem entende que confiança
          precede oportunidade.
        </p>
      </div>
    </section>
  );
}

// Final CTA
function FinalCta() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#07111F" }}>
      <div className="container max-w-2xl mx-auto text-center">
        <div className="reveal">
          <p className="eyebrow mb-6">Reserve o seu lugar</p>
          <h2
            className="font-display font-bold mb-6"
            style={{
              color: "#F4E8D0",
              fontSize: "clamp(34px, 5vw, 56px)",
              lineHeight: 1.1,
            }}
          >
            Sua presença
            <br />
            é o convite.
          </h2>
          <p
            className="font-body leading-relaxed mb-10 max-w-md mx-auto"
            style={{ color: "rgba(244,232,208,0.6)" }}
          >
            Os lugares para o jantar de lançamento são limitados. Garanta o seu
            e faça parte da noite de fundação.
          </p>
          <a href={CHECKOUT_URL} className="btn-gold-filled">
            Garantir Presença
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer
      className="py-14"
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
          className="font-display font-semibold tracking-widest mb-2"
          style={{ color: "#F4E8D0", fontSize: "15px", letterSpacing: "0.2em" }}
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
      <Hero />
      <Details />
      <Experience />
      <FinalCta />
      <Footer />
    </div>
  );
}
