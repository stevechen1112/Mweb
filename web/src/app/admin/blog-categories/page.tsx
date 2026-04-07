"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";

type BlogCategory = {
  id: number;
  name: string;
  sortOrder: number;
};

const EMPTY_FORM = { name: "", sortOrder: 0 };

export default function AdminBlogCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogCategory | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog-categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setCreating(true);
  };

  const openEdit = (cat: BlogCategory) => {
    setCreating(false);
    setEditing(cat);
    setForm({ name: cat.name, sortOrder: cat.sortOrder });
  };

  const save = async () => {
    if (!form.name) return alert("請填寫類別名稱");
    
    setSaving(true);
    try {
      const endpoint = editing ? `/api/admin/blog-categories/${editing.id}` : "/api/admin/blog-categories";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "儲存失敗");
      }

      setSaving(false);
      setEditing(null);
      setCreating(false);
      fetchCategories();
      alert("儲存成功");
    } catch (err: any) {
      alert(err.message || "發生未知錯誤");
      setSaving(false);
    }
  };

  const del = async (id: number) => {
    if (!confirm("確定刪除？此動作無法復原。")) return;
    try {
      const res = await fetch(`/api/admin/blog-categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("刪除失敗");
      fetchCategories();
    } catch (err: any) {
      alert(err.message || "發生未知錯誤");
    }
  };

  const showForm = creating || !!editing;

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">部落格類別管理</h1>
          <button 
            onClick={openCreate} 
            className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 transition whitespace-nowrap"
          >
            + 新增類別
          </button>
        </div>

        {showForm && (
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 mb-6 space-y-4">
            <h2 className="text-sm font-semibold text-white">{editing ? "編輯類別" : "新增類別"}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">類別名稱 *</label>
                <input 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  placeholder="例如: 專題報導"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" 
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">排序 (數字越小越前面)</label>
                <input 
                  type="number" 
                  value={form.sortOrder} 
                  onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" 
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={save} disabled={saving} className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition">
                {saving ? "儲存中..." : "儲存"}
              </button>
              <button onClick={() => { setEditing(null); setCreating(false); }} className="border border-neutral-700 text-neutral-400 text-sm px-4 py-2 rounded-lg hover:text-white hover:border-neutral-500 transition">
                取消
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-neutral-500 text-sm">載入中...</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-neutral-600 py-16">尚無類別，點擊「新增類別」開始建立</div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm text-white">
              <thead className="bg-neutral-800/50 text-neutral-400 text-xs">
                <tr>
                  <th className="px-5 py-3 font-medium">排序</th>
                  <th className="px-5 py-3 font-medium">類別名稱</th>
                  <th className="px-5 py-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-neutral-800/20 transition">
                    <td className="px-5 py-3 w-24 text-neutral-500">{c.sortOrder}</td>
                    <td className="px-5 py-3">{c.name}</td>
                    <td className="px-5 py-3 text-right w-32">
                      <button onClick={() => openEdit(c)} className="text-neutral-400 hover:text-white transition px-2">編輯</button>
                      <button onClick={() => del(c.id)} className="text-red-500 hover:text-red-400 transition px-2">刪除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
