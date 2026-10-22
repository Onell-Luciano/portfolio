import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Colophon } from "@/components/editorial/colophon";
import { Contact } from "@/components/editorial/contact";
import { Header } from "@/components/editorial/header";
import { HeroTypographique } from "@/components/editorial/hero-typographique";
import { IndexProjets } from "@/components/editorial/index-projets";
import { InventaireTechnos } from "@/components/editorial/inventaire-technos";
import { Manifeste } from "@/components/editorial/manifeste";
import { Parcours } from "@/components/editorial/parcours";
import { SectionHeading } from "@/components/editorial/section-heading";
import { nombreTechnos, projets, technologies } from "@/data/portfolio";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <Accueil />;
}

function Accueil() {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main id="contenu">
        <HeroTypographique />
        <Manifeste />

        <section id="index" aria-labelledby="index-title" className="px-page py-section">
          <SectionHeading id="index-title" numero="02" title={t("index.title")} intro={t("index.intro", { count: projets.length })} />
          <div className="mt-20">
            <IndexProjets />
          </div>
        </section>

        <section id="inventaire" aria-labelledby="inventaire-title" className="px-page py-section">
          <SectionHeading
            id="inventaire-title"
            numero="03"
            title={t("inventaire.title")}
            intro={t("inventaire.intro", { count: nombreTechnos, groups: technologies.length })}
          />
          <div className="mt-20">
            <InventaireTechnos />
          </div>
        </section>

        <section id="parcours" aria-labelledby="parcours-title" className="px-page py-section">
          <SectionHeading id="parcours-title" numero="04" title={t("parcours.title")} intro={t("parcours.intro")} />
          <div className="mt-20">
            <Parcours />
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="px-page py-section">
          <SectionHeading id="contact-title" numero="05" title={t("contact.title")} />
          <div className="mt-16">
            <Contact />
          </div>
        </section>
      </main>
      <Colophon />
    </>
  );
}
