/* 
   Source unique de vérité du portfolio.
   Tout le contenu (projets, technos, parcours, formation, profil)
   vit ici, en français et en anglais.
    */

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

/** Un libellé traduit, ou un nom propre identique dans les deux langues. */
export type Libelle = string | Texte;

/**
 * Schéma de principe : les étapes d'un projet, de gauche à droite.
 * Construit uniquement à partir des descriptions du projet.
 */
export interface EtapeSchema {
  titre: Libelle;
  elements: Libelle[];
}

export interface Projet {
  id: string;
  numero: number; // ordre d'affichage (01, 02...), du plus démonstratif au moins démonstratif
  vedette?: boolean; // mis en avant en tête de l'accueil (projets avec visuels)
  // Position sur l'atlas des projets, en % : x suit le temps (2024 → 2026), y le domaine principal.
  coordonnee?: { x: number; y: number };
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
  schema: EtapeSchema[];
  // Champs d'étude de cas : affichés seulement s'ils sont renseignés.
  role?: Texte; // « Mon rôle »
  metriques?: { valeur: string; label: Texte }[]; // résultats chiffrés
  aRefaire?: Texte; // « Ce que je referais autrement »
  fonctionnalites?: Texte[]; // liste détaillée, affichée sur la fiche si renseignée
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

/*  Profil  */

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
  coordonnees: "21°27′S · 47°05′E",
  fuseauLabel: "UTC+3",
  // Phrase de positionnement du hero : ce que je fais, concrètement.
  positionnement: {
    fr: "J'assemble web, données et cartographie : applications mobiles hors-ligne, plateformes SIG, pipelines NLP.",
    en: "I bring web, data and mapping together: offline-first mobile apps, GIS platforms, NLP pipelines.",
  } as Texte,
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
  anneesExperience: "4+", // conservé, plus affiché : les chiffres visibles sont calculés depuis le parcours
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

/**
 * Teinte de chaque domaine sur l'atlas (points et légende).
 * Les valeurs vivent dans globals.css (--dom-*) : une par thème, clair et sombre.
 */
export const domainesCouleurs: Record<Domaine, string> = {
  "Full-Stack": "var(--dom-full-stack)", // terracotta
  IA: "var(--dom-ia)", // sauge
  GIS: "var(--dom-gis)", // ocre
  Data: "var(--dom-data)", // ardoise
  Mobile: "var(--dom-mobile)", // aubergine
};

/*  Projets  */

export const projets: Projet[] = ([
  {
    id: "agrivision",
    numero: 1,
    coordonnee: { x: 96, y: 72 },
    vedette: true,
    titre: { fr: "AgriVision", en: "AgriVision" },
    annee: 2026,
    periode: { fr: "Depuis oct. 2026 · En cours", en: "Since Oct. 2026 · Ongoing" },
    contexte: { fr: "TANJAKAI Madagascar", en: "TANJAKAI Madagascar" },
    categorie: { fr: "SIG · IA · Biosécurité agricole", en: "GIS · AI · Agricultural biosecurity" },
    domaines: ["GIS", "IA", "Full-Stack", "Mobile"],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "TanStack Query",
      "Zustand",
      "Leaflet",
      "Recharts",
      "Framer Motion",
      "Express 5",
      "Zod",
      "Swagger",
      "Prisma",
      "PostgreSQL / PostGIS",
      "JWT",
      "Computer vision",
      "Flutter",
      "SQLite",
    ],
    description: {
      fr: "Plateforme de biosécurité agricole pour Madagascar : une application web de détection précoce et de suivi des maladies des cultures. Les techniciens diagnostiquent une plante à partir d'une photo grâce à un modèle d'IA, les foyers sont cartographiés en temps réel et les décideurs pilotent alertes, protocoles de traitement et impact économique depuis un tableau de bord unique.",
      en: "An agricultural biosecurity platform for Madagascar: a web application for early detection and monitoring of crop diseases. Technicians diagnose a plant from a photo with an AI model, outbreaks are mapped in real time, and decision-makers manage alerts, treatment protocols and economic impact from a single dashboard.",
    },
    probleme: {
      fr: "Le réseau agricole malgache — coopératives, techniciens de terrain, agronomes et décideurs du ministère — a besoin de trois choses que l'on trouve rarement ensemble : le diagnostic par IA sur le terrain, la cartographie des risques et l'aide à la décision.",
      en: "Madagascar's agricultural network — cooperatives, field technicians, agronomists and ministry decision-makers — needs three things rarely found together: AI diagnosis in the field, risk mapping and decision support.",
    },
    gesteTechnique: {
      fr: "Un frontend Next.js 16 / React 19 en TypeScript, une API REST Express 5 organisée en modules selon une architecture en couches (domaine, application, infrastructure, présentation), PostgreSQL et PostGIS via Prisma pour les requêtes spatiales, et un service d'inférence IA séparé, appelé par l'API.",
      en: "A Next.js 16 / React 19 front end in TypeScript, an Express 5 REST API organised in modules following a layered architecture (domain, application, infrastructure, presentation), PostgreSQL and PostGIS through Prisma for spatial queries, and a separate AI inference service called by the API.",
    },
    resultat: {
      fr: "Une plateforme de surveillance épidémiologique des cultures qui relie le diagnostic photo par IA, la carte des foyers en temps réel et le pilotage des alertes, des protocoles de traitement et de l'impact économique.",
      en: "A crop epidemiological surveillance platform that ties together AI photo diagnosis, a real-time outbreak map, and the management of alerts, treatment protocols and economic impact.",
    },
    role: {
      fr: "Développement full-stack : intégration frontend–backend, modules API, design system, RBAC et traçabilité.",
      en: "Full-stack development: frontend–backend integration, API modules, design system, RBAC and audit trail.",
    },
    fonctionnalites: [
      {
        fr: "Diagnostic photo par IA : une photo de feuille suffit. Un modèle de vision identifie la pathologie et donne un indice de confiance. En dessous d'un seuil de fiabilité, une vérification par un technicien est demandée. Les analyses sont historisées et alimentent un jeu de données d'entraînement.",
        en: "AI photo diagnosis: a single leaf photo is enough. A vision model identifies the disease and gives a confidence score. Below a reliability threshold, a technician is asked to verify. Analyses are logged and feed a training dataset.",
      },
      {
        fr: "Carte épidémiologique : les zones agricoles sont représentées par leurs vraies géométries (PostGIS) et colorées selon le niveau de risque. Une frise temporelle montre l'évolution sur plusieurs semaines.",
        en: "Epidemiological map: farming areas are drawn with their real geometries (PostGIS) and coloured by risk level. A timeline shows how things evolve over several weeks.",
      },
      {
        fr: "Alertes phytosanitaires : priorisation, prise en charge, résolution et historique complet de chaque intervention.",
        en: "Plant-health alerts: prioritisation, assignment, resolution and a full history of every intervention.",
      },
      {
        fr: "Fiches de traitement : protocoles validés par des agronomes, versionnés, avec leurs étapes de traitement.",
        en: "Treatment sheets: protocols validated by agronomists, versioned, with their treatment steps.",
      },
      {
        fr: "Analytique : impact économique estimé (pertes, surfaces et producteurs touchés) et étude territoriale (sols, biodiversité, ressources, zones voisines).",
        en: "Analytics: estimated economic impact (losses, affected areas and producers) and territorial study (soils, biodiversity, resources, neighbouring areas).",
      },
      {
        fr: "Gouvernance : contrôle d'accès par rôles (RBAC) à six niveaux, jusqu'au super administrateur ; matrice de permissions modifiable ; journal d'audit de toutes les actions (qui, quoi, quand, d'où), avec les secrets expurgés et un export CSV.",
        en: "Governance: six-level role-based access control (RBAC), up to super administrator; an editable permission matrix; an audit log of every action (who, what, when, from where), with secrets redacted and CSV export.",
      },
    ],
    pointsCles: [
      {
        fr: "Frontend : Next.js 16, React 19, TypeScript, Tailwind CSS 4 ; TanStack Query pour le cache des données, Zustand pour l'état ; Leaflet pour la cartographie, Recharts pour les graphiques, Framer Motion pour les animations.",
        en: "Front end: Next.js 16, React 19, TypeScript, Tailwind CSS 4; TanStack Query for data caching, Zustand for state; Leaflet for mapping, Recharts for charts, Framer Motion for animation.",
      },
      {
        fr: "Design system « Aurora Glass » : verre dépoli, fond animé, thèmes clair et sombre de même qualité, respect des préférences d'accessibilité (réduction des animations).",
        en: "“Aurora Glass” design system: frosted glass, animated background, light and dark themes of equal quality, and respect for accessibility preferences (reduced motion).",
      },
      {
        fr: "Backend : API REST Express 5 en TypeScript, organisée en modules suivant une architecture en couches (domaine, application, infrastructure, présentation).",
        en: "Back end: Express 5 REST API in TypeScript, organised in modules following a layered architecture (domain, application, infrastructure, presentation).",
      },
      {
        fr: "Validation systématique des entrées avec Zod et documentation Swagger.",
        en: "Systematic input validation with Zod and Swagger documentation.",
      },
      {
        fr: "Données : PostgreSQL et PostGIS via Prisma, avec des requêtes spatiales (centroïdes, surfaces, voisinages).",
        en: "Data: PostgreSQL and PostGIS through Prisma, with spatial queries (centroids, areas, neighbourhoods).",
      },
      {
        fr: "Règles métier garanties côté serveur, par exemple une seule fiche validée par pathologie et un seul modèle déployé par cible.",
        en: "Business rules enforced on the server, for example a single validated sheet per disease and a single deployed model per target.",
      },
      {
        fr: "Sécurité : jetons JWT de courte durée avec rotation du jeton de rafraîchissement, mots de passe hachés avec scrypt et limitation du nombre de tentatives de connexion.",
        en: "Security: short-lived JWTs with refresh-token rotation, passwords hashed with scrypt, and login rate limiting.",
      },
      {
        fr: "Permissions relues en base à chaque requête, pour qu'une révocation prenne effet immédiatement.",
        en: "Permissions re-read from the database on every request, so that a revocation takes effect immediately.",
      },
      {
        fr: "IA : service d'inférence séparé, appelé par l'API.",
        en: "AI: a separate inference service, called by the API.",
      },
    ],
    visuels: [
      {
        src: "/projets/agrivision/agrivision0.png",
        alt: {
          fr: "Page d'accueil d'AgriVision, avec un aperçu illustratif du tableau de bord national",
          en: "AgriVision home page, with an illustrative preview of the national dashboard",
        },
        largeur: 1362,
        hauteur: 628,
      },
      {
        src: "/projets/agrivision/agrivision1.png",
        alt: {
          fr: "Fonctionnement en trois temps : observer, analyser, agir",
          en: "How it works in three steps: observe, analyse, act",
        },
        largeur: 1359,
        hauteur: 623,
      },
      {
        src: "/projets/agrivision/agrivision2.png",
        alt: {
          fr: "Accès à l'espace sécurisé de la plateforme",
          en: "Access to the platform's secure area",
        },
        largeur: 1345,
        hauteur: 629,
      },
    ],
    schema: [
      {
        titre: { fr: "Observer", en: "Observe" },
        elements: [
          { fr: "Photo de feuille sur le terrain", en: "Leaf photo in the field" },
          { fr: "Techniciens · coopératives", en: "Technicians · cooperatives" },
        ],
      },
      {
        titre: { fr: "Analyser", en: "Analyse" },
        elements: [
          { fr: "Service d'inférence IA", en: "AI inference service" },
          { fr: "Indice de confiance", en: "Confidence score" },
          { fr: "Vérification sous le seuil", en: "Review below threshold" },
        ],
      },
      {
        titre: { fr: "Cartographier", en: "Map" },
        elements: [
          "PostgreSQL · PostGIS",
          { fr: "Niveau de risque par zone", en: "Risk level per area" },
          { fr: "Frise temporelle", en: "Timeline" },
        ],
      },
      {
        titre: { fr: "Agir", en: "Act" },
        elements: [
          { fr: "Alertes phytosanitaires", en: "Plant-health alerts" },
          { fr: "Fiches de traitement", en: "Treatment sheets" },
          { fr: "Impact économique", en: "Economic impact" },
        ],
      },
    ],
  },
  {
    id: "routeMada",
    numero: 2,
    coordonnee: { x: 93, y: 55 },
    vedette: true,
    titre: { fr: "RouteMada Live", en: "RouteMada Live" },
    annee: 2026,
    periode: { fr: "Sept. 2026 – Oct. 2026", en: "Sep. 2026 – Oct. 2026" },
    contexte: {
      fr: "École Nationale d'Informatique Tanambao · Fianarantsoa",
      en: "École Nationale d'Informatique Tanambao · Fianarantsoa",
    },
    categorie: { fr: "Full-Stack · Temps réel · Java", en: "Full-Stack · Real-time · Java" },
    domaines: ["Full-Stack"],
    stack: ["Java 25", "Jakarta Servlet 6", "JAX-WS", "JAXB", "Maven", "Jetty 12 / Tomcat 10", "Tailwind CSS", "JavaScript", "Leaflet"],
    description: {
      fr: "Plateforme de réservation de taxis-brousse à Madagascar en Java 25 / Jakarta EE, sans framework. Le web, les guichets (sockets TCP) et les partenaires (SOAP) vendent les mêmes sièges en temps réel, sans double vente, grâce à un dépôt partagé thread-safe et des verrous de sièges avec expiration.",
      en: "A taxi-brousse booking platform for Madagascar, built in Java 25 / Jakarta EE without a framework. The web, ticket offices (TCP sockets) and partners (SOAP) sell the same seats in real time, with no double booking, thanks to a shared thread-safe repository and expiring seat locks.",
    },
    probleme: {
      fr: "Trois canaux vendent les mêmes sièges en même temps : les voyageurs en ligne, les guichets d'agence au comptoir et les partenaires externes par service web. Il faut empêcher la double vente d'un siège.",
      en: "Three channels sell the same seats at the same time: travellers online, agency ticket offices at the counter and external partners through a web service. A seat must never be sold twice.",
    },
    gesteTechnique: {
      fr: "Les trois canaux tournent dans une seule JVM — API REST en servlets Jakarta, serveur socket TCP pour les guichets, service SOAP (JAX-WS) pour les partenaires — et partagent un dépôt en mémoire thread-safe, source de vérité. Un siège suit le cycle DISPONIBLE → VERROUILLÉ → RÉSERVÉ, et seul le titulaire du verrou peut confirmer la réservation.",
      en: "The three channels run in a single JVM — a REST API built with Jakarta servlets, a TCP socket server for ticket offices, a SOAP service (JAX-WS) for partners — and share a thread-safe in-memory repository as the source of truth. A seat follows the AVAILABLE → LOCKED → BOOKED cycle, and only the lock holder can confirm the booking.",
    },
    resultat: {
      fr: "Une réservation faite sur le web ou par SOAP est diffusée aussitôt à tous les guichets connectés, comme si un autre guichet l'avait faite : les trois canaux vendent les mêmes sièges en temps réel, sans double vente.",
      en: "A booking made on the web or through SOAP is instantly broadcast to every connected ticket office, as if another office had made it: the three channels sell the same seats in real time, with no double booking.",
    },
    fonctionnalites: [
      {
        fr: "Recherche de trajets par ville, date et nombre de voyageurs, avec des filtres (VIP, direct, horaires, budget, compagnie), un tri et un calendrier des prix sur 7 jours.",
        en: "Trip search by city, date and number of travellers, with filters (VIP, direct, departure times, budget, company), sorting and a 7-day price calendar.",
      },
      {
        fr: "Plan des sièges en temps réel : la sélection bloque les sièges 10 minutes, avec un compte à rebours. Les sièges pris par un guichet ou un partenaire apparaissent en direct.",
        en: "Real-time seat map: selecting seats holds them for 10 minutes, with a countdown. Seats taken by a ticket office or a partner appear live.",
      },
      {
        fr: "Paiement simulé par MVola, Orange Money, Airtel Money ou carte bancaire. Le numéro doit correspondre à l'opérateur, un plafond s'applique et les cas de refus (solde insuffisant, carte refusée) sont gérés.",
        en: "Simulated payment by MVola, Orange Money, Airtel Money or bank card. The number must match the operator, a ceiling applies, and rejections (insufficient balance, declined card) are handled.",
      },
      {
        fr: "Tarification calculée par le serveur : −25 % pour les enfants, supplément pour les sièges cabine, frais carte de 2 %, codes promo avec conditions (minimum d'achat, expiration, départs de nuit).",
        en: "Server-side pricing: −25% for children, a surcharge for cabin seats, a 2% card fee, and promo codes with conditions (minimum spend, expiry, night departures).",
      },
      {
        fr: "Billet électronique avec QR code, ajout à l'agenda (.ics) et partage.",
        en: "E-ticket with QR code, add-to-calendar (.ics) and sharing.",
      },
      {
        fr: "Espace « Mes billets » : historique et annulation avec aperçu du remboursement (90 %, 50 % ou 0 % selon le délai avant le départ).",
        en: "“My tickets” area: history and cancellation with a refund preview (90%, 50% or 0% depending on the time left before departure).",
      },
      {
        fr: "Suivi GPS simulé du véhicule sur une carte (Leaflet / OpenStreetMap), avec un lien de suivi partageable.",
        en: "Simulated GPS tracking of the vehicle on a map (Leaflet / OpenStreetMap), with a shareable tracking link.",
      },
      {
        fr: "Back-office guichet : indicateurs du jour, occupation des départs, vente au comptoir, blocage de sièges et contrôle d'embarquement.",
        en: "Ticket-office back office: daily indicators, departure occupancy, counter sales, seat holds and boarding control.",
      },
      {
        fr: "Comptes utilisateurs (voyageur et agent) et avis vérifiés sur les compagnies.",
        en: "User accounts (traveller and agent) and verified reviews of the companies.",
      },
    ],
    pointsCles: [
      {
        fr: "Concurrence : ConcurrentHashMap, sections synchronized et verrous de sièges avec expiration (DISPONIBLE → VERROUILLÉ → RÉSERVÉ) ; seul le titulaire du verrou peut confirmer.",
        en: "Concurrency: ConcurrentHashMap, synchronized sections and expiring seat locks (AVAILABLE → LOCKED → BOOKED); only the lock holder can confirm.",
      },
      {
        fr: "Sockets Java : serveur TCP multi-thread (ServerSocket, ExecutorService), un thread par guichet, diffusion des mises à jour via CopyOnWriteArrayList ; protocole texte HELLO, ETAT, VERROUILLER, CONFIRMER, LIBERER.",
        en: "Java sockets: multi-threaded TCP server (ServerSocket, ExecutorService), one thread per ticket office, updates broadcast via CopyOnWriteArrayList; text protocol HELLO, ETAT, VERROUILLER, CONFIRMER, LIBERER.",
      },
      {
        fr: "Service web SOAP (JAX-WS) avec WSDL publié et exception métier typée, qui réutilise exactement les mêmes règles que le web.",
        en: "SOAP web service (JAX-WS) with a published WSDL and a typed business exception, reusing exactly the same rules as the web.",
      },
      {
        fr: "XML / JAXB : export et import du catalogue des départs.",
        en: "XML / JAXB: export and import of the departure catalogue.",
      },
      {
        fr: "API REST JSON de plus de 30 endpoints en servlets Jakarta, avec des erreurs uniformes ({erreur, message}) et les bons codes HTTP (400, 401, 402, 403, 404, 409).",
        en: "JSON REST API with 30+ endpoints written as Jakarta servlets, with uniform errors ({erreur, message}) and the right HTTP codes (400, 401, 402, 403, 404, 409).",
      },
      {
        fr: "Sécurité : mots de passe hachés en SHA-256 avec sel aléatoire, et contrôle d'accès par rôle (voyageur / agent).",
        en: "Security: passwords hashed with SHA-256 and a random salt, and role-based access control (traveller / agent).",
      },
      {
        fr: "Règles horaires évaluées dans le fuseau Indian/Antananarivo (clôture des ventes 15 min avant le départ, annulation, embarquement), avec une horloge remplaçable pour les démonstrations.",
        en: "Time rules evaluated in the Indian/Antananarivo time zone (sales close 15 min before departure, cancellation, boarding), with a replaceable clock for demos.",
      },
      {
        fr: "Front-end : 10 pages en HTML, Tailwind CSS et JavaScript vanilla, construites à partir de maquettes Google Stitch et reliées à l'API par fetch().",
        en: "Front end: 10 pages in HTML, Tailwind CSS and vanilla JavaScript, built from Google Stitch mock-ups and wired to the API with fetch().",
      },
    ],
    metriques: [
      { valeur: "57", label: { fr: "classes Java (≈ 3 100 lignes)", en: "Java classes (≈ 3,100 lines)" } },
      { valeur: "≈ 5 000", label: { fr: "lignes de JavaScript", en: "lines of JavaScript" } },
      { valeur: "10", label: { fr: "écrans", en: "screens" } },
      { valeur: "3", label: { fr: "canaux de vente synchronisés", en: "synchronised sales channels" } },
    ],
    aRefaire: {
      fr: "C'est un projet de démonstration : les données sont en mémoire, sans base de données, et le paiement est simulé, sans vraie passerelle Mobile Money. Pistes d'évolution : persistance en base (JPA / PostgreSQL), WebSocket côté navigateur (le plan des sièges se rafraîchit aujourd'hui toutes les 4 s), tests automatisés et hachage des mots de passe avec bcrypt ou Argon2.",
      en: "This is a demonstration project: data lives in memory, with no database, and payment is simulated, with no real Mobile Money gateway. Next steps: database persistence (JPA / PostgreSQL), WebSocket in the browser (the seat map currently refreshes every 4 s), automated tests, and password hashing with bcrypt or Argon2.",
    },
    visuels: [
      {
        src: "/projets/route-mada/route-mada0.png",
        alt: { fr: "Accueil : recherche de trajets en taxi-brousse", en: "Home page: taxi-brousse trip search" },
        largeur: 1252,
        hauteur: 621,
      },
      {
        src: "/projets/route-mada/route-mada2.png",
        alt: {
          fr: "Plan des sièges en temps réel, synchronisé avec le guichet",
          en: "Real-time seat map, synced with the ticket office",
        },
        largeur: 1009,
        hauteur: 570,
      },
      {
        src: "/projets/route-mada/route-mada1.png",
        alt: { fr: "Résultats de recherche avec filtres et tri", en: "Search results with filters and sorting" },
        largeur: 1034,
        hauteur: 630,
      },
      {
        src: "/projets/route-mada/route-mada3.png",
        alt: { fr: "Récapitulatif de la réservation et coordonnées du passager", en: "Booking summary and passenger details" },
        largeur: 1010,
        hauteur: 630,
      },
      {
        src: "/projets/route-mada/route-mada4.png",
        alt: { fr: "Validation du paiement MVola simulé", en: "Simulated MVola payment confirmation" },
        largeur: 385,
        hauteur: 444,
      },
      {
        src: "/projets/route-mada/route-mada5.png",
        alt: { fr: "Billet électronique confirmé avec QR code", en: "Confirmed e-ticket with QR code" },
        largeur: 1010,
        hauteur: 630,
      },
      {
        src: "/projets/route-mada/route-mada00.png",
        alt: {
          fr: "Suivi GPS du véhicule sur une carte OpenStreetMap",
          en: "Vehicle GPS tracking on an OpenStreetMap map",
        },
        largeur: 1258,
        hauteur: 635,
      },
    ],
    schema: [
      {
        titre: { fr: "Canaux de vente", en: "Sales channels" },
        elements: [
          { fr: "Voyageurs (navigateur)", en: "Travellers (browser)" },
          { fr: "Guichets d'agence", en: "Ticket offices" },
          { fr: "Partenaires externes", en: "External partners" },
        ],
      },
      {
        titre: { fr: "Points d'entrée", en: "Entry points" },
        elements: ["API REST (Servlets)", { fr: "Socket TCP · port 5000", en: "TCP socket · port 5000" }, "SOAP (JAX-WS)"],
      },
      {
        titre: { fr: "Couche service métier", en: "Business service layer" },
        elements: [
          { fr: "Tarification", en: "Pricing" },
          { fr: "Règles horaires", en: "Time rules" },
          { fr: "Contrôle d'accès par rôle", en: "Role-based access" },
        ],
      },
      {
        titre: { fr: "Dépôt partagé thread-safe", en: "Shared thread-safe repository" },
        elements: [
          { fr: "Trajets", en: "Trips" },
          { fr: "Sièges & verrous", en: "Seats & locks" },
          { fr: "Réservations", en: "Bookings" },
        ],
      },
    ],
  },
  {
    id: "webMapping",
    numero: 3,
    coordonnee: { x: 83, y: 72 },
    vedette: true,
    titre: { fr: "Cartographie web & plateforme météo", en: "Web Mapping & Weather Platform" },
    annee: 2026,
    periode: { fr: "Depuis mai. 2026 · En cours", en: "Since May. 2026 · Ongoing" },
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
    schema: [
      {
        titre: { fr: "Sources", en: "Sources" },
        elements: [
          { fr: "Données multi-filières Bionexx", en: "Bionexx multi-sector data" },
          "OpenStreetMap",
          "OpenWeatherMap",
          "OpenRouteService",
        ],
      },
      {
        titre: { fr: "Traitement spatial", en: "Spatial processing" },
        elements: ["PostGIS", { fr: "Requêtes spatiales", en: "Spatial queries" }],
      },
      {
        titre: { fr: "Application Next.js", en: "Next.js app" },
        elements: [
          { fr: "Carte Leaflet multi-couches", en: "Multi-layer Leaflet map" },
          { fr: "Centre météo", en: "Weather center" },
        ],
      },
      {
        titre: { fr: "Usage", en: "Use" },
        elements: [{ fr: "Analyse agricole multi-filière", en: "Multi-sector agricultural analysis" }],
      },
    ],
  },
  {
    id: "construction",
    numero: 4,
    coordonnee: { x: 64, y: 55 },
    vedette: true,
    titre: { fr: "Système de planification de chantier", en: "Construction Planning System" },
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
    schema: [
      {
        titre: { fr: "Entrée", en: "Input" },
        elements: [
          { fr: "Tâches du chantier", en: "Site tasks" },
          { fr: "Contraintes entre tâches", en: "Task constraints" },
        ],
      },
      {
        titre: { fr: "API FastAPI", en: "FastAPI backend" },
        elements: [{ fr: "Ordonnancement sous contraintes", en: "Constraint-based scheduling" }, "Python", "PostgreSQL"],
      },
      {
        titre: { fr: "Tableau de bord React", en: "React dashboard" },
        elements: [
          { fr: "Timeline Gantt dynamique", en: "Dynamic Gantt timeline" },
          { fr: "Tâches en temps réel", en: "Real-time tasks" },
        ],
      },
    ],
  },
  {
    id: "nlp",
    numero: 5,
    coordonnee: { x: 53, y: 20 },
    vedette: true,
    titre: { fr: "NLP augmenté par LLM", en: "Enhanced NLP with LLM" },
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
    schema: [
      {
        titre: { fr: "Entrée", en: "Input" },
        elements: [{ fr: "Retours étudiants en texte libre", en: "Free-text student feedback" }],
      },
      {
        titre: { fr: "Pipeline hybride", en: "Hybrid pipeline" },
        elements: ["BERT", { fr: "Modèles statistiques", en: "Statistical models" }, "LLM"],
      },
      {
        titre: { fr: "Analyse", en: "Analysis" },
        elements: [
          { fr: "Sentiments", en: "Sentiment" },
          { fr: "Thématiques", en: "Topics" },
          { fr: "Classification", en: "Classification" },
        ],
      },
      {
        titre: { fr: "Restitution", en: "Output" },
        elements: [
          { fr: "Dashboard interactif", en: "Interactive dashboard" },
          { fr: "Reporting décisionnel", en: "Decision reporting" },
        ],
      },
    ],
  },
  {
    id: "currency",
    numero: 6,
    coordonnee: { x: 40, y: 59 },
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
    schema: [
      {
        titre: { fr: "Utilisateur", en: "User" },
        elements: [{ fr: "Connexion sécurisée", en: "Secure sign-in" }],
      },
      {
        titre: "Next.js · TypeScript",
        elements: [
          "NextAuth.js",
          { fr: "Graphiques Recharts", en: "Recharts charts" },
          { fr: "Alertes & notifications", en: "Alerts & notifications" },
        ],
      },
      {
        titre: { fr: "Données", en: "Data" },
        elements: [{ fr: "ORM Prisma", en: "Prisma ORM" }, "PostgreSQL"],
      },
    ],
  },
  {
    id: "stock",
    numero: 7,
    coordonnee: { x: 78, y: 37 },
    titre: { fr: "Gestion de stock intelligente", en: "Intelligent Stock Management" },
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
    schema: [
      {
        titre: { fr: "Entrée", en: "Input" },
        elements: [{ fr: "Données de stock", en: "Stock data" }],
      },
      {
        titre: { fr: "Modèle de Wilson", en: "Wilson model" },
        elements: ["EOQ", "Python"],
      },
      {
        titre: { fr: "Interface Streamlit", en: "Streamlit interface" },
        elements: [
          { fr: "Quantité économique de commande", en: "Economic order quantity" },
          { fr: "Seuils de réapprovisionnement", en: "Reorder points" },
          { fr: "Coûts d'acquisition", en: "Acquisition costs" },
          { fr: "Indicateurs décisionnels", en: "Decision indicators" },
        ],
      },
    ],
  },
  {
    id: "transaction",
    numero: 8,
    coordonnee: { x: 30, y: 54 },
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
    schema: [
      {
        titre: { fr: "Client", en: "Client" },
        elements: [{ fr: "Requêtes REST", en: "REST requests" }],
      },
      {
        titre: { fr: "Backend Spring Boot", en: "Spring Boot backend" },
        elements: [
          "Spring Security",
          { fr: "Validation des données", en: "Data validation" },
          { fr: "Utilisateurs · comptes · opérations", en: "Users · accounts · operations" },
        ],
      },
      {
        titre: { fr: "Persistance", en: "Persistence" },
        elements: ["JPA / Hibernate", "PostgreSQL", { fr: "Cohérence transactionnelle", en: "Transactional consistency" }],
      },
    ],
  },
  {
    id: "cci",
    numero: 9,
    coordonnee: { x: 13, y: 72 },
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
    schema: [
      {
        titre: { fr: "Données", en: "Data" },
        elements: ["GeoJSON", "PostgreSQL · PostGIS"],
      },
      {
        titre: { fr: "API backend", en: "Backend API" },
        elements: ["Node.js"],
      },
      {
        titre: { fr: "Cartes Leaflet.js", en: "Leaflet.js maps" },
        elements: [
          { fr: "Affichage optimisé", en: "Optimized display" },
          { fr: "Navigation fluide", en: "Smooth navigation" },
        ],
      },
    ],
  },
  {
    id: "data",
    numero: 10,
    coordonnee: { x: 49, y: 38 },
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
    schema: [
      {
        titre: { fr: "Entrée", en: "Input" },
        elements: [{ fr: "Données brutes hétérogènes", en: "Raw heterogeneous data" }],
      },
      {
        titre: "Python",
        elements: [
          { fr: "Classification", en: "Classification" },
          { fr: "Nettoyage automatisé", en: "Automated cleaning" },
        ],
      },
      {
        titre: "Power BI",
        elements: ["Power Query", "DAX", { fr: "ML low-code", en: "Low-code ML" }],
      },
      {
        titre: { fr: "Restitution", en: "Output" },
        elements: [{ fr: "Dashboards d'aide à la décision", en: "Decision-support dashboards" }],
      },
    ],
  },
] satisfies Projet[]).sort((a, b) => a.numero - b.numero);

