// Shared content types for the dynamic (Prisma Postgres-backed) portfolio data.

export type Blog = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  href?: string;
  createdAt?: number;
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

// Content collection names (map to /api/content/:name) — single source of truth.
export const COLLECTIONS = {
  blogs: "blogs",
  testimonials: "testimonials",
  projects: "projects",
  services: "services",
} as const;
