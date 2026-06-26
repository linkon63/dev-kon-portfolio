"use client";

import { useState } from "react";
import PublicPage from "@/components/site/PublicPage";
import Breadcrumb from "@/components/site/Breadcrumb";
import BugSmasher from "./components/BugSmasher";
import RefactorRush from "./components/RefactorRush";
import { Gamepad2, Code } from "lucide-react";

export default function GamesClient() {
  const [activeTab, setActiveTab] = useState<"smasher" | "rush">("smasher");

  return (
    <PublicPage>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-40 md:pb-32">
        <Breadcrumb items={[{ label: "Playground" }]} />

        <header className="mb-12 md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-widest text-[var(--ink)]/40 uppercase">
            AI-Powered Live Coding Sandbox
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter">
            Playground
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--ink)]/55 leading-relaxed">
            A demonstration of interactive mini-games developed with AI assistance. 
            Play these developer-centric challenges to test your speed, debugging reflexes, 
            and compiler logic, reflecting core skills in full-stack architecture.
          </p>
        </header>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-[var(--ink)]/10 mb-10 w-max gap-4">
          <button
            onClick={() => setActiveTab("smasher")}
            className={`flex items-center gap-2 pb-3.5 px-2 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
              activeTab === "smasher"
                ? "border-[var(--ink)] text-[var(--ink)] font-black"
                : "border-transparent text-[var(--ink)]/40 hover:text-[var(--ink)]"
            }`}
          >
            <Gamepad2 size={16} />
            Bug Smasher
          </button>
          <button
            onClick={() => setActiveTab("rush")}
            className={`flex items-center gap-2 pb-3.5 px-2 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
              activeTab === "rush"
                ? "border-[var(--ink)] text-[var(--ink)] font-black"
                : "border-transparent text-[var(--ink)]/40 hover:text-[var(--ink)]"
            }`}
          >
            <Code size={16} />
            Refactor Rush
          </button>
        </div>

        {/* Dynamic Games Mounting */}
        <div className="w-full">
          {activeTab === "smasher" ? <BugSmasher /> : <RefactorRush />}
        </div>
      </section>
    </PublicPage>
  );
}
