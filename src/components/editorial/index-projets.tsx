"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { asLocale, pad, projets, type Domaine } from "@/data/portfolio";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { CarteProjets } from "./carte-projets";
import { IndexProjetsListe } from "./index-projets-liste";
import { LegendeDomaines } from "./legende-domaines";

/**
 * Section Index, Piste A : la légende-filtre, l'atlas des projets,
 * puis la liste complète. Le même filtre pilote la carte et la liste.
 */
export function IndexProjets() {
  const t = useTranslations("carte");
  const locale = asLocale(useLocale());
  const finePointer = useFinePointer();
  const [filtre, setFiltre] = useState<Domaine | null>(null);

  const annees = projets.map((p) => p.annee);
  const domaines = new Set(projets.flatMap((p) => p.domaines)).size;

  return (
    <div>
      <LegendeDomaines filtre={filtre} onChange={setFiltre} locale={locale} />

      {/* La carte n'est jamais le seul chemin : accès direct à la liste */}
      <a
        href="#liste-projets"
        className="label sr-only focus:not-sr-only focus:mt-4 focus:inline-block focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        {t("versListe")}
      </a>

      <div className="mt-6">
        <CarteProjets locale={locale} filtre={filtre} />
      </div>

      <div className="coord mt-4 flex flex-wrap justify-between gap-x-8 gap-y-2 uppercase text-ink-soft">
        <p>
          {t("resume", {
            projets: pad(projets.length),
            domaines: pad(domaines),
            debut: Math.min(...annees),
            fin: Math.max(...annees),
          })}
        </p>
        <p className="normal-case">{finePointer ? t("indice") : t("indiceTactile")}</p>
        <p className="md:hidden">{t("axes")}</p>
      </div>

      <section id="liste-projets" aria-labelledby="liste-projets-titre" className="mt-section scroll-mt-24">
        <h3 id="liste-projets-titre" className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-light tracking-[-0.02em]">
          {t("liste")}
          <sup className="coord ml-2 align-super text-ink-soft">{pad(projets.length)}</sup>
        </h3>
        <div className="mt-6">
          <IndexProjetsListe locale={locale} filtre={filtre} />
        </div>
      </section>
    </div>
  );
}
