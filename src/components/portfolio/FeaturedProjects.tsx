"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type Project } from "@/lib/types";
import { seedProjects } from "@/lib/seedData";
import ProjectModal from "./ProjectModal";

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = useCollectionData<Project>(
    COLLECTIONS.projects,
    seedProjects,
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Keep the arrow buttons in sync with how far the track is scrolled.
  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, projects.length]);

  // Slide by roughly one card (first child width + gap) per click.
  const slide = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 24;
    const step = first ? first.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <section id="work" className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto mb-10 flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 md:mb-14">
        <h2 className="whitespace-nowrap text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-7xl">
          Featured Projects
        </h2>

        <div className="flex items-center gap-6">
          {/* Slider controls */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => slide("prev")}
              disabled={!canPrev}
              aria-label="Previous projects"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--ink)]/25 transition-colors enabled:hover:bg-[var(--ink)] enabled:hover:text-[var(--cream)] disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => slide("next")}
              disabled={!canNext}
              aria-label="Next projects"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--ink)]/25 transition-colors enabled:hover:bg-[var(--ink)] enabled:hover:text-[var(--cream)] disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <Link
            href="/allProject"
            className="group inline-flex items-center gap-3 text-base font-medium"
          >
            View All Work
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--ink)]/30 transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)]">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>
      </div>

      {/* Horizontal slider — swipe on touch, arrows on desktop */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:gap-8 md:px-[max(1.5rem,calc((100vw-72rem)/2))]"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project) => (
          <button
            key={project.id ?? project.title}
            type="button"
            onClick={() => setSelectedProject(project)}
            className="group relative block aspect-[3/4] w-[78vw] shrink-0 snap-center cursor-pointer overflow-hidden rounded-3xl text-left sm:w-[46vw] md:w-[30vw] lg:w-[24vw]"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 768px) 46vw, 24vw"
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.04]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--cream)]">
              <h3 className="text-2xl font-bold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-[var(--cream)]/75">
                {project.text}
              </p>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
