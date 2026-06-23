"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function HangingLamp() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check initial theme from document class (which is set by the head script to prevent hydration flash)
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Listen to document class mutations to stay in sync
    const observer = new MutationObserver(() => {
      const darkActive = document.documentElement.classList.contains("dark");
      setTheme(darkActive ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="fixed top-0 right-6 sm:right-16 z-50 flex flex-col items-center pointer-events-none">
      {/* Light glow behind the bulb (Only active in dark mode) */}
      {theme === "dark" && (
        <div className="absolute bottom-2 w-14 h-14 rounded-full bg-yellow-300/35 blur-md animate-pulse pointer-events-none" />
      )}

      {/* Draggable Lamp Container */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 65 }}
        dragElastic={0.15}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.y > 35) {
            toggleTheme();
          }
        }}
        className="pointer-events-auto cursor-grab active:cursor-grabbing w-10 sm:w-12 select-none"
        title="Pull to toggle light/dark mode"
      >
        <svg
          viewBox="0 0 640 1280"
          className={`w-full h-auto transition-all duration-300 ${
            theme === "dark"
              ? "text-yellow-300 drop-shadow-[0_12px_24px_rgba(253,224,71,0.7)]"
              : "text-[var(--ink)]"
          }`}
        >
          <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
            <path d="M3265 12643 c12 -266 10 -1883 -3 -2328 -12 -417 -18 -666 -47 -1825
-8 -333 -20 -783 -25 -1000 -6 -217 -15 -568 -20 -780 -5 -212 -14 -563 -20
-780 -12 -472 -26 -1045 -40 -1645 -6 -242 -15 -611 -20 -820 -5 -209 -10
-415 -10 -458 0 -77 0 -78 -29 -90 -17 -7 -44 -31 -61 -52 -17 -22 -46 -47
-63 -55 -18 -9 -39 -30 -48 -50 -9 -19 -26 -43 -37 -53 -16 -14 -19 -27 -15
-53 3 -20 1 -40 -6 -48 -10 -11 -9 -21 3 -44 13 -26 13 -30 -2 -45 -15 -16
-15 -19 0 -45 15 -24 15 -30 1 -56 -9 -18 -13 -42 -10 -62 3 -20 -3 -62 -14
-101 -11 -38 -24 -122 -29 -188 -16 -212 -43 -286 -240 -655 -144 -269 -187
-422 -177 -635 6 -130 23 -198 75 -301 104 -204 347 -395 582 -455 85 -22 286
-17 384 10 167 45 331 148 437 274 106 126 163 266 178 441 5 56 16 118 25
138 16 37 9 88 -12 88 -4 0 -14 24 -21 52 -27 109 -85 239 -191 428 -127 228
-170 328 -204 483 -14 62 -35 140 -46 172 -11 33 -23 85 -25 115 -3 30 -11 73
-19 95 -18 48 -20 89 -6 116 8 14 7 25 -5 42 -13 20 -13 25 0 44 11 16 12 28
4 50 -7 21 -6 38 1 58 9 23 7 32 -9 49 -10 12 -26 37 -34 56 -19 48 -65 100
-87 100 -11 0 -36 20 -57 45 -25 30 -45 45 -61 45 l-24 0 6 157 c4 87 18 550
31 1028 14 479 29 1021 35 1205 5 184 14 495 20 690 6 195 15 506 20 690 24
791 51 1866 65 2530 14 705 40 3379 33 3473 l-3 49 -90 29 c-49 16 -92 29 -93
29 -2 0 -1 -71 3 -157z" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
