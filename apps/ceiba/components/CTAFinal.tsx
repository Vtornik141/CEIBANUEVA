import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { WHATSAPP_URL } from "../lib/constants";

export function CTAFinal() {
  return (
    <section className="bg-grafito text-crema">
      <Reveal strong className="max-w-[1180px] mx-auto px-6 py-24 text-center">
        <h2 className="font-playfair-display font-bold leading-[1.1] text-[clamp(2rem,5vw,3.4rem)] max-w-[18ch] mx-auto mb-9">
          Hablemos de tu próximo activo digital
        </h2>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-base px-7 py-3.5 rounded-[9px] bg-musgo text-white transition-all duration-300 hover:-translate-y-px hover:scale-[1.03] hover:bg-musgo-dark"
        >
          Conversemos por WhatsApp
          <ArrowRight size={18} />
        </a>
      </Reveal>
    </section>
  );
}
