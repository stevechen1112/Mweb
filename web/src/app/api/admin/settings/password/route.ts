import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "請提供目前密碼與新密碼" }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "新密碼至少 8 個字元" }, { status: 400 });
  }

  const session = auth.session as any;
  const email = session?.user?.email;
  if (!email) return NextResponse.json({ error: "無法識別使用者" }, { status: 401 });

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "使用者不存在" }, { status: 404 });

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) return NextResponse.json({ error: "目前密碼錯誤" }, { status: 400 });

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.adminUser.update({ where: { email }, data: { password: hashed } });

  return NextResponse.json({ success: true });
}
