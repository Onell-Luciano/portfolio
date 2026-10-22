import { useTranslations } from "next-intl";
import { Header } from "@/components/editorial/header";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <>
      <Header />
      <main id="contenu" className="px-page flex min-h-svh flex-col justify-center">
        <p className="label text-sage">404</p>
        <h1 className="mt-6 font-serif text-[clamp(3rem,8vw,10rem)] font-light leading-[0.9] tracking-[-0.04em]">
          {t("title")}
        </h1>
        <Link href="/" className="label draw-underline mt-12 self-start pb-0.5 hover:text-accent-ink">
          ← {t("back")}
        </Link>
      </main>
    </>
  );
}
