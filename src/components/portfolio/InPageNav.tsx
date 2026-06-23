"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function InPageNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveSection(visibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.05,
    });

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        observer.observe(el);
      }
    });

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-20 left-1/2 z-40 -translate-x-1/2 flex items-center gap-5 sm:gap-6 text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase select-none pointer-events-auto">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => handleScrollTo(sec.id)}
            className={`cursor-pointer transition-all duration-300 ${
              isActive
                ? "text-[var(--ink)] font-bold opacity-100 underline underline-offset-4 decoration-1"
                : "text-[var(--ink)]/45 hover:text-[var(--ink)]/80"
            }`}
          >
            {sec.label}
          </button>
        );
      })}
    </div>
  );
}
