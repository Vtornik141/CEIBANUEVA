import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#222220] text-[#b8b4a8] py-12">
      <div className="max-w-[1180px] mx-auto px-6 flex justify-between items-center flex-wrap gap-5">
        <a href="#top" className="flex items-center gap-2.5 font-display font-bold text-[1.05rem] text-crema">
          <Image src="/logo-ceiba.png" alt="" width={24} height={24} className="rounded-full" />
          Ceiba Visual
        </a>
        <div className="text-[0.85rem]">Ingeniería digital de alto impacto</div>
        <div className="text-[0.85rem]">© 2026 Ceiba Visual GT</div>
      </div>
    </footer>
  );
}
