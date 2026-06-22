import { isAdmin } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/session — report whether the current request is authenticated.
export async function GET() {
  return Response.json({ authed: await isAdmin() });
}
