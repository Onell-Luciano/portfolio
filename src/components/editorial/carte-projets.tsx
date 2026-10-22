"use client";

import { geoIdentity, geoMercator, type GeoProjection } from "d3-geo";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { FeatureCollection } from "geojson";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useId, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { ComposableMap, Marker, useMapContext } from "react-simple-maps/core";
import madagascarJson from "@/data/madagascar.json";
import { domaineLabel, domainesCouleurs, pad, profil, projets, type Domaine, type Locale, type Projet } from "@/data/portfolio";
import { Link } from "@/i18n/navigation";
import { useEchelleSvg } from "@/lib/use-echelle-svg";
import { useEstClient, useFinePointer, useMediaQuery } from "@/lib/use-fine-pointer";
import { Relief } from "./relief";
import { EASE_SIGNATURE } from "./reveal-mask";
import { SchemaPrincipe } from "./schema-principe";

/* ── Géométrie de l'atlas ─────────────────────────────────────────
   Les coordonnées des projets sont en % (portfolio.ts) :
   x suit le temps, y le domaine principal. Tout le reste en découle. */

type Point = { projet: Projet; x: number; y: number; domaine: Domaine };

const POINTS: Point[] = projets.flatMap((p) =>
  p.coordonnee ? [{ projet: p, x: p.coordonnee.x, y: p.coordonnee.y, domaine: p.domaines[0] }] : [],
);

// L'itinéraire relie les projets dans l'ordre du temps, donc de gauche à droite.
const ITINERAIRE = [...POINTS].sort((a, b) => a.x - b.x);
const rangItineraire = (id: string) => ITINERAIRE.findIndex((p) => p.projet.id === id);

// Parallèles : un par domaine principal, à la latitude moyenne de ses projets.
const PARALLELES = (Object.keys(domainesCouleurs) as Domaine[]).flatMap((domaine) => {
  const ys = POINTS.filter((p) => p.domaine === domaine).map((p) => p.y);
  return ys.length ? [{ domaine, y: ys.reduce((a, b) => a + b, 0) / ys.length }] : [];
});

// Méridiens : la frontière entre deux années passe à mi-chemin des projets voisins.
const ANNEES = [...new Set(POINTS.map((p) => p.projet.annee))].sort();
const ETENDUES = ANNEES.map((annee) => {
  const xs = POINTS.filter((p) => p.projet.annee === annee).map((p) => p.x);
  return { annee, min: Math.min(...xs), max: Math.max(...xs) };
});
const MERIDIENS = ETENDUES.slice(1).map((e, i) => (ETENDUES[i].max + e.min) / 2);
const BORNES = [3, ...MERIDIENS, 97];
const BANDES = ANNEES.map((annee, i) => ({ annee, centre: (BORNES[i] + BORNES[i + 1]) / 2 }));

/* Deux cadrages : 16/10 sur grand écran, 4/5 sur mobile.
   `echelle` est une estimation pour le rendu serveur, mesurée ensuite. */
const VUES = {
  large: { w: 1600, h: 1000, rayon: 4, echelle: 0.79 },
  etroite: { w: 800, h: 1000, rayon: 6, echelle: 0.43 },
};

const IDENTITE = geoIdentity() as unknown as GeoProjection; // coordonnées déjà dans l'espace du viewBox

// Médaillon de situation : la vraie silhouette de Madagascar (Natural Earth).
const MADAGASCAR = madagascarJson as unknown as FeatureCollection;
const FIANARANTSOA: [number, number] = [47.0857, -21.4527];
const MEDAILLON = { w: 120, h: 210 };
const PROJECTION_MADAGASCAR = geoMercator().fitExtent(
  [
    [10, 10],
    [MEDAILLON.w - 10, MEDAILLON.h - 10],
  ],
  MADAGASCAR,
);

/* Chronologie de l'animation : relief, puis itinéraire, les points
   apparaissant quand le tracé les atteint. */
const DEBUT_ITINERAIRE = 0.45;
const DUREE_ITINERAIRE = 2.4;
const apparition = (id: string) =>
  DEBUT_ITINERAIRE + (DUREE_ITINERAIRE * rangItineraire(id)) / Math.max(1, ITINERAIRE.length - 1);

