"use client";

import AdminShell from "@/components/AdminShell";
import { SiteContentProvider, useSiteContent } from "./SiteContentContext";

function SiteContentInner({ children }: { children: React.ReactNode }) {
  const { loading, canManage, form, saving, save } = useSiteContent();

  if (loading) {
    return <div className="p-6 lg:p-8 text-sm text-neutral-500">載入中...</div>;
  }

  if (!canManage) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-sm text-neutral-300">
          只有超級管理員可以維護全站內容與設定。
        </div>
      </div>
    );
  }

  if (!form) {
    return <div className="p-6 lg:p-8 text-sm text-red-400">無法載入全站內容設定。</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white truncate">全站內容管理</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">管理 Header、Footer、首頁、關於頁、聯絡頁與課程列表頁的文案、圖片與連結。</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="shrink-0 self-start sm:self-auto bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition"
        >
          {saving ? "儲存中..." : "儲存設定"}
        </button>
      </div>
      {children}
      <div className="pt-2 pb-4">
        <button
          onClick={save}
          disabled={saving}
          className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition"
        >
          {saving ? "儲存中..." : "儲存設定"}
        </button>
      </div>
    </div>
  );
}

export default function SiteContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      <SiteContentProvider>
        <SiteContentInner>{children}</SiteContentInner>
      </SiteContentProvider>
    </AdminShell>
  );
}
