import { useLocale, useTranslations } from "next-intl";
import { asLocale, experiences, formations, getProjet, pad } from "@/data/portfolio";
import { Link } from "@/i18n/navigation";

export function Parcours() {
  const t = useTranslations("parcours");
  const locale = asLocale(useLocale());

  return (
    <div className="space-y-20 md:space-y-28">
      {/* Expérience */}
      <section aria-labelledby="parcours-experience">
        <h3 id="parcours-experience" className="label text-sage">
          {t("experience")} <sup className="tabular-nums">{pad(experiences.length)}</sup>
        </h3>
        <ol className="mt-6">
          {experiences.map((e) => (
            <li key={e.id} className="grid gap-y-3 border-t border-rule py-6 md:grid-cols-12 md:gap-x-8 md:py-7">
              <p className={`label pt-1 md:col-span-2 ${e.enCours ? "text-accent-ink" : "text-ink-soft"}`}>{e.periode[locale]}</p>
              <div className="md:col-span-4">
                <p className="font-serif text-[clamp(1.2rem,1.5vw,1.45rem)] leading-[1.2] tracking-[-0.01em]">{e.role[locale]}</p>
                <p className="mt-1.5 text-sm text-sage">{e.structure[locale]}</p>
              </div>
              <div className="md:col-span-4">
                <p className="text-sm leading-relaxed text-ink-soft">{e.description[locale]}</p>
                <p className="label mt-3 text-ink-soft">{e.stack.join(" · ")}</p>
              </div>
              <ul className="space-y-1.5 text-[0.95rem] md:col-span-2 md:text-right">
                {e.projets.map((id) => {
                  const p = getProjet(id);
                  if (!p) return null;
                  return (
                    <li key={id}>
                      <Link
                        href={`/projets/${id}`}
                        transitionTypes={["nav-forward"]}
                        className="draw-underline font-serif italic hover:text-accent-ink"
                      >
                        <span className="sr-only">{t("seeProject")} : </span>
                        {pad(p.numero)} {p.titre[locale]}&nbsp;<span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Formation */}
      <section aria-labelledby="parcours-formation">
        <h3 id="parcours-formation" className="label text-sage">
          {t("education")} <sup className="tabular-nums">{pad(formations.length)}</sup>
        </h3>
        <ol className="mt-6">
          {formations.map((f) => (
            <li key={f.id} className="grid gap-y-1.5 border-t border-rule py-5 md:grid-cols-12 md:items-baseline md:gap-x-8">
              <p className="label text-ink-soft md:col-span-2">{f.periode[locale]}</p>
              <p className="font-serif text-[clamp(1.15rem,1.4vw,1.4rem)] leading-snug md:col-span-4">{f.titre[locale]}</p>
              <p className="text-sm text-ink-soft md:col-span-4">{f.institution[locale]}</p>
              <p className="label text-sage md:col-span-2 md:text-right">{f.type[locale]}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
