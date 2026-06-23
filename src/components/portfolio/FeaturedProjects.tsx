"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type Project } from "@/lib/types";
import { seedProjects } from "@/lib/seedData";

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = useCollectionData<Project>(
    COLLECTIONS.projects,
    seedProjects,
  ).slice(0, 6);

  // Disable page scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

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
                  unoptimized
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

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-[var(--cream)] text-[var(--ink)] overflow-hidden rounded-3xl shadow-2xl border border-[var(--ink)]/10 z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto w-full">
                {/* Project Image */}
                {selectedProject.image && (
                  <div className="relative w-full h-60 sm:h-80 bg-neutral-100">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Project Details */}
                <div className="p-6 sm:p-8 flex flex-col gap-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="text-sm sm:text-base leading-relaxed text-[var(--ink)]/80 font-medium">
                    <p className="whitespace-pre-line">{selectedProject.text}</p>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:opacity-90 transition-all duration-300"
                      >
                        Live Website
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                    {selectedProject.clientUrl && (
                      <a
                        href={selectedProject.clientUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[var(--ink)]/20 hover:border-[var(--ink)] text-[var(--ink)] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-50 transition-all duration-300"
                      >
                        Client Repository
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                    {selectedProject.serverUrl && (
                      <a
                        href={selectedProject.serverUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[var(--ink)]/20 hover:border-[var(--ink)] text-[var(--ink)] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-50 transition-all duration-300"
                      >
                        Server Repository
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
