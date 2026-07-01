import { Reveal } from "./Reveal";

type Tier = {
  nombre: string;
  para: string;
  precio: string;
  detalle: string;
  feats: string[];
  cta: string;
  destacado: boolean;
  promo?: {
    cupos: string;
    normal: string;
    razon: string;
  };
};

const TIERS: Tier[] = [
  {
    nombre: "Web Vitrina",
    para: "Presencia profesional para empezar en digital.",
    precio: "Q4,000",
    detalle: "+ Q600/mes · Entrega en 5 días",
    feats: [
      "Sitio web profesional",
      "Catálogo de servicios",
      "Formulario de contacto",
      "WhatsApp integrado",
      "Diseño responsive",
      "Hosting incluido",
    ],
    cta: "Agendar cita",
    destacado: false,
  },
  {
    nombre: "Web PLUS",
    para: "Para negocios en crecimiento que quieren generar clientes.",
    precio: "Q6,500",
    detalle: "+ Q600/mes · Entrega en 6 días",
    feats: [
      "Todo lo de Vitrina, y además:",
      "Catálogo dinámico con filtros",
      "Captura de leads + chat automático",
      "Calendario / reservas",
      "SEO básico (Google Maps)",
      "Analytics y galería profesional",
    ],
    cta: "Agendar cita",
    destacado: true,
  },
  {
    nombre: "Web Premium",
    para: "Automatización completa para escalar en serio.",
    precio: "Q6,500",
    detalle: "+ Q600/mes · Entrega en 7 días",
    feats: [
      "Todo lo de PLUS, y además:",
      "Sistema de ventas / reservas online",
      "Pagos en línea integrados",
      "Dashboard administrativo",
      "Chat AI 24/7 + SEO premium",
      "Soporte técnico prioritario",
    ],
    cta: "Agendar cita",
    destacado: false,
    promo: {
      cupos: "Primeras 3 clínicas / compraventas en asociarse",
      normal: "Normalmente Q10,000",
      razon:
        "¿Por qué? Lanzamos dominio hace poco. Necesitamos 3 casos de estudio reales. Tú ganas automatización 24/7. Nosotros ganamos proof para escalar.",
    },
  },
];

export function Paquetes() {
  return (
    <section
      id="paquetes"
      className="py-16 md:py-24 px-6 bg-crema-soft border-y border-line"
    >
      <div className="max-w-[1180px] mx-auto">
        <Reveal className="mb-13 max-w-[60ch] mx-auto text-center">
          <span className="block mb-4 font-display font-semibold text-[0.72rem] uppercase tracking-[0.28em] text-musgo">
            Paquetes de servicio
          </span>
          <h2 className="font-playfair-display font-bold tracking-[-0.01em] leading-[1.1] text-[clamp(2rem,4.4vw,3rem)]">
            Infraestructura que genera ROI
          </h2>
          <p className="mt-4 text-grafito-soft text-[1.05rem] max-w-[54ch] mx-auto">
            Tres niveles según la etapa de tu negocio. Todos incluyen el
            primer mes de mantenimiento gratis.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] items-start">
          {TIERS.map((tier, i) => (
            <Reveal
              key={tier.nombre}
              delay={(i % 4) * 0.06}
              className={`bg-white border rounded-[18px] px-7 py-8 relative transition-transform ${
                tier.destacado
                  ? "border-[1.5px] border-musgo shadow-[0_24px_50px_-30px_rgba(124,140,112,0.6)] md:scale-[1.02]"
                  : "border-line"
              }`}
            >
              {tier.destacado && (
                <div className="absolute -top-[13px] left-7 bg-musgo text-white text-[0.72rem] font-semibold tracking-[0.08em] uppercase px-3 py-[5px] rounded-full">
                  Recomendado
                </div>
              )}
              <div className="font-display font-bold text-[1.3rem]">{tier.nombre}</div>
              <div className="text-[0.85rem] text-grafito-soft mt-1 min-h-[38px]">
                {tier.para}
              </div>

              {tier.promo && (
                <div className="mt-4 rounded-xl border border-musgo/30 bg-musgo/10 px-4 py-3.5">
                  <p
                    className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-musgo mb-2"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    Promoción de lanzamiento
                  </p>
                  <p className="text-[0.82rem] font-semibold text-grafito mb-0.5">
                    {tier.promo.cupos}
                  </p>
                  <p className="text-[0.78rem] text-grafito-soft mb-2.5">
                    {tier.promo.normal}
                  </p>
                  <p className="text-[0.75rem] text-grafito-soft leading-[1.55] border-t border-musgo/20 pt-2.5">
                    {tier.promo.razon}
                  </p>
                </div>
              )}

              <div className="font-display font-bold text-[2.3rem] mt-[18px] mb-0.5">
                {tier.precio}
              </div>
              <div className="text-[0.85rem] text-grafito-soft">{tier.detalle}</div>
              <ul className="my-[22px] mb-[26px] flex flex-col gap-[10px]">
                {tier.feats.map((f) => (
                  <li
                    key={f}
                    className="text-[0.9rem] pl-6 relative text-grafito-soft before:content-['✓'] before:absolute before:left-0 before:text-musgo before:font-bold"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#formulario"
                className={`flex items-center justify-center w-full font-semibold text-sm px-5 py-[11px] rounded-[9px] transition-all duration-300 hover:scale-[1.02] ${
                  tier.destacado
                    ? "bg-musgo text-white hover:-translate-y-px hover:bg-musgo-dark"
                    : "bg-transparent text-grafito border-[1.5px] border-line hover:border-musgo hover:text-musgo-dark"
                }`}
              >
                {tier.cta}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-[34px] text-[0.92rem] text-grafito-soft">
          <strong className="text-grafito">
            Recuperable en una sola venta o servicio mayor.
          </strong>{" "}
          Tu web trabaja 24/7 mientras tú diriges el negocio.
        </Reveal>
      </div>
    </section>
  );
}
