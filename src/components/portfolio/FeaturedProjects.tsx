"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type Project } from "@/lib/types";
import { seedProjects } from "@/lib/seedData";
import ProjectModal from "./ProjectModal";

const INITIAL_COUNT = 3;

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const allProjects = useCollectionData<Project>(
    COLLECTIONS.projects,
    seedProjects,
  );
  const projects = isExpanded ? allProjects : allProjects.slice(0, INITIAL_COUNT);

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-6 md:py-32">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-6 md:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter whitespace-nowrap">
          Featured Projects
        </h2>
        <Link
          href="/allProject"
          className="group mt-4 inline-flex items-center gap-3 text-base font-medium"
        >
          View All Work
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--ink)]/30 transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)]">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project, i) => {
          return (
            <motion.button
              key={project.id ?? project.title}
              type="button"
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group block relative aspect-[3/4] w-full text-left overflow-hidden rounded-3xl cursor-pointer"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--cream)]">
                <h3 className="text-2xl font-bold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--cream)]/75 line-clamp-2">
                  {project.text}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Load more / less */}
      {allProjects.length > INITIAL_COUNT && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            title={isExpanded ? "Show Less" : "Load More Projects"}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--ink)]/15 text-[var(--ink)] hover:bg-[var(--ink)]/5 transition-colors cursor-pointer"
          >
            <motion.div
              animate={isExpanded ? { rotate: 180 } : { y: [0, 4, 0] }}
              transition={
                isExpanded
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              }
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)]/45">
            {isExpanded
              ? "Show less"
              : `${allProjects.length - INITIAL_COUNT} more project${
                  allProjects.length - INITIAL_COUNT > 1 ? "s" : ""
                }`}
          </span>
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
