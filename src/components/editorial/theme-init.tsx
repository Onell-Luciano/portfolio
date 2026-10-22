"use client";

import { useEffect } from "react";
import { appliquerTheme, themeMemorise } from "@/lib/theme";

/**
 * Filet de sécurité : sur les pages rendues à la demande (404), le script
 * du <head> n'est pas exécuté. Le thème est alors posé dès l'hydratation.
 */
export function ThemeInit() {
  useEffect(() => {
    if (document.documentElement.hasAttribute("data-theme")) return;
    const systeme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    appliquerTheme(themeMemorise() ?? systeme);
  }, []);
  return null;
}
