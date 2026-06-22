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
];
