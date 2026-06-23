import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PublicPage from "@/components/site/PublicPage";
import Breadcrumb from "@/components/site/Breadcrumb";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

export const metadata = {
  title: "Thoughts — Md Abdul Ahad Linkon",
  description: "Writing on building scalable web products.",
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page) || 1);

  const [total, blogs] = await Promise.all([
    prisma.blog.count({ where: { active: true } }),
    prisma.blog.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <PublicPage>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-40 md:pb-32">
        <header className="mb-14 md:mb-20">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter">
            Thoughts
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--ink)]/55">
            Notes on building scalable products — engineering, architecture, and
            the occasional lesson learned in production.
          </p>
        </header>

        {blogs.length === 0 ? (
          <p className="text-[var(--ink)]/55">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <Link
                key={post.id || post.slug}
                href={`/blogs/${post.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[var(--ink)]/5 ring-1 ring-black/5">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <p className="mt-5 text-sm text-[var(--ink)]/45">{post.date}</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--ink)]/70">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-[var(--ink)]/55">
                  {post.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                  Read more
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-20 flex items-center justify-center gap-2">
            <PageLink page={page - 1} disabled={page <= 1} label="Previous" />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={n === 1 ? "/blogs" : `/blogs?page=${n}`}
                className={`grid h-10 w-10 place-items-center rounded-full text-sm font-medium transition-colors ${
                  n === page
                    ? "bg-[var(--ink)] text-[var(--cream)]"
                    : "border border-[var(--ink)]/15 hover:bg-[var(--ink)]/5"
                }`}
              >
                {n}
              </Link>
            ))}
            <PageLink
              page={page + 1}
              disabled={page >= totalPages}
              label="Next"
            />
          </nav>
        )}
      </section>
    </PublicPage>
  );
}

function PageLink({
  page,
  disabled,
  label,
}: {
  page: number;
  disabled: boolean;
  label: string;
}) {
  if (disabled) {
    return (
      <span className="cursor-not-allowed rounded-full px-4 py-2 text-sm font-medium text-[var(--ink)]/25">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={page === 1 ? "/blogs" : `/blogs?page=${page}`}
      className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--ink)]/5"
    >
      {label}
    </Link>
  );
}
