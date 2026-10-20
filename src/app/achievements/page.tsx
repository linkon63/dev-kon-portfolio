import PublicPage from "@/components/site/PublicPage";
import Breadcrumb from "@/components/site/Breadcrumb";
import CertificateGallery from "@/components/portfolio/CertificateGallery";
import { certificates } from "@/data/certificates";

export const metadata = {
  title: "Achievements & Certifications — Md Abdul Ahad Linkon",
  description:
    "Hackathons, competitions, extracurricular activities and certifications from Coursera, HackerRank, freeCodeCamp and more.",
};

export default function AchievementsPage() {
  return (
    <PublicPage>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <Breadcrumb items={[{ label: "Achievements" }]} />

        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="mb-3 text-sm font-medium tracking-widest text-[var(--ink)]/40 uppercase">
              Beyond the Code
            </p>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
              Achievements
            </h1>
          </div>
          <p className="max-w-md text-base text-[var(--ink)]/55">
            Hackathons, competitions, campus activities and the certifications
            I&apos;ve earned along the way. Tap any card to view the
            certificate, or verify it at the source.
          </p>
        </header>

        <CertificateGallery certificates={certificates} filterable />
      </section>
    </PublicPage>
  );
}
