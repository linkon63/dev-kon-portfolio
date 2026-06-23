export type Post = {
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export const posts: Post[] = [
  {
    date: "May 5, 2025",
    title: "Scaling a MERN App Without the Pain",
    excerpt:
      "Practical patterns for keeping a React + Node + MongoDB stack fast and maintainable as it grows.",
    image: "/assets/ema-jhon.png",
    href: "/blogs",
  },
  {
    date: "Jun 16, 2025",
    title: "Shipping Reliable APIs on AWS",
    excerpt:
      "How I structure backend services and deployments to stay reliable under real production load.",
    image: "/assets/Ride.png",
    href: "/blogs",
  },
  {
    date: "Jul 22, 2025",
    title: "Clean Architecture in Modern Node.js",
    excerpt:
      "A deep dive into repository patterns, domain-driven design, and decoupling your business logic.",
    image: "/assets/profileimage.jpg",
    href: "/blogs",
  },
  {
    date: "Aug 10, 2025",
    title: "Next.js Performance Optimization Secrets",
    excerpt:
      "Master static generation, streaming, dynamic caching, and component-level splitting for sub-second loads.",
    image: "/assets/ema-jhon.png",
    href: "/blogs",
  },
];
