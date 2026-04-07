import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fallbackCourses } from "@/lib/content-fallback";

export async function GET() {
  try {
    const items = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });

    if (items.length === 0) {
      return NextResponse.json({ items: fallbackCourses });
    }

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: fallbackCourses });
  }
}