"use client";

import { useSyncExternalStore } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Vrai pour une souris ou un trackpad ; faux au rendu serveur et sur tactile. */
export function useFinePointer() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(FINE_POINTER);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

const rien = () => () => {};

/**
 * Faux au rendu serveur et pendant l'hydratation, vrai ensuite.
 * Sert aux décors lourds (reliefs) : absents du HTML, dessinés une fois la page prête.
 */
export function useEstClient() {
  return useSyncExternalStore(
    rien,
    () => true,
    () => false,
  );
}

/** Vrai quand la requête média correspond ; `serveur` au rendu serveur. */
export function useMediaQuery(requete: string, serveur = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(requete);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(requete).matches,
    () => serveur,
  );
}
