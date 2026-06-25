// Shared content types for the dynamic (Prisma Postgres-backed) portfolio data.

export type Blog = {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  href?: string;
  active?: boolean;
  likes?: number;
  allowLikes?: boolean;
  allowComments?: boolean;
  createdAt?: number;
};

export type Comment = {
  id?: string;
  blogId: string;
  name: string;
  email: string;
  content: string;
  parentId?: string | null;
  createdAt?: number;
  replies?: Comment[];
};

export type Testimonial = {
  id?: string;
  quote: string;
  name: string;
  role: string;
  createdAt?: number;
};

export type Project = {
  id?: string;
  title: string;
  text: string;
  image: string;
  liveUrl?: string;
  clientUrl?: string;
  serverUrl?: string;
  createdAt?: number;
};

export type Service = {
  id?: string;
  title: string;
  tags: string[];
  createdAt?: number;
};

// A labelled project / external link shown on an experience entry.
export type ExperienceLink = {
  label: string;
  url: string;
};

// "About" section — a single editable record.
export type About = {
  id?: string;
  greeting: string;
  intro: string;
  bio1: string;
  bio2: string;
  image: string;
  ctaText: string;
  ctaHref: string;
  active?: boolean;
  createdAt?: number;
};

// "Experience" timeline entry.
export type Experience = {
  id?: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  duration?: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
  links?: ExperienceLink[];
  order?: number;
  active?: boolean;
  createdAt?: number;
};

// Content collection names (map to /api/content/:name) — single source of truth.
export const COLLECTIONS = {
  blogs: "blogs",
  testimonials: "testimonials",
  projects: "projects",
  services: "services",
  about: "about",
  experiences: "experiences",
} as const;
