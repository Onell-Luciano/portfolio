import { useLocale, useTranslations } from "next-intl";
import { asLocale, niveauLabel, niveaux, pad, technologies, type Niveau } from "@/data/portfolio";
import { RevealMask } from "./reveal-mask";

// La maîtrise se lit dans la graisse de Fraunces, pas dans une icône.
const GRAISSE: Record<Niveau | "aucun", number> = {
  expert: 700,
  advanced: 380,
  intermediate: 240,
  aucun: 380,
};

export function InventaireTechnos() {
  const t = useTranslations("inventaire");
  const locale = asLocale(useLocale());

  return (
    <div>
      <p className="label flex flex-wrap items-baseline gap-x-4 gap-y-2 text-ink-soft">
        {t("legend")}
        {(["expert", "advanced", "intermediate"] as Niveau[]).map((n) => (
          <span key={n} className="font-serif text-lg normal-case tracking-normal text-ink" style={{ fontWeight: GRAISSE[n] }}>
            {niveauLabel[n][locale]}
          </span>
        ))}
      </p>

      <div className="mt-14">
        {technologies.map((groupe, gi) => (
          <section
            key={groupe.categorie.en}
            aria-labelledby={`techno-${gi}`}
            className="grid gap-y-6 border-t border-rule py-10 md:grid-cols-12 md:gap-x-8 md:py-12"
          >
            <div className="md:col-span-3">
              <h3 id={`techno-${gi}`} className="label text-sage">
                {pad(gi + 1)} — {groupe.categorie[locale]}
                <sup className="ml-1 tabular-nums">{pad(groupe.items.length)}</sup>
              </h3>
              {groupe.note && <p className="mt-3 max-w-[28ch] text-sm text-ink-soft">{groupe.note[locale]}</p>}
            </div>

            <RevealMask delay={0.05} className="md:col-span-9">
              <ul className="tech-list flex flex-wrap font-serif text-[clamp(1.5rem,2.7vw,2.6rem)] leading-[1.3] tracking-[-0.015em]">
                {groupe.items.map((item, i) => {
                  const niveau = niveaux[item];
                  return (
                    <li key={item} className="tech">
                      <span style={{ fontWeight: GRAISSE[niveau ?? "aucun"] }}>{item}</span>
                      {niveau && <span className="sr-only"> ({niveauLabel[niveau][locale]})</span>}
                      {i < groupe.items.length - 1 && (
                        <span aria-hidden="true" className="px-[0.35em] font-light text-ink-soft">
                          ·
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </RevealMask>
          </section>
        ))}
      </div>
    </div>
  );
}