/** Courbe de Catmull-Rom passant par tous les points, convertie en Bézier cubiques. */
function courbe(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const [p1, p2] = [pts[i], pts[i + 1]];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/** Graduations sur les quatre bords (21 par côté, longues tous les 25 %), en un seul tracé. */
function graduations(w: number, h: number, px: (n: number) => number) {
  let d = "";
  for (let i = 0; i <= 20; i++) {
    const l = px(i % 5 === 0 ? 11 : 5);
    const gx = ((i * w) / 20).toFixed(1);
    const gy = ((i * h) / 20).toFixed(1);
    d += `M${gx} 0v${l.toFixed(1)}M${gx} ${h}v${(-l).toFixed(1)}M0 ${gy}h${l.toFixed(1)}M${w} ${gy}h${(-l).toFixed(1)}`;
  }
  return d;
}

type Ancrage = "droite-bas" | "gauche-bas" | "droite-haut" | "gauche-haut";
const ANCRAGES: Record<Ancrage, string> = {
  "droite-bas": "translate-x-6 translate-y-6",
  "gauche-bas": "-translate-x-[calc(100%+1.5rem)] translate-y-6",
  "droite-haut": "translate-x-6 -translate-y-[calc(100%+1.5rem)]",
  "gauche-haut": "-translate-x-[calc(100%+1.5rem)] -translate-y-[calc(100%+1.5rem)]",
};

/* ── Composant ────────────────────────────────────────────────────── */

export function CarteProjets({ locale, filtre }: { locale: Locale; filtre: Domaine | null }) {
  const t = useTranslations("carte");
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const estClient = useEstClient(); // le relief, décoratif, reste hors du HTML statique
  const etroite = useMediaQuery("(max-width: 47.99rem)");
  const vue = etroite ? VUES.etroite : VUES.large;

  const cadreRef = useRef<HTMLDivElement>(null);
  const vu = useInView(cadreRef, { once: true, amount: 0.3 });
  const echelle = useEchelleSvg(cadreRef, vue.w, vue.h, "meet", vue.echelle);
  const px = (n: number) => n / echelle; // n pixels écran, en unités du viewBox
  const masqueId = `itineraire-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const itineraire = useMemo(
    () => courbe(ITINERAIRE.map((p) => [(p.x * vue.w) / 100, (p.y * vue.h) / 100])),
    [vue.w, vue.h],
  );

  // Survol / focus (panneau flottant) et tap (feuille en bas de carte)
  const [actif, setActif] = useState<string | null>(null);
  const [apercu, setApercu] = useState<Projet | null>(null);
  const [feuille, setFeuille] = useState<Projet | null>(null);
  const pointeur = useRef<string>("mouse");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const [ancrage, setAncrage] = useState<Ancrage>("droite-bas");

  const placer = (cx: number, cy: number, saut = false) => {
    x.set(cx);
    y.set(cy);
    if (saut || reduce) {
      sx.jump(cx);
      sy.jump(cy);
    }
    const h = cx > window.innerWidth - 380 ? "gauche" : "droite";
    const v = cy > window.innerHeight - 420 ? "haut" : "bas";
    setAncrage(`${h}-${v}`);
  };

  const survoler = (p: Projet, e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setActif(p.id);
    setApercu(p);
    placer(e.clientX, e.clientY, true);
  };

  const enLumiere = (id: string) => actif === id || feuille?.id === id;
  const estompe = (p: Projet) => filtre !== null && !p.domaines.includes(filtre);

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setActif(null);
          setFeuille(null);
        }
      }}
    >
      <figure aria-labelledby={`${masqueId}-legende`} className="m-0">
        <div
          ref={cadreRef}
          className={`carte carte-papier relative aspect-4/5 overflow-hidden border border-carte-trait/40 md:aspect-16/10 ${
            vu ? "carte-vue" : ""
          }`}
          style={{ "--debut": `${DEBUT_ITINERAIRE}s`, "--duree": `${DUREE_ITINERAIRE}s` } as CSSProperties}
        >
          {/* Grille de coordonnées 20 × 20, en fond CSS */}
          <div aria-hidden="true" className="carte-grille-fond absolute inset-0" />

          {/* Relief de Fianarantsoa en couche de contexte */}
          {estClient && (
            <Relief
              contexte="carte"
              className="absolute inset-0 h-full w-full text-carte-trait opacity-35"
              joue={vu}
              duree={1.2}
            />
          )}

          <ComposableMap
            width={vue.w}
            height={vue.h}
            projection={IDENTITE}
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 h-full w-full"
          >
            {/* Graduations du cadre, plus longues tous les 25 % : un seul tracé */}
            <path d={graduations(vue.w, vue.h, px)} stroke="var(--carte-trait)" strokeOpacity={0.55} strokeWidth={px(1)} />

            {/* Méridiens : changement d'année */}
            <g stroke="var(--carte-trait)" strokeOpacity={0.4} strokeWidth={px(1)} strokeDasharray={`${px(2)} ${px(5)}`}>
              {MERIDIENS.map((m) => (
                <line key={m} x1={(m * vue.w) / 100} y1={px(34)} x2={(m * vue.w) / 100} y2={vue.h - px(14)} />
              ))}
            </g>

            {/* Parallèles : un domaine par latitude */}
            <g strokeWidth={px(1)} strokeDasharray={`${px(1)} ${px(5)}`} strokeLinecap="round">
              {PARALLELES.map((p) => (
                <line
                  key={p.domaine}
                  x1={vue.w * (etroite ? 0.03 : 0.085)}
                  y1={(p.y * vue.h) / 100}
                  x2={vue.w * 0.97}
                  y2={(p.y * vue.h) / 100}
                  stroke={domainesCouleurs[p.domaine]}
                  strokeOpacity={filtre && filtre !== p.domaine ? 0.15 : 0.6}
                  style={{ transition: "stroke-opacity 300ms ease" }}
                />
              ))}
            </g>

            {/* Itinéraire chronologique : pointillés révélés par un masque qui se dessine */}
            <defs>
              <mask id={masqueId} maskUnits="userSpaceOnUse" x={0} y={0} width={vue.w} height={vue.h}>
                <path
                  d={itineraire}
                  pathLength={1000}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={px(8)}
                  strokeLinecap="round"
                  className="trace-itineraire"
                />
              </mask>
            </defs>
            <path
              d={itineraire}
              mask={`url(#${masqueId})`}
              fill="none"
              stroke="var(--carte-trait)"
              strokeOpacity={filtre ? 0.25 : 0.6}
              strokeWidth={px(1.25)}
              strokeDasharray={`${px(6)} ${px(5)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-opacity 300ms ease" }}
            />

            {/* Projets */}
            {POINTS.map((p) => {
              const on = enLumiere(p.projet.id);
              const couleur = domainesCouleurs[p.domaine];
              return (
                <Marker key={p.projet.id} coordinates={[(p.x * vue.w) / 100, (p.y * vue.h) / 100]}>
                  <g style={{ opacity: estompe(p.projet) ? 0.2 : 1, transition: "opacity 300ms ease" }}>
                    {/* Apparition en CSS, au moment où l'itinéraire atteint le point */}
                    <g
                      className={`point-carte ${on ? "est-actif" : ""}`}
                      style={{ "--delai": `${apparition(p.projet.id)}s` } as CSSProperties}
                    >
                      <circle className="halo-carte" r={px(vue.rayon * 3.2)} fill="none" stroke={couleur} strokeWidth={px(1)} />
                      <circle
                        className="pastille-carte"
                        r={px(vue.rayon)}
                        fill={couleur}
                        stroke="var(--carte-fond)"
                        strokeWidth={px(1.5)}
                      />
                    </g>
                  </g>
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Années, au-dessus de chaque bande */}
          <ul aria-hidden="true">
            {BANDES.map((b) => (
              <li
                key={b.annee}
                className="coord absolute top-[2.4%] -translate-x-1/2 text-ink-soft"
                style={{ left: `${b.centre}%` }}
              >
                {b.annee}
              </li>
            ))}
          </ul>

          {/* Domaines, en marge gauche (grand écran) */}
          <ul aria-hidden="true" className="hidden md:block">
            {PARALLELES.map((p) => (
              <li
                key={p.domaine}
                className="coord absolute left-[1.6%] -translate-y-1/2 text-[0.625rem] uppercase tracking-[0.12em] text-carte-secondaire"
                style={{ top: `${p.y}%` }}
              >
                {domaineLabel[p.domaine][locale]}
              </li>
            ))}
          </ul>

          <Medaillon titre={t("situation")} ville={profil.localisation[locale].split(",")[0]} />

          {/* Cartouche, à la manière des planches d'atlas */}
          <div
            aria-hidden="true"
            className="absolute bottom-[3.5%] left-[2.2%] hidden border border-carte-trait/40 bg-carte-fond/90 px-3 py-2 md:block"
          >
            <p className="coord uppercase text-ink">
              {t("planche")} — {t("cartouche")}
            </p>
            <p className="coord mt-0.5 text-[0.625rem] text-ink-soft">{t("axes")}</p>
          </div>
          <p aria-hidden="true" className="coord absolute bottom-[2.2%] right-[2.5%] hidden uppercase text-ink-soft md:block">
            {t("temps")} →
          </p>

          {/* Les points cliquables : de vrais liens, dans l'ordre des numéros */}
          <ul aria-label={t("points")} className="absolute inset-0">
            {POINTS.map((p) => {
              const gauche = p.x > 80;
              const delai = apparition(p.projet.id) + 0.15;
              return (
                <li key={p.projet.id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  <Link
                    href={`/projets/${p.projet.id}`}
                    transitionTypes={["nav-forward"]}
                    aria-label={`${pad(p.projet.numero)} — ${p.projet.titre[locale]} (${p.projet.annee})`}
                    className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-offset-0 transition-opacity duration-300"
                    style={{ opacity: estompe(p.projet) ? 0.25 : 1 }}
                    onPointerDown={(e) => {
                      pointeur.current = e.pointerType;
                    }}
                    onKeyDown={() => {
                      pointeur.current = "clavier";
                    }}
                    onPointerEnter={(e) => survoler(p.projet, e)}
                    onPointerMove={(e) => e.pointerType === "mouse" && placer(e.clientX, e.clientY)}
                    onPointerLeave={() => setActif(null)}
                    onFocus={(e) => {
                      if (!finePointer || pointeur.current === "mouse") return;
                      const r = e.currentTarget.getBoundingClientRect();
                      setActif(p.projet.id);
                      setApercu(p.projet);
                      placer(r.left + r.width / 2, r.top + r.height / 2, true);
                    }}
                    onBlur={() => setActif(null)}
                    onClick={(e) => {
                      // Au doigt, un premier tap ouvre l'aperçu au lieu de quitter la page.
                      if (pointeur.current === "touch" || pointeur.current === "pen") {
                        e.preventDefault();
                        setFeuille(p.projet);
                      }
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className={`etiquette-carte pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${
                        gauche ? "right-[calc(50%+0.9rem)] text-right" : "left-[calc(50%+0.9rem)]"
                      }`}
                      style={{ "--delai": `${delai}s` } as CSSProperties}
                    >
                      <span
                        className={`coord block transition-colors duration-200 ${
                          enLumiere(p.projet.id) ? "text-accent-ink" : "text-ink"
                        }`}
                      >
                        {pad(p.projet.numero)}
                      </span>
                      <span className="hidden text-[0.625rem] uppercase leading-tight tracking-[0.14em] text-carte-secondaire md:block">
                        {domaineLabel[p.domaine][locale]}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile : feuille d'aperçu en bas de la carte */}
          {feuille && (
            <motion.div
              key={feuille.id}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE_SIGNATURE }}
              className="absolute inset-x-0 bottom-0 z-10 border-t border-carte-trait bg-paper p-4"
              role="dialog"
              aria-label={feuille.titre[locale]}
            >
              <div className="flex gap-4">
                <Vignette projet={feuille} locale={locale} className="w-28 shrink-0" />
                <div className="min-w-0 flex-1">
                  <Entete projet={feuille} locale={locale} />
                  <Link
                    href={`/projets/${feuille.id}`}
                    transitionTypes={["nav-forward"]}
                    className="coord mt-3 inline-block uppercase text-accent-ink underline underline-offset-4"
                  >
                    {t("voir")} →
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => setFeuille(null)}
                  aria-label={t("fermer")}
                  className="coord -mr-1 -mt-1 size-9 shrink-0 self-start text-base text-ink-soft"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </div>
        <figcaption id={`${masqueId}-legende`} className="sr-only">
          {t("description", { count: POINTS.length })}
        </figcaption>
      </figure>

      {/* Desktop : panneau qui suit le curseur avec inertie */}
      {finePointer && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ x: sx, y: sy }}
        >
          <motion.div
            initial={false}
            animate={{ opacity: actif ? 1 : 0, scale: actif ? 1 : 0.97 }}
            transition={{ duration: 0.2 }}
            className={`w-[20rem] border border-carte-trait bg-paper transition-transform duration-500 ease-signature ${ANCRAGES[ancrage]}`}
          >
            {apercu && (
              <>
                <Vignette projet={apercu} locale={locale} className="border-b border-carte-trait/20" />
                <div className="p-5">
                  <Entete projet={apercu} locale={locale} grand />
                  <p className="coord mt-4 uppercase text-accent-ink">{t("voir")} →</p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/* ── Morceaux ─────────────────────────────────────────────────────── */

function Entete({ projet, locale, grand = false }: { projet: Projet; locale: Locale; grand?: boolean }) {
  return (
    <>
      <p className="coord uppercase text-ink-soft">
        N° {pad(projet.numero)} · {projet.annee}
      </p>
      <p className={`mt-1.5 font-serif leading-[1.1] tracking-tight ${grand ? "text-2xl" : "text-lg"}`}>
        {projet.titre[locale]}
      </p>
      <p className="coord mt-2.5 flex flex-wrap gap-x-3 gap-y-1 uppercase text-ink-soft">
        {projet.domaines.map((d) => (
          <span key={d} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block size-2" style={{ background: domainesCouleurs[d] }} />
            {domaineLabel[d][locale]}
          </span>
        ))}
      </p>
    </>
  );
}

/** Premier visuel du projet, ou à défaut son schéma de principe. */
function Vignette({ projet, locale, className = "" }: { projet: Projet; locale: Locale; className?: string }) {
  const visuel = projet.visuels[0];
  return (
    <div className={`relative aspect-16/10 overflow-hidden bg-carte-fond ${className}`}>
      {visuel ? (
        <Image src={visuel.src} alt="" fill sizes="20rem" className="object-cover object-top" />
      ) : (
        <SchemaPrincipe etapes={projet.schema} locale={locale} compact />
      )}
    </div>
  );
}

/** Médaillon de situation : Madagascar et le point d'origine, Fianarantsoa. */
function Medaillon({ titre, ville }: { titre: string; ville: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[2.5%] top-[7%] w-[23%] border border-carte-trait/40 bg-carte-fond/90 px-1.5 pb-1.5 pt-1 md:left-auto md:right-[2.5%] md:top-[3.5%] md:w-[9%]"
    >
      <p className="coord text-[0.5625rem] uppercase text-ink-soft">{titre}</p>
      <ComposableMap
        width={MEDAILLON.w}
        height={MEDAILLON.h}
        projection={PROJECTION_MADAGASCAR}
        className="block h-auto w-full"
      >
        <Silhouette />
        <Marker coordinates={FIANARANTSOA}>
          <circle
            r={9}
            fill="none"
            stroke="var(--carte-accent)"
            strokeWidth={1.2}
            className="origin-center transform-fill motion-safe:animate-ping"
          />
          <circle r={4.5} fill="var(--carte-accent)" stroke="var(--carte-fond)" strokeWidth={1.2} />
        </Marker>
      </ComposableMap>
      <p className="coord truncate text-[0.5rem] leading-tight tracking-normal text-ink md:text-[0.5625rem]">{ville}</p>
    </div>
  );
}

function Silhouette() {
  // Tracé direct via le contexte de la carte : présent dès le rendu statique.
  const { path } = useMapContext();
  return (
    <>
      {MADAGASCAR.features.map((f, i) => (
        <path
          key={i}
          d={path(f) ?? undefined}
          fill="var(--carte-trait)"
          fillOpacity={0.1}
          stroke="var(--carte-trait)"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
      ))}
    </>
  );
}
