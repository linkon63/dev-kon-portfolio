"use client";

import { useState } from "react";
import { motion } from "motion/react";
import DecorAccents from "./DecorAccents";

// Software-engineering experience clock — counted from joining Softzino (Jun 2021).
const START = { year: 2021, month: 5 }; // month is 0-indexed (5 = June)

function computeExperience() {
  const now = new Date();
  let months =
    (now.getFullYear() - START.year) * 12 + (now.getMonth() - START.month);
  if (months < 0) months = 0;
  return { years: Math.floor(months / 12), months: months % 12 };
}

function HeadlineWord({ text }: { text: string }) {
  return (
    <span className="block text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8.5vw]">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [exp] = useState(computeExperience);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-6 md:pt-28 md:pb-16"
    >
      {/* Animated, colour-shifting decorative accents */}
      <DecorAccents />

      {/* Display headline — hover any letter to lift it */}
      <h1 className="relative z-10 text-center font-extrabold leading-[0.84] tracking-tighter text-[var(--ink)]">
        <HeadlineWord text="SOFTWARE" />
        <HeadlineWord text="ENGINEER" />
      </h1>

      {/* Footer meta line */}
      <div className="pointer-events-none absolute inset-x-6 bottom-8 z-10 flex items-end justify-between">
        <span className="text-3xl font-bold tracking-tight md:text-4xl">
          ©2026
        </span>
        <span className="text-right text-xs font-medium tracking-wide text-[var(--ink)]/70 md:text-sm">
          / ENGINEERING SINCE JUN 2021 · {exp.years}Y {exp.months}M EXPERIENCE
        </span>
      </div>
    </section>
  );
}
