import { prisma } from "@/lib/prisma";
import { badRequest } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function POST(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return badRequest("Blog post not found");
  if (!blog.allowLikes) return badRequest("Likes are disabled for this post");

  const updated = await prisma.blog.update({
    where: { slug },
    data: { likes: { increment: 1 } },
  });

  return Response.json({ likes: updated.likes });
}
