import type { SiteConfig, Project, Experience, TechItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Emma Maikuri",
  tagline: "I build things for the web — and beyond.",
  description: "Full-stack software developer based in Nairobi, Kenya. I craft dynamic interfaces, robust back-end systems, and AI-powered applications across web and mobile.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emmabsy.github.io",
  email: "maikuriemma@gmail.com",
  location: "Nairobi, Kenya",
  availability: "Open to opportunities",
  socials: {
    github: "https://github.com/emmabsy",
    linkedin: "https://linkedin.com/in/emmamaikuri",
  },
  stats: [
    { value: "9+",  label: "Years"    },
    { value: "20+", label: "Projects" },
    { value: "2",   label: "Certs"    },
  ],
};

export const projects: Project[] = [
  // ── 1. ATS Resume Rewriter ────────────────────────────────────────────
  {
    id: "ats-resume",
    title: "ATS Resume Rewriter",
    description: "AI tool that scores your resume against any job description, finds keyword gaps, and rewrites it in under 60 seconds.",
    longDescription: "Paste your resume and a job description — the AI returns an ATS compatibility score, a keyword gap analysis, and a fully rewritten resume optimised for applicant tracking systems. Built with Next.js and the Vercel AI SDK.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://prompt-engineer-eh68c4orn-emmabsys-projects.vercel.app/app",
    githubUrl: "https://github.com/emmabsy",
    tag: "AI", featured: true,
    techStack: ["Next.js", "TypeScript", "Vercel AI SDK", "OpenAI", "TailwindCSS"],
  },
  // ── 2. Tendza AI ─────────────────────────────────────────────────────
  {
    id: "tendza-ai",
    title: "Tendza AI",
    description: "An AI-powered web application for intelligent, real-time features — built with Next.js and deployed on Vercel.",
    longDescription: "Tendza AI is a production-grade AI application built with Next.js 14 and the Vercel AI SDK. It delivers intelligent, real-time features powered by large language models, with a clean UI and sub-second response streaming.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://tendza-ai.vercel.app/",
    githubUrl: "https://github.com/emmabsy",
    tag: "AI", featured: true,
    techStack: ["Next.js", "React", "TypeScript", "Vercel AI SDK", "TailwindCSS"],
  },
  // ── 3. Plumbee Farmer DB ─────────────────────────────────────────────
  {
    id: "plumbee-db",
    title: "Plumbee Farmer DB",
    description: "Full-stack farmer database management system for Plumbee Wholefoods — boosting operational productivity.",
    longDescription: "Designed and built a complete farmer database management system using JavaScript, Express.js, and MySQL. Tracks supplier relationships, farm data, and inventory — cutting admin time significantly.",
    language: "JavaScript", languageColor: "#f1e05a",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Systems",
    techStack: ["JavaScript", "Express.js", "MySQL", "Node.js"],
  },
  // ── 4. Dev Portfolio v2 ──────────────────────────────────────────────
  {
    id: "portfolio-v2",
    title: "Dev Portfolio v2",
    description: "This site — Next.js 15, scroll-driven animations, CSS variable theming, and a magnetic cursor.",
    longDescription: "A fully custom portfolio built with Next.js 15, scroll-driven sticky card animations, and a CSS variable token system for clean light/dark theming. Features a magnetic cursor, terminal typewriter hero, and alternating career timeline.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://emmabsy.github.io/",
    githubUrl: "https://github.com/emmabsy",
    tag: "Frontend", featured: true,
    techStack: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
  },
  // ── 5. AI Chatbot Starter ────────────────────────────────────────────
  {
    id: "ai-chatbot",
    title: "AI Chatbot Starter",
    description: "Production-ready chatbot template with streaming responses, conversation memory, and a clean embeddable UI.",
    longDescription: "A batteries-included chatbot starter kit built on the Vercel AI SDK. Supports streaming, multi-turn conversation memory, system prompt customisation, and can be embedded in any site as a widget or full-page app.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "AI",
    techStack: ["Next.js", "TypeScript", "Vercel AI SDK", "TailwindCSS", "Prisma"],
  },
  // ── 6. ML Experiments ────────────────────────────────────────────────
  {
    id: "ml-models",
    title: "ML Experiments",
    description: "A curated collection of ML models — NLP, image classification, and regression — trained and evaluated in Python.",
    longDescription: "An ongoing research sandbox: NLP sentiment models, image classifiers with TensorFlow, regression experiments with Scikit-learn, and data pipelines in Pandas. Each model is documented with training metrics and usage notes.",
    language: "Python", languageColor: "#3572a5",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "ML",
    techStack: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy"],
  },
  // ── 7. Cross-Platform Mobile App ─────────────────────────────────────
  {
    id: "mobile-app",
    title: "Cross-Platform Mobile App",
    description: "A React Native app targeting iOS and Android — offline-first, push notifications, and biometric auth.",
    longDescription: "A production-ready cross-platform mobile application built with React Native and Expo. Features offline-first data sync, push notifications, biometric authentication, and a custom component library. Ships from a single codebase.",
    language: "JavaScript", languageColor: "#f1e05a",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Mobile",
    techStack: ["React Native", "Expo", "JavaScript", "AsyncStorage", "Firebase"],
  },
  // ── 8. Django REST API ───────────────────────────────────────────────
  {
    id: "django-api",
    title: "Django REST API",
    description: "Production-grade REST API — JWT auth, PostgreSQL, Redis rate limiting, OpenAPI docs, containerised with Docker.",
    longDescription: "A scalable Django REST Framework API with JWT auth, role-based access control, PostgreSQL with connection pooling, Redis-based rate limiting, and auto-generated OpenAPI / Swagger docs. Containerised with Docker.",
    language: "Python", languageColor: "#3572a5",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Systems",
    techStack: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
  },
  // ── 9. Laravel E-Commerce ────────────────────────────────────────────
  {
    id: "laravel-ecommerce",
    title: "Laravel E-Commerce Platform",
    description: "Full e-commerce platform with M-Pesa & Stripe payments, inventory management, and a Filament admin dashboard.",
    longDescription: "A complete e-commerce solution for the East African market. Built on Laravel with Livewire, integrates M-Pesa Daraja API and Stripe, features a custom inventory system, order management, and a Filament admin panel.",
    language: "PHP", languageColor: "#4F5D95",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Web",
    techStack: ["PHP", "Laravel", "Livewire", "MySQL", "M-Pesa API", "Stripe"],
  },
  // ── 10. Automation Scripts Pack ──────────────────────────────────────
  {
    id: "automation-scripts",
    title: "Automation Scripts Pack",
    description: "A curated collection of Python and JavaScript automation scripts for web scraping, data pipelines, and workflow automation.",
    longDescription: "A growing library of battle-tested automation scripts: web scrapers with Playwright, email automation, Notion/Airtable integrations, file processing pipelines, and scheduled task runners. Available on Gumroad.",
    language: "Python", languageColor: "#3572a5",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Tools",
    techStack: ["Python", "Playwright", "Node.js", "Cron", "Airtable API"],
  },
  // ── 11. Next.js SaaS Starter ─────────────────────────────────────────
  {
    id: "nextjs-saas-starter",
    title: "Next.js SaaS Starter",
    description: "A complete SaaS boilerplate — auth, billing, dashboard, and team management — ready to customise and ship.",
    longDescription: "A production-ready Next.js SaaS template with NextAuth for authentication, Stripe for billing and subscriptions, a user dashboard, team workspaces, and a polished landing page. Saves weeks of setup time.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Tools",
    techStack: ["Next.js", "TypeScript", "NextAuth", "Stripe", "Prisma", "TailwindCSS"],
  },
  // ── 12. Flutter Finance App ───────────────────────────────────────────
  {
    id: "flutter-finance",
    title: "Flutter Finance Tracker",
    description: "A personal finance app built in Flutter — expense tracking, budget goals, visual charts, and KES / USD support.",
    longDescription: "A cross-platform finance tracker built with Flutter and Dart. Features expense categorisation, monthly budget goals, chart visualisations with fl_chart, and supports both Kenyan Shilling and USD. Stores data locally with Hive.",
    language: "Dart", languageColor: "#00B4AB",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Mobile",
    techStack: ["Flutter", "Dart", "Hive", "fl_chart", "Firebase"],
  },
];

