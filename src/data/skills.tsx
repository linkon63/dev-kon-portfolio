import type { ReactNode } from "react";
import {
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaSass,
  FaBootstrap,
  FaJira,
  FaTrello,
  FaGithub,
  FaAngular,
} from "react-icons/fa";
import {
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiVuedotjs,
  SiTailwindcss,
  SiReact,
  SiCplusplus,
  SiNetlify,
  SiMysql,
  SiPostman,
  SiFirebase,
  SiLaravel,
  SiPhp,
  SiMongodb,
  SiRedux,
  SiSlack,
} from "react-icons/si";

export type Skill = {
  id: number;
  title: string;
  icon: ReactNode;
};

export const mySkills: Skill[] = [
  { id: 1, title: "html", icon: <FaHtml5 /> },
  { id: 2, title: "css", icon: <FaCss3Alt /> },
  { id: 3, title: "node js", icon: <FaNodeJs /> },
  { id: 4, title: "typescript", icon: <SiTypescript /> },
  { id: 5, title: "mongodb", icon: <SiMongodb /> },
  { id: 6, title: "express", icon: <SiExpress /> },
  { id: 7, title: "redux", icon: <SiRedux /> },
  { id: 8, title: "tailwind", icon: <SiTailwindcss /> },
  { id: 9, title: "react", icon: <SiReact /> },
  { id: 10, title: "vue", icon: <SiVuedotjs /> },
  { id: 11, title: "javascript", icon: <SiJavascript /> },
  { id: 12, title: "php", icon: <SiPhp /> },
  { id: 13, title: "laravel", icon: <SiLaravel /> },
  { id: 14, title: "aws", icon: <FaAws /> },
  { id: 15, title: "c ++", icon: <SiCplusplus /> },
  { id: 16, title: "git", icon: <FaGithub /> },
  { id: 17, title: "sass", icon: <FaSass /> },
  { id: 18, title: "angular", icon: <FaAngular /> },
  { id: 19, title: "mysql", icon: <SiMysql /> },
  { id: 20, title: "slack", icon: <SiSlack /> },
  { id: 21, title: "postman", icon: <SiPostman /> },
  { id: 22, title: "firebase", icon: <SiFirebase /> },
  { id: 23, title: "docker", icon: <FaDocker /> },
  { id: 24, title: "jira", icon: <FaJira /> },
  { id: 25, title: "netlify", icon: <SiNetlify /> },
  { id: 26, title: "bootstrap", icon: <FaBootstrap /> },
  { id: 27, title: "trello", icon: <FaTrello /> },
];
