"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import { EASE, FadeUp, Marquee, ScrollWords, SectionLabel, trackSpotlight } from "./primitives";

const SOFT_SKILLS = ["learning", "curiosity", "adaptability", "communication", "time", "initiative"];

type Capability = { title: string; text: string; icon: LucideIcon; tag: string };

/* Two crossing ribbons between hero and about */
export function Ribbons({ words }: { words: string[] }) {
  const row = (outline: boolean) =>
    words.map((w) => (
      <span key={w} className="flex items-center">
        <span
          className={`px-6 text-[clamp(1.6rem,3.6vw,3rem)] font-semibold uppercase tracking-[-0.03em] ${
            outline ? "text-outline" : "text-ink"
          }`}
        >
          {w}
        </span>
        <span className={`display-serif text-[clamp(1.6rem,3.6vw,3rem)] italic ${outline ? "text-gold" : "text-ink/70"}`}>✦</span>
      </span>
    ));

  return (
    <div className="relative z-10 my-10 overflow-hidden py-16 sm:my-16" aria-hidden="true">
      <div className="relative left-[-5%] w-[110%] -rotate-2 bg-linear-to-r from-gold-deep via-gold to-gold-pale py-4 shadow-[0_20px_80px_-20px_rgba(230,194,122,0.5)]">
        <Marquee speed={32}>{row(false)}</Marquee>
      </div>
      <div className="absolute left-[-5%] top-1/2 w-[110%] -translate-y-1/2 rotate-2 border-y border-line bg-ink/90 py-4 backdrop-blur-sm">
        <Marquee speed={40} reverse>
          {row(true)}
        </Marquee>
      </div>
    </div>
  );
}

export function About({ capabilities }: { capabilities: Capability[] }) {
  const t = useTranslations();

  return (
    <section id="about" className="relative z-10 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel label={t("capabilities.sectionLabel")} />

        <ScrollWords
          text={t("capabilities.heading")}
          className="display-serif mt-10 max-w-6xl text-[clamp(2.3rem,5.6vw,5.4rem)] leading-[1.02] text-ivory"
        />

        {/* Capability cards */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
                onPointerMove={trackSpotlight}
                className="spotlight group flex min-h-64 flex-col justify-between bg-ink-2 p-7 sm:min-h-80 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ivory-dim transition-all duration-700 group-hover:rotate-12 group-hover:border-gold/50 group-hover:text-gold group-hover:shadow-[0_0_30px_-6px_var(--gold)]">
                    <Icon size={19} strokeWidth={1.5} />
                  </span>
                  <span className="eyebrow pt-1 text-[0.56rem] text-gold/80">{c.tag}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ivory">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{c.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Philosophy */}
        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <p className="eyebrow text-mute">{t("capabilities.focus")}</p>
            <blockquote className="display-serif mt-6 text-[clamp(1.9rem,3.4vw,2.9rem)] italic leading-[1.1] text-ivory">
              <span className="text-gold">“</span>
              {t("capabilities.focusText")}
              <span className="text-gold">”</span>
            </blockquote>
            <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 font-mono text-[0.68rem] text-ivory-dim">
              <span className="text-gold">◎</span>
              {t("skills.languages")}
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h3 className="display-serif text-[clamp(1.9rem,3vw,2.6rem)] italic leading-tight text-ivory">
              {t("skills.heading")}
            </h3>
            <ul className="mt-8 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
              {SOFT_SKILLS.map((skill) => (
                <li key={skill} className="group relative flex items-center gap-4 border-b border-line py-5">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/45 transition-all duration-700 ease-(--ease-divine) group-hover:rotate-225 group-hover:bg-gold group-hover:shadow-[0_0_12px_var(--gold)]"
                  />
                  <span className="text-[1rem] leading-snug text-ivory-dim transition-colors duration-500 group-hover:text-ivory">
                    {t(`skills.soft.${skill}`)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-linear-to-r from-gold via-gold/40 to-transparent transition-transform duration-700 ease-(--ease-divine) group-hover:scale-x-100"
                  />
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
