"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState, useSyncExternalStore, ViewTransition, type PointerEvent, type ReactNode } from "react";
import { asLocale, domaineLabel, pad, projets, type Domaine, type Locale, type Projet } from "@/data/portfolio";
import { Link } from "@/i18n/navigation";
import { EASE_SIGNATURE } from "./reveal-mask";
import { SchemaPrincipe } from "./schema-principe";

const DOMAINES: Domaine[] = ["Full-Stack", "IA", "GIS", "Data", "Mobile"];
const PREVIEW_HIDDEN = "inset(100% 0% 0% 0%)";
const PREVIEW_SHOWN = "inset(0% 0% 0% 0%)";

type Ancrage = `${"start" | "center" | "end"}-${"above" | "below"}`;
const ANCRAGE_CLASSES: Record<Ancrage, string> = {
  "start-above": "translate-x-0 -translate-y-[calc(100%+2rem)]",
  "center-above": "-translate-x-1/2 -translate-y-[calc(100%+2rem)]",
  "end-above": "-translate-x-full -translate-y-[calc(100%+2rem)]",
  "start-below": "translate-x-0 translate-y-8",
  "center-below": "-translate-x-1/2 translate-y-8",
  "end-below": "-translate-x-full translate-y-8",
};
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function useFinePointer() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(FINE_POINTER);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

const domaines = (p: Projet, locale: Locale) => p.domaines.map((d) => domaineLabel[d][locale]).join(" · ");

/** Les projets mis en avant portent déjà ce nom de transition dans « Études de cas ». */
function TitreTransition({ projet, children }: { projet: Projet; children: ReactNode }) {
  if (projet.vedette) return children;
  return (
    <ViewTransition name={`titre-${projet.id}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

export function IndexProjets() {
  const t = useTranslations("index");
  const locale = asLocale(useLocale());
  const finePointer = useFinePointer();
  const reduce = useReducedMotion();

  const [actif, setActif] = useState<string | null>(null);
  const [filtre, setFiltre] = useState<Domaine | null>(null);
  const [ancrage, setAncrage] = useState<Ancrage>("center-above");
  const ancrageRef = useRef<Ancrage>("center-above");

  // Prévisualisation qui suit le curseur avec inertie.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });
  const rotate = useSpring(useTransform(useVelocity(sx), [-2400, 2400], [-5, 5]), { stiffness: 200, damping: 25 });

  const suivre = (e: PointerEvent, saut = false) => {
    if (e.pointerType !== "mouse") return;
    x.set(e.clientX);
    y.set(e.clientY);
    if (saut) {
      sx.jump(e.clientX);
      sy.jump(e.clientY);
    }
    // L'aperçu se place au-dessus du curseur (jamais sur la ligne survolée),
    // et bascule près des bords pour rester dans l'écran.
    const h = e.clientX < 240 ? "start" : e.clientX > window.innerWidth - 240 ? "end" : "center";
    const v = e.clientY < 340 ? "below" : "above";
    const suivant: Ancrage = `${h}-${v}`;
    if (suivant !== ancrageRef.current) {
      ancrageRef.current = suivant;
      setAncrage(suivant);
    }
  };

  const compte = (d: Domaine) => projets.filter((p) => p.domaines.includes(d)).length;

  return (
    <div>
      {/* Filtre typographique — estompe, ne masque jamais */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
        <div role="group" aria-label={t("filter")} className="flex flex-wrap gap-x-6 gap-y-3">
          {[null, ...DOMAINES].map((d) => {
            const actifFiltre = filtre === d;
            return (
              <button
                key={d ?? "all"}
                type="button"
                aria-pressed={actifFiltre}
                onClick={() => setFiltre(d)}
                className={`font-serif text-xl transition-colors ${
                  actifFiltre ? "italic text-accent-ink underline underline-offset-[6px]" : "text-ink-soft hover:text-ink"
                }`}
              >
                {d ? domaineLabel[d][locale] : t("all")}
                <sup className="ml-0.5 font-sans text-[0.65rem] tabular-nums">
                  {pad(d ? compte(d) : projets.length)}
                </sup>
              </button>
            );
          })}
        </div>
        {finePointer && <p className="label text-ink-soft">{t("hint")}</p>}
      </div>

      {/* En-tête de colonnes */}
      <div
        aria-hidden="true"
        className="label mt-12 hidden grid-cols-[3rem_auto_minmax(2rem,1fr)_11rem_3.5rem] gap-x-6 border-b border-rule pb-4 text-ink-soft md:grid"
      >
        <span>{t("colNumber")}</span>
        <span>{t("colProject")}</span>
        <span />
        <span>{t("colDomains")}</span>
        <span className="text-right">{t("colYear")}</span>
      </div>

      <ul
        className="mt-6 border-t border-rule md:mt-0 md:border-t-0"
        onPointerEnter={(e) => suivre(e, true)}
        onPointerMove={(e) => suivre(e)}
        onPointerLeave={() => setActif(null)}
      >
        {projets.map((p) => {
          const estompe = filtre !== null && !p.domaines.includes(filtre);
          return (
            <li key={p.id} className={`border-b border-rule transition-opacity duration-300 ${estompe ? "is-dimmed" : ""}`}>
              <Link
                href={`/projets/${p.id}`}
                transitionTypes={["nav-forward"]}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActif(p.id)}
                onFocus={() => setActif(null)}
                className="group grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 gap-y-1.5 py-5 outline-offset-0 md:grid-cols-[3rem_auto_minmax(2rem,1fr)_11rem_3.5rem] md:gap-x-6 md:py-6"
              >
                <span className="label tabular-nums text-ink-soft transition-colors group-hover:text-accent-ink group-focus-visible:text-accent-ink">
                  {pad(p.numero)}
                </span>

                <TitreTransition projet={p}>
                  <span className="font-serif text-[clamp(1.4rem,2.4vw,2.5rem)] font-light leading-[1.05] tracking-tight transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
                    {p.titre[locale]}
                  </span>
                </TitreTransition>

                {/* Filet de conduite qui se colore au survol */}
                <span aria-hidden="true" className="relative hidden h-px self-center bg-rule md:block">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-signature group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </span>

                <span className="label col-start-2 flex gap-4 text-ink-soft md:contents">
                  <span className="transition-colors group-hover:text-accent-ink">{domaines(p, locale)}</span>
                  <span className="tabular-nums transition-colors group-hover:text-accent-ink md:text-right">{p.annee}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop : prévisualisation flottante (visuel réel ou schéma de principe) */}
      {finePointer && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ x: reduce ? x : sx, y: reduce ? y : sy, rotate: reduce ? 0 : rotate }}
        >
          <motion.div
            animate={{ opacity: actif ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={`w-[clamp(18rem,26vw,28rem)] transition-transform duration-500 ease-signature ${ANCRAGE_CLASSES[ancrage]}`}
          >
            <div className="relative aspect-16/10 shadow-[0_24px_60px_-30px_rgba(10,10,11,0.45)]">
              {projets.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute inset-0 overflow-hidden"
                  initial={false}
                  animate={{ clipPath: actif === p.id ? PREVIEW_SHOWN : PREVIEW_HIDDEN }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE_SIGNATURE }}
                  style={{ zIndex: actif === p.id ? 2 : 1 }}
                >
                  {p.visuels[0] ? (
                    <Image src={p.visuels[0].src} alt="" fill sizes="28rem" className="object-cover object-top" />
                  ) : (
                    <SchemaPrincipe etapes={p.schema} locale={locale} compact />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
