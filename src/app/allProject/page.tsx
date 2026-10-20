import { prisma } from "@/lib/prisma";
import PublicPage from "@/components/site/PublicPage";
import Breadcrumb from "@/components/site/Breadcrumb";
import AllProjectsGrid from "@/components/portfolio/AllProjectsGrid";
import { ClientProjectsGrid } from "@/components/portfolio/ClientWork";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Projects — Md Abdul Ahad Linkon",
  description:
    "Client work for brands across HR, automotive, real estate, travel, manufacturing and retail — plus personal full-stack projects.",
};

export default async function AllProjectPage() {
  const projects = await prisma.project.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PublicPage>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <Breadcrumb items={[{ label: "All Projects" }]} />

        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="mb-3 text-sm font-medium tracking-widest text-[var(--ink)]/40 uppercase">
              Portfolio
            </p>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
              All Projects
            </h1>
          </div>
          <p className="max-w-md text-base text-[var(--ink)]/55">
            A fuller look at things I&apos;ve designed, built and shipped —
            full-stack apps, client work and experiments. Tap any card for
            details.
          </p>
        </header>

        <div id="client-work" className="mb-14 scroll-mt-28 md:mb-20">
          <h2 className="mb-5 text-2xl font-extrabold tracking-tight md:text-3xl">
            Client Work
          </h2>
          <ClientProjectsGrid />
        </div>

        <h2 className="mb-5 text-2xl font-extrabold tracking-tight md:text-3xl">
          More Projects
        </h2>
        {projects.length === 0 ? (
          <p className="text-[var(--ink)]/55">No projects yet.</p>
        ) : (
          <AllProjectsGrid
            projects={projects.map((p) => ({
              id: p.id,
              title: p.title,
              text: p.text,
              image: p.image,
              liveUrl: p.liveUrl ?? undefined,
              clientUrl: p.clientUrl ?? undefined,
              serverUrl: p.serverUrl ?? undefined,
            }))}
          />
        )}
      </section>
    </PublicPage>
  );
}
