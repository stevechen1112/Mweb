"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  minRole: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "總覽", href: "/admin/dashboard", icon: "◈", minRole: "VIEWER" },
  { label: "聯絡表單", href: "/admin/contacts", icon: "✉", badge: "contacts", minRole: "EDITOR" },
  { label: "最新消息", href: "/admin/news", icon: "📰", minRole: "EDITOR" },
  {
    label: "部落格",
    href: "/admin/blog",
    icon: "✍",
    minRole: "EDITOR",
    children: [
      { label: "文章管理", href: "/admin/blog" },
      { label: "類別管理", href: "/admin/blog-categories" },
    ],
  },
  { label: "課程管理", href: "/admin/courses", icon: "🥋", minRole: "EDITOR" },
  {
    label: "全站內容",
    href: "/admin/site-content",
    icon: "🧩",
    minRole: "SUPERADMIN",
    children: [
      { label: "基本 / 社群資訊", href: "/admin/site-content/general" },
      { label: "導覽 / Footer", href: "/admin/site-content/navigation" },
      { label: "首頁內容", href: "/admin/site-content/home" },
      { label: "關於頁內容", href: "/admin/site-content/about" },
      { label: "聯絡與課程頁", href: "/admin/site-content/pages" },
    ],
  },
  { label: "權限管理", href: "/admin/users", icon: "👥", minRole: "SUPERADMIN" },
  { label: "帳號設定", href: "/admin/settings", icon: "⚙", minRole: "VIEWER" },
];

const roleRank: Record<string, number> = {
  VIEWER: 1,
  EDITOR: 2,
  SUPERADMIN: 3,
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const currentRole = session?.user?.role ?? "VIEWER";
  const visibleItems = NAV_ITEMS.filter((item) => roleRank[currentRole] >= roleRank[item.minRole]);

  useEffect(() => {
    let matchedGroup: string | null = null;
    for (const item of visibleItems) {
      if (item.children?.some((c) => pathname.startsWith(c.href))) {
        matchedGroup = item.href;
        break;
      }
    }
    if (matchedGroup) {
      setExpandedGroup(matchedGroup);
    }
  }, [pathname, currentRole]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (roleRank[currentRole] < roleRank.EDITOR) {
      setUnreadCount(0);
      return;
    }
    fetch("/api/admin/contacts?unread=true&limit=1")
      .then((r) => r.json())
      .then((d) => setUnreadCount(d.total ?? 0))
      .catch(() => {});
  }, [currentRole, pathname]);

  const checkActive = (href: string, children?: { href: string }[]) => {
    if (children) return children.some((c) => pathname.startsWith(c.href));
    return pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
  };

  const navContent = (
    <>
      {visibleItems.map((item) => {
        const active = checkActive(item.href, item.children);
        const badge = item.badge === "contacts" && unreadCount > 0 ? unreadCount : 0;
        const expanded = expandedGroup === item.href;

        if (item.children) {
          return (
            <div key={item.href}>
              <button
                onClick={() => setExpandedGroup(expanded ? null : item.href)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                  active ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-4 text-center text-base leading-none">{item.icon}</span>
                  {item.label}
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {expanded && (
                <div className="ml-6 mt-1 space-y-0.5 border-l border-neutral-800 pl-3">
                  {item.children.map((child) => {
                    const childActive = pathname.startsWith(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-1.5 rounded-lg text-xs transition ${
                          childActive ? "text-white bg-white/5 font-medium" : "text-neutral-500 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
              active ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className="w-4 text-center text-base leading-none">{item.icon}</span>
              {item.label}
            </span>
            {badge > 0 && (
              <span className="bg-blue-600 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-medium">
                {badge > 99 ? "99+" : badge}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileOpen(true)} className="text-neutral-400 hover:text-white p-1" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="text-sm font-bold text-white tracking-wider">祈滕 Admin</div>
        <div className="w-8" />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-neutral-900 border-r border-neutral-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-20 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <Link href="/admin/dashboard" className="block">
            <div className="text-lg font-bold tracking-wider text-white">祈滕</div>
            <div className="text-[10px] text-neutral-500 tracking-widest uppercase mt-0.5">Admin Console</div>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-neutral-400 hover:text-white p-1" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
          {navContent}
        </nav>
        <div className="px-3 py-3 border-t border-neutral-800 space-y-2">
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center text-xs text-white flex-shrink-0">
              {session?.user?.name?.charAt(0) ?? "A"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-white truncate">{session?.user?.name ?? "管理員"}</div>
              <div className="text-[10px] text-neutral-500 truncate">{session?.user?.email}</div>
              <div className="text-[10px] text-neutral-600 truncate mt-0.5">{session?.user?.role ?? "VIEWER"}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full text-xs text-neutral-500 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/5 text-left transition flex items-center gap-2"
          >
            <span>↩</span> 登出
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 min-h-screen bg-neutral-950 overflow-y-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}

