"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Save, Upload, ImageIcon } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import {
  Button,
  Card,
  Field,
  Modal,
  TextInput,
  TextArea,
} from "@/components/admin/ui";
import {
  subscribeCollection,
  createItem,
  updateItem,
  removeItem,
} from "@/lib/collections";
import { uploadFile } from "@/lib/storage";
import { COLLECTIONS, type Blog } from "@/lib/types";
import { seedBlogs } from "@/lib/seedData";

type Draft = Blog & { file?: File | null; preview?: string };

const EMPTY: Draft = {
  title: "",
  excerpt: "",
  image: "",
  date: "",
  href: "/blogs",
  file: null,
  preview: "",
};

export default function AdminBlogsPage() {
  const [items, setItems] = useState<Blog[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    () =>
      subscribeCollection<Blog>(
        COLLECTIONS.blogs,
        setItems,
        (e) => setError(e.message),
      ),
    [],
  );

  const openNew = () => {
    setDraft({ ...EMPTY });
    setError("");
    setOpen(true);
  };

  const openEdit = (b: Blog) => {
    setDraft({ ...b, file: null, preview: b.image });
    setError("");
    setOpen(true);
  };

  const pickImage = (file: File) => {
    setDraft((d) => ({ ...d, file, preview: URL.createObjectURL(file) }));
  };

  const save = async () => {
    if (!draft.title.trim()) {
      setError("Title is required.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      let image = draft.image;
      if (draft.file) {
        try {
          image = await uploadFile("blogs", draft.file);
        } catch {
          throw new Error(
            "Image upload failed. Make sure you're signed in, or paste an image URL instead.",
          );
        }
      }

      const data: Blog = {
        title: draft.title,
        excerpt: draft.excerpt,
        date: draft.date,
        href: draft.href || "/blogs",
        image,
      };

      if (draft.id) await updateItem(COLLECTIONS.blogs, draft.id, data);
      else await createItem(COLLECTIONS.blogs, data);

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

  const seed = async () => {
    setBusy(true);
    setError("");
    try {
      for (const b of seedBlogs) await createItem(COLLECTIONS.blogs, b);
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

      {/* Existing blogs */}
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
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-400">
                <ImageIcon size={20} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{b.title}</p>
              <p className="text-xs text-neutral-400">{b.date}</p>
              <p className="mt-0.5 truncate text-sm text-neutral-500">
                {b.excerpt}
              </p>
            </div>
            <Button variant="ghost" onClick={() => openEdit(b)}>
              <Pencil size={15} />
            </Button>
            <Button
              variant="danger"
              onClick={() => b.id && removeItem(COLLECTIONS.blogs, b.id)}
            >
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
        <div className="grid gap-4">
          {/* Image upload + preview */}
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

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <TextInput
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
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

          <Field label="Link (href)">
            <TextInput
              value={draft.href ?? ""}
              onChange={(e) => setDraft({ ...draft, href: e.target.value })}
              placeholder="/blogs or https://…"
            />
          </Field>

          <Field label="Excerpt / content">
            <TextArea
              rows={4}
              value={draft.excerpt}
              onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              placeholder="What the post is about…"
            />
          </Field>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-2">
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
    </AdminShell>
  );
}
