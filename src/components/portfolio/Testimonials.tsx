"use client";

import { motion } from "motion/react";
import { testimonials } from "@/data/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="mb-14 text-6xl font-extrabold tracking-tighter md:mb-20 md:text-8xl">
        Testimonials
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex min-h-[20rem] flex-col justify-between rounded-3xl bg-[var(--ink)] p-7 text-[var(--cream)]"
          >
            <blockquote className="text-[15px] leading-relaxed text-[var(--cream)]/90">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--cream)] text-sm font-semibold text-[var(--ink)]">
                {initials(t.name)}
              </span>
              <span>
                <span className="block text-sm font-medium">{t.name}</span>
                <span className="block text-sm text-[var(--cream)]/55">
                  {t.role}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
