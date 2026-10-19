"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { BarChart3, Code2, Cpu, Database, Globe, Sparkles, type LucideIcon } from "lucide-react";
import {
  SiDocker,
  SiFlutter,
  SiGit,
  SiJavascript,
  SiLeaflet,
  SiLinux,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiOpenstreetmap,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiSpringboot,
  SiSqlite,
  SiStreamlit,
  SiTypescript,
} from "@icons-pack/react-simple-icons";

export const EMAIL = "rasamiarisonluciano@gmail.com";
export const GITHUB_URL = "https://github.com/ONell-Luciano";
export const CV_URL = "/cv/CV.pdf";
export const CV_FILENAME = "CV_ONell_Luciano_Rasamiarison.pdf";

export type Level = "expert" | "advanced" | "intermediate";
export type TechCategory = "Languages" | "Frameworks" | "AI & Data" | "Database & GIS" | "Tools & DevOps";
export type ProjectGroup = "Mobile" | "GIS" | "Full-Stack" | "AI" | "Optimization";

type IconComponent = LucideIcon | React.ComponentType<{ size?: number; className?: string }>;

export type Tech = { name: string; category: TechCategory; icon: IconComponent; level: Level };

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  group: ProjectGroup;
  description: string;
  technologies: string[];
  images: { src: string; alt: string }[];
  highlights: string[];
};

export type Experience = {
  key: string;
  period: string;
  company: string;
  role: string;
  description: string;
  technologies: string[];
  current: boolean;
};

const TECHNOLOGIES: Tech[] = [
  { name: "Python", category: "Languages", icon: SiPython, level: "advanced" },
  { name: "TypeScript", category: "Languages", icon: SiTypescript, level: "advanced" },
  { name: "JavaScript", category: "Languages", icon: SiJavascript, level: "advanced" },
  { name: "Java", category: "Languages", icon: SiOpenjdk, level: "intermediate" },
  { name: "PHP", category: "Languages", icon: SiPhp, level: "intermediate" },
  { name: "C / C++ / C#", category: "Languages", icon: Cpu, level: "intermediate" },
  { name: "SQL / PL-SQL", category: "Languages", icon: Database, level: "advanced" },
  { name: "React / Next.js", category: "Frameworks", icon: SiReact, level: "advanced" },
  { name: "Node.js / Express", category: "Frameworks", icon: SiNodedotjs, level: "advanced" },
  { name: "FastAPI", category: "Frameworks", icon: SiPython, level: "advanced" },
  { name: "Spring Boot", category: "Frameworks", icon: SiSpringboot, level: "intermediate" },
  { name: "Flutter", category: "Frameworks", icon: SiFlutter, level: "advanced" },
  { name: "Leaflet.js", category: "Frameworks", icon: SiLeaflet, level: "expert" },
  { name: "Streamlit", category: "Frameworks", icon: SiStreamlit, level: "advanced" },
  { name: "PyTorch", category: "AI & Data", icon: SiPytorch, level: "advanced" },
  { name: "BERT & LLM Pipelines", category: "AI & Data", icon: Sparkles, level: "advanced" },
  { name: "MindSpore", category: "AI & Data", icon: Cpu, level: "intermediate" },
  { name: "Power BI / DAX", category: "AI & Data", icon: BarChart3, level: "advanced" },
  { name: "ETL & Web Scraping", category: "AI & Data", icon: Database, level: "advanced" },
  { name: "PostgreSQL & PostGIS", category: "Database & GIS", icon: SiPostgresql, level: "expert" },
  { name: "SQLite", category: "Database & GIS", icon: SiSqlite, level: "advanced" },
  { name: "MySQL", category: "Database & GIS", icon: SiMysql, level: "advanced" },
  { name: "Oracle 19c & APEX", category: "Database & GIS", icon: Database, level: "intermediate" },
  { name: "OpenStreetMap API", category: "Database & GIS", icon: SiOpenstreetmap, level: "expert" },
  { name: "Docker", category: "Tools & DevOps", icon: SiDocker, level: "intermediate" },
  { name: "Git / GitHub", category: "Tools & DevOps", icon: SiGit, level: "advanced" },
  { name: "Linux Administration", category: "Tools & DevOps", icon: SiLinux, level: "advanced" },
  { name: "ESP32 / IoT", category: "Tools & DevOps", icon: Cpu, level: "intermediate" },
];

const PROJECTS: Omit<Project, "title" | "category" | "description" | "highlights">[] = [
  {
    id: "bionexxMobile",
    number: "01",
    group: "Mobile",
    technologies: ["Flutter", "Dart", "SQLite", "Offline-first"],
    images: [],
  },
  {
    id: "webMapping",
    number: "02",
    group: "GIS",
    technologies: ["Next.js", "React", "Leaflet.js", "PostGIS", "OpenStreetMap", "OpenWeatherMap", "OpenRouteService"],
    images: [
      { src: "/projets/web-mapping/map/Carte0.png", alt: "Interactive web mapping interface" },
      { src: "/projets/web-mapping/meteo/meteo0.png", alt: "Advanced weather center interface" },
      { src: "/projets/web-mapping/meteo/meteo1.png", alt: "Weather data visualization interface" },
    ],
  },
  {
    id: "construction",
    number: "03",
    group: "Full-Stack",
    technologies: ["FastAPI", "Python", "React", "PostgreSQL", "Scheduling"],
    images: [
      { src: "/projets/titan/Titan0.png", alt: "Construction planning dashboard" },
      { src: "/projets/titan/Titan1.png", alt: "Construction schedule Gantt view" },
      { src: "/projets/titan/Titan2.png", alt: "Construction planning section view" },
    ],
  },
  {
    id: "nlp",
    number: "04",
    group: "AI",
    technologies: ["Python", "BERT", "LLMs", "NLP", "Dashboarding"],
    images: [
      { src: "/projets/nlp-llm/nlp0.png", alt: "NLP and LLM analysis interface" },
      { src: "/projets/nlp-llm/nlp1.png", alt: "Sentiment analysis results" },
      { src: "/projets/nlp-llm/nlp2.png", alt: "NLP data visualization dashboard" },
    ],
  },
  {
    id: "currency",
    number: "05",
    group: "Full-Stack",
    technologies: ["Next.js", "TypeScript", "NextAuth", "Prisma", "PostgreSQL", "Recharts"],
    images: [],
  },
  {
    id: "stock",
    number: "06",
    group: "Optimization",
    technologies: ["Python", "Streamlit", "Wilson model", "EOQ", "Data Analysis"],
    images: [],
  },
  {
    id: "transaction",
    number: "07",
    group: "Full-Stack",
    technologies: ["Spring Boot", "Java", "REST API", "PostgreSQL", "Spring Security", "JPA / Hibernate"],
    images: [],
  },
];

