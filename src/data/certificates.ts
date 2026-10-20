// Certificates & extracurricular activities. The full list renders on
// /achievements; entries marked `featured` also show on the home page.
// Images live in /public/assets/certificates — `<image>.webp` is the
// full-size view, `<image>-thumb.webp` the grid card.
// Certifications come first, then achievements; newest first within each.

export type CertificateCategory = "achievement" | "certification";

export type Certificate = {
  title: string;
  issuer: string;
  date?: string;
  category: CertificateCategory;
  /** Short line shown under the title, e.g. the result or the role. */
  note?: string;
  /** Basename inside /public/assets/certificates (without extension). */
  image: string;
  verifyUrl?: string;
  /** Shown in the short highlight on the home page. */
  featured?: boolean;
};

export const certificates: Certificate[] = [
  // Certifications & training
  {
    title: "Data Science Math Skills",
    issuer: "Duke University · Coursera",
    date: "Dec 2024",
    category: "certification",
    image: "coursera-duke-data-science-math",
    featured: true,
    verifyUrl: "https://coursera.org/verify/UWL2DN8IXVZM",
  },
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    date: "Aug 2023",
    category: "certification",
    image: "hackerrank-sql-intermediate",
    verifyUrl: "https://www.hackerrank.com/certificates/7954ec279867",
  },
  {
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    date: "Aug 2023",
    category: "certification",
    image: "hackerrank-javascript-intermediate",
    featured: true,
    verifyUrl: "https://www.hackerrank.com/certificates/9d39ce98c5d4",
  },
  {
    title: "Front-End Development Libraries",
    issuer: "freeCodeCamp",
    date: "Aug 2023",
    category: "certification",
    note: "~300 hours",
    image: "freecodecamp-front-end-libraries",
    verifyUrl:
      "https://freecodecamp.org/certification/linkon63/front-end-development-libraries",
  },
  {
    title: "Back End Development and APIs",
    issuer: "freeCodeCamp",
    date: "Mar 2022",
    category: "certification",
    note: "~300 hours",
    image: "freecodecamp-back-end-apis",
    verifyUrl:
      "https://freecodecamp.org/certification/linkon63/back-end-development-and-apis",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Oct 2021",
    category: "certification",
    note: "~300 hours",
    image: "freecodecamp-javascript-algorithms",
    verifyUrl:
      "https://freecodecamp.org/certification/linkon63/javascript-algorithms-and-data-structures",
  },
  {
    title: "Complete Web Development",
    issuer: "Programming Hero",
    date: "2021",
    category: "certification",
    note: "Completion with Excellence — top 5% of Batch 3",
    image: "programming-hero-web-development",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Dec 2020",
    category: "certification",
    note: "~300 hours",
    image: "freecodecamp-responsive-web-design",
    verifyUrl:
      "https://freecodecamp.org/certification/linkon63/responsive-web-design",
  },
  {
    title: "Industrial Training — Programming C and C++",
    issuer: "Logic Engineering & Automation",
    date: "Oct 2020",
    category: "certification",
    note: "12-week industrial training course",
    image: "logic-engineering-industrial-training",
  },
  {
    title: "Productivity Management in Light Engineering Sector",
    issuer: "LEPBPC × NASCIB",
    date: "Jan 2017",
    category: "certification",
    note: "5-day training course",
    image: "bpc-productivity-training",
  },

  // Achievements & extracurricular
  {
    title: "Dhaka Divisional Hackathon 2024",
    issuer: "National Innovation Competition — Technocrats V.2, IUBAT",
    date: "Dec 2024",
    category: "achievement",
    note: "Participant",
    image: "technocrats-hackathon-2024",
    featured: true,
  },
  {
    title: "Hult Prize at IUBAT",
    issuer: "Hult Prize Foundation",
    category: "achievement",
    note: "1st Runner Up Team",
    image: "hult-prize-iubat",
    featured: true,
  },
  {
    title: "Black Belt Web Developer",
    issuer: "Programming Hero",
    date: "2021",
    category: "achievement",
    note: "Graduate — hired by MyPathGuider (India) as React Developer",
    image: "programming-hero-black-belt",
  },
  {
    title: "Hack-A-Jam 2021 — Campus Ambassador",
    issuer: "Brain Station 23 × IUT Computer Society",
    date: "2021",
    category: "achievement",
    note: "Campus Ambassador for IUBAT",
    image: "hack-a-jam-campus-ambassador",
  },
  {
    title: "Institute Level Skills Competition 2018",
    issuer: "Habiganj Polytechnic Institute — STEP, Ministry of Education",
    date: "Nov 2018",
    category: "achievement",
    note: "Participant",
    image: "skills-competition-2018",
  },
];
