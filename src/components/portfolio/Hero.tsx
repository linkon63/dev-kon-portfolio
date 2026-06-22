"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Sparkle, Bolt } from "./Shapes";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  // Raw pointer target -> smoothed spring so the portrait trails the cursor.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 130, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 130, damping: 18, mass: 0.6 });

  // Park the portrait at the hero's natural resting spot when idle.
  const restPosition = () => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(r.left + r.width / 2);
    y.set(r.top + r.height * 0.66);
  };

  useEffect(() => {
    restPosition();
    window.addEventListener("resize", restPosition);
    return () => window.removeEventListener("resize", restPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={(e) => {
        setActive(true);
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseLeave={() => {
        setActive(false);
        restPosition();
      }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 md:cursor-none"
    >
      {/* Decorative accents */}
      <Sparkle className="absolute top-[30%] left-[6%] h-12 w-12 rotate-12 md:top-[34%] md:left-[14%] md:h-20 md:w-20" />
      <Bolt className="absolute top-[52%] right-[6%] h-12 w-12 -rotate-6 md:top-[56%] md:right-[12%] md:h-20 md:w-20" />

      {/* Display headline */}
      <h1 className="text-center font-extrabold leading-[0.84] tracking-tighter text-[var(--ink)]">
        <span className="block text-[18vw] md:text-[15vw] lg:text-[13.5vw]">
          SOFTWARE
        </span>
        <span className="block text-[18vw] md:text-[15vw] lg:text-[13.5vw]">
          ENGINEER
        </span>
      </h1>

      {/* Cursor portrait — follows the mouse across the hero */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-30"
        aria-hidden="true"
      >
        <motion.div
          animate={{ scale: active ? 0.92 : 1, rotate: active ? -3 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="h-40 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 md:h-52 md:w-40"
        >
          <Image
            src="/assets/profileimage.jpg"
            alt="Md Abdul Ahad Linkon"
            fill
            priority
            sizes="(max-width: 768px) 8rem, 10rem"
            className="object-cover grayscale contrast-110"
          />
        </motion.div>
      </motion.div>

      {/* Footer meta line */}
      <div className="pointer-events-none absolute inset-x-6 bottom-8 flex items-end justify-between">
        <span className="text-3xl font-bold tracking-tight md:text-4xl">
          ©2026
        </span>
        <span className="text-xs font-medium tracking-wide text-[var(--ink)]/70 md:text-sm">
          / ENGINEERING SINCE 2021
        </span>
      </div>
    </section>
  );
}
