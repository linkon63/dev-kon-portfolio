import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dev-kon-portfolio.web.app";

export const SITE_NAME = "Md Abdul Ahad Linkon — Portfolio";
export const FULL_NAME = "Md Abdul Ahad Linkon";
export const DEFAULT_TITLE = "Md Abdul Ahad Linkon — Senior Full-Stack Software Engineer";
export const DEFAULT_DESCRIPTION =
  "Senior Full-Stack Software Engineer from Bangladesh specializing in Next.js, React, TypeScript, and SaaS product development. Available for remote work.";
export const OG_IMAGE = "/og-image.png";

export const SEO_KEYWORDS: string[] = [
  // Identity & location
  "Md Abdul Ahad Linkon",
  "devkon developer",
  "software engineer Bangladesh",
  "software engineer Dhaka",
  "bd software engineer",
  "best software engineer Bangladesh",

  // HR job title searches
  "senior software engineer",
  "full stack developer",
  "full-stack developer Bangladesh",
  "senior full stack developer",
  "senior software engineer BD",
  "web developer Bangladesh",
  "frontend developer Bangladesh",
  "backend developer Bangladesh",
  "software developer for hire",
  "full stack engineer for hire",

  // Availability & hiring intent
  "hire software engineer Bangladesh",
  "remote software engineer Bangladesh",
  "freelance full-stack developer Dhaka",
  "open to work software engineer",
  "available for remote work developer",
  "contract developer Bangladesh",
  "offshore developer Bangladesh",

  // Tech stack (what HRs filter by)
  "Next.js developer Bangladesh",
  "React developer Bangladesh",
  "TypeScript developer",
  "Node.js developer",
  "JavaScript developer Bangladesh",
  "React Next.js TypeScript developer",

  // Product & domain
  "SaaS product developer",
  "SaaS developer Bangladesh",
  "startup developer Bangladesh",
  "product engineer Bangladesh",

  // Soft signals HRs use
  "software engineer portfolio",
  "software engineer open to work",
  "experienced web developer",
  "agile software engineer",

  // Leadership & management
  "team lead software engineer",
  "tech lead Bangladesh",
  "technical team leader Bangladesh",
  "engineering team lead",
  "software team leader",
  "team lead developer Bangladesh",
  "project manager developer Bangladesh",
  "technical project manager",
  "software project manager Bangladesh",
  "agile team lead",
  "scrum team lead",

  // Teaching & mentorship
  "programming teacher Bangladesh",
  "coding instructor Bangladesh",
  "software engineering mentor",
  "programming mentor Bangladesh",
  "web development teacher",
  "coding mentor Dhaka",
  "developer mentor",
  "teach programming Bangladesh",
];

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description:
      "Senior Full-Stack Software Engineer from Bangladesh. Building modern, scalable SaaS products with Next.js, React, and TypeScript.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Senior Full-Stack Software Engineer from Bangladesh. Building modern, scalable SaaS products.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
