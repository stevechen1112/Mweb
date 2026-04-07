"use client";

import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import { useSession } from "next-auth/react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (form.newPassword !== form.confirmPassword) {
      setMsg({ type: "error", text: "新密碼與確認密碼不符" });
      return;
    }
    if (form.newPassword.length < 8) {
      setMsg({ type: "error", text: "新密碼至少 8 個字元" });
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/settings/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      setMsg({ type: "success", text: "密碼已成功更新" });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setMsg({ type: "error", text: data.error ?? "更新失敗" });
    }
  };

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-lg">
        <h1 className="text-2xl font-bold text-white mb-8">帳號設定</h1>

        {/* 帳號資訊 */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 mb-6">
          <div className="text-xs text-neutral-500 mb-3 font-medium uppercase tracking-wider">帳號資訊</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-neutral-400">名稱</span>
              <span className="text-sm text-white">{session?.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-400">電子郵件</span>
              <span className="text-sm text-white">{session?.user?.email}</span>
            </div>
          </div>
        </div>

        {/* 修改密碼 */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="text-xs text-neutral-500 mb-4 font-medium uppercase tracking-wider">修改密碼</div>

          {msg && (
            <div className={`rounded-lg px-4 py-2.5 text-sm mb-4 ${msg.type === "success" ? "bg-green-900/30 border border-green-700 text-green-400" : "bg-red-900/30 border border-red-700 text-red-400"}`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1.5">目前密碼</label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1.5">新密碼</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-500 transition"
              />
              <p className="text-xs text-neutral-600 mt-1">至少 8 個字元</p>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1.5">確認新密碼</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-white text-black font-semibold py-2.5 rounded-lg text-sm hover:bg-neutral-200 disabled:opacity-50 transition mt-2"
            >
              {saving ? "更新中..." : "更新密碼"}
            </button>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
