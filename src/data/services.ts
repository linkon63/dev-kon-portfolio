export type Service = {
  title: string;
  tags: string[];
};

/**
 * Services framed directly around Linkon's real resume experience and core skill categories:
 * SaaS and system architecture, frontend frameworks, backend microservices, DevOps,
 * database / search optimization, and agile team leadership.
 */
export const services: Service[] = [
  {
    title: "SaaS & System Architecture",
    tags: ["Multi-Tenant SaaS", "Clean Architecture", "System Design", "Repository Pattern"],
  },
  {
    title: "Frontend Engineering",
    tags: ["React.js", "Next.js", "Vue.js / Nuxt.js", "TailwindCSS"],
  },
  {
    title: "Backend & Microservices",
    tags: ["Node.js / NestJS", "Express.js", "Laravel", "REST API / GraphQL"],
  },
  {
    title: "DevOps & Cloud Orchestration",
    tags: ["Docker", "AWS / VPS", "CI / CD", "Vercel / Firebase"],
  },
  {
    title: "Database & Search Systems",
    tags: ["PostgreSQL / MySQL", "MongoDB / Redis", "Prisma ORM", "Typesense"],
  },
  {
    title: "Technical Leadership & Agile",
    tags: ["Sprint Planning", "PR Reviews", "Technical Mentorship", "AI-Assisted Workflows"],
  },
];
