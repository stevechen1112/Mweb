import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

const VALID_ROLES = ["SUPERADMIN", "EDITOR", "VIEWER"];

export async function GET() {
  const auth = await requireRole("SUPERADMIN");
  if (!auth.authorized) return auth.response;

  const users = await prisma.adminUser.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const auth = await requireRole("SUPERADMIN");
  if (!auth.authorized) return auth.response;

  const { email, name, password, role, isActive } = await req.json();
  if (!email || !name || !password) {
    return NextResponse.json({ error: "姓名、Email、密碼為必填" }, { status: 400 });
  }
  if (String(password).length < 8) {
    return NextResponse.json({ error: "密碼至少 8 個字元" }, { status: 400 });
  }
  if (role && !VALID_ROLES.includes(String(role))) {
    return NextResponse.json({ error: "無效角色" }, { status: 400 });
  }

  try {
    const user = await prisma.adminUser.create({
      data: {
        email: String(email).trim().toLowerCase(),
        name: String(name).trim(),
        password: await bcrypt.hash(String(password), 12),
        role: (role ?? "EDITOR") as "SUPERADMIN" | "EDITOR" | "VIEWER",
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email 已存在" }, { status: 400 });
    }
    return NextResponse.json({ error: "建立使用者失敗" }, { status: 500 });
  }
}