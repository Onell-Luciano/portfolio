"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { TECH_CATEGORIES, type Level, type Tech, type TechCategory } from "./data";
import { EASE, SectionLabel, SplitReveal, trackSpotlight } from "./primitives";

const LEVEL_DOTS: Record<Level, number> = { expert: 4, advanced: 3, intermediate: 2 };

export function FilterPills<K extends string>({
  options,
  value,
  onChange,
  layoutId,
}: {
  options: { key: K | "All"; label: string }[];
  value: K | "All";
  onChange: (key: K | "All") => void;
  layoutId: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const selected = value === o.key;
        return (
          <button
            key={o.key}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(o.key)}
            className={`relative isolate rounded-full border px-4 py-2 font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ${
              selected ? "border-transparent text-ink" : "border-line text-mute hover:border-line-strong hover:text-ivory"
            }`}
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full bg-ivory"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Stack({ technologies }: { technologies: Tech[] }) {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TechCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return technologies.filter(
      (tech) =>
        (category === "All" || tech.category === category) &&
        (!q || tech.name.toLowerCase().includes(q) || tech.category.toLowerCase().includes(q))
    );
  }, [technologies, query, category]);

  const categoryLabel = (key: TechCategory) => t(TECH_CATEGORIES.find((c) => c.key === key)!.label);

  return (
    <section id="stack" className="relative z-10 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel label={t("stack.sectionLabel")} />
            <h2 className="display-serif mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-ivory">
              <SplitReveal text={t("stack.heading")} />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <label className="group relative flex items-center border-b border-line-strong pb-3 transition-colors duration-500 focus-within:border-gold">
              <Search size={16} className="mr-3 shrink-0 text-mute transition-colors group-focus-within:text-gold" />
              <span className="sr-only">{t("stack.searchPlaceholder")}</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("stack.searchPlaceholder")}
                className="w-full bg-transparent text-sm text-ivory placeholder:text-mute/70 focus:outline-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear" className="ml-2 text-mute hover:text-ivory">
                  <X size={14} />
                </button>
              )}
            </label>
          </div>
        </div>

        <div className="mt-10">
          <FilterPills
            layoutId="stack-filter"
            value={category}
            onChange={setCategory}
            options={[
              { key: "All" as const, label: t("stack.all") },
              ...TECH_CATEGORIES.map((c) => ({ key: c.key, label: t(c.label) })),
            ]}
          />
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.6, ease: EASE, delay: Math.min(i * 0.025, 0.4) }}
                  onPointerMove={trackSpotlight}
                  className="spotlight group flex min-h-40 flex-col justify-between rounded-2xl border border-line bg-ink-2/80 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink text-ivory-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-gold/40 group-hover:text-gold">
                      <Icon size={19} />
                    </span>
                    <span className="flex gap-1 pt-1" title={t(`ui.levels.${tech.level}`)}>
                      {[0, 1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                            d < LEVEL_DOTS[tech.level] ? "bg-gold/70 group-hover:bg-gold" : "bg-line-strong"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-[0.95rem] font-medium tracking-tight text-ivory">{tech.name}</h3>
                    <p className="mt-1 flex items-center justify-between gap-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-mute">
                      <span className="truncate">{categoryLabel(tech.category)}</span>
                      <span className="shrink-0 text-gold/80">{t(`ui.levels.${tech.level}`)}</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-line py-14 text-center font-mono text-xs text-mute">
            {t("ui.noResults")}
          </p>
        )}
      </div>
    </section>
  );
}
