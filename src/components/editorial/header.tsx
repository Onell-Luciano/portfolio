"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { profil } from "@/data/portfolio";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useMediaQuery } from "@/lib/use-fine-pointer";
import { ProfilAltitude } from "./profil-altitude";
import { EASE_SIGNATURE } from "./reveal-mask";
import { ThemeToggle } from "./theme-toggle";

export const SECTIONS = ["cas", "index", "methode", "inventaire", "parcours", "contact"] as const;
export type Section = (typeof SECTIONS)[number];
const AUCUNE_SECTION: readonly Section[] = []; // stable : pas de nouveau tableau à chaque rendu

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

/** Hauteur rendue d'un élément, suivie au redimensionnement. */
function useHauteur(ref: RefObject<HTMLElement | null>, defaut: number) {
  const [hauteur, setHauteur] = useState(defaut);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([e]) => setHauteur(e.borderBoxSize[0]?.blockSize ?? e.contentRect.height));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return hauteur;
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

  // Hauteur de la rangée principale : c'est elle qui se masque, pas le profil.
  const rangeeRef = useRef<HTMLDivElement>(null);
  const hauteurMasquee = useHauteur(rangeeRef, 68);
  const enteteRef = useRef<HTMLElement>(null);
  const hauteurEntete = useHauteur(enteteRef, 72);

  // Menu des sections sur petit écran (sous lg, la nav en ligne est masquée).
  const reduce = useReducedMotion();
  const menuId = `menu-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const boutonMenuRef = useRef<HTMLButtonElement>(null);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const large = useMediaQuery("(min-width: 64rem)");
  const menuVisible = menuOuvert && !large;

  useEffect(() => {
    if (!menuVisible) return;
    const racine = document.documentElement;
    const overflow = racine.style.overflow;
    racine.style.overflow = "hidden"; // la page ne défile plus sous le menu
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOuvert(false);
      boutonMenuRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      racine.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuVisible]);

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
        ref={enteteRef}
        // Masqué, l'en-tête laisse dépasser son profil d'altitude : la progression reste visible.
        animate={{ y: hidden && !menuVisible ? -hauteurMasquee : 0 }}
        transition={{ duration: 0.5, ease: EASE_SIGNATURE }}
        onFocusCapture={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur-sm"
      >
        <div ref={rangeeRef} className="px-page flex items-baseline justify-between gap-6 py-5">
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
                    // Pas de préchargement : inutile ici, et sur une page 404 la requête boucle en redirections.
                    prefetch={false}
                    aria-current={l === locale ? "true" : undefined}
                    className={l === locale ? "text-ink underline underline-offset-4" : "text-ink-soft hover:text-ink"}
                  >
                    {l.toUpperCase()}
                  </Link>
                </span>
              ))}
            </span>
            <ThemeToggle />
            <button
              ref={boutonMenuRef}
              type="button"
              onClick={() => setMenuOuvert((o) => !o)}
              aria-expanded={menuVisible}
              aria-controls={menuId}
              aria-label={menuVisible ? t("menuFermer") : t("menu")}
              className="-my-2 -mr-2 grid size-9 shrink-0 self-center place-items-center text-ink lg:hidden"
            >
              {/* Trois barres, qui se croisent en ✕ à l'ouverture */}
              <span aria-hidden="true" className="relative block h-3.5 w-5">
                {[
                  menuVisible ? "rotate-45" : "-translate-y-[6px]",
                  menuVisible ? "opacity-0" : "",
                  menuVisible ? "-rotate-45" : "translate-y-[6px]",
                ].map((etat, i) => (
                  <span
                    key={i}
                    className={`absolute inset-x-0 top-1/2 -mt-[0.7px] h-[1.4px] bg-current transition duration-300 ease-signature ${etat}`}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
        <ProfilAltitude sections={accueil ? SECTIONS : AUCUNE_SECTION} />
      </motion.header>

      {/* Hors de l'en-tête : son flou d'arrière-plan piégerait le positionnement fixe. */}
      <AnimatePresence>
        {menuVisible && (
          <motion.nav
            id={menuId}
            aria-label={t("sections")}
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE_SIGNATURE }}
            className="px-page fixed inset-0 z-40 overflow-y-auto bg-paper pb-10 lg:hidden"
            style={{ paddingTop: hauteurEntete }}
          >
            <ul className="border-t border-rule">
              {SECTIONS.map((id, i) => (
                <li key={id} className="border-b border-rule">
                  <Link
                    href={{ pathname: "/", hash: id }}
                    onClick={() => setMenuOuvert(false)}
                    aria-current={courante === id ? "location" : undefined}
                    className={`flex items-baseline gap-5 py-4 transition-colors hover:text-accent-ink ${
                      courante === id ? "text-accent-ink" : ""
                    }`}
                  >
                    <span className="coord text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-3xl leading-tight tracking-tight">{t(id)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
