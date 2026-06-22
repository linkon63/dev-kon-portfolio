/**
 * Upload a file to the server (stored in Postgres via Prisma) and return its
 * public URL (`/api/uploads/:id`). Used for project/blog images and the resume
 * PDF. Replaces the former Firebase Storage upload; signature is unchanged.
 */
export async function uploadFile(folder: string, file: File): Promise<string> {
  const body = new FormData();
  body.append("folder", folder);
  body.append("file", file);

  const res = await fetch("/api/uploads", { method: "POST", body });
  if (!res.ok) {
    const msg = await res
      .json()
      .then((b) => (b as { error?: string }).error)
      .catch(() => null);
    throw new Error(msg || `Upload failed (${res.status})`);
  }
  const { url } = (await res.json()) as { url: string };
  return url;
}
