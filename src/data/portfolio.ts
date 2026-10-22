/* ──────────────────────────────────────────────────────────────
   Source unique de vérité du portfolio.
   Tout le contenu (projets, technos, parcours, formation, profil)
   vit ici, en français et en anglais.
   ────────────────────────────────────────────────────────────── */

export type Locale = "fr" | "en";
export type Texte = Record<Locale, string>;

export type Domaine = "Full-Stack" | "IA" | "GIS" | "Data" | "Mobile";
export type Niveau = "expert" | "advanced" | "intermediate";

export interface Visuel {
  src: string;
  alt: Texte;
  largeur: number;
  hauteur: number;
}

export interface Projet {
  id: string;
  numero: number; // ordre d'affichage (01, 02...)
  titre: Texte;
  annee: number;
  periode: Texte;
  contexte: Texte; // structure / client
  categorie: Texte;
  domaines: Domaine[];
  stack: string[]; // technos utilisées
  description: Texte;
  probleme: Texte; // 1-2 phrases
  gesteTechnique: Texte; // 1-2 phrases
  resultat: Texte; // 1-2 phrases
  pointsCles: Texte[];
  visuels: Visuel[];
  lienRepo?: string;
  lienDemo?: string;
}

export interface GroupeTechno {
  categorie: Texte; // ex: "Langages", "Frameworks", "IA & Data", "SIG"
  note?: Texte;
  items: string[];
}

export interface Experience {
  id: string;
  periode: Texte;
  structure: Texte;
  role: Texte;
  description: Texte;
  stack: string[];
  enCours?: boolean;
  projets: string[]; // ids de projets liés
}

export interface Formation {
  id: string;
  periode: Texte;
  titre: Texte;
  institution: Texte;
  type: Texte;
}

/* ── Profil ───────────────────────────────────────────────────── */

export const profil = {
  nom: "O’Nell Luciano Rasamiarison",
  lignesNom: ["O’Nell", "Luciano", "Rasamiarison"],
  initiales: "O.L.R.",
  email: "rasamiarisonluciano@gmail.com",
  github: "https://github.com/ONell-Luciano",
  githubLabel: "github.com/ONell-Luciano",
  cv: "/cv/CV.pdf",
  cvNomFichier: "CV_ONell_Luciano_Rasamiarison.pdf",
  fuseau: "Indian/Antananarivo",
  role: { fr: "Développeur Full-Stack", en: "Full-Stack Developer" } as Texte,
  discipline: { fr: "IA · Data · SIG", en: "AI · Data · GIS" } as Texte,
  localisation: { fr: "Fianarantsoa, Madagascar", en: "Fianarantsoa, Madagascar" } as Texte,
  fuseauLabel: "UTC+3",
  disponibilite: {
    fr: "Disponible — remote & relocalisation",
    en: "Available — remote & relocation",
  } as Texte,
  accroche: {
    fr: "Je conçois des logiciels pour résoudre de vrais problèmes.",
    en: "I build software that solves real problems.",
  } as Texte,
  statement: {
    fr: "Je développe des logiciels robustes pour répondre aux défis complexes.",
    en: "Engineering robust software for complex real-world challenges.",
  } as Texte,
  description: {
    fr: "Développeur full-stack spécialisé dans la création d'applications web modernes, de systèmes intelligents, de solutions orientées données et d'expériences géospatiales interactives.",
    en: "Full-stack developer focused on building modern web applications, intelligent systems, data-driven solutions and interactive geospatial experiences.",
  } as Texte,
  // Les *mots* entre astérisques sont composés en italique.
  manifeste: {
    fr: [
      "Je conçois des logiciels pour des problèmes *réels* :",
      "des cartes qui éclairent l’agriculture malgache,",
      "des modèles qui lisent *entre les lignes*,",
      "des plannings qui *s’écrivent seuls*.",
    ],
    en: [
      "I build software for *real* problems:",
      "maps that inform Malagasy agriculture,",
      "models that read *between the lines*,",
      "schedules that *write themselves*.",
    ],
  } as Record<Locale, string[]>,
  anneesExperience: "4+",
  ambition: {
    fr: "Je conçois et développe des systèmes modernes qui transforment des idées en produits numériques fiables.",
    en: "I design and build modern systems that turn ideas into dependable digital products.",
  } as Texte,
  competences: [
    {
      titre: { fr: "Full-Stack", en: "Full-Stack" },
      texte: { fr: "Applications web ultra-réactives & API robustes", en: "High-performance web apps & robust APIs" },
    },
    {
      titre: { fr: "IA / NLP", en: "AI / NLP" },
      texte: { fr: "Traitement du langage naturel & modèles LLM", en: "Natural language processing & LLM pipelines" },
    },
    {
      titre: { fr: "Data & Analytics", en: "Data & Analytics" },
      texte: { fr: "Analyse décisionnelle & workflows ETL", en: "Decision-support analytics & ETL workflows" },
    },
    {
      titre: { fr: "Systèmes géospatiaux", en: "Geospatial systems" },
      texte: { fr: "Cartographie interactive, GeoJSON & PostGIS", en: "Interactive mapping, GeoJSON & PostGIS" },
    },
  ] as { titre: Texte; texte: Texte }[],
  vision: {
    fr: "Des plateformes géospatiales complexes aux architectures IA scalables.",
    en: "From complex geospatial platforms to scalable AI-driven architectures.",
  } as Texte,
  softSkills: [
    { fr: "Apprentissage continu rapide", en: "Fast continuous learning" },
    { fr: "Curiosité et vision business", en: "Curiosity & business acumen" },
    { fr: "Grande adaptabilité culturelle & technique", en: "High cultural & technical adaptability" },
    { fr: "Communication claire & synthétique", en: "Clear & concise communication" },
    { fr: "Rigueur et gestion du temps", en: "Rigor & time management" },
    { fr: "Esprit d'initiative & autonomie", en: "Proactive initiative & ownership" },
  ] as Texte[],
  langues: {
    fr: "Français (courant) · Anglais (avancé) · Allemand (notions)",
    en: "French (fluent) · English (advanced) · German (basic)",
  } as Texte,
};

