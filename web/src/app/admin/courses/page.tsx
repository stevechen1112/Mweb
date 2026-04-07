"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import ImageUploadField from "@/components/ImageUploadField";

type Module = { title: string; desc: string };
type Course = {
  id: number;
  slug: string;
  titleEn: string;
  titleZh: string;
  subtitle: string | null;
  intro: string;
  targets: string[];
  modules: Module[];
  bannerImage: string | null;
  isPublished: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  imageAlt: string | null;
};

const EMPTY_FORM = {
  slug: "",
  titleEn: "",
  titleZh: "",
  subtitle: "",
  intro: "",
  targets: [""],
  modules: [{ title: "", desc: "" }] as Module[],
  bannerImage: "",
  isPublished: true,
  sortOrder: 0,
  seoTitle: "",
  seoDescription: "",
  imageAlt: "",
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Course | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const fetch_ = async (q = search) => {
    setLoading(true);
    const url = q ? `/api/admin/courses?search=${encodeURIComponent(q)}` : `/api/admin/courses`;
    const res = await fetch(url);
    const data = await res.json();
    setCourses(data);
    setLoading(false);
  };

  useEffect(() => { fetch_(search); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetch_(search);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, targets: [""], modules: [{ title: "", desc: "" }] });
    setCreating(true);
  };

  const openEdit = (c: Course) => {
    setCreating(false);
    setEditing(c);
    setForm({
      slug: c.slug,
      titleEn: c.titleEn,
      titleZh: c.titleZh,
      subtitle: c.subtitle ?? "",
      intro: c.intro,
      targets: c.targets.length > 0 ? c.targets : [""],
      modules: c.modules.length > 0 ? c.modules : [{ title: "", desc: "" }],
      bannerImage: c.bannerImage ?? "",
      isPublished: c.isPublished,
      sortOrder: c.sortOrder,
      seoTitle: c.seoTitle ?? "",
      seoDescription: c.seoDescription ?? "",
      imageAlt: c.imageAlt ?? "",
    });
  };

  const save = async () => {
    try {
      if (!form.slug || !form.titleEn || !form.titleZh || !form.intro) {
        alert("請填寫 slug、英文/中文標題與介紹");
        return;
      }
      setSaving(true);
      const payload = {
        ...form,
        subtitle: form.subtitle || null,
        bannerImage: form.bannerImage || null,
        targets: form.targets.filter(Boolean),
        modules: form.modules.filter((m) => m.title),
      };
      
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/courses/${editing.id}` : "/api/admin/courses";
      
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "儲存失敗");
      }
      
      setSaving(false);
      setEditing(null);
      setCreating(false);
      fetch_(search);
      alert("儲存成功");
    } catch (err: any) {
      alert(err.message || "發生未知錯誤");
      setSaving(false);
    }
  };

  const del = async (id: number) => {
    if (!confirm("確定刪除這個課程？此操作不可恢復")) return;
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("刪除失敗");
      fetch_(search);
    } catch (err: any) {
      alert(err.message || "發生未知錯誤");
    }
  };

  // Target 操作
  const updateTarget = (i: number, val: string) => {
    const t = [...form.targets]; t[i] = val; setForm({ ...form, targets: t });
  };
  const addTarget = () => setForm({ ...form, targets: [...form.targets, ""] });
  const removeTarget = (i: number) => setForm({ ...form, targets: form.targets.filter((_, idx) => idx !== i) });

  // Module 操作
  const updateModule = (i: number, key: keyof Module, val: string) => {
    const m = [...form.modules]; m[i] = { ...m[i], [key]: val }; setForm({ ...form, modules: m });
  };
  const addModule = () => setForm({ ...form, modules: [...form.modules, { title: "", desc: "" }] });
  const removeModule = (i: number) => setForm({ ...form, modules: form.modules.filter((_, idx) => idx !== i) });

  const showForm = creating || !!editing;

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">課程管理</h1>
          <div className="flex gap-4 items-center w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex flex-1 md:w-64 relative">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜尋課程標題或介紹..." 
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </form>
            <button onClick={openCreate} className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 transition whitespace-nowrap">
              + 新增課程
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 mb-8 space-y-5">
            <h2 className="text-sm font-semibold text-white border-b border-neutral-800 pb-3">
              {editing ? `編輯課程：${editing.titleZh}` : "新增課程"}
            </h2>

            {/* 基本資訊 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Slug（URL 識別碼）*</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="例：krav-maga"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">排序</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">英文標題 *</label>
                <input
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  placeholder="KRAV MAGA"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">中文標題 *</label>
                <input
                  value={form.titleZh}
                  onChange={(e) => setForm({ ...form, titleZh: e.target.value })}
                  placeholder="克拉夫馬伽"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">副標題</label>
              <input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">課程介紹 *</label>
              <textarea
                rows={4}
                value={form.intro}
                onChange={(e) => setForm({ ...form, intro: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <ImageUploadField label="Banner 圖片" value={form.bannerImage} onChange={(url) => setForm({ ...form, bannerImage: url })} />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">圖片 Alt 替代文字</label>
                <input value={form.imageAlt} onChange={(e) => setForm({ ...form, imageAlt: e.target.value })} maxLength={200} placeholder="輸入提昇無障礙與SEO的圖片描述" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" />
              </div>
            </div>

            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 space-y-4">
              <h3 className="text-sm font-semibold text-white">SEO 設定</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">SEO 標題 (Max 70字)</label>
                  <input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} maxLength={70} placeholder="不填則預設使用課程中文標題" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">SEO 描述 (Max 160字)</label>
                  <textarea rows={2} value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} maxLength={160} placeholder="不填則預設使用課程介紹" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 resize-none" />
                </div>
              </div>
            </div>

            {/* 適合對象 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-neutral-400">適合對象</label>
                <button type="button" onClick={addTarget} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
              </div>
              <div className="space-y-2">
                {form.targets.map((t, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={t}
                      onChange={(e) => updateTarget(i, e.target.value)}
                      placeholder={`對象 ${i + 1}`}
                      className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                    />
                    {form.targets.length > 1 && (
                      <button type="button" onClick={() => removeTarget(i)} className="text-neutral-500 hover:text-red-400 transition text-sm px-2">✕</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 課程模組 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-neutral-400">課程模組</label>
                <button type="button" onClick={addModule} className="text-xs text-neutral-400 hover:text-white transition">+ 新增模組</button>
              </div>
              <div className="space-y-3">
                {form.modules.map((m, i) => (
                  <div key={i} className="bg-neutral-800/50 rounded-lg p-3 border border-neutral-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">模組 {String(i + 1).padStart(2, "0")}</span>
                      {form.modules.length > 1 && (
                        <button type="button" onClick={() => removeModule(i)} className="text-neutral-500 hover:text-red-400 transition text-xs">移除</button>
                      )}
                    </div>
                    <input
                      value={m.title}
                      onChange={(e) => updateModule(i, "title", e.target.value)}
                      placeholder="模組標題"
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-neutral-500"
                    />
                    <input
                      value={m.desc}
                      onChange={(e) => updateModule(i, "desc", e.target.value)}
                      placeholder="模組說明"
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="accent-white" />
              立即發布
            </label>

            <div className="flex gap-2 pt-2">
              <button onClick={save} disabled={saving} className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition">
                {saving ? "儲存中..." : "儲存課程"}
              </button>
              <button onClick={() => { setEditing(null); setCreating(false); }} className="border border-neutral-700 text-neutral-400 text-sm px-4 py-2 rounded-lg hover:text-white hover:border-neutral-500 transition">
                取消
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-neutral-500 text-sm">載入中...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-neutral-600 py-16">尚無課程，點擊「新增課程」開始建立</div>
        ) : (
          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-5 hover:border-neutral-700 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-mono">/{c.slug}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.isPublished ? "bg-green-900/30 text-green-400" : "bg-neutral-800 text-neutral-500"}`}>
                        {c.isPublished ? "已發布" : "草稿"}
                      </span>
                      <span className="text-xs text-neutral-600">排序 {c.sortOrder}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-white font-semibold">{c.titleZh}</span>
                      <span className="text-neutral-500 text-sm">{c.titleEn}</span>
                    </div>
                    {c.subtitle && <div className="text-xs text-neutral-400 mb-2">{c.subtitle}</div>}
                    <p className="text-xs text-neutral-500 line-clamp-2">{c.intro}</p>
                    <div className="flex gap-4 mt-2 text-xs text-neutral-600">
                      <span>{c.targets.length} 個適合對象</span>
                      <span>{c.modules.length} 個課程模組</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => openEdit(c)} className="text-xs text-neutral-400 hover:text-white transition px-2">編輯</button>
                    <button onClick={() => del(c.id)} className="text-xs text-red-500 hover:text-red-400 transition px-2">刪除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
