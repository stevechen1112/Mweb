"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";

type Contact = {
  id: number;
  name: string;
  phone: string | null;
  lineId: string | null;
  email: string | null;
  category: string;
  courseOrProduct: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const PAGE_SIZE = 20;

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const fetchContacts = async (p = page, q = search) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts?unread=${unreadOnly}&limit=${PAGE_SIZE}&page=${p}&search=${encodeURIComponent(q)}`);
      if (!res.ok) { setLoading(false); return; }
      const data = await res.json();
      setContacts(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch {
      // ignore
    }
    setLoading(false);
  };

  useEffect(() => { fetchContacts(page, search); }, [unreadOnly, page]);

  const markRead = async (id: number, isRead: boolean) => {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead }),
    });
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, isRead } : c));
    if (selected?.id === id) setSelected((s) => s ? { ...s, isRead } : null);
  };

  const deleteContact = async (id: number) => {
    if (!confirm("確定刪除？")) return;
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setTotal((t) => t - 1);
    if (selected?.id === id) {
      setSelected(null);
      setMobileView("list");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (page === 1) {
      fetchContacts(1, search);
      return;
    }
    setPage(1);
  };

  const selectContact = (c: Contact) => {
    setSelected(c);
    setMobileView("detail");
    if (!c.isRead) markRead(c.id, true);
  };

  return (
    <AdminShell>
      <div className="flex h-[calc(100vh-3.5rem)] lg:h-screen overflow-hidden">
        {/* List */}
        <div className={`w-full lg:w-80 flex flex-col border-r border-neutral-800 bg-neutral-900 ${mobileView === "detail" ? "hidden lg:flex" : "flex"}`}>
          <div className="px-4 py-4 border-b border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-sm font-semibold text-white">聯絡表單 ({total})</h1>
              <button onClick={() => fetchContacts(page, search)} className="text-xs text-neutral-400 hover:text-white transition">重整</button>
            </div>
            <form onSubmit={handleSearch} className="flex relative mb-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜尋姓名、信箱、LINE ID、訊息..."
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-3 pr-8 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </form>
            <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={(e) => { setUnreadOnly(e.target.checked); setPage(1); }}
                className="accent-white"
              />
              只顯示未讀
            </label>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-800">
            {loading ? (
              <div className="p-4 text-center text-neutral-500 text-xs">載入中...</div>
            ) : contacts.length === 0 ? (
              <div className="p-4 text-center text-neutral-500 text-xs">無資料</div>
            ) : contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => selectContact(c)}
                className={`w-full text-left px-4 py-3 hover:bg-neutral-800 transition ${selected?.id === c.id ? "bg-neutral-800" : ""}`}
              >
                <div className="flex items-center gap-2">
                  {!c.isRead && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                  <span className="text-sm font-medium text-white truncate">{c.name}</span>
                  <span className="text-xs text-neutral-500 ml-auto flex-shrink-0">
                    {new Date(c.createdAt).toLocaleDateString("zh-TW")}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-0.5 truncate">{c.category}　{c.message}</div>
              </button>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="px-4 py-2 border-t border-neutral-800 flex items-center justify-between">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >← 上一頁</button>
              <span className="text-xs text-neutral-500">{page} / {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >下一頁 →</button>
            </div>
          )}
        </div>

        {/* Detail */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${mobileView === "list" ? "hidden lg:block" : "block"}`}>
          {!selected ? (
            <div className="flex items-center justify-center h-full text-neutral-600 text-sm">
              選擇左側表單查看內容
            </div>
          ) : (
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setMobileView("list")}
                    className="lg:hidden text-neutral-400 hover:text-white shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                  </button>
                  <h2 className="text-lg sm:text-xl font-bold text-white truncate">{selected.name}</h2>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => markRead(selected.id, !selected.isRead)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition"
                  >
                    {selected.isRead ? "標為未讀" : "標為已讀"}
                  </button>
                  <button
                    onClick={() => deleteContact(selected.id)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-red-800 text-red-400 hover:bg-red-900/20 transition"
                  >
                    刪除
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  ["類別", selected.category],
                  ["課程/產品", selected.courseOrProduct || "—"],
                  ["電話", selected.phone || "—"],
                  ["LINE ID", selected.lineId || "—"],
                  ["信箱", selected.email || "—"],
                  ["提交時間", new Date(selected.createdAt).toLocaleString("zh-TW")],
                ].map(([label, value]) => (
                  <div key={label} className="bg-neutral-900 rounded-lg p-3 border border-neutral-800">
                    <div className="text-xs text-neutral-500 mb-1">{label}</div>
                    <div className="text-sm text-white break-all">{value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
                <div className="text-xs text-neutral-500 mb-2">訊息內容</div>
                <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{selected.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
