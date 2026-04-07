import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth-guard";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const ALLOWED_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "ico"]);
const ALLOWED_MIME_PREFIXES = ["image/"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  const auth = await requireRole("EDITOR");
  if (!auth.authorized) return auth.response;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // File size check
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "檔案大小不得超過 10MB" }, { status: 400 });
    }

    // MIME type check
    if (!ALLOWED_MIME_PREFIXES.some((prefix) => file.type.startsWith(prefix))) {
      return NextResponse.json({ error: "僅允許上傳圖片檔案" }, { status: 400 });
    }

    // Extension whitelist
    const rawExt = file.name.split(".").pop()?.toLowerCase() ?? "";
    const extension = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : "png";
    if (!ALLOWED_EXTENSIONS.has(rawExt)) {
      return NextResponse.json({ error: `不支援的檔案格式：.${rawExt}，僅允許 ${[...ALLOWED_EXTENSIONS].join(", ")}` }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `upload-${uniqueSuffix}.${extension}`;

    // Define upload path
    const uploadDir = join(process.cwd(), "public", "uploads");
    
    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const path = join(uploadDir, filename);

    // Write file
    await writeFile(path, buffer);

    // Return the URL path
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
