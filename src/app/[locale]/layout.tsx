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
        "Développeur full-stack spécialisé dans les applications web modernes, les systèmes intelligents, la data et les solutions géospatiales.",
      alternates: {
        languages: {
          en: "/en",
          fr: "/fr",
        },
      },
    };
  }

  return {
    title: "O'Nell Luciano Rasamiarison — Full-Stack Developer | AI · Data · GIS",
    description:
      "Full-stack developer building modern web applications, intelligent systems, data-driven solutions and interactive geospatial experiences.",
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
      },
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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div lang={locale} className="min-h-full bg-background text-foreground">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
