import { asLocale, profil } from "@/data/portfolio";
import { routing } from "@/i18n/routing";
import { carteOG, TAILLE_OG } from "@/lib/carte-og";

export const alt = profil.nom;
export const size = TAILLE_OG;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const l = asLocale((await params).locale);
  return carteOG({
    surtitre: `${profil.role[l]} · ${profil.discipline[l]}`,
    titre: profil.nom,
    pied: `${profil.localisation[l]} · ${profil.coordonnees}`,
  });
}
