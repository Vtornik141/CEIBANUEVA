"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article";
  strong?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  strong = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const initial = strong ? { opacity: 0, y: 34, scale: 0.97 } : { opacity: 0, y: 22 };
  const animate = strong ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 };

  return (
    <Component
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: strong ? 0.8 : 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Component>
  );
}
