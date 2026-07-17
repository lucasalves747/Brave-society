import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "pt" | "en" | "es";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

// ---------------------------------------------------------------------------
// Translation dictionaries
// ---------------------------------------------------------------------------

const en = {
  nav: {
    about: "About",
    pillars: "Pillars",
    founders: "Founders",
    membership: "Membership",
    apply: "Apply",
    applyNow: "Apply Now",
  },
  hero: {
    eyebrow: "Miami Private Business Society",
    line1: "Business",
    line2: "Brotherhood",
    line3: "Legacy",
    subtitle:
      "For leaders who have already won financially, but seek a circle where trust precedes opportunity.",
    applyBtn: "Apply for Membership",
    learnMore: "Learn More",
    note: "Invitation-only founding circle · 40 seats in the first phase",
  },
  thesis: {
    eyebrow: "The Thesis",
    quotePre:
      "\"You already have financial freedom. But the top can be an isolated place, full of opportunists. Brave Society was born to answer one question: ",
    quoteEm:
      "who do you sit with at the table when you no longer need to prove anything to anyone?",
    quotePost: "\"",
    stats: [
      { num: "40", label: "Founding Members" },
      { num: "2×", label: "Monthly Gatherings" },
    ],
  },
  pillars: {
    eyebrow: "What We Deliver",
    titleLine1: "The Architecture",
    titleLine2: "of Our Value",
    items: [
      {
        title: "Curation & Trust",
        desc: "Entry by invitation and approval only. We protect the human, ethical, and reputational standard of our society. No exceptions.",
      },
      {
        title: "Business Hub",
        desc: "Closed rounds, Club Deals, and Real Estate co-investment. Business protected from aggressive selling, only aligned partners at the table.",
      },
      {
        title: "Premium Experiences",
        desc: "Private dinners, yacht outings, wine tastings, and exclusive travel. Moments where real bonds are forged outside the corporate environment.",
      },
      {
        title: "Integral Growth",
        desc: "Health, family, presence, and leadership. Physical performance, human development, and a community committed to a life of excellence.",
      },
      {
        title: "Private Infrastructure",
        desc: "Access to meeting rooms and LED-panel presentation spaces in Miami for select gatherings and business sessions.",
      },
    ],
  },
  programming: {
    eyebrow: "Programming",
    titleLine1: "A Calendar Built",
    titleLine2: "for Extraordinary Lives",
    events: [
      {
        freq: "Every 2 months",
        title: "Keynote Summit",
        desc: "A curated speaker event with industry leaders, thought-provoking talks, and structured networking for members and select guests.",
      },
      {
        freq: "Twice a month",
        title: "Member Gatherings",
        desc: "Rotating formats: pocket dinners, yacht outings, wine appreciation evenings, and city experiences that build genuine bonds.",
      },
      {
        freq: "Quarterly",
        title: "Business Rounds",
        desc: "Structured deal-flow sessions, co-investment opportunities in real estate, and accountability circles for business growth.",
      },
      {
        freq: "Ongoing",
        title: "Physical Performance",
        desc: "An environment that inspires discipline, strengthens the body, and turns health into a way of life.",
      },
    ],
  },
  code: {
    eyebrow: "Code of Conduct",
    titleLine1: "Culture is Protected",
    titleLine2: "Before Growth",
    items: [
      "The word carries weight.",
      "Presence matters.",
      "Family is honored.",
      "Transparency is the rule.",
      "Reputation is protected.",
      "Those who enter to exploit, leave.",
      "Those who enter to build, remain.",
    ],
  },
  founders: {
    eyebrow: "The Founders",
    titleLine1: "Who Guarantees",
    titleLine2: "the Door",
    items: [
      {
        title: "Co-Founder",
        role: "Entrepreneur & Business Strategist",
        bio: "26 years in the Americas, Miami resident. Leads three companies in electronics, logistics, and investments. Strategic mentor for entrepreneurs seeking to migrate and build solid operations in the USA.",
      },
      {
        title: "Co-Founder",
        role: "Tax Attorney, Accountant, and Mentor",
        bio: "Author of 1000 Codes of Wisdom, creator of the REI Method, and Ultraman and Ironman athlete.\n\nHe dedicates his life to shaping leaders who thrive with purpose, strengthening businesses, families, relationships, and legacy. Because true success is not measured by a single achievement, but by the harmony among all areas of life.",
      },
    ],
  },
  membership: {
    eyebrow: "Membership",
    title: "Founding Position",
    quote:
      "\"This is not a subscription. It's the chance to found the culture of our circle.\"",
    entryLabel: "Entry Investment",
    entryPrice: "$10,000",
    entryDesc: "One-time founding fee. Confirms commitment and selection.",
    monthlyLabel: "Monthly Membership",
    monthlyPrice: "$1,000",
    monthlyDesc: "Billing begins only from the 4th month.",
    conditions: [
      { val: "40", label: "Founding Members" },
      { val: "12", label: "Months\nMinimum Membership Period" },
      { val: "Admission", label: "Upon Approval" },
    ],
    disclaimer:
      "Each application is reviewed to preserve the community's quality, values, and trust.",
    cta: "Request Your Invitation",
  },
  apply: {
    eyebrow: "Apply",
    titleLine1: "Request Your",
    titleLine2: "Invitation",
    successTitle: "Application Received",
    successMsg:
      "Our committee will review your application and reach out within 5 business days. Welcome to the circle.",
    nameLabel: "Full Name *",
    namePlaceholder: "Your full name",
    emailLabel: "Email *",
    emailPlaceholder: "your@email.com",
    phoneLabel: "Phone / WhatsApp *",
    phonePlaceholder: "+1 (305) 000-0000",
    companyLabel: "Company / Role *",
    companyPlaceholder: "Company / Your role",
    socialLabel: "Instagram *",
    socialPlaceholder: "@yourinstagram",
    referralLabel: "Who Referred You? (optional)",
    referralPlaceholder: "Name of the member who invited you",
    submit: "Submit Application",
    submitting: "Submitting...",
    disclaimer:
      "Your information is kept strictly confidential. All applications are reviewed by the founding committee.",
  },
  footer: {
    tagline: "Miami Private Business Society",
    copyright:
      "© 2026 Brave Society Miami. All rights reserved. · Privacy Policy · Terms of Use",
  },
};

