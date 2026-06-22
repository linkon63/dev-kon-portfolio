import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="mx-auto my-12 flex max-w-[30em] flex-row border-0 bg-[#212529] shadow-[0_7px_7px_rgba(0,0,0,0.18)]">
      {project.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.title}
          className="m-auto max-w-[25%] rounded-[0.7em] p-[0.5em]"
        />
      )}
      <div className="flex flex-1 justify-between p-4">
        <div className="max-w-[60%]">
          <h5 className="font-bold text-white">{project.title}</h5>
          <p className="text-white">{project.text}</p>
        </div>
        <div className="flex max-w-[40%] flex-col items-end justify-between">
          {project.links.map((link, i) => (
            <Button
              key={`${link.label}-${i}`}
              asChild
              className="m-1 h-auto rounded-md bg-[#f8f9fa] px-2 py-1 text-black hover:bg-[#e2e6ea]"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
