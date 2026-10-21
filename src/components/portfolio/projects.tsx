"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { PROJECT_GROUPS, type Project, type ProjectGroup } from "./data";
import { EASE, SectionLabel, SplitReveal, useMediaQuery } from "./primitives";
import { FilterPills } from "./stack";

/* ── Atmospheric backdrop shared by visuals ──────────────────── */
function Backdrop({ number }: { number: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />
      <div className="aura left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 bg-gold/15" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2">
        <div className="halo inset-0 opacity-60" />
        <div className="orbit inset-[14%]" />
      </div>
      <span className="display-serif absolute bottom-[-0.18em] right-[-0.04em] text-[clamp(8rem,16vw,15rem)] italic leading-none text-gold/[0.07]">
        {number}
      </span>
    </div>
  );
}

/* ── Visual: framed screenshots, or a generative poster ─────── */
function ProjectVisual({ project, framed = true }: { project: Project; framed?: boolean }) {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = project.images.length;

  useEffect(() => {
    if (!inView || reduce || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 3400);
    return () => window.clearInterval(id);
  }, [inView, reduce, count]);

  return (
    <div ref={ref} className="absolute inset-0">
      <Backdrop number={project.number} />

      {count > 0 ? (
        <div className="absolute inset-x-[7%] top-1/2 -translate-y-1/2 perspective-[1600px]">
          <div
            className={`overflow-hidden rounded-xl border border-line-strong bg-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(230,194,122,0.08)] transition-transform duration-1200 ease-(--ease-divine) ${
              framed ? "rotate-x-[8deg] -rotate-y-12 group-hover:rotate-x-0 group-hover:rotate-y-0" : ""
            }`}
          >
            <div className="flex items-center gap-1.5 border-b border-line bg-ink-3 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
              <span className="ml-3 h-3.5 flex-1 rounded-full bg-line" />
            </div>
            <div className="relative aspect-2/1 bg-ink">
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.images[index].src}
                    alt={project.images[index].alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 50vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {count > 1 && (
            <div className="mt-5 flex justify-center gap-1.5">
              {project.images.map((img, i) => (
                <span key={img.src} className="h-0.5 w-8 overflow-hidden rounded-full bg-line-strong">
                  <span
                    className={`block h-full origin-left bg-gold transition-transform ${
                      i === index ? "scale-x-100 duration-3400 ease-linear" : "scale-x-0 duration-300"
                    }`}
                  />
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <span className="display-serif text-[clamp(5rem,11vw,9rem)] italic leading-none text-divine">{project.number}</span>
          <span className="eyebrow mt-4 text-[0.58rem] text-ivory-dim">{project.category}</span>
          <span className="eyebrow absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.52rem] text-mute">
            ✦ {t("ui.private")}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── One stacked card ────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  total,
  progress,
  range,
  targetScale,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onOpen: (p: Project) => void;
}) {
  const t = useTranslations();
  const scale = useTransform(progress, range, [1, targetScale]);
  const dim = useTransform(progress, range, [0, targetScale < 1 ? 0.55 : 0]);

  return (
    <div className="py-3 md:sticky md:top-0 md:flex md:h-svh md:items-center md:py-0">
      <motion.article
        style={{ scale, top: `${index * 22}px` }}
        className="group relative grid w-full origin-top overflow-hidden rounded-4xl border border-line bg-ink-2 shadow-[0_-40px_80px_-30px_rgba(0,0,0,0.95)] md:h-[min(78svh,700px)] md:grid-cols-[1fr_1.25fr]"
      >
        <div className="order-2 flex flex-col justify-between gap-8 p-7 sm:p-10 md:order-1">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow shrink-0 whitespace-nowrap text-gold">
            </span>
            <span className="eyebrow truncate rounded-full border border-line px-3 py-1.5 text-[0.55rem] text-mute">
              {project.category}
            </span>
          </div>

          <div>
            <h3 className="display-serif text-[clamp(2.2rem,3.6vw,3.6rem)] leading-[0.98] text-ivory">{project.title}</h3>
            <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-mute">{project.description}</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="rounded-full border border-line px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ivory-dim">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="rounded-full px-2 py-1 font-mono text-[0.58rem] text-mute">+{project.technologies.length - 5}</span>
              )}
            </div>
            <button type="button" onClick={() => onOpen(project)} className="group/btn mt-8 inline-flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover/btn:bg-gold group-hover/btn:text-ink">
                <ArrowUpRight size={17} className="transition-transform duration-500 group-hover/btn:rotate-45" />
              </span>
              <span className="eyebrow text-[0.62rem] text-ivory">{t("projects.viewProject")}</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpen(project)}
          data-cursor={t("ui.view")}
          aria-label={`${t("projects.viewProject")} — ${project.title}`}
          className="relative order-1 m-2.5 min-h-64 overflow-hidden rounded-3xl border border-line sm:min-h-88 md:order-2 md:min-h-0"
        >
          <ProjectVisual project={project} />
        </button>

        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" aria-hidden="true" />
      </motion.article>
    </div>
  );
}

/* ── Modal ───────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const t = useTranslations();
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = project.images.length;

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (count > 1 && e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (count > 1 && e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [count, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      className="fixed inset-0 z-70 flex items-end justify-center bg-ink/80 backdrop-blur-xl sm:items-center sm:p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.7, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[94svh] w-full max-w-5xl overflow-y-auto rounded-t-4xl border border-line bg-ink-2 sm:rounded-4xl"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-ink-2/85 px-6 py-4 backdrop-blur-xl sm:px-8">
          <span className="eyebrow text-[0.6rem] text-gold">
            {project.category}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("projects.modal.close")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory transition-all duration-500 hover:rotate-90 hover:border-gold hover:text-gold"
          >
            <X size={17} />
          </button>
        </div>

        {/* Gallery */}
        <div className="p-3 sm:p-4">
          <div className="relative overflow-hidden rounded-3xl border border-line">
            {count > 0 ? (
              <div className="relative aspect-2/1 bg-ink">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.images[index].src}
                      alt={project.images[index].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1000px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
                {count > 1 && (
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                    <button
                      type="button"
                      aria-label={t("ui.prevImage")}
                      onClick={() => setIndex((i) => (i - 1 + count) % count)}
                      className="glass flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:text-gold"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <span className="glass rounded-full px-4 py-2 font-mono text-[0.65rem] text-ivory-dim">
                    </span>
                    <button
                      type="button"
                      aria-label={t("ui.nextImage")}
                      onClick={() => setIndex((i) => (i + 1) % count)}
                      className="glass flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:text-gold"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-video sm:aspect-21/9">
                <ProjectVisual project={project} framed={false} />
              </div>
            )}
          </div>
          {count > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {project.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={img.alt}
                  className={`relative aspect-2/1 overflow-hidden rounded-xl border transition-all duration-500 ${
                    i === index ? "border-gold opacity-100" : "border-line opacity-45 hover:opacity-80"
                  }`}
                >
                  <Image src={img.src} alt="" fill sizes="300px" className="object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-12 px-6 pb-10 pt-6 sm:px-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 id="project-modal-title" className="display-serif text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] text-ivory">
              {project.title}
            </h2>
            <p className="eyebrow mt-8 text-[0.6rem] text-gold">{t("projects.modal.architecture")}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory-dim">{project.description}</p>
            <p className="eyebrow mt-10 text-[0.6rem] text-gold">{t("projects.modal.technologies")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ivory-dim">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow text-[0.6rem] text-gold">{t("projects.modal.highlights")}</p>
            <ol className="mt-4">
              {project.highlights.map((h, i) => (
                <li key={h} className="flex gap-5 border-b border-line py-4 last:border-0">
                  <span className="text-sm leading-relaxed text-ivory-dim">{h}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export function Projects({ projects }: { projects: Project[] }) {
  const t = useTranslations();
  const [group, setGroup] = useState<ProjectGroup | "All">("All");
  const [open, setOpen] = useState<Project | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  const filtered = useMemo(() => (group === "All" ? projects : projects.filter((p) => p.group === group)), [projects, group]);

  return (
    <section id="projects" className="relative z-10 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel label={t("projects.sectionLabel")} />
            <h2 className="display-serif mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-ivory">
              <SplitReveal text={t("projects.heading")} />
            </h2>
          </div>
          <div className="lg:col-span-12">
            <FilterPills
              layoutId="project-filter"
              value={group}
              onChange={setGroup}
              options={[
                { key: "All" as const, label: t("projects.all") },
                ...PROJECT_GROUPS.map((g) => ({ key: g.key, label: t(g.label) })),
              ]}
            />
          </div>
        </div>

        <div ref={container} key={group} className="relative mt-14 md:mt-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={filtered.length}
              progress={scrollYProgress}
              range={[i / filtered.length, 1]}
              targetScale={isDesktop ? 1 - (filtered.length - 1 - i) * 0.04 : 1}
              onOpen={setOpen}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <ProjectModal key={open.id} project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