type Dict = typeof en;

const pt: Dict = {
  nav: {
    about: "Sobre",
    pillars: "Pilares",
    founders: "Fundadores",
    membership: "Associação",
    apply: "Candidatar-se",
    applyNow: "Candidatar-se Agora",
  },
  hero: {
    eyebrow: "Sociedade Privada de Negócios de Miami",
    line1: "Negócios",
    line2: "Irmandade",
    line3: "Legado",
    subtitle:
      "Para líderes que já venceram financeiramente, mas buscam um círculo onde a confiança precede a oportunidade.",
    applyBtn: "Candidatar-se à Associação",
    learnMore: "Saiba Mais",
    note: "Círculo fundador apenas por convite · 40 vagas na primeira fase",
  },
  thesis: {
    eyebrow: "A Tese",
    quotePre:
      "\"Você já tem liberdade financeira. Mas o topo pode ser um lugar isolado, cheio de oportunistas. A Brave Society nasceu para responder a uma pergunta: ",
    quoteEm:
      "com quem você se senta à mesa quando não precisa mais provar nada a ninguém?",
    quotePost: "\"",
    stats: [
      { num: "40", label: "Membros Fundadores" },
      { num: "2×", label: "Encontros Mensais" },
    ],
  },
  pillars: {
    eyebrow: "O Que Entregamos",
    titleLine1: "A Arquitetura",
    titleLine2: "do Nosso Valor",
    items: [
      {
        title: "Curadoria & Confiança",
        desc: "Entrada apenas por convite e aprovação. Protegemos o padrão humano, ético e reputacional da nossa sociedade. Sem exceções.",
      },
      {
        title: "Hub de Negócios",
        desc: "Rodadas fechadas, Club Deals e coinvestimento imobiliário. Negócios protegidos da venda agressiva, apenas parceiros alinhados à mesa.",
      },
      {
        title: "Experiências Premium",
        desc: "Jantares privados, passeios de iate, degustações de vinho e viagens exclusivas. Momentos em que laços reais são forjados fora do ambiente corporativo.",
      },
      {
        title: "Crescimento Integral",
        desc: "Saúde, família, presença e liderança. Performance física, desenvolvimento humano e uma comunidade comprometida com uma vida de excelência.",
      },
      {
        title: "Infraestrutura Privada",
        desc: "Acesso a salas de reunião e espaços de apresentação com painéis de LED em Miami para encontros seletos e sessões de negócios.",
      },
    ],
  },
  programming: {
    eyebrow: "Programação",
    titleLine1: "Um Calendário Feito",
    titleLine2: "para Vidas Extraordinárias",
    events: [
      {
        freq: "A cada 2 meses",
        title: "Keynote Summit",
        desc: "Um evento com palestrantes selecionados, líderes do setor, talks provocativas e networking estruturado para membros e convidados seletos.",
      },
      {
        freq: "Duas vezes por mês",
        title: "Encontros de Membros",
        desc: "Formatos rotativos: jantares reservados, passeios de iate, noites de apreciação de vinhos e experiências pela cidade que constroem laços genuínos.",
      },
      {
        freq: "Trimestral",
        title: "Rodadas de Negócios",
        desc: "Sessões estruturadas de deal-flow, oportunidades de coinvestimento imobiliário e círculos de responsabilidade para o crescimento dos negócios.",
      },
      {
        freq: "Contínuo",
        title: "Performance Física",
        desc: "Um ambiente que inspira disciplina, fortalece o corpo e transforma saúde em um estilo de vida.",
      },
    ],
  },
  code: {
    eyebrow: "Código de Conduta",
    titleLine1: "A Cultura é Protegida",
    titleLine2: "Antes do Crescimento",
    items: [
      "A palavra tem peso.",
      "A presença importa.",
      "A família é honrada.",
      "A transparência é regra.",
      "A reputação é protegida.",
      "Quem entra para explorar, sai.",
      "Quem entra para construir, permanece.",
    ],
  },
  founders: {
    eyebrow: "Os Fundadores",
    titleLine1: "Quem Garante",
    titleLine2: "a Porta",
    items: [
      {
        title: "Cofundador",
        role: "Empreendedor & Estrategista de Negócios",
        bio: "26 anos nas Américas, residente em Miami. Lidera três empresas em eletrônicos, logística e investimentos. Mentor estratégico para empreendedores que buscam migrar e construir operações sólidas nos EUA.",
      },
      {
        title: "Cofundador",
        role: "Advogado Tributário, Contador e Mentor",
        bio: "Autor de 1000 Códigos de Sabedoria, criador do Método REI e atleta Ultraman e Ironman.\n\nDedica sua vida a formar líderes que prosperam com propósito, fortalecendo negócios, famílias, relacionamentos e legado. Porque o verdadeiro sucesso não se mede por uma única conquista, mas pela harmonia entre todas as áreas da vida.",
      },
    ],
  },
  membership: {
    eyebrow: "Associação",
    title: "Posição Fundadora",
    quote:
      "\"Isto não é uma assinatura. É a chance de fundar a cultura do nosso círculo.\"",
    entryLabel: "Investimento de Entrada",
    entryPrice: "$10.000",
    entryDesc: "Taxa fundadora única. Confirma o compromisso e a seleção.",
    monthlyLabel: "Mensalidade",
    monthlyPrice: "$1.000",
    monthlyDesc: "A cobrança começa apenas a partir do 4º mês.",
    conditions: [
      { val: "40", label: "Membros Fundadores" },
      { val: "12", label: "Meses\nPeríodo Mínimo de Associação" },
      { val: "Admissão", label: "Mediante Aprovação" },
    ],
    disclaimer:
      "Cada candidatura é analisada para preservar a qualidade, os valores e a confiança da comunidade.",
    cta: "Solicite Seu Convite",
  },
  apply: {
    eyebrow: "Candidatura",
    titleLine1: "Solicite Seu",
    titleLine2: "Convite",
    successTitle: "Candidatura Recebida",
    successMsg:
      "Nosso comitê analisará sua candidatura e entrará em contato em até 5 dias úteis. Bem-vindo ao círculo.",
    nameLabel: "Nome Completo *",
    namePlaceholder: "Seu nome completo",
    emailLabel: "E-mail *",
    emailPlaceholder: "seu@email.com",
    phoneLabel: "Telefone / WhatsApp *",
    phonePlaceholder: "+55 (11) 00000-0000",
    companyLabel: "Empresa / Cargo *",
    companyPlaceholder: "Empresa / Seu cargo",
    socialLabel: "Instagram *",
    socialPlaceholder: "@seuinstagram",
    referralLabel: "Quem Indicou Você? (opcional)",
    referralPlaceholder: "Nome do membro que convidou você",
    submit: "Enviar Candidatura",
    submitting: "Enviando...",
    disclaimer:
      "Suas informações são mantidas em absoluto sigilo. Todas as candidaturas são avaliadas pelo comitê fundador.",
  },
  footer: {
    tagline: "Sociedade Privada de Negócios de Miami",
    copyright:
      "© 2026 Brave Society Miami. Todos os direitos reservados. · Política de Privacidade · Termos de Uso",
  },
};

