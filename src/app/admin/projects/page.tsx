"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Save, X, Upload } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card, Field, TextInput, TextArea } from "@/components/admin/ui";
import {
  listCollection,
  createItem,
  updateItem,
  removeItem,
} from "@/lib/collections";
import { uploadFile } from "@/lib/storage";
import { COLLECTIONS, type Project } from "@/lib/types";
import { seedProjects } from "@/lib/seedData";

const EMPTY: Project = {
  title: "",
  text: "",
  image: "",
  liveUrl: "",
  clientUrl: "",
  serverUrl: "",
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [draft, setDraft] = useState<Project | null>(null);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(
    () => listCollection<Project>(COLLECTIONS.projects).then(setItems),
    [],
  );

  useEffect(() => {
    reload().catch(() => {});
  }, [reload]);

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const { id, ...data } = draft;
      if (id) await updateItem(COLLECTIONS.projects, id, data);
      else await createItem(COLLECTIONS.projects, data);
      await reload();
      setDraft(null);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    await removeItem(COLLECTIONS.projects, id);
    await reload();
  };

  const onImage = async (file: File) => {
    setBusy(true);
    try {
      const url = await uploadFile("projects", file);
      setDraft((d) => (d ? { ...d, image: url } : d));
    } finally {
      setBusy(false);
    }
  };

  const seed = async () => {
    setBusy(true);
    try {
      for (const p of seedProjects) await createItem(COLLECTIONS.projects, p);
      await reload();
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Projects">
      <div className="mb-5 flex gap-3">
        <Button onClick={() => setDraft({ ...EMPTY })}>
          <Plus size={16} /> New project
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
              <Field label="Description">
                <TextArea
                  rows={2}
                  value={draft.text}
                  onChange={(e) => setDraft({ ...draft, text: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Live URL">
              <TextInput
                value={draft.liveUrl ?? ""}
                onChange={(e) => setDraft({ ...draft, liveUrl: e.target.value })}
              />
            </Field>
            <Field label="Client / Code URL">
              <TextInput
                value={draft.clientUrl ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, clientUrl: e.target.value })
                }
              />
            </Field>
            <Field label="Server URL">
              <TextInput
                value={draft.serverUrl ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, serverUrl: e.target.value })
                }
              />
            </Field>
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

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((p) => (
          <Card key={p.id} className="flex items-center gap-4">
            {p.image && (
              <Image
                src={p.image}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded object-cover"
                unoptimized
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{p.title}</p>
              <p className="truncate text-sm text-neutral-500">{p.text}</p>
            </div>
            <Button variant="ghost" onClick={() => setDraft(p)}>
              <Pencil size={15} />
            </Button>
            <Button
              variant="danger"
              onClick={() => p.id && remove(p.id)}
            >
              <Trash2 size={15} />
            </Button>
          </Card>
        ))}
        {items.length === 0 && !draft && (
          <p className="text-sm text-neutral-500">No projects yet.</p>
        )}
      </div>
    </AdminShell>
  );
}
