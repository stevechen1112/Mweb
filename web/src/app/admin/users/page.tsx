"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminShell from "@/components/AdminShell";

type AdminUserItem = {
  id: number;
  email: string;
  name: string;
  role: "SUPERADMIN" | "EDITOR" | "VIEWER";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const EMPTY_FORM = {
  email: "",
  name: "",
  password: "",
  role: "EDITOR",
  isActive: true,
};

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<AdminUserItem | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const canManage = session?.user?.role === "SUPERADMIN";

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("載入失敗");
      setUsers(await res.json());
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canManage) fetchUsers();
    if (status === "authenticated" && !canManage) setLoading(false);
  }, [canManage, status]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setCreating(true);
  };

  const openEdit = (user: AdminUserItem) => {
    setEditing(user);
    setCreating(false);
    setForm({
      email: user.email,
      name: user.name,
      password: "",
      role: user.role,
      isActive: user.isActive,
    });
  };

  const save = async () => {
    if (!form.email || !form.name || (!editing && !form.password)) {
      alert("請完整填寫必要欄位");
      return;
    }

    setSaving(true);
    try {
      const endpoint = editing ? `/api/admin/users/${editing.id}` : "/api/admin/users";
      const method = editing ? "PUT" : "POST";
      const payload = editing && !form.password ? { ...form, password: undefined } : form;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "儲存失敗");

      setCreating(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      await fetchUsers();
      alert("儲存成功");
    } catch (error: any) {
      alert(error.message || "發生未知錯誤");
    } finally {
      setSaving(false);
    }
  };

  const removeUser = async (user: AdminUserItem) => {
    if (!confirm(`確定刪除 ${user.name}？`)) return;
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "刪除失敗");
      await fetchUsers();
    } catch (error: any) {
      alert(error.message || "發生未知錯誤");
    }
  };

  if (status === "loading" || loading) {
    return (
      <AdminShell>
        <div className="p-4 sm:p-6 lg:p-8 text-sm text-neutral-500">載入中...</div>
      </AdminShell>
    );
  }

  if (!canManage) {
    return (
      <AdminShell>
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-sm text-neutral-300">
            只有超級管理員可以維護帳號與權限設定。
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">權限管理</h1>
            <p className="text-sm text-neutral-500 mt-1">建立後台帳號、設定角色與啟用狀態。</p>
          </div>
          <button onClick={openCreate} className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 transition">
            + 新增管理員
          </button>
        </div>

        {(creating || !!editing) && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6 space-y-4">
            <h2 className="text-sm font-semibold text-white">{editing ? "編輯帳號" : "新增帳號"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">姓名 *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">角色 *</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as AdminUserItem["role"] })} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white">
                  <option value="SUPERADMIN">SUPERADMIN</option>
                  <option value="EDITOR">EDITOR</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">{editing ? "重設密碼" : "密碼 *"}</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={editing ? "留空則不變更" : "至少 8 個字元"} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-300">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-white" />
              帳號啟用中
            </label>
            <div className="flex gap-2">
              <button onClick={save} disabled={saving} className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition">
                {saving ? "儲存中..." : "儲存"}
              </button>
              <button onClick={() => { setCreating(false); setEditing(null); setForm(EMPTY_FORM); }} className="border border-neutral-700 text-neutral-400 text-sm px-4 py-2 rounded-lg hover:text-white hover:border-neutral-500 transition">
                取消
              </button>
            </div>
          </div>
        )}

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm text-white">
            <thead className="bg-neutral-800/50 text-neutral-400 text-xs">
              <tr>
                <th className="px-5 py-3 font-medium">姓名</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">角色</th>
                <th className="px-5 py-3 font-medium">狀態</th>
                <th className="px-5 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-800/30 transition">
                  <td className="px-5 py-4">{user.name}</td>
                  <td className="px-5 py-4 text-neutral-400">{user.email}</td>
                  <td className="px-5 py-4"><span className="px-2 py-1 rounded-full bg-neutral-800 text-xs">{user.role}</span></td>
                  <td className="px-5 py-4">{user.isActive ? <span className="text-green-400">啟用</span> : <span className="text-neutral-500">停用</span>}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => openEdit(user)} className="text-neutral-400 hover:text-white transition px-2">編輯</button>
                    <button onClick={() => removeUser(user)} className="text-red-500 hover:text-red-400 transition px-2">刪除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}