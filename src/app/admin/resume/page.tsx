"use client";

import { useEffect, useState } from "react";
import { Upload, FileText, ExternalLink, Save } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card, Field, TextInput } from "@/components/admin/ui";
import { uploadFile } from "@/lib/storage";
import { subscribeSettings, saveSettings, type SiteSettings } from "@/lib/collections";

const DEFAULT_RESUME = "/files/Resume-V12.pdf";

export default function AdminResumePage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => subscribeSettings(setSettings), []);

  const current = settings.resumeUrl || DEFAULT_RESUME;

  const onUpload = async (file: File) => {
    setBusy(true);
    setStatus("");
    try {
      const url = await uploadFile("resume", file);
      await saveSettings({ resumeUrl: url, resumeName: file.name });
      setStatus("Resume updated — it's now live across the site.");
    } catch {
      setStatus("Upload failed. Make sure you're signed in and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Resume">
      <Card className="max-w-xl">
        <p className="text-sm text-neutral-600">
          Upload a new PDF to replace the resume linked from the navbar, the
          floating dock and the hero. The latest upload is served everywhere.
        </p>

        <div className="mt-5 flex items-center gap-3 rounded-lg bg-neutral-100 p-3">
          <FileText className="text-neutral-500" size={20} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {settings.resumeName || "Default resume (Resume-V12.pdf)"}
            </p>
            <p className="truncate text-xs text-neutral-500">{current}</p>
          </div>
          <a
            href={current}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-900"
          >
            <ExternalLink size={18} />
          </a>
        </div>

        <div className="mt-5">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
            <Upload size={16} /> {busy ? "Uploading…" : "Upload new resume (PDF)"}
            <input
              type="file"
              accept="application/pdf"
              hidden
              disabled={busy}
              onChange={(e) =>
                e.target.files?.[0] && onUpload(e.target.files[0])
              }
            />
          </label>
        </div>

        <div className="mt-6 border-t border-neutral-200 pt-5">
          <Field label="Or paste a resume URL">
            <div className="flex gap-2">
              <TextInput
                defaultValue={settings.resumeUrl ?? ""}
                placeholder="https://…/resume.pdf"
                onChange={(e) =>
                  setSettings((s) => ({ ...s, resumeUrl: e.target.value }))
                }
              />
              <Button
                onClick={async () => {
                  setBusy(true);
                  await saveSettings({ resumeUrl: settings.resumeUrl });
                  setStatus("Saved.");
                  setBusy(false);
                }}
                disabled={busy}
              >
                <Save size={16} /> Save
              </Button>
            </div>
          </Field>
        </div>

        {status && <p className="mt-4 text-sm text-green-600">{status}</p>}
      </Card>
    </AdminShell>
  );
}
