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
  const category = await prisma.blogCategory.findUnique({
    where: { id: Number(id) },
  });

  if (!category) {
    return NextResponse.json({ error: "找不到該類別" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const data = await req.json();

  try {
    const category = await prisma.blogCategory.update({
      where: { id: Number(id) },
      data: {
        name: data.name ? String(data.name) : undefined,
        sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : undefined,
      },
    });

    return NextResponse.json(category);
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "該類別名稱已存在" }, { status: 400 });
    }
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;

  const category = await prisma.blogCategory.findUnique({ where: { id: Number(id) } });
  if (!category) {
    return NextResponse.json({ error: "找不到該類別" }, { status: 404 });
  }

  const postCount = await prisma.blogPost.count({ where: { category: category.name } });
  if (postCount > 0) {
    return NextResponse.json({ error: "已有文章使用此類別，請先調整文章分類" }, { status: 400 });
  }

  await prisma.blogCategory.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
