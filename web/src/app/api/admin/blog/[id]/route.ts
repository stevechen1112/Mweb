import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id: Number(id) } });
  if (!post) return NextResponse.json({ error: "找不到文章" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const data = await req.json();

  if (data.category !== undefined) {
    const categoryExists = await prisma.blogCategory.findFirst({ where: { name: String(data.category) } });
    if (!categoryExists) {
      return NextResponse.json({ error: "無效類別" }, { status: 400 });
    }
  }

  const post = await prisma.blogPost.update({
    where: { id: Number(id) },
    data: {
      category: data.category ?? undefined,
      title: data.title ? String(data.title).slice(0, 200) : undefined,
      description: data.description ?? undefined,
      content: data.content !== undefined ? data.content : undefined,
      imageUrl: data.imageUrl !== undefined ? data.imageUrl : undefined,
      readTime: data.readTime ? Number(data.readTime) : undefined,
      isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : undefined,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      seoTitle: data.seoTitle !== undefined ? (data.seoTitle ? String(data.seoTitle).slice(0, 70) : null) : undefined,
      seoDescription: data.seoDescription !== undefined ? (data.seoDescription ? String(data.seoDescription).slice(0, 160) : null) : undefined,
      imageAlt: data.imageAlt !== undefined ? (data.imageAlt ? String(data.imageAlt).slice(0, 200) : null) : undefined,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  await prisma.blogPost.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
