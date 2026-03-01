export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  hasLiveDemo: boolean;
  liveUrl?: string;
  githubUrl: string;
  tag: ProjectTag;
  featured?: boolean;
  techStack?: string[];
}

export type ProjectTag = "AI" | "ML" | "Web" | "Frontend" | "Game" | "Mobile" | "Systems" | "OSS" | "DevOps" | "Tools";

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  highlights?: string[];
  current?: boolean;
}

export interface TechItem {
  name: string;
  category: TechCategory;
  proficiency: "expert" | "proficient" | "familiar";
}

export type TechCategory = "Language" | "Framework" | "Database" | "Infrastructure" | "Tooling" | "Design";

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  location: string;
  availability: string;
  socials: { github?: string; twitter?: string; linkedin?: string; dribbble?: string };
  stats: Array<{ value: string; label: string }>;
}
