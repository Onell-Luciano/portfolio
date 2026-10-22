import { useLocale, useTranslations } from "next-intl";
import { asLocale, nombreTechnos, pad, profil, projets } from "@/data/portfolio";
import { RevealMask } from "./reveal-mask";
import { RichLine } from "./rich-line";

export function Manifeste() {
  const t = useTranslations("manifeste");
  const locale = asLocale(useLocale());

  const chiffres = [
    { valeur: profil.anneesExperience, label: t("years") },
    { valeur: pad(projets.length), label: t("projects") },
    { valeur: String(nombreTechnos), label: t("techs") },
  ];

  return (
    <section id="manifeste" aria-labelledby="manifeste-title" className="px-page py-section">
      <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <h2 id="manifeste-title" className="label text-sage md:col-span-2 md:pt-4">
          (01) {t("label")}
        </h2>

        <div className="md:col-span-10">
          <p className="font-serif text-[clamp(1.75rem,3.5vw,3.5rem)] font-light leading-[1.12] tracking-[-0.02em]">
            {profil.manifeste[locale].map((ligne, i) => (
              <RevealMask key={ligne} as="span" className="block" delay={i * 0.08}>
                <RichLine text={ligne} emClassName="italic text-accent" />
              </RevealMask>
            ))}
          </p>

          <RevealMask delay={0.35} className="mt-12 max-w-[65ch] text-ink-soft">
            <p>{profil.description[locale]}</p>
          </RevealMask>
        </div>
      </div>

      {/* Chiffres — calculés depuis les données */}
      <dl className="mt-section grid gap-y-10 border-t border-rule pt-10 sm:grid-cols-3 md:grid-cols-12 md:gap-x-8">
        {chiffres.map((c, i) => (
          <div key={c.label} className={`flex flex-col ${i === 0 ? "md:col-span-4 md:col-start-3" : "md:col-span-3"}`}>
            <dt className="label order-2 mt-3 text-ink-soft">{c.label}</dt>
            <dd className="order-1 font-serif text-[clamp(3.5rem,7vw,7rem)] font-light leading-none tracking-[-0.04em] tabular-nums">
              <RevealMask as="span" className="block" delay={i * 0.08}>
                {c.valeur}
              </RevealMask>
            </dd>
          </div>
        ))}
      </dl>

      {/* Domaines de compétence */}
      <div className="mt-24 grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <h3 className="label text-sage md:col-span-2">{t("capabilities")}</h3>
        <RevealMask className="md:col-span-10">
          <p className="max-w-[40ch] font-serif text-[clamp(1.4rem,2.2vw,2.2rem)] font-light leading-[1.2]">
            {profil.ambition[locale]}
          </p>
        </RevealMask>
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-10 md:col-start-3 lg:grid-cols-4">
          {profil.competences.map((c, i) => (
            <li key={c.titre.en}>
              <RevealMask delay={i * 0.05}>
                <p className="font-serif text-2xl leading-tight">
                  <span className="mr-2 text-base italic text-ink-soft">{String.fromCharCode(97 + i)}.</span>
                  {c.titre[locale]}
                </p>
                <p className="mt-3 text-ink-soft">{c.texte[locale]}</p>
              </RevealMask>
            </li>
          ))}
        </ol>
        <p className="max-w-[65ch] font-serif text-xl italic text-ink-soft md:col-span-10 md:col-start-3">
          {profil.vision[locale]}
        </p>
      </div>
    </section>
  );
}
