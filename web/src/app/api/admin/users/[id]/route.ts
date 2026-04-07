import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

const VALID_ROLES = ["SUPERADMIN", "EDITOR", "VIEWER"];

async function getActiveSuperAdminCount() {
  return prisma.adminUser.count({ where: { role: "SUPERADMIN", isActive: true } });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("SUPERADMIN");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const user = await prisma.adminUser.findUnique({
    where: { id: Number(id) },
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

  if (!user) {
    return NextResponse.json({ error: "找不到使用者" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("SUPERADMIN");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const numericId = Number(id);
  const body = await req.json();
  const currentUserId = Number((auth.session as { user?: { id?: string } }).user?.id);
  const existing = await prisma.adminUser.findUnique({ where: { id: numericId } });

  if (!existing) {
    return NextResponse.json({ error: "找不到使用者" }, { status: 404 });
  }
  if (body.role && !VALID_ROLES.includes(String(body.role))) {
    return NextResponse.json({ error: "無效角色" }, { status: 400 });
  }

  const nextRole = (body.role ?? existing.role) as "SUPERADMIN" | "EDITOR" | "VIEWER";
  const nextIsActive = body.isActive !== undefined ? Boolean(body.isActive) : existing.isActive;
  if (existing.role === "SUPERADMIN" && (!nextIsActive || nextRole !== "SUPERADMIN")) {
    const count = await getActiveSuperAdminCount();
    if (count <= 1) {
      return NextResponse.json({ error: "至少需要保留一位啟用中的超級管理員" }, { status: 400 });
    }
  }
  if (currentUserId === numericId && body.isActive === false) {
    return NextResponse.json({ error: "不能停用自己的帳號" }, { status: 400 });
  }

  const data: Record<string, unknown> = {
    email: body.email ? String(body.email).trim().toLowerCase() : undefined,
    name: body.name ? String(body.name).trim() : undefined,
    role: body.role ?? undefined,
    isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined,
  };

  if (body.password) {
    if (String(body.password).length < 8) {
      return NextResponse.json({ error: "密碼至少 8 個字元" }, { status: 400 });
    }
    data.password = await bcrypt.hash(String(body.password), 12);
  }

  try {
    const user = await prisma.adminUser.update({
      where: { id: numericId },
      data,
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

    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email 已存在" }, { status: 400 });
    }
    return NextResponse.json({ error: "更新使用者失敗" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("SUPERADMIN");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const numericId = Number(id);
  const currentUserId = Number((auth.session as { user?: { id?: string } }).user?.id);
  const existing = await prisma.adminUser.findUnique({ where: { id: numericId } });

  if (!existing) {
    return NextResponse.json({ error: "找不到使用者" }, { status: 404 });
  }
  if (currentUserId === numericId) {
    return NextResponse.json({ error: "不能刪除自己的帳號" }, { status: 400 });
  }
  if (existing.role === "SUPERADMIN") {
    const count = await getActiveSuperAdminCount();
    if (count <= 1) {
      return NextResponse.json({ error: "至少需要保留一位啟用中的超級管理員" }, { status: 400 });
    }
  }

  await prisma.adminUser.delete({ where: { id: numericId } });
  return NextResponse.json({ success: true });
}