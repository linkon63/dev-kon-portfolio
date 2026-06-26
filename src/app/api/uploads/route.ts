import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized, badRequest } from "@/lib/api-helpers";
import { optimizeImage } from "@/lib/image-optimizer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/uploads — store an uploaded file in Postgres and return its URL.
// Admin only. Replaces Firebase Storage. Body is multipart/form-data with
// `file` (the File) and optional `folder`.
export async function POST(req: Request) {
  if (!(await isAdmin())) return unauthorized();

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!form || !(file instanceof File)) return badRequest("Missing file");

  const folder = (form.get("folder") as string) || "uploads";
  const originalBytes = Buffer.from(await file.arrayBuffer());
  const originalType = file.type || "application/octet-stream";

  // Optimize image on the fly
  const { data: bytes, contentType } = await optimizeImage(
    originalBytes,
    originalType
  );

  // If optimized to webp, adjust the filename extension
  let filename = file.name;
  if (contentType === "image/webp" && !filename.toLowerCase().endsWith(".webp")) {
    const extIndex = filename.lastIndexOf(".");
    if (extIndex !== -1) {
      filename = filename.substring(0, extIndex) + ".webp";
    } else {
      filename = filename + ".webp";
    }
  }

  const upload = await prisma.upload.create({
    data: {
      folder,
      filename,
      contentType,
      data: new Uint8Array(bytes),
    },
    select: { id: true },
  });

  return Response.json({ url: `/api/uploads/${upload.id}` }, { status: 201 });
}
