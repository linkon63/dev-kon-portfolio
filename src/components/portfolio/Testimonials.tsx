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
    <figure className="flex h-full min-h-[18rem] w-[300px] flex-col justify-between rounded-3xl bg-[var(--ink)]/5 p-7 text-[var(--ink)] sm:w-[360px] border border-[var(--ink)]/5">
      <blockquote className="text-[15px] leading-relaxed text-[var(--ink)]/85 font-medium">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-sm font-semibold text-[var(--cream)]">
          {initials(t.name)}
        </span>
        <span>
          <span className="block text-sm font-medium text-[var(--ink)]">{t.name}</span>
          <span className="block text-sm text-[var(--ink)]/60">{t.role}</span>
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
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-12 md:py-32">
      <h2 className="mb-8 text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter md:mb-20">
        Testimonials
      </h2>

      {testimonials.length > 0 ? (
        <div className="w-full overflow-hidden">
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
            className="testimonials-swiper"
          >
            {slides.map((t, i) => (
              <SwiperSlide key={`${t.id ?? t.name}-${i}`} className="!h-auto !w-auto">
                <TestimonialCard t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-sm text-[var(--ink)]/55">No testimonials available yet.</p>
      )}
    </section>
  );
}
