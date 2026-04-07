import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fallbackBlogPosts } from "@/lib/content-fallback";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  try {
    const item = await prisma.blogPost.findFirst({
      where: { id: numId, isPublished: true },
    });

    if (item) {
      return NextResponse.json({ item });
    }
  } catch {
    // fall through to fallback
  }

  const fallback = fallbackBlogPosts.find((p) => p.id === numId);
  if (fallback) {
    return NextResponse.json({ item: fallback });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
