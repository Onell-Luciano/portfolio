"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { asLocale, profil } from "@/data/portfolio";
import { TOPO_REPERE as REPERE } from "@/data/topographie";
import { coordonneesRelief, formaterCoordonnees } from "@/lib/geo";
import { useEstClient } from "@/lib/use-fine-pointer";
import { Relief } from "./relief";
import { Reticule } from "./reticule";

function LocalTime({ locale }: { locale: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: profil.fuseau,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [locale]);

  return <time className="tabular-nums">{time ?? "--:--"}</time>;
}

const reveal = (delay: number) => ({ animationDelay: `${delay}ms` });

export function HeroTypographique() {
  const t = useTranslations("hero");
  const tn = useTranslations("nav");
  const locale = asLocale(useLocale());
  const ref = useRef<HTMLElement>(null);
  const reliefRef = useRef<HTMLDivElement>(null);

  // Le réticule ne s'affiche que sur la partie visible du relief (disque du masque radial).
  const coordonneesSousCurseur = (cx: number, cy: number) => {
    const r = reliefRef.current?.getBoundingClientRect();
    if (!r) return null;
    const fx = (cx - r.left) / r.width;
    const fy = (cy - r.top) / r.height;
    if (Math.hypot(fx - 0.5, fy - 0.5) > 0.46) return null;
    const { lat, lon } = coordonneesRelief(fx, fy);
    return formaterCoordonnees(lat, lon, locale);
  };
  const reduce = useReducedMotion();
  const estClient = useEstClient();

  // Au défilement, le nom s'épaissit et s'adoucit (axes wght + SOFT de Fraunces),
  // et ses trois lignes s'écartent à des vitesses différentes.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wght = useTransform(scrollYProgress, [0, 0.8], [300, 820]);
  const soft = useTransform(scrollYProgress, [0, 0.8], [0, 100]);
  const fontVariationSettings = useMotionTemplate`"wght" ${wght}, "SOFT" ${soft}`;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -190]);
  const offsets = [y1, y2, y3];

  const [prenom, deuxieme, nom] = profil.lignesNom;
  const lignes = [
    { text: prenom, className: "" },
    { text: deuxieme, className: "italic pl-[14vw] md:pl-[18vw]" },
    { text: nom, className: "", final: true },
  ];

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-name"
      className="px-page relative isolate flex min-h-svh flex-col justify-between overflow-hidden pb-10 pt-28 md:pt-32"
    >
      {/* Curseur de géomètre : coordonnées réelles du point survolé sur le relief */}
      <Reticule cible={ref} libelle={coordonneesSousCurseur} />

      {/* Relief de Fianarantsoa : la cartographie comme signature */}
      <div
        ref={reliefRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-20vw] top-16 -z-10 aspect-square w-[115vw] opacity-60 sm:right-[-8vw] sm:w-[80vw] lg:right-[-4vw] lg:top-1/2 lg:w-[min(64vw,118svh)] lg:-translate-y-1/2 lg:opacity-100"
      >
        {/* Les courbes se tracent une fois la page prête (1,5 s, en cascade) :
            décor absent du HTML, il ne retarde pas le premier affichage. */}
        {estClient && (
          <Relief
            contexte="hero"
            className="h-full w-full text-carte-trait mask-[radial-gradient(closest-side,#000_55%,transparent)]"
            duree={1.5}
            delai={0.2}
          />
        )}
        <span className="absolute" style={{ left: `${REPERE.x}%`, top: `${REPERE.y}%` }}>
          <span className="absolute -left-1 -top-1 block h-2 w-2 rounded-full bg-accent" />
          <span className="absolute -left-3 -top-3 block h-6 w-6 rounded-full border border-accent/50 motion-safe:animate-ping [animation-duration:2.4s]" />
          <span className="coord absolute right-4 top-1 hidden whitespace-nowrap uppercase text-ink-soft sm:block lg:left-4 lg:right-auto">
            {profil.localisation[locale].split(",")[0]}
          </span>
        </span>
      </div>
      <p className="sr-only">{t("map")}</p>

      {/* Méta éditoriale */}
      <div className="label flex flex-col gap-y-3 text-ink-soft lg:flex-row lg:justify-between lg:gap-x-10">
        <p className="reveal-css" style={reveal(0)}>
          {profil.role[locale]} · {profil.discipline[locale]}
        </p>
        <p className="reveal-css" style={reveal(120)}>
          {profil.localisation[locale]} —{" "}
          <span className="whitespace-nowrap">
            <span className="sr-only">{t("localTime")} </span>
            <LocalTime locale={locale} /> ({profil.fuseauLabel})
          </span>
        </p>
        <p className="reveal-css text-sage" style={reveal(240)}>
          {profil.disponibilite[locale]}
        </p>
      </div>

      {/* Le nom, monumental */}
      <h1
        id="hero-name"
        aria-label={profil.nom}
        className="my-12 font-serif text-[clamp(3rem,14.8vw,12.5rem)] md:text-[clamp(3rem,13.5vw,12.5rem)] leading-[0.86] tracking-[-0.045em]"
      >
        {lignes.map((ligne, i) => (
          <motion.span
            key={ligne.text}
            aria-hidden="true"
            className="block"
            style={reduce ? undefined : { y: offsets[i] }}
          >
            <motion.span
              className={`reveal-css ${ligne.className}`}
              style={{
                ...reveal(250 + i * 120),
                fontVariationSettings: reduce ? '"wght" 300, "SOFT" 0' : fontVariationSettings,
              }}
            >
              {ligne.text}
              {ligne.final && <span className="text-accent">.</span>}
            </motion.span>
          </motion.span>
        ))}
      </h1>
      <p
        className="coord reveal-css -mt-6 mb-12 text-[0.75rem] uppercase tracking-[0.08em] text-ink-soft md:-mt-4"
        style={reveal(640)}
      >
        <span aria-hidden="true" className="mr-2 text-accent">⌖</span>
        {profil.coordonnees} · {profil.localisation[locale]}
      </p>

      {/* Phrase-manifeste + indice de scroll */}
      <div className="flex items-end justify-between gap-8">
        <p className="reveal-css max-w-[38ch] text-lg leading-snug md:text-xl" style={reveal(700)}>
          {profil.positionnement[locale]}
        </p>
        <a
          href="#cas"
          className="reveal-css shrink-0 font-serif text-lg italic text-ink-soft hover:text-accent-ink"
          style={reveal(850)}
          aria-label={tn("cas")}
        >
          ({t("scroll")}) <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
