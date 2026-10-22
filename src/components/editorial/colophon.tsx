import { useTranslations } from "next-intl";
import { profil } from "@/data/portfolio";

export function Colophon() {
  const t = useTranslations("colophon");

  return (
    <footer className="px-page pb-10 pt-24">
      <div className="label flex flex-col gap-6 border-t border-rule pt-8 text-ink-soft md:flex-row md:items-baseline md:justify-between">
        <p className="max-w-[90ch] normal-case tracking-normal [font-size:0.8125rem]">
          {t("designed")} {profil.nom} · {new Date().getFullYear()} · {t("stack")} : Next.js, Framer Motion, Tailwind CSS ·{" "}
          {t("type")} : <span className="font-serif italic">Fraunces</span>, Inter Tight
        </p>
        <a href="#top" className="draw-underline shrink-0 pb-0.5 hover:text-accent-ink">
          {t("top")} ↑
        </a>
      </div>
    </footer>
  );
}
