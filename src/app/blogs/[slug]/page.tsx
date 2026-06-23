import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PublicPage from "@/components/site/PublicPage";
import Breadcrumb from "@/components/site/Breadcrumb";
import CommentsAndLikes from "@/components/site/CommentsAndLikes";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Ctx) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog || !blog.active) return { title: "Post not found" };
  return {
    title: `${blog.title} — Md Abdul Ahad Linkon`,
    description: blog.excerpt,
  };
}

interface BlogSection {
  id: string;
  heading?: string;
  text?: string;
  image?: string;
}

export default async function BlogDetailPage({ params }: Ctx) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog || !blog.active) notFound();

  // Parse section-based content
  let sections: BlogSection[] = [];
  const contentRaw = (blog.content || "").trim();
  if (contentRaw) {
    if (contentRaw.startsWith("[")) {
      try {
        sections = JSON.parse(contentRaw);
      } catch {
        // Fallback to plain text splitting if JSON parse fails
        sections = contentRaw
          .split(/\n\s*\n/)
          .filter((p) => p.trim().length > 0)
          .map((p, idx) => ({
            id: `legacy-${idx}`,
            text: p,
          }));
      }
    } else {
      sections = contentRaw
        .split(/\n\s*\n/)
        .filter((p) => p.trim().length > 0)
        .map((p, idx) => ({
          id: `legacy-${idx}`,
          text: p,
        }));
    }
  }

  // Count total words in all text blocks for reading time estimate
  const totalText = sections.map((s) => s.text || "").join(" ") + " " + blog.excerpt;
  const words = totalText.split(/\s+/).filter(Boolean).length;
  const readMins = Math.max(1, Math.round(words / 200));

  return (
    <PublicPage>
      <article className="mx-auto max-w-2xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <Breadcrumb
          items={[{ label: "Blog", href: "/blogs" }, { label: blog.title }]}
        />

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

        {/* Cover Image */}
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

        {/* Sections Rendering */}
        <div className="mt-12 space-y-12">
          {sections.length > 0 ? (
            sections.map((section) => (
              <div key={section.id} className="space-y-4">
                {section.heading && (
                  <h2 className="text-2xl font-bold tracking-tight mt-8">
                    {section.heading}
                  </h2>
                )}
                {section.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--ink)]/5 ring-1 ring-black/5 my-6">
                    <Image
                      src={section.image}
                      alt={section.heading || blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 42rem"
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
                {section.text && (
                  <div
                    className="rich-text text-lg leading-[1.8] text-[var(--ink)]/85"
                    dangerouslySetInnerHTML={{ __html: section.text }}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-[var(--ink)]/55">
              This post doesn&apos;t have any content yet.
            </p>
          )}
        </div>

        <CommentsAndLikes
          blogId={blog.id}
          blogSlug={blog.slug}
          initialLikes={blog.likes}
          allowLikes={blog.allowLikes}
          allowComments={blog.allowComments}
        />
      </article>
    </PublicPage>
  );
}
