import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const where: any = {
    ...(category ? { category } : {}),
  };

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { content: { contains: search } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        category: true,
        title: true,
        description: true,
        content: true,
        imageUrl: true,
        readTime: true,
        isPublished: true,
        publishedAt: true,
        seoTitle: true,
        seoDescription: true,
        imageAlt: true,
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { category, title, description, content, imageUrl, readTime, isPublished, publishedAt, seoTitle, seoDescription, imageAlt } =
    await req.json();

  if (!category || !title || !description) {
    return NextResponse.json({ error: "類別、標題、摘要為必填" }, { status: 400 });
  }

  const categoryExists = await prisma.blogCategory.findFirst({ where: { name: String(category) } });
  if (!categoryExists) {
    return NextResponse.json({ error: "無效類別" }, { status: 400 });
  }

  const post = await prisma.blogPost.create({
    data: {
      category,
      title: String(title).slice(0, 200),
      description: String(description),
      content: content ?? null,
      imageUrl: imageUrl ?? null,
      readTime: readTime ? Number(readTime) : 5,
      isPublished: isPublished ?? true,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      seoTitle: seoTitle ? String(seoTitle).slice(0, 70) : null,
      seoDescription: seoDescription ? String(seoDescription).slice(0, 160) : null,
      imageAlt: imageAlt ? String(imageAlt).slice(0, 200) : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
