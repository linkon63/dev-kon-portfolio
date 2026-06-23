import { prisma } from "@/lib/prisma";
import PublicPage from "@/components/site/PublicPage";
import Breadcrumb from "@/components/site/Breadcrumb";
import AllProjectsGrid from "@/components/portfolio/AllProjectsGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Projects — Md Abdul Ahad Linkon",
  description: "Selected and full project work.",
};

export default async function AllProjectPage() {
  const projects = await prisma.project.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PublicPage>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-40 md:pb-32">
        <Breadcrumb items={[{ label: "All Projects" }]} />

        <header className="mb-14 md:mb-20">
          <p className="mb-4 text-sm font-medium tracking-widest text-[var(--ink)]/40 uppercase">
            Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter">
            All Projects
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--ink)]/55">
            A fuller look at things I&apos;ve designed, built and shipped —
            full-stack apps, client work and experiments.
          </p>
        </header>

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
