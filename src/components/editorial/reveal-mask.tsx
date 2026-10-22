"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const;

// Marges négatives : le masque déborde légèrement pour ne pas rogner
// les jambages et l'italique de Fraunces une fois le texte révélé.
export const MASK_HIDDEN = "inset(100% -8% -30% -8%)";
export const MASK_SHOWN = "inset(-20% -8% -30% -8%)";

type Tag = "div" | "span" | "li" | "p" | "figure";

/**
 * Animation signature du site : le contenu se révèle par masque
 * (clip-path + translateY), 600 ms, cubic-bezier(0.16, 1, 0.3, 1).
 * Avec prefers-reduced-motion, l'état final est appliqué sans mouvement.
 */
export function RevealMask({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: Tag;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ clipPath: MASK_HIDDEN, y: 20 }}
      whileInView={{ clipPath: MASK_SHOWN, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_SIGNATURE, delay }}
    >
      {children}
    </Component>
  );
}
