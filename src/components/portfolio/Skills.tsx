"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";

// Force the modal to a light palette (white bg / black text) in both themes.
const LIGHT_TOKENS = {
  "--ink": "#0d0d0c",
  "--cream": "#ffffff",
} as CSSProperties;
import { X, ExternalLink, ChevronDown } from "lucide-react";
import { mySkills, type Skill } from "@/data/skills";

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedSkills = isExpanded ? mySkills : mySkills.slice(0, 18);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-6 md:py-32">
      <h2 className="mb-14 text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter md:mb-20">
        Skills
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {displayedSkills.map((skill, i) => (
          <div key={skill.id} className="relative group">
            {/* Slogan Tooltip on Hover */}
            <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-48 -translate-x-1/2 rounded-xl bg-[var(--ink)] p-3 text-center text-[11px] font-medium leading-snug text-[var(--cream)] shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
              <p>{skill.slogan}</p>
              <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-[var(--ink)]" />
            </div>

            {/* Clickable Skill Card */}
            <motion.button
              onClick={() => setSelectedSkill(skill)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="flex w-full flex-col items-center justify-center rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)] p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer text-left"
            >
              <div className="skill-icon text-3xl mb-3 text-[var(--ink)]">
                {skill.icon}
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase text-[var(--ink)]/85 text-center">
                {skill.title}
              </span>
            </motion.button>
          </div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Show Less" : "Show All Skills"}
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--ink)]/15 text-[var(--ink)] hover:bg-[var(--ink)]/5 transition-colors cursor-pointer"
        >
          <motion.div
            animate={isExpanded ? { rotate: 180 } : { y: [0, 4, 0] }}
            transition={isExpanded ? { duration: 0.3 } : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>
      </div>

      {/* Animated Modal Dialog */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              style={LIGHT_TOKENS}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-[var(--cream)] p-8 text-[var(--ink)] shadow-2xl border border-[var(--ink)]/15"
            >
              {/* Close Icon Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)]/5 text-[var(--ink)] hover:bg-[var(--ink)]/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Content Panel */}
              <div className="flex flex-col items-center text-center">
                <div className="skill-icon text-5xl mb-4 text-[var(--ink)] p-4 bg-[var(--ink)]/5 rounded-2xl">
                  {selectedSkill.icon}
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight uppercase">
                  {selectedSkill.title}
                </h3>
                <p className="mt-2 text-xs italic font-semibold text-[var(--ink)]/60 max-w-xs">
                  “{selectedSkill.slogan}”
                </p>
                <div className="h-px w-full bg-[var(--ink)]/10 my-6" />
                <p className="text-sm leading-relaxed text-[var(--ink)]/80 text-justify sm:text-center">
                  {selectedSkill.summary}
                </p>

                {/* Navigation and Dismiss buttons */}
                <div className="mt-8 flex gap-3 justify-center">
                  <a
                    href={selectedSkill.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Documentation"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--ink)]/15 text-[var(--ink)] hover:bg-[var(--ink)]/5 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    title="Close"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--ink)]/15 text-[var(--ink)] hover:bg-[var(--ink)]/5 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
