import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const whereClause = search
    ? {
        OR: [
          { titleZh: { contains: search } },
          { titleEn: { contains: search } },
          { subtitle: { contains: search } },
          { intro: { contains: search } },
        ],
      }
    : {};

  const courses = await prisma.course.findMany({
    where: whereClause,
    orderBy: { sortOrder: "asc" },
  });
  
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { slug, titleEn, titleZh, subtitle, intro, targets, modules, bannerImage, sortOrder, seoTitle, seoDescription, imageAlt } =
    await req.json();

  if (!slug || !titleEn || !titleZh || !intro) {
    return NextResponse.json({ error: "slug、英文/中文標題、介紹為必填" }, { status: 400 });
  }

  const course = await prisma.course.create({
    data: {
      slug: String(slug),
      titleEn: String(titleEn),
      titleZh: String(titleZh),
      subtitle: subtitle ?? null,
      intro: String(intro),
      targets: targets ?? [],
      modules: modules ?? [],
      bannerImage: bannerImage ?? null,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      seoTitle: seoTitle ? String(seoTitle).slice(0, 70) : null,
      seoDescription: seoDescription ? String(seoDescription).slice(0, 160) : null,
      imageAlt: imageAlt ? String(imageAlt).slice(0, 200) : null,
    },
  });

  return NextResponse.json(course, { status: 201 });
}
