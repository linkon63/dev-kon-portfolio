"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const TEXT =
  "From idea to launch, I turn rough concepts into fast, reliable products — shaping the architecture, writing clean code, and shipping interfaces people genuinely enjoy using.";

export default function IdeaToLaunch() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    // Highlight begins as the block enters the lower viewport and finishes
    // before it leaves the upper half.
    offset: ["start 0.85", "end 0.45"],
  });

  const words = TEXT.split(" ");

  return (
    <section
      id="process"
      className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12 md:py-24"
    >
      <span className="mb-10 inline-block text-sm font-medium tracking-[0.2em] text-[var(--ink)]/50 uppercase">
        / Idea to launch
      </span>
      <div ref={container}>
        <p className="flex flex-wrap text-3xl font-bold leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative mr-[0.25em] mt-2">
      <span className="absolute opacity-15">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
