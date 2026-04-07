import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fallbackBlogPosts } from "@/lib/content-fallback";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const where = {
      isPublished: true,
      ...(category && category !== "ALL" ? { category } : {}),
    };

    const items = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    if (items.length === 0) {
      const fallbackItems = category && category !== "ALL"
        ? fallbackBlogPosts.filter((post) => post.category === category)
        : fallbackBlogPosts;
      return NextResponse.json({ items: fallbackItems });
    }

    return NextResponse.json({ items });
  } catch {
    const fallbackItems = category && category !== "ALL"
      ? fallbackBlogPosts.filter((post) => post.category === category)
      : fallbackBlogPosts;
    return NextResponse.json({ items: fallbackItems });
  }
}