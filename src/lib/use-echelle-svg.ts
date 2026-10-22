"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Pixels écran par unité du viewBox d'un SVG, mesurés en continu.
 * Sert à garder des traits et des points de taille constante en pixels
 * quel que soit l'agrandissement du SVG.
 */
export function useEchelleSvg(
  ref: RefObject<Element | null>,
  largeur: number,
  hauteur: number,
  mode: "meet" | "slice" = "meet",
  initiale = 1,
) {
  const [echelle, setEchelle] = useState(initiale);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entree]) => {
      const { width, height } = entree.contentRect;
      if (!width || !height) return;
      const sx = width / largeur;
      const sy = height / hauteur;
      setEchelle(mode === "slice" ? Math.max(sx, sy) : Math.min(sx, sy));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, largeur, hauteur, mode]);

  return echelle;
}
