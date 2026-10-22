import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ViewTransition } from "react";
import { Colophon } from "@/components/editorial/colophon";
import { Header } from "@/components/editorial/header";
import { RevealMask } from "@/components/editorial/reveal-mask";
import { SchemaPrincipe } from "@/components/editorial/schema-principe";
import { asLocale, domaineLabel, getProjet, pad, profil, projets, type Visuel } from "@/data/portfolio";
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
    // Sans cela, le partage reprendrait le titre de l'accueil défini dans le layout.
    openGraph: {
      title: `${projet.titre[l]} — ${profil.nom}`,
      description: projet.description[l],
      type: "article",
      locale: l === "fr" ? "fr_FR" : "en_US",
    },
    alternates: {
      canonical: `/${l}/projets/${id}`,
      languages: { en: `/en/projets/${id}`, fr: `/fr/projets/${id}` },
    },
  };
}

const reveal = (delay: number) => ({ animationDelay: `${delay}ms` });

function Figure({ visuel, alt, legende }: { visuel: Visuel; alt: string; legende: string }) {
  // Jamais agrandie au-delà de sa taille native : l'image reste nette.
  return (
    <figure style={{ maxWidth: visuel.largeur }}>
      <Image
        src={visuel.src}
        alt={alt}
        width={visuel.largeur}
        height={visuel.hauteur}
        sizes={`(min-width: 768px) min(88vw, ${visuel.largeur}px), 100vw`}
        className="h-auto w-full ring-1 ring-ink/10"
      />
      <figcaption className="label mt-4 text-ink-soft">{legende}</figcaption>
    </figure>
  );
}

