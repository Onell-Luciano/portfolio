"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { TOPO_PROFIL } from "@/data/topographie";

const N = TOPO_PROFIL.points.length;
const MARGE = 10; // en % de la hauteur, pour que le trait ne touche pas les bords

/** Hauteur du profil (0 en haut, 100 en bas) à une fraction 0–1 du parcours. */
function altitudeA(f: number) {
  const i = Math.min(N - 1, Math.max(0, f * (N - 1)));
  const a = Math.floor(i);
  const b = Math.min(N - 1, a + 1);
  const v = TOPO_PROFIL.points[a] + (TOPO_PROFIL.points[b] - TOPO_PROFIL.points[a]) * (i - a);
  return 100 - MARGE - ((v - TOPO_PROFIL.min) / (TOPO_PROFIL.max - TOPO_PROFIL.min)) * (100 - 2 * MARGE);
}

const LIGNE = TOPO_PROFIL.points.map((_, i) => `${i ? "L" : "M"}${i} ${altitudeA(i / (N - 1)).toFixed(1)}`).join("");
const AIRE = `${LIGNE}L${N - 1} 100L0 100Z`;

/** Position (0–1) de chaque section dans le défilement de la page. */
function useReperes(sections: readonly string[]) {
  const [reperes, setReperes] = useState<number[]>([]);

  useEffect(() => {
    const mesurer = () => {
      const course = document.documentElement.scrollHeight - innerHeight;
      if (course <= 0) return;
      setReperes(
        sections.flatMap((id) => {
          const el = document.getElementById(id);
          if (!el) return [];
          const haut = el.getBoundingClientRect().top + scrollY;
          return [Math.min(1, Math.max(0, haut / course))];
        }),
      );
    };
    mesurer();
    const observer = new ResizeObserver(mesurer);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [sections]);

  return reperes;
}

/**
 * Barre de progression en forme de profil d'altitude réel (ouest → est,
 * à la latitude de Fianarantsoa). Le tracé se remplit au fil du défilement,
 * un marcheur suit la pente, et chaque section est un repère du sentier.
 */
export function ProfilAltitude({ sections }: { sections: readonly string[] }) {
  const { scrollYProgress } = useScroll();
  const reperes = useReperes(sections);
  const [franchis, setFranchis] = useState(0);

  const decoupe = useTransform(scrollYProgress, (p) => `inset(0 ${(100 - p * 100).toFixed(2)}% 0 0)`);
  const gauche = useTransform(scrollYProgress, (p) => `${(p * 100).toFixed(2)}%`);
  const haut = useTransform(scrollYProgress, (p) => `${altitudeA(p).toFixed(1)}%`);

  // Ne re-rend que lorsqu'un repère est franchi, pas à chaque pixel.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const n = reperes.filter((r) => r <= p + 0.002).length;
    if (n !== franchis) setFranchis(n);
  });

  return (
    <div aria-hidden="true" className="relative mx-[clamp(1.5rem,6vw,8rem)] h-3.5">
      {/* Le sentier entier, discret */}
      <svg viewBox={`0 0 ${N - 1} 100`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path d={LIGNE} fill="none" stroke="var(--ink-soft)" strokeOpacity={0.4} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </svg>

      {/* La part parcourue, en terracotta */}
      <motion.div className="absolute inset-0" style={{ clipPath: decoupe }}>
        <svg viewBox={`0 0 ${N - 1} 100`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <path d={AIRE} fill="var(--accent)" fillOpacity={0.1} />
          <path d={LIGNE} fill="none" stroke="var(--accent)" strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
        </svg>
      </motion.div>

      {/* Repères de section, posés sur le sentier */}
      {reperes.map((r, i) => (
        <span
          key={i}
          className={`absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-paper transition-colors duration-300 ${
            i < franchis ? "bg-accent" : "bg-ink-soft/60"
          }`}
          style={{ left: `${r * 100}%`, top: `${altitudeA(r)}%` }}
        />
      ))}

      {/* Le marcheur */}
      <motion.span
        className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-2 ring-paper"
        style={{ left: gauche, top: haut }}
      />
    </div>
  );
}
