import { prisma } from "@/lib/prisma";
import { badRequest } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

interface CommentNode {
  id: string;
  blogId: string;
  name: string;
  email: string;
  content: string;
  parentId: string | null;
  createdAt: number;
  replies: CommentNode[];
}

// GET /api/blogs/[slug]/comments — retrieve all nested comments & replies for a blog post
export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return badRequest("Blog post not found");

  const comments = await prisma.comment.findMany({
    where: { blogId: blog.id },
    orderBy: { createdAt: "asc" }, // oldest/root comments first
  });

  // Build comments tree
  const map: Record<string, CommentNode> = {};
  const roots: CommentNode[] = [];

  comments.forEach((c) => {
    map[c.id] = {
      id: c.id,
      blogId: c.blogId,
      name: c.name,
      email: c.email,
      content: c.content,
      parentId: c.parentId,
      createdAt: c.createdAt.getTime(),
      replies: [],
    };
  });

  comments.forEach((c) => {
    const node = map[c.id];
    if (c.parentId && map[c.parentId]) {
      map[c.parentId].replies.push(node);
    } else {
      roots.push(node);
    }
  });

  return Response.json(roots);
}

// POST /api/blogs/[slug]/comments — submit a comment or reply
export async function POST(req: Request, { params }: Ctx) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return badRequest("Blog post not found");
  if (!blog.allowComments) return badRequest("Comments are disabled for this post");

  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    email?: string;
    content?: string;
    parentId?: string | null;
  };

  const name = body.name?.trim();
  const email = body.email?.trim();
  const content = body.content?.trim();
  const parentId = body.parentId || null;

  if (!name) return badRequest("Name is required");
  if (!email || !/\S+@\S+\.\S+/.test(email)) return badRequest("A valid email is required");
  if (!content) return badRequest("Content is required");

  // Validate parentId if provided
  if (parentId) {
    const parentComment = await prisma.comment.findUnique({ where: { id: parentId } });
    if (!parentComment) return badRequest("Parent comment not found");
  }

  const comment = await prisma.comment.create({
    data: {
      blogId: blog.id,
      name,
      email,
      content,
      parentId,
    },
  });

  return Response.json({
    id: comment.id,
    blogId: comment.blogId,
    name: comment.name,
    email: comment.email,
    content: comment.content,
    parentId: comment.parentId,
    createdAt: comment.createdAt.getTime(),
    replies: [],
  }, { status: 201 });
}