const es: Dict = {
  nav: {
    about: "Nosotros",
    pillars: "Pilares",
    founders: "Fundadores",
    membership: "Membresía",
    apply: "Postular",
    applyNow: "Postular Ahora",
  },
  hero: {
    eyebrow: "Sociedad Privada de Negocios de Miami",
    line1: "Negocios",
    line2: "Hermandad",
    line3: "Legado",
    subtitle:
      "Para líderes que ya han triunfado financieramente, pero buscan un círculo donde la confianza precede a la oportunidad.",
    applyBtn: "Postular a la Membresía",
    learnMore: "Saber Más",
    note: "Círculo fundador solo por invitación · 40 lugares en la primera fase",
  },
  thesis: {
    eyebrow: "La Tesis",
    quotePre:
      "\"Ya tienes libertad financiera. Pero la cima puede ser un lugar solitario, lleno de oportunistas. Brave Society nació para responder una pregunta: ",
    quoteEm:
      "¿con quién te sientas a la mesa cuando ya no necesitas demostrarle nada a nadie?",
    quotePost: "\"",
    stats: [
      { num: "40", label: "Miembros Fundadores" },
      { num: "2×", label: "Encuentros Mensuales" },
    ],
  },
  pillars: {
    eyebrow: "Lo Que Ofrecemos",
    titleLine1: "La Arquitectura",
    titleLine2: "de Nuestro Valor",
    items: [
      {
        title: "Curaduría & Confianza",
        desc: "Ingreso solo por invitación y aprobación. Protegemos el estándar humano, ético y reputacional de nuestra sociedad. Sin excepciones.",
      },
      {
        title: "Hub de Negocios",
        desc: "Rondas cerradas, Club Deals y coinversión inmobiliaria. Negocios protegidos de la venta agresiva, solo socios alineados en la mesa.",
      },
      {
        title: "Experiencias Premium",
        desc: "Cenas privadas, salidas en yate, catas de vino y viajes exclusivos. Momentos donde se forjan vínculos reales fuera del entorno corporativo.",
      },
      {
        title: "Crecimiento Integral",
        desc: "Salud, familia, presencia y liderazgo. Rendimiento físico, desarrollo humano y una comunidad comprometida con una vida de excelencia.",
      },
      {
        title: "Infraestructura Privada",
        desc: "Acceso a salas de reunión y espacios de presentación con paneles LED en Miami para encuentros selectos y sesiones de negocios.",
      },
    ],
  },
  programming: {
    eyebrow: "Programación",
    titleLine1: "Un Calendario Hecho",
    titleLine2: "para Vidas Extraordinarias",
    events: [
      {
        freq: "Cada 2 meses",
        title: "Keynote Summit",
        desc: "Un evento con oradores seleccionados, líderes del sector, charlas provocadoras y networking estructurado para miembros e invitados selectos.",
      },
      {
        freq: "Dos veces al mes",
        title: "Encuentros de Miembros",
        desc: "Formatos rotativos: cenas reservadas, salidas en yate, veladas de apreciación de vinos y experiencias por la ciudad que construyen vínculos genuinos.",
      },
      {
        freq: "Trimestral",
        title: "Rondas de Negocios",
        desc: "Sesiones estructuradas de deal-flow, oportunidades de coinversión inmobiliaria y círculos de responsabilidad para el crecimiento de los negocios.",
      },
      {
        freq: "Continuo",
        title: "Rendimiento Físico",
        desc: "Un ambiente que inspira disciplina, fortalece el cuerpo y transforma la salud en un estilo de vida.",
      },
    ],
  },
  code: {
    eyebrow: "Código de Conducta",
    titleLine1: "La Cultura se Protege",
    titleLine2: "Antes del Crecimiento",
    items: [
      "La palabra tiene peso.",
      "La presencia importa.",
      "La familia es honrada.",
      "La transparencia es la regla.",
      "La reputación es protegida.",
      "Quien entra para explotar, se va.",
      "Quien entra para construir, permanece.",
    ],
  },
  founders: {
    eyebrow: "Los Fundadores",
    titleLine1: "Quién Garantiza",
    titleLine2: "la Puerta",
    items: [
      {
        title: "Cofundador",
        role: "Emprendedor & Estratega de Negocios",
        bio: "26 años en las Américas, residente en Miami. Dirige tres empresas en electrónica, logística e inversiones. Mentor estratégico para emprendedores que buscan migrar y construir operaciones sólidas en EE. UU.",
      },
      {
        title: "Cofundador",
        role: "Abogado Tributario, Contador y Mentor",
        bio: "Autor de 1000 Códigos de Sabiduría, creador del Método REI y atleta Ultraman e Ironman.\n\nDedica su vida a formar líderes que prosperan con propósito, fortaleciendo negocios, familias, relaciones y legado. Porque el verdadero éxito no se mide por un solo logro, sino por la armonía entre todas las áreas de la vida.",
      },
    ],
  },
  membership: {
    eyebrow: "Membresía",
    title: "Posición Fundadora",
    quote:
      "\"Esto no es una suscripción. Es la oportunidad de fundar la cultura de nuestro círculo.\"",
    entryLabel: "Inversión de Entrada",
    entryPrice: "$10,000",
    entryDesc: "Cuota fundadora única. Confirma el compromiso y la selección.",
    monthlyLabel: "Membresía Mensual",
    monthlyPrice: "$1,000",
    monthlyDesc: "El cobro comienza solo a partir del 4.º mes.",
    conditions: [
      { val: "40", label: "Miembros Fundadores" },
      { val: "12", label: "Meses\nPeríodo Mínimo de Membresía" },
      { val: "Admisión", label: "Sujeta a Aprobación" },
    ],
    disclaimer:
      "Cada postulación es analizada para preservar la calidad, los valores y la confianza de la comunidad.",
    cta: "Solicita Tu Invitación",
  },
  apply: {
    eyebrow: "Postulación",
    titleLine1: "Solicita Tu",
    titleLine2: "Invitación",
    successTitle: "Postulación Recibida",
    successMsg:
      "Nuestro comité revisará tu postulación y se pondrá en contacto en un plazo de 5 días hábiles. Bienvenido al círculo.",
    nameLabel: "Nombre Completo *",
    namePlaceholder: "Tu nombre completo",
    emailLabel: "Correo Electrónico *",
    emailPlaceholder: "tu@email.com",
    phoneLabel: "Teléfono / WhatsApp *",
    phonePlaceholder: "+1 (305) 000-0000",
    companyLabel: "Empresa / Cargo *",
    companyPlaceholder: "Empresa / Tu cargo",
    socialLabel: "Instagram *",
    socialPlaceholder: "@tuinstagram",
    referralLabel: "¿Quién Te Recomendó? (opcional)",
    referralPlaceholder: "Nombre del miembro que te invitó",
    submit: "Enviar Postulación",
    submitting: "Enviando...",
    disclaimer:
      "Tu información se mantiene en estricta confidencialidad. Todas las postulaciones son revisadas por el comité fundador.",
  },
  footer: {
    tagline: "Sociedad Privada de Negocios de Miami",
    copyright:
      "© 2026 Brave Society Miami. Todos los derechos reservados. · Política de Privacidad · Términos de Uso",
  },
};

export const translations: Record<Lang, Dict> = { en, pt, es };

// ---------------------------------------------------------------------------
// Language context
// ---------------------------------------------------------------------------

const STORAGE_KEY = "bs-lang";

function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored && translations[stored]) return stored;
  const nav = (window.navigator.language || "en").toLowerCase();
  if (nav.startsWith("pt")) return "pt";
  if (nav.startsWith("es")) return "es";
  return "en";
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Detect on mount (avoids SSR/hydration mismatch by running client-side).
  useEffect(() => {
    setLangState(detectLang());
  }, []);

  // Keep <html lang> in sync for accessibility & SEO.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
