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
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.button
            key={project.id ?? project.title}
            type="button"
            onClick={() => setSelected(project)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="group block w-full text-left cursor-pointer"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--ink)]/5 ring-1 ring-black/5">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
              {project.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-[var(--ink)]/55">{project.text}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)]/70 transition-colors group-hover:text-[var(--ink)]">
              View details
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </motion.button>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
