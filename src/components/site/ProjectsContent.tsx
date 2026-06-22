import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/data/projects";

export default function ProjectsContent() {
  return (
    <div className="dk-scroll flex h-[600px] w-full flex-wrap content-start">
      <div className="w-full px-3">
        <Link
          href="/allProject"
          className="block w-full rounded-md bg-[#6c757d] py-1.5 text-center text-white hover:bg-[#5c636a]"
        >
          See more
        </Link>
      </div>
      {featuredProjects.map((project) => (
        <div key={project.title} className="w-full md:w-1/2">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
