import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/analytics — log a page view. Public (fire-and-forget).
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const str = (v: unknown, fallback = "unknown") =>
    typeof v === "string" && v ? v : fallback;

  await prisma.analyticsEvent.create({
    data: {
      type: str(body.type, "pageview"),
      path: str(body.path, "/"),
      visitor: str(body.visitor),
      device: str(body.device),
      browser: str(body.browser),
      referrer: str(body.referrer, "direct"),
      lang: str(body.lang),
    },
  });
  return Response.json({ ok: true }, { status: 201 });
}

// GET /api/analytics?days=30 — raw events for the dashboard. Admin only.
export async function GET(req: Request) {
  if (!(await isAdmin())) return unauthorized();

  const days = Number(new URL(req.url).searchParams.get("days")) || 30;
  const since = new Date(Date.now() - days * 86_400_000);
  const events = await prisma.analyticsEvent.findMany({
    where: { ts: { gte: since } },
    orderBy: { ts: "desc" },
  });

  // Return `ts` as epoch milliseconds to match the existing client type.
  return Response.json(
    events.map((e) => ({
      type: e.type,
      path: e.path,
      ts: e.ts.getTime(),
      visitor: e.visitor,
      device: e.device,
      browser: e.browser,
      referrer: e.referrer,
      lang: e.lang,
    })),
  );
}
