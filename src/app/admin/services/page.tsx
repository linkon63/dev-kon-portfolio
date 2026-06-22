"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card, Field, TextInput } from "@/components/admin/ui";
import {
  subscribeCollection,
  createItem,
  updateItem,
  removeItem,
} from "@/lib/collections";
import { COLLECTIONS, type Service } from "@/lib/types";
import { seedServices } from "@/lib/seedData";

type Draft = { id?: string; title: string; tagsText: string };

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(
    () => subscribeCollection<Service>(COLLECTIONS.services, setItems),
    [],
  );

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const data = {
        title: draft.title,
        tags: draft.tagsText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (draft.id) await updateItem(COLLECTIONS.services, draft.id, data);
      else await createItem(COLLECTIONS.services, data);
      setDraft(null);
    } finally {
      setBusy(false);
    }
  };

  const seed = async () => {
    setBusy(true);
    try {
      for (const s of seedServices) await createItem(COLLECTIONS.services, s);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Services">
      <div className="mb-5 flex gap-3">
        <Button onClick={() => setDraft({ title: "", tagsText: "" })}>
          <Plus size={16} /> New service
        </Button>
        {items.length === 0 && (
          <Button variant="ghost" onClick={seed} disabled={busy}>
            Seed from existing
          </Button>
        )}
      </div>

      {draft && (
        <Card className="mb-6">
          <div className="grid gap-4">
            <Field label="Title">
              <TextInput
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </Field>
            <Field label="Tags (comma separated)">
              <TextInput
                value={draft.tagsText}
                placeholder="React, Node.js, TypeScript"
                onChange={(e) =>
                  setDraft({ ...draft, tagsText: e.target.value })
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

      <div className="grid gap-3">
        {items.map((s) => (
          <Card key={s.id} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-neutral-500">{s.tags?.join(" · ")}</p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                onClick={() =>
                  setDraft({
                    id: s.id,
                    title: s.title,
                    tagsText: (s.tags ?? []).join(", "),
                  })
                }
              >
                <Pencil size={15} />
              </Button>
              <Button
                variant="danger"
                onClick={() => s.id && removeItem(COLLECTIONS.services, s.id)}
              >
                <Trash2 size={15} />
              </Button>
            </div>
          </Card>
        ))}
        {items.length === 0 && !draft && (
          <p className="text-sm text-neutral-500">No services yet.</p>
        )}
      </div>
    </AdminShell>
  );
}
