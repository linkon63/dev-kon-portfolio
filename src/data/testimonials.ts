export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Linkon led our frontend rebuild end to end. He took ownership, mentored the team, and shipped on time — the codebase is cleaner than ever.",
    name: "Takeshi N.",
    role: "Project Manager",
  },
  {
    quote:
      "We brought Linkon in for two Japanese client projects. His backend work on Node and AWS was rock solid, and communication was excellent throughout.",
    name: "Sadia R.",
    role: "Delivery Lead, Softzino",
  },
  {
    quote:
      "He turned a vague idea into a working product fast. Strong full-stack instincts — React on the front, well-structured APIs behind it.",
    name: "Marcus L.",
    role: "Startup Founder",
  },
  {
    quote:
      "The quality is excellent. Clean architecture, smooth interactions, and genuinely easy to extend. Exactly what you want from a senior engineer.",
    name: "Omar H.",
    role: "Tech Lead",
  },
];
