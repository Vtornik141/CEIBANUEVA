import { Reveal } from "./Reveal";

const PILARES = [
  {
    idx: "O / 01",
    titulo: "Observar",
    texto:
      "Auditamos tu situación actual, tu mercado y a quién le vendes. Antes de diseñar, entendemos.",
  },
  {
    idx: "A / 02",
    titulo: "Analizar",
    texto: "Traducimos los hallazgos en estrategia: qué necesita tu negocio y qué sobra.",
  },
  {
    idx: "C / 03",
    titulo: "Conectar",
    texto:
      "Diseñamos para conectar tu negocio con tu cliente. Cada sección empuja hacia una acción.",
  },
  {
    idx: "A / 04",
    titulo: "Activar",
    texto:
      "Lanzamos un activo rápido y optimizado, listo para representarte desde el primer día.",
  },
];

export function MetodologiaOACA() {
  return (
    <section id="metodologia" className="py-16 md:py-24 px-6 bg-grafito text-crema">
      <div className="max-w-[1180px] mx-auto">
        <Reveal className="mb-13 max-w-[60ch]">
          <span className="block mb-4 font-display font-semibold text-[0.72rem] uppercase tracking-[0.28em] text-[#9fb091]">
            Metodología OACA
          </span>
          <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2rem,4.4vw,3rem)] text-crema">
            Disciplina digital. Resultados impecables.
          </h2>
          <p className="mt-4 text-[#b8b4a8] text-[1.05rem] max-w-[54ch]">
            Una forma de trabajar que va de entender el negocio a activarlo.
            Cuatro fases, sin pasos de relleno.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden">
          {PILARES.map((p, i) => (
            <Reveal
              key={p.idx}
              delay={(i % 4) * 0.06}
              className="bg-grafito px-[26px] py-8 transition-colors hover:bg-[#363633]"
            >
              <div className="font-display text-musgo font-bold text-[1.1rem] tracking-[0.1em]">
                {p.idx}
              </div>
              <h3 className="font-display font-bold text-[1.35rem] mt-3.5 mb-2.5">
                {p.titulo}
              </h3>
              <p className="text-[0.92rem] text-[#b8b4a8] leading-[1.6]">{p.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
