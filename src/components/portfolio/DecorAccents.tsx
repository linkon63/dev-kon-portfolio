"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkle, Bolt, Plus, Ring, Star, Dot } from "./Shapes";

const SHAPES = [Sparkle, Bolt, Plus, Star, Ring, Dot, Sparkle, Bolt, Plus, Star];

const COLORS = [
  "#0d0d0c",
  "#7c5cff",
  "#ff5c7c",
  "#22c55e",
  "#f59e0b",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
];

type Accent = { x: number; y: number; size: number; color: string; rot: number };

// Deterministic first paint (no Math.random) so server and client HTML match.
const INITIAL: Accent[] = [
  { x: 4, y: 30, size: 80, color: "#7c5cff", rot: 12 },
  { x: 88, y: 54, size: 80, color: "#0d0d0c", rot: -8 },
  { x: 9, y: 72, size: 44, color: "#ff5c7c", rot: 0 },
  { x: 82, y: 20, size: 48, color: "#3b82f6", rot: 18 },
  { x: 47, y: 10, size: 38, color: "#22c55e", rot: 0 },
  { x: 92, y: 82, size: 34, color: "#f59e0b", rot: 0 },
  { x: 2, y: 50, size: 36, color: "#ec4899", rot: -15 },
  { x: 60, y: 88, size: 40, color: "#0d0d0c", rot: 10 },
  { x: 30, y: 84, size: 30, color: "#14b8a6", rot: 22 },
  { x: 70, y: 6, size: 32, color: "#7c5cff", rot: -12 },
];

export default function DecorAccents() {
  const [items, setItems] = useState<Accent[]>(INITIAL);

  useEffect(() => {
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const shuffle = () =>
      setItems((prev) =>
        prev.map((it) => ({
          ...it,
          x: rand(2, 90),
          y: rand(6, 86),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rot: rand(-35, 35),
        })),
      );
    // Hold the initial layout, then reposition every 2 seconds.
    const interval = setInterval(shuffle, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {items.map((it, i) => {
        const Shape = SHAPES[i % SHAPES.length];
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={false}
            animate={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              color: it.color,
              rotate: it.rot,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ width: it.size, height: it.size }}
          >
            <Shape className="h-full w-full" />
          </motion.div>
        );
      })}
    </div>
  );
}
