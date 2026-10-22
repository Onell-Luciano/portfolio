"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { asLocale, profil } from "@/data/portfolio";
import { RevealMask } from "./reveal-mask";

export function Contact() {
  const t = useTranslations("contact");
  const locale = asLocale(useLocale());
  const [copie, setCopie] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const [local, domaine] = profil.email.split("@");

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(profil.email);
      setCopie(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopie(false), 2400);
    } catch {
      window.location.href = `mailto:${profil.email}`;
    }
  };

  return (
    <div>
      <RevealMask className="max-w-[24ch] font-serif text-[clamp(1.75rem,3.4vw,3.25rem)] font-light italic leading-[1.1]">
        <p>{t("heading")}</p>
      </RevealMask>
      <p className="mt-6 max-w-[65ch] text-ink-soft">{t("subheading")}</p>

      <a
        href={`mailto:${profil.email}`}
        className="group mt-20 block font-serif text-[clamp(2.1rem,9.5vw,11rem)] font-light leading-[0.95] tracking-[-0.04em] transition-colors duration-200 hover:text-accent focus-visible:text-accent"
      >
        <RevealMask as="span" className="block">
          {local}
        </RevealMask>
        <RevealMask as="span" className="block italic" delay={0.08}>
          @{domaine}
          <span aria-hidden="true" className="ml-[0.2em] inline-block transition-transform duration-300 group-hover:translate-x-[0.15em] group-hover:-translate-y-[0.15em]">
            ↗
          </span>
        </RevealMask>
      </a>

      <div className="label mt-16 flex flex-wrap gap-x-10 gap-y-4 text-ink-soft">
        <button type="button" onClick={copier} className="draw-underline pb-0.5 uppercase hover:text-accent-ink">
          {copie ? t("copied") : t("copy")}
        </button>
        <a href={profil.github} target="_blank" rel="noreferrer" className="draw-underline pb-0.5 hover:text-accent-ink">
          {t("github")} ↗
        </a>
        <a href={profil.cv} download={profil.cvNomFichier} className="draw-underline pb-0.5 hover:text-accent-ink">
          {t("cv")} ↓
        </a>
        <span className="text-sage">
          {profil.localisation[locale]} · {profil.disponibilite[locale]}
        </span>
      </div>
      <p role="status" className="sr-only">
        {copie ? t("copied") : ""}
      </p>
    </div>
  );
}
