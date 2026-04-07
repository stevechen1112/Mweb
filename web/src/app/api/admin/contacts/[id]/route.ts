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
  const contact = await prisma.contactSubmission.findUnique({
    where: { id: Number(id) }
  });

  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json(contact);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const data = await req.json();

  const contact = await prisma.contactSubmission.update({
    where: { id: Number(id) },
    data: {
      isRead: data.isRead !== undefined ? Boolean(data.isRead) : undefined,
    }
  });

  return NextResponse.json(contact);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  await prisma.contactSubmission.delete({
    where: { id: Number(id) }
  });

  return NextResponse.json({ success: true });
}
