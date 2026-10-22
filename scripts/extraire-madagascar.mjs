/* ──────────────────────────────────────────────────────────────
   Génère src/data/madagascar.json : le contour de Madagascar
   (Natural Earth 1:50m, via le paquet world-atlas), pour le
   médaillon de situation de la carte des projets.

   Usage : npm run madagascar
   ────────────────────────────────────────────────────────────── */
import { writeFile } from "node:fs/promises";
import { feature } from "topojson-client";

const SOURCE = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json";
const SORTIE = new URL("../src/data/madagascar.json", import.meta.url);
const ID_MADAGASCAR = "450"; // code ISO 3166-1 numérique

const res = await fetch(SOURCE);
if (!res.ok) throw new Error(`${res.status} ${SOURCE}`);
const monde = await res.json();

const pays = feature(monde, monde.objects.countries).features.find((f) => f.id === ID_MADAGASCAR);
if (!pays) throw new Error("Madagascar introuvable dans world-atlas");

// Trois décimales (~100 m) suffisent à cette échelle.
const arrondir = (c) => (typeof c[0] === "number" ? c.map((v) => Math.round(v * 1000) / 1000) : c.map(arrondir));
const geojson = {
  type: "FeatureCollection",
  features: [{ type: "Feature", id: pays.id, properties: { name: "Madagascar" }, geometry: { ...pays.geometry, coordinates: arrondir(pays.geometry.coordinates) } }],
};

const texte = JSON.stringify(geojson);
await writeFile(SORTIE, texte);
console.log(`Madagascar · ${pays.geometry.type} · ${(texte.length / 1024).toFixed(1)} Ko`);
