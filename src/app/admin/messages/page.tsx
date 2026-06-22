"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, Reply, RefreshCw } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card, ConfirmDialog } from "@/components/admin/ui";

type Message = {
  id: string;
  name: string;
  email: string;
  project: string;
  read: boolean;
  createdAt: number;
};

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState<Message | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(
    () =>
      fetch("/api/contact")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load messages.");
          return res.json() as Promise<Message[]>;
        })
        .then((data) => {
          setItems(data);
          setError("");
        })
        .catch((e) =>
          setError(e instanceof Error ? e.message : "Failed to load messages."),
        )
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    load();
  }, [load]);

  const reload = () => {
    setLoading(true);
    load();
  };

  const setRead = async (m: Message, read: boolean) => {
    setItems((list) =>
      list.map((x) => (x.id === m.id ? { ...x, read } : x)),
    );
    await fetch(`/api/contact/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    }).catch(() => {});
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await fetch(`/api/contact/${toDelete.id}`, { method: "DELETE" });
      await reload();
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const unread = items.filter((m) => !m.read).length;

  return (
    <AdminShell title="Messages">
      <div className="mb-5 flex items-center gap-3">
        <p className="text-sm text-neutral-500">
          {items.length} total
          {unread > 0 && (
            <span className="ml-2 rounded-full bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white">
              {unread} unread
            </span>
          )}
        </p>
        <Button variant="ghost" onClick={reload} disabled={loading}>
          <RefreshCw size={15} /> Refresh
        </Button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="grid gap-3">
        {items.map((m) => (
          <Card
            key={m.id}
            className={`flex flex-col gap-3 ${m.read ? "" : "border-neutral-900/30 bg-neutral-50"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-neutral-900" />
                  )}
                  <p className="truncate font-semibold">{m.name}</p>
                </div>
                <a
                  href={`mailto:${m.email}`}
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  {m.email}
                </a>
              </div>
              <span className="shrink-0 text-xs text-neutral-400">
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="whitespace-pre-wrap text-sm text-neutral-700">
              {m.project}
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${m.email}?subject=${encodeURIComponent(
                  "Re: your message",
                )}`}
              >
                <Button variant="ghost">
                  <Reply size={15} /> Reply
                </Button>
              </a>
              <Button variant="ghost" onClick={() => setRead(m, !m.read)}>
                {m.read ? <Mail size={15} /> : <MailOpen size={15} />}
                {m.read ? "Mark unread" : "Mark read"}
              </Button>
              <Button variant="danger" onClick={() => setToDelete(m)}>
                <Trash2 size={15} /> Delete
              </Button>
            </div>
          </Card>
        ))}
        {!loading && items.length === 0 && (
          <p className="text-sm text-neutral-500">No messages yet.</p>
        )}
        {loading && items.length === 0 && (
          <p className="text-sm text-neutral-400">Loading…</p>
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        message={`Delete the message from “${toDelete?.name ?? ""}”? This can't be undone.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </AdminShell>
  );
}
