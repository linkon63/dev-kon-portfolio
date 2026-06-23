const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dev-kon-portfolio.web.app";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md Abdul Ahad Linkon",
  alternateName: "Linkon",
  jobTitle: [
    "Senior Full-Stack Software Engineer",
    "Tech Lead",
    "Team Lead",
    "Programming Instructor",
    "Technical Project Manager",
  ],
  url: SITE_URL,
  email: "m.alinkon10@gmail.com",
  image: `${SITE_URL}/og-image.png`,
  description:
    "Senior Full-Stack Software Engineer from Bangladesh specializing in Next.js, React, TypeScript, and SaaS product development. Open to remote opportunities.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: [
    "https://www.linkedin.com/in/md-abdul-ahad-linkon/",
    "https://github.com/linkon63",
    "https://www.youtube.com/@devkon63",
    "https://www.kaggle.com/mdabdulahadlinkon",
    "https://gitlab.com/linkon063",
    "https://ieeexplore.ieee.org/abstract/document/11429201",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "SaaS Development",
    "Full-Stack Development",
    "Firebase",
    "PostgreSQL",
    "Software Architecture",
    "REST API Design",
    "Team Leadership",
    "Technical Project Management",
    "Agile Methodology",
    "Scrum",
    "Programming Education",
    "Developer Mentorship",
    "Code Review",
    "Sprint Planning",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "International University of Business Agriculture and Technology (IUBAT)",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
  },
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
