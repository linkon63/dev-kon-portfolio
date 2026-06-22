"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card, Field, TextInput, TextArea } from "@/components/admin/ui";
import {
  subscribeCollection,
  createItem,
  updateItem,
  removeItem,
} from "@/lib/collections";
import { COLLECTIONS, type Testimonial } from "@/lib/types";
import { seedTestimonials } from "@/lib/seedData";

const EMPTY: Testimonial = { quote: "", name: "", role: "" };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [draft, setDraft] = useState<Testimonial | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(
    () => subscribeCollection<Testimonial>(COLLECTIONS.testimonials, setItems),
    [],
  );

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const { id, ...data } = draft;
      if (id) await updateItem(COLLECTIONS.testimonials, id, data);
      else await createItem(COLLECTIONS.testimonials, data);
      setDraft(null);
    } finally {
      setBusy(false);
    }
  };

  const seed = async () => {
    setBusy(true);
    try {
      for (const t of seedTestimonials)
        await createItem(COLLECTIONS.testimonials, t);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Testimonials">
      <div className="mb-5 flex gap-3">
        <Button onClick={() => setDraft({ ...EMPTY })}>
          <Plus size={16} /> New testimonial
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
            <Field label="Quote">
              <TextArea
                rows={3}
                value={draft.quote}
                onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <TextInput
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </Field>
              <Field label="Role">
                <TextInput
                  value={draft.role}
                  onChange={(e) => setDraft({ ...draft, role: e.target.value })}
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

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((t) => (
          <Card key={t.id} className="flex flex-col gap-3">
            <p className="text-sm text-neutral-700">“{t.quote}”</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.role}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" onClick={() => setDraft(t)}>
                  <Pencil size={15} />
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    t.id && removeItem(COLLECTIONS.testimonials, t.id)
                  }
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && !draft && (
          <p className="text-sm text-neutral-500">No testimonials yet.</p>
        )}
      </div>
    </AdminShell>
  );
}
