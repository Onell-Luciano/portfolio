import { TOPO_TUILES } from "@/data/topographie";
import type { Locale } from "@/data/portfolio";

/**
 * Coordonnées réelles d'un point du relief, à partir de sa position
 * dans le carré (fractions 0–1). Projection Web Mercator inverse,
 * la même que celle des tuiles d'altitude.
 */
export function coordonneesRelief(fx: number, fy: number) {
  const n = 2 ** TOPO_TUILES.zoom;
  const x = (TOPO_TUILES.x0 + fx * TOPO_TUILES.cote) / n;
  const y = (TOPO_TUILES.y0 + fy * TOPO_TUILES.cote) / n;
  return {
    lon: x * 360 - 180,
    lat: (Math.atan(Math.sinh(Math.PI * (1 - 2 * y))) * 180) / Math.PI,
  };
}

const pad2 = (n: number) => String(n).padStart(2, "0");

/** 21°27′12″S — degrés, minutes, secondes, hémisphère. */
function dms(valeur: number, positif: string, negatif: string) {
  const abs = Math.abs(valeur);
  let d = Math.floor(abs);
  let m = Math.floor((abs - d) * 60);
  let s = Math.round(((abs - d) * 60 - m) * 60);
  if (s === 60) [s, m] = [0, m + 1];
  if (m === 60) [m, d] = [0, d + 1];
  return `${d}°${pad2(m)}′${pad2(s)}″${valeur < 0 ? negatif : positif}`;
}

export function formaterCoordonnees(lat: number, lon: number, locale: Locale) {
  return `${dms(lat, "N", "S")} · ${dms(lon, "E", locale === "fr" ? "O" : "W")}`;
}
