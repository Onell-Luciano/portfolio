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
import { useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import { asLocale, domaineLabel, pad, projets, type Domaine, type Locale, type Projet } from "@/data/portfolio";
import { Link } from "@/i18n/navigation";
import { EASE_SIGNATURE, RevealMask } from "./reveal-mask";

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

/** Planche typographique pour les projets sans visuel. */
function Planche({ projet, compact = false }: { projet: Projet; compact?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-sage p-[8%] text-paper">
      <span className={`font-serif italic leading-none ${compact ? "text-[0.8rem]" : "text-[5.5rem]"}`}>
        {pad(projet.numero)}
      </span>
      {!compact && <span className="label opacity-80">{projet.stack.slice(0, 3).join(" · ")}</span>}
    </div>
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
  const rotate = useSpring(useTransform(useVelocity(sx), [-2400, 2400], [-7, 7]), { stiffness: 200, damping: 25 });

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

      {/* En-tête de colonnes */}
      <div
        aria-hidden="true"
        className="label mt-14 hidden grid-cols-[3rem_minmax(1.5rem,1fr)_auto_4.5rem_9rem] gap-x-6 border-b border-rule pb-4 text-ink-soft md:grid"
      >
        <span>{t("colNumber")}</span>
        <span />
        <span className="text-right">{t("colProject")}</span>
        <span>{t("colYear")}</span>
        <span className="text-right">{t("colDomains")}</span>
      </div>

      <ul
        className="mt-6 border-t border-rule md:mt-0 md:border-t-0"
        onPointerEnter={(e) => suivre(e, true)}
        onPointerMove={(e) => suivre(e)}
        onPointerLeave={() => setActif(null)}
      >
        {projets.map((p, i) => {
          const estompe = filtre !== null && !p.domaines.includes(filtre);
          return (
            <li key={p.id} className={`border-b border-rule transition-opacity duration-300 ${estompe ? "is-dimmed" : ""}`}>
              <RevealMask delay={i * 0.05}>
                <Link
                  href={`/projets/${p.id}`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActif(p.id)}
                  className="group grid grid-cols-[2.25rem_1fr_40px] items-start gap-x-3 gap-y-2 py-6 outline-offset-0 md:grid-cols-[3rem_minmax(1.5rem,1fr)_auto_4.5rem_9rem] md:items-center md:gap-x-6 md:py-7"
                >
                  <span className="label col-start-1 row-start-1 pt-2 tabular-nums text-ink-soft transition-colors group-hover:text-accent-ink group-focus-visible:text-accent-ink md:col-auto md:row-auto md:pt-0">
                    {pad(p.numero)}
                  </span>

                  {/* Filet de conduite qui se colore au survol */}
                  <span aria-hidden="true" className="relative hidden h-px bg-rule md:block">
                    <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-signature group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </span>

                  <span className="col-start-2 row-start-1 origin-left font-serif text-[clamp(1.6rem,3.4vw,3.6rem)] font-light leading-[1.02] tracking-tight transition-[transform,color] duration-200 group-hover:scale-[1.02] group-hover:text-accent group-focus-visible:text-accent md:col-auto md:row-auto">
                    {p.titre[locale]}
                  </span>

                  <span className="label col-start-2 row-start-2 flex gap-4 text-ink-soft md:contents">
                    <span className="tabular-nums transition-colors group-hover:text-accent-ink">{p.annee}</span>
                    <span className="transition-colors group-hover:text-accent-ink md:text-right">
                      {domaines(p, locale)}
                    </span>
                  </span>

                  {/* Mobile : vignette fixe discrète */}
                  <span aria-hidden="true" className="relative col-start-3 row-span-2 row-start-1 mt-1 h-10 w-10 overflow-hidden opacity-60 md:hidden">
                    {p.visuels[0] ? (
                      <Image src={p.visuels[0].src} alt="" fill sizes="40px" className="object-cover" />
                    ) : (
                      <Planche projet={p} compact />
                    )}
                  </span>
                </Link>
              </RevealMask>
            </li>
          );
        })}
      </ul>

      {/* Desktop : prévisualisation flottante */}
      {finePointer && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ x: reduce ? x : sx, y: reduce ? y : sy, rotate: reduce ? 0 : rotate }}
        >
          <motion.div
            animate={{ opacity: actif ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={`w-[clamp(16rem,24vw,26rem)] transition-transform duration-500 ease-signature ${ANCRAGE_CLASSES[ancrage]}`}
          >
            <div className="relative aspect-16/10">
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
                    <Image src={p.visuels[0].src} alt="" fill sizes="26rem" className="object-cover object-top" />
                  ) : (
                    <Planche projet={p} />
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
