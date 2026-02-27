import type { SiteConfig, Project, Experience, TechItem } from "@/types";

// ─── SITE CONFIG ──────────────────────────────────────────────────────────────
export const siteConfig: SiteConfig = {
  name: "Emma Maikuri",
  tagline: "I build things for the web — and beyond.",
  description:
    "Full-stack software developer based in Nairobi, Kenya. I craft dynamic interfaces, robust back-end systems, and AI-powered applications across web and mobile.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emmabsy.github.io",
  email: "maikuriemma@gmail.com",
  location: "Nairobi, Kenya",
  availability: "Open to opportunities",
  socials: {
    github: "https://github.com/emmabsy",
    linkedin: "https://linkedin.com/in/emmamaikuri",
  },
  stats: [
    { value: "9+", label: "Years" },
    { value: "20+", label: "Projects" },
    { value: "2", label: "Certs" },
  ],
};

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "tendza-ai",
    title: "Tendza AI",
    description: "An AI-powered web application built and deployed on Vercel",
    longDescription:
      "Tendza AI is a modern AI-powered application built with Next.js and deployed on Vercel. It leverages machine learning capabilities to deliver intelligent, real-time features for end users.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    hasLiveDemo: true,
    liveUrl: "https://tendza-ai.vercel.app/",
    githubUrl: "https://github.com/emmabsy",
    tag: "ML",
    featured: true,
    techStack: ["Next.js", "React", "TypeScript", "Vercel AI SDK", "TailwindCSS"],
  },
  {
    id: "plumbee-db",
    title: "Plumbee Farmer DB",
    description:
      "Farmer database management system for Plumbee Wholefoods — boosting operational productivity",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    forks: 0,
    hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "Systems",
    techStack: ["JavaScript", "Express.js", "MySQL", "Node.js"],
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "React-based portfolio site showcasing projects and skills — live on GitHub Pages",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    forks: 0,
    hasLiveDemo: true,
    liveUrl: "https://emmabsy.github.io/",
    githubUrl: "https://github.com/emmabsy",
    tag: "Frontend",
    techStack: ["React", "JavaScript", "CSS", "GitHub Pages"],
  },
  {
    id: "ml-models",
    title: "ML Experiments",
    description:
      "Collection of machine learning models and experiments using Python, TensorFlow, and Scikit-learn",
    language: "Python",
    languageColor: "#3572a5",
    stars: 0,
    forks: 0,
    hasLiveDemo: false,
    githubUrl: "https://github.com/emmabsy",
    tag: "ML",
    techStack: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy"],
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
export const experience: Experience[] = [
  {
    id: "plumbee",
    year: "2023 →",
    role: "Co-founder & Software Developer",
    company: "Plumbee Wholefoods",
    description:
      "Designed and built an efficient farmer database management system using JavaScript, Express.js, and MySQL. Delivered innovative solutions under tight deadlines with rigorous QA testing.",
    highlights: [
      "Full-stack DB system",
      "JavaScript + Express.js",
      "MySQL backend",
      "QA & stability testing",
    ],
    current: true,
  },
  {
    id: "freelance",
    year: "2016 →",
    role: "Freelance Software Developer",
    company: "Independent",
    description:
      "Building dynamic front-end interfaces with React and robust back-end systems in PHP, Python, and Java. Continuously delivering optimised, cross-platform solutions for diverse clients.",
    highlights: [
      "React front-ends",
      "PHP / Python / Java APIs",
      "Performance optimisation",
      "Agile delivery",
    ],
    current: true,
  },
  {
    id: "equatorial",
    year: "2015 – 2016",
    role: "Operations Assistant",
    company: "Equatorial Bank of Kenya",
    description:
      "Conducted thorough accounts vetting to ensure full KYC compliance. Assisted in developing streamlined processes that enhanced efficiency in accounts vetting procedures.",
  },
  {
    id: "cba",
    year: "2014",
    role: "Bancassurance Assistant",
    company: "Commercial Bank of Africa",
    description:
      "Managed a portfolio of insurance policies — inputting, processing, and executing timely renewals using advanced software systems in full compliance with company and industry standards.",
  },
];

// ─── TECH STACK ───────────────────────────────────────────────────────────────
export const techStack: TechItem[] = [
  { name: "JavaScript", category: "Language", proficiency: "expert" },
  { name: "TypeScript", category: "Language", proficiency: "proficient" },
  { name: "Python", category: "Language", proficiency: "expert" },
  { name: "Java", category: "Language", proficiency: "proficient" },
  { name: "PHP", category: "Language", proficiency: "proficient" },
  { name: "C++", category: "Language", proficiency: "familiar" },
  { name: "React", category: "Framework", proficiency: "expert" },
  { name: "Next.js", category: "Framework", proficiency: "proficient" },
  { name: "Express.js", category: "Framework", proficiency: "expert" },
  { name: "Django", category: "Framework", proficiency: "proficient" },
  { name: "Laravel", category: "Framework", proficiency: "proficient" },
  { name: "Flutter", category: "Framework", proficiency: "proficient" },
  { name: "React Native", category: "Framework", proficiency: "proficient" },
  { name: "MySQL", category: "Database", proficiency: "expert" },
  { name: "PostgreSQL", category: "Database", proficiency: "proficient" },
  { name: "MongoDB", category: "Database", proficiency: "proficient" },
  { name: "TensorFlow", category: "Tooling", proficiency: "proficient" },
  { name: "Scikit-learn", category: "Tooling", proficiency: "proficient" },
  { name: "Pandas", category: "Tooling", proficiency: "proficient" },
  { name: "Azure", category: "Infrastructure", proficiency: "proficient" },
  { name: "Git", category: "Tooling", proficiency: "expert" },
  { name: "Kotlin", category: "Language", proficiency: "familiar" },
];

// Flat array for the marquee
export const techNames = techStack.map((t) => t.name);

// ─── TERMINAL LINES ───────────────────────────────────────────────────────────
// These are rendered character-by-character in the hero terminal
export const terminalLines = [
  "const dev = new SoftwareEngineer('Nairobi, KE');",
  "dev.stack  = ['React', 'Python', 'Express.js', 'Flutter'];",
  "dev.builds = ['Web Apps', 'AI Tools', 'Games', 'Mobile'];",
  "dev.status = 'Open to opportunities ✦';",
];