"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CV_FILENAME, CV_URL, EMAIL, GITHUB_URL } from "./data";
import { EASE, EASE_IN_OUT, LocalTime, Magnetic } from "./primitives";

type NavItem = { id: string; label: string };

function LangSwitch({
  locale,
  onSwitch,
  size = "md",
}: {
  locale: string;
  onSwitch: (next: string) => void;
  size?: "md" | "lg";
}) {
  const t = useTranslations();
  return (
    <div
      role="group"
      aria-label={t("common.ariaLanguage")}
      className={`relative inline-flex rounded-full border border-line p-1 ${size === "lg" ? "text-sm" : "text-[0.62rem]"}`}
    >
      {["en", "fr"].map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={locale === option}
          aria-label={`${t("common.switchTo")} — ${option.toUpperCase()}`}
          onClick={() => onSwitch(option)}
          className={`relative z-10 rounded-full px-3 py-1.5 font-mono font-semibold tracking-[0.2em] transition-colors duration-500 ${
            locale === option ? "text-ink" : "text-mute hover:text-ivory"
          }`}
        >
          {locale === option && (
            <motion.span
              layoutId={`lang-pill-${size}`}
              className="absolute inset-0 -z-10 rounded-full bg-ivory"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Nav({ items }: { items: NavItem[] }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 480 && !open);
  });

  // Section spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...items.map((i) => i.id), "education"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const switchLanguage = (next: string) => {
    if (next === locale) return;
    router.push(pathname.replace(/^\/[a-z]{2}/, `/${next}`) || `/${next}`, { scroll: false });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[padding] duration-700 sm:px-8 ${
            scrolled ? "py-3" : "py-6"
          }`}
        >
          {/* Monogram */}
          <a href="#home" className="group relative z-50 flex items-center gap-3" aria-label="O'Nell — home">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-strong">
              <span className="display-serif text-xl italic text-divine transition-transform duration-700 group-hover:rotate-360">O</span>
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-medium tracking-tight text-ivory">O&apos;Nell Luciano</span>
              <span className="eyebrow text-[0.56rem] text-mute">{t("hero.eyebrow")}</span>
            </span>
          </a>

          {/* Desktop pill nav */}
          <nav
            aria-label="Primary"
            className={`glass hidden items-center gap-1 rounded-full p-1.5 transition-shadow duration-700 lg:flex ${
              scrolled ? "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]" : ""
            }`}
          >
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative isolate rounded-full px-4 py-2 font-mono text-[0.64rem] font-medium tracking-[0.2em] transition-colors duration-500 ${
                  active === item.id ? "text-ivory" : "text-mute hover:text-ivory"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-gold/30 bg-gold/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="relative z-50 flex items-center gap-3">
            <div className="hidden sm:block">
              <LangSwitch locale={locale} onSwitch={switchLanguage} />
            </div>
            <Magnetic className="hidden lg:inline-flex">
              <a href={CV_URL} download={CV_FILENAME} className="btn-divine px-5! py-3!">
                CV
                <ArrowUpRight size={14} />
              </a>
            </Magnetic>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="group flex h-11 items-center gap-3 rounded-full border border-line-strong bg-ink/40 pl-4 pr-3 backdrop-blur-md lg:hidden"
            >
              <span className="eyebrow text-[0.6rem] text-ivory">{open ? t("ui.close") : t("ui.menu")}</span>
              <span className="relative flex h-4 w-5 flex-col justify-center">
                <span
                  className={`absolute h-px w-5 bg-ivory transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`}
                />
                <span
                  className={`absolute h-px w-5 bg-ivory transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile / tablet full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.9, ease: EASE_IN_OUT }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink-2 px-5 pb-8 pt-28 sm:px-8 lg:hidden"
          >
            <div className="aura -right-20 top-10 h-80 w-80 bg-gold/15" />
            <nav aria-label="Mobile" className="relative flex flex-col">
              {items.map((item, i) => (
                <div key={item.id} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="display-serif text-[clamp(2.6rem,11vw,4.5rem)] capitalize text-ivory">
                      {item.label.toLowerCase()}
                    </span>
                    <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              className="relative mt-10 flex flex-col gap-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <a href={CV_URL} download={CV_FILENAME} className="btn-divine">
                  {t("common.downloadCv")}
                  <ArrowUpRight size={14} />
                </a>
                <LangSwitch locale={locale} onSwitch={switchLanguage} size="lg" />
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-line pt-6 font-mono text-xs text-mute">
                <a href={`mailto:${EMAIL}`} className="truncate hover:text-ivory">
                  {EMAIL}
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-right hover:text-ivory">
                  GitHub ↗
                </a>
                <span>{t("ui.localTime")}</span>
                <LocalTime className="text-right text-ivory" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
