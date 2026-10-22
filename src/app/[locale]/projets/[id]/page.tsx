import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Colophon } from "@/components/editorial/colophon";
import { Header } from "@/components/editorial/header";
import { RevealMask } from "@/components/editorial/reveal-mask";
import { asLocale, domaineLabel, getProjet, pad, profil, projets } from "@/data/portfolio";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projets.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const projet = getProjet(id);
  if (!projet) return {};
  const l = asLocale(locale);

  return {
    title: projet.titre[l],
    description: projet.description[l],
    alternates: {
      canonical: `/${l}/projets/${id}`,
      languages: { en: `/en/projets/${id}`, fr: `/fr/projets/${id}` },
    },
  };
}

const reveal = (delay: number) => ({ animationDelay: `${delay}ms` });

export default async function ProjetPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const projet = getProjet(id);
  if (!projet) notFound();

  const l = asLocale(locale);
  const t = await getTranslations("projet");
  const suivant = projets[(projets.indexOf(projet) + 1) % projets.length];

  const meta = [
    { label: t("year"), valeur: String(projet.annee) },
    { label: t("period"), valeur: projet.periode[l] },
    { label: t("context"), valeur: projet.contexte[l] },
    { label: t("category"), valeur: projet.categorie[l] },
    { label: t("domains"), valeur: projet.domaines.map((d) => domaineLabel[d][l]).join(" · ") },
  ];

  const recit = [
    { numeral: "i.", label: t("problem"), texte: projet.probleme[l] },
    { numeral: "ii.", label: t("gesture"), texte: projet.gesteTechnique[l] },
    { numeral: "iii.", label: t("result"), texte: projet.resultat[l] },
  ];

  return (
    <>
      <Header />
      <main id="contenu">
        {/* Titre monumental */}
        <header id="top" className="px-page pb-16 pt-32 md:pt-40">
          <Link href={{ pathname: "/", hash: "index" }} className="label draw-underline pb-0.5 text-ink-soft hover:text-accent-ink">
            ← {t("back")}
          </Link>
          <p className="label reveal-css mt-16 text-sage" style={reveal(0)}>
            N° {pad(projet.numero)} {t("of")} {pad(projets.length)} — {projet.categorie[l]}
          </p>
          <h1 className="mt-6 max-w-[16ch] font-serif text-[clamp(3rem,8vw,10rem)] font-light leading-[0.92] tracking-[-0.04em]">
            <span className="reveal-css" style={reveal(120)}>
              {projet.titre[l]}
              <span className="text-accent">.</span>
            </span>
          </h1>
        </header>

        <div className="px-page grid gap-y-16 pb-24 md:grid-cols-12 md:gap-x-8">
          {/* Méta en colonne latérale */}
          <aside className="md:sticky md:top-28 md:col-span-3 md:self-start">
            <dl className="space-y-6">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="label text-sage">{m.label}</dt>
                  <dd className="mt-1 text-sm">{m.valeur}</dd>
                </div>
              ))}
              <div>
                <dt className="label text-sage">{t("stack")}</dt>
                <dd className="mt-1">
                  <ul className="text-sm">
                    {projet.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>

          {/* Récit */}
          <article className="md:col-span-8 md:col-start-5">
            <RevealMask>
              <p className="max-w-[40ch] font-serif text-[clamp(1.4rem,2.2vw,2.1rem)] font-light leading-[1.3]">
                {projet.description[l]}
              </p>
            </RevealMask>

            <div className="mt-20 space-y-14">
              {recit.map((r, i) => (
                <section key={r.label} className="grid gap-y-3 border-t border-rule pt-8 md:grid-cols-8 md:gap-x-8">
                  <h2 className="label text-sage md:col-span-2">
                    <span className="mr-2 font-serif text-base normal-case italic tracking-normal">{r.numeral}</span>
                    {r.label}
                  </h2>
                  <RevealMask delay={i * 0.05} className="md:col-span-6">
                    <p className="max-w-[65ch] font-serif text-[clamp(1.2rem,1.6vw,1.5rem)] leading-[1.45]">{r.texte}</p>
                  </RevealMask>
                </section>
              ))}

              <section className="grid gap-y-3 border-t border-rule pt-8 md:grid-cols-8 md:gap-x-8">
                <h2 className="label text-sage md:col-span-2">{t("highlights")}</h2>
                <ol className="space-y-4 md:col-span-6">
                  {projet.pointsCles.map((p, i) => (
                    <li key={p.en} className="grid max-w-[65ch] grid-cols-[2rem_1fr] text-ink-soft">
                      <span className="label pt-1 tabular-nums text-sage">{pad(i + 1)}</span>
                      <span>{p[l]}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="label flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-8">
                {projet.lienRepo && (
                  <a href={projet.lienRepo} target="_blank" rel="noreferrer" className="draw-underline pb-0.5 hover:text-accent-ink">
                    {t("repo")} ↗
                  </a>
                )}
                {projet.lienDemo && (
                  <a href={projet.lienDemo} target="_blank" rel="noreferrer" className="draw-underline pb-0.5 hover:text-accent-ink">
                    {t("demo")} ↗
                  </a>
                )}
                <a
                  href={`mailto:${profil.email}?subject=${encodeURIComponent(projet.titre[l])}`}
                  className="draw-underline pb-0.5 hover:text-accent-ink"
                >
                  {t("discuss")} →
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* Visuels grands, sans cadre */}
        <section aria-label={t("visuals")} className="px-page pb-24">
          {projet.visuels.length > 0 ? (
            <div className="space-y-24 md:space-y-32">
              {projet.visuels.map((v, i) => (
                // Jamais agrandie au-delà de sa taille native : l'image reste nette.
                <div key={v.src} style={{ maxWidth: v.largeur }} className={i % 2 === 1 ? "md:ml-auto" : undefined}>
                  <RevealMask as="figure">
                    <Image
                      src={v.src}
                      alt={v.alt[l]}
                      width={v.largeur}
                      height={v.hauteur}
                      sizes={`(min-width: 768px) min(88vw, ${v.largeur}px), 100vw`}
                      className="h-auto w-full"
                    />
                    <figcaption className="label mt-4 text-ink-soft">
                      {t("figure")} {pad(i + 1)} — <span className="normal-case tracking-normal">{v.alt[l]}</span>
                    </figcaption>
                  </RevealMask>
                </div>
              ))}
            </div>
          ) : (
            <RevealMask>
              <p className="border-t border-rule pt-10 font-serif text-[clamp(1.75rem,4vw,4rem)] font-light italic leading-tight text-ink-soft">
                {t("private")}
              </p>
            </RevealMask>
          )}
        </section>

        {/* Projet suivant */}
        <nav aria-label={t("next")} className="px-page border-t border-rule py-section">
          <p className="label text-sage">{t("next")}</p>
          <Link
            href={`/projets/${suivant.id}`}
            className="group mt-8 flex items-baseline gap-6 font-serif text-[clamp(2.5rem,7vw,8rem)] font-light leading-[0.95] tracking-[-0.035em]"
          >
            <span className="label shrink-0 tabular-nums text-ink-soft">{pad(suivant.numero)}</span>
            <RevealMask as="span" className="block transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
              {suivant.titre[l]} <span aria-hidden="true" className="italic">→</span>
            </RevealMask>
          </Link>
        </nav>
      </main>
      <Colophon />
    </>
  );
}
