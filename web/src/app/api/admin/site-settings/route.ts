import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";
import { getSiteSettings, normalizeSiteSettings } from "@/lib/site-settings";

export async function GET() {
  const auth = await requireRole("SUPERADMIN");
  if (!auth.authorized) return auth.response;

  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const auth = await requireRole("SUPERADMIN");
  if (!auth.authorized) return auth.response;

  const body = await req.json();
  const normalized = normalizeSiteSettings(body as Record<string, unknown>);

  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: normalized,
    create: {
      id: 1,
      ...normalized,
    },
  });

  return NextResponse.json(settings);
}