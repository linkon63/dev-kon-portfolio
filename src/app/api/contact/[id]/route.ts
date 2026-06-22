import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/contact/:id — mark read/unread. Admin only.
export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { read?: boolean };

  const updated = await prisma.contactMessage.update({
    where: { id },
    data: { read: body.read ?? true },
  });
  return Response.json({ id: updated.id, read: updated.read });
}

// DELETE /api/contact/:id — remove a message. Admin only.
export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  await prisma.contactMessage.delete({ where: { id } });
  return Response.json({ ok: true });
}
