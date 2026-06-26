"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type About as AboutType } from "@/lib/types";
import { about as aboutFallback } from "@/data/about";

export default function About() {
  const rows = useCollectionData<AboutType>(COLLECTIONS.about, [aboutFallback]);
  const about = rows[0] ?? aboutFallback;

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-6 md:py-32"
    >
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
        {/* Left column: greeting + intro */}
        <div className="flex h-full flex-col justify-between gap-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter">
            {about.greeting}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="inline-block"
            >
              !
            </motion.span>
          </h2>
          <p className="max-w-xs text-lg font-semibold leading-snug tracking-tight md:text-xl">
            {about.intro}
          </p>
        </div>

        {/* Center: portrait */}
        <div className="relative mx-auto h-72 w-64 overflow-hidden rounded-3xl shadow-2xl md:h-[28rem] md:w-96">
          {about.image && (
            <Image
              src={about.image}
              alt="Md Abdul Ahad Linkon"
              fill
              sizes="(max-width: 768px) 16rem, 24rem"
              className="object-cover grayscale contrast-110"
            />
          )}
        </div>

        {/* Right column: bio + CTA */}
        <div className="flex h-full flex-col justify-center gap-6 md:self-end md:pb-2">
          {about.bio1 && (
            <p className="text-base leading-relaxed text-[var(--ink)]/85 md:text-lg">
              {about.bio1}
            </p>
          )}
          {about.bio2 && (
            <p className="text-base leading-relaxed text-[var(--ink)]/85 md:text-lg">
              {about.bio2}
            </p>
          )}
          <a
            href={about.ctaHref || "#contact"}
            className="inline-flex w-fit items-center gap-3 bg-[var(--ink)] text-[var(--cream)] px-6 py-3 rounded-full text-base font-bold shadow-lg hover:opacity-90 transition-all duration-300"
          >
            {about.ctaText || "Get in touch"}
            <motion.span
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="grid h-7 w-7 place-items-center rounded-full bg-[var(--cream)] text-[var(--ink)] font-bold shrink-0"
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
}
