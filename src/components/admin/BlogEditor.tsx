"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  ImageIcon,
  Eye,
  Edit3,
  Loader2,
  Settings2,
  Send,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Field, TextInput, TextArea, Modal } from "@/components/admin/ui";
import MediumEditor from "@/components/admin/MediumEditor";
import { createItem, updateItem } from "@/lib/collections";
import { uploadFile } from "@/lib/storage";
import { wordCount } from "@/lib/blog-content";
import { COLLECTIONS, type Blog } from "@/lib/types";

export type BlogDraft = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML body
  image: string; // cover URL
  date: string;
  active: boolean;
  likes: number;
  allowLikes: boolean;
  allowComments: boolean;
};

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

export default function BlogEditor({
  mode,
  blogId,
  initial,
}: {
  mode: "create" | "edit";
  blogId?: string;
  initial: BlogDraft;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<BlogDraft>(initial);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(initial.image || "");
  // In edit mode the slug already exists, so don't let title edits clobber it.
  const [isSlugModified, setIsSlugModified] = useState(mode === "edit");
  const [publishOpen, setPublishOpen] = useState(false);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const words = useMemo(() => wordCount(draft.content), [draft.content]);
  const readMins = Math.max(1, Math.round(words / 200));

  const patch = (p: Partial<BlogDraft>) => setDraft((d) => ({ ...d, ...p }));

  const handleTitle = (title: string) => {
    patch({ title, ...(isSlugModified ? {} : { slug: slugify(title) }) });
  };

  const pickCover = (file: File) => {
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const save = async () => {
    if (!draft.title.trim()) {
      setError("A title is required.");
      setPublishOpen(true);
      return;
    }
    if (!draft.slug.trim()) {
      setError("A slug is required.");
      setPublishOpen(true);
      return;
    }
    setBusy(true);
    setError("");
    try {
      let image = draft.image;
      if (coverFile) {
        try {
          image = await uploadFile("blogs", coverFile);
        } catch {
          throw new Error("Cover image upload failed.");
        }
      }

      const data: Blog = {
        title: draft.title,
        slug: draft.slug,
        excerpt: draft.excerpt,
        content: draft.content,
        date: draft.date,
        image,
        active: draft.active,
        allowLikes: draft.allowLikes,
        allowComments: draft.allowComments,
        likes: draft.likes,
      };

      if (mode === "edit" && blogId) {
        await updateItem(COLLECTIONS.blogs, blogId, data);
      } else {
        await createItem(COLLECTIONS.blogs, { ...data, likes: 0 });
      }
      router.push("/admin/blogs");
    } catch (e) {
      setError(
        e instanceof Error ? `Save failed: ${e.message}` : "Save failed. Try again.",
      );
      setPublishOpen(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title={mode === "edit" ? "Edit Story" : "Write a Story"}>
      {/* Top bar */}
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-medium text-neutral-400 sm:inline">
            {words > 0 ? `${words} words · ${readMins} min read` : "Draft"}
          </span>

          <div className="flex rounded-lg border border-neutral-300 bg-neutral-100/50 p-0.5">
            <button
              type="button"
              onClick={() => setTab("write")}
              className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                tab === "write"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Edit3 size={13} /> Write
            </button>
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                tab === "preview"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Eye size={13} /> Preview
            </button>
          </div>

          <Button onClick={() => setPublishOpen(true)}>
            <Send size={15} /> {mode === "edit" ? "Publish changes" : "Publish"}
          </Button>
        </div>
      </div>

      {tab === "write" ? (
        <div className="mx-auto max-w-2xl px-1 pb-24">
          {/* Optional cover strip */}
          {coverPreview ? (
            <div className="group relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverPreview}
                alt="cover"
                className="h-full w-full object-cover"
              />
              <label className="absolute right-3 top-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                <Upload size={13} /> Replace
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files?.[0] && pickCover(e.target.files[0])
                  }
                />
              </label>
            </div>
          ) : (
            <label className="mb-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-neutral-300 px-3.5 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:border-neutral-500 hover:text-neutral-800">
              <ImageIcon size={14} /> Add cover image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  e.target.files?.[0] && pickCover(e.target.files[0])
                }
              />
            </label>
          )}

          <MediumEditor
            title={draft.title}
            onTitleChange={handleTitle}
            content={draft.content}
            onContentChange={(content) => patch({ content })}
          />
        </div>
      ) : (
        <BlogPreview draft={draft} coverPreview={coverPreview} readMins={readMins} />
      )}

      {/* Floating publish shortcut on small screens */}
      <button
        type="button"
        onClick={() => setPublishOpen(true)}
        className="fixed bottom-6 right-6 z-30 grid h-12 w-12 place-items-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform hover:scale-105 sm:hidden"
        aria-label="Publish settings"
      >
        <Settings2 size={20} />
      </button>

      {/* Publish settings drawer */}
      <Modal
        open={publishOpen}
        onClose={() => !busy && setPublishOpen(false)}
        title="Story settings"
      >
        <div className="grid gap-5">
          {/* Cover */}
          <Field label="Cover image">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-32 shrink-0 place-items-center overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-neutral-50">
                {coverPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverPreview}
                    alt="cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon size={20} className="text-neutral-300" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-neutral-100">
                  <Upload size={13} /> Choose image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      e.target.files?.[0] && pickCover(e.target.files[0])
                    }
                  />
                </label>
                {coverPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverFile(null);
                      setCoverPreview("");
                      patch({ image: "" });
                    }}
                    className="text-left text-xs text-red-500 hover:underline"
                  >
                    Remove cover
                  </button>
                )}
              </div>
            </div>
            <div className="mt-3">
              <TextInput
                value={coverFile ? "" : draft.image}
                disabled={!!coverFile}
                placeholder="…or paste an image URL"
                onChange={(e) => {
                  patch({ image: e.target.value });
                  setCoverPreview(e.target.value);
                }}
              />
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug (URL path)">
              <TextInput
                value={draft.slug}
                onChange={(e) => {
                  setIsSlugModified(true);
                  patch({ slug: slugify(e.target.value) });
                }}
                placeholder="scaling-a-mern-app"
              />
            </Field>
            <Field label="Date">
              <TextInput
                value={draft.date}
                onChange={(e) => patch({ date: e.target.value })}
                placeholder="May 5, 2025"
              />
            </Field>
          </div>

          <Field label="Excerpt (shown on cards & previews)">
            <TextArea
              rows={2}
              value={draft.excerpt}
              onChange={(e) => patch({ excerpt: e.target.value })}
              placeholder="One or two lines describing the post…"
            />
          </Field>

          <div className="grid gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 p-4">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-700">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(e) => patch({ active: e.target.checked })}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              Published (visible to readers)
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-700">
              <input
                type="checkbox"
                checked={draft.allowLikes}
                onChange={(e) => patch({ allowLikes: e.target.checked })}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              Allow likes
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-700">
              <input
                type="checkbox"
                checked={draft.allowComments}
                onChange={(e) => patch({ allowComments: e.target.checked })}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              Allow comments & discussion
            </label>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 border-t border-neutral-200 pt-4">
            <Button
              variant="ghost"
              onClick={() => setPublishOpen(false)}
              disabled={busy}
            >
              Keep editing
            </Button>
            <Button onClick={save} disabled={busy}>
              {busy ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Saving…
                </>
              ) : (
                <>
                  <Send size={15} /> {mode === "edit" ? "Save changes" : "Publish now"}
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminShell>
  );
}

function BlogPreview({
  draft,
  coverPreview,
  readMins,
}: {
  draft: BlogDraft;
  coverPreview: string;
  readMins: number;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <article className="mx-auto max-w-2xl py-8 text-[#0d0d0c]">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--ink)]/40">
          {draft.date || "Draft date"} · {readMins} min read
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
          {draft.title || "Untitled story"}
        </h1>
        {draft.excerpt && (
          <p className="mt-6 text-xl leading-relaxed text-[var(--ink)]/60">
            {draft.excerpt}
          </p>
        )}
        {coverPreview && (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-[var(--ink)]/5 ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverPreview}
              alt="cover"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {draft.content.trim() ? (
          <div
            className="rich-text mt-12 text-lg leading-[1.8] text-[var(--ink)]/85"
            dangerouslySetInnerHTML={{ __html: draft.content }}
          />
        ) : (
          <p className="mt-12 text-center text-sm italic text-neutral-400">
            Nothing written yet.
          </p>
        )}
      </article>
    </div>
  );
}
