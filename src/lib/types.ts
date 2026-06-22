// Shared content types for the dynamic (Firestore-backed) portfolio data.

export type Blog = {
  id?: string;
  title: string;
  excerpt: string;
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

// Firestore collection names — single source of truth.
export const COLLECTIONS = {
  blogs: "blogs",
  testimonials: "testimonials",
  projects: "projects",
  services: "services",
  analytics: "analytics_events",
} as const;
