import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asLocale, profil } from "@/data/portfolio";

export function PortraitProfil() {
  const t = useTranslations("profile");
  const locale = asLocale(useLocale());

  return (
    <section
      aria-labelledby="profile-title"
      className="px-page grid gap-10 py-section md:grid-cols-12 md:items-center md:gap-x-10 lg:gap-x-16"
    >
      <figure className="md:col-span-5 lg:col-span-4">
        <div className="relative mx-auto aspect-[0.95/1] max-w-[28rem] overflow-hidden border border-rule bg-carte-fond">
          <div
            aria-hidden="true"
            className="absolute bottom-[-14%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full border border-sage/25 bg-sage/5"
          />
          <div aria-hidden="true" className="absolute inset-4 border border-rule" />
          <span className="coord absolute right-7 top-7 z-20 text-ink-soft" aria-hidden="true">
            {profil.coordonnees}
          </span>
          <Image
            src="/image/profile/jqcDP.png"
            alt={t("portraitAlt", { name: profil.nom })}
            width={1219}
            height={1290}
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 42vw, 88vw"
            className="relative z-10 h-full w-full object-contain object-bottom"
          />
        </div>
        <figcaption className="mx-auto mt-4 flex max-w-[28rem] items-baseline justify-between gap-4 border-t border-rule pt-3">
          <span className="font-serif text-lg italic">{profil.nom}</span>
          <span className="label text-ink-soft">{t("caption")}</span>
        </figcaption>
      </figure>

      <div className="md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
        <p className="label text-sage">{t("eyebrow")}</p>
        <h2
          id="profile-title"
          className="mt-5 max-w-[15ch] font-serif text-[clamp(2.5rem,5.5vw,5.75rem)] font-light leading-[0.98] tracking-[-0.035em]"
        >
          {t("title")}
        </h2>
        <p className="mt-7 max-w-[52ch] text-ink-soft md:mt-9">{profil.description[locale]}</p>
        <p className="label mt-8 border-t border-rule pt-4 text-ink-soft">
          <span className="text-ink">{profil.role[locale]}</span>
          <span aria-hidden="true"> · </span>
          {profil.discipline[locale]}
          <span aria-hidden="true"> · </span>
          {profil.localisation[locale]}
        </p>
      </div>
    </section>
  );
}