// Homepage shows first 6 featured projects
export const featuredProjects = projects.slice(0, 6);

export const experience: Experience[] = [
  {
    id: "plumbee",
    year: "2023 →",
    role: "Co-founder & Software Developer",
    company: "Plumbee Wholefoods",
    description: "Designed and built an efficient farmer database management system using JavaScript, Express.js, and MySQL. Delivered innovative solutions under tight deadlines with rigorous QA testing.",
    highlights: ["Full-stack DB system", "JavaScript + Express.js", "MySQL backend", "QA & stability testing"],
    current: true,
  },
  {
    id: "freelance",
    year: "2016 →",
    role: "Freelance Software Developer",
    company: "Independent",
    description: "Building dynamic front-end interfaces with React and robust back-end systems in PHP, Python, and Java. Continuously delivering optimised, cross-platform solutions for diverse clients.",
    highlights: ["React front-ends", "PHP / Python / Java APIs", "Performance optimisation", "Agile delivery"],
    current: true,
  },
  {
    id: "equatorial",
    year: "2015 – 2016",
    role: "Operations Assistant",
    company: "Equatorial Bank of Kenya",
    description: "Conducted thorough accounts vetting to ensure full KYC compliance. Assisted in developing streamlined processes that enhanced efficiency in accounts vetting procedures.",
  },
  {
    id: "cba",
    year: "2014",
    role: "Bancassurance Assistant",
    company: "Commercial Bank of Africa",
    description: "Managed a portfolio of insurance policies — inputting, processing, and executing timely renewals using advanced software systems in full compliance with company and industry standards.",
  },
];

