import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Colophon } from "@/components/editorial/colophon";
import { Contact } from "@/components/editorial/contact";
import { EtudesDeCas } from "@/components/editorial/etudes-de-cas";
import { Header } from "@/components/editorial/header";
import { HeroTypographique } from "@/components/editorial/hero-typographique";
import { IndexProjets } from "@/components/editorial/index-projets";
import { InventaireTechnos } from "@/components/editorial/inventaire-technos";
import { Methode } from "@/components/editorial/methode";
import { Parcours } from "@/components/editorial/parcours";
import { PortraitProfil } from "@/components/editorial/portrait-profil";
import { SectionHeading } from "@/components/editorial/section-heading";
import { asLocale, profil, projets } from "@/data/portfolio";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <Accueil />;
}

/**
 * Ordre de lecture pensé pour 30 secondes : le portrait, puis le travail
 * (études de cas, index), la méthode, les outils et le parcours.
 * Les phrases d'accroche d'origine sont réparties une par section.
 */
function Accueil() {
  const t = useTranslations();
  const l = asLocale(useLocale());

  return (
    <>
      <Header />
      <main id="contenu">
        <HeroTypographique />
        <PortraitProfil />

        <section id="cas" aria-labelledby="cas-title" className="px-page py-section-lg">
          <SectionHeading
            id="cas-title"
            numero="01"
            label={t("nav.cas")}
            title={t("cas.title")}
            intro={profil.accroche[l]}
            taille="lg"
          />
          <div className="mt-16 md:mt-24">
            <EtudesDeCas />
          </div>
        </section>

        <section id="index" aria-labelledby="index-title" className="px-page py-carte">
          <SectionHeading
            id="index-title"
            numero="02"
            label={t("nav.index")}
            title={t("index.title")}
            intro={t("index.intro", { count: projets.length })}
          />
          <div className="mt-12 md:mt-16">
            <IndexProjets />
          </div>
        </section>

        <section id="methode" aria-labelledby="methode-title" className="px-page py-section-lg">
          <SectionHeading id="methode-title" numero="03" label={t("nav.methode")} title={t("methode.title")} />
          <div className="mt-12 md:mt-16">
            <Methode />
          </div>
        </section>

        <section id="inventaire" aria-labelledby="inventaire-title" className="px-page py-section">
          <SectionHeading
            id="inventaire-title"
            numero="04"
            label={t("nav.inventaire")}
            title={t("inventaire.title")}
            intro={profil.statement[l]}
          />
          <div className="mt-12 md:mt-16">
            <InventaireTechnos />
          </div>
        </section>

        <section id="parcours" aria-labelledby="parcours-title" className="px-page py-section">
          <SectionHeading
            id="parcours-title"
            numero="05"
            label={t("nav.parcours")}
            title={t("parcours.title")}
            intro={profil.ambition[l]}
          />
          <div className="mt-12 md:mt-16">
            <Parcours />
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="px-page py-section-lg">
          <SectionHeading id="contact-title" numero="06" label={t("nav.contact")} title={t("contact.title")} taille="lg" />
          <div className="mt-12 md:mt-16">
            <Contact />
          </div>
        </section>
      </main>
      <Colophon />
    </>
  );
}
