import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getFallbackCourseBySlug } from "@/lib/content-fallback";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const item = await prisma.course.findFirst({
      where: { slug, isPublished: true },
    });

    if (!item) {
      return NextResponse.json({ item: getFallbackCourseBySlug(slug) });
    }

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ item: getFallbackCourseBySlug(slug) });
  }
}