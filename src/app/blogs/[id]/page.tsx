import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PublicPage from "@/components/site/PublicPage";
import Breadcrumb from "@/components/site/Breadcrumb";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Ctx) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) return { title: "Post not found" };
  return { title: `${blog.title} — Md Abdul Ahad Linkon`, description: blog.excerpt };
}

export default async function BlogDetailPage({ params }: Ctx) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) notFound();

  // Split the article body into paragraphs on blank lines (Medium-style prose).
  const body = (blog.content || blog.excerpt || "").trim();
  const paragraphs = body.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  // Rough read-time estimate.
  const words = body.split(/\s+/).filter(Boolean).length;
  const readMins = Math.max(1, Math.round(words / 200));

  return (
    <PublicPage>
      <article className="mx-auto max-w-2xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <Link
          href="/blogs"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)]/55 transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft size={16} /> All posts
        </Link>

        <Breadcrumb items={[{ label: "Blog", href: "/blogs" }, { label: blog.title }]} />

        <p className="text-sm font-medium tracking-widest text-[var(--ink)]/40 uppercase">
          {blog.date}
          {words > 0 && <> · {readMins} min read</>}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl md:leading-[1.1]">
          {blog.title}
        </h1>
        {blog.excerpt && (
          <p className="mt-6 text-xl leading-relaxed text-[var(--ink)]/60">
            {blog.excerpt}
          </p>
        )}

        {blog.image && (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-[var(--ink)]/5 ring-1 ring-black/5">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 42rem"
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-12 space-y-6 text-lg leading-[1.8] text-[var(--ink)]/85">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {p}
              </p>
            ))
          ) : (
            <p className="text-[var(--ink)]/55">
              This post doesn&apos;t have any content yet.
            </p>
          )}
        </div>

        <div className="mt-16 border-t border-[var(--ink)]/10 pt-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)]/55 transition-colors hover:text-[var(--ink)]"
          >
            <ArrowLeft size={16} /> Back to all posts
          </Link>
        </div>
      </article>
    </PublicPage>
  );
}
