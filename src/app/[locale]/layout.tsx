import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "fr") {
    return {
      title: "O'Nell Luciano Rasamiarison — Développeur Full-Stack | IA · Data · SIG",
      description:
        "Développeur full-stack d'excellence spécialisé dans les applications web modernes, les systèmes intelligents (IA & NLP), la data et les solutions géospatiales (SIG). Disponible pour opportunités Remote & Relocalisation.",
      alternates: {
        languages: {
          en: "/en",
          fr: "/fr",
        },
      },
      openGraph: {
        title: "O'Nell Luciano Rasamiarison — Développeur Full-Stack",
        description: "Portfolio de développeur full-stack, spécialiste IA, Data et SIG.",
        url: "https://onell-luciano.vercel.app/fr",
        siteName: "O'Nell Luciano Rasamiarison Portfolio",
        locale: "fr_FR",
        type: "website",
      },
    };
  }

  return {
    title: "O'Nell Luciano Rasamiarison — Full-Stack Developer | AI · Data · GIS",
    description:
      "Full-stack software developer engineering high-performance web systems, intelligent AI/NLP models, data pipelines, and interactive geospatial platforms for global opportunities.",
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    openGraph: {
      title: "O'Nell Luciano Rasamiarison — Full-Stack Developer",
      description: "Portfolio of Full-Stack Developer, AI, Data & GIS Specialist.",
      url: "https://onell-luciano.vercel.app/en",
      siteName: "O'Nell Luciano Rasamiarison Portfolio",
      locale: "en_US",
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

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  // JSON-LD Structured Schema for Search Engines and Recruiters
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "O'Nell Luciano Rasamiarison",
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
    email: "rasamiarisonluciano@gmail.com",
    sameAs: ["https://github.com/ONell-Luciano"],
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div lang={locale} className="min-h-full bg-background text-foreground">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
