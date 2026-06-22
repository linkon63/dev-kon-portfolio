import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Read directly from the environment (falling back to an empty string) so
    // `prisma generate` during install/build never hard-fails when DATABASE_URL
    // isn't present — generate doesn't need a live connection. Migrate/runtime
    // still require the real value to be set in the environment.
    url: process.env.DATABASE_URL ?? "",
  },
});
