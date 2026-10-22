import { useTranslations } from "next-intl";
import { profil } from "@/data/portfolio";

export function Colophon() {
  const t = useTranslations("colophon");

  return (
    <footer className="px-page pb-10 pt-16">
      <div className="label flex flex-col gap-6 border-t border-rule pt-8 text-ink-soft md:flex-row md:items-baseline md:justify-between">
        <p className="max-w-[90ch] normal-case tracking-normal text-[0.8125rem]">
          <span className="whitespace-nowrap">
            {t("designed")} {profil.nom}
          </span>{" "}
          · {new Date().getFullYear()} ·{" "}
          <span className="whitespace-nowrap">{t("stack")} : Next.js, Framer Motion, Tailwind CSS</span> ·{" "}
          <span className="whitespace-nowrap">
            {t("type")} : <span className="font-serif italic">Fraunces</span>, Inter Tight
          </span>{" "}
          · <span className="whitespace-nowrap">{t("relief")}</span>
        </p>
        <a href="#top" className="draw-underline shrink-0 pb-0.5 hover:text-accent-ink">
          {t("top")} ↑
        </a>
      </div>
    </footer>
  );
}
