import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ViewTransition } from "react";
import { asLocale, pad, projets } from "@/data/portfolio";
import { Link } from "@/i18n/navigation";

/**
 * Les projets mis en avant : visuel réel, problème et résultat,
 * lisibles en quelques secondes. Le titre et le visuel glissent
 * vers la fiche projet (View Transitions).
 */
export function EtudesDeCas() {
  const t = useTranslations();
  const locale = asLocale(useLocale());
  const vedettes = projets.filter((p) => p.vedette && p.visuels.length > 0);

  return (
    <ol className="space-y-20 md:space-y-24">
      {vedettes.map((p, i) => {
        const visuel = p.visuels[0];
        const inverse = i % 2 === 1;
        return (
          <li key={p.id}>
            <article className="group relative grid gap-y-8 md:grid-cols-12 md:items-center md:gap-x-10">
              <div className={`md:col-span-7 ${inverse ? "md:order-2 md:col-start-6" : ""}`}>
                <ViewTransition name={`visuel-${p.id}`} share="morph" default="none">
                  <div className="overflow-hidden ring-1 ring-ink/10" style={{ maxWidth: visuel.largeur }}>
                    <Image
                      src={visuel.src}
                      alt={visuel.alt[locale]}
                      width={visuel.largeur}
                      height={visuel.hauteur}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="h-auto w-full transition-transform duration-700 ease-signature group-hover:scale-[1.015]"
                    />
                  </div>
                </ViewTransition>
              </div>

              <div className={`md:col-span-5 ${inverse ? "md:order-1 md:col-start-1" : ""}`}>
                <p className="label text-sage">
                  N° {pad(p.numero)} — {p.categorie[locale]} · {p.annee}
                </p>
                <h3 className="mt-4 font-serif text-[clamp(2rem,3.6vw,3.75rem)] font-light leading-[1] tracking-[-0.03em]">
                  <ViewTransition name={`titre-${p.id}`} share="morph" default="none">
                    <Link
                      href={`/projets/${p.id}`}
                      transitionTypes={["nav-forward"]}
                      className="transition-colors duration-200 after:absolute after:inset-0 group-hover:text-accent focus-visible:text-accent"
                    >
                      {p.titre[locale]}
                    </Link>
                  </ViewTransition>
                </h3>

                <dl className="mt-8 space-y-5">
                  <div>
                    <dt className="label text-ink-soft">{t("projet.problem")}</dt>
                    <dd className="mt-1.5 max-w-[48ch]">{p.probleme[locale]}</dd>
                  </div>
                  <div>
                    <dt className="label text-ink-soft">{t("projet.result")}</dt>
                    <dd className="mt-1.5 max-w-[48ch]">{p.resultat[locale]}</dd>
                  </div>
                </dl>

                <p aria-hidden="true" className="label draw-underline souligne-groupe mt-8 inline-block pb-0.5 group-hover:text-accent-ink">
                  {t("cas.read")} →
                </p>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
