"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ArrowDown, ArrowDownRight, Download } from "lucide-react";
import { CV_FILENAME, CV_URL } from "./data";
import { Counter, EASE, LocalTime, Magnetic, SplitReveal } from "./primitives";

type Stat = { key: string; value: number | null; suffix: string; label: string };

const STAT_BORDERS = [
  "",
  "border-l pl-5 lg:pl-8",
  "border-t lg:border-t-0 lg:border-l lg:pl-8",
  "border-l border-t pl-5 lg:border-t-0 lg:pl-8",
];

export function Hero({ ready, stats, onCopyEmail }: { ready: boolean; stats: Stat[]; onCopyEmail: () => void }) {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  const lines = ["lineOne", "lineTwo", "lineThree", "lineFour", "lineFive"].map((k) => t(`hero.headline.${k}`));
  const before = lines.slice(0, 3).join(" ").split(" ").length;
  const accentCount = lines[3].split(" ").length;
  const accent = Array.from({ length: accentCount }, (_, i) => before + i);

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pb-8 pt-28 sm:pt-36">
      <div className="god-rays" aria-hidden="true" />
      <div className="aura -left-40 top-20 h-136 w-136 bg-gold/10" aria-hidden="true" />
      <div className="aura -right-40 top-80 h-120 w-120 bg-celestial/10" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Meta row */}
        {/* <motion.div {...appear(0.05)} className="flex flex-wrap items-center justify-between gap-4">
          <span className="glass inline-flex items-center gap-3 rounded-full px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="eyebrow text-[0.6rem] text-ivory-dim">{t("ui.available")}</span>
          </span>
          <span className="eyebrow hidden text-[0.62rem] text-mute sm:inline-flex sm:items-center sm:gap-2">
            {t("hero.timezone")}
            <span className="text-gold">✦</span>
            <LocalTime className="text-ivory" />
          </span>
        </motion.div> */}

        <div className="mt-12 grid items-center gap-16 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-7 xl:col-span-8">
            <motion.p {...appear(0.1)} className="eyebrow text-gold">
              ✦&nbsp;&nbsp;{t("hero.eyebrow")} <span className="text-mute">/ {t("hero.discipline")}</span>
            </motion.p>

            <h1 className="mt-7 text-[clamp(2.75rem,7.6vw,7.4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-ivory">
              <SplitReveal
                text={lines.join(" ")}
                play={ready}
                delay={0.2}
                stagger={0.07}
                accent={accent}
                wordClassName={(_, i) => (accent.includes(i) ? "text-[1.12em] leading-[0.8] tracking-[-0.02em]" : "")}
              />
            </h1>

            <motion.div {...appear(0.85)} className="mt-10 flex max-w-xl gap-5">
              <span className="mt-2 h-px w-10 shrink-0 bg-gold" />
              <div>
                <p className="display-serif text-[1.7rem] italic leading-tight tracking-normal text-ivory sm:text-[2rem]">{t("hero.statement")}</p>
                <p className="mt-4 text-sm leading-relaxed text-mute sm:text-[0.95rem]">{t("hero.description")}</p>
              </div>
            </motion.div>

            <motion.div {...appear(1)} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#projects" className="btn-divine">
                  {t("hero.viewWork")}
                  <ArrowDownRight size={15} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={CV_URL} download={CV_FILENAME} className="btn-ghost">
                  <Download size={14} />
                  {t("common.downloadCv")}
                </a>
              </Magnetic>
              <button type="button" onClick={onCopyEmail} className="link-line eyebrow ml-2 text-[0.62rem] text-mute transition-colors hover:text-ivory">
                {t("hero.copyEmail")}
              </button>
            </motion.div>
          </motion.div>

          {/* Portrait — cadre arrondi, moderne, chaleureux */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
            className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:col-span-5 lg:max-w-none xl:col-span-4"
          >
            {/* Aura douce derrière — plus de halo conique */}
            <div
              aria-hidden="true"
              className="aura -inset-8 bg-celestial/20 blur-3xl"
            />

            {/* Petite étoile/point déco au lieu du badge tournant */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-3 z-20 h-3 w-3 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(79,140,255,0.6)]"
            />

            {/* Cadre arrondi asymétrique (style "arch") au lieu d'un cercle parfait */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tl-[8rem] border border-line-strong bg-ink-2 shadow-[0_40px_100px_-30px_rgba(79,140,255,0.35)] transition-transform duration-700 ease-out hover:-rotate-1">
              <motion.div
                style={{ y: imageY, scale: 1.08, transformOrigin: "50% 40%" }}
                className="absolute inset-0"
              >
                <Image
                  src="/image/profile/jqcDP.png"
                  alt="O'Nell Luciano Rasamiarison — Full-Stack & AI Developer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 34vw"
                  className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Dégradé très discret, uniquement dans les coins inférieurs */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent opacity-70" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(79,140,255,0.18),transparent_55%)] mix-blend-screen" />

              {/* Badge "disponible" discret en bas à gauche */}
              <div className="absolute bottom-4 left-4 z-10">
                <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="eyebrow text-[0.55rem] text-ivory-dim">
                    {t("ui.available")}
                  </span>
                </span>
              </div>
            </div>

            {/* Signature déplacée SOUS la photo, plus discrète */}
            <div className="mt-4 flex items-center justify-between px-1">
              <div>
                <p className="text-sm font-medium text-ivory">O&apos;Nell Luciano</p>
                <p className="eyebrow mt-0.5 text-[0.55rem] text-mute">Rasamiarison</p>
              </div>
              <span className="eyebrow text-[0.55rem] text-gold">
                MG ✦ {new Date().getFullYear()}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div {...appear(1.15)} className="mt-24 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.key} className={`border-line py-7 ${STAT_BORDERS[i]}`}>
              <p className="display-serif text-5xl leading-none text-ivory sm:text-6xl">
                {s.value !== null ? (
                  <Counter value={s.value} suffix={s.suffix} />
                ) : (
                  <span className="text-divine italic">✦</span>
                )}
              </p>
              <p className="eyebrow mt-3 text-[0.6rem] text-mute">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
