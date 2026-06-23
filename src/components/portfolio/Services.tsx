"use client";

import { motion } from "motion/react";
import { services as fallbackServices } from "@/data/services";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type Service } from "@/lib/types";

export default function Services() {
  const services = useCollectionData<Service>(
    COLLECTIONS.services,
    fallbackServices,
  );
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-6 md:py-32">
      <h2 className="mb-8 text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter md:mb-20">
        Services
      </h2>

      <div className="border-t border-[var(--ink)]/15">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group flex flex-col gap-3 border-b border-[var(--ink)]/15 py-7 md:flex-row md:items-center md:justify-between md:py-9"
          >
            <h3 className="text-2xl font-bold tracking-tight transition-transform duration-300 md:text-4xl md:group-hover:translate-x-2">
              {service.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--ink)]/55 md:text-base">
              {service.tags.map((tag, t) => (
                <span key={tag} className="flex items-center gap-3">
                  {t > 0 && <span className="text-[var(--ink)]/30">•</span>}
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
