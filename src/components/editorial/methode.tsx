import { useLocale, useTranslations } from "next-intl";
import { asLocale, experiences, nombreStructures, pad, premiereAnnee, profil, projets } from "@/data/portfolio";
import { RevealMask } from "./reveal-mask";
import { RichLine } from "./rich-line";

/** « Comment je travaille » : manifeste, chiffres vérifiables, domaines et savoir-être. */
export function Methode() {
  const t = useTranslations("methode");
  const locale = asLocale(useLocale());

  // Calculés depuis les données : ils restent vrais quand le parcours évolue.
  const chiffres = [
    { valeur: pad(projets.length), label: t("projects") },
    { valeur: pad(experiences.length), label: t("experiences") },
    { valeur: pad(nombreStructures), label: t("structures") },
    { valeur: String(premiereAnnee), label: t("since") },
  ];

  return (
    <div>
      <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-10 md:col-start-3">
          <p className="font-serif text-[clamp(1.6rem,3.2vw,3.25rem)] font-light leading-[1.12] tracking-[-0.02em]">
            {profil.manifeste[locale].map((ligne, i) => (
              <RevealMask key={ligne} as="span" className="block" delay={i * 0.08}>
                <RichLine text={ligne} emClassName="italic text-accent" />
              </RevealMask>
            ))}
          </p>
          <p className="mt-10 max-w-[65ch] text-ink-soft">{profil.description[locale]}</p>
        </div>
      </div>

      {/* Chiffres — calculés depuis les données */}
      <dl className="mt-section grid grid-cols-2 gap-y-10 border-t border-rule pt-10 md:grid-cols-12 md:gap-x-8">
        {chiffres.map((c, i) => (
          <div key={c.label} className={`flex flex-col md:col-span-2 ${i === 0 ? "md:col-start-3" : ""}`}>
            <dt className="label order-2 mt-3 text-ink-soft">{c.label}</dt>
            <dd className="order-1 font-serif text-[clamp(2.75rem,5.5vw,5.5rem)] font-light leading-none tracking-[-0.04em] tabular-nums">
              {c.valeur}
            </dd>
          </div>
        ))}
      </dl>

      {/* Domaines de compétence */}
      <section aria-labelledby="methode-domaines" className="mt-section grid gap-y-8 md:grid-cols-12 md:gap-x-8">
        <h3 id="methode-domaines" className="label text-sage md:col-span-2">
          {t("capabilities")}
        </h3>
        <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 md:col-span-10 lg:grid-cols-4">
          {profil.competences.map((c, i) => (
            <li key={c.titre.en}>
              <p className="font-serif text-2xl leading-tight">
                <span className="mr-2 text-base italic text-ink-soft">{String.fromCharCode(97 + i)}.</span>
                {c.titre[locale]}
              </p>
              <p className="mt-3 text-ink-soft">{c.texte[locale]}</p>
            </li>
          ))}
        </ol>
        <p className="max-w-[65ch] font-serif text-xl italic text-ink-soft md:col-span-10 md:col-start-3">
          {profil.vision[locale]}
        </p>
      </section>

      {/* Façon de travailler */}
      <section aria-labelledby="methode-soft" className="mt-section grid gap-y-8 border-t border-rule pt-10 md:grid-cols-12 md:gap-x-8">
        <h3 id="methode-soft" className="label text-sage md:col-span-2">
          {t("softSkills")}
        </h3>
        <div className="md:col-span-10">
          <ul className="grid gap-x-8 gap-y-4 font-serif text-[clamp(1.2rem,1.7vw,1.6rem)] font-light leading-snug sm:grid-cols-2 lg:grid-cols-3">
            {profil.softSkills.map((s, i) => (
              <li key={s.en} className="flex gap-3">
                <span className="label pt-1.5 tabular-nums text-sage">{pad(i + 1)}</span>
                {s[locale]}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-ink-soft">
            <span className="label mr-4 text-sage">{t("languages")}</span>
            {profil.langues[locale]}
          </p>
        </div>
      </section>
    </div>
  );
}
