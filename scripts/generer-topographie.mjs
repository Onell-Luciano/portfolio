/* ──────────────────────────────────────────────────────────────
   Génère public/topographie-fianarantsoa.svg : les courbes de niveau
   autour de Fianarantsoa, tracées depuis les tuiles d'altitude
   ouvertes « Terrarium » (Mapzen / AWS Open Data, dérivées du SRTM).

   Usage : npm run topographie
   ────────────────────────────────────────────────────────────── */
import { contours } from "d3-contour";
import { writeFile } from "node:fs/promises";
import { PNG } from "pngjs";

const CENTRE = { lat: -21.4527, lon: 47.0857 }; // Fianarantsoa
const ZOOM = 11;
const RAYON = 1; // tuiles autour de la tuile centrale (3 × 3)
const REDUCTION = 4; // 768 px → 192 cellules : lignes plus souples, fichier plus léger
const EQUIDISTANCE = 50; // mètres entre deux courbes
const TOLERANCE = 0.45; // simplification Douglas-Peucker, en cellules
const SORTIE = new URL("../public/topographie-fianarantsoa.svg", import.meta.url);

const n = 2 ** ZOOM;
const pxGlobal = (lon, lat) => {
  const r = (lat * Math.PI) / 180;
  return {
    x: ((lon + 180) / 360) * n * 256,
    y: ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n * 256,
  };
};

const c = pxGlobal(CENTRE.lon, CENTRE.lat);
const tx0 = Math.floor(c.x / 256) - RAYON;
const ty0 = Math.floor(c.y / 256) - RAYON;
const cote = (2 * RAYON + 1) * 256;
const altitudes = new Float64Array(cote * cote);

for (let ty = 0; ty <= 2 * RAYON; ty++) {
  for (let tx = 0; tx <= 2 * RAYON; tx++) {
    const url = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${ZOOM}/${tx0 + tx}/${ty0 + ty}.png`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    const png = PNG.sync.read(Buffer.from(await res.arrayBuffer()));
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const i = (y * 256 + x) * 4;
        const h = png.data[i] * 256 + png.data[i + 1] + png.data[i + 2] / 256 - 32768;
        altitudes[(ty * 256 + y) * cote + tx * 256 + x] = h;
      }
    }
  }
}

// Moyenne par blocs : supprime le bruit du MNT avant le tracé.
const w = cote / REDUCTION;
const grille = new Float64Array(w * w);
for (let y = 0; y < w; y++) {
  for (let x = 0; x < w; x++) {
    let s = 0;
    for (let dy = 0; dy < REDUCTION; dy++)
      for (let dx = 0; dx < REDUCTION; dx++) s += altitudes[(y * REDUCTION + dy) * cote + x * REDUCTION + dx];
    grille[y * w + x] = s / REDUCTION ** 2;
  }
}

// Flou gaussien approché (trois flous en boîte) : des courbes souples plutôt qu'un bruit de pixels.
function flouBoite(src, rayon) {
  const tmp = new Float64Array(src.length);
  const out = new Float64Array(src.length);
  const passe = (a, b, horizontal) => {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < w; j++) {
        let s = 0;
        let n = 0;
        for (let k = -rayon; k <= rayon; k++) {
          const jj = j + k;
          if (jj < 0 || jj >= w) continue;
          s += horizontal ? a[i * w + jj] : a[jj * w + i];
          n++;
        }
        if (horizontal) b[i * w + j] = s / n;
        else b[j * w + i] = s / n;
      }
    }
  };
  passe(src, tmp, true);
  passe(tmp, out, false);
  return out;
}
let lisse = grille;
for (let i = 0; i < 3; i++) lisse = flouBoite(lisse, 2);
grille.set(lisse);

let min = Infinity;
let max = -Infinity;
for (const h of grille) {
  if (h < min) min = h;
  if (h > max) max = h;
}
const seuils = [];
for (let s = Math.ceil(min / EQUIDISTANCE) * EQUIDISTANCE; s <= max; s += EQUIDISTANCE) seuils.push(s);

const ECHELLE = 5; // coordonnées finales entières sur 960 × 960
const fmt = (v) => Math.round(v * ECHELLE);

// Douglas-Peucker : retire les points qui ne changent pas la forme.
function simplifier(points, tol) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points.at(-1);
  const dx = bx - ax;
  const dy = by - ay;
  const long = Math.hypot(dx, dy) || 1;
  let loin = 0;
  let idx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const dist = Math.abs(dy * px - dx * py + bx * ay - by * ax) / long;
    if (dist > loin) [loin, idx] = [dist, i];
  }
  if (loin <= tol) return [points[0], points.at(-1)];
  return [...simplifier(points.slice(0, idx + 1), tol).slice(0, -1), ...simplifier(points.slice(idx), tol)];
}

// Un anneau fermé n'a pas d'extrémités : on le coupe en deux pour le simplifier.
function simplifierAnneau(anneau) {
  const m = Math.floor(anneau.length / 2);
  return [...simplifier(anneau.slice(0, m + 1), TOLERANCE).slice(0, -1), ...simplifier(anneau.slice(m), TOLERANCE)];
}
const chemins = contours().size([w, w]).thresholds(seuils)(Array.from(grille)).map((geo) => {
  const d = geo.coordinates
    .flat()
    .filter((anneau) => anneau.length > 24) // ignore les micro-îlots
    .map((anneau) => "M" + simplifierAnneau(anneau).map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join("L") + "Z")
    .join("");
  // Une courbe maîtresse toutes les 200 m, plus appuyée.
  return { d, maitresse: geo.value % 200 === 0 };
});

const repere = { x: fmt((c.x - tx0 * 256) / REDUCTION), y: fmt((c.y - ty0 * 256) / REDUCTION) };
const taille = w * ECHELLE;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${taille}" height="${taille}" viewBox="0 0 ${taille} ${taille}" fill="none" stroke="#0a0a0b" stroke-linejoin="round">
<!-- Courbes de niveau, équidistance ${EQUIDISTANCE} m, de ${seuils[0]} à ${seuils.at(-1)} m. Données : Terrarium (Mapzen / AWS Open Data, SRTM). Centre : Fianarantsoa (${repere.x}, ${repere.y}). -->
<style>path{stroke-width:.9;stroke-opacity:.2;vector-effect:non-scaling-stroke}path.m{stroke-width:1.2;stroke-opacity:.38}</style>
${chemins
  .filter((p) => p.d)
  .map((p) => `<path${p.maitresse ? ' class="m"' : ""} d="${p.d}"/>`)
  .join("\n")}
</svg>
`;

await writeFile(SORTIE, svg);
console.log(
  `${chemins.length} courbes (${seuils[0]}–${seuils.at(-1)} m) · ${(svg.length / 1024).toFixed(0)} Ko · repère Fianarantsoa : ${(repere.x / taille * 100).toFixed(1)} % / ${(repere.y / taille * 100).toFixed(1)} %`,
);
