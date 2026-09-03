"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  Globe,
  Layers,
  Mail,
  MapPin,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import {
  SiDocker,
  SiGit,
  SiLeaflet,
  SiLinux,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiOpenstreetmap,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiSpringboot,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

// Staggered reveal variants
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

export default function LocalePage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const reduceMotion = useReducedMotion();

  // State management
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechCategory, setSelectedTechCategory] = useState("All");
  const [selectedProjectCategory, setSelectedProjectCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [projectImageIndex, setProjectImageIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<any | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync theme with localStorage and document element
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  // Navigation Items
  const navItems = useMemo(
    () => [
      { label: t("nav.about"), href: `#about`, id: "about" },
      { label: t("nav.stack"), href: `#stack`, id: "stack" },
      { label: t("nav.work"), href: `#projects`, id: "projects" },
      { label: t("nav.experience"), href: `#experience`, id: "experience" },
      { label: t("nav.contact"), href: `#contact`, id: "contact" },
    ],
    [t]
  );

  // Technology Groups & Directory
  const technologyGroups = useMemo(
    () => [
      {
        id: "01",
        title: t("stack.languages"),
        categoryKey: "Languages",
        technologies: [
          { name: "Python", category: "Languages", icon: SiPython, level: "Advanced" },
          { name: "TypeScript", category: "Languages", icon: SiTypescript, level: "Advanced" },
          { name: "JavaScript", category: "Languages", icon: SiTypescript, level: "Advanced" },
          { name: "Java", category: "Languages", icon: SiOpenjdk, level: "Intermediate" },
          { name: "PHP", category: "Languages", icon: Database, level: "Intermediate" },
          { name: "C / C++ / C#", category: "Languages", icon: Database, level: "Intermediate" },
          { name: "SQL / PL-SQL", category: "Languages", icon: Database, level: "Advanced" },
        ],
      },
      {
        id: "02",
        title: t("stack.frameworks"),
        categoryKey: "Frameworks",
        technologies: [
          { name: "React / Next.js", category: "Frameworks", icon: SiReact, level: "Advanced" },
          { name: "Node.js / Express", category: "Frameworks", icon: SiNodedotjs, level: "Advanced" },
          { name: "FastAPI / Python", category: "Frameworks", icon: SiPython, level: "Advanced" },
          { name: "Spring Boot", category: "Frameworks", icon: SiSpringboot, level: "Intermediate" },
          { name: "Leaflet.js", category: "Frameworks", icon: SiLeaflet, level: "Expert" },
          { name: "Streamlit", category: "Frameworks", icon: SiPython, level: "Advanced" },
        ],
      },
      {
        id: "03",
        title: t("stack.aiData"),
        categoryKey: "AI & Data",
        technologies: [
          { name: "PyTorch", category: "AI & Data", icon: SiPytorch, level: "Advanced" },
          { name: "BERT & LLM Pipelines", category: "AI & Data", icon: SiPython, level: "Advanced" },
          { name: "MindSpore", category: "AI & Data", icon: SiPython, level: "Intermediate" },
          { name: "Power BI / DAX", category: "AI & Data", icon: BarChart3, level: "Advanced" },
          { name: "ETL & Web Scraping", category: "AI & Data", icon: Database, level: "Advanced" },
        ],
      },
      {
        id: "04",
        title: t("stack.databaseGis"),
        categoryKey: "Database & GIS",
        technologies: [
          { name: "PostgreSQL & PostGIS", category: "Database & GIS", icon: SiPostgresql, level: "Expert" },
          { name: "MySQL", category: "Database & GIS", icon: SiMysql, level: "Advanced" },
          { name: "Oracle 19c & APEX", category: "Database & GIS", icon: Database, level: "Intermediate" },
          { name: "OpenStreetMap API", category: "Database & GIS", icon: SiOpenstreetmap, level: "Expert" },
        ],
      },
      {
        id: "05",
        title: t("stack.tools"),
        categoryKey: "Tools & DevOps",
        technologies: [
          { name: "Docker", category: "Tools & DevOps", icon: SiDocker, level: "Intermediate" },
          { name: "Git / GitHub", category: "Tools & DevOps", icon: SiGit, level: "Advanced" },
          { name: "Linux Administration", category: "Tools & DevOps", icon: SiLinux, level: "Advanced" },
          { name: "ESP32 / IoT", category: "Tools & DevOps", icon: Database, level: "Intermediate" },
        ],
      },
    ],
    [t]
  );

  // Flattened tech list for searching
  const allTechnologies = useMemo(() => {
    return technologyGroups.flatMap((group) => group.technologies);
  }, [technologyGroups]);

  // Filtered Tech Stack based on Search Query & Selected Category
  const filteredTechnologies = useMemo(() => {
    return allTechnologies.filter((tech) => {
      const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedTechCategory === "All" || tech.category === selectedTechCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allTechnologies, searchQuery, selectedTechCategory]);

  // Projects Showcase List
  const projects = useMemo(
    () => [
      {
        id: "web-mapping",
        number: "01",
        title: t("projects.items.webMapping.title"),
        category: t("projects.items.webMapping.category"),
        categoryGroup: "GIS",
        description: t("projects.items.webMapping.description"),
        technologies: ["Next.js", "React", "Leaflet.js", "PostGIS", "OpenStreetMap", "OpenWeatherMap", "OpenRouteService"],
        images: [
          { src: "/projets/web-mapping/map/Carte0.png", alt: "Interactive web mapping interface" },
          { src: "/projets/web-mapping/meteo/meteo0.png", alt: "Advanced weather center interface" },
          { src: "/projets/web-mapping/meteo/meteo1.png", alt: "Weather data visualization interface" },
        ],
        highlights: [
          t("projects.items.webMapping.highlights.0"),
          t("projects.items.webMapping.highlights.1"),
          t("projects.items.webMapping.highlights.2"),
          t("projects.items.webMapping.highlights.3"),
        ],
      },
      {
        id: "construction-planning",
        number: "02",
        title: t("projects.items.construction.title"),
        category: t("projects.items.construction.category"),
        categoryGroup: "Full-Stack",
        description: t("projects.items.construction.description"),
        technologies: ["FastAPI", "Python", "React", "PostgreSQL", "Ordonnancement"],
        images: [],
        highlights: [
          t("projects.items.construction.highlights.0"),
          t("projects.items.construction.highlights.1"),
          t("projects.items.construction.highlights.2"),
          t("projects.items.construction.highlights.3"),
        ],
      },
      {
        id: "nlp-llm",
        number: "03",
        title: t("projects.items.nlp.title"),
        category: t("projects.items.nlp.category"),
        categoryGroup: "AI",
        description: t("projects.items.nlp.description"),
        technologies: ["Python", "BERT", "LLMs", "NLP", "Dashboarding"],
        images: [],
        highlights: [
          t("projects.items.nlp.highlights.0"),
          t("projects.items.nlp.highlights.1"),
          t("projects.items.nlp.highlights.2"),
          t("projects.items.nlp.highlights.3"),
        ],
      },
      {
        id: "currency-track",
        number: "04",
        title: t("projects.items.currency.title"),
        category: t("projects.items.currency.category"),
        categoryGroup: "Full-Stack",
        description: t("projects.items.currency.description"),
        technologies: ["Next.js", "TypeScript", "NextAuth", "Prisma", "PostgreSQL", "Recharts"],
        images: [],
        highlights: [
          t("projects.items.currency.highlights.0"),
          t("projects.items.currency.highlights.1"),
          t("projects.items.currency.highlights.2"),
          t("projects.items.currency.highlights.3"),
        ],
      },
      {
        id: "stock-management",
        number: "05",
        title: t("projects.items.stock.title"),
        category: t("projects.items.stock.category"),
        categoryGroup: "Optimization",
        description: t("projects.items.stock.description"),
        technologies: ["Python", "Streamlit", "Modèle Wilson", "EOQ", "Data Analysis"],
        images: [],
        highlights: [
          t("projects.items.stock.highlights.0"),
          t("projects.items.stock.highlights.1"),
          t("projects.items.stock.highlights.2"),
          t("projects.items.stock.highlights.3"),
        ],
      },
    ],
    [t]
  );

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedProjectCategory === "All") return projects;
    return projects.filter((p) => p.categoryGroup === selectedProjectCategory);
  }, [projects, selectedProjectCategory]);

  // Experiences List
  const experiences = useMemo(
    () => [
      {
        period: t("experience.items.cci.period"),
        company: t("experience.items.cci.company"),
        role: t("experience.items.cci.role"),
        description: t("experience.items.cci.description"),
        technologies: ["Node.js", "PostgreSQL", "PostGIS", "Leaflet.js", "GeoJSON"],
        highlight: false,
      },
      {
        period: t("experience.items.currency.period"),
        company: t("experience.items.currency.company"),
        role: t("experience.items.currency.role"),
        description: t("experience.items.currency.description"),
        technologies: ["Next.js", "TypeScript", "NextAuth", "Prisma", "PostgreSQL"],
        highlight: false,
      },
      {
        period: t("experience.items.data.period"),
        company: t("experience.items.data.company"),
        role: t("experience.items.data.role"),
        description: t("experience.items.data.description"),
        technologies: ["Python", "Power BI", "Power Query", "DAX", "Low-code ML"],
        highlight: false,
      },
      {
        period: t("experience.items.nlp.period"),
        company: t("experience.items.nlp.company"),
        role: t("experience.items.nlp.role"),
        description: t("experience.items.nlp.description"),
        technologies: ["Python", "NLP", "BERT", "LLMs", "Data Viz"],
        highlight: false,
      },
      {
        period: t("experience.items.titan.period"),
        company: t("experience.items.titan.company"),
        role: t("experience.items.titan.role"),
        description: t("experience.items.titan.description"),
        technologies: ["FastAPI", "Python", "React", "PostgreSQL", "Algorithmes"],
        highlight: false,
      },
      {
        period: t("experience.items.stock.period"),
        company: t("experience.items.stock.company"),
        role: t("experience.items.stock.role"),
        description: t("experience.items.stock.description"),
        technologies: ["Python", "Streamlit", "Wilson Method", "EOQ"],
        highlight: false,
      },
      {
        period: t("experience.items.bionexx.period"),
        company: t("experience.items.bionexx.company"),
        role: t("experience.items.bionexx.role"),
        description: t("experience.items.bionexx.description"),
        technologies: ["Leaflet.js", "PostGIS", "OpenWeatherMap", "Data Viz", "Agriculture"],
        highlight: true,
      },
    ].reverse(),
    [t]
  );

  // Education & Credentials
  const education = useMemo(
    () => [
      {
        period: t("education.bachelor.period"),
        title: t("education.bachelor.title"),
        institution: t("education.bachelor.institution"),
        badge: "Degree",
      },
      {
        period: t("education.huawei.period"),
        title: t("education.huawei.title"),
        institution: t("education.huawei.institution"),
        badge: "Certification",
      },
      {
        period: t("education.powerBI.period"),
        title: t("education.powerBI.title"),
        institution: t("education.powerBI.institution"),
        badge: "Training",
      },
      {
        period: t("education.aws.period"),
        title: t("education.aws.title"),
        institution: t("education.aws.institution"),
        badge: "Certification",
      },
      {
        period: t("education.iot.period"),
        title: t("education.iot.title"),
        institution: t("education.iot.institution"),
        badge: "Hardware & IoT",
      },
      {
        period: t("education.unitarEconomies.period"),
        title: t("education.unitarEconomies.title"),
        institution: t("education.unitarEconomies.institution"),
        badge: "International",
      },
      {
        period: t("education.unitarPolicy.period"),
        title: t("education.unitarPolicy.title"),
        institution: t("education.unitarPolicy.institution"),
        badge: "International",
      },
    ],
    [t]
  );

  // Language switcher
  const switchLanguage = (nextLocale: string) => {
    const path = pathname.replace(/^\/[a-z]{2}/, `/${nextLocale}`);
    router.push(path || `/${nextLocale}`);
  };

  // Copy email functionality with Toast
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rasamiarisonluciano@gmail.com");
    setToastMessage(t("contact.emailCopied"));
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scroll listener for sticky header & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "about", "stack", "projects", "experience", "education", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom Cursor Pointer tracking
  useEffect(() => {
    if (reduceMotion || typeof window === "undefined") return;
    const handlePointerMove = (e: PointerEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion]);

  // Dynamic Image slider for cards on hover
  useEffect(() => {
    if (reduceMotion || !hoveredProject) return;
    const project = projects.find((item) => item.title === hoveredProject);
    if (!project || project.images.length < 2) return;

    const interval = window.setInterval(() => {
      setProjectImageIndex((index) => (index + 1) % project.images.length);
    }, 1400);

    return () => window.clearInterval(interval);
  }, [hoveredProject, projects, reduceMotion]);

  // Interactive Particle Canvas background effect
  useEffect(() => {
    if (reduceMotion || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const numParticles = 45;
    const particles = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes & links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme === "dark" ? `rgba(34, 211, 238, ${p.alpha})` : `rgba(2, 132, 199, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = theme === "dark" ? `rgba(34, 211, 238, ${0.15 * (1 - dist / 110)})` : `rgba(2, 132, 199, ${0.2 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduceMotion, theme]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-cyan-500/30 selection:text-white">
      {/* Interactive Particle Canvas */}
      {!reduceMotion && (
        <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
      )}

      {/* Custom Cursor follower */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 hidden rounded-full transition-transform duration-100 md:block ${
            cursorHovered
              ? "h-12 w-12 border border-cyan-300 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              : "h-6 w-6 border border-cyan-400/40 bg-cyan-400/15"
          }`}
          style={{
            transform: `translate3d(${cursor.x - (cursorHovered ? 24 : 12)}px, ${
              cursor.y - (cursorHovered ? 24 : 12)
            }px, 0)`,
          }}
        />
      )}

      {/* Floating Header Navigation */}
      <nav
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
          isScrolled
            ? "border-cyan-500/20 bg-white/85 dark:bg-[#020617]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(2,6,23,0.15)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            className="group flex items-center gap-2 text-lg font-bold tracking-[0.2em] text-slate-900 dark:text-white transition hover:text-cyan-600 dark:hover:text-cyan-300"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-xs font-mono text-cyan-600 dark:text-cyan-300 transition group-hover:border-cyan-300 group-hover:bg-cyan-400/25">
              O
            </span>
            <span>O&apos;NELL</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className={`nav-link text-[0.72rem] font-medium tracking-[0.22em] transition ${
                  activeSection === item.id
                    ? "text-cyan-600 dark:text-cyan-300 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions: Download CV + Theme Switcher + Language Switcher */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/cv/CV.pdf"
              download="CV_ONell_Luciano_Rasamiarison.pdf"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.18em] text-cyan-600 dark:text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.15)] transition duration-200 hover:border-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-700 dark:hover:text-white"
            >
              <Download size={13} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>{t("common.downloadCv")}</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              type="button"
              aria-label="Switch Theme Mode"
              onClick={toggleTheme}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/20 bg-slate-100/90 dark:bg-slate-900/60 text-cyan-600 dark:text-cyan-300 backdrop-blur-md transition hover:scale-105 hover:border-cyan-400"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Language Switcher */}
            <div
              aria-label={t("common.ariaLanguage")}
              className="inline-flex rounded-full border border-cyan-500/20 bg-slate-100/90 dark:bg-slate-900/60 p-1 backdrop-blur-md"
            >
              {["en", "fr"].map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-label={`Switch to ${option.toUpperCase()}`}
                  onClick={() => switchLanguage(option)}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className={`rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.18em] transition ${
                    locale === option
                      ? "bg-cyan-500/25 text-cyan-700 dark:text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              type="button"
              aria-label="Switch Theme Mode"
              onClick={toggleTheme}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/20 bg-slate-100 dark:bg-slate-900/80 text-cyan-600 dark:text-cyan-300"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <a
              href="/cv/CV.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-cyan-600 dark:text-cyan-200"
            >
              <Download size={12} />
              <span>CV</span>
            </a>

            <div className="inline-flex rounded-full border border-cyan-500/20 bg-slate-100 dark:bg-slate-900/60 p-0.5">
              {["en", "fr"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => switchLanguage(option)}
                  className={`rounded-full px-2 py-0.5 text-[0.58rem] font-bold tracking-[0.1em] transition ${
                    locale === option ? "bg-cyan-500/25 text-cyan-700 dark:text-cyan-200" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              aria-expanded={mobileOpen}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/80 p-2 text-slate-800 dark:text-slate-200"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="border-t border-cyan-500/20 bg-white dark:bg-[#020617] px-4 py-5 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium tracking-[0.2em] text-slate-800 dark:text-slate-200 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 border-t border-slate-200 dark:border-slate-800 pt-3 flex flex-col gap-2">
                <a
                  href="/cv/CV.pdf"
                  download
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <Download size={14} />
                  <span>{t("common.downloadCv")}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen overflow-hidden pb-16 pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            {/* Left Column: Headlines & Statements */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } } }}
            >
              <motion.p variants={reveal} className="mb-4 text-xs font-mono font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-400">
                {t("hero.eyebrow")} <span className="mx-2 text-slate-400 dark:text-slate-600">/</span> {t("hero.discipline")}
              </motion.p>

              <h1 className="max-w-4xl text-[clamp(2.8rem,7vw,7.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em] text-slate-900 dark:text-white">
                {["lineOne", "lineTwo", "lineThree", "lineFour", "lineFive"].map((line, index) => (
                  <motion.span
                    key={line}
                    variants={reveal}
                    className={`block ${index === 2 ? "text-slate-500 dark:text-slate-400" : ""} ${
                      index === 3 ? "text-cyan-600 dark:text-cyan-300 shimmer-text font-normal" : ""
                    }`}
                  >
                    {t(`hero.headline.${line}`)}
                  </motion.span>
                ))}
              </h1>

              <motion.div variants={reveal} className="mt-8 max-w-xl border-l-2 border-cyan-500/60 dark:border-cyan-400/60 pl-5">
                <p className="text-base font-medium leading-relaxed text-slate-800 dark:text-slate-200 sm:text-lg">
                  {t("hero.statement")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("hero.description")}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#projects" className="btn-primary">
                  <span>{t("hero.viewWork")}</span>
                  <ArrowRight size={16} />
                </a>

                <a
                  href="/cv/CV.pdf"
                  download="CV_ONell_Luciano_Rasamiarison.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <Download size={15} />
                  <span>{t("common.downloadCv")}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 dark:border-slate-700 dark:bg-slate-900/60 px-4 py-3 text-xs font-semibold tracking-[0.16em] text-slate-800 dark:text-slate-300 hover:border-cyan-500 dark:hover:border-cyan-400/40 hover:text-cyan-700 dark:hover:text-white transition"
                >
                  <Copy size={14} className="text-cyan-600 dark:text-cyan-400" />
                  <span>{t("hero.copyEmail")}</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column: Dynamic Circular Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-600/15 to-emerald-500/20 blur-2xl opacity-60 neon-glow"
              />

              <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-2xl">
                <Image
                  src="/image/profile/jqcDP.jpg"
                  alt="O'Nell Luciano Rasamiarison - Full-Stack & AI Developer"
                  fill
                  priority
                  sizes="(max-width: 1023px) 90vw, 40vw"
                  className="object-cover object-center contrast-[1.05] brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent opacity-50" />

                <div className="absolute bottom-4 left-4 right-4 text-center rounded-xl border border-cyan-500/20 bg-[#020617]/80 px-3 py-2 backdrop-blur-md">
                  <p className="text-xs font-bold text-white tracking-wide">O&apos;Nell Luciano Rasamiarison</p>
                  <p className="text-[0.65rem] text-cyan-300 font-mono mt-0.5">Software Engineer & Data Specialist</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              { label: t("stats.experience"), desc: "Full-Stack & Systems" },
              { label: t("stats.projects"), desc: "Production Ready" },
              { label: t("stats.tech"), desc: "Languages & Frameworks" },
              { label: t("stats.focus"), desc: "Core Specialization" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-cyan-500/20 bg-white/70 dark:bg-slate-900/40 p-5 backdrop-blur-md transition duration-300 hover:border-cyan-400/40 hover:bg-white dark:hover:bg-slate-900/70"
              >
                <p className="text-xl font-extrabold tracking-tight text-cyan-600 dark:text-cyan-300 sm:text-2xl">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{stat.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities / Bento Grid Section */}
      <section id="about" className="relative z-10 border-t border-cyan-500/15 bg-slate-100/60 dark:bg-slate-950/60 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-tag">01 / {t("capabilities.sectionLabel")}</p>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl leading-tight">
                {t("capabilities.heading")}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Bento Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: t("capabilities.fullStack"),
                    desc: t("capabilities.fullStackText"),
                    icon: Code2,
                    tag: "Modern Web",
                  },
                  {
                    title: t("capabilities.ai"),
                    desc: t("capabilities.aiText"),
                    icon: Sparkles,
                    tag: "NLP & LLM",
                  },
                  {
                    title: t("capabilities.data"),
                    desc: t("capabilities.dataText"),
                    icon: BarChart3,
                    tag: "Analytics",
                  },
                  {
                    title: t("capabilities.gis"),
                    desc: t("capabilities.gisText"),
                    icon: Globe,
                    tag: "Geospatial",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="glow-card group p-6 border border-cyan-500/20 bg-white/80 dark:bg-slate-900/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-600 dark:text-cyan-300 transition group-hover:scale-110">
                          <Icon size={20} />
                        </div>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400/80">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Soft skills & Languages summary */}
              <div className="rounded-2xl border border-cyan-500/20 bg-white/80 dark:bg-slate-900/40 p-6 backdrop-blur-md">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
                  {t("skills.heading")}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {["learning", "curiosity", "adaptability", "communication", "time", "initiative"].map((skill) => (
                    <div key={skill} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check size={14} className="text-cyan-600 dark:text-cyan-400" />
                      <span>{t(`skills.soft.${skill}`)}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                  🌐 {t("skills.languages")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Directory with Search & Filters */}
      <section id="stack" className="relative z-10 border-t border-cyan-500/15 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-tag">02 / {t("stack.sectionLabel")}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {t("stack.heading")}
              </h2>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("stack.searchPlaceholder")}
                className="w-full rounded-full border border-slate-300 dark:border-cyan-500/30 bg-white/90 dark:bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["All", "Languages", "Frameworks", "AI & Data", "Database & GIS", "Tools & DevOps"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedTechCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] uppercase transition ${
                  selectedTechCategory === cat
                    ? "border border-cyan-500 dark:border-cyan-400 bg-cyan-400/20 text-cyan-700 dark:text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                    : "border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat === "All" ? t("stack.all") : cat}
              </button>
            ))}
          </div>

          {/* Technology Cards Grid */}
          <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredTechnologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="glow-card group flex flex-col justify-between p-4 border border-cyan-500/20 bg-white/80 dark:bg-slate-900/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-600 dark:text-cyan-300 transition group-hover:scale-110">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-400/70">
                      {tech.level}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{tech.name}</h3>
                    <p className="text-[0.62rem] text-slate-500 dark:text-slate-400 mt-0.5">{tech.category}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected Work Showcase */}
      <section id="projects" className="relative z-10 border-t border-cyan-500/15 bg-slate-100/60 dark:bg-slate-950/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-tag">03 / {t("projects.sectionLabel")}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {t("projects.heading")}
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {["All", "GIS", "Full-Stack", "AI", "Optimization"].map((groupKey) => (
                <button
                  key={groupKey}
                  type="button"
                  onClick={() => setSelectedProjectCategory(groupKey)}
                  className={`rounded-full px-4 py-1.5 text-[0.65rem] font-semibold tracking-[0.16em] uppercase transition ${
                    selectedProjectCategory === groupKey
                      ? "border border-cyan-500 dark:border-cyan-400 bg-cyan-400/20 text-cyan-700 dark:text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                      : "border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {groupKey === "All" ? t("projects.all") : groupKey}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => {
                  if (project.images.length > 0) {
                    setHoveredProject(project.title);
                    setProjectImageIndex(0);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setProjectImageIndex(0);
                }}
                className="glow-card group overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/80 dark:bg-slate-900/60 p-6"
              >
                <div className="mb-4 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
                  <span>{project.number}</span>
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5">
                    {project.category}
                  </span>
                </div>

                {/* Project Image Preview / Fallback */}
                {project.images.length > 0 ? (
                  <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                    <motion.div
                      key={`${project.title}-${projectImageIndex}`}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={project.images[projectImageIndex].src}
                        alt={project.images[projectImageIndex].alt}
                        fill
                        sizes="(max-width: 1023px) 90vw, 45vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </motion.div>
                    <div className="absolute bottom-3 right-3 flex gap-1.5">
                      {project.images.map((img, imgIdx) => (
                        <span
                          key={img.src}
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            imgIdx === projectImageIndex ? "w-4 bg-cyan-500 dark:bg-cyan-300" : "bg-black/30 dark:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-60 w-full items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-gradient-to-br from-slate-100 via-slate-50 to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/30 p-6 text-center">
                    <div>
                      <Layers size={32} className="mx-auto text-cyan-600 dark:text-cyan-400/60" />
                      <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                        {t("projects.preview")}
                      </p>
                      <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{project.title}</p>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{project.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveModalProject(project);
                    setModalImageIndex(0);
                  }}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 transition group-hover:text-slate-900 dark:group-hover:text-white"
                >
                  <span>{t("projects.viewProject")}</span>
                  <ArrowRight size={15} />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 dark:bg-[#020617]/90 p-4 backdrop-blur-xl"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                <X size={18} />
              </button>

              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
                {activeModalProject.number} / {activeModalProject.category}
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {activeModalProject.title}
              </h2>

              {activeModalProject.images.length > 0 && (
                <div className="relative mt-6 h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                  <Image
                    src={activeModalProject.images[modalImageIndex].src}
                    alt={activeModalProject.images[modalImageIndex].alt}
                    fill
                    className="object-cover"
                  />
                  {activeModalProject.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 px-3 py-1.5 backdrop-blur-md">
                      {activeModalProject.images.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setModalImageIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === modalImageIndex ? "w-6 bg-cyan-500 dark:bg-cyan-300" : "w-2 bg-slate-400 dark:bg-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-6">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  {t("projects.modal.architecture")}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {activeModalProject.description}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-6">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  {t("projects.modal.highlights")}
                </h4>
                <ul className="mt-3 space-y-2">
                  {activeModalProject.highlights.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      <Check size={14} className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-6">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-3">
                  {t("projects.modal.technologies")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((tName: string) => (
                    <span
                      key={tName}
                      className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-200"
                    >
                      {tName}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="btn-primary"
                >
                  <span>{t("projects.modal.close")}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experience & Career Timeline */}
      <section id="experience" className="relative z-10 border-t border-cyan-500/15 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-tag">04 / {t("experience.sectionLabel")}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {t("experience.heading")}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline center line */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-4 top-0 w-0.5 bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 md:left-1/2 md:-translate-x-1/2"
            />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={`${exp.company}-${exp.role}`} className="relative grid md:grid-cols-[1fr_60px_1fr] md:items-center">
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5 }}
                    className={`relative ml-10 rounded-2xl border p-6 backdrop-blur-md md:ml-0 ${
                      index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"
                    } ${
                      exp.highlight
                        ? "border-cyan-400/40 bg-gradient-to-br from-cyan-50/80 to-blue-50/60 dark:from-cyan-950/40 dark:to-blue-950/20 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                        : "border-slate-200 dark:border-cyan-500/20 bg-white/80 dark:bg-slate-900/50"
                    }`}
                  >
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 font-bold">
                      {exp.period}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">{exp.company}</p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">{exp.description}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.article>

                  {/* Node point */}
                  <div
                    aria-hidden="true"
                    className="absolute left-1.5 top-6 z-10 h-5 w-5 rounded-full border-2 border-white dark:border-slate-950 bg-cyan-400 dark:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.8)] md:relative md:left-auto md:top-auto md:col-start-2 md:row-start-1 md:mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Academic Credentials */}
      <section id="education" className="relative z-10 border-t border-cyan-500/15 bg-slate-100/60 dark:bg-slate-950/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-tag">05 / {t("education.sectionLabel")}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {t("education.heading")}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glow-card p-6 border border-cyan-500/20 bg-white/80 dark:bg-slate-900/50"
              >
                <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  <span>{edu.period}</span>
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5">
                    {edu.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{edu.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{edu.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Conversion Recruiter Contact Section */}
      <section id="contact" className="relative z-10 border-t border-cyan-500/15 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-white via-slate-50 to-cyan-50/60 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/40 p-8 sm:p-14 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
            <p className="section-tag">06 / {t("contact.sectionLabel")}</p>
            <h2 className="mt-6 max-w-3xl text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t("contact.heading")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {t("contact.subheading")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="mailto:rasamiarisonluciano@gmail.com"
                className="btn-primary"
              >
                <Mail size={16} />
                <span>{t("contact.cta")}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-secondary"
              >
                <Copy size={15} />
                <span>{t("contact.copyEmail")}</span>
              </button>

              <a
                href="https://github.com/ONell-Luciano"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <Globe size={15} />
                <span>{t("contact.github")}</span>
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/60 p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-semibold">
                  {t("contact.email")}
                </p>
                <p className="mt-2 text-base font-bold text-slate-900 dark:text-white font-mono">
                  rasamiarisonluciano@gmail.com
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/60 p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-semibold">
                  {t("contact.github")}
                </p>
                <p className="mt-2 text-base font-bold text-slate-900 dark:text-white font-mono">
                  {t("contact.githubTitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:flex-row">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-900 dark:text-white">O&apos;NELL RASAMIARISON</span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span>{t("footer.description")}</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-slate-600 dark:text-slate-400">
            <a
              href="https://github.com/ONell-Luciano"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              GitHub
            </a>
            <a href="mailto:rasamiarisonluciano@gmail.com" className="hover:text-cyan-600 dark:hover:text-cyan-300">
              Email
            </a>
            <a href="/cv/CV.pdf" download className="hover:text-cyan-600 dark:hover:text-cyan-300">
              CV (PDF)
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-4 border-t border-slate-200 dark:border-slate-900 px-4 pt-4 text-center font-mono text-[0.65rem] text-slate-500 dark:text-slate-600 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} O&apos;NELL LUCIANO RASAMIARISON. {t("footer.rights")}
        </div>
      </footer>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-cyan-400/40 bg-white/95 dark:bg-slate-900/95 px-5 py-3.5 shadow-2xl backdrop-blur-xl text-slate-900 dark:text-white"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-600 dark:text-cyan-300">
              <Check size={16} />
            </div>
            <span className="text-xs font-semibold font-mono">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
