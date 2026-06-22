import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [projects, blogs, services, testimonials] = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
  ]);
  const firstProject = await prisma.project.findFirst({
    orderBy: { createdAt: "desc" },
  });
  console.log(
    `✅ Connected — projects: ${projects}, blogs: ${blogs}, services: ${services}, testimonials: ${testimonials}.`,
  );
  if (firstProject) {
    console.log(`   e.g. project "${firstProject.title}".`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Verification failed:");
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
