"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Save, X, Upload } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card, Field, TextInput, TextArea } from "@/components/admin/ui";
import {
  subscribeCollection,
  createItem,
  updateItem,
  removeItem,
} from "@/lib/collections";
import { uploadFile } from "@/lib/storage";
import { COLLECTIONS, type Blog } from "@/lib/types";
import { seedBlogs } from "@/lib/seedData";

const EMPTY: Blog = { title: "", excerpt: "", image: "", date: "", href: "/blogs" };

export default function AdminBlogsPage() {
  const [items, setItems] = useState<Blog[]>([]);
  const [draft, setDraft] = useState<Blog | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(
    () => subscribeCollection<Blog>(COLLECTIONS.blogs, setItems),
    [],
  );

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const { id, ...data } = draft;
      if (id) await updateItem(COLLECTIONS.blogs, id, data);
      else await createItem(COLLECTIONS.blogs, data);
      setDraft(null);
    } finally {
      setBusy(false);
    }
  };

  const onImage = async (file: File) => {
    setBusy(true);
    try {
      const url = await uploadFile("blogs", file);
      setDraft((d) => (d ? { ...d, image: url } : d));
    } finally {
      setBusy(false);
    }
  };

  const seed = async () => {
    setBusy(true);
    try {
      for (const b of seedBlogs) await createItem(COLLECTIONS.blogs, b);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Thoughts / Blogs">
      <div className="mb-5 flex gap-3">
        <Button onClick={() => setDraft({ ...EMPTY })}>
          <Plus size={16} /> New post
        </Button>
        {items.length === 0 && (
          <Button variant="ghost" onClick={seed} disabled={busy}>
            Seed from existing
          </Button>
        )}
      </div>

      {draft && (
        <Card className="mb-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <TextInput
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </Field>
            <Field label="Date (e.g. May 5, 2025)">
              <TextInput
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              />
            </Field>
            <Field label="Link (href)">
              <TextInput
                value={draft.href ?? ""}
                onChange={(e) => setDraft({ ...draft, href: e.target.value })}
              />
            </Field>
            <Field label="Image">
              <div className="flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100">
                  <Upload size={15} /> Upload
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      e.target.files?.[0] && onImage(e.target.files[0])
                    }
                  />
                </label>
                {draft.image && (
                  <Image
                    src={draft.image}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded object-cover"
                    unoptimized
                  />
                )}
              </div>
            </Field>
            <div className="md:col-span-2">
              <Field label="Excerpt">
                <TextArea
                  rows={3}
                  value={draft.excerpt}
                  onChange={(e) =>
                    setDraft({ ...draft, excerpt: e.target.value })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={save} disabled={busy}>
              <Save size={16} /> Save
            </Button>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              <X size={16} /> Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-3">
        {items.map((b) => (
          <Card key={b.id} className="flex items-center gap-4">
            {b.image && (
              <Image
                src={b.image}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded object-cover"
                unoptimized
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{b.title}</p>
              <p className="truncate text-sm text-neutral-500">
                {b.date} — {b.excerpt}
              </p>
            </div>
            <Button variant="ghost" onClick={() => setDraft(b)}>
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
        {items.length === 0 && !draft && (
          <p className="text-sm text-neutral-500">No posts yet.</p>
        )}
      </div>
    </AdminShell>
  );
}
