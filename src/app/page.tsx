import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import IdeaToLaunch from "@/components/portfolio/IdeaToLaunch";
import Services from "@/components/portfolio/Services";
import Footer from "@/components/portfolio/Footer";
import FloatingActions from "@/components/portfolio/FloatingActions";

export default function HomePage() {
  return (
    <main className="bg-[var(--cream)] text-[var(--ink)]">
      <Navbar />
      <FloatingActions />
      <Hero />
      <About />
      <IdeaToLaunch />
      <Services />
      <Footer />
    </main>
  );
}
