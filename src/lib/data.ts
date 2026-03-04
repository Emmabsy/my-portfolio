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

  // ══════════════════════════════════════════════════
  //  AI TOOLS
  // ══════════════════════════════════════════════════

  {
    id: "resumepro",
    title: "ResumePro — AI Resume Optimiser",
    description: "AI-powered resume scorer and rewriter. Paste your resume + job description and get an ATS score, keyword gap analysis, and a fully rewritten resume in seconds.",
    longDescription: "ResumePro analyses your resume against any job description using AI, returns an ATS compatibility score, highlights keyword gaps, and produces a fully rewritten, optimised version — all in under 60 seconds. Built with Next.js and deployed live on Vercel.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://resumepro-sigma.vercel.app/",
    githubUrl: "https://github.com/emmabsy",
    tag: "AI", featured: true,
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Vercel AI SDK", "TailwindCSS"],
  },

  {
    id: "tendza-ai",
    title: "Tendza AI",
    description: "Production-grade AI web app with real-time LLM features, sub-second streaming, and a clean modern UI — live on Vercel.",
    longDescription: "Tendza AI is a production-grade AI application built with Next.js 14 and the Vercel AI SDK. It delivers intelligent, real-time features powered by large language models, with a clean UI and sub-second response streaming.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://tendza-ai.vercel.app/",
    githubUrl: "https://github.com/emmabsy",
    tag: "AI", featured: true,
    techStack: ["Next.js", "React", "TypeScript", "Vercel AI SDK", "TailwindCSS"],
  },

  // ══════════════════════════════════════════════════
  //  SAAS / WEB APPS
  // ══════════════════════════════════════════════════

  {
    id: "welaspace",
    title: "WelaSpace",
    description: "Premium client portal and project management platform — built for freelancers and agencies to manage clients, projects, and deliverables in one place.",
    longDescription: "WelaSpace is a polished client portal and project management tool designed for freelancers and small agencies. Features include project dashboards, file sharing, invoice management, client messaging, and a beautiful branded client-facing view. Available on Gumroad.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://maikuri.gumroad.com/l/atbel",
    githubUrl: "https://github.com/emmabsy",
    tag: "Web", featured: true,
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS", "Stripe"],
  },

  {
    id: "devflow-pro",
    title: "DevFlow Pro: The Project Architect",
    description: "Developer-focused project planning and architecture tool — map dependencies, generate boilerplate, and ship faster.",
    longDescription: "DevFlow Pro is a project planning toolkit built for developers. Helps you map out project architecture, define module dependencies, generate folder structures and boilerplate code, and create technical spec documents — all before writing a single line of production code. Available on Gumroad.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://maikuri.gumroad.com/l/zakbe",
    githubUrl: "https://github.com/emmabsy",
    tag: "Tools", featured: true,
    techStack: ["Next.js", "TypeScript", "React Flow", "OpenAI API", "TailwindCSS"],
  },

  {
    id: "ghostorganize-pro",
    title: "GhostOrganize Pro",
    description: "AI-powered personal organisation system — tasks, notes, and projects intelligently structured so nothing falls through the cracks.",
    longDescription: "GhostOrganize Pro is a smart productivity and organisation app powered by AI. It automatically categorises your tasks and notes, surfaces priorities, links related items, and keeps your workspace clean. Think of it as a second brain that actually understands context. Available on Gumroad.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://maikuri.gumroad.com/l/exaefv",
    githubUrl: "https://github.com/emmabsy",
    tag: "Tools",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Notion API", "TailwindCSS"],
  },

  // ══════════════════════════════════════════════════
  //  N8N AUTOMATIONS
  // ══════════════════════════════════════════════════

  {
    id: "n8n-bundle",
    title: "n8n AI Automation Bundle",
    description: "A curated bundle of production-ready n8n automation workflows — AI agents, data pipelines, API integrations, and more.",
    longDescription: "A comprehensive collection of battle-tested n8n automation workflows built for real business use cases. Includes AI agent workflows, CRM integrations, data sync pipelines, webhook handlers, and scheduled task automations. Each workflow is documented and ready to import. Available on Gumroad.",
    language: "JSON", languageColor: "#cbcb41",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://maikuri.gumroad.com/l/uidqk",
    githubUrl: "https://github.com/emmabsy",
    tag: "Automation",
    techStack: ["n8n", "OpenAI API", "Webhooks", "REST APIs", "JavaScript"],
  },

  {
    id: "n8n-upwork-proposal",
    title: "n8n Upwork Auto-Proposal & Asset Generator",
    description: "Automated n8n workflow that reads Upwork job listings and generates tailored proposals and portfolio assets using AI.",
    longDescription: "This n8n automation monitors Upwork RSS feeds or API for new job postings matching your criteria, passes them through an AI pipeline to generate personalised proposals, cover letters, and relevant portfolio assets — then formats everything ready to submit. A massive time-saver for active freelancers. Available on Gumroad.",
    language: "JSON", languageColor: "#cbcb41",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://maikuri.gumroad.com/l/numto",
    githubUrl: "https://github.com/emmabsy",
    tag: "Automation",
    techStack: ["n8n", "OpenAI API", "Upwork API", "Google Docs API", "Webhooks"],
  },

  {
    id: "n8n-video-generator",
    title: "n8n AI Long-Form Video Generator",
    description: "End-to-end n8n pipeline that generates long-form videos with AI voiceover via ElevenLabs, visuals via PIAPI, edits with Shotstack, and auto-posts to YouTube.",
    longDescription: "A fully automated n8n video production pipeline. Give it a topic — it generates a script with AI, produces professional voiceover via ElevenLabs, generates visuals via PIAPI, stitches everything together using Shotstack or Creatomate, adds captions, and posts the final video directly to YouTube. Hands-free content at scale. Available on Gumroad.",
    language: "JSON", languageColor: "#cbcb41",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://maikuri.gumroad.com/l/jhucmw",
    githubUrl: "https://github.com/emmabsy",
    tag: "Automation",
    techStack: ["n8n", "ElevenLabs API", "PIAPI", "Shotstack", "YouTube API", "OpenAI"],
  },

  // ══════════════════════════════════════════════════
  //  DESKTOP / NATIVE TOOLS
  // ══════════════════════════════════════════════════

  {
    id: "mac-toolbox",
    title: "The Mac Toolbox",
    description: "Three essential Mac utilities in one: batch image resizer, PDF merger, and studio-grade audio extractor.",
    longDescription: "A suite of three native Mac utilities: Image Resizer Pro (batch resize and convert images), Pro PDF Merger (combine, reorder and compress PDFs), and Studio Audio Extractor (rip high-quality audio tracks from video files). Clean native UI, no internet required. Available on Gumroad.",
    language: "Swift", languageColor: "#F05138",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://maikuri.gumroad.com/l/oxwus",
    githubUrl: "https://github.com/emmabsy",
    tag: "Desktop",
    techStack: ["Swift", "SwiftUI", "AVFoundation", "PDFKit", "AppKit"],
  },

  // ══════════════════════════════════════════════════
  //  SYSTEMS / BACKEND
  // ══════════════════════════════════════════════════

  {
    id: "plumbee-db",
    title: "Plumbee Farmer DB",
    description: "Full-stack farmer database management system for Plumbee Wholefoods — boosting operational productivity across the supply chain.",
    longDescription: "Designed and built a complete farmer database management system using JavaScript, Express.js, and MySQL. Tracks supplier relationships, farm data, and inventory — reducing manual processes and cutting admin time significantly.",
    language: "JavaScript", languageColor: "#f1e05a",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Systems",
    techStack: ["JavaScript", "Express.js", "MySQL", "Node.js"],
  },

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

  // ══════════════════════════════════════════════════
  //  MOBILE
  // ══════════════════════════════════════════════════

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

  {
    id: "flutter-finance",
    title: "Flutter Finance Tracker",
    description: "Personal finance app in Flutter — expense tracking, budget goals, visual charts, and KES / USD support.",
    longDescription: "A cross-platform finance tracker built with Flutter and Dart. Features expense categorisation, monthly budget goals, chart visualisations with fl_chart, and supports both Kenyan Shilling and USD. Stores data locally with Hive.",
    language: "Dart", languageColor: "#00B4AB",
    stars: 0, forks: 0, hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Mobile",
    techStack: ["Flutter", "Dart", "Hive", "fl_chart", "Firebase"],
  },

  // ══════════════════════════════════════════════════
  //  ML
  // ══════════════════════════════════════════════════

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

  // Portfolio
  {
    id: "portfolio-v2",
    title: "Dev Portfolio v2",
    description: "This site — Next.js 15, scroll-driven card animations, CSS variable theming, and a magnetic cursor.",
    longDescription: "A fully custom portfolio built with Next.js 15, scroll-driven sticky card animations, and a CSS variable token system for clean light/dark theming. Features a magnetic cursor, terminal typewriter hero, and alternating career timeline.",
    language: "TypeScript", languageColor: "#3178c6",
    stars: 0, forks: 0, hasLiveDemo: true,
    liveUrl: "https://emmabsy.github.io/",
    githubUrl: "https://github.com/emmabsy",
    tag: "Frontend",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
  },
];

// First 6 shown on homepage sticky stack
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
    description: "Building dynamic front-end interfaces with React and robust back-end systems in PHP, Python, and Java. Delivering optimised, cross-platform solutions for diverse clients across Africa and beyond.",
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
  { name: "Swift",        category: "Language",       proficiency: "proficient" },
  { name: "Dart",         category: "Language",       proficiency: "proficient" },
  { name: "Java",         category: "Language",       proficiency: "proficient" },
  { name: "PHP",          category: "Language",       proficiency: "proficient" },
  { name: "C++",          category: "Language",       proficiency: "familiar"   },
  { name: "React",        category: "Framework",      proficiency: "expert"     },
  { name: "Next.js",      category: "Framework",      proficiency: "proficient" },
  { name: "Express.js",   category: "Framework",      proficiency: "expert"     },
  { name: "Django",       category: "Framework",      proficiency: "proficient" },
  { name: "Laravel",      category: "Framework",      proficiency: "proficient" },
  { name: "Flutter",      category: "Framework",      proficiency: "proficient" },
  { name: "React Native", category: "Framework",      proficiency: "proficient" },
  { name: "n8n",          category: "Tooling",        proficiency: "expert"     },
  { name: "MySQL",        category: "Database",       proficiency: "expert"     },
  { name: "PostgreSQL",   category: "Database",       proficiency: "proficient" },
  { name: "MongoDB",      category: "Database",       proficiency: "proficient" },
  { name: "TensorFlow",   category: "Tooling",        proficiency: "proficient" },
  { name: "Scikit-learn", category: "Tooling",        proficiency: "proficient" },
  { name: "Azure",        category: "Infrastructure", proficiency: "proficient" },
  { name: "Docker",       category: "Infrastructure", proficiency: "proficient" },
  { name: "Git",          category: "Tooling",        proficiency: "expert"     },
];

export const techNames = techStack.map(t => t.name);

export const terminalLines = [
  "const dev = new SoftwareEngineer('Nairobi, KE');",
  "dev.stack  = ['React', 'Python', 'n8n', 'Flutter'];",
  "dev.builds = ['AI Tools', 'SaaS', 'Automations', 'Mobile'];",
  "dev.status = 'Open to opportunities ✦';",
];
