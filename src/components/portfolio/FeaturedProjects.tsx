"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type Project } from "@/lib/types";
import { seedProjects } from "@/lib/seedData";

export default function FeaturedProjects() {
  const projects = useCollectionData<Project>(
    COLLECTIONS.projects,
    seedProjects,
  ).slice(0, 6);

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

      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {projects.map((project, i) => {
          const href =
            project.liveUrl || project.clientUrl || project.serverUrl || "#";
          return (
            <motion.a
              key={project.id ?? project.title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="group block"
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
              <h3 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 text-[var(--ink)]/55">{project.text}</p>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
