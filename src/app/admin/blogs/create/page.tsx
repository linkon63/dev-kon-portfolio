"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Save,
  Upload,
  ImageIcon,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  Eye,
  Edit3,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import {
  Button,
  Field,
  TextInput,
  TextArea,
} from "@/components/admin/ui";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { createItem } from "@/lib/collections";
import { uploadFile } from "@/lib/storage";
import { COLLECTIONS, type Blog } from "@/lib/types";

type SectionDraft = {
  id: string;
  heading: string;
  text: string;
  image: string;
  file?: File | null;
  preview?: string;
};

type Draft = Blog & {
  file?: File | null;
  preview?: string;
  sections: SectionDraft[];
};

const EMPTY: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  date: "",
  active: true,
  likes: 0,
  allowLikes: true,
  allowComments: true,
  file: null,
  preview: "",
  sections: [],
};

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export default function CreateBlogPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [isSlugModified, setIsSlugModified] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (title: string) => {
    const slugPatch = !isSlugModified ? { slug: slugify(title) } : {};
    setDraft((d) => ({
      ...d,
      title,
      ...slugPatch,
    }));
  };

  const pickImage = (file: File) => {
    setDraft((d) => ({ ...d, file, preview: URL.createObjectURL(file) }));
  };

  const addSection = () => {
    setDraft((d) => ({
      ...d,
      sections: [
        ...d.sections,
        {
          id: Math.random().toString(),
          heading: "",
          text: "",
          image: "",
          file: null,
          preview: "",
        },
      ],
    }));
  };

  const removeSection = (index: number) => {
    setDraft((d) => ({
      ...d,
      sections: d.sections.filter((_, i) => i !== index),
    }));
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    setDraft((d) => {
      const list = [...d.sections];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return d;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return { ...d, sections: list };
    });
  };

  const updateSection = (index: number, patch: Partial<SectionDraft>) => {
    setDraft((d) => {
      const list = [...d.sections];
      list[index] = { ...list[index], ...patch };
      return { ...d, sections: list };
    });
  };

  const pickSectionImage = (index: number, file: File) => {
    updateSection(index, {
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const save = async () => {
    if (!draft.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!draft.slug?.trim()) {
      setError("Slug is required.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      // 1. Upload Cover Image
      let image = draft.image;
      if (draft.file) {
        try {
          image = await uploadFile("blogs", draft.file);
        } catch {
          throw new Error("Cover image upload failed.");
        }
      }

      // 2. Upload Section Images sequentially
      const updatedSections = [];
      for (const sec of draft.sections) {
        let secImage = sec.image;
        if (sec.file) {
          try {
            secImage = await uploadFile("blogs", sec.file);
          } catch {
            throw new Error(
              `Image upload failed for section "${sec.heading || "Untitled"}".`,
            );
          }
        }
        updatedSections.push({
          id: sec.id,
          heading: sec.heading,
          text: sec.text,
          image: secImage,
        });
      }

      // 3. Prepare data payload
      const data: Blog = {
        title: draft.title,
        slug: draft.slug,
        excerpt: draft.excerpt,
        content: JSON.stringify(updatedSections),
        date: draft.date,
        image,
        active: draft.active,
        allowLikes: draft.allowLikes,
        allowComments: draft.allowComments,
        likes: 0,
      };

      await createItem(COLLECTIONS.blogs, data);
      router.push("/admin/blogs");
    } catch (e) {
      setError(
        e instanceof Error
          ? `Save failed: ${e.message}`
          : "Save failed. Try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Create Blog">
      {/* Back to blogs link */}
      <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 font-medium cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to list
        </button>

        {/* Tab Controls */}
        <div className="flex rounded-lg border border-neutral-300 p-0.5 bg-neutral-100/50">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "edit"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Edit3 size={13} /> Edit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "preview"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Eye size={13} /> Preview
          </button>
        </div>
      </div>

      {activeTab === "edit" ? (
        <div className="grid gap-6 bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          {/* Cover image uploader */}
          <Field label="Cover image">
            <div className="flex items-center gap-4">
              <div className="grid h-24 w-32 shrink-0 place-items-center overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-neutral-50">
                {draft.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={draft.preview}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon size={22} className="text-neutral-300" />
                )}
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 bg-white shadow-sm transition-colors">
                <Upload size={15} /> Choose image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files?.[0] && pickImage(e.target.files[0])
                  }
                />
              </label>
            </div>
            <div className="mt-3">
              <TextInput
                value={draft.file ? "" : (draft.image ?? "")}
                disabled={!!draft.file}
                placeholder="…or paste an image URL"
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    image: e.target.value,
                    preview: e.target.value,
                  })
                }
              />
            </div>
          </Field>

          {/* Title & Date */}
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <TextInput
                value={draft.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Scaling a MERN app…"
              />
            </Field>
            <Field label="Date">
              <TextInput
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                placeholder="May 5, 2025"
              />
            </Field>
          </div>

          {/* Slug */}
          <Field label="Slug (unique URL path segment)">
            <TextInput
              value={draft.slug || ""}
              onChange={(e) => {
                setIsSlugModified(true);
                setDraft({ ...draft, slug: slugify(e.target.value) });
              }}
              placeholder="scaling-a-mern-app"
            />
          </Field>

          {/* Excerpt */}
          <Field label="Excerpt (short summary shown on cards)">
            <TextArea
              rows={2}
              value={draft.excerpt}
              onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              placeholder="One or two lines describing the post…"
            />
          </Field>

          {/* Settings */}
          <div className="border-t border-neutral-200 pt-4 mt-2">
            <h3 className="text-sm font-bold tracking-tight text-neutral-800 mb-3">
              Settings & Configuration
            </h3>
            <div className="flex flex-wrap gap-6 items-center">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 h-4 w-4"
                />
                Published (Visible to readers)
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-neutral-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.allowLikes}
                  onChange={(e) => setDraft({ ...draft, allowLikes: e.target.checked })}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 h-4 w-4"
                />
                Allow Likes
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-neutral-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.allowComments}
                  onChange={(e) => setDraft({ ...draft, allowComments: e.target.checked })}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 h-4 w-4"
                />
                Allow Comments & Discussion
              </label>
            </div>
          </div>

          {/* Sections */}
          <div className="border-t border-neutral-200 pt-4 mt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold tracking-tight text-neutral-800">
                Content Sections
              </h3>
              <Button type="button" variant="ghost" onClick={addSection} className="text-xs py-1.5 px-3">
                <Plus size={14} /> Add Section
              </Button>
            </div>

            <div className="grid gap-4">
              {draft.sections.map((sec, idx) => (
                <div key={sec.id} className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 relative">
                  {/* Section header controls */}
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-3">
                    <span className="text-xs font-semibold text-neutral-500 font-mono">
                      SECTION #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveSection(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 text-neutral-500 hover:bg-neutral-200 rounded disabled:opacity-30 transition-colors"
                      >
                        <ChevronUp size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(idx, "down")}
                        disabled={idx === draft.sections.length - 1}
                        className="p-1 text-neutral-500 hover:bg-neutral-200 rounded disabled:opacity-30 transition-colors"
                      >
                        <ChevronDown size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors ml-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="grid gap-3">
                    <Field label="Section Heading (optional)">
                      <TextInput
                        value={sec.heading}
                        onChange={(e) => updateSection(idx, { heading: e.target.value })}
                        placeholder="e.g. 1. The Core Architecture"
                      />
                    </Field>

                    {/* Section Image */}
                    <Field label="Section Image (optional)">
                      <div className="flex items-center gap-3">
                        <div className="grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-white">
                          {sec.preview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={sec.preview}
                              alt="section preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={18} className="text-neutral-300" />
                          )}
                        </div>
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs hover:bg-neutral-100 transition-colors shadow-sm">
                          <Upload size={13} /> Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                              e.target.files?.[0] && pickSectionImage(idx, e.target.files[0])
                            }
                          />
                        </label>
                        {sec.preview && (
                          <button
                            type="button"
                            onClick={() => updateSection(idx, { file: null, preview: "", image: "" })}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="mt-2">
                        <TextInput
                          value={sec.file ? "" : (sec.image ?? "")}
                          disabled={!!sec.file}
                          placeholder="…or paste section image URL"
                          className="bg-white"
                          onChange={(e) =>
                            updateSection(idx, {
                              image: e.target.value,
                              preview: e.target.value,
                            })
                          }
                        />
                      </div>
                    </Field>

                    <Field label="Section Content (Rich Text)">
                      <RichTextEditor
                        value={sec.text}
                        onChange={(text) => updateSection(idx, { text })}
                        placeholder="Write this section's content..."
                      />
                    </Field>
                  </div>
                </div>
              ))}
              {draft.sections.length === 0 && (
                <div className="text-center py-6 border border-dashed border-neutral-300 rounded-xl bg-neutral-50/50">
                  <p className="text-xs text-neutral-500">No sections added yet.</p>
                  <button
                    type="button"
                    onClick={addSection}
                    className="mt-2 text-xs font-semibold text-neutral-900 hover:underline"
                  >
                    + Add first section
                  </button>
                </div>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

          <div className="flex gap-2 border-t border-neutral-200 pt-4 mt-2">
            <Button onClick={save} disabled={busy}>
              <Save size={16} /> {busy ? "Saving…" : "Save & Publish"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/blogs")}
              disabled={busy}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        /* Dynamic Live Preview */
        <div className="bg-[#ffffff] text-[#0d0d0c] rounded-xl border border-neutral-200 p-8 shadow-sm">
          <div className="max-w-2xl mx-auto py-10">
            <p className="text-xs font-bold tracking-widest text-[var(--ink)]/40 uppercase">
              {draft.date || "Draft Date"}
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight md:text-5xl md:leading-[1.1]">
              {draft.title || "Untitled Draft"}
            </h1>
            {draft.excerpt && (
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[var(--ink)]/60">
                {draft.excerpt}
              </p>
            )}

            {/* Cover image preview */}
            {draft.preview && (
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-[var(--ink)]/5 ring-1 ring-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={draft.preview}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content sections */}
            <div className="mt-12 space-y-12">
              {draft.sections.map((section) => (
                <div key={section.id} className="space-y-4">
                  {section.heading && (
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-8">
                      {section.heading}
                    </h2>
                  )}
                  {section.preview && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--ink)]/5 ring-1 ring-black/5 my-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.preview}
                        alt="section preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {section.text && (
                    <div
                      className="rich-text text-base sm:text-lg leading-[1.8] text-[var(--ink)]/85"
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    />
                  )}
                </div>
              ))}
              {draft.sections.length === 0 && (
                <p className="text-neutral-400 italic text-sm text-center py-6">
                  No draft content sections created yet.
                </p>
              )}
            </div>

            {/* Likes / Discussion preview placeholders */}
            <div className="mt-16 border-t border-neutral-200 pt-10 opacity-50 select-none">
              {draft.allowLikes && (
                <p className="text-xs text-neutral-400 font-semibold mb-4">
                  ❤️ Likes enabled (Preview only)
                </p>
              )}
              {draft.allowComments && (
                <p className="text-xs text-neutral-400 font-semibold">
                  💬 Comments enabled (Preview only)
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
