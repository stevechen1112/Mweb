"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import ImageUploadField from "@/components/ImageUploadField";

type BlogPost = {
  id: number;
  category: string;
  title: string;
  description: string;
  content?: string | null;
  imageUrl: string | null;
  readTime: number;
  isPublished: boolean;
  publishedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  imageAlt: string | null;
};

const EMPTY_FORM = { category: "", title: "", description: "", content: "", imageUrl: "", readTime: 5, isPublished: true, seoTitle: "", seoDescription: "", imageAlt: "" };

export default function AdminBlogPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM, publishedAt: "" });
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchCats = async () => {
    try {
      const res = await fetch("/api/admin/blog-categories");
      const data = await res.json();
      setCategories(data.map((c: any) => c.name));
    } catch(err) {}
  };

  const fetch_ = async (p = page, q = search, cat = filterCat) => {
    setLoading(true);
    let url = `/api/admin/blog?page=${p}&limit=10`;
    if (q) url += `&search=${encodeURIComponent(q)}`;
    if (cat) url += `&category=${encodeURIComponent(cat)}`;
    
    const res = await fetch(url);
    const data = await res.json();
    setPosts(data.items || []);
    setTotalPages(Math.ceil((data.total || 0) / 10));
    setLoading(false);
  };

  useEffect(() => { 
    fetchCats();
  }, []);

  useEffect(() => { fetch_(page, search, filterCat); }, [page, filterCat]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetch_(1, search, filterCat);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, category: categories[0] || "", publishedAt: new Date().toISOString().slice(0, 10) });
    setCreating(true);
  };
  const openEdit = (p: BlogPost) => {
    setCreating(false);
    setEditing(p);
    setForm({ 
      category: p.category, 
      title: p.title, 
      description: p.description, 
      content: p.content ?? "", 
      imageUrl: p.imageUrl ?? "", 
      readTime: p.readTime, 
      isPublished: p.isPublished,
      publishedAt: p.publishedAt ? p.publishedAt.slice(0, 10) : "",
      seoTitle: p.seoTitle ?? "",
      seoDescription: p.seoDescription ?? "",
      imageAlt: p.imageAlt ?? "",
    });
  };
  const save = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.category.trim()) {
      alert("請填寫標題、描述及分類"); return;
    }
    try {
      setSaving(true);
      const payload = { ...form, imageUrl: form.imageUrl || null };
      const endpoint = editing ? `/api/admin/blog/${editing.id}` : "/api/admin/blog";
      const method = editing ? "PUT" : "POST";
      
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "儲存失敗");
      }
      
      setSaving(false);
      setEditing(null);
      setCreating(false);
      if (!editing) setPage(1);
      fetch_(editing ? page : 1, search, filterCat);
      alert("儲存成功");
    } catch (err: any) {
      alert(err.message || "發生未知錯誤");
      setSaving(false);
    }
  };
  const del = async (id: number) => {
    if (!confirm("確定刪除？此動作無法復原。")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("刪除失敗");
      fetch_(page, search, filterCat);
    } catch (err: any) {
      alert(err.message || "發生未知錯誤");
    }
  };

  const showForm = creating || !!editing;

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">部落格管理</h1>
          <div className="flex gap-4 items-center w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex flex-1 md:w-64 relative">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜尋標題或內容..." 
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </form>
            <button onClick={openCreate} className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 transition whitespace-nowrap">+ 新增文章</button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["", ...categories].map((cat) => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${filterCat === cat ? "border-white text-white bg-white/10" : "border-neutral-700 text-neutral-400 hover:border-neutral-500"}`}>
              {cat || "全部"}
            </button>
          ))}
        </div>

        {showForm && (
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 mb-6 space-y-4">
            <h2 className="text-sm font-semibold text-white">{editing ? "編輯文章" : "新增文章"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">類別 *</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">預估閱讀時間（分鐘）</label>
                <input type="number" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: Number(e.target.value) })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">標題 *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">摘要 *</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 resize-none" />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">正文 (支援 Markdown)</label>
              <textarea rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 resize-y font-mono" placeholder="# 標題" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <ImageUploadField label="封面圖" value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">圖片 Alt 替代文字</label>
                <input value={form.imageAlt} onChange={(e) => setForm({ ...form, imageAlt: e.target.value })} maxLength={200} placeholder="輸入提昇無障礙與SEO的圖片描述" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" />
              </div>
            </div>

            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 space-y-4 mt-2">
              <h3 className="text-sm font-semibold text-white">SEO 設定</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">SEO 標題 (Max 70字)</label>
                  <input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} maxLength={70} placeholder="不填則預設使用文章標題" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">SEO 描述 (Max 160字)</label>
                  <textarea rows={2} value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} maxLength={160} placeholder="不填則預設使用摘要" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 resize-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">發布日期</label>
                <input type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="accent-white" />
              立即發布
            </label>
            <div className="flex gap-2">
              <button onClick={save} disabled={saving} className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition">{saving ? "儲存中..." : "儲存"}</button>
              <button onClick={() => { setEditing(null); setCreating(false); }} className="border border-neutral-700 text-neutral-400 text-sm px-4 py-2 rounded-lg hover:text-white hover:border-neutral-500 transition">取消</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-neutral-500 text-sm">載入中...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-neutral-600 py-16">此分類無文章</div>
        ) : (
          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 flex items-start justify-between gap-4 hover:border-neutral-700 transition">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">{p.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isPublished ? "bg-green-900/30 text-green-400" : "bg-neutral-800 text-neutral-500"}`}>{p.isPublished ? "已發布" : "草稿"}</span>
                    <span className="text-xs text-neutral-500">{p.readTime} 分鐘</span>
                  </div>
                  <div className="text-sm font-medium text-white">{p.title}</div>
                  <div className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{p.description}</div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(p)} className="text-xs text-neutral-400 hover:text-white transition px-2">編輯</button>
                  <button onClick={() => del(p.id)} className="text-xs text-red-500 hover:text-red-400 transition px-2">刪除</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border border-neutral-700 rounded-lg text-sm text-neutral-400 hover:text-white disabled:opacity-50"
            >
              上一頁
            </button>
            <span className="text-sm text-neutral-500 mx-2">
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border border-neutral-700 rounded-lg text-sm text-neutral-400 hover:text-white disabled:opacity-50"
            >
              下一頁
            </button>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
