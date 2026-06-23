// Static fallback content + seed data. The public site shows these when a
// collection is empty/offline; the admin "Seed" button imports them into the
// database via the content API.

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

export const officialTestimonials: Omit<Testimonial, "id">[] = [
  {
    quote: "Linkon led our frontend rebuild end to end. He single-handedly designed the scalable multi-tenant architecture and optimized queries, improving our system load times by 40%.",
    name: "Takeshi Nakagawa",
    role: "Project Manager at Pacific System",
  },
  {
    quote: "Linkon is an exceptional full-stack developer. He designed scalable SaaS architectures and led our team of 5+ engineers using Agile methodologies.",
    name: "Sadia Rahman",
    role: "Delivery Lead, Softzino Technologies",
  },
  {
    quote: "He turned complex requirements into production-ready code. His expertise in Node.js, Next.js, and AWS deployments was crucial for our platform launch.",
    name: "Marcus Leong",
    role: "Co-Founder, EcomX",
  },
  {
    quote: "The codebase quality is outstanding. Clean architectures, repository/service patterns, and robust Docker configurations. Linkon is a stellar tech lead.",
    name: "Omar Halim",
    role: "Engineering Director",
  },
  {
    quote: "Linkon was key to our remote collaboration success. His ability to lead sprint planning and perform thorough PR reviews elevated the entire team's productivity.",
    name: "Rajesh Kumar",
    role: "Tech Lead, MyPathGuider",
  },
  {
    quote: "Exceptional instructor and technical mentor. He led training at Softzino Academy, guiding dozens of developers in modern React and backend technologies.",
    name: "Tanveer Ahmed",
    role: "CEO, Softzino Academy",
  },
];

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
