import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// GET /api/uploads/:id — serve a stored file. Public.
// Optional ?format=jpeg|png converts the image on the fly. Social platforms like
// LinkedIn don't render WebP link previews, so OG tags request a JPEG version.
// sharp is imported lazily so that the normal image path keeps working even if
// the native module fails to load in the deployment environment.
export async function GET(req: Request, { params }: Ctx) {
  const { id } = await params;
  const upload = await prisma.upload.findUnique({ where: { id } });
  if (!upload) return new Response("Not found", { status: 404 });

  const data = Buffer.from(upload.data);
  const format = new URL(req.url).searchParams.get("format");

  if (
    (format === "jpeg" || format === "jpg" || format === "png") &&
    upload.contentType.startsWith("image/")
  ) {
    try {
      const { default: sharp } = await import("sharp");
      const isPng = format === "png";
      const converted = isPng
        ? await sharp(data).png().toBuffer()
        : await sharp(data)
            .flatten({ background: "#ffffff" })
            .jpeg({ quality: 85 })
            .toBuffer();
      return new Response(new Uint8Array(converted), {
        headers: {
          "Content-Type": isPng ? "image/png" : "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      // Fall through to serving the original on any conversion failure.
    }
  }

  return new Response(data, {
    headers: {
      "Content-Type": upload.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="${upload.filename}"`,
    },
  });
}
