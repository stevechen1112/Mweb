import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const roleRank: Record<string, number> = {
  VIEWER: 1,
  EDITOR: 2,
  SUPERADMIN: 3,
};

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const currentRole = session?.user?.role ?? "VIEWER";
  const canManageContent = roleRank[currentRole] >= roleRank.EDITOR;

  const [contactCount, unreadCount, newsCount, blogCount, courseCount, recentContacts] = await Promise.all([
    canManageContent ? prisma.contactSubmission.count() : Promise.resolve(0),
    canManageContent ? prisma.contactSubmission.count({ where: { isRead: false } }) : Promise.resolve(0),
    canManageContent ? prisma.newsPost.count() : Promise.resolve(0),
    canManageContent ? prisma.blogPost.count() : Promise.resolve(0),
    canManageContent ? prisma.course.count() : Promise.resolve(0),
    canManageContent
      ? prisma.contactSubmission.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        })
      : Promise.resolve([]),
  ]);

  const stats = canManageContent
    ? [
        { label: "聯絡表單", value: String(contactCount), sub: `${unreadCount} 未讀`, href: "/admin/contacts", color: "text-blue-400" },
        { label: "最新消息", value: String(newsCount), sub: "篇文章", href: "/admin/news", color: "text-green-400" },
        { label: "部落格", value: String(blogCount), sub: "篇文章", href: "/admin/blog", color: "text-yellow-400" },
        { label: "課程", value: String(courseCount), sub: "個課程", href: "/admin/courses", color: "text-purple-400" },
      ]
    : [
        { label: "目前角色", value: currentRole, sub: "可檢視帳號設定", href: "/admin/settings", color: "text-white" },
      ];

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-white mb-8">總覽</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-600 transition group ${
                stats.length === 1 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className={`text-3xl font-bold ${s.color} group-hover:scale-110 transition-transform inline-block`}>
                {s.value}
              </div>
              <div className="text-sm text-white mt-1">{s.label}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{s.sub}</div>
            </Link>
          ))}
        </div>

        {canManageContent ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <h2 className="text-sm font-semibold text-white">最新聯絡表單</h2>
              <Link href="/admin/contacts" className="text-xs text-neutral-400 hover:text-white transition">
                查看全部 →
              </Link>
            </div>
            {recentContacts.length === 0 ? (
              <div className="px-6 py-8 text-center text-neutral-500 text-sm">尚無表單提交</div>
            ) : (
              <div className="divide-y divide-neutral-800">
                {recentContacts.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 px-6 py-3">
                    {!c.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                    {c.isRead && <span className="w-1.5 h-1.5 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white font-medium">{c.name}</span>
                      <span className="text-xs text-neutral-500 ml-2">{c.category}</span>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">{c.message}</p>
                    </div>
                    <span className="text-xs text-neutral-600 flex-shrink-0">
                      {new Date(c.createdAt).toLocaleDateString("zh-TW")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-sm text-neutral-300">
            目前帳號為檢視角色，可透過左側功能前往帳號設定查看登入資訊與修改密碼。
          </div>
        )}
      </div>
    </AdminShell>
  );
}
