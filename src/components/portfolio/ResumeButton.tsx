"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useResumeUrl } from "@/lib/useResume";

/** A résumé sheet whose text lines "write" themselves on a loop. */
function AnimatedResumeIcon() {
  const line = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0.35 },
    animate: { pathLength: [0, 1, 1, 0], opacity: [0.35, 1, 1, 0.35] },
    transition: {
      duration: 2.6,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  });

  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative"
      aria-hidden="true"
    >
      {/* Sheet + folded corner */}
      <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V8z" />
      <path d="M14 3v4a1 1 0 0 0 1 1h3.5" />
      {/* Text lines that "write" themselves */}
      <motion.line x1="8.5" y1="12" x2="15.5" y2="12" {...line(0)} />
      <motion.line x1="8.5" y1="15" x2="15.5" y2="15" {...line(0.35)} />
      <motion.line x1="8.5" y1="18" x2="13" y2="18" {...line(0.7)} />
    </svg>
  );
}

/**
 * Eye-catching resume CTA pinned to the bottom-right corner, just above the
 * scroll-to-top button. Slides in on load, gently bobs, sweeps a shimmer, and
 * pulses an attention ring to invite clicks.
 */
export default function ResumeButton() {
  const resumeUrl = useResumeUrl();

  return (
    <motion.a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="See Resume"
      initial={{ y: 64, opacity: 0 }}
      animate={{ y: [0, -3, 0], opacity: 1 }}
      transition={{
        y: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
        opacity: { duration: 0.5, delay: 0.4 },
      }}
      whileHover={{ scale: 1.07, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-20 right-6 z-50 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--ink)] px-4 py-2.5 text-sm font-bold text-[var(--cream)] shadow-xl ring-1 ring-[var(--cream)]/15"
    >
      {/* Pulsing attention ring */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--ink)]/40"
        animate={{ scale: [1, 1.3, 1], opacity: [0.55, 0, 0.55] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      />

      {/* Shimmer sweep */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[var(--cream)]/30 to-transparent"
        animate={{ x: ["0%", "400%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "easeInOut",
          repeatDelay: 1.4,
        }}
      />

      {/* Animated résumé icon */}
      <motion.span
        className="relative grid place-items-center"
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <AnimatedResumeIcon />
      </motion.span>

      <span className="relative">Resume</span>

      {/* <Sparkles size={13} className="relative animate-pulse text-yellow-300" /> */}
    </motion.a>
  );
}
