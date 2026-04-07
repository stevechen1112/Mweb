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
  const course = await prisma.course.findUnique({ where: { id: Number(id) } });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }
  return NextResponse.json(course);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const data = await req.json();

  const course = await prisma.course.update({
    where: { id: Number(id) },
    data: {
      slug: data.slug ? String(data.slug) : undefined,
      titleEn: data.titleEn ? String(data.titleEn) : undefined,
      titleZh: data.titleZh ? String(data.titleZh) : undefined,
      subtitle: data.subtitle !== undefined ? data.subtitle : undefined,
      intro: data.intro ? String(data.intro) : undefined,
      targets: data.targets ?? undefined,
      modules: data.modules ?? undefined,
      bannerImage: data.bannerImage !== undefined ? data.bannerImage : undefined,
      isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : undefined,
      sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : undefined,
      seoTitle: data.seoTitle !== undefined ? (data.seoTitle ? String(data.seoTitle).slice(0, 70) : null) : undefined,
      seoDescription: data.seoDescription !== undefined ? (data.seoDescription ? String(data.seoDescription).slice(0, 160) : null) : undefined,
      imageAlt: data.imageAlt !== undefined ? (data.imageAlt ? String(data.imageAlt).slice(0, 200) : null) : undefined,
    },
  });

  return NextResponse.json(course);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  await prisma.course.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
