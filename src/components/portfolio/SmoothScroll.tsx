"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery top-to-bottom smooth scrolling via Lenis, plus smooth anchor
 * navigation: any in-page `#hash` link is intercepted and eased to its target.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      // Gentle ease-out for a slow, glide-to-rest feel.
      easing: (t) => 1 - Math.pow(1 - t, 4),
      lerp: 0.06,
      wheelMultiplier: 0.85,
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: 0 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
