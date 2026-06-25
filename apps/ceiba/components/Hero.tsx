import Image from "next/image";
import { Reveal } from "./Reveal";

const LINEAS = [
  "Infraestructura digital que trabaja 24/7",
  "Tu negocio crece mientras tú diriges",
  "Un activo completamente tuyo",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-14 md:pt-[104px] md:pb-24">
      <Image
        src="/logo-ceiba.png"
        alt=""
        aria-hidden="true"
        width={420}
        height={420}
        className="absolute -top-10 -right-15 opacity-[0.07] pointer-events-none select-none"
      />
      <div className="max-w-[1180px] mx-auto">
        <Reveal className="mb-6 inline-flex items-center gap-3 font-display font-semibold text-[0.72rem] uppercase tracking-[0.28em] text-musgo">
          <span className="w-1.5 h-1.5 rounded-full bg-musgo" />
          Ceiba Visual · Estudio digital · Guatemala
        </Reveal>

        <Reveal delay={0.08} strong>
          <h1 className="font-playfair-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2.8rem,7vw,5.5rem)] max-w-[16ch]">
            Ingeniería digital de <span className="text-musgo">alto impacto</span>
          </h1>
        </Reveal>

        <Reveal
          delay={0.2}
          strong
          className="mt-12 flex flex-col gap-3 border-t border-line pt-8 max-w-[46ch]"
        >
          {LINEAS.map((linea) => (
            <p key={linea} className="text-[1.05rem] tracking-[-0.01em] text-grafito-soft">
              {linea}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
