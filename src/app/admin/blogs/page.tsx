"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  Upload,
  ImageIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import {
  Button,
  Card,
  ConfirmDialog,
  Field,
  Modal,
  TextInput,
  TextArea,
} from "@/components/admin/ui";
import RichTextEditor from "@/components/admin/RichTextEditor";
import {
  listCollection,
  createItem,
  updateItem,
  removeItem,
} from "@/lib/collections";
import { uploadFile } from "@/lib/storage";
import { COLLECTIONS, type Blog } from "@/lib/types";
import { seedBlogs } from "@/lib/seedData";

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

export default function AdminBlogsPage() {
  const [items, setItems] = useState<Blog[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [isSlugModified, setIsSlugModified] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);

  const reload = useCallback(
    () => listCollection<Blog>(COLLECTIONS.blogs).then(setItems),
    [],
  );

  useEffect(() => {
    reload().catch((e) =>
      setError(e instanceof Error ? e.message : "Failed to load blogs."),
    );
  }, [reload]);

  const openNew = () => {
    setDraft({ ...EMPTY });
    setIsSlugModified(false);
    setError("");
    setOpen(true);
  };

  const openEdit = (b: Blog) => {
    let parsedSections: SectionDraft[] = [];
    try {
      if (b.content) {
        const parsed = JSON.parse(b.content);
        if (Array.isArray(parsed)) {
          parsedSections = parsed.map((sec: any) => ({
            id: sec.id || Math.random().toString(),
            heading: sec.heading || "",
            text: sec.text || "",
            image: sec.image || "",
            file: null,
            preview: sec.image || "",
          }));
        }
      }
    } catch {
      // Legacy fallback
      parsedSections = [
        {
          id: "legacy",
          heading: "",
          text: b.content || "",
          image: "",
          file: null,
          preview: "",
        },
      ];
    }

    setDraft({
      ...b,
      file: null,
      preview: b.image,
      sections: parsedSections,
    });
    setIsSlugModified(true); // Existing post slugs shouldn't change automatically
    setError("");
    setOpen(true);
  };

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
    if (!draft.slug.trim()) {
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
      };

      if (draft.id) await updateItem(COLLECTIONS.blogs, draft.id, data);
      else await createItem(COLLECTIONS.blogs, data);

      await reload();
      setOpen(false);
      setDraft(EMPTY);
    } catch (e) {
      setError(
        e instanceof Error
          ? `Save failed: ${e.message}`
          : "Save failed. Make sure you're signed in and try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete?.id) return;
    setDeleting(true);
    try {
      await removeItem(COLLECTIONS.blogs, toDelete.id);
      await reload();
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const seed = async () => {
    setBusy(true);
    setError("");
    try {
      for (const b of seedBlogs) await createItem(COLLECTIONS.blogs, b);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Seed failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Thoughts / Blogs">
      <div className="mb-5 flex flex-wrap gap-3">
        <Button onClick={openNew}>
          <Plus size={16} /> Create blog
        </Button>
        {items.length === 0 && (
          <Button variant="ghost" onClick={seed} disabled={busy}>
            Seed from existing
          </Button>
        )}
      </div>

      {error && !open && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Existing blogs list */}
      <div className="grid gap-3">
        {items.map((b) => (
          <Card key={b.id} className="flex items-center gap-4">
            {b.image ? (
              <Image
                src={b.image}
                alt=""
                width={72}
                height={72}
                unoptimized
                className="h-18 w-18 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="grid h-18 w-18 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-400">
                <ImageIcon size={20} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-semibold">{b.title}</p>
                <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-500 font-mono">
                  /{b.slug}
                </span>
              </div>
              <p className="text-xs text-neutral-400">{b.date}</p>
              <p className="mt-0.5 truncate text-sm text-neutral-500 font-normal">
                {b.excerpt}
              </p>
            </div>
            <Button variant="ghost" onClick={() => openEdit(b)}>
              <Pencil size={15} />
            </Button>
            <Button variant="danger" onClick={() => setToDelete(b)}>
              <Trash2 size={15} />
            </Button>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-neutral-500">
            No blogs yet — create one or seed the existing posts.
          </p>
        )}
      </div>

      {/* Create / edit modal */}
      <Modal
        open={open}
        onClose={() => !busy && setOpen(false)}
        title={draft.id ? "Edit blog" : "Create blog"}
      >
        <div className="grid gap-4 max-h-[75vh] overflow-y-auto pr-1">
          {/* Cover image upload */}
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
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100">
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
              value={draft.slug}
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

          {/* Dynamic Sections */}
          <div className="border-t border-neutral-200 pt-4 mt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold tracking-tight text-neutral-800">
                Blog Sections
              </h3>
              <Button type="button" variant="ghost" onClick={addSection} className="text-xs py-1.5 px-3">
                <Plus size={14} /> Add Section
              </Button>
            </div>

            <div className="grid gap-4">
              {draft.sections.map((sec, idx) => (
                <div key={sec.id} className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 relative">
                  {/* Section Controls */}
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
                        title="Move Up"
                      >
                        <ChevronUp size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(idx, "down")}
                        disabled={idx === draft.sections.length - 1}
                        className="p-1 text-neutral-500 hover:bg-neutral-200 rounded disabled:opacity-30 transition-colors"
                        title="Move Down"
                      >
                        <ChevronDown size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors ml-1"
                        title="Delete Section"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Section Fields */}
                  <div className="grid gap-3">
                    <Field label="Section Heading (optional)">
                      <TextInput
                        value={sec.heading}
                        onChange={(e) => updateSection(idx, { heading: e.target.value })}
                        placeholder="e.g. 1. The Core Problem"
                      />
                    </Field>

                    {/* Section Image Uploader */}
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
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs hover:bg-neutral-100 transition-colors">
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
              <Save size={16} /> {busy ? "Saving…" : "Save blog"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => !busy && setOpen(false)}
              disabled={busy}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        message={`Delete the blog “${toDelete?.title ?? ""}”? This can't be undone.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </AdminShell>
  );
}
