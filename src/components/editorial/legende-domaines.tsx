"use client";

import { useTranslations } from "next-intl";
import { domaineLabel, domainesCouleurs, pad, projets, type Domaine, type Locale } from "@/data/portfolio";

const DOMAINES = Object.keys(domainesCouleurs) as Domaine[];

/**
 * Le filtre, en légende de carte : un symbole par domaine,
 * son compteur en mono. Filtre la carte et la liste ensemble.
 */
export function LegendeDomaines({
  filtre,
  onChange,
  locale,
}: {
  filtre: Domaine | null;
  onChange: (d: Domaine | null) => void;
  locale: Locale;
}) {
  const t = useTranslations("carte");
  const compte = (d: Domaine | null) => (d ? projets.filter((p) => p.domaines.includes(d)).length : projets.length);

  return (
    <div className="flex items-baseline gap-5 border-y border-rule py-1">
      <p className="coord shrink-0 uppercase text-ink-soft">{t("legende")}</p>
      <ul
        role="list"
        aria-label={t("filtre")}
        className="defilement-discret -my-1 flex min-w-0 flex-1 gap-x-6 overflow-x-auto whitespace-nowrap pr-8 max-md:mask-[linear-gradient(to_right,#000_82%,transparent)] md:flex-wrap md:overflow-visible md:pr-0"
      >
        {[null, ...DOMAINES].map((d) => {
          const actif = filtre === d;
          return (
            <li key={d ?? "tous"} className="shrink-0">
              <button
                type="button"
                aria-pressed={actif}
                onClick={() => onChange(d)}
                className={`group flex items-center gap-2 py-2.5 transition-colors ${actif ? "text-ink" : "text-ink-soft hover:text-ink"}`}
              >
                <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 shrink-0">
                  {d ? (
                    <circle cx={6} cy={6} r={4} fill={domainesCouleurs[d]} />
                  ) : (
                    <>
                      <circle cx={6} cy={6} r={5} fill="none" stroke="currentColor" strokeWidth={1.2} />
                      <circle cx={6} cy={6} r={2} fill="currentColor" />
                    </>
                  )}
                </svg>
                <span
                  className={`text-[0.72rem] uppercase tracking-[0.14em] underline-offset-[6px] ${actif ? "underline decoration-carte-accent decoration-2" : ""}`}
                >
                  {d ? domaineLabel[d][locale] : t("tous")}
                </span>
                <span className="coord text-ink-soft">({pad(compte(d))})</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
