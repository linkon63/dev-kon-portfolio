import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// GET /api/uploads/:id — serve a stored file. Public.
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const upload = await prisma.upload.findUnique({ where: { id } });
  if (!upload) return new Response("Not found", { status: 404 });

  return new Response(Buffer.from(upload.data), {
    headers: {
      "Content-Type": upload.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="${upload.filename}"`,
    },
  });
}
