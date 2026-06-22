export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  text: string;
  image?: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    title: "Smart Device Repair",
    text: "Full Stack Smart device repair center",
    image: "/assets/appledoctor.png",
    links: [
      { label: "Live", href: "https://appledoctorclient.netlify.app/" },
      { label: "Client", href: "https://github.com/linkon63/Apple-Doctor-Client" },
      { label: "Server", href: "https://github.com/linkon63/Apple-Doctor-Server" },
    ],
  },
  {
    title: "Doctor-Appointment",
    text: "Full Stack doctor appointment project",
    image: "/assets/doctor-appointment.png",
    links: [
      { label: "Live", href: "https://doctor-portal-login.web.app/" },
      { label: "Client", href: "https://github.com/linkon63/Doctor-Portal-Client" },
      { label: "Server", href: "https://github.com/linkon63/Doctor-Portal-Server" },
    ],
  },
  {
    title: "Mange your task",
    text: "VUE project task manager, state manage by pania js",
    image: "/assets/project-pania.png",
    links: [
      { label: "Live", href: "https://vue-2-pania-state.netlify.app/" },
      { label: "Client", href: "https://github.com/linkon63/Vue-2-Pania-State" },
    ],
  },
  {
    title: "Get your food",
    text: "React native android project like as foodpanda",
    links: [{ label: "Code", href: "https://github.com/linkon63/getYourFood" }],
  },
  {
    title: "ema-john",
    text: "Full Stack e-Commerce project",
    image: "/assets/ema-jhon.png",
    links: [
      { label: "Live", href: "https://m-fourty-one-ema-jhon-react.web.app/" },
      { label: "Client", href: "https://github.com/linkon63/M-48-Ema-Jhon-Auth-Cilent-Site" },
      { label: "Server", href: "https://github.com/linkon63/M-48-Ema-John-Server" },
    ],
  },
  {
    title: "Ride share",
    text: "Full Stack book your ride",
    image: "/assets/Ride.png",
    links: [
      { label: "Live", href: "https://assignment-nine-f6279.web.app/home" },
      { label: "Client", href: "https://github.com/linkon63/assignment-nine" },
      { label: "Server", href: "https://github.com/linkon63/assignment-nine" },
    ],
  },
  {
    title: "Vue Blog",
    text: "Blog route project by vue",
    image: "/assets/blog.png",
    links: [
      { label: "Live", href: "https://vue-1-blog-page.netlify.app/#/" },
      { label: "Client", href: "https://github.com/linkon63/Vue-1-Blog-Page" },
    ],
  },
  {
    title: "Rent a car",
    text: "Car rent in react and sql project",
    links: [
      { label: "Backend", href: "https://github.com/linkon63/pp-1.1-rent-a-service-server" },
      { label: "Client", href: "https://github.com/linkon63/pp1.1-rent-a-service-client" },
    ],
  },
];

/** The Projects page shows the first six entries; All Projects shows them all. */
export const featuredProjects = projects.slice(0, 6);
