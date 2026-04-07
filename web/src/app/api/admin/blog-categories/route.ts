import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const categories = await prisma.blogCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });
  
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { name, sortOrder } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "類別名稱為必填" }, { status: 400 });
  }

  try {
    const category = await prisma.blogCategory.create({
      data: {
        name: String(name),
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "該類別名稱已存在" }, { status: 400 });
    }
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
