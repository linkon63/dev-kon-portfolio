import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized, badRequest } from "@/lib/api-helpers";

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
  const bytes = Buffer.from(await file.arrayBuffer());

  const upload = await prisma.upload.create({
    data: {
      folder,
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      data: bytes,
    },
    select: { id: true },
  });

  return Response.json({ url: `/api/uploads/${upload.id}` }, { status: 201 });
}
