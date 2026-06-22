import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` so it can be deployed to
  // Firebase Hosting (mirrors the original Create React App `build/` flow).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
