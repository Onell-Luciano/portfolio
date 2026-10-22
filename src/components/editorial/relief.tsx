import type { CSSProperties } from "react";
import { TOPO_COURBES, TOPO_TAILLE } from "@/data/topographie";

/**
 * Courbes de niveau autour de Fianarantsoa, tracées en CSS pur
 * (@keyframes trace sur stroke-dashoffset, en cascade) : aucun coût
 * JavaScript, le tracé démarre dès le premier affichage.
 * L'épaisseur des traits suit le contexte (voir .relief-* dans globals.css).
 */
export function Relief({
  className = "",
  contexte,
  joue = true,
  duree = 1.5,
  delai = 0,
}: {
  className?: string;
  contexte: "hero" | "carte";
  joue?: boolean; // false : en attente (la carte lance le tracé à son entrée dans l'écran)
  duree?: number;
  delai?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${TOPO_TAILLE} ${TOPO_TAILLE}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`relief relief-${contexte} ${joue ? "relief-joue" : ""} ${className}`}
      style={{ "--relief-duree": `${duree}s`, "--relief-delai": `${delai}s` } as CSSProperties}
    >
      {TOPO_COURBES.map((c, i) => (
        <path
          key={i}
          d={c.d}
          pathLength={1000}
          className={c.maitresse ? "maitresse" : undefined}
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </svg>
  );
}
