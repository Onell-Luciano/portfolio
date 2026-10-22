import { notFound } from "next/navigation";
import { asLocale, getProjet, pad, profil, projets } from "@/data/portfolio";
import { carteOG, TAILLE_OG } from "@/lib/carte-og";

export const alt = profil.nom;
export const size = TAILLE_OG;
export const contentType = "image/png";

export function generateStaticParams() {
  return projets.map((p) => ({ id: p.id }));
}

export default async function Image({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const projet = getProjet(id);
  if (!projet) notFound();
  const l = asLocale(locale);

  return carteOG({
    surtitre: `N° ${pad(projet.numero)} — ${projet.categorie[l]} · ${projet.annee}`,
    titre: projet.titre[l],
    pied: profil.nom,
  });
}
