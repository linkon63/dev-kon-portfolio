"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MoreHorizontal, X } from "lucide-react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#thoughts", label: "Thoughts" },
  { href: "#contact", label: "Contact" },
  { href: "/files/Resume-V12.pdf", label: "Resume", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <nav className="relative flex items-center gap-2 rounded-full bg-[var(--ink)] p-1.5 pl-5 text-[var(--cream)] shadow-lg">
        <a href="#hero" className="text-base font-semibold tracking-tight">
          Md. Abdul Ahad Linkon
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-9 w-9 place-items-center rounded-full bg-[var(--cream)] text-[var(--ink)] transition-transform hover:scale-105"
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
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.18 }}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--cream)]/80 transition-colors hover:bg-white/10 hover:text-[var(--cream)]"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
