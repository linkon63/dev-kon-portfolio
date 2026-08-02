"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import BlogEditor, { type BlogDraft } from "@/components/admin/BlogEditor";
import { listCollection } from "@/lib/collections";
import { contentToHtml } from "@/lib/blog-content";
import { COLLECTIONS, type Blog } from "@/lib/types";

export default function EditBlogPage() {
  const { id } = useParams() as { id: string };
  const [draft, setDraft] = useState<BlogDraft | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    listCollection<Blog>(COLLECTIONS.blogs)
      .then((blogs) => {
        const blog = blogs.find((b) => b.id === id);
        if (!blog) {
          setError("Blog post not found.");
          return;
        }
        setDraft({
          id: blog.id,
          title: blog.title,
          slug: blog.slug || "",
          excerpt: blog.excerpt || "",
          content: contentToHtml(blog.content),
          image: blog.image || "",
          date: blog.date || "",
          active: blog.active ?? true,
          likes: blog.likes ?? 0,
          allowLikes: blog.allowLikes ?? true,
          allowComments: blog.allowComments ?? true,
        });
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load blog."),
      );
  }, [id]);

  if (error) {
    return (
      <AdminShell title="Edit Story">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
          {error}
        </div>
      </AdminShell>
    );
  }

  if (!draft) {
    return (
      <AdminShell title="Edit Story">
        <div className="flex h-64 items-center justify-center gap-2 text-sm text-neutral-500">
          <Loader2 className="animate-spin" size={16} /> Loading story…
        </div>
      </AdminShell>
    );
  }

  return <BlogEditor mode="edit" blogId={id} initial={draft} />;
}
