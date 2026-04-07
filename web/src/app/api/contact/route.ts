import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, lineId, email, category, courseOrProduct, message } = body;

    // 基本驗證
    if (!name || !message || !category) {
      return NextResponse.json(
        { success: false, error: "請填寫必填欄位：姓名、類別與訊息" },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: String(name).slice(0, 100),
        phone: phone ? String(phone).slice(0, 20) : null,
        lineId: lineId ? String(lineId).slice(0, 50) : null,
        email: email ? String(email).slice(0, 200) : null,
        category: String(category).slice(0, 50),
        courseOrProduct: courseOrProduct ? String(courseOrProduct).slice(0, 200) : null,
        message: String(message).slice(0, 2000),
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json(
      { success: false, error: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
