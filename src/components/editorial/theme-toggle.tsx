"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useSyncExternalStore, type MouseEvent } from "react";
import {
  appliquerTheme,
  EVENEMENT_THEME,
  memoriserTheme,
  synchroniserBarreNavigateur,
  themeCourant,
  themeMemorise,
  type Theme,
} from "@/lib/theme";

const SYSTEME_SOMBRE = "(prefers-color-scheme: dark)";

function abonner(onChange: () => void) {
  window.addEventListener(EVENEMENT_THEME, onChange);
  return () => window.removeEventListener(EVENEMENT_THEME, onChange);
}

/**
 * Bascule clair / sombre. Le nouveau thème s'étend en cercle depuis
 * le bouton (View Transitions) ; sans animation si le visiteur la réduit.
 */
export function ThemeToggle() {
  const t = useTranslations("nav");
  // null au rendu serveur : le thème réel n'est connu qu'au navigateur.
  const theme = useSyncExternalStore<Theme | null>(abonner, themeCourant, () => null);
  const horizonId = `horizon-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Tant que le visiteur n'a rien choisi, la page suit le système en direct.
  useEffect(() => {
    // Next ajoute des balises theme-color après le chargement : on les aligne sur le thème réel.
    synchroniserBarreNavigateur(themeCourant());
    const mq = window.matchMedia(SYSTEME_SOMBRE);
    const suivre = () => {
      if (!themeMemorise()) appliquerTheme(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", suivre);
    return () => mq.removeEventListener("change", suivre);
  }, []);

  const basculer = (e: MouseEvent<HTMLButtonElement>) => {
    const suivant: Theme = themeCourant() === "dark" ? "light" : "dark";
    memoriserTheme(suivant);

    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit || typeof document.startViewTransition !== "function") {
      appliquerTheme(suivant);
      return;
    }

    // Centre du cercle : le curseur, ou le centre du bouton au clavier.
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2;
    const y = e.clientY || r.top + r.height / 2;
    const rayon = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const racine = document.documentElement;
    racine.style.setProperty("--vt-x", `${x}px`);
    racine.style.setProperty("--vt-y", `${y}px`);
    racine.style.setProperty("--vt-r", `${rayon}px`);
    racine.classList.add("vt-theme");
    const transition = document.startViewTransition(() => appliquerTheme(suivant));
    transition.finished.finally(() => racine.classList.remove("vt-theme"));
  };

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={t("themeSombre")}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      title={theme === "dark" ? t("themeVersClair") : t("themeVersSombre")}
      className="group -my-2 grid size-9 shrink-0 self-center place-items-center text-ink-soft transition-colors hover:text-ink"
    >
      {/* Un horizon : en sombre, le soleil se couche derrière et la lune se lève ; l'inverse en clair */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[1.3rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <clipPath id={horizonId}>
            <rect x={0} y={0} width={24} height={17.2} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${horizonId})`}>
          <g className="astre astre-soleil text-accent">
            <circle cx={12} cy={10.5} r={3.6} />
            <path d="M12 3.6v1.3M12 16.1v1.3M5.1 10.5h1.3M17.6 10.5h1.3M7.1 5.6l.9.9M16 14.5l.9.9M7.1 15.4l.9-.9M16 6.5l.9-.9" />
          </g>
          <g className="astre astre-lune">
            <path d="M16.6 12.6A5.6 5.6 0 0 1 9.4 5.4a5.6 5.6 0 1 0 7.2 7.2Z" />
          </g>
        </g>
        <path d="M3.5 18h17" className="opacity-70" />
        <path d="M6.5 20.6h11" strokeOpacity={0.35} />
      </svg>
    </button>
  );
}
