"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MoreHorizontal, X } from "lucide-react";
import { useResumeUrl } from "@/lib/useResume";

const links = [
  { href: "/", label: "Home" },
  { href: "/allProject", label: "All Projects" },
  { href: "/blogs", label: "Thoughts" },
  { href: "/games", label: "Playground" },
  { href: "/files/Resume-V12.pdf", label: "Resume", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const resumeUrl = useResumeUrl();

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <nav className="relative flex items-center justify-between gap-2 rounded-full bg-[var(--ink)] p-1.5 pl-4 pr-1.5 text-[var(--cream)] shadow-lg w-max max-w-[calc(100vw-2rem)]">
        <Link href="/" className="text-sm sm:text-base font-semibold tracking-tight whitespace-nowrap pl-1 sm:pl-2">
          <span className="hidden sm:inline">Md. Abdul Ahad Linkon</span>
          <span className="sm:hidden inline">Ahad Linkon</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-9 w-9 place-items-center rounded-full bg-[var(--cream)] text-[var(--ink)] transition-transform hover:scale-105 shrink-0"
        >
          {open ? <X size={18} /> : <MoreHorizontal size={18} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+0.5rem)] right-0 w-52 origin-top-right overflow-hidden rounded-2xl bg-[var(--ink)] p-2 shadow-xl"
            >
              {links.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.label === "Resume" ? resumeUrl : link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--cream)]/80 transition-colors hover:bg-white/10 hover:text-[var(--cream)]"
                >
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.18 }}
                    className="block"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
