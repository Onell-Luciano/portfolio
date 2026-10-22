import { useLocale, useTranslations } from "next-intl";
import { asLocale, nombreTechnos, niveauLabel, niveaux, pad, technologies } from "@/data/portfolio";

/** Symboles cartographiques, un par famille, dans l'ordre des données. */
const FORMES = ["cercle", "carre", "triangle", "losange", "etoile", "croix"] as const;
type Forme = (typeof FORMES)[number];

function Symbole({ forme, className = "size-3" }: { forme: Forme; className?: string }) {
  const trait = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinejoin: "round" as const };
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className={`shrink-0 ${className}`}>
      {forme === "cercle" && <circle cx={6} cy={6} r={4.4} {...trait} />}
      {forme === "carre" && <rect x={1.8} y={1.8} width={8.4} height={8.4} {...trait} />}
      {forme === "triangle" && <path d="M6 1.4 10.8 10.2H1.2Z" {...trait} />}
      {forme === "losange" && <path d="M6 1 11 6 6 11 1 6Z" {...trait} />}
      {forme === "etoile" && <path d="M6 .9 7.5 4.3 11.1 4.6 8.4 7 9.2 10.6 6 8.7 2.8 10.6 3.6 7 .9 4.6 4.5 4.3Z" {...trait} />}
      {forme === "croix" && <path d="M2 2 10 10M10 2 2 10" {...trait} strokeLinecap="round" />}
    </svg>
  );
}

/**
 * Inventaire en légende de carte : chaque famille est une entrée
 * de légende avec son symbole ; toutes les technologies sont listées,
 * avec leur niveau quand il est connu (aucun niveau n'est déduit).
 */
export function InventaireTechnos() {
  const t = useTranslations("inventaire");
  const locale = asLocale(useLocale());

  return (
    <div className="carte-papier border border-carte-trait/40">
      {/* En-tête de légende */}
      <div className="coord flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-carte-trait/25 px-5 py-3 uppercase md:px-8">
        <p className="text-ink">{t("legende")}</p>
        <p className="text-ink-soft">{t("resume", { count: nombreTechnos, groups: technologies.length })}</p>
      </div>

      <div className="grid gap-x-10 gap-y-12 px-5 py-8 sm:grid-cols-2 md:px-8 md:py-10 lg:grid-cols-3">
        {technologies.map((groupe, gi) => {
          const forme = FORMES[gi % FORMES.length];
          const avecNiveaux = groupe.items.some((item) => niveaux[item]);
          return (
            <section key={groupe.categorie.en} aria-labelledby={`techno-${gi}`}>
              <h3 id={`techno-${gi}`} className="flex items-center gap-2.5 text-carte-secondaire">
                <Symbole forme={forme} className="size-3.5" />
                <span className="label">{groupe.categorie[locale]}</span>
                <span className="coord text-ink-soft">({pad(groupe.items.length)})</span>
              </h3>
              {groupe.note && <p className="mt-2 max-w-[36ch] text-sm text-ink-soft">{groupe.note[locale]}</p>}

              <ul className={`tech-list mt-4 ${avecNiveaux ? "" : "border-t border-carte-trait/15 pt-1"}`}>
                {groupe.items.map((item) => {
                  const niveau = niveaux[item];
                  return (
                    <li
                      key={item}
                      className={`tech flex items-baseline gap-2.5 py-1 ${niveau === "expert" ? "text-accent-ink" : "text-ink"}`}
                    >
                      <Symbole forme={forme} className="size-2 self-center text-carte-secondaire" />
                      <span className={`font-serif text-[1.05rem] leading-snug ${niveau === "expert" ? "italic" : ""}`}>
                        {item}
                      </span>
                      {niveau && (
                        <>
                          {/* Points de conduite, comme dans un index d'atlas */}
                          <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-0.2em] border-b border-dotted border-ink/30" />
                          <span className="coord shrink-0 uppercase text-ink-soft">{niveauLabel[niveau][locale]}</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
