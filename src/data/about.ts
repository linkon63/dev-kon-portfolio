import type { About } from "@/lib/types";

// Static fallback for the "About" section — shown until the live (database)
// record loads, and imported by the admin "Seed" button.
export const about: About = {
  greeting: "Hey",
  intro:
    "I'm Linkon, a Senior Full-Stack Engineer & SaaS Architect based in Dhaka, leading teams and building high-performance systems.",
  bio1: "With over 5 years of experience, I architect scalable SaaS, ERP, and multi-tenant ecommerce platforms. I have a proven track record of leading engineering teams, optimizing database queries by 40%, and establishing clean architectures.",
  bio2: "I specialize in React, Next.js, Node.js, and cloud/VPS deployments, with extensive experience collaborating remotely across Japan, Ireland, and India.",
  image: "/assets/profileimage.jpg",
  ctaText: "Get in touch",
  ctaHref: "#contact",
};