export const domaineLabel: Record<Domaine, Texte> = {
  "Full-Stack": { fr: "Full-Stack", en: "Full-Stack" },
  IA: { fr: "IA", en: "AI" },
  GIS: { fr: "SIG", en: "GIS" },
  Data: { fr: "Data", en: "Data" },
  Mobile: { fr: "Mobile", en: "Mobile" },
};

/* ── Projets ──────────────────────────────────────────────────── */

export const projets: Projet[] = [
  {
    id: "bionexxMobile",
    numero: 1,
    titre: { fr: "Application Mobile Bionexx", en: "Bionexx Mobile Application" },
    annee: 2026,
    periode: { fr: "Depuis avr. 2026 · En cours", en: "Since Apr. 2026 · Ongoing" },
    contexte: { fr: "BIONEXX · Fianarantsoa", en: "BIONEXX · Fianarantsoa" },
    categorie: { fr: "Mobile · Flutter · SQLite", en: "Mobile · Flutter · SQLite" },
    domaines: ["Mobile"],
    stack: ["Flutter", "Dart", "SQLite", "Offline-first"],
    description: {
      fr: "Application mobile pour la gestion des achats et la coordination terrain des producteurs, prestataires, responsables et agents pour Bionexx Madagascar.",
      en: "Mobile application development for purchasing management and field coordination among producers, service providers, managers, and field agents for Bionexx Madagascar.",
    },
    probleme: {
      fr: "Sur le terrain, les achats de Bionexx Madagascar mobilisent producteurs, prestataires, responsables et agents — et la connexion n'y est jamais garantie.",
      en: "In the field, Bionexx Madagascar's purchasing involves producers, service providers, managers and agents — and connectivity is never guaranteed.",
    },
    gesteTechnique: {
      fr: "Une application Flutter pensée hors-ligne d'abord : interface et logique métier en Flutter SDK, base SQLite locale pour que chaque transaction soit saisie, même sans réseau.",
      en: "An offline-first Flutter app: UI and business logic built with the Flutter SDK, a local SQLite database so every transaction is captured, even without a network.",
    },
    resultat: {
      fr: "Des achats informatisés et suivis sur le terrain, et une coordination multi-acteurs réunie dans un seul outil mobile.",
      en: "Digitalized, tracked field purchasing and multi-role coordination brought together in a single mobile tool.",
    },
    pointsCles: [
      {
        fr: "Gestion informatisée des achats et suivi des transactions sur le terrain",
        en: "Digitalized purchasing management and on-field operation tracking",
      },
      {
        fr: "Coordination multi-acteurs : producteurs, prestataires, responsables et agents de terrain",
        en: "Multi-role coordination system: producers, service providers, managers, and field agents",
      },
      {
        fr: "Développement de l'interface utilisateur et de la logique métier avec Flutter SDK",
        en: "Intuitive UI development and core business logic implementation with Flutter SDK",
      },
      {
        fr: "Stockage local et base de données SQLite pour un fonctionnement hors-ligne fiable",
        en: "Local SQLite database implementation for reliable offline data storage",
      },
    ],
    visuels: [],
  },
  {
    id: "webMapping",
    numero: 2,
    titre: { fr: "Web Mapping & Weather Platform", en: "Web Mapping & Weather Platform" },
    annee: 2026,
    periode: { fr: "Depuis avr. 2026 · En cours", en: "Since Apr. 2026 · Ongoing" },
    contexte: { fr: "BIONEXX · Fianarantsoa", en: "BIONEXX · Fianarantsoa" },
    categorie: { fr: "SIG · Data · Agriculture", en: "GIS · Data · Agriculture" },
    domaines: ["GIS", "Data"],
    stack: ["Next.js", "React", "Leaflet.js", "PostGIS", "OpenStreetMap", "OpenWeatherMap", "OpenRouteService"],
    description: {
      fr: "Carte interactive et centre météo avancé de Madagascar pour l'analyse agricole multi-filière. Visualisation interactive avec Leaflet.js, PostGIS et APIs météo.",
      en: "Interactive map and advanced Madagascar weather center for multi-sector agricultural analysis. High-resolution visualization built with Leaflet.js, PostGIS, and weather APIs.",
    },
    probleme: {
      fr: "Les vastes données multi-filières de Bionexx devaient devenir lisibles, et les études agricoles manquaient d'un suivi météo pensé pour Madagascar.",
      en: "Bionexx's extensive multi-sector data had to become legible, and agricultural studies lacked weather monitoring designed for Madagascar.",
    },
    gesteTechnique: {
      fr: "Une cartographie Leaflet multi-couches sur OpenStreetMap, des requêtes spatiales PostGIS, et OpenWeatherMap et OpenRouteService réunis dans un centre météo sous Next.js.",
      en: "Multi-layer Leaflet cartography on OpenStreetMap, PostGIS spatial queries, and OpenWeatherMap and OpenRouteService combined into a Next.js weather center.",
    },
    resultat: {
      fr: "Une carte interactive et un centre météo avancé de Madagascar au service de l'analyse agricole multi-filière.",
      en: "An interactive map and an advanced Madagascar weather center serving multi-sector agricultural analysis.",
    },
    pointsCles: [
      {
        fr: "Cartographie interactive multi-couches avec Leaflet et OpenStreetMap",
        en: "Interactive multi-layer geospatial cartography with Leaflet & OpenStreetMap",
      },
      {
        fr: "Traitement des données spatiales complexes avec PostGIS",
        en: "High-performance spatial data queries using PostGIS",
      },
      {
        fr: "Centre météo avancé pour l'analyse agricole multi-filières",
        en: "Advanced weather center for multi-crop agricultural monitoring",
      },
      {
        fr: "Intégration d'APIs tierces (OpenWeatherMap & OpenRouteService)",
        en: "Seamless integration of external APIs (OpenWeatherMap & OpenRouteService)",
      },
    ],
    visuels: [
      {
        src: "/projets/web-mapping/map/Carte0.png",
        alt: { fr: "Interface de cartographie web interactive", en: "Interactive web mapping interface" },
        largeur: 1906,
        hauteur: 945,
      },
      {
        src: "/projets/web-mapping/meteo/meteo0.png",
        alt: { fr: "Interface du centre météo avancé", en: "Advanced weather center interface" },
        largeur: 1906,
        hauteur: 946,
      },
      {
        src: "/projets/web-mapping/meteo/meteo1.png",
        alt: { fr: "Visualisation des données météo", en: "Weather data visualization interface" },
        largeur: 1885,
        hauteur: 944,
      },
    ],
  },
  {
    id: "construction",
    numero: 3,
    titre: { fr: "Construction Planning System", en: "Construction Planning System" },
    annee: 2025,
    periode: { fr: "Sept. 2025 – Déc. 2025", en: "Sep. 2025 – Dec. 2025" },
    contexte: { fr: "TITAN Construction · Fianarantsoa", en: "TITAN Construction · Fianarantsoa" },
    categorie: { fr: "Full-Stack · Optimisation", en: "Full-Stack · Optimization" },
    domaines: ["Full-Stack", "Data"],
    stack: ["FastAPI", "Python", "React", "PostgreSQL", "Scheduling"],
    description: {
      fr: "Générateur automatique de planning de chantier avec optimisation des algorithmes et visualisation temps réel.",
      en: "Automatic construction schedule generator with optimized planning algorithms and real-time task visualization.",
    },
    probleme: {
      fr: "Planifier un chantier à la main, c'est jongler avec des contraintes entre tâches qui évoluent sans cesse.",
      en: "Planning a construction site by hand means juggling ever-changing constraints between tasks.",
    },
    gesteTechnique: {
      fr: "Des algorithmes d'ordonnancement sous contraintes servis par une API FastAPI, une base PostgreSQL optimisée et un tableau de bord React avec timeline Gantt dynamique.",
      en: "Constraint-based scheduling algorithms served by a FastAPI backend, an optimized PostgreSQL database and a React dashboard with a dynamic Gantt timeline.",
    },
    resultat: {
      fr: "Des plannings de chantier générés automatiquement et des tâches visualisées en temps réel.",
      en: "Construction schedules generated automatically, with tasks visualized in real time.",
    },
    pointsCles: [
      {
        fr: "Algorithmes d'ordonnancement automatique sous contraintes",
        en: "Constraint-satisfaction scheduling algorithms for complex timelines",
      },
      {
        fr: "API backend ultra-rapide développée avec FastAPI & Python",
        en: "High-performance backend API built with FastAPI & Python",
      },
      {
        fr: "Dashboard React interactif avec timeline Gantt dynamique",
        en: "Interactive React Gantt chart UI with real-time state updates",
      },
      {
        fr: "Base de données PostgreSQL optimisée pour les requêtes complexes",
        en: "PostgreSQL database optimized for complex relational queries",
      },
    ],
    visuels: [
      {
        src: "/projets/titan/Titan0.png",
        alt: { fr: "Tableau de bord de planification de chantier", en: "Construction planning dashboard" },
        largeur: 781,
        hauteur: 404,
      },
      {
        src: "/projets/titan/Titan1.png",
        alt: { fr: "Vue Gantt du planning de chantier", en: "Construction schedule Gantt view" },
        largeur: 788,
        hauteur: 332,
      },
      {
        src: "/projets/titan/Titan2.png",
        alt: { fr: "Vue par section du planning", en: "Construction planning section view" },
        largeur: 785,
        hauteur: 297,
      },
    ],
  },
  {
    id: "nlp",
    numero: 4,
    titre: { fr: "Enhanced NLP with LLM", en: "Enhanced NLP with LLM" },
    annee: 2025,
    periode: { fr: "Juin 2025 – Déc. 2025", en: "Jun. 2025 – Dec. 2025" },
    contexte: { fr: "IDEA Academy · En ligne", en: "IDEA Academy · Online" },
    categorie: { fr: "IA · NLP", en: "AI · NLP" },
    domaines: ["IA", "Data"],
    stack: ["Python", "BERT", "LLMs", "NLP", "Dashboarding"],
    description: {
      fr: "Pipeline NLP combinant modèles classiques et LLM pour analyser les retours étudiants, avec dashboard de visualisation.",
      en: "NLP pipeline combining classical models and LLMs to analyze student feedback, supported by a visualization dashboard.",
    },
    probleme: {
      fr: "Les retours étudiants en texte libre sont trop nombreux pour être lus un à un, et trop riches pour être réduits à une note.",
      en: "Free-text student feedback is too abundant to read one by one, and too rich to reduce to a score.",
    },
    gesteTechnique: {
      fr: "Un pipeline hybride combinant BERT, modèles statistiques et LLM pour l'analyse de sentiments et l'extraction de thématiques.",
      en: "A hybrid pipeline combining BERT, statistical models and LLMs for sentiment analysis and topic extraction.",
    },
    resultat: {
      fr: "Une classification automatique et un dashboard interactif qui transforment les feedbacks en reporting décisionnel.",
      en: "Automated classification and an interactive dashboard that turn feedback into decision-ready reporting.",
    },
    pointsCles: [
      {
        fr: "Pipeline d'analyse de sentiments et d'extraction de thématiques",
        en: "Sentiment analysis & thematic extraction pipeline",
      },
      {
        fr: "Combinaison de BERT, modèles statistiques et LLMs modernisés",
        en: "Hybrid architecture leveraging BERT, statistical models & modern LLMs",
      },
      {
        fr: "Dashboard interactif de visualisation des feedbacks",
        en: "Interactive visualization dashboard for institutional feedback",
      },
      {
        fr: "Classification automatique et reporting décisionnel",
        en: "Automated categorization and executive decision reporting",
      },
    ],
    visuels: [
      {
        src: "/projets/nlp-llm/nlp0.png",
        alt: { fr: "Interface d'analyse NLP et LLM", en: "NLP and LLM analysis interface" },
        largeur: 927,
        hauteur: 420,
      },
      {
        src: "/projets/nlp-llm/nlp1.png",
        alt: { fr: "Résultats de l'analyse de sentiments", en: "Sentiment analysis results" },
        largeur: 925,
        hauteur: 459,
      },
      {
        src: "/projets/nlp-llm/nlp2.png",
        alt: { fr: "Dashboard de visualisation des données NLP", en: "NLP data visualization dashboard" },
        largeur: 923,
        hauteur: 448,
      },
    ],
  },
  {
    id: "currency",
    numero: 5,
    titre: { fr: "Currency Track", en: "Currency Track" },
    annee: 2025,
    periode: { fr: "Mai 2025 – Juin 2025", en: "May 2025 – Jun. 2025" },
    contexte: {
      fr: "École Nationale d'Informatique Tanambao · Fianarantsoa",
      en: "École Nationale d'Informatique Tanambao · Fianarantsoa",
    },
    categorie: { fr: "Application web", en: "Web Application" },
    domaines: ["Full-Stack"],
    stack: ["Next.js", "TypeScript", "NextAuth", "Prisma", "PostgreSQL", "Recharts"],
    description: {
      fr: "Application Next.js et TypeScript avec authentification sécurisée, alertes temps réel et graphiques dynamiques.",
      en: "Next.js and TypeScript application with secure authentication, real-time alerts and dynamic charts.",
    },
    probleme: {
      fr: "Suivre les devises exige des données à jour, des alertes au bon moment et un accès sécurisé.",
      en: "Tracking currencies demands up-to-date data, timely alerts and secure access.",
    },
    gesteTechnique: {
      fr: "Next.js App Router et TypeScript, authentification NextAuth.js avec l'ORM Prisma sur PostgreSQL, graphiques dynamiques Recharts.",
      en: "Next.js App Router and TypeScript, NextAuth.js authentication with the Prisma ORM on PostgreSQL, dynamic Recharts charts.",
    },
    resultat: {
      fr: "Des graphiques monétaires en temps réel et un système d'alertes et de notifications personnalisées.",
      en: "Real-time currency charts and a custom alert and notification system.",
    },
    pointsCles: [
      {
        fr: "Architecture moderne Next.js App Router & TypeScript",
        en: "Modern Next.js App Router architecture powered by TypeScript",
      },
      {
        fr: "Authentification sécurisée avec NextAuth.js et ORM Prisma",
        en: "Secure authentication with NextAuth.js & Prisma ORM",
      },
      {
        fr: "Graphiques boursiers et monétaires temps réel interactifs",
        en: "Real-time dynamic currency charts & market monitoring",
      },
      {
        fr: "Système de notifications et d'alertes personnalisées",
        en: "Custom user notification & alert engine",
      },
    ],
    visuels: [],
  },
  {
    id: "stock",
    numero: 6,
    titre: { fr: "Intelligent Stock Management", en: "Intelligent Stock Management" },
    annee: 2026,
    periode: { fr: "Avr. 2026 – Mai 2026", en: "Apr. 2026 – May 2026" },
    contexte: {
      fr: "École Nationale d'Informatique Tanambao · Fianarantsoa",
      en: "École Nationale d'Informatique Tanambao · Fianarantsoa",
    },
    categorie: { fr: "Optimisation · Aide à la décision", en: "Optimization · Decision Support" },
    domaines: ["Data"],
    stack: ["Python", "Streamlit", "Wilson model", "EOQ", "Data Analysis"],
    description: {
      fr: "Application intelligente de gestion des stocks calculant l'EOQ et des indicateurs décisionnels avec Streamlit et Python.",
      en: "Intelligent stock management application calculating EOQ and decision indicators with Streamlit and Python.",
    },
    probleme: {
      fr: "Commander trop coûte en stockage, commander trop peu coûte en ruptures : le réapprovisionnement est un arbitrage.",
      en: "Ordering too much costs storage, ordering too little costs stock-outs: replenishment is a trade-off.",
    },
    gesteTechnique: {
      fr: "Le modèle de Wilson (EOQ) implémenté en Python, avec calcul automatique des seuils de réapprovisionnement et des coûts d'acquisition, dans une interface Streamlit.",
      en: "The Wilson model (EOQ) implemented in Python, with automated reorder points and acquisition costs, inside a Streamlit interface.",
    },
    resultat: {
      fr: "Un outil d'aide à la décision qui donne la quantité économique de commande et les indicateurs clés du stock.",
      en: "A decision-support tool that delivers the economic order quantity and key stock indicators.",
    },
    pointsCles: [
      {
        fr: "Implémentation du modèle mathématique de Wilson (EOQ)",
        en: "Implementation of the mathematical Wilson Economic Order Quantity (EOQ) model",
      },
      {
        fr: "Calcul automatique des seuils de réapprovisionnement et coûts d'acquisition",
        en: "Automated safety stock and reorder point calculations",
      },
      {
        fr: "Interface utilisateur fluide développée sous Streamlit",
        en: "Fluid interactive web application interface developed with Streamlit",
      },
      {
        fr: "Aide à la décision stratégique pour la gestion de stocks",
        en: "Decision-support metrics for supply chain optimization",
      },
    ],
    visuels: [],
  },
  {
    id: "transaction",
    numero: 7,
    titre: { fr: "Plateforme web de transactions en ligne", en: "Online Transaction Web Platform" },
    annee: 2025,
    periode: { fr: "Avr. 2025 – Mai 2025", en: "Apr. 2025 – May 2025" },
    contexte: {
      fr: "École Nationale d'Informatique Tanambao · Fianarantsoa",
      en: "École Nationale d'Informatique Tanambao · Fianarantsoa",
    },
    categorie: { fr: "Full-Stack · REST Backend · Spring Boot", en: "Full-Stack · REST Backend · Spring Boot" },
    domaines: ["Full-Stack"],
    stack: ["Spring Boot", "Java", "REST API", "PostgreSQL", "Spring Security", "JPA / Hibernate"],
    description: {
      fr: "Conception et développement d’une plateforme web de transactions en ligne avec Spring Boot. Le projet met en œuvre une architecture backend REST permettant la gestion des utilisateurs, des comptes et des opérations financières, avec une attention portée à la sécurité, à la validation des données, à la persistance et à la cohérence des transactions. Ce projet académique a permis d’explorer la conception d’API, l’architecture en couches et les bonnes pratiques du développement d’applications transactionnelles.",
      en: "Design and development of an online transaction web platform with Spring Boot. The project implements a REST backend architecture enabling the management of users, accounts, and financial operations, with a focus on security, data validation, persistence, and transactional consistency. This academic project explored API design, layered architecture, and best practices in transactional application development.",
    },
    probleme: {
      fr: "Une plateforme de transactions doit gérer utilisateurs, comptes et opérations financières sans jamais perdre la cohérence des données.",
      en: "A transaction platform must manage users, accounts and financial operations without ever losing data consistency.",
    },
    gesteTechnique: {
      fr: "Un backend REST Spring Boot en couches : endpoints sécurisés par Spring Security, validation stricte, persistance JPA/Hibernate sur PostgreSQL.",
      en: "A layered Spring Boot REST backend: endpoints secured with Spring Security, strict validation, JPA/Hibernate persistence on PostgreSQL.",
    },
    resultat: {
      fr: "Une plateforme transactionnelle cohérente et sécurisée, et une exploration approfondie de la conception d'API.",
      en: "A consistent, secure transactional platform, and an in-depth exploration of API design.",
    },
    pointsCles: [
      {
        fr: "Architecture backend REST complète pour la gestion des utilisateurs, des comptes et des opérations financières",
        en: "Complete REST backend architecture for managing users, accounts, and financial operations",
      },
      {
        fr: "Sécurisation des endpoints, validation stricte des données et persistance des transactions",
        en: "Endpoint security, strict data validation, and transactional persistence",
      },
      {
        fr: "Mise en œuvre des principes d'architecture en couches et garantie de cohérence transactionnelle",
        en: "Implementation of layered architecture principles and strict transactional consistency",
      },
      {
        fr: "Projet académique axé sur la conception d'API et les bonnes pratiques du développement transactionnel",
        en: "Academic project focused on API design and best practices for transactional development",
      },
    ],
    visuels: [],
  },
  {
    id: "cci",
    numero: 8,
    titre: { fr: "Application SIG de la CCI", en: "CCI GIS Application" },
    annee: 2024,
    periode: { fr: "Sept. 2024 – Nov. 2024", en: "Sep. 2024 – Nov. 2024" },
    contexte: {
      fr: "Chambre de Commerce et d'Industrie · Fianarantsoa",
      en: "Chamber of Commerce and Industry · Fianarantsoa",
    },
    categorie: { fr: "SIG · Web Mapping", en: "GIS · Web Mapping" },
    domaines: ["GIS", "Full-Stack"],
    stack: ["Node.js", "PostgreSQL", "PostGIS", "Leaflet.js", "GeoJSON"],
    description: {
      fr: "Amélioration d'une application SIG interactive avec données GeoJSON et PostGIS, cartes Leaflet.js, API backend Node.js et optimisation des performances d'affichage et de navigation.",
      en: "Improved an interactive GIS application with GeoJSON and PostGIS data, dynamic Leaflet.js maps, Node.js backend APIs, and better display performance and navigation.",
    },
    probleme: {
      fr: "Une application SIG existante devait s'enrichir en données tout en restant fluide à l'affichage et à la navigation.",
      en: "An existing GIS application needed richer data while staying fluid to display and navigate.",
    },
    gesteTechnique: {
      fr: "Intégration de données GeoJSON et PostGIS, cartes Leaflet.js dynamiques et API backend Node.js.",
      en: "GeoJSON and PostGIS data integration, dynamic Leaflet.js maps and Node.js backend APIs.",
    },
    resultat: {
      fr: "Une application cartographique enrichie, aux performances d'affichage et de navigation optimisées.",
      en: "A richer mapping application with optimized display and navigation performance.",
    },
    pointsCles: [
      { fr: "Intégration de données GeoJSON et PostGIS", en: "GeoJSON and PostGIS data integration" },
      { fr: "Cartes interactives Leaflet.js", en: "Dynamic Leaflet.js maps" },
      { fr: "API backend Node.js", en: "Node.js backend APIs" },
      {
        fr: "Optimisation des performances d'affichage et de navigation",
        en: "Improved display performance and navigation",
      },
    ],
    visuels: [],
  },
  {
    id: "data",
    numero: 9,
    titre: { fr: "Classification et nettoyage de données", en: "Data Classification & Cleaning" },
    annee: 2025,
    periode: { fr: "Juin 2025 – Août 2025", en: "Jun. 2025 – Aug. 2025" },
    contexte: { fr: "IDEA Academy · Fianarantsoa", en: "IDEA Academy · Fianarantsoa" },
    categorie: { fr: "Data · Aide à la décision", en: "Data · Decision Support" },
    domaines: ["Data", "IA"],
    stack: ["Python", "Power BI", "Power Query", "DAX", "Low-code ML"],
    description: {
      fr: "Classification et nettoyage automatisé avec Python, transformations Power Query, DAX, ML low-code et dashboards interactifs d'aide à la décision.",
      en: "Automated data classification and cleaning with Python, Power Query transformations, DAX, low-code ML, and interactive decision-making dashboards.",
    },
    probleme: {
      fr: "Des données brutes, hétérogènes et non classées ne permettent aucune décision fiable.",
      en: "Raw, heterogeneous, unclassified data supports no reliable decision.",
    },
    gesteTechnique: {
      fr: "Classification et nettoyage automatisés en Python, transformations Power Query, mesures DAX et ML low-code.",
      en: "Automated classification and cleaning in Python, Power Query transformations, DAX measures and low-code ML.",
    },
    resultat: {
      fr: "Des dashboards interactifs d'aide à la décision, construits sur des données propres.",
      en: "Interactive decision-support dashboards built on clean data.",
    },
    pointsCles: [
      { fr: "Classification et nettoyage automatisés avec Python", en: "Automated classification and cleaning with Python" },
      { fr: "Transformations Power Query et mesures DAX", en: "Power Query transformations and DAX measures" },
      { fr: "Machine learning low-code", en: "Low-code machine learning" },
      { fr: "Dashboards interactifs d'aide à la décision", en: "Interactive decision-making dashboards" },
    ],
    visuels: [],
  },
];

