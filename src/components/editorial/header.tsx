"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { profil } from "@/data/portfolio";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { EASE_SIGNATURE } from "./reveal-mask";

const SECTIONS = ["index", "inventaire", "parcours", "contact"] as const;

/** En-tête discret : disparaît en descendant, revient en remontant. */
export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > previous);
  });

  return (
    <>
      <a
        href="#contenu"
        className="label fixed left-4 top-4 z-60 -translate-y-24 bg-ink px-4 py-3 text-paper focus-visible:translate-y-0"
      >
        {t("skip")}
      </a>

      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_SIGNATURE }}
        onFocusCapture={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur-sm"
      >
        <div className="px-page flex items-baseline justify-between gap-6 py-5">
          <Link href="/" className="font-serif text-lg italic tracking-tight" aria-label={`${profil.nom} — ${t("home")}`}>
            {profil.initiales}
          </Link>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="label flex gap-8">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <Link href={{ pathname: "/", hash: id }} className="draw-underline pb-0.5 hover:text-accent-ink">
                    {t(id)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="label flex items-baseline gap-5">
            <Link href={{ pathname: "/", hash: "contact" }} className="draw-underline pb-0.5 md:hidden">
              {t("contact")}
            </Link>
            <a href={profil.cv} download={profil.cvNomFichier} className="draw-underline pb-0.5 hover:text-accent-ink">
              {t("cv")}
            </a>
            <span role="group" aria-label={t("language")} className="flex gap-1.5">
              {routing.locales.map((l, i) => (
                <span key={l} className="flex gap-1.5">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-ink-soft">
                      /
                    </span>
                  )}
                  <Link
                    href={pathname}
                    locale={l}
                    lang={l}
                    aria-current={l === locale ? "true" : undefined}
                    className={l === locale ? "text-ink underline underline-offset-4" : "text-ink-soft hover:text-ink"}
                  >
                    {l.toUpperCase()}
                  </Link>
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="mx-[clamp(1.5rem,6vw,8rem)] h-px bg-rule" aria-hidden="true" />
      </motion.header>
    </>
  );
}
