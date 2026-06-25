"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { WHATSAPP_URL } from "../lib/constants";

const LINKS = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#metodologia", label: "Metodología" },
  { href: "#proceso", label: "Proceso" },
  { href: "#paquetes", label: "Paquetes" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 bg-crema/[0.82] backdrop-blur-md border-b transition-colors duration-300 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display font-bold text-[1.05rem] tracking-[-0.01em]"
        >
          <Image src="/logo-ceiba.png" alt="" width={28} height={28} className="rounded-full" />
          Ceiba Visual
        </a>

        <nav
          className={`${
            menuOpen
              ? "flex absolute top-[72px] inset-x-0 flex-col bg-crema border-b border-line p-5 gap-[18px] items-start"
              : "hidden"
          } md:flex md:static md:flex-row md:items-center md:gap-[34px] md:border-none md:p-0`}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-sm text-grafito-soft font-medium hover:text-grafito transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-[11px] rounded-[9px] bg-grafito text-white transition-all duration-300 hover:-translate-y-px hover:scale-[1.03] hover:shadow-[0_8px_22px_-10px_rgba(45,45,45,0.6)]"
          >
            Conversemos
          </a>
        </nav>

        <button
          type="button"
          aria-label="Menú"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden bg-transparent border-none cursor-pointer text-grafito"
        >
          <Menu size={26} />
        </button>
      </div>
    </header>
  );
}
