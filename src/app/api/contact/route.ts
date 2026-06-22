import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email";
import { isAdmin, unauthorized, badRequest } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact — submit the "Let's talk" form. Public.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const project = String(body.project ?? "").trim();

  if (!name || !email || !project) {
    return badRequest("Name, email and message are required.");
  }
  if (!EMAIL_RE.test(email)) return badRequest("Please enter a valid email.");
  if (name.length > 200 || email.length > 200 || project.length > 5000) {
    return badRequest("Submission is too long.");
  }

  // Always persist the message first.
  await prisma.contactMessage.create({ data: { name, email, project } });

  // Then try to email — best-effort, never fail the submission on email errors.
  let emailed = false;
  try {
    const res = await sendContactEmail({ name, email, project });
    emailed = res.sent;
  } catch (e) {
    console.error("Contact email failed:", e);
  }

  return Response.json({ ok: true, emailed }, { status: 201 });
}

// GET /api/contact — list submissions for the admin inbox. Admin only.
export async function GET() {
  if (!(await isAdmin())) return unauthorized();

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(
    messages.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      project: m.project,
      read: m.read,
      createdAt: m.createdAt.getTime(),
    })),
  );
}
