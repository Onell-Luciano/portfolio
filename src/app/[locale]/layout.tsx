import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { profil } from "@/data/portfolio";
import { routing } from "@/i18n/routing";
import { ThemeInit } from "@/components/editorial/theme-init";
import { FOND_THEME, SCRIPT_THEME } from "@/lib/theme";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

// Coordonnées, numéros et légendes de carte (Piste A)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://onell-luciano.vercel.app";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Barre du navigateur mobile : une couleur par thème (ajustée en direct par la bascule)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: FOND_THEME.light },
    { media: "(prefers-color-scheme: dark)", color: FOND_THEME.dark },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === "fr";

  const title = fr
    ? `${profil.nom} — Développeur Full-Stack | IA · Data · SIG`
    : `${profil.nom} — Full-Stack Developer | AI · Data · GIS`;
  const description = fr
    ? "Développeur full-stack spécialisé dans les applications web modernes, les systèmes intelligents (IA & NLP), la data et les solutions géospatiales (SIG). Disponible pour opportunités Remote & Relocalisation."
    : "Full-stack software developer engineering high-performance web systems, intelligent AI/NLP models, data pipelines, and interactive geospatial platforms for global opportunities.";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${profil.nom}` },
    description,
    authors: [{ name: profil.nom }],
    keywords: [
      profil.nom,
      "Full-Stack Developer",
      "Software Engineer",
      "AI Developer",
      "GIS Developer",
      "PostGIS",
      "Next.js",
      "React",
      "Python",
      "FastAPI",
      "PyTorch",
      "Madagascar",
      "Remote Developer",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: fr ? `${profil.nom} — Développeur Full-Stack` : `${profil.nom} — Full-Stack Developer`,
      description: fr
        ? "Portfolio de développeur full-stack, spécialiste IA, Data et SIG."
        : "Portfolio of Full-Stack Developer, AI, Data & GIS Specialist.",
      url: `${SITE_URL}/${locale}`,
      siteName: `${profil.nom} Portfolio`,
      locale: fr ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  // Données structurées pour les moteurs de recherche et les recruteurs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profil.nom,
    jobTitle: "Full-Stack Developer & Software Engineer",
    knowsAbout: [
      "Full-Stack Web Development",
      "Artificial Intelligence & NLP",
      "Geospatial Information Systems (GIS)",
      "PostGIS & Leaflet.js",
      "Next.js & React",
      "Python & PyTorch",
      "FastAPI & Node.js",
    ],
    alumniOf: "École Nationale d'Informatique Tanambao",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fianarantsoa",
      addressCountry: "Madagascar",
    },
    email: profil.email,
    sameAs: [profil.github],
  };

  return (
    // data-theme est posé par le script avant l'hydratation : React ne doit pas le signaler.
    <html
      lang={locale}
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Thème posé pendant la lecture du HTML, avant le premier rendu :
            aucun flash du mauvais thème (next/script le différerait). */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_THEME }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeInit />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
