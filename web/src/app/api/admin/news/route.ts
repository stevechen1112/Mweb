import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const whereClause = search
    ? {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { content: { contains: search } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.newsPost.findMany({
      where: whereClause,
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.newsPost.count({ where: whereClause }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { title, description, content, imageUrl, isPublished, publishedAt, seoTitle, seoDescription, imageAlt } = await req.json();
  if (!title || (!description && !content)) {
    return NextResponse.json({ error: "標題為必填" }, { status: 400 });
  }

  const post = await prisma.newsPost.create({
    data: {
      title: String(title).slice(0, 200),
      description: String(description || ""),
      content: content ? String(content) : null,
      imageUrl: imageUrl ?? null,
      isPublished: isPublished ?? true,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      seoTitle: seoTitle ? String(seoTitle).slice(0, 70) : null,
      seoDescription: seoDescription ? String(seoDescription).slice(0, 160) : null,
      imageAlt: imageAlt ? String(imageAlt).slice(0, 200) : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
