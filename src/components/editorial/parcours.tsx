import { useLocale, useTranslations } from "next-intl";
import { asLocale, experiences, formations, getProjet, pad, profil } from "@/data/portfolio";
import { Link } from "@/i18n/navigation";
import { RevealMask } from "./reveal-mask";

export function Parcours() {
  const t = useTranslations("parcours");
  const locale = asLocale(useLocale());

  return (
    <div className="space-y-28 md:space-y-36">
      {/* Expérience */}
      <section aria-labelledby="parcours-experience">
        <h3 id="parcours-experience" className="label text-sage">
          {t("experience")} <sup className="tabular-nums">{pad(experiences.length)}</sup>
        </h3>
        <ol className="mt-8">
          {experiences.map((e, i) => (
            <li key={e.id} className="border-t border-rule py-10 md:py-12">
              <RevealMask delay={i * 0.04} className="grid gap-y-4 md:grid-cols-12 md:gap-x-8">
                <p className={`label pt-1 md:col-span-3 ${e.enCours ? "text-accent-ink" : "text-ink-soft"}`}>{e.periode[locale]}</p>
                <div className="md:col-span-6">
                  <p className="font-serif text-[clamp(1.4rem,2.1vw,2.1rem)] font-light leading-[1.15] tracking-[-0.015em]">
                    {e.role[locale]}
                  </p>
                  <p className="mt-2 text-sm text-sage">{e.structure[locale]}</p>
                  <p className="mt-5 max-w-[65ch] text-ink-soft">{e.description[locale]}</p>
                  <p className="label mt-5 text-ink-soft">{e.stack.join(" · ")}</p>
                </div>
                <ul className="space-y-2 md:col-span-3 md:text-right">
                  {e.projets.map((id) => {
                    const p = getProjet(id);
                    if (!p) return null;
                    return (
                      <li key={id}>
                        <Link href={`/projets/${id}`} className="draw-underline font-serif italic hover:text-accent-ink">
                          <span className="sr-only">{t("seeProject")} : </span>
                          {pad(p.numero)} {p.titre[locale]} <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </RevealMask>
            </li>
          ))}
        </ol>
      </section>

      {/* Formation */}
      <section aria-labelledby="parcours-formation">
        <h3 id="parcours-formation" className="label text-sage">
          {t("education")} <sup className="tabular-nums">{pad(formations.length)}</sup>
        </h3>
        <ol className="mt-8">
          {formations.map((f, i) => (
            <li key={f.id} className="border-t border-rule py-7">
              <RevealMask delay={i * 0.04} className="grid gap-y-2 md:grid-cols-12 md:items-baseline md:gap-x-8">
                <p className="label text-ink-soft md:col-span-3">{f.periode[locale]}</p>
                <p className="font-serif text-[clamp(1.2rem,1.6vw,1.6rem)] leading-snug md:col-span-4">{f.titre[locale]}</p>
                <p className="text-sm text-ink-soft md:col-span-3">{f.institution[locale]}</p>
                <p className="label text-sage md:col-span-2 md:text-right">{f.type[locale]}</p>
              </RevealMask>
            </li>
          ))}
        </ol>
      </section>

      {/* Façon de travailler */}
      <section aria-labelledby="parcours-soft" className="grid gap-y-8 border-t border-rule pt-10 md:grid-cols-12 md:gap-x-8">
        <h3 id="parcours-soft" className="label text-sage md:col-span-3">
          {t("softSkills")}
        </h3>
        <div className="md:col-span-9">
          <RevealMask>
            <p className="font-serif text-[clamp(1.4rem,2.2vw,2.2rem)] font-light leading-[1.3]">
              {profil.softSkills.map((s, i) => (
                <span key={s.en}>
                  {s[locale]}
                  {i < profil.softSkills.length - 1 && (
                    <span aria-hidden="true" className="px-[0.35em] text-ink-soft">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </RevealMask>
          <p className="mt-10 text-ink-soft">
            <span className="label mr-4 text-sage">{t("languages")}</span>
            {profil.langues[locale]}
          </p>
        </div>
      </section>
    </div>
  );
}
