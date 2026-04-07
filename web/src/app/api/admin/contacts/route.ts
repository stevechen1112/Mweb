import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

// GET /api/admin/contacts — 取得聯絡表單列表
export async function GET(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const unreadOnly = searchParams.get("unread") === "true";
  const search = searchParams.get("search")?.trim() ?? "";
  const skip = (page - 1) * limit;

  const where: any = {};
  if (unreadOnly) where.isRead = false;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { lineId: { contains: search, mode: "insensitive" } },
      { message: { contains: search, mode: "insensitive" } },
      { category: { contains: search, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, limit });
}
