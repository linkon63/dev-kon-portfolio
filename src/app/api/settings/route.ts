import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SETTINGS_ID = "site";

// GET /api/settings — public site settings (resume URL/name).
export async function GET() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: SETTINGS_ID },
  });
  return Response.json({
    resumeUrl: settings?.resumeUrl ?? undefined,
    resumeName: settings?.resumeName ?? undefined,
  });
}

// PATCH /api/settings — merge-update settings. Admin only.
export async function PATCH(req: Request) {
  if (!(await isAdmin())) return unauthorized();

  const body = (await req.json().catch(() => ({}))) as {
    resumeUrl?: string;
    resumeName?: string;
  };
  const patch: { resumeUrl?: string; resumeName?: string } = {};
  if (body.resumeUrl !== undefined) patch.resumeUrl = body.resumeUrl;
  if (body.resumeName !== undefined) patch.resumeName = body.resumeName;

  const settings = await prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    update: patch,
    create: { id: SETTINGS_ID, ...patch },
  });
  return Response.json({
    resumeUrl: settings.resumeUrl ?? undefined,
    resumeName: settings.resumeName ?? undefined,
  });
}
