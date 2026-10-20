"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { MoreHorizontal, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useResumeUrl } from "@/lib/useResume";

const links = [
  { href: "/", label: "Home" },
  { href: "/allProject", label: "All Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/blogs", label: "Thoughts" },
  { href: "/files/Resume-V12.pdf", label: "Resume", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const resumeUrl = useResumeUrl();

  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Build the open/close timeline once. It stays paused; opening plays it
  // forward and closing reverses it, so the exit is the entrance run backward
  // with the ease mirrored (back.out → back.in on reverse).
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      const items = panel.querySelectorAll<HTMLElement>("[data-menu-item]");

      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        panel,
        { autoAlpha: 0, y: -8, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.32,
          ease: "back.out(1.7)",
          transformOrigin: "top right",
        },
      ).fromTo(
        items,
        { autoAlpha: 0, x: 10 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.26,
          ease: "power3.out",
          stagger: 0.055,
        },
        "-=0.16", // overlap items with the tail of the panel reveal
      );

      tlRef.current = tl;
    }, panel);

    return () => ctx.revert();
  }, []);

  // Drive the timeline from React state. reverse() replays the orchestration
  // backward for a symmetrical close.
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.play();
    else tl.reverse();
  }, [open]);

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

        <div
          ref={panelRef}
          style={{ visibility: "hidden" }}
          className="invisible absolute top-[calc(100%+0.5rem)] right-0 w-52 origin-top-right overflow-hidden rounded-2xl bg-[var(--ink)] p-2 shadow-xl"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.label === "Resume" ? resumeUrl : link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              data-menu-item
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--cream)]/80 transition-colors hover:bg-white/10 hover:text-[var(--cream)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
