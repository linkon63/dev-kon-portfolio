"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-6 md:py-32"
    >
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
        {/* Left column: greeting + intro */}
        <div className="flex h-full flex-col justify-between gap-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter">
            Hey
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="inline-block"
            >
              !
            </motion.span>
          </h2>
          <p className="max-w-xs text-lg font-semibold leading-snug tracking-tight md:text-xl">
            I&apos;m Linkon, a Senior Full-Stack Engineer &amp; SaaS Architect based in Dhaka, leading teams and building high-performance systems.
          </p>
        </div>

        {/* Center: portrait */}
        <div className="relative mx-auto h-72 w-64 overflow-hidden rounded-3xl shadow-2xl md:h-[28rem] md:w-96">
          <Image
            src="/assets/profileimage.jpg"
            alt="Md Abdul Ahad Linkon"
            fill
            sizes="(max-width: 768px) 16rem, 24rem"
            className="object-cover grayscale contrast-110"
          />
        </div>

        {/* Right column: bio + CTA */}
        <div className="flex h-full flex-col justify-center gap-6 md:self-end md:pb-2">
          <p className="text-base leading-relaxed text-[var(--ink)]/85 md:text-lg">
            With over 5 years of experience, I architect scalable SaaS, ERP, and multi-tenant ecommerce platforms. I have a proven track record of leading engineering teams, optimizing database queries by 40%, and establishing clean architectures.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink)]/85 md:text-lg">
            I specialize in React, Next.js, Node.js, and cloud/VPS deployments, with extensive experience collaborating remotely across Japan, Ireland, and India.
          </p>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-3 bg-[var(--ink)] text-[var(--cream)] px-6 py-3 rounded-full text-base font-bold shadow-lg hover:opacity-90 transition-all duration-300"
          >
            Get in touch
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