export const techStack: TechItem[] = [
  { name: "JavaScript",   category: "Language",       proficiency: "expert"     },
  { name: "TypeScript",   category: "Language",       proficiency: "proficient" },
  { name: "Python",       category: "Language",       proficiency: "expert"     },
  { name: "Java",         category: "Language",       proficiency: "proficient" },
  { name: "PHP",          category: "Language",       proficiency: "proficient" },
  { name: "Dart",         category: "Language",       proficiency: "proficient" },
  { name: "C++",          category: "Language",       proficiency: "familiar"   },
  { name: "React",        category: "Framework",      proficiency: "expert"     },
  { name: "Next.js",      category: "Framework",      proficiency: "proficient" },
  { name: "Express.js",   category: "Framework",      proficiency: "expert"     },
  { name: "Django",       category: "Framework",      proficiency: "proficient" },
  { name: "Laravel",      category: "Framework",      proficiency: "proficient" },
  { name: "Flutter",      category: "Framework",      proficiency: "proficient" },
  { name: "React Native", category: "Framework",      proficiency: "proficient" },
  { name: "MySQL",        category: "Database",       proficiency: "expert"     },
  { name: "PostgreSQL",   category: "Database",       proficiency: "proficient" },
  { name: "MongoDB",      category: "Database",       proficiency: "proficient" },
  { name: "TensorFlow",   category: "Tooling",        proficiency: "proficient" },
  { name: "Scikit-learn", category: "Tooling",        proficiency: "proficient" },
  { name: "Pandas",       category: "Tooling",        proficiency: "proficient" },
  { name: "Azure",        category: "Infrastructure", proficiency: "proficient" },
  { name: "Docker",       category: "Infrastructure", proficiency: "proficient" },
  { name: "Git",          category: "Tooling",        proficiency: "expert"     },
  { name: "Kotlin",       category: "Language",       proficiency: "familiar"   },
];

export const techNames = techStack.map(t => t.name);

export const terminalLines = [
  "const dev = new SoftwareEngineer('Nairobi, KE');",
  "dev.stack  = ['React', 'Python', 'Express.js', 'Flutter'];",
  "dev.builds = ['Web Apps', 'AI Tools', 'Games', 'Mobile'];",
  "dev.status = 'Open to opportunities ✦';",
];
