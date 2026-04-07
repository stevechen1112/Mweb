/**
 * Prisma seed 腳本：建立預設管理員帳號
 * 執行方式: npx tsx prisma/seed.ts
 */
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { fallbackBlogPosts, fallbackCourses, fallbackNewsPosts } from "../src/lib/content-fallback";
import { DEFAULT_SITE_SETTINGS } from "../src/lib/site-settings";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const email = "admin@qiteng.tw";
  const password = "QiTeng_Admin_2026!";

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log("管理員帳號已存在，跳過建立");
  } else {
    const hashed = await bcrypt.hash(password, 12);
    const admin = await prisma.adminUser.create({
      data: { email, password: hashed, name: "系統管理員", role: "SUPERADMIN", isActive: true },
    });

    console.log(`✅ 管理員帳號建立成功: ${admin.email}`);
    console.log(`   預設密碼: ${password}`);
    console.log("   請登入後立即修改密碼！");
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      ...DEFAULT_SITE_SETTINGS,
    },
  });

  const [newsCount, blogCount, courseCount] = await Promise.all([
    prisma.newsPost.count(),
    prisma.blogPost.count(),
    prisma.course.count(),
  ]);

  if (newsCount === 0) {
    await prisma.newsPost.createMany({ data: fallbackNewsPosts });
    console.log(`✅ 已建立 ${fallbackNewsPosts.length} 筆預設最新消息`);
  }

  if (blogCount === 0) {
    await prisma.blogPost.createMany({ data: fallbackBlogPosts });
    console.log(`✅ 已建立 ${fallbackBlogPosts.length} 筆預設部落格文章`);
  }

  if (courseCount === 0) {
    for (const course of fallbackCourses) {
      await prisma.course.create({
        data: {
          slug: course.slug,
          titleEn: course.titleEn,
          titleZh: course.titleZh,
          subtitle: course.subtitle,
          intro: course.intro,
          targets: course.targets,
          modules: course.modules,
          bannerImage: course.bannerImage,
          sortOrder: course.sortOrder,
          isPublished: true,
        },
      });
    }
    console.log(`✅ 已建立 ${fallbackCourses.length} 筆預設課程資料`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
