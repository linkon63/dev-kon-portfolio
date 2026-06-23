import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PublicPage from "@/components/site/PublicPage";
import Breadcrumb from "@/components/site/Breadcrumb";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Projects — Md Abdul Ahad Linkon",
  description: "Selected and full project work.",
};

export default async function AllProjectPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <PublicPage>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-40 md:pb-32">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)]/55 transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft size={16} /> Back home
        </Link>

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
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--ink)]/5 ring-1 ring-black/5">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-1 text-[var(--ink)]/55">{project.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.liveUrl && (
                    <ProjectLink href={project.liveUrl} icon="live">
                      Live
                    </ProjectLink>
                  )}
                  {project.clientUrl && (
                    <ProjectLink href={project.clientUrl} icon="code">
                      Client
                    </ProjectLink>
                  )}
                  {project.serverUrl && (
                    <ProjectLink href={project.serverUrl} icon="code">
                      Server
                    </ProjectLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PublicPage>
  );
}

function ProjectLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: "live" | "code";
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink)]/15 px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
    >
      {icon === "live" ? <ExternalLink size={14} /> : <Code size={14} />}
      {children}
    </a>
  );
}
