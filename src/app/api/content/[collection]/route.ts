import {
  delegateFor,
  isCollection,
  pickFields,
  serializeRow,
} from "@/lib/content-config";
import { isAdmin, unauthorized, badRequest } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ collection: string }> };

// GET /api/content/:collection — list items newest-first. Public.
export async function GET(_req: Request, { params }: Ctx) {
  const { collection } = await params;
  if (!isCollection(collection)) return badRequest("Unknown collection");

  const rows = await delegateFor(collection).findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(rows.map(serializeRow));
}

// POST /api/content/:collection — create an item. Admin only.
export async function POST(req: Request, { params }: Ctx) {
  const { collection } = await params;
  if (!isCollection(collection)) return badRequest("Unknown collection");
  if (!(await isAdmin())) return unauthorized();

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const data = pickFields(collection, body);
  if (Object.keys(data).length === 0) return badRequest("No valid fields");

  const created = await delegateFor(collection).create({ data });
  return Response.json(serializeRow(created), { status: 201 });
}
