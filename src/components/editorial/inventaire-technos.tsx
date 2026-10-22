import { useLocale } from "next-intl";
import { asLocale, niveauLabel, niveaux, pad, technologies } from "@/data/portfolio";

/**
 * Inventaire en tableau typographique dense : toutes les technologies,
 * lisibles d'un coup d'œil, avec leur niveau écrit en toutes lettres
 * quand il est connu (aucun niveau n'est déduit).
 */
export function InventaireTechnos() {
  const locale = asLocale(useLocale());

  return (
    <div className="grid gap-x-8 gap-y-12 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-3">
      {technologies.map((groupe, gi) => (
        <section key={groupe.categorie.en} aria-labelledby={`techno-${gi}`}>
          <h3 id={`techno-${gi}`} className="label text-sage">
            {pad(gi + 1)} — {groupe.categorie[locale]}
            <sup className="ml-1 tabular-nums">{pad(groupe.items.length)}</sup>
          </h3>
          {groupe.note && <p className="mt-2 max-w-[36ch] text-sm text-ink-soft">{groupe.note[locale]}</p>}
          {groupe.items.some((item) => niveaux[item]) ? (
            <ul className="mt-4">
              {groupe.items.map((item) => {
                const niveau = niveaux[item];
                return (
                  <li key={item} className="flex items-baseline justify-between gap-4 border-b border-rule py-1.5">
                    <span className={`font-serif text-[1.05rem] leading-snug ${niveau === "expert" ? "italic text-accent-ink" : ""}`}>
                      {item}
                    </span>
                    {niveau && <span className="label shrink-0 text-ink-soft">{niveauLabel[niveau][locale]}</span>}
                  </li>
                );
              })}
            </ul>
          ) : (
            // Famille sans niveaux : une liste en ligne suffit.
            <ul className="mt-4 flex flex-wrap border-t border-rule pt-3 font-serif text-[1.05rem] leading-relaxed">
              {groupe.items.map((item, i) => (
                <li key={item}>
                  {item}
                  {i < groupe.items.length - 1 && (
                    <span aria-hidden="true" className="px-[0.4em] text-ink-soft">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
