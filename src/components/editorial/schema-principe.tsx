import { libelle, pad, type EtapeSchema, type Locale } from "@/data/portfolio";

/**
 * Schéma de principe d'un projet, dessiné dans la DA du site :
 * des étapes reliées par des flèches, de gauche à droite
 * (de haut en bas sur mobile). En version compacte, il sert
 * d'aperçu dans l'Index.
 */
export function SchemaPrincipe({
  etapes,
  locale,
  compact = false,
}: {
  etapes: EtapeSchema[];
  locale: Locale;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="carte-grille-fond flex h-full w-full items-center gap-[3%] bg-carte-fond p-[6%] ring-1 ring-ink/15 [--grille-pas:12px]">
        {etapes.map((etape, i) => (
          <div key={i} className="flex min-w-0 flex-1 items-center gap-[3%]">
            <div className="min-w-0 flex-1 border border-ink/25 bg-paper px-2 py-2.5">
              <p className="label truncate text-[0.55rem] text-sage">{pad(i + 1)}</p>
              <p className="mt-1 font-serif text-[0.8rem] leading-tight text-ink">{libelle(etape.titre, locale)}</p>
            </div>
            {i < etapes.length - 1 && (
              <span aria-hidden="true" className="shrink-0 text-accent">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <ol className="carte-grille-fond grid gap-3 bg-carte-fond p-3 ring-1 ring-carte-trait/15 [--grille-pas:20px] md:auto-cols-fr md:grid-flow-col md:gap-0 md:p-6">
      {etapes.map((etape, i) => (
        <li key={i} className="relative flex flex-col md:flex-row">
          <div className="flex-1 border border-ink/20 bg-paper p-5 md:p-6">
            <p className="label text-sage">{pad(i + 1)}</p>
            <p className="mt-3 font-serif text-xl leading-tight md:text-2xl">{libelle(etape.titre, locale)}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
              {etape.elements.map((el, j) => (
                <li key={j}>{libelle(el, locale)}</li>
              ))}
            </ul>
          </div>
          {i < etapes.length - 1 && (
            <span
              aria-hidden="true"
              className="flex h-8 items-center justify-center font-serif text-xl text-accent md:h-auto md:w-10 md:shrink-0"
            >
              <span className="rotate-90 md:rotate-0">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

