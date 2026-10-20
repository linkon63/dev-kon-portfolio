"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";
import type { Certificate, CertificateCategory } from "@/data/certificates";

const BASE = "/assets/certificates";

const FILTERS: { id: "all" | CertificateCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "certification", label: "Certifications" },
  { id: "achievement", label: "Achievements" },
];

/** Card grid + lightbox. Pass `filterable` for the All / Certifications /
 *  Achievements tabs used on the full /achievements page. */
export default function CertificateGallery({
  certificates,
  filterable = false,
  gridClassName = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  certificates: Certificate[];
  filterable?: boolean;
  gridClassName?: string;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "all"
        ? certificates
        : certificates.filter((c) => c.category === filter),
    [certificates, filter],
  );

  return (
    <>
      {filterable && (
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                filter === f.id
                  ? "bg-[var(--ink)] text-[var(--cream)]"
                  : "border border-[var(--ink)]/15 text-[var(--ink)]/65 hover:bg-[var(--ink)]/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className={`grid gap-5 ${gridClassName}`}>
        {items.map((cert, i) => (
          <motion.button
            key={cert.image}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--ink)]/10 text-left transition-colors hover:border-[var(--ink)]/30"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--ink)]/5">
              <Image
                src={`${BASE}/${cert.image}-thumb.webp`}
                alt={`${cert.title} certificate`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <Expand size={14} />
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/50">
                <span>
                  {cert.category === "achievement" ? "Achievement" : "Certificate"}
                </span>
                {cert.date && <span>· {cert.date}</span>}
              </div>
              <h3 className="text-lg font-bold leading-snug tracking-tight">
                {cert.title}
              </h3>
              <p className="text-sm text-[var(--ink)]/65">{cert.issuer}</p>
              {cert.note && (
                <p className="mt-1 text-sm font-medium text-[var(--ink)]/80">
                  {cert.note}
                </p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <CertificateViewer items={items} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}

function CertificateViewer({
  items,
  index,
  onChange,
}: {
  items: Certificate[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const cert = index === null ? null : items[index];

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  // Lock page scroll and wire keyboard navigation while the viewer is open.
  useEffect(() => {
    if (!cert) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cert, onChange, step]);

  return (
    <AnimatePresence>
      {cert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={cert.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onChange(null)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[var(--ink)]/10 bg-[var(--cream)] text-[var(--ink)] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => onChange(null)}
              title="Close"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-black/55 text-white transition-colors hover:bg-black/75"
            >
              <X size={18} />
            </button>

            <div className="relative min-h-0 flex-1 bg-[var(--ink)]/5">
              {/* eslint-disable-next-line @next/next/no-img-element -- natural size inside a flex box */}
              <img
                key={cert.image}
                src={`${BASE}/${cert.image}.webp`}
                alt={`${cert.title} certificate`}
                className="mx-auto max-h-[68vh] w-auto object-contain p-3 sm:p-5"
              />

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    title="Previous"
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    title="Next"
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/50">
                  {cert.issuer}
                  {cert.date && ` · ${cert.date}`}
                </p>
                <h3 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
                  {cert.title}
                </h3>
                {cert.note && (
                  <p className="mt-1 text-sm text-[var(--ink)]/70">{cert.note}</p>
                )}
              </div>
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-bold text-[var(--cream)] transition-opacity hover:opacity-90"
                >
                  Verify
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
