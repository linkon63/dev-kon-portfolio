"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, ImageIcon, RotateCcw, Heart } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card, ConfirmDialog } from "@/components/admin/ui";
import { listCollection, updateItem, removeItem } from "@/lib/collections";
import { COLLECTIONS, type Blog } from "@/lib/types";

export default function AdminBlogsPage() {
  const [items, setItems] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(
    () => listCollection<Blog>(COLLECTIONS.blogs).then(setItems),
    [],
  );

  useEffect(() => {
    reload().catch((e) =>
      setError(e instanceof Error ? e.message : "Failed to load blogs."),
    );
  }, [reload]);

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

  const reactivate = async (b: Blog) => {
    if (!b.id || busy) return;
    setBusy(true);
    try {
      await updateItem(COLLECTIONS.blogs, b.id, { active: true });
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to reactivate blog.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Thoughts / Blogs">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin/blogs/create">
          <Button>
            <Plus size={16} /> Create blog
          </Button>
        </Link>
      </div>

      {error && (
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
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-neutral-900 truncate">{b.title}</p>
                <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-500 font-mono">
                  /{b.slug}
                </span>
                {b.active === false ? (
                  <span className="rounded bg-red-50 border border-red-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-600">
                    Inactive (Soft-Deleted)
                  </span>
                ) : (
                  <span className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">{b.date}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                  <Heart size={12} className="text-red-500 fill-red-500" />
                  {b.likes || 0} likes
                </span>
                <span className="text-xs text-neutral-400">
                  {b.allowComments ? "Comments on" : "Comments off"} · {b.allowLikes ? "Likes on" : "Likes off"}
                </span>
              </div>
            </div>
            
            <Link href={`/admin/blogs/edit/${b.id}`}>
              <Button variant="ghost">
                <Pencil size={15} />
              </Button>
            </Link>

            {b.active === false ? (
              <Button
                variant="ghost"
                onClick={() => reactivate(b)}
                disabled={busy}
                className="text-emerald-600 hover:bg-emerald-50 border border-emerald-300"
                title="Reactivate Blog"
              >
                <RotateCcw size={15} />
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={() => setToDelete(b)}
                title="Soft Delete Blog"
              >
                <Trash2 size={15} />
              </Button>
            )}
          </Card>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-neutral-500">
            No blogs yet — click Create Blog to create one.
          </p>
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        message={`Soft delete the blog “${toDelete?.title ?? ""}”? Readers won't be able to access it, but you can reactivate it later.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </AdminShell>
  );
}
