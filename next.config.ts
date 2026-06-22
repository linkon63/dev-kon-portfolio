import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` so it can be deployed to
  // Firebase Hosting (mirrors the original Create React App `build/` flow).
  output: "export",
  images: {
    unoptimized: true,
  },
  // Pin the workspace root to this project (a stray lockfile lives higher up).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
