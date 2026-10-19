"use client";

import { useTranslations } from "next-intl";
import { ArrowUp, ArrowUpRight, Copy, Download } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { CV_FILENAME, CV_URL, EMAIL, GITHUB_URL } from "./data";
import { FadeUp, LocalTime, Magnetic, SectionLabel, SplitReveal } from "./primitives";

export function Contact({ onCopyEmail }: { onCopyEmail: () => void }) {
  const t = useTranslations();
  const heading = t("contact.heading");
  const lastWord = heading.split(" ").length - 1;

  return (
    <section id="contact" className="relative z-10 overflow-hidden pb-16 pt-28 sm:pt-40">
      <div className="god-rays rotate-180 top-auto! -bottom-[20%]" aria-hidden="true" />
      <div className="aura bottom-0 left-1/2 h-136 w-240 -translate-x-1/2 translate-y-1/2 bg-gold/15" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center sm:px-8">
        <SectionLabel label={t("contact.sectionLabel")} />
        <h2 className="mt-10 max-w-6xl text-[clamp(2.8rem,8.6vw,8.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-ivory">
          <SplitReveal text={heading} accent={[lastWord]} wordClassName={(_, i) => (i === lastWord ? "text-[1.1em]" : "")} />
        </h2>
        <FadeUp delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-relaxed text-mute sm:text-base">{t("contact.subheading")}</p>
        </FadeUp>

        {/* Orbiting CTA */}
        <FadeUp delay={0.3} className="relative mt-20 flex items-center justify-center">
          <div className="pointer-events-none absolute aspect-square w-[22rem] sm:w-[28rem]" aria-hidden="true">
            <div className="halo inset-0 opacity-70" />
            <div className="orbit inset-[12%] border-dashed" />
            <div className="spin-slow absolute inset-[12%]">
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-gold shadow-[0_0_16px_4px_rgba(230,194,122,0.6)]" />
            </div>
          </div>
          <Magnetic strength={0.45}>
            <a
              href={`mailto:${EMAIL}`}
              className="btn-divine flex! h-44 w-44 flex-col rounded-full! p-0! text-center sm:h-52 sm:w-52"
            >
              <ArrowUpRight size={26} strokeWidth={1.5} />
              <span className="mt-1 text-[0.68rem]">{t("ui.sayHello")}</span>
            </a>
          </Magnetic>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-24 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={onCopyEmail} className="btn-ghost">
            <Copy size={14} />
            {t("contact.copyEmail")}
          </button>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-ghost">
            <SiGithub size={14} />
            {t("contact.github")}
          </a>
          <a href={CV_URL} download={CV_FILENAME} className="btn-ghost">
            <Download size={14} />
            {t("common.downloadCv")}
          </a>
        </FadeUp>

        <div className="mt-24 grid w-full gap-px overflow-hidden rounded-3xl border border-line bg-line text-left md:grid-cols-3">
          {[
            { label: t("contact.email"), value: EMAIL, href: `mailto:${EMAIL}` },
            { label: t("contact.github"), value: t("contact.githubTitle"), href: GITHUB_URL },
            { label: t("ui.localTime"), value: null, href: null },
          ].map((c) => (
            <div key={c.label} className="bg-ink-2/90 p-6 backdrop-blur-sm sm:p-8">
              <p className="eyebrow text-[0.58rem] text-gold">{c.label}</p>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="link-line mt-3 inline-block break-all font-mono text-sm text-ivory"
                >
                  {c.value}
                </a>
              ) : (
                <p className="mt-3 font-mono text-sm text-ivory">
                  <LocalTime /> <span className="text-mute">· {t("contact.location")}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-line pt-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="eyebrow text-[0.6rem] text-mute">{t("footer.description")}</p>
        <div className="flex items-center gap-6 font-mono text-xs text-mute">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="link-line hover:text-ivory">
            {t("footer.github")}
          </a>
          <a href={`mailto:${EMAIL}`} className="link-line hover:text-ivory">
            {t("footer.email")}
          </a>
          <a href={CV_URL} download={CV_FILENAME} className="link-line hover:text-ivory">
            CV
          </a>
          <a
            href="#home"
            aria-label={t("ui.backToTop")}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            <ArrowUp size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="mt-10 select-none overflow-hidden" aria-hidden="true">
        <p
          className="display-serif whitespace-nowrap text-center text-[15.5vw] italic leading-[0.85] text-divine"
          style={{
            maskImage: "linear-gradient(to bottom, black 35%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 95%)",
          }}
        >
          O&apos;Nell Luciano
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-line px-5 py-6 font-mono text-[0.62rem] text-mute sm:flex-row sm:justify-between sm:px-8">
        <span>
          © {year} O&apos;Nell Luciano Rasamiarison. {t("footer.rights")}
        </span>
        <span>
          <span className="text-gold">✦</span> {t("ui.crafted")}
        </span>
      </div>
    </footer>
  );
}
