"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Link2 } from "lucide-react";
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
import {
  listCollection,
  createItem,
  updateItem,
  removeItem,
} from "@/lib/collections";
import {
  COLLECTIONS,
  type Experience,
  type ExperienceLink,
} from "@/lib/types";
import { seedExperiences } from "@/lib/seedData";

type Draft = {
  id?: string;
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  period: string;
  duration: string;
  current: boolean;
  order: number;
  highlightsText: string;
  stackText: string;
  links: ExperienceLink[];
};

const EMPTY: Draft = {
  role: "",
  company: "",
  companyUrl: "",
  location: "",
  period: "",
  duration: "",
  current: false,
  order: 0,
  highlightsText: "",
  stackText: "",
  links: [],
};

const toDraft = (e: Experience): Draft => ({
  id: e.id,
  role: e.role,
  company: e.company,
  companyUrl: e.companyUrl ?? "",
  location: e.location,
  period: e.period,
  duration: e.duration ?? "",
  current: e.current ?? false,
  order: e.order ?? 0,
  highlightsText: (e.highlights ?? []).join("\n"),
  stackText: (e.stack ?? []).join(", "),
  links: e.links ?? [],
});

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState(false);

  const reload = useCallback(
    () =>
      listCollection<Experience>(COLLECTIONS.experiences).then((rows) =>
        setItems(
          [...rows].sort(
            (a, b) =>
              (a.order ?? 0) - (b.order ?? 0) ||
              (b.createdAt ?? 0) - (a.createdAt ?? 0),
          ),
        ),
      ),
    [],
  );

  useEffect(() => {
    reload().catch(() => {});
  }, [reload]);

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const data: Omit<Experience, "id"> = {
        role: draft.role,
        company: draft.company,
        companyUrl: draft.companyUrl.trim(),
        location: draft.location,
        period: draft.period,
        duration: draft.duration.trim(),
        current: draft.current,
        order: Number(draft.order) || 0,
        highlights: draft.highlightsText
          .split("\n")
          .map((h) => h.trim())
          .filter(Boolean),
        stack: draft.stackText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        links: draft.links
          .map((l) => ({ label: l.label.trim(), url: l.url.trim() }))
          .filter((l) => l.label && l.url),
      };
      if (draft.id) await updateItem(COLLECTIONS.experiences, draft.id, data);
      else await createItem(COLLECTIONS.experiences, data);
      await reload();
      setDraft(null);
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete?.id) return;
    setDeleting(true);
    try {
      await removeItem(COLLECTIONS.experiences, toDelete.id);
      await reload();
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const seed = async () => {
    setBusy(true);
    try {
      for (const e of seedExperiences)
        await createItem(COLLECTIONS.experiences, e);
      await reload();
    } finally {
      setBusy(false);
    }
  };

  const setLink = (i: number, patch: Partial<ExperienceLink>) =>
    setDraft((d) =>
      d
        ? {
            ...d,
            links: d.links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)),
          }
        : d,
    );

  const addLink = () =>
    setDraft((d) =>
      d ? { ...d, links: [...d.links, { label: "", url: "" }] } : d,
    );

  const removeLink = (i: number) =>
    setDraft((d) =>
      d ? { ...d, links: d.links.filter((_, idx) => idx !== i) } : d,
    );

  return (
    <AdminShell title="Experience">
      <div className="mb-5 flex flex-wrap gap-3">
        <Button onClick={() => setDraft({ ...EMPTY, order: items.length })}>
          <Plus size={16} /> New experience
        </Button>
        {items.length === 0 && (
          <Button variant="ghost" onClick={seed} disabled={busy}>
            Seed from existing
          </Button>
        )}
      </div>

      <div className="grid gap-3">
        {items.map((e) => (
          <Card key={e.id} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{e.role}</p>
                {e.current && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    Current
                  </span>
                )}
                <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-500">
                  #{e.order ?? 0}
                </span>
              </div>
              <p className="text-sm text-neutral-500">
                {e.company} · {e.location} · {e.period}
              </p>
              {e.links && e.links.length > 0 && (
                <p className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                  <Link2 size={12} /> {e.links.length} link
                  {e.links.length > 1 ? "s" : ""}
                </p>
              )}
            </div>
            <div className="flex shrink-0 gap-1">
              <Button variant="ghost" onClick={() => setDraft(toDraft(e))}>
                <Pencil size={15} />
              </Button>
              <Button variant="danger" onClick={() => setToDelete(e)}>
                <Trash2 size={15} />
              </Button>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-neutral-500">No experience entries yet.</p>
        )}
      </div>

      <Modal
        open={!!draft}
        onClose={() => !busy && setDraft(null)}
        title={draft?.id ? "Edit experience" : "New experience"}
      >
        {draft && (
          <div className="grid gap-4">
            <Field label="Role / Title">
              <TextInput
                value={draft.role}
                placeholder="Team Lead — Software Engineer"
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Company">
                <TextInput
                  value={draft.company}
                  placeholder="Softzino Technologies"
                  onChange={(e) =>
                    setDraft({ ...draft, company: e.target.value })
                  }
                />
              </Field>
              <Field label="Company link (optional)">
                <TextInput
                  value={draft.companyUrl}
                  placeholder="https://company.com"
                  onChange={(e) =>
                    setDraft({ ...draft, companyUrl: e.target.value })
                  }
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Location">
                <TextInput
                  value={draft.location}
                  placeholder="Dhaka, Bangladesh"
                  onChange={(e) =>
                    setDraft({ ...draft, location: e.target.value })
                  }
                />
              </Field>
              <Field label="Period / Year">
                <TextInput
                  value={draft.period}
                  placeholder="May 2021 — Present"
                  onChange={(e) =>
                    setDraft({ ...draft, period: e.target.value })
                  }
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Duration (optional)">
                <TextInput
                  value={draft.duration}
                  placeholder="5 yrs +"
                  onChange={(e) =>
                    setDraft({ ...draft, duration: e.target.value })
                  }
                />
              </Field>
              <Field label="Display order">
                <TextInput
                  type="number"
                  value={draft.order}
                  onChange={(e) =>
                    setDraft({ ...draft, order: Number(e.target.value) })
                  }
                />
              </Field>
              <label className="flex items-end gap-2 pb-2.5">
                <input
                  type="checkbox"
                  checked={draft.current}
                  onChange={(e) =>
                    setDraft({ ...draft, current: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-neutral-300"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Current role
                </span>
              </label>
            </div>

            <Field label="Highlights (one per line)">
              <TextArea
                rows={4}
                value={draft.highlightsText}
                placeholder={"Led a team of 5+ engineers…\nDesigned scalable SaaS architecture…"}
                onChange={(e) =>
                  setDraft({ ...draft, highlightsText: e.target.value })
                }
              />
            </Field>

            <Field label="Tech stack (comma separated)">
              <TextInput
                value={draft.stackText}
                placeholder="Node.js, React.js, Docker, AWS"
                onChange={(e) =>
                  setDraft({ ...draft, stackText: e.target.value })
                }
              />
            </Field>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">
                  Project links
                </span>
                <Button variant="ghost" onClick={addLink}>
                  <Plus size={14} /> Add link
                </Button>
              </div>
              <div className="grid gap-2">
                {draft.links.length === 0 && (
                  <p className="text-xs text-neutral-400">
                    No project links. Add labelled links (e.g. “Live demo”,
                    “Case study”).
                  </p>
                )}
                {draft.links.map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TextInput
                      value={link.label}
                      placeholder="Label"
                      className="max-w-[10rem]"
                      onChange={(e) => setLink(i, { label: e.target.value })}
                    />
                    <TextInput
                      value={link.url}
                      placeholder="https://…"
                      onChange={(e) => setLink(i, { url: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => removeLink(i)}
                      aria-label="Remove link"
                      className="shrink-0 rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={save} disabled={busy}>
                <Save size={16} /> {busy ? "Saving…" : "Save"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => !busy && setDraft(null)}
                disabled={busy}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        message={`Delete the “${toDelete?.role ?? ""}” experience? This can't be undone.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </AdminShell>
  );
}
