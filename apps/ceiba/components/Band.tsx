import { Reveal } from "./Reveal";

export function Band() {
  return (
    <div className="bg-grafito text-crema">
      <Reveal
        strong
        className="max-w-[1180px] mx-auto px-6 py-20 border-y border-white/10 text-center"
      >
        <p className="font-display font-medium leading-[1.3] tracking-[-0.01em] text-[clamp(1.6rem,4vw,2.6rem)] max-w-[50ch] mx-auto">
          Una presencia digital efectiva no es un gasto operativo.{" "}
          <span className="text-musgo">Es un activo de negocio.</span>
        </p>
      </Reveal>
    </div>
  );
}
