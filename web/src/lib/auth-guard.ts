import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export type AdminRole = "SUPERADMIN" | "EDITOR" | "VIEWER";

const roleRank: Record<AdminRole, number> = {
  VIEWER: 1,
  EDITOR: 2,
  SUPERADMIN: 3,
};

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !(session.user as { isActive?: boolean } | undefined)?.isActive) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "未授權" }, { status: 401 }),
    };
  }
  return { authorized: true, session };
}

export async function requireRole(minRole: AdminRole) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth;

  const role = (((auth.session as { user?: { role?: string } }).user?.role ?? "VIEWER") as AdminRole);
  if (roleRank[role] < roleRank[minRole]) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "權限不足" }, { status: 403 }),
    };
  }

  return auth;
}
