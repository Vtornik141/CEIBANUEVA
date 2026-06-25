import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CeibaMark } from "./CeibaMark";
import { Reveal } from "./Reveal";

const IDENTIDAD_VISUAL = [
  { nombre: "American DropGT", imagen: "/proyectos/american.png" },
  { nombre: "ImpoAutoventas Orellana", imagen: "/proyectos/orellana.png" },
  { nombre: "La Chatita", imagen: "/proyectos/aceite.png" },
  { nombre: "Manolo Store", imagen: "/proyectos/manolo.png" },
];

const SOLUCIONES_DIGITALES = [
  {
    nombre: "RoadKing GT",
    url: "https://roadking-main.vercel.app/#contacto",
    gradient: "from-[#3a4733] to-musgo",
  },
  {
    nombre: "Clínica VetGT",
    url: "https://clinicavet-r44b.vercel.app/",
    gradient: "from-grafito to-grafito-soft",
  },
];

export function Proyectos() {
  return (
    <section id="proyectos" className="py-16 md:py-24 px-6">
      <div className="max-w-[1180px] mx-auto">
        <Reveal className="mb-13 max-w-[60ch]">
          <span className="block mb-4 font-display font-semibold text-[0.72rem] uppercase tracking-[0.28em] text-musgo">
            Proyectos realizados
          </span>
          <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2rem,4.4vw,3rem)]">
            Trabajo que respalda la propuesta.
          </h2>
          <p className="mt-4 text-grafito-soft text-[1.05rem] max-w-[54ch]">
            Identidad visual y plataformas completas, construidas para
            negocios reales en distintos sectores.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          {IDENTIDAD_VISUAL.map((p, i) => (
            <Reveal
              key={p.nombre}
              delay={(i % 4) * 0.06}
              as="article"
              className="group bg-white border border-line rounded-[18px] overflow-hidden transition hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-28px_rgba(45,45,45,0.45)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-crema">
                <Image
                  src={p.imagen}
                  alt={p.nombre}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-[22px] pt-5 pb-6">
                <div className="text-[0.72rem] tracking-[0.12em] uppercase text-musgo font-semibold">
                  Identidad visual
                </div>
                <div className="font-display font-bold text-[1.2rem] mt-1.5">
                  {p.nombre}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px] mt-[22px]">
          {SOLUCIONES_DIGITALES.map((p, i) => (
            <Reveal key={p.nombre} delay={(i % 4) * 0.06} as="div">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative rounded-[18px] overflow-hidden min-h-[230px] flex flex-col justify-end p-7 text-white transition hover:-translate-y-[5px] bg-gradient-to-br ${p.gradient}`}
              >
                <CeibaMark
                  size={180}
                  color="#fff"
                  className="absolute -top-[30px] -right-[30px] opacity-[0.16]"
                />
                <span className="text-[0.72rem] tracking-[0.12em] uppercase font-semibold opacity-90">
                  Plataforma en vivo
                </span>
                <span className="font-display font-bold text-[1.5rem] mt-2 mb-3.5">
                  {p.nombre}
                </span>
                <span className="inline-flex items-center gap-[7px] font-semibold text-sm border-b border-white/40 pb-0.5 w-fit">
                  Ver proyecto en vivo
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