/*  Technologies  */

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
      "Jakarta EE (Servlets)",
      "JAX-WS / SOAP",
      "JAXB",
      "Maven",
      "Jetty / Tomcat",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Zod",
      "Swagger / OpenAPI",
      "Framer Motion",
      "JWT",
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

/*  Parcours  */

export const experiences: Experience[] = [
  {
    id: "agrivision",
    periode: { fr: "Depuis oct. 2026 · En cours", en: "Since Oct. 2026 · Ongoing" },
    structure: { fr: "TANJAKAI Madagascar", en: "TANJAKAI Madagascar" },
    role: {
      fr: "AgriVision · Plateforme de biosécurité agricole",
      en: "AgriVision · Agricultural biosecurity platform",
    },
    description: {
      fr: "Projet d'équipe : plateforme web de détection précoce et de suivi des maladies des cultures (diagnostic photo par IA, carte épidémiologique PostGIS, alertes et aide à la décision). Développement full-stack : intégration frontend–backend, modules API, design system, RBAC et traçabilité.",
      en: "Team project: a web platform for early detection and monitoring of crop diseases (AI photo diagnosis, PostGIS epidemiological map, alerts and decision support). Full-stack development: frontend–backend integration, API modules, design system, RBAC and audit trail.",
    },
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostGIS"],
    enCours: true,
    projets: ["agrivision"],
  },
  {
    id: "routeMada",
    periode: { fr: "Sept. 2026 – Oct. 2026", en: "Sep. 2026 – Oct. 2026" },
    structure: {
      fr: "École Nationale d'Informatique Tanambao · Fianarantsoa",
      en: "École Nationale d'Informatique Tanambao · Fianarantsoa",
    },
    role: {
      fr: "RouteMada Live · Réservation de taxis-brousse en temps réel",
      en: "RouteMada Live · Real-time taxi-brousse booking",
    },
    description: {
      fr: "Projet académique du module Java avancé : plateforme de réservation en Java 25 / Jakarta EE, sans Spring, où le web, les guichets (sockets TCP) et les partenaires (SOAP) vendent les mêmes sièges en temps réel, sans double vente.",
      en: "Academic project for the advanced Java module: a booking platform in Java 25 / Jakarta EE, without Spring, where the web, ticket offices (TCP sockets) and partners (SOAP) sell the same seats in real time, with no double booking.",
    },
    stack: ["Java 25", "Jakarta EE", "JAX-WS", "Sockets TCP", "Tailwind CSS"],
    projets: ["routeMada"],
  },
  {
    id: "bionexx",
    periode: { fr: "Depuis avr. 2026 · En cours", en: "Since Apr. 2026 · Ongoing" },
    structure: { fr: "BIONEXX · Fianarantsoa", en: "BIONEXX · Fianarantsoa" },
    role: {
      fr: "Carte interactive et centre météo avancé ",
      en: "Interactive Mapping & Advanced Weather Center ",
    },
    description: {
      fr: "Visualisation des vastes données multi-filière de Bionexx et développement d'un centre météo avancé de Madagascar pour les études agricoles.",
      en: "Visualizing extensive multi-sector Bionexx data and developing an advanced Madagascar weather center for agricultural studies.",
    },
    stack: ["Leaflet.js", "PostGIS", "OpenWeatherMap"],
    enCours: true,
    projets: ["webMapping", "bionexx"],
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

/*  Formation  */

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

/*  Helpers  */

export const nombreTechnos = technologies.reduce((n, g) => n + g.items.length, 0);

// Chiffres affichés : toujours calculés depuis le parcours, donc toujours vrais.
export const nombreStructures = new Set(experiences.map((e) => e.structure.fr.split(" · ")[0])).size;
export const premiereAnnee = Math.min(
  ...experiences.flatMap((e) => (e.periode.fr.match(/\d{4}/g) ?? []).map(Number)),
);

export function libelle(l: Libelle, locale: Locale) {
  return typeof l === "string" ? l : l[locale];
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function getProjet(id: string) {
  return projets.find((p) => p.id === id);
}

export function asLocale(locale: string): Locale {
  return locale === "fr" ? "fr" : "en";
}
