"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import ProjectModal from "./ProjectModal";

export default function AllProjectsGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      {/* Compact, dense grid so every project is visible at a glance. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {projects.map((project, i) => (
          <motion.button
            key={project.id ?? project.title}
            type="button"
            onClick={() => setSelected(project)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4) }}
            className="group flex flex-col overflow-hidden rounded-xl bg-white text-left ring-1 ring-black/5 transition-shadow hover:shadow-lg hover:ring-black/10 cursor-pointer"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--ink)]/5">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              )}
              <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[var(--ink)] opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
                <ArrowUpRight size={15} />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h2 className="text-sm font-bold leading-snug tracking-tight sm:text-base line-clamp-1">
                {project.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-xs text-[var(--ink)]/55">
                {project.text}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
