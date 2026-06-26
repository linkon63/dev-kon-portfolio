"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/lib/types";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Disable page scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
              onClick={onClose}
              className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"
              title="Close"
            >
              <X size={18} />
            </button>

            <div className="overflow-y-auto w-full">
              {/* Project Image */}
              {project.image && (
                <div className="relative w-full h-60 sm:h-80 bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Project Details */}
              <div className="p-6 sm:p-8 flex flex-col gap-5">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {project.title}
                </h3>

                <div className="text-sm sm:text-base leading-relaxed text-[var(--ink)]/80 font-medium">
                  <p className="whitespace-pre-line">{project.text}</p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:opacity-90 transition-all duration-300"
                    >
                      Live Website
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.clientUrl && (
                    <a
                      href={project.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[var(--ink)]/20 hover:border-[var(--ink)] text-[var(--ink)] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-50 transition-all duration-300"
                    >
                      Client Repository
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.serverUrl && (
                    <a
                      href={project.serverUrl}
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
  );
}
