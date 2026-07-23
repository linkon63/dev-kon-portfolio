// Static fallback content + seed data. The public site shows these when a
// collection is empty/offline; the admin "Seed" button imports them into the
// database via the content API.

import type { Blog, Project, Service, About, Experience } from "./types";
import { projects as staticProjects } from "@/data/projects";
import { services as staticServices } from "@/data/services";
import { posts as staticPosts } from "@/data/posts";
import { about as staticAbout } from "@/data/about";
import { experiences as staticExperiences } from "@/data/experience";

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

export const seedServices: Service[] = staticServices.map((s) => ({
  title: s.title,
  tags: s.tags,
}));

export const seedAbout: About = { ...staticAbout };

export const seedExperiences: Experience[] = staticExperiences.map((e) => ({
  ...e,
}));

export const seedBlogs: Blog[] = staticPosts.map((p) => ({
  title: p.title,
  slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  excerpt: p.excerpt,
  image: p.image,
  date: p.date,
  href: p.href,
}));
