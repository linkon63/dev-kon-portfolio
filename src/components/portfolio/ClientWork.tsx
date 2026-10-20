"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { clients, type Client } from "@/data/clients";

const LOGO = (slug: string) => `/assets/clients/logos/${slug}.webp`;
const SCREEN = (slug: string) => `/assets/clients/screens/${slug}.webp`;

const projectClients = clients.filter((c) => c.project);

/** Home-page section: count + logo wall. Each logo opens the client's details. */
export function ClientShowcase() {
  const [selected, setSelected] = useState<Client | null>(null);

  return (
    <section id="clients" className="mx-auto max-w-6xl px-6 py-16 md:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ink)]/45">
            /Client Work
          </p>
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-7xl">
            Trusted by {clients.length} brands
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--ink)]/70 md:text-lg">
            SaaS products, company websites and online stores I&apos;ve built and
            shipped for businesses across HR, automotive, real estate, travel,
            manufacturing and retail. Tap a logo for details.
          </p>
        </div>

        <Link
          href="/allProject#client-work"
          className="group inline-flex items-center gap-3 text-base font-medium"
        >
          View Client Projects
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--ink)]/30 transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)]">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {clients.map((client, i) => (
          <motion.button
            key={client.slug}
            type="button"
            onClick={() => setSelected(client)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
            title={client.name}
            className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl bg-white px-4 pb-4 pt-6 ring-1 ring-black/5 transition-shadow hover:shadow-lg hover:ring-black/10"
          >
            <div className="relative h-12 w-full md:h-14">
              <Image
                src={LOGO(client.slug)}
                alt={`${client.name} logo`}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
              {client.name}
            </span>
          </motion.button>
        ))}
      </div>

      <ClientModal client={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/** Detailed cards for every client with a `project`, used on /allProject. */
export function ClientProjectsGrid() {
  const [selected, setSelected] = useState<Client | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projectClients.map((client, i) => (
          <motion.button
            key={client.slug}
            type="button"
            onClick={() => setSelected(client)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white text-left ring-1 ring-black/5 transition-shadow hover:shadow-lg hover:ring-black/10"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
              <Image
                src={SCREEN(client.slug)}
                alt={`${client.name} website`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-xl bg-white p-1.5 shadow-md ring-1 ring-black/5">
                <span className="relative h-full w-full">
                  <Image
                    src={LOGO(client.slug)}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-contain"
                  />
                </span>
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5 text-neutral-900">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                <span>{client.industry}</span>
                {client.badge && (
                  <span className="rounded-full bg-neutral-900/5 px-2 py-0.5 normal-case tracking-normal">
                    {client.badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold tracking-tight">{client.name}</h3>
              <p className="line-clamp-2 text-sm text-neutral-600">
                {client.project!.summary}
              </p>
              {client.project!.stack.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {client.project!.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <ClientModal client={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function ClientModal({
  client,
  onClose,
}: {
  client: Client | null;
  onClose: () => void;
}) {
  // Lock page scroll and close on Escape while open.
  useEffect(() => {
    if (!client) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [client, onClose]);

  const project = client?.project;

  return (
    <AnimatePresence>
      {client && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={client.name}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[var(--ink)]/10 bg-[var(--cream)] text-[var(--ink)] shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              title="Close"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X size={18} />
            </button>

            <div className="w-full overflow-y-auto">
              {project ? (
                <div className="relative h-56 w-full bg-neutral-100 sm:h-80">
                  <Image
                    src={SCREEN(client.slug)}
                    alt={`${client.name} website`}
                    fill
                    sizes="(min-width: 672px) 672px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="grid h-44 w-full place-items-center bg-white sm:h-52">
                  <div className="relative h-20 w-2/3 sm:h-24">
                    <Image
                      src={LOGO(client.slug)}
                      alt={`${client.name} logo`}
                      fill
                      sizes="400px"
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  {project && (
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white p-2 ring-1 ring-black/5">
                      <span className="relative h-full w-full">
                        <Image
                          src={LOGO(client.slug)}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      </span>
                    </span>
                  )}
                  <div>
                    <p className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]/50">
                      {client.industry}
                      {client.badge && (
                        <span className="rounded-full bg-[var(--ink)]/8 px-2 py-0.5 normal-case tracking-normal">
                          {client.badge}
                        </span>
                      )}
                    </p>
                    <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {client.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-medium leading-relaxed text-[var(--ink)]/80 sm:text-base">
                  {project?.description ?? client.tagline}
                </p>

                {project?.role && (
                  <p className="text-sm text-[var(--ink)]/70">
                    <span className="font-semibold text-[var(--ink)]">
                      My role:
                    </span>{" "}
                    {project.role}
                  </p>
                )}

                {project && (
                  <ul className="space-y-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--ink)]/80"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[var(--ink)]/50"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {project && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--ink)]/15 px-3 py-1 text-xs font-medium text-[var(--ink)]/65"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-1">
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-bold text-[var(--cream)] shadow-md transition-opacity hover:opacity-90"
                  >
                    Visit Website
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
