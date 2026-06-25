"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type Experience as Job } from "@/lib/types";
import { experiences as experiencesFallback } from "@/data/experience";

export default function Experience() {
  const rows = useCollectionData<Job>(
    COLLECTIONS.experiences,
    experiencesFallback,
  );

  // Display order: `order` ascending (most recent role first); newest-created
  // wins ties so freshly added rows surface predictably.
  const journey = useMemo(
    () =>
      [...rows].sort(
        (a, b) =>
          (a.order ?? 0) - (b.order ?? 0) ||
          (b.createdAt ?? 0) - (a.createdAt ?? 0),
      ),
    [rows],
  );

  // Progressive reveal: current role only -> +2 more -> all.
  const steps = useMemo(
    () =>
      Array.from(
        new Set([1, 3, journey.length].filter((n) => n <= journey.length)),
      ),
    [journey.length],
  );

  const [stepIndex, setStepIndex] = useState(0);

  const safeStep = Math.min(stepIndex, steps.length - 1);
  const visibleCount = steps[safeStep] ?? journey.length;
  const displayedJobs = journey.slice(0, visibleCount);
  const isFullyExpanded = safeStep >= steps.length - 1;
  const hiddenCount = journey.length - visibleCount;

  const handleToggle = () => {
    setStepIndex((prev) => (prev >= steps.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-6 md:py-32">
      {/* Heading */}
      <div className="mb-12 md:mb-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ink)]/45">
          /My Journey
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter">
          Experience
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--ink)]/70 md:text-lg">
          Five years of building, leading, and shipping — from frontend
          beginnings to architecting multi-tenant SaaS and leading engineering
          teams across Bangladesh, Japan, and India.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-[var(--ink)]/15 pl-8 md:pl-12">
        {displayedJobs.map((job, i) => (
          <motion.div
            key={job.id ?? `${job.company}-${job.period}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative pb-14 last:pb-0"
          >
            {/* Node */}
            <span
              className={`absolute -left-[2.55rem] top-1.5 grid h-4 w-4 place-items-center rounded-full md:-left-[3.55rem] ${
                job.current
                  ? "bg-[var(--ink)]"
                  : "border-2 border-[var(--ink)]/30 bg-[var(--cream)]"
              }`}
            >
              {job.current && (
                <motion.span
                  animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute h-4 w-4 rounded-full bg-[var(--ink)]"
                />
              )}
            </span>

            {/* Period + status */}
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)]/55">
                {job.period}
              </span>
              {job.duration && (
                <span className="rounded-full bg-[var(--ink)]/8 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--ink)]/65">
                  {job.duration}
                </span>
              )}
              {job.current && (
                <span className="flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--cream)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Current
                </span>
              )}
            </div>

            {/* Role */}
            <h3 className="text-xl font-bold tracking-tight md:text-3xl">
              {job.role}
            </h3>
            <p className="mt-1 text-sm font-medium text-[var(--ink)]/70 md:text-base">
              {job.companyUrl ? (
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[var(--ink)]/30 underline-offset-2 hover:decoration-[var(--ink)]"
                >
                  {job.company}
                </a>
              ) : (
                job.company
              )}{" "}
              · {job.location}
            </p>

            {/* Highlights */}
            <ul className="mt-5 space-y-2.5">
              {job.highlights.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--ink)]/80 md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink)]/40" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Project links */}
            {job.links && job.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {job.links.map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)]/8 px-3 py-1 text-xs font-semibold text-[var(--ink)]/75 transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
                  >
                    {link.label}
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            )}

            {/* Stack */}
            <div className="mt-5 flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--ink)]/15 px-3 py-1 text-xs font-medium text-[var(--ink)]/65"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* See more / less */}
      {steps.length > 1 && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            title={isFullyExpanded ? "Show Less" : "Show More Experience"}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--ink)]/15 text-[var(--ink)] hover:bg-[var(--ink)]/5 transition-colors cursor-pointer"
          >
            <motion.div
              animate={
                isFullyExpanded ? { rotate: 180 } : { y: [0, 4, 0] }
              }
              transition={
                isFullyExpanded
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              }
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)]/45">
            {isFullyExpanded
              ? "Show less"
              : `${hiddenCount} more role${hiddenCount > 1 ? "s" : ""}`}
          </span>
        </div>
      )}
    </section>
  );
}
