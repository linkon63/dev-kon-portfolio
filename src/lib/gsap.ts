"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type RefObject } from "react";

// Register plugins once, on the client only. Safe to import from anywhere;
// the guard prevents double-registration during Fast Refresh / re-renders.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Scope GSAP animations to a container ref and clean them up automatically.
 *
 * The callback receives the container element and runs inside a `gsap.context`,
 * so every tween/ScrollTrigger created within it is reverted on unmount — no
 * leaked triggers across route changes or Fast Refresh.
 *
 * @example
 * const ref = useGsap<HTMLDivElement>((el) => {
 *   gsap.to(el.querySelector(".box"), { x: 100, scrollTrigger: { trigger: el } });
 * });
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (container: T) => void,
  deps: React.DependencyList = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => setup(el), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
