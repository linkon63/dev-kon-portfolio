"use client";

import { testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type Testimonial } from "@/lib/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex flex-col justify-between rounded-3xl bg-[var(--ink)] p-7 text-[var(--cream)] h-full">
      <blockquote className="text-[15px] leading-relaxed text-[var(--cream)]/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--cream)] text-sm font-semibold text-[var(--ink)]">
          {initials(t.name)}
        </span>
        <span>
          <span className="block text-sm font-medium">{t.name}</span>
          <span className="block text-sm text-[var(--cream)]/55">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const testimonials = useCollectionData<Testimonial>(
    COLLECTIONS.testimonials,
    fallbackTestimonials,
  );

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-6 md:py-32">
      <h2 className="mb-8 text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter md:mb-20">
        Testimonials
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div key={`${t.id ?? t.name}-${i}`}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <p className="text-sm text-[var(--ink)]/55">No testimonials available yet.</p>
      )}
    </section>
  );
}