const EXPERIENCES: { key: string; technologies: string[]; current?: boolean }[] = [
  { key: "bionexx", technologies: ["Flutter", "SQLite", "Leaflet.js", "PostGIS", "OpenWeatherMap"], current: true },
  { key: "stock", technologies: ["Python", "Streamlit", "Wilson Method", "EOQ"] },
  { key: "titan", technologies: ["FastAPI", "Python", "React", "PostgreSQL"] },
  { key: "nlp", technologies: ["Python", "NLP", "BERT", "LLMs", "Data Viz"] },
  { key: "data", technologies: ["Python", "Power BI", "Power Query", "DAX", "Low-code ML"] },
  { key: "currency", technologies: ["Next.js", "TypeScript", "NextAuth", "Prisma", "PostgreSQL"] },
  { key: "transaction", technologies: ["Spring Boot", "Java", "REST API", "PostgreSQL", "Spring Security"] },
  { key: "cci", technologies: ["Node.js", "PostgreSQL", "PostGIS", "Leaflet.js", "GeoJSON"] },
];

const EDUCATION: { key: string; badge: "degree" | "certification" | "training" | "iot" | "international" }[] = [
  { key: "bachelor", badge: "degree" },
  { key: "huawei", badge: "certification" },
  { key: "aws", badge: "certification" },
  { key: "powerBI", badge: "training" },
  { key: "iot", badge: "iot" },
  { key: "unitarEconomies", badge: "international" },
  { key: "unitarPolicy", badge: "international" },
];

export const TECH_CATEGORIES: { key: TechCategory; label: string }[] = [
  { key: "Languages", label: "stack.languages" },
  { key: "Frameworks", label: "stack.frameworks" },
  { key: "AI & Data", label: "stack.aiData" },
  { key: "Database & GIS", label: "stack.databaseGis" },
  { key: "Tools & DevOps", label: "stack.tools" },
];

export const PROJECT_GROUPS: { key: ProjectGroup; label: string }[] = [
  { key: "Mobile", label: "ui.filters.mobile" },
  { key: "GIS", label: "ui.filters.gis" },
  { key: "Full-Stack", label: "ui.filters.fullStack" },
  { key: "AI", label: "ui.filters.ai" },
  { key: "Optimization", label: "ui.filters.optimization" },
];

export function usePortfolioData() {
  const t = useTranslations();

  return useMemo(() => {
    const navItems = [
      { id: "about", label: t("nav.about") },
      { id: "stack", label: t("nav.stack") },
      { id: "projects", label: t("nav.work") },
      { id: "experience", label: t("nav.experience") },
      { id: "contact", label: t("nav.contact") },
    ];

    const capabilities = [
      { title: t("capabilities.fullStack"), text: t("capabilities.fullStackText"), icon: Code2, tag: "Modern Web" },
      { title: t("capabilities.ai"), text: t("capabilities.aiText"), icon: Sparkles, tag: "NLP · LLM" },
      { title: t("capabilities.data"), text: t("capabilities.dataText"), icon: BarChart3, tag: "Analytics" },
      { title: t("capabilities.gis"), text: t("capabilities.gisText"), icon: Globe, tag: "Geospatial" },
    ];

    const projects: Project[] = PROJECTS.map((p) => ({
      ...p,
      title: t(`projects.items.${p.id}.title`),
      category: t(`projects.items.${p.id}.category`),
      description: t(`projects.items.${p.id}.description`),
      highlights: [0, 1, 2, 3].map((i) => t(`projects.items.${p.id}.highlights.${i}`)),
    }));

    const experiences: Experience[] = EXPERIENCES.map((e) => ({
      key: e.key,
      period: t(`experience.items.${e.key}.period`),
      company: t(`experience.items.${e.key}.company`),
      role: t(`experience.items.${e.key}.role`),
      description: t(`experience.items.${e.key}.description`),
      technologies: e.technologies,
      current: Boolean(e.current),
    }));

    const education = EDUCATION.map((e) => ({
      key: e.key,
      period: t(`education.${e.key}.period`),
      title: t(`education.${e.key}.title`),
      institution: t(`education.${e.key}.institution`),
      badge: t(`ui.badges.${e.badge}`),
    }));

    const stats = ["experience", "projects", "tech", "focus"].map((key) => {
      const raw = t(`stats.${key}`);
      const match = raw.match(/^(\d+)(\+?)\s+(.*)$/);
      return match
        ? { key, value: Number(match[1]), suffix: match[2], label: match[3] }
        : { key, value: null, suffix: "", label: raw };
    });

    return { navItems, capabilities, technologies: TECHNOLOGIES, projects, experiences, education, stats };
  }, [t]);
}
