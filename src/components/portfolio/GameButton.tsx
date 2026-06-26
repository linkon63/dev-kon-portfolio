"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Gamepad2 } from "lucide-react";

/**
 * Eye-catching Game/Playground CTA pinned just above the Resume button.
 * Slides in on load, gently bobs, sweeps a shimmer, and pulses an attention ring.
 */
export default function GameButton() {
  return (
    <motion.div
      initial={{ y: 64, opacity: 0 }}
      animate={{ y: [0, -3, 0], opacity: 1 }}
      transition={{
        y: { repeat: Infinity, duration: 2.6, ease: "easeInOut" },
        opacity: { duration: 0.5, delay: 0.5 },
      }}
      className="fixed bottom-[136px] right-6 z-50"
    >
      <Link href="/games" passHref legacyBehavior>
        <motion.a
          aria-label="Play Games"
          whileHover={{ scale: 1.07, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--ink)] px-4 py-2.5 text-sm font-bold text-[var(--cream)] shadow-xl ring-1 ring-[var(--cream)]/15 cursor-pointer"
        >
          {/* Pulsing attention ring */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--ink)]/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          />

          {/* Shimmer sweep */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[var(--cream)]/30 to-transparent"
            animate={{ x: ["0%", "400%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
              repeatDelay: 1.2,
            }}
          />

          {/* Animated gamepad icon */}
          <motion.span
            className="relative grid place-items-center"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          >
            <Gamepad2 size={17} className="relative" />
          </motion.span>

          <span className="relative">Playground</span>
        </motion.a>
      </Link>
    </motion.div>
  );
}
