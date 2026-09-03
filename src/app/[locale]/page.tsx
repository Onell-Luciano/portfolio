"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, BarChart3, Database, Globe, Mail, Menu, X, } from "lucide-react";
import { SiDocker, SiGit, SiLeaflet, SiLinux, SiMysql, SiNodedotjs, SiOpenjdk, SiOpenstreetmap,
  SiPostgresql, SiPython, SiPytorch, SiReact, SiSpringboot, SiTypescript,} from "@icons-pack/react-simple-icons";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

export default function LocalePage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [projectImageIndex, setProjectImageIndex] = useState(0);

  const navItems = useMemo(
    () => [
      { label: t("nav.about"), href: `/${locale}#about` },
      { label: t("nav.work"), href: `/${locale}#projects` },
      { label: t("nav.experience"), href: `/${locale}#experience` },
      { label: t("nav.stack"), href: `/${locale}#stack` },
      { label: t("nav.contact"), href: `/${locale}#contact` },
    ],
    [locale, t],
  );

  const technologyGroups = useMemo(
    () => [
      {
        id: "01",
        title: t("stack.languages"),
        technologies: [
          { name: "PHP", category: "Languages", icon: Database },
          { name: "Python", category: "Languages", icon: SiPython },
          { name: "Java", category: "Languages", icon: SiOpenjdk },
          { name: "C / C++ / C#", category: "Languages", icon: Database },
          { name: "SQL / PL/SQL", category: "Languages", icon: Database },
          { name: "TypeScript / JavaScript", category: "Languages", icon: SiTypescript },
          { name: "GDScript", category: "Languages", icon: Database },
        ],
      },
      {
        id: "02",
        title: t("stack.frameworks"),
        technologies: [
          { name: "React / Next.js", category: "Web", icon: SiReact },
          { name: "Node.js / FastAPI", category: "APIs", icon: SiNodedotjs },
          { name: "Spring Boot", category: "Backend", icon: SiSpringboot },
          { name: "Streamlit", category: "Data apps", icon: SiPython },
          { name: "Leaflet.js", category: "Mapping", icon: SiLeaflet },
          { name: "OpenRouteService", category: "Geospatial API", icon: Globe },
          { name: "OpenWeatherMap", category: "Weather API", icon: Globe },
        ],
      },
      {
        id: "03",
        title: t("stack.aiData"),
        technologies: [
          { name: "MindSpore", category: "AI & Data", icon: SiPython },
          { name: "PyTorch", category: "AI & Data", icon: SiPytorch },
          { name: "BERT / LLMs", category: "AI & Data", icon: SiPython },
          { name: "Power BI / DAX", category: "Analytics", icon: BarChart3 },
          { name: "ETL & Web Scraping", category: "Data", icon: Database },
        ],
      },
      {
        id: "04",
        title: t("stack.databaseGis"),
        technologies: [
          { name: "PostgreSQL", category: "Database & GIS", icon: SiPostgresql },
          { name: "PostGIS", category: "Database & GIS", icon: SiPostgresql },
          { name: "MySQL", category: "Database & GIS", icon: SiMysql },
          { name: "Oracle 19c", category: "Database & GIS", icon: Database },
          { name: "OpenStreetMap", category: "Database & GIS", icon: SiOpenstreetmap },
        ],
      },
      {
        id: "05",
        title: t("stack.tools"),
        technologies: [
          { name: "Docker", category: "Tools", icon: SiDocker },
          { name: "Linux", category: "Tools", icon: SiLinux },
          { name: "Git", category: "Tools", icon: SiGit },
          { name: "ORDS / Oracle APEX", category: "Oracle tools", icon: Database },
          { name: "ESP32 / Arduino", category: "IoT", icon: Database },
          { name: "Unity / Blender", category: "Creative tools", icon: Globe },
        ],
      },
    ],
    [t],
  );

  const projects = useMemo(
    () => [
      {
        number: "01",
        title: t("projects.items.webMapping.title"),
        category: t("projects.items.webMapping.category"),
        description: t("projects.items.webMapping.description"),
        technologies: ["Next.js", "React", "Leaflet.js", "PostGIS", "OpenStreetMap", "OpenWeatherMap", "OpenRouteService"],
        images: [
          { src: "/projets/web-mapping/map/Carte0.png", alt: "Interactive web mapping interface" },
          { src: "/projets/web-mapping/meteo/meteo0.png", alt: "Advanced weather center interface" },
          { src: "/projets/web-mapping/meteo/meteo1.png", alt: "Weather data visualization interface" },
        ],
        link: `/${locale}#contact`,
      },
      {
        number: "02",
        title: t("projects.items.construction.title"),
        category: t("projects.items.construction.category"),
        description: t("projects.items.construction.description"),
        technologies: ["FastAPI", "Python", "React", "PostgreSQL", "Algorithms"],
        images: [],
        link: `/${locale}#contact`,
      },
      {
        number: "03",
        title: t("projects.items.nlp.title"),
        category: t("projects.items.nlp.category"),
        description: t("projects.items.nlp.description"),
        technologies: ["Python", "BERT", "LLMs", "NLP", "Data visualization"],
        images: [],
        link: `/${locale}#contact`,
      },
      {
        number: "04",
        title: t("projects.items.currency.title"),
        category: t("projects.items.currency.category"),
        description: t("projects.items.currency.description"),
        technologies: ["Next.js", "TypeScript", "NextAuth", "Prisma", "PostgreSQL", "Charts"],
        images: [],
        link: `/${locale}#contact`,
      },
      {
        number: "05",
        title: t("projects.items.stock.title"),
        category: t("projects.items.stock.category"),
        description: t("projects.items.stock.description"),
        technologies: ["Python", "Streamlit", "EOQ", "Wilson model", "Decision support"],
        images: [],
        link: `/${locale}#contact`,
      },
    ],
    [locale, t],
  );

  const experiences = useMemo(
    () => [
      { period: t("experience.items.cci.period"), company: t("experience.items.cci.company"), role: t("experience.items.cci.role"), description: t("experience.items.cci.description"), technologies: ["Node.js", "PostgreSQL", "PostGIS", "Leaflet", "GeoJSON"], highlight: false },
      { period: t("experience.items.currency.period"), company: t("experience.items.currency.company"), role: t("experience.items.currency.role"), description: t("experience.items.currency.description"), technologies: ["Next.js", "TypeScript", "NextAuth", "Prisma"], highlight: false },
      { period: t("experience.items.data.period"), company: t("experience.items.data.company"), role: t("experience.items.data.role"), description: t("experience.items.data.description"), technologies: ["Python", "Power BI", "Power Query", "DAX"], highlight: false },
      { period: t("experience.items.nlp.period"), company: t("experience.items.nlp.company"), role: t("experience.items.nlp.role"), description: t("experience.items.nlp.description"), technologies: ["Python", "NLP", "BERT", "LLMs"], highlight: false },
      { period: t("experience.items.titan.period"), company: t("experience.items.titan.company"), role: t("experience.items.titan.role"), description: t("experience.items.titan.description"), technologies: ["FastAPI", "Python", "React", "PostgreSQL", "Algorithms"], highlight: false },
      { period: t("experience.items.stock.period"), company: t("experience.items.stock.company"), role: t("experience.items.stock.role"), description: t("experience.items.stock.description"), technologies: ["Python", "Streamlit", "EOQ", "Wilson model"], highlight: false },
      { period: t("experience.items.bionexx.period"), company: "BIONEXX · Fianarantsoa", role: t("experience.items.bionexx.role"), description: t("experience.items.bionexx.description"), technologies: ["Leaflet.js", "PostGIS", "OpenWeatherMap", "Data visualization"], highlight: true },
    ].reverse(),
    [t],
  );

  const education = useMemo(
    () => [
      { period: t("education.bachelor.period"), title: t("education.bachelor.title"), institution: t("education.bachelor.institution") },
      { period: t("education.huawei.period"), title: t("education.huawei.title"), institution: t("education.huawei.institution") },
      { period: t("education.powerBI.period"), title: t("education.powerBI.title"), institution: t("education.powerBI.institution") },
      { period: t("education.aws.period"), title: t("education.aws.title"), institution: t("education.aws.institution") },
      { period: t("education.iot.period"), title: t("education.iot.title"), institution: t("education.iot.institution") },
      { period: t("education.unitarEconomies.period"), title: t("education.unitarEconomies.title"), institution: t("education.unitarEconomies.institution") },
      { period: t("education.unitarPolicy.period"), title: t("education.unitarPolicy.title"), institution: t("education.unitarPolicy.institution") },
    ],
    [t],
  );

  const switchLanguage = (nextLocale: string) => {
    const path = pathname.replace(/^\/[a-z]{2}/, `/${nextLocale}`);
    router.push(path || `/${nextLocale}`);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined") return;
    const handlePointerMove = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !hoveredProject) return;
    const project = projects.find((item) => item.title === hoveredProject);
    if (!project || project.images.length < 2) return;

    const interval = window.setInterval(() => {
      setProjectImageIndex((index) => (index + 1) % project.images.length);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [hoveredProject, projects, reduceMotion]);

  const parallaxX = reduceMotion ? 0 : cursor.x * 0.015;
  const parallaxY = reduceMotion ? 0 : cursor.y * 0.015;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${isScrolled ? "border-white/10 bg-[#050b16]/80 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href={`/${locale}#home`} className="text-lg font-semibold tracking-[0.18em] text-white transition hover:text-cyan-300">O&apos;NELL</a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link text-[0.7rem] font-medium tracking-[0.22em] text-slate-300">{item.label}</a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div aria-label={t("common.ariaLanguage")} className="inline-flex rounded-full border border-(--border) bg-white/3 p-1">
              {['en', 'fr'].map((option) => (
                <button key={option} type="button" aria-label={`Switch to ${option.toUpperCase()}`} aria-current={locale === option ? "true" : undefined} onClick={() => switchLanguage(option)} className={`rounded-full px-3 py-1.5 text-[0.68rem] font-medium tracking-[0.18em] transition ${locale === option ? "bg-cyan-500/20 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.22)]" : "text-slate-300 hover:text-white"}`}>
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <div aria-label={t("common.ariaLanguage")} className="inline-flex rounded-full border border-(--border) bg-white/3 p-1">
              {['en', 'fr'].map((option) => (
                <button key={option} type="button" aria-label={`Switch to ${option.toUpperCase()}`} aria-current={locale === option ? "true" : undefined} onClick={() => switchLanguage(option)} className={`rounded-full px-2 py-1 text-[0.6rem] font-medium tracking-[0.12em] transition ${locale === option ? "bg-cyan-500/20 text-cyan-200" : "text-slate-300"}`}>
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" aria-expanded={mobileOpen} aria-label="Toggle navigation" className="inline-flex items-center gap-2 px-1 py-2 text-[0.68rem] font-medium tracking-[0.2em] text-slate-100" onClick={() => setMobileOpen((open) => !open)}>
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              <span>MENU</span>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#050b16] md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-4">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="border-b border-white/5 py-3 text-sm font-medium tracking-[0.2em] text-slate-300 last:border-b-0" onClick={() => setMobileOpen(false)}>{item.label}</a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative z-10 min-h-screen overflow-hidden bg-[#050b16]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_48%,rgba(31,111,177,0.14),transparent_33%),linear-gradient(115deg,#050b16_0%,#07101d_55%,#050b16_100%)]" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.72fr)] lg:gap-8 lg:px-8 lg:pb-20 lg:pt-24">
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }} className="relative z-10">
            <motion.p variants={reveal} className="mb-7 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-cyan-200/75 sm:mb-10">{t("hero.eyebrow")} <span className="mx-2 text-white/25">/</span> {t("hero.discipline")}</motion.p>
            <h1 className="max-w-4xl text-[clamp(3.3rem,8.2vw,8.2rem)] font-semibold uppercase leading-[0.84] tracking-[-0.075em] text-white">
              {["lineOne", "lineTwo", "lineThree", "lineFour", "lineFive"].map((line, index) => (
                <motion.span key={line} variants={reveal} className={`block ${index === 2 ? "text-white/70" : ""} ${index === 3 ? "pl-[0.08em] font-normal text-cyan-100/90" : ""}`}>
                  {t(`hero.headline.${line}`)}
                </motion.span>
              ))}
            </h1>
            <motion.div variants={reveal} className="mt-10 max-w-md border-l border-cyan-300/40 pl-4 sm:mt-12 sm:pl-5">
              <p className="text-sm leading-7 text-slate-300 sm:text-base">{t("hero.statement")}</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">{t("hero.description")}</p>
            </motion.div>
            <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10">
              <a href={`/${locale}#projects`} className="group inline-flex items-center gap-3 border border-cyan-200/55 px-5 py-3 text-[0.68rem] font-medium tracking-[0.2em] text-white transition-colors hover:border-cyan-200 hover:bg-cyan-100/10">{t("hero.viewWork")}<ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" /></a>
              <a href={`/${locale}#contact`} className="group inline-flex items-center gap-2 border-b border-white/30 px-1 py-3 text-[0.68rem] font-medium tracking-[0.2em] text-slate-300 transition-colors hover:border-cyan-200 hover:text-white">{t("hero.letsTalk")}</a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 1.03 }} animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, x: parallaxX * 0.18, y: parallaxY * 0.18 }} transition={{ duration: 1.15, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto aspect-square w-[min(82vw,560px)] lg:-mr-12 lg:w-[min(42vw,560px)]">
            <div aria-hidden="true" className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle_at_55%_43%,rgba(54,180,224,0.2),rgba(26,92,160,0.08)_38%,transparent_70%)] opacity-75 blur-3xl" />
            <div aria-hidden="true" className="absolute inset-[-3%] rounded-full bg-[radial-gradient(circle_at_38%_62%,rgba(70,190,224,0.18),transparent_58%)] opacity-70 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image src="/image/profile/jqcDP.jpg" alt="O'Nell Rasamiarison, full-stack developer" fill priority sizes="(max-width: 1023px) 82vw, 42vw" className="rounded-full object-cover object-top brightness-[0.92] contrast-[1.04] saturate-[0.9]" />
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-4 text-[0.62rem] uppercase tracking-[0.26em] text-slate-500 sm:left-6 lg:left-8">01 <span className="mx-2 text-cyan-300/60">/</span> {t("hero.scroll")}</div>
      </section>

      <section id="about" className="relative z-10 border-t border-(--border) bg-[rgba(6,21,43,0.42)]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-16">
            <div><p className="section-tag">01 / {locale === "fr" ? "COMPÉTENCES" : "CAPABILITIES"}</p></div>
            <div className="space-y-8">
              <h2 className="max-w-4xl text-3xl font-semibold tracking-tighter text-white sm:text-5xl">{t("capabilities.heading")}</h2>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-(--border) bg-[rgba(8,27,51,0.7)] p-5"><p className="text-[0.64rem] uppercase tracking-[0.22em] text-slate-400">{t("capabilities.fullStack")}</p><p className="mt-3 text-2xl font-semibold text-white">{t("capabilities.fullStackText")}</p></div>
                <div className="rounded-2xl border border-(--border) bg-[rgba(8,27,51,0.7)] p-5"><p className="text-[0.64rem] uppercase tracking-[0.22em] text-slate-400">{t("capabilities.ai")}</p><p className="mt-3 text-2xl font-semibold text-white">{t("capabilities.aiText")}</p></div>
                <div className="rounded-2xl border border-(--border) bg-[rgba(8,27,51,0.7)] p-5"><p className="text-[0.64rem] uppercase tracking-[0.22em] text-slate-400">{t("capabilities.data")}</p><p className="mt-3 text-2xl font-semibold text-white">{t("capabilities.dataText")}</p></div>
                <div className="rounded-2xl border border-(--border) bg-[rgba(8,27,51,0.7)] p-5"><p className="text-[0.64rem] uppercase tracking-[0.22em] text-slate-400">{t("capabilities.gis")}</p><p className="mt-3 text-2xl font-semibold text-white">{t("capabilities.gisText")}</p></div>
                <div className="rounded-2xl border border-(--border) bg-[rgba(8,27,51,0.7)] p-5 md:col-span-2 xl:col-span-2"><p className="text-[0.64rem] uppercase tracking-[0.22em] text-slate-400">{t("capabilities.focus")}</p><p className="mt-3 text-2xl font-semibold text-white">{t("capabilities.focusText")}</p></div>
              </div>
              <div className="border-t border-(--border) pt-6">
                <p className="section-tag">{t("skills.heading")}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2" aria-label={t("skills.heading")}>
                  {["learning", "curiosity", "adaptability", "communication", "time", "initiative"].map((skill, index) => (
                    <li key={skill} className="flex items-center gap-3 text-sm text-slate-300">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" />
                      <span>{t(`skills.soft.${skill}`)}</span>
                      <span aria-hidden="true" className="ml-auto text-xs text-slate-600">0{index + 1}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm leading-7 text-slate-500">{t("skills.languages")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="relative z-10 border-t border-(--border)">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-12"><p className="section-tag">02 / {locale === "fr" ? "TECHNOLOGIES" : "TECHNOLOGY"}</p><h2 className="mt-4 text-3xl font-semibold tracking-tighter text-white sm:text-5xl">{t("stack.heading")}</h2></div>
          <div className="space-y-8">{technologyGroups.map((group, groupIndex) => (<div key={group.title} className="rounded-[28px] border border-(--border) bg-[rgba(8,27,51,0.8)] p-5 sm:p-6"><div className="mb-5 flex items-center justify-between gap-3"><p className="text-[0.66rem] uppercase tracking-[0.28em] text-slate-400">{group.id} — {group.title}</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{group.technologies.map((technology, techIndex) => { const Icon = technology.icon; return <motion.div key={technology.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: groupIndex * 0.08 + techIndex * 0.05 }} className="tech-card group flex h-full min-h-42.5 flex-col justify-between rounded-2xl border border-(--border) bg-[rgba(2,6,23,0.48)] p-4"><div className="flex items-start justify-between"><div className="inline-flex rounded-xl border border-cyan-400/20 bg-cyan-400/8 p-3 text-cyan-200"><Icon size={22} /></div><span className="rounded-full border border-(--border) px-2 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-slate-400">{technology.category}</span></div><div><h3 className="mt-8 text-xl font-semibold text-white">{technology.name}</h3><p className="mt-1 text-sm text-slate-400">{technology.category}</p></div></motion.div>;})}</div></div>))}</div>
        </div>
      </section>

      <section id="projects" className="relative z-10 border-t border-(--border) bg-[rgba(6,21,43,0.42)]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><div className="mb-12"><p className="section-tag">03 / {locale === "fr" ? "PROJETS SÉLECTIONNÉS" : "SELECTED WORK"}</p><h2 className="mt-4 text-3xl font-semibold tracking-tighter text-white sm:text-5xl">{t("projects.heading")}</h2></div><div className="grid gap-6 lg:grid-cols-2">{projects.map((project, index) => (<motion.article key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: index * 0.06 }} onMouseEnter={() => { if (project.images.length > 0) { setHoveredProject(project.title); setProjectImageIndex(0); } }} onMouseLeave={() => { setHoveredProject(null); setProjectImageIndex(0); }} className="project-card group overflow-hidden rounded-[28px] border border-(--border) bg-[rgba(8,27,51,0.82)] p-4 sm:p-5"><div className="mb-4 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.24em] text-slate-400"><span>{project.number}</span><span>{project.category}</span></div>{project.images.length > 0 ? <div className="relative h-57.5 overflow-hidden rounded-[22px] border border-(--border) bg-slate-950"><motion.div key={`${project.title}-${projectImageIndex}`} initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="absolute inset-0"><Image src={project.images[projectImageIndex].src} alt={project.images[projectImageIndex].alt} fill sizes="(max-width: 1023px) 90vw, 42vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" /></motion.div><div className="absolute bottom-3 right-3 flex gap-1.5" aria-hidden="true">{project.images.map((image, imageIndex) => <span key={image.src} className={`h-1.5 w-1.5 rounded-full ${imageIndex === projectImageIndex ? "bg-cyan-200" : "bg-white/35"}`} />)}</div></div> : <div className="image-placeholder overflow-hidden rounded-[22px] border border-(--border) bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),rgba(8,27,51,0.8)_42%,rgba(2,6,23,0.96)_100%)]"><div className="flex h-57.5 items-center justify-center px-6 text-center"><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-slate-400">{locale === "fr" ? "APERÇU DU PROJET" : "PROJECT PREVIEW"}</p><p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-100">{locale === "fr" ? "À VENIR" : "COMING SOON"}</p></div></div></div>}<div className="mt-6 flex items-start justify-between gap-6"><div><h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{project.title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{project.description}</p></div></div><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((technology) => (<span key={technology} className="rounded-full border border-(--border) bg-white/2 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-slate-300">{technology}</span>))}</div><a href={project.link} className="mt-6 inline-flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-cyan-200">{t("projects.viewProject")}<ArrowRight size={14} /></a></motion.article>))}</div></div>
      </section>

      <section id="experience" className="relative z-10 border-t border-(--border)">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-tag">04 / {locale === "fr" ? "EXPÉRIENCE" : "EXPERIENCE"}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tighter text-white sm:text-5xl">{t("experience.heading")}</h2>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-linear-to-b from-cyan-400/0 via-cyan-400/35 to-cyan-400/0 md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-10 md:space-y-14">
              {experiences.map((experience, index) => (
                <div key={`${experience.company}-${experience.role}`} className="relative grid md:grid-cols-[1fr_72px_1fr] md:items-start">
                  <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5 }} className={`relative ml-10 rounded-2xl border p-5 sm:p-6 md:ml-0 ${index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"} ${experience.highlight ? "border-cyan-400/25 bg-linear-to-r from-cyan-400/8 to-blue-500/5 shadow-[0_0_30px_rgba(34,211,238,0.08)]" : "border-(--border) bg-[rgba(8,27,51,0.7)]"}`}>
                    <div className="flex flex-col gap-4 border-b border-white/10 pb-5">
                      <div><p className="text-[0.64rem] uppercase tracking-[0.2em] text-slate-400">{experience.company}</p><h3 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">{experience.role}</h3></div>
                      <span className="w-fit text-[0.64rem] uppercase tracking-[0.16em] text-cyan-200/80">{experience.period}</span>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-slate-300">{experience.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{experience.technologies.map((technology) => <span key={technology} className="border border-(--border) px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-slate-400">{technology}</span>)}</div>
                  </motion.article>
                  <div aria-hidden="true" className="absolute left-1.5 top-7 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#07101d] bg-cyan-300 shadow-[0_0_0_1px_rgba(103,232,249,0.55)] md:relative md:left-auto md:top-7 md:col-start-2 md:row-start-1 md:mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="relative z-10 border-t border-(--border) bg-[rgba(6,21,43,0.42)]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><div className="mb-12"><p className="section-tag">05 / {locale === "fr" ? "FORMATION" : "EDUCATION & TRAINING"}</p><h2 className="mt-4 text-3xl font-semibold tracking-tighter text-white sm:text-5xl">{t("education.heading")}</h2></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{education.map((item, index) => (<motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.04 }} className="rounded-3xl border border-(--border) bg-[rgba(8,27,51,0.72)] p-5"><p className="text-[0.62rem] uppercase tracking-[0.2em] text-slate-400">{item.period}</p><h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3><p className="mt-2 text-sm leading-7 text-slate-300">{item.institution}</p></motion.div>))}</div></div>
      </section>

      <section id="contact" className="relative z-10 border-t border-(--border)">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><div className="rounded-4xl border border-cyan-400/20 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),rgba(8,27,51,0.9)_42%,rgba(2,6,23,0.97)_100%)] p-8 shadow-[0_0_32px_rgba(59,130,246,0.12)] sm:p-12"><p className="section-tag">06 / {locale === "fr" ? "CONTACT" : "CONTACT"}</p><h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">{t("contact.heading")}</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t("contact.subheading")}</p><div className="mt-8 flex flex-wrap items-center gap-4"><a href="mailto:rasamiarisonluciano@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white shadow-[0_0_24px_rgba(34,211,238,0.12)] transition duration-200 hover:-translate-y-0.5"><Mail size={16} />{t("contact.cta")}</a><a href="https://github.com/ONell-Luciano" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-white/2 px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30"><Globe size={16} />{t("contact.github")}</a></div><div className="mt-10 grid gap-4 md:grid-cols-2"><a href="mailto:rasamiarisonluciano@gmail.com" className="rounded-2xl border border-(--border) bg-[rgba(8,27,51,0.7)] p-5 transition duration-200 hover:border-cyan-400/25 hover:bg-cyan-400/4"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-slate-400">{t("contact.email")}</p><p className="mt-3 text-lg text-white">rasamiarisonluciano@gmail.com</p></a><a href="https://github.com/ONell-Luciano" target="_blank" rel="noreferrer" className="rounded-2xl border border-(--border) bg-[rgba(8,27,51,0.7)] p-5 transition duration-200 hover:border-cyan-400/25 hover:bg-cyan-400/4"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-slate-400">{t("contact.github")}</p><p className="mt-3 text-lg text-white">{t("contact.githubTitle")}</p></a></div></div></div>
      </section>

      <footer className="relative z-10 border-t border-(--border) bg-[rgba(2,6,23,0.9)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-xs uppercase tracking-[0.2em] text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div className="flex items-center gap-3 text-slate-200"><span>O&apos;NELL RASAMIARISON</span></div><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6"><span>{t("footer.description")}</span><div className="flex items-center gap-4"><a href="https://github.com/ONell-Luciano" target="_blank" rel="noreferrer" className="hover:text-cyan-200">{t("footer.github")}</a><a href="mailto:rasamiarisonluciano@gmail.com" className="hover:text-cyan-200">{t("footer.email")}</a></div></div></div>
        <div className="mx-auto max-w-7xl border-t border-(--border) px-4 py-5 text-xs text-slate-500 sm:px-6 lg:px-8">© {new Date().getFullYear()} O&apos;NELL RASAMIARISON</div>
      </footer>
    </main>
  );
}
