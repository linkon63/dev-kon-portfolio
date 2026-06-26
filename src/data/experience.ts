import type { Experience } from "@/lib/types";

// Static fallback for the "Experience" timeline — shown until the live
// (database) records load, and imported by the admin "Seed" button.
// `order` is ascending: the most recent / current role comes first.
export const experiences: Experience[] = [
  {
    role: "Team Lead — Software Engineer & Lead Instructor",
    company: "Softzino Technologies",
    companyUrl: "",
    location: "Dhaka, Bangladesh",
    period: "May 2021 — Present",
    duration: "5 yrs +",
    current: true,
    order: 0,
    highlights: [
      "Lead a team of 5+ engineers with Agile/Scrum — sprint planning, estimation, and delivery management.",
      "Designed scalable multi-tenant SaaS architecture across ERP, POS, and E-commerce platforms.",
      "Manage production VPS deployments, Docker environments, and CI/CD pipelines.",
      "Introduced AI-assisted workflows (+10% productivity) and optimized queries (+40% performance).",
    ],
    stack: ["Leadership", "SaaS Architecture", "Docker", "CI/CD", "PR Reviews"],
    links: [],
  },
  {
    role: "Full-Stack Developer (Remote)",
    company: "Pacific System",
    companyUrl: "",
    location: "Tokyo, Japan",
    period: "Jan 2022 — Feb 2023",
    duration: "1 yr +",
    order: 1,
    highlights: [
      "Built backend APIs with Node.js and responsive frontends in React.js with Redux/Recoil.",
      "Deployed and maintained the system on AWS, ensuring performance and reliability.",
    ],
    stack: ["Node.js", "React.js", "Redux", "AWS"],
    links: [],
  },
  {
    role: "Associate Software Engineer",
    company: "Softzino Technologies",
    companyUrl: "",
    location: "Dhaka, Bangladesh",
    period: "May 2021 — Dec 2021",
    order: 2,
    highlights: [
      "Developed appointment scheduling software with Google Calendar API integration.",
      "Contributed to backend API design and frontend UI components.",
    ],
    stack: ["Node.js", "REST API", "Google Calendar API"],
    links: [],
  },
  {
    role: "Frontend Engineer (Remote)",
    company: "MyPathGuider",
    companyUrl: "",
    location: "New Delhi, India",
    period: "Nov 2020 — May 2021",
    order: 3,
    highlights: [
      "Built a responsive educational platform frontend using modern JavaScript frameworks.",
      "Improved UI performance and cross-device compatibility.",
    ],
    stack: ["JavaScript", "Frontend", "Responsive UI"],
    links: [],
  },
];
