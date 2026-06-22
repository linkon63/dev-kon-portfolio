// Static fallback content + seed data for Firestore. The public site shows
// these when a collection is empty/offline; the admin "Seed" button imports
// them into Firestore.

import type { Blog, Testimonial, Project, Service } from "./types";
import { projects as staticProjects } from "@/data/projects";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import { services as staticServices } from "@/data/services";
import { posts as staticPosts } from "@/data/posts";

export const seedProjects: Project[] = staticProjects
  .filter((p) => p.image)
  .map((p) => ({
    title: p.title,
    text: p.text,
    image: p.image as string,
    liveUrl: p.links.find((l) => /live/i.test(l.label))?.href,
    clientUrl: p.links.find((l) => /client|code/i.test(l.label))?.href,
    serverUrl: p.links.find((l) => /server|backend/i.test(l.label))?.href,
  }));

export const seedTestimonials: Testimonial[] = staticTestimonials.map((t) => ({
  quote: t.quote,
  name: t.name,
  role: t.role,
}));

export const seedServices: Service[] = staticServices.map((s) => ({
  title: s.title,
  tags: s.tags,
}));

export const seedBlogs: Blog[] = staticPosts.map((p) => ({
  title: p.title,
  excerpt: p.excerpt,
  image: p.image,
  date: p.date,
  href: p.href,
}));
