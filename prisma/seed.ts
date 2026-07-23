import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { projects as staticProjects } from "../src/data/projects";
import { posts as staticPosts } from "../src/data/posts";
import { services as staticServices } from "../src/data/services";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Idempotent seed: only populate a content type if it's currently empty.

  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({
      data: staticProjects
        .filter((p) => p.image)
        .map((p) => ({
          title: p.title,
          text: p.text,
          image: p.image as string,
          liveUrl: p.links.find((l) => /live/i.test(l.label))?.href,
          clientUrl: p.links.find((l) => /client|code/i.test(l.label))?.href,
          serverUrl: p.links.find((l) => /server|backend/i.test(l.label))?.href,
        })),
    });
  }

  if ((await prisma.blog.count()) === 0) {
    await prisma.blog.createMany({
      data: staticPosts.map((p) => ({
        title: p.title,
        slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        excerpt: p.excerpt,
        image: p.image,
        date: p.date,
        href: p.href,
      })),
    });
  }

  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({
      data: staticServices.map((s) => ({ title: s.title, tags: s.tags })),
    });
  }

  // Ensure the single settings row exists.
  await prisma.siteSettings.upsert({
    where: { id: "site" },
    update: {},
    create: { id: "site" },
  });

  const [projects, blogs, services] = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.service.count(),
  ]);
  console.log(
    `Seeded — projects: ${projects}, blogs: ${blogs}, services: ${services}`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
