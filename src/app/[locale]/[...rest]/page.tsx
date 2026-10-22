import { notFound } from "next/navigation";

/**
 * Toute adresse inconnue sous /fr ou /en aboutit ici, pour afficher
 * la page 404 du site (traduite, au thème du visiteur) plutôt que
 * la page générique de Next.
 */
export default function PageInconnue() {
  notFound();
}
