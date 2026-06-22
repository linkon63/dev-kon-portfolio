import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-24 md:py-32"
    >
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
        {/* Left column: greeting + intro */}
        <div className="flex h-full flex-col justify-between gap-10">
          <h2 className="text-6xl font-extrabold tracking-tighter md:text-7xl">
            Hey!
          </h2>
          <p className="max-w-xs text-lg font-semibold leading-snug tracking-tight md:text-xl">
            I&apos;m Linkon, a software engineer based in Dhaka, currently
            building scalable products at Templyo &amp; Softzino Technologies.
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
            I&apos;m a software engineer with a strong focus on building modern,
            scalable, and conversion-driven web experiences across the full
            stack.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink)]/85 md:text-lg">
            Over the years I&apos;ve shipped multiple production products —
            including work for global and Japanese clients — leading teams and
            owning delivery end to end.
          </p>
          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-3 text-base font-medium"
          >
            Get in touch
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--ink)]/30 transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)]">
              <ArrowUpRight size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