/* ── Technologies ─────────────────────────────────────────────── */

export const technologies: GroupeTechno[] = [
  {
    categorie: { fr: "Langages", en: "Languages" },
    items: ["Python", "TypeScript", "JavaScript", "Java", "PHP", "C / C++ / C#", "SQL / PL-SQL"],
  },
  {
    categorie: { fr: "Frameworks & APIs", en: "Frameworks & APIs" },
    items: ["React / Next.js", "Node.js / Express", "FastAPI", "Spring Boot", "Flutter", "Leaflet.js", "Streamlit"],
  },
  {
    categorie: { fr: "IA & Data", en: "AI & Data" },
    items: ["PyTorch", "BERT & LLM Pipelines", "MindSpore", "Power BI / DAX", "ETL & Web Scraping"],
  },
  {
    categorie: { fr: "Bases de données & SIG", en: "Database & GIS" },
    items: ["PostgreSQL & PostGIS", "SQLite", "MySQL", "Oracle 19c & APEX", "OpenStreetMap API"],
  },
  {
    categorie: { fr: "Outils & DevOps", en: "Tools & DevOps" },
    items: ["Docker", "Git / GitHub", "Linux Administration", "ESP32 / IoT"],
  },
  {
    categorie: { fr: "Écosystème projets", en: "Project ecosystem" },
    note: {
      fr: "Langages, librairies et services employés dans les projets.",
      en: "Languages, libraries and services used across projects.",
    },
    items: [
      "Dart",
      "NextAuth",
      "Prisma",
      "Recharts",
      "Spring Security",
      "JPA / Hibernate",
      "Power Query",
      "GeoJSON",
      "OpenWeatherMap API",
      "OpenRouteService API",
    ],
  },
];