export default async function ProjetPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const projet = getProjet(id);
  if (!projet) notFound();

  const l = asLocale(locale);
  const t = await getTranslations("projet");
  const suivant = projets[(projets.indexOf(projet) + 1) % projets.length];
  const [premier, ...autres] = projet.visuels;

  const meta = [
    { label: t("period"), valeur: projet.periode[l] },
    { label: t("context"), valeur: projet.contexte[l] },
    { label: t("domains"), valeur: projet.domaines.map((d) => domaineLabel[d][l]).join(" · ") },
  ];

  const recit = [
    { numeral: "i.", label: t("problem"), texte: projet.probleme[l] },
    { numeral: "ii.", label: t("gesture"), texte: projet.gesteTechnique[l] },
    { numeral: "iii.", label: t("result"), texte: projet.resultat[l] },
  ];

  // Numérotation des figures : le visuel de tête, puis les autres, puis le schéma.
  const legende = (n: number, texte: string) => `${t("figure")} ${pad(n)} — ${texte}`;

  return (
    <>
      <Header entete={t("caseStudy", { n: pad(projet.numero) })} />
      <main id="contenu">
        {/* Titre monumental */}
        <header id="top" className="px-page pb-12 pt-32 md:pb-16 md:pt-40">
          <Link
            href={{ pathname: "/", hash: "index" }}
            transitionTypes={["nav-back"]}
            className="label draw-underline pb-0.5 text-ink-soft hover:text-accent-ink"
          >
            ← {t("back")}
          </Link>
          <p className="label reveal-css mt-14 text-sage" style={reveal(0)}>
            N° {pad(projet.numero)} {t("of")} {pad(projets.length)} — {projet.categorie[l]} · {projet.annee}
          </p>
          <h1 className="mt-6 max-w-[18ch] font-serif text-[clamp(2.75rem,7.5vw,9rem)] font-light leading-[0.92] tracking-[-0.04em]">
            <ViewTransition name={`titre-${projet.id}`} share="morph" default="none">
              <span className="inline-block">
                {projet.titre[l]}
                <span className="text-accent">.</span>
              </span>
            </ViewTransition>
          </h1>
        </header>

        {/* La preuve d'abord : le visuel principal, ou le schéma de principe */}
        <section aria-label={t("visuals")} className="px-page pb-16 md:pb-24">
          {premier ? (
            <figure style={{ maxWidth: premier.largeur }}>
              <ViewTransition name={`visuel-${projet.id}`} share="morph" default="none">
                <div className="ring-1 ring-ink/10">
                  <Image
                    src={premier.src}
                    alt={premier.alt[l]}
                    width={premier.largeur}
                    height={premier.hauteur}
                    sizes={`(min-width: 768px) min(88vw, ${premier.largeur}px), 100vw`}
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </ViewTransition>
              <figcaption className="label mt-4 text-ink-soft">{legende(1, premier.alt[l])}</figcaption>
            </figure>
          ) : (
            <figure>
              <SchemaPrincipe etapes={projet.schema} locale={l} />
              <figcaption className="label mt-4 flex flex-wrap gap-x-6 gap-y-1 text-ink-soft">
                <span>{legende(1, t("schema"))}</span>
                <span className="normal-case tracking-normal italic">{t("private")}</span>
              </figcaption>
            </figure>
          )}
        </section>

        <div className="px-page grid gap-y-14 pb-20 md:grid-cols-12 md:gap-x-8">
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
            <p className="max-w-[40ch] font-serif text-[clamp(1.35rem,2.1vw,2rem)] font-light leading-[1.3]">
              {projet.description[l]}
            </p>

            {projet.metriques && projet.metriques.length > 0 && (
              <dl aria-label={t("metrics")} className="mt-14 grid grid-cols-2 gap-8 border-t border-rule pt-8 sm:grid-cols-3">
                {projet.metriques.map((m) => (
                  <div key={m.label.en} className="flex flex-col">
                    <dt className="label order-2 mt-2 text-ink-soft">{m.label[l]}</dt>
                    <dd className="order-1 font-serif text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-none tabular-nums">{m.valeur}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-16 space-y-12">
              {projet.role && <Bloc label={t("role")} texte={projet.role[l]} />}
              {recit.map((r) => (
                <Bloc key={r.label} numeral={r.numeral} label={r.label} texte={r.texte} />
              ))}
              {projet.aRefaire && <Bloc label={t("redo")} texte={projet.aRefaire[l]} />}

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

        {/* Autres visuels, puis le schéma de principe */}
        {premier && (
          <section aria-label={t("schema")} className="px-page space-y-20 pb-24 md:space-y-28">
            {autres.map((v, i) => (
              <div key={v.src} className={i % 2 === 0 ? "md:ml-auto md:w-fit" : undefined}>
                <Figure visuel={v} alt={v.alt[l]} legende={legende(i + 2, v.alt[l])} />
              </div>
            ))}
            <figure>
              <SchemaPrincipe etapes={projet.schema} locale={l} />
              <figcaption className="label mt-4 text-ink-soft">{legende(projet.visuels.length + 1, t("schema"))}</figcaption>
            </figure>
          </section>
        )}

        {/* Projet suivant */}
        <nav aria-label={t("next")} className="px-page border-t border-rule py-section">
          <p className="label text-sage">{t("next")}</p>
          <Link
            href={`/projets/${suivant.id}`}
            transitionTypes={["nav-forward"]}
            className="group mt-8 flex items-baseline gap-6 font-serif text-[clamp(2.25rem,6.5vw,7rem)] font-light leading-[0.95] tracking-[-0.035em]"
          >
            <span className="label shrink-0 tabular-nums text-ink-soft">{pad(suivant.numero)}</span>
            <RevealMask as="span" className="block transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
              <ViewTransition name={`titre-${suivant.id}`} share="morph" default="none">
                <span>{suivant.titre[l]}</span>
              </ViewTransition>
              &nbsp;<span aria-hidden="true" className="italic">→</span>
            </RevealMask>
          </Link>
        </nav>
      </main>
      <Colophon />
    </>
  );
}

function Bloc({ numeral, label, texte }: { numeral?: string; label: string; texte: string }) {
  return (
    <section className="grid gap-y-3 border-t border-rule pt-8 md:grid-cols-8 md:gap-x-8">
      <h2 className="label text-sage md:col-span-2">
        {numeral && <span className="mr-2 font-serif text-base normal-case italic tracking-normal">{numeral}</span>}
        {label}
      </h2>
      <p className="max-w-[65ch] font-serif text-[clamp(1.15rem,1.5vw,1.45rem)] leading-[1.45] md:col-span-6">{texte}</p>
    </section>
  );
}
