"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { profil } from "@/data/portfolio";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { EASE_SIGNATURE } from "./reveal-mask";

export const SECTIONS = ["cas", "index", "methode", "inventaire", "parcours", "contact"] as const;
export type Section = (typeof SECTIONS)[number];

/** Section la plus proche du milieu de l'écran (accueil uniquement). */
function useSectionCourante(actif: boolean) {
  const [courante, setCourante] = useState<Section | null>(null);

  useEffect(() => {
    if (!actif) return;
    const cibles = SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCourante(e.target.id as Section);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    cibles.forEach((el) => observer.observe(el));
    // Au-dessus de la première section (hero), pas de titre courant.
    const premier = cibles[0];
    const onScroll = () => {
      if (premier && premier.getBoundingClientRect().top > window.innerHeight * 0.5) setCourante(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [actif]);

  return courante;
}

/**
 * En-tête discret : disparaît en descendant, revient en remontant.
 * Il porte un titre courant, comme en presse : la section en cours,
 * ou le nom de l'étude de cas (prop `entete`).
 */
export function Header({ entete }: { entete?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const accueil = pathname === "/";
  const courante = useSectionCourante(accueil);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > previous);
  });

  const titreCourant = entete ?? (courante ? `${String(SECTIONS.indexOf(courante) + 1).padStart(2, "0")} — ${t(courante)}` : null);

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
          <p className="flex min-w-0 items-baseline gap-4">
            <Link href="/" className="font-serif text-lg italic tracking-tight" aria-label={`${profil.nom} — ${t("home")}`}>
              {profil.initiales}
            </Link>
            {titreCourant && (
              // Deux niveaux : .reveal-css impose display:block, la visibilité se règle sur le parent.
              <span className={`hidden min-w-0 sm:block lg:hidden ${entete ? "xl:block" : ""}`}>
                <span key={titreCourant} className="label reveal-css truncate text-ink-soft">
                  {titreCourant}
                </span>
              </span>
            )}
          </p>

          <nav aria-label={t("sections")} className="hidden lg:block">
            <ul className="label flex gap-7">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <Link
                    href={{ pathname: "/", hash: id }}
                    aria-current={courante === id ? "location" : undefined}
                    className={`draw-underline pb-0.5 hover:text-accent-ink ${courante === id ? "text-accent-ink" : ""}`}
                  >
                    {t(id)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="label flex shrink-0 items-baseline gap-5">
            <Link href={{ pathname: "/", hash: "contact" }} className="draw-underline pb-0.5 lg:hidden">
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
