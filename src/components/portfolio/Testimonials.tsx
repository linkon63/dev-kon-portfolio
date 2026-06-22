"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
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
    <figure className="flex h-full min-h-[18rem] w-[300px] flex-col justify-between rounded-3xl bg-[var(--ink)] p-7 text-[var(--cream)] sm:w-[360px]">
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

  // Loop mode needs enough slides to fill more than one viewport. Repeat the
  // list so the continuous slider loops smoothly even with only a few entries.
  const repeats = testimonials.length
    ? Math.max(2, Math.ceil(10 / testimonials.length))
    : 0;
  const slides = Array.from({ length: repeats }, () => testimonials).flat();

  return (
    <section id="testimonials" className="py-24 md:py-32">
      <h2 className="mx-auto mb-14 max-w-6xl px-6 text-6xl font-extrabold tracking-tighter md:mb-20 md:text-8xl">
        Testimonials
      </h2>

      {/* Continuous left-to-right Swiper slider (pauses on hover) */}
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--cream)] to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--cream)] to-transparent md:w-32" />
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={24}
          loop
          freeMode={{ enabled: true, momentum: false }}
          speed={6000}
          allowTouchMove
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          className="testimonials-swiper !px-6"
        >
          {slides.map((t, i) => (
            <SwiperSlide key={`${t.id ?? t.name}-${i}`} className="!h-auto !w-auto">
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
