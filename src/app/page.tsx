import Tracker from "@/components/portfolio/Tracker";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import IdeaToLaunch from "@/components/portfolio/IdeaToLaunch";
import Services from "@/components/portfolio/Services";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import Testimonials from "@/components/portfolio/Testimonials";
import Thoughts from "@/components/portfolio/Thoughts";
import LetsTalk from "@/components/portfolio/LetsTalk";
import Footer from "@/components/portfolio/Footer";
import FloatingActions from "@/components/portfolio/FloatingActions";
import InPageNav from "@/components/portfolio/InPageNav";

export default function HomePage() {
  return (
    <main className="bg-[var(--cream)] text-[var(--ink)]">
      <Tracker />
      <Navbar />
      <FloatingActions />
      <InPageNav />
      <Hero />
      <About />
      <Skills />
      <IdeaToLaunch />
      <Services />
      <FeaturedProjects />
      <Testimonials />
      <Thoughts />
      <LetsTalk />
      <Footer />
    </main>
  );
}
