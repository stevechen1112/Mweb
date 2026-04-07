import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

// GET /api/admin/news/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const post = await prisma.newsPost.findUnique({ where: { id: Number(id) } });
  
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

// PUT /api/admin/news/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const data = await req.json();

  const post = await prisma.newsPost.update({
    where: { id: Number(id) },
    data: {
      title: data.title ? String(data.title).slice(0, 200) : undefined,
      description: data.description !== undefined ? String(data.description) : undefined,
      content: data.content !== undefined ? (data.content ? String(data.content) : null) : undefined,
      imageUrl: data.imageUrl !== undefined ? data.imageUrl : undefined,
      isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : undefined,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      seoTitle: data.seoTitle !== undefined ? (data.seoTitle ? String(data.seoTitle).slice(0, 70) : null) : undefined,
      seoDescription: data.seoDescription !== undefined ? (data.seoDescription ? String(data.seoDescription).slice(0, 160) : null) : undefined,
      imageAlt: data.imageAlt !== undefined ? (data.imageAlt ? String(data.imageAlt).slice(0, 200) : null) : undefined,
    },
  });

  return NextResponse.json(post);
}

// DELETE /api/admin/news/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  await prisma.newsPost.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
