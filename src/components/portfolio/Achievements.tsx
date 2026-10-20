import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { certificates } from "@/data/certificates";
import CertificateGallery from "@/components/portfolio/CertificateGallery";

/** Home-page highlight: only the `featured` entries, linking to the full
 *  list on /achievements. */
export default function Achievements() {
  const featured = certificates.filter((c) => c.featured);

  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-6 md:py-32">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ink)]/45">
            /Beyond the Code
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter">
            Achievements
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--ink)]/70 md:text-lg">
            Hackathons, competitions, and certifications. Click a card to view
            the certificate.
          </p>
        </div>

        <Link
          href="/achievements"
          className="group inline-flex items-center gap-3 text-base font-medium"
        >
          View All {certificates.length}
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--ink)]/30 transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)]">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>

      <CertificateGallery
        certificates={featured}
        gridClassName="sm:grid-cols-2 lg:grid-cols-4"
      />
    </section>
  );
}
