"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Save, Upload, RotateCcw } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card, Field, TextInput, TextArea } from "@/components/admin/ui";
import {
  listCollection,
  createItem,
  updateItem,
} from "@/lib/collections";
import { uploadFile } from "@/lib/storage";
import { COLLECTIONS, type About } from "@/lib/types";
import { seedAbout } from "@/lib/seedData";

const EMPTY: About = {
  greeting: "Hey",
  intro: "",
  bio1: "",
  bio2: "",
  image: "",
  ctaText: "Get in touch",
  ctaHref: "#contact",
};

export default function AdminAboutPage() {
  const [draft, setDraft] = useState<About>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const reload = useCallback(async () => {
    try {
      const rows = await listCollection<About>(COLLECTIONS.about);
      if (rows[0]) setDraft(rows[0]);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    reload().catch(() => {});
  }, [reload]);

  const set = (patch: Partial<About>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setSaved(false);
  };

  const save = async () => {
    setBusy(true);
    try {
      const { id, ...data } = draft;
      if (id) await updateItem(COLLECTIONS.about, id, data);
      else await createItem(COLLECTIONS.about, data);
      await reload();
      setSaved(true);
    } finally {
      setBusy(false);
    }
  };

  const onImage = async (file: File) => {
    setBusy(true);
    try {
      const url = await uploadFile("about", file);
      set({ image: url });
    } finally {
      setBusy(false);
    }
  };

  const loadDefault = () => set({ ...seedAbout, id: draft.id });

  return (
    <AdminShell title="About">
      <Card className="max-w-3xl">
        {!loaded ? (
          <p className="text-sm text-neutral-500">Loading…</p>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
              <Field label="Greeting">
                <TextInput
                  value={draft.greeting}
                  placeholder="Hey"
                  onChange={(e) => set({ greeting: e.target.value })}
                />
              </Field>
              <Field label="Intro (left column, short)">
                <TextArea
                  rows={2}
                  value={draft.intro}
                  placeholder="I'm Linkon, a Senior Full-Stack Engineer…"
                  onChange={(e) => set({ intro: e.target.value })}
                />
              </Field>
            </div>

            <Field label="Profile image">
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
              <div className="mt-3">
                <TextInput
                  value={draft.image ?? ""}
                  placeholder="…or paste an image URL (e.g. /assets/profileimage.jpg)"
                  onChange={(e) => set({ image: e.target.value })}
                />
              </div>
            </Field>

            <Field label="Bio paragraph 1 (right column)">
              <TextArea
                rows={3}
                value={draft.bio1}
                onChange={(e) => set({ bio1: e.target.value })}
              />
            </Field>
            <Field label="Bio paragraph 2 (right column)">
              <TextArea
                rows={3}
                value={draft.bio2}
                onChange={(e) => set({ bio2: e.target.value })}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="CTA button text">
                <TextInput
                  value={draft.ctaText}
                  placeholder="Get in touch"
                  onChange={(e) => set({ ctaText: e.target.value })}
                />
              </Field>
              <Field label="CTA link">
                <TextInput
                  value={draft.ctaHref}
                  placeholder="#contact"
                  onChange={(e) => set({ ctaHref: e.target.value })}
                />
              </Field>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={save} disabled={busy}>
                <Save size={16} /> {busy ? "Saving…" : "Save"}
              </Button>
              <Button variant="ghost" onClick={loadDefault} disabled={busy}>
                <RotateCcw size={15} /> Load default content
              </Button>
              {saved && (
                <span className="text-sm font-medium text-emerald-600">
                  Saved ✓
                </span>
              )}
            </div>
          </div>
        )}
      </Card>
    </AdminShell>
  );
}
