export type Service = {
  title: string;
  tags: string[];
};

/**
 * Services framed around Linkon's real resume experience: full-stack delivery
 * at Softzino (Node/React/Vue/AWS), frontend work, backend/APIs (Express,
 * Laravel), cloud/DevOps (AWS, Docker) and database design (Mongo, MySQL, DynamoDB).
 */
export const services: Service[] = [
  {
    title: "Full-Stack Development",
    tags: ["React", "Node.js", "TypeScript"],
  },
  {
    title: "Frontend Engineering",
    tags: ["UI Dev", "Responsive Layouts", "Web Performance"],
  },
  {
    title: "Backend & APIs",
    tags: ["Express", "Laravel", "REST APIs"],
  },
  {
    title: "Cloud & DevOps",
    tags: ["AWS", "Docker", "CI / CD"],
  },
  {
    title: "Database Design",
    tags: ["MongoDB", "MySQL", "DynamoDB"],
  },
];