export const niveaux: Record<string, Niveau> = {
  Python: "advanced",
  TypeScript: "advanced",
  JavaScript: "advanced",
  Java: "intermediate",
  PHP: "intermediate",
  "C / C++ / C#": "intermediate",
  "SQL / PL-SQL": "advanced",
  "React / Next.js": "advanced",
  "Node.js / Express": "advanced",
  FastAPI: "advanced",
  "Spring Boot": "intermediate",
  Flutter: "advanced",
  "Leaflet.js": "expert",
  Streamlit: "advanced",
  PyTorch: "advanced",
  "BERT & LLM Pipelines": "advanced",
  MindSpore: "intermediate",
  "Power BI / DAX": "advanced",
  "ETL & Web Scraping": "advanced",
  "PostgreSQL & PostGIS": "expert",
  SQLite: "advanced",
  MySQL: "advanced",
  "Oracle 19c & APEX": "intermediate",
  "OpenStreetMap API": "expert",
  Docker: "intermediate",
  "Git / GitHub": "advanced",
  "Linux Administration": "advanced",
  "ESP32 / IoT": "intermediate",
};

export const niveauLabel: Record<Niveau, Texte> = {
  expert: { fr: "Expert", en: "Expert" },
  advanced: { fr: "Avancé", en: "Advanced" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate" },
};

/* ── Parcours ─────────────────────────────────────────────────── */

export const experiences: Experience[] = [
  {
    id: "bionexx",
    periode: { fr: "Depuis avr. 2026 · En cours", en: "Since Apr. 2026 · Ongoing" },
    structure: { fr: "BIONEXX · Fianarantsoa", en: "BIONEXX · Fianarantsoa" },
    role: {
      fr: "Carte interactive et centre météo avancé + application mobile des agents de terrain",
      en: "Interactive Mapping & Advanced Weather Center + Mobile Field Agents Application",
    },
    description: {
      fr: "Visualisation des vastes données multi-filière de Bionexx et développement d'un centre météo avancé de Madagascar pour les études agricoles. Application mobile pour la gestion des achats et la coordination terrain des producteurs, prestataires, responsables et agents pour Bionexx Madagascar.",
      en: "Visualizing extensive multi-sector Bionexx data and developing an advanced Madagascar weather center for agricultural studies. Mobile application for purchasing management and on-field coordination among producers, service providers, managers, and field agents for Bionexx Madagascar.",
    },
    stack: ["Flutter", "SQLite", "Leaflet.js", "PostGIS", "OpenWeatherMap"],
    enCours: true,
    projets: ["webMapping", "bionexxMobile"],
  },
  {
    id: "stock",
    periode: { fr: "Avr. 2026 – Mai 2026", en: "Apr. 2026 – May 2026" },
    structure: {
      fr: "École Nationale d'Informatique Tanambao · Fianarantsoa",
      en: "École Nationale d'Informatique Tanambao · Fianarantsoa",
    },
    role: {
      fr: "Application de gestion de stock · Méthode Wilson",
      en: "Stock Management Application · Wilson Method",
    },
    description: {
      fr: "Création d'un système intelligent de gestion de stock avec calcul automatisé de l'EOQ, indicateurs décisionnels et interface interactive Streamlit/Python.",
      en: "Created an intelligent stock management system with automated EOQ calculations, decision indicators, and an interactive Streamlit and Python interface.",
    },
    stack: ["Python", "Streamlit", "Wilson Method", "EOQ"],
    projets: ["stock"],
  },
  {
    id: "titan",
    periode: { fr: "Sept. 2025 – Déc. 2025", en: "Sep. 2025 – Dec. 2025" },
    structure: { fr: "TITAN Construction · Fianarantsoa", en: "TITAN Construction · Fianarantsoa" },
    role: {
      fr: "Générateur automatique de planning de chantier",
      en: "Automatic Construction Schedule Generator",
    },
    description: {
      fr: "Création d'une application FastAPI, Python, React et PostgreSQL pour générer des plannings, optimiser les algorithmes d'ordonnancement et visualiser les tâches en temps réel.",
      en: "Built a FastAPI, Python, React, and PostgreSQL application to generate construction schedules, optimize scheduling algorithms, and visualize tasks in real time.",
    },
    stack: ["FastAPI", "Python", "React", "PostgreSQL"],
    projets: ["construction"],
  },
  {
    id: "nlp",
    periode: { fr: "Juin 2025 – Déc. 2025", en: "Jun. 2025 – Dec. 2025" },
    structure: { fr: "IDEA Academy · En ligne", en: "IDEA Academy · Online" },
    role: {
      fr: "Enhanced NLP with LLM · Analyse des sentiments étudiants",
      en: "Enhanced NLP with LLM · Student Sentiment Analysis",
    },
    description: {
      fr: "Conception d'un pipeline NLP combinant modèles classiques et LLM pour analyser les retours étudiants, avec dashboard de visualisation.",
      en: "Designed an NLP pipeline combining classical models and LLMs to analyze student feedback, with a visualization dashboard.",
    },
    stack: ["Python", "NLP", "BERT", "LLMs", "Data Viz"],
    projets: ["nlp"],
  },
  {
    id: "data",
    periode: { fr: "Juin 2025 – Août 2025", en: "Jun. 2025 – Aug. 2025" },
    structure: { fr: "IDEA Academy · Fianarantsoa", en: "IDEA Academy · Fianarantsoa" },
    role: { fr: "Classification et nettoyage de données", en: "Data Classification & Cleaning" },
    description: {
      fr: "Classification et nettoyage automatisé avec Python, transformations Power Query, DAX, ML low-code et dashboards interactifs d'aide à la décision.",
      en: "Automated data classification and cleaning with Python, Power Query transformations, DAX, low-code ML, and interactive decision-making dashboards.",
    },
    stack: ["Python", "Power BI", "Power Query", "DAX", "Low-code ML"],
    projets: ["data"],
  },
  {
    id: "currency",
    periode: { fr: "Mai 2025 – Juin 2025", en: "May 2025 – Jun. 2025" },
    structure: {
      fr: "École Nationale d'Informatique Tanambao · Fianarantsoa",
      en: "École Nationale d'Informatique Tanambao · Fianarantsoa",
    },
    role: { fr: "Currency Track · Application web", en: "Currency Track · Web Application" },
    description: {
      fr: "Développement d'une application Next.js et TypeScript avec authentification sécurisée NextAuth et Prisma, alertes temps réel et graphiques dynamiques.",
      en: "Built a Next.js and TypeScript application with secure NextAuth and Prisma authentication, real-time alerts, and dynamic charts.",
    },
    stack: ["Next.js", "TypeScript", "NextAuth", "Prisma", "PostgreSQL"],
    projets: ["currency"],
  },
  {
    id: "transaction",
    periode: { fr: "Avr. 2025 – Mai 2025", en: "Apr. 2025 – May 2025" },
    structure: {
      fr: "École Nationale d'Informatique Tanambao · Fianarantsoa",
      en: "École Nationale d'Informatique Tanambao · Fianarantsoa",
    },
    role: {
      fr: "Plateforme web de transactions en ligne · Spring Boot",
      en: "Online Transaction Web Platform · Spring Boot",
    },
    description: {
      fr: "Conception et développement d’une plateforme web de transactions en ligne avec Spring Boot (architecture REST, gestion des utilisateurs, comptes et opérations financières, sécurité, validation et cohérence transactionnelle).",
      en: "Design and development of an online transaction web platform with Spring Boot (REST architecture, user/account management, financial operations, security, validation, and transactional consistency).",
    },
    stack: ["Spring Boot", "Java", "REST API", "PostgreSQL", "Spring Security"],
    projets: ["transaction"],
  },
  {
    id: "cci",
    periode: { fr: "Sept. 2024 – Nov. 2024", en: "Sep. 2024 – Nov. 2024" },
    structure: {
      fr: "Chambre de Commerce et d'Industrie · Fianarantsoa",
      en: "Chamber of Commerce and Industry · Fianarantsoa",
    },
    role: { fr: "Développeur Web Mapping", en: "Web Mapping Developer" },
    description: {
      fr: "Amélioration d'une application SIG interactive avec données GeoJSON et PostGIS, cartes Leaflet.js, API backend Node.js et optimisation des performances d'affichage et de navigation.",
      en: "Improved an interactive GIS application with GeoJSON and PostGIS data, dynamic Leaflet.js maps, Node.js backend APIs, and better display performance and navigation.",
    },
    stack: ["Node.js", "PostgreSQL", "PostGIS", "Leaflet.js", "GeoJSON"],
    projets: ["cci"],
  },
];

/* ── Formation ────────────────────────────────────────────────── */

export const formations: Formation[] = [
  {
    id: "bachelor",
    periode: { fr: "Depuis janv. 2026 · En cours", en: "Since Jan. 2026 · Ongoing" },
    titre: {
      fr: "Bachelor en Génie Logiciel et Base de Données",
      en: "Bachelor in Software Engineering and Database",
    },
    institution: {
      fr: "École Nationale d'Informatique, Tanambao Fianarantsoa",
      en: "École Nationale d'Informatique, Tanambao Fianarantsoa",
    },
    type: { fr: "Diplôme", en: "Degree" },
  },
  {
    id: "huawei",
    periode: { fr: "Depuis juil. 2025 · En cours", en: "Since Jul. 2025 · Ongoing" },
    titre: { fr: "HCIA-IA de la Huawei ICT Academy", en: "HCIA-AI Huawei ICT Academy" },
    institution: {
      fr: "Huawei, Shenzhen, Chine · Fondamentaux de l'IA et des équipements ICT Huawei",
      en: "Huawei, Shenzhen, China · AI and Huawei ICT equipment fundamentals",
    },
    type: { fr: "Certification", en: "Certification" },
  },
  {
    id: "aws",
    periode: { fr: "Juil. 2025", en: "Jul. 2025" },
    titre: { fr: "Cloud computing · AWS Cloud Practitioner", en: "Cloud Computing · AWS Cloud Practitioner" },
    institution: {
      fr: "Orange Digital Center · Fondamentaux du cloud et architectures distribuées",
      en: "Orange Digital Center · Cloud fundamentals and distributed architectures",
    },
    type: { fr: "Certification", en: "Certification" },
  },
  {
    id: "powerBI",
    periode: { fr: "Juin – juil. 2025", en: "Jun. – Jul. 2025" },
    titre: { fr: "Analyse de données avec Power BI", en: "Data Analysis with Power BI" },
    institution: {
      fr: "École Nationale d'Informatique Tanambao, Fianarantsoa · Power BI, DAX et ML low-code",
      en: "École Nationale d'Informatique Tanambao, Fianarantsoa · Power BI, DAX and low-code ML",
    },
    type: { fr: "Formation", en: "Training" },
  },
  {
    id: "iot",
    periode: { fr: "Avr. 2026", en: "Apr. 2026" },
    titre: { fr: "Créer des solutions IoT utiles et connectées", en: "Creating Useful Connected IoT Solutions" },
    institution: {
      fr: "Orange Digital Center, Fianarantsoa · Conception microcontrôleurs ESP32 & capteurs",
      en: "Orange Digital Center, Fianarantsoa · ESP32 microcontrollers & sensor design",
    },
    type: { fr: "Hardware & IoT", en: "Hardware & IoT" },
  },
  {
    id: "unitarEconomies",
    periode: { fr: "Nov. 2025 – janv. 2026", en: "Nov. 2025 – Jan. 2026" },
    titre: { fr: "Reshape our Economies", en: "Reshape our Economies" },
    institution: {
      fr: "UNITAR, Genève · Transformation économique inclusive et durable",
      en: "UNITAR, Geneva · Inclusive and sustainable economic transformation",
    },
    type: { fr: "International", en: "International" },
  },
  {
    id: "unitarPolicy",
    periode: { fr: "Déc. 2025 – janv. 2026", en: "Dec. 2025 – Jan. 2026" },
    titre: { fr: "Green Industrial Policy", en: "Green Industrial Policy" },
    institution: {
      fr: "UNITAR, Genève · Compétitivité et transformation structurelle",
      en: "UNITAR, Geneva · Competitiveness and structural transformation",
    },
    type: { fr: "International", en: "International" },
  },
];

/* ── Helpers ──────────────────────────────────────────────────── */

export const nombreTechnos = technologies.reduce((n, g) => n + g.items.length, 0);

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function getProjet(id: string) {
  return projets.find((p) => p.id === id);
}

export function asLocale(locale: string): Locale {
  return locale === "fr" ? "fr" : "en";
}
