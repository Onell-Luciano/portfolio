/* ──────────────────────────────────────────────────────────────
   Thème clair / sombre.
   - Sans choix du visiteur : le thème suit le système (prefers-color-scheme).
   - Avec choix : il est mémorisé (localStorage) et posé sur <html data-theme>.
   ────────────────────────────────────────────────────────────── */

export type Theme = "light" | "dark";

export const CLE_THEME = "theme";
export const EVENEMENT_THEME = "themechange";

/** Couleur de fond de chaque thème (barre du navigateur mobile). Mêmes valeurs que --paper. */
export const FOND_THEME: Record<Theme, string> = { light: "#f4f1ea", dark: "#12110f" };

/**
 * Exécuté dans le <head>, avant le premier rendu : évite tout flash
 * du mauvais thème. Écrit en ES5 compact, sans dépendance.
 */
export const SCRIPT_THEME = `(function(){try{
var d=document.documentElement,s=null;try{s=localStorage.getItem("${CLE_THEME}")}catch(e){}
var t=s==="dark"||s==="light"?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
d.setAttribute("data-theme",t);d.style.colorScheme=t;
var f=${JSON.stringify(FOND_THEME)};
document.addEventListener("DOMContentLoaded",function(){var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++)m[i].setAttribute("content",f[t]);});
}catch(e){}})();`;

export function themeCourant(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/** Pose le thème sur la page et prévient les composants abonnés. */
export function appliquerTheme(theme: Theme) {
  const racine = document.documentElement;
  racine.setAttribute("data-theme", theme);
  racine.style.colorScheme = theme;
  synchroniserBarreNavigateur(theme);
  window.dispatchEvent(new Event(EVENEMENT_THEME));
}

/** Couleur de la barre du navigateur mobile (toutes les balises theme-color). */
export function synchroniserBarreNavigateur(theme: Theme) {
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", FOND_THEME[theme]));
}

export function themeMemorise(): Theme | null {
  try {
    const s = localStorage.getItem(CLE_THEME);
    return s === "dark" || s === "light" ? s : null;
  } catch {
    return null;
  }
}

export function memoriserTheme(theme: Theme) {
  try {
    localStorage.setItem(CLE_THEME, theme);
  } catch {
    // Navigation privée ou stockage bloqué : le choix vaut pour la page en cours.
  }
}
