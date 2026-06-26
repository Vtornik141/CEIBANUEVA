import { Reveal } from "./Reveal";

const PASOS = [
  {
    dia: "Día 1",
    titulo: "Arquitectura y alineación",
    items: [
      "Auditoría de la situación actual",
      "Definición de objetivos de negocio",
      "Identificación de oportunidades",
      "Hoja de ruta del activo digital",
    ],
  },
  {
    dia: "Día 2–4",
    titulo: "Desarrollo de alto rendimiento",
    items: [
      "Construcción sobre arquitectura Next.js",
      "Optimización de velocidad y experiencia",
      "Estructura preparada para escalar",
      "Integración de lo que el negocio necesita",
    ],
  },
  {
    dia: "Día 5–7",
    titulo: "Optimización y entrega",
    items: [
      "Ajustes de rendimiento",
      "Verificación en móvil y escritorio",
      "Revisión de métricas de experiencia",
      "Entrega del activo operativo",
    ],
  },
];

export function Proceso() {
  return (
    <section id="proceso" className="py-16 md:py-24 px-6">
      <div className="max-w-[1180px] mx-auto">
        <Reveal className="mb-13 max-w-[60ch]">
          <span className="block mb-4 font-display font-semibold text-[0.72rem] uppercase tracking-[0.28em] text-musgo">
            Protocolo de ejecución
          </span>
          <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2rem,4.4vw,3rem)]">
            Activo operativo en 7 días
          </h2>
          <p className="mt-4 text-grafito-soft text-[1.05rem] max-w-[54ch]">
            Un proceso claro y sin fricción. Tú te enfocas en dirigir;
            nosotros asumimos la complejidad técnica.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PASOS.map((paso, i) => (
            <Reveal
              key={paso.dia}
              delay={(i % 4) * 0.06}
              className="relative bg-crema-soft border border-line rounded-2xl px-[26px] py-[30px]"
            >
              <span className="inline-block font-display font-bold text-[0.82rem] tracking-[0.06em] text-white bg-musgo px-3 py-[5px] rounded-[7px]">
                {paso.dia}
              </span>
              <h3 className="font-display font-bold text-[1.25rem] mt-[18px] mb-3">
                {paso.titulo}
              </h3>
              <ul className="flex flex-col gap-[9px]">
                {paso.items.map((item) => (
                  <li
                    key={item}
                    className="text-[0.92rem] text-grafito-soft pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-[7px] before:h-[7px] before:rounded-sm before:bg-musgo before:rotate-45"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
