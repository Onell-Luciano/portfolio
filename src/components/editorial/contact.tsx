"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { asLocale, profil } from "@/data/portfolio";
import { RevealMask } from "./reveal-mask";

/** Décalage UTC d'un fuseau, en heures (« GMT+3 » → 3), heure d'été comprise. */
function decalage(timeZone: string) {
  const nom = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName")?.value;
  const m = nom?.match(/GMT([+-]\d+)(?::(\d+))?/);
  return m ? Number(m[1]) + Math.sign(Number(m[1])) * (Number(m[2] ?? 0) / 60) : 0;
}

/** Écart avec Paris, calculé dans le navigateur (il change avec l'heure d'été). */
function EcartParis() {
  const t = useTranslations("contact");
  const heures = useSyncExternalStore(
    () => () => {},
    () => decalage(profil.fuseau) - decalage("Europe/Paris"),
    () => null, // rendu serveur : l'écart dépend de la date du visiteur
  );

  if (heures === null || heures <= 0) return null;
  return <> — {t("ahead", { hours: heures })}</>;
}

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

  const infos = [
    { label: t("role"), valeur: `${profil.role[locale]} · ${profil.discipline[locale]}` },
    { label: t("availability"), valeur: profil.disponibilite[locale] },
    {
      label: t("timezone"),
      valeur: (
        <>
          {profil.localisation[locale]} · {profil.fuseauLabel}
          <EcartParis />
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-6">
          <p className="max-w-[22ch] font-serif text-[clamp(1.6rem,3vw,2.75rem)] font-light italic leading-[1.1]">{t("heading")}</p>
          <p className="mt-5 max-w-[52ch] text-ink-soft">{t("subheading")}</p>
        </div>
        <dl className="space-y-5 md:col-span-5 md:col-start-8">
          {infos.map((info) => (
            <div key={info.label} className="border-t border-rule pt-3">
              <dt className="label text-sage">{info.label}</dt>
              <dd className="mt-1">{info.valeur}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href={`mailto:${profil.email}`}
        className="group mt-16 block font-serif text-[clamp(2.1rem,9vw,10rem)] font-light leading-[0.95] tracking-[-0.04em] transition-colors duration-200 hover:text-accent focus-visible:text-accent md:mt-24"
      >
        <span className="sr-only">{t("write")} : </span>
        <RevealMask as="span" className="block">
          {local}
        </RevealMask>
        <RevealMask as="span" className="block italic" delay={0.08}>
          @{domaine}
          <span aria-hidden="true" className="ml-[0.2em] inline-block transition-transform duration-300 group-hover:translate-x-[0.15em]">
            →
          </span>
        </RevealMask>
      </a>

      <div className="label mt-14 flex flex-wrap gap-x-10 gap-y-4 text-ink-soft">
        <button type="button" onClick={copier} className="draw-underline pb-0.5 uppercase hover:text-accent-ink">
          {copie ? t("copied") : t("copy")}
        </button>
        <a href={profil.github} target="_blank" rel="noreferrer" className="draw-underline pb-0.5 hover:text-accent-ink">
          {t("github")} ↗
        </a>
        <a href={profil.cv} download={profil.cvNomFichier} className="draw-underline pb-0.5 hover:text-accent-ink">
          {t("cv")} ↓
        </a>
      </div>
      <p role="status" className="sr-only">
        {copie ? t("copied") : ""}
      </p>
    </div>
  );
}
