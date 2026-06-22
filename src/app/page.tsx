import SmoothScroll from "@/components/portfolio/SmoothScroll";
import Tracker from "@/components/portfolio/Tracker";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import IdeaToLaunch from "@/components/portfolio/IdeaToLaunch";
import Services from "@/components/portfolio/Services";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import Testimonials from "@/components/portfolio/Testimonials";
import Thoughts from "@/components/portfolio/Thoughts";
import LetsTalk from "@/components/portfolio/LetsTalk";
import Footer from "@/components/portfolio/Footer";
import FloatingActions from "@/components/portfolio/FloatingActions";

export default function HomePage() {
  return (
    <main className="bg-[var(--cream)] text-[var(--ink)]">
      <SmoothScroll />
      <Tracker />
      <Navbar />
      <FloatingActions />
      <Hero />
      <About />
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
