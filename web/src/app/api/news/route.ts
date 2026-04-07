import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fallbackNewsPosts } from "@/lib/content-fallback";

export async function GET() {
  try {
    const items = await prisma.newsPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });

    if (items.length === 0) {
      return NextResponse.json({ items: fallbackNewsPosts });
    }

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: fallbackNewsPosts });
  }
}