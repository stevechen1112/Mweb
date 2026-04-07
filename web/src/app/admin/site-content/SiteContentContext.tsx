"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";

interface SiteContentContextType {
  form: any | null;
  loading: boolean;
  saving: boolean;
  canManage: boolean;
  updateField: (key: string, value: any) => void;
  updateObjectList: (listKey: string, index: number, field: string, value: string) => void;
  addObjectListItem: (listKey: string, item: any) => void;
  removeObjectListItem: (listKey: string, index: number) => void;
  updateStringList: (listKey: string, index: number, value: string) => void;
  addStringListItem: (listKey: string) => void;
  removeStringListItem: (listKey: string, index: number) => void;
  uploadImage: (key: string, file?: File | null) => Promise<void>;
  save: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return ctx;
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [form, setForm] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const canManage = session?.user?.role === "SUPERADMIN";

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/site-settings");
      if (!res.ok) throw new Error("載入失敗");
      setForm(await res.json());
    } catch {
      setForm(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (canManage) fetchSettings();
    if (status === "authenticated" && !canManage) setLoading(false);
  }, [canManage, status, fetchSettings]);

  const updateField = useCallback((key: string, value: any) => {
    setForm((c: any) => ({ ...c, [key]: value }));
  }, []);

  const updateObjectList = useCallback((listKey: string, index: number, field: string, value: string) => {
    setForm((c: any) => ({
      ...c,
      [listKey]: c[listKey].map((item: any, i: number) => (i === index ? { ...item, [field]: value } : item)),
    }));
  }, []);

  const addObjectListItem = useCallback((listKey: string, item: any) => {
    setForm((c: any) => ({ ...c, [listKey]: [...c[listKey], item] }));
  }, []);

  const removeObjectListItem = useCallback((listKey: string, index: number) => {
    setForm((c: any) => ({ ...c, [listKey]: c[listKey].filter((_: unknown, i: number) => i !== index) }));
  }, []);

  const updateStringList = useCallback((listKey: string, index: number, value: string) => {
    setForm((c: any) => ({
      ...c,
      [listKey]: c[listKey].map((item: string, i: number) => (i === index ? value : item)),
    }));
  }, []);

  const addStringListItem = useCallback((listKey: string) => {
    setForm((c: any) => ({ ...c, [listKey]: [...c[listKey], ""] }));
  }, []);

  const removeStringListItem = useCallback((listKey: string, index: number) => {
    setForm((c: any) => ({ ...c, [listKey]: c[listKey].filter((_: string, i: number) => i !== index) }));
  }, []);

  const uploadImage = useCallback(async (key: string, file?: File | null) => {
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data });
    const body = await res.json();
    if (!res.ok) {
      alert(body.error || "上傳失敗");
      return;
    }
    updateField(key, body.url);
  }, [updateField]);

  const save = useCallback(async () => {
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "儲存失敗");
      setForm(data);
      alert("全站內容已更新");
    } catch (error: any) {
      alert(error.message || "發生未知錯誤");
    } finally {
      setSaving(false);
    }
  }, [form]);

  return (
    <SiteContentContext.Provider
      value={{
        form,
        loading,
        saving,
        canManage,
        updateField,
        updateObjectList,
        addObjectListItem,
        removeObjectListItem,
        updateStringList,
        addStringListItem,
        removeStringListItem,
        uploadImage,
        save,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}
