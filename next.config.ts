import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server-rendered Next.js app (App Router + API routes backed by Prisma
  // Postgres). Deploy to a Node-capable host (Vercel/Render/VPS).
  images: {
    unoptimized: true,
  },
  // Prisma Client is server-only; keep it external to the server bundle.
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "sharp"],
  // Pin the workspace root to this project (a stray lockfile lives higher up).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
