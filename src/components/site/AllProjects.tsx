import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const exploreLinks = [
  { href: "/", label: "/ skills ▚" },
  { href: "/about", label: "/ know about me ☀" },
  { href: "/projects", label: "/ Interesting projects I have worked ⛈ " },
  { href: "/resume", label: "/ resume ▋" },
  { href: "/blogs", label: "/ watch blogs \u{1F5A5}" },
  { href: "/contact", label: "/ do you have ideas? ✉ " },
];

export default function AllProjects() {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="h-screen w-full bg-[#212529] md:w-1/4">
          <div className="flex h-full items-center pl-12">
            <div className="text-white">
              <p>Explore me </p>
              {exploreLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-white">
                  <h4>{link.label}</h4>
                </Link>
              ))}
              <div>
                <p>Find me here &#128640;</p>
                <button
                  type="button"
                  className="bg-white px-6 py-1.5 font-bold text-black"
                >
                  Resume &#128376;
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dk-scroll h-[800px] w-full bg-[#6c757d] md:w-3/4">
          <div className="flex flex-wrap">
            {projects.map((project) => (
              <div key={project.title} className="w-full md:w-1/2">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
