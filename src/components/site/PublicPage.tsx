import type { ReactNode } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";

/** Shared chrome for public sub-pages (blogs, all projects): the floating
 *  navbar + footer over the editorial cream/ink background. */
export default function PublicPage({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
