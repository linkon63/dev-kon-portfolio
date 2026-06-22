import {
  delegateFor,
  isCollection,
  pickFields,
  serializeRow,
} from "@/lib/content-config";
import { isAdmin, unauthorized, badRequest } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ collection: string; id: string }> };

// PATCH /api/content/:collection/:id — update an item. Admin only.
export async function PATCH(req: Request, { params }: Ctx) {
  const { collection, id } = await params;
  if (!isCollection(collection)) return badRequest("Unknown collection");
  if (!(await isAdmin())) return unauthorized();

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const data = pickFields(collection, body);

  const updated = await delegateFor(collection).update({ where: { id }, data });
  return Response.json(serializeRow(updated));
}

// DELETE /api/content/:collection/:id — remove an item. Admin only.
export async function DELETE(_req: Request, { params }: Ctx) {
  const { collection, id } = await params;
  if (!isCollection(collection)) return badRequest("Unknown collection");
  if (!(await isAdmin())) return unauthorized();

  await delegateFor(collection).delete({ where: { id } });
  return Response.json({ ok: true });
}
