"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { About, Ribbons } from "@/components/portfolio/about";
import { Cursor, Preloader, ScrollProgress, Starfield } from "@/components/portfolio/atmosphere";
import { Contact, Footer } from "@/components/portfolio/contact";
import { EMAIL, usePortfolioData } from "@/components/portfolio/data";
import { Hero } from "@/components/portfolio/hero";
import { Education, Experience } from "@/components/portfolio/journey";
import { Nav } from "@/components/portfolio/nav";
import { EASE } from "@/components/portfolio/primitives";
import { Projects } from "@/components/portfolio/projects";
import { Stack } from "@/components/portfolio/stack";

export default function LocalePage() {
  const t = useTranslations();
  const data = usePortfolioData();
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const handleReady = useCallback(() => setReady(true), []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast(t("contact.emailCopied"));
    } catch {
      setToast(EMAIL);
    }
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, [t]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  return (
    <>
      <Preloader onDone={handleReady} />
      <Cursor />
      <ScrollProgress />
      <Starfield />

      <Nav items={data.navItems} />

      <main className="relative overflow-x-clip">
        <Hero ready={ready} stats={data.stats} onCopyEmail={copyEmail} />
        <Ribbons words={data.capabilities.map((c) => c.title)} />
        <About capabilities={data.capabilities} />
        <Stack technologies={data.technologies} />
        <Projects projects={data.projects} />
        <Experience items={data.experiences} />
        <Education items={data.education} />
        <Contact onCopyEmail={copyEmail} />
      </main>

      <Footer />

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed bottom-6 left-1/2 z-80 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ivory py-2 pl-2 pr-5 text-ink shadow-[0_20px_60px_-10px_rgba(230,194,122,0.5)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-gold">
              <Check size={15} />
            </span>
            <span className="font-mono text-xs font-medium">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
