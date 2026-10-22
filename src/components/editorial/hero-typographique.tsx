"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { asLocale, profil } from "@/data/portfolio";

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
  const reduce = useReducedMotion();

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
      className="px-page relative flex min-h-svh flex-col justify-between pb-10 pt-28 md:pt-32"
    >
      {/* Méta éditoriale */}
      <div className="label grid gap-y-3 text-ink-soft sm:grid-cols-2 lg:grid-cols-4">
        <p className="reveal-css" style={reveal(0)}>
          {t("edition", { year: new Date().getFullYear() })}
        </p>
        <p className="reveal-css" style={reveal(80)}>
          {profil.role[locale]} · {profil.discipline[locale]}
        </p>
        <p className="reveal-css" style={reveal(160)}>
          {profil.localisation[locale]} — <span className="sr-only">{t("localTime")} </span>
          <LocalTime locale={locale} /> ({profil.fuseauLabel})
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

      {/* Phrase-manifeste + indice de scroll */}
      <div className="flex items-end justify-between gap-8">
        <p className="reveal-css max-w-184 text-lg leading-snug md:text-xl" style={reveal(700)}>
          {profil.accroche[locale]}
          <span className="block text-ink-soft">{profil.statement[locale]}</span>
        </p>
        <a
          href="#manifeste"
          className="reveal-css shrink-0 font-serif text-lg italic text-ink-soft hover:text-accent-ink"
          style={reveal(850)}
          aria-label={tn("manifeste")}
        >
          ({t("scroll")}) <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
