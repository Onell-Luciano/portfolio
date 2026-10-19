"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import type { Experience as ExperienceItem } from "./data";
import { EASE, FadeUp, SectionLabel, SplitReveal } from "./primitives";

export function Experience({ items }: { items: ExperienceItem[] }) {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="relative z-10 py-24 sm:py-36">
      <div className="aura -left-60 top-1/3 h-120 w-120 bg-celestial/8" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="self-start lg:sticky lg:top-32 lg:col-span-4">
          <SectionLabel label={t("experience.sectionLabel")} />
          <h2 className="display-serif mt-8 text-[clamp(2.4rem,4.4vw,4.2rem)] text-ivory">
            <SplitReveal text={t("experience.heading")} />
          </h2>
          <div className="mt-12 hidden items-end gap-4 lg:flex">
            <span className="display-serif text-[8rem] italic leading-[0.8] text-divine">{String(items.length).padStart(2, "0")}</span>
            <span className="eyebrow pb-3 text-[0.6rem] text-mute">
              2024
              <span className="mx-2 text-gold">—</span>
              {t("ui.now")}
            </span>
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-8">
          <div className="absolute bottom-3 left-1.75 top-3 w-px bg-line" aria-hidden="true" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute bottom-3 left-1.75 top-3 w-px origin-top bg-linear-to-b from-gold-pale via-gold to-gold-deep shadow-[0_0_12px_rgba(230,194,122,0.6)]"
            aria-hidden="true"
          />

          {items.map((exp) => (
            <FadeUp key={exp.key} className="relative pb-16 pl-12 last:pb-0 sm:pl-16">
              <span className="absolute left-0 top-1 flex h-3.75 w-3.75 items-center justify-center rounded-full border border-gold/60 bg-ink">
                {exp.current && <span className="pulse-ring absolute inset-0 rounded-full bg-gold/60" />}
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow text-[0.62rem] text-gold">{exp.period}</span>
                {exp.current && (
                  <span className="eyebrow rounded-full bg-gold px-2.5 py-1 text-[0.52rem] font-semibold text-ink">{t("ui.now")}</span>
                )}
              </div>
              <h3 className="display-serif mt-4 text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.05] text-ivory">{exp.role}</h3>
              <p className="mt-2 text-sm font-medium text-ivory-dim">{exp.company}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute">{exp.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-line px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-mute">
                    {tech}
                  </span>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

type EducationItem = { key: string; period: string; title: string; institution: string; badge: string };

export function Education({ items }: { items: EducationItem[] }) {
  const t = useTranslations();

  return (
    <section id="education" className="relative z-10 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel label={t("education.sectionLabel")} />
        <h2 className="display-serif mt-8 max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] text-ivory">
          <SplitReveal text={t("education.heading")} />
        </h2>

        <div className="mt-16 border-t border-line">
          {items.map((e, i) => (
            <motion.div
              key={e.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.04 }}
              className="row-sweep group grid gap-3 border-b border-line px-1 py-7 md:grid-cols-12 md:items-center md:gap-6 md:px-4"
            >
              <span className="font-mono text-[0.65rem] text-mute transition-colors duration-500 group-hover:text-gold md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-serif text-[1.75rem] leading-tight text-ivory transition-transform duration-700 ease-(--ease-divine) group-hover:translate-x-2 sm:text-[2rem] md:col-span-5">
                {e.title}
              </h3>
              <p className="text-sm leading-relaxed text-mute md:col-span-4">{e.institution}</p>
              <div className="flex items-center justify-between gap-3 md:col-span-2 md:flex-col md:items-end">
                <span className="eyebrow rounded-full border border-gold/30 px-3 py-1 text-[0.52rem] text-gold">{e.badge}</span>
                <span className="font-mono text-[0.62rem] text-ivory-dim md:text-right">{e.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
