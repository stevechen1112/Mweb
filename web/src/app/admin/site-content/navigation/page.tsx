"use client";

import { useSiteContent } from "../SiteContentContext";
import { TextInput, TextArea } from "@/components/FormFields";

export default function NavigationPage() {
  const { form, updateField, updateObjectList, addObjectListItem, removeObjectListItem } = useSiteContent();
  if (!form) return null;

  return (
    <div className="space-y-6">
      {/* Header Links */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Header 導覽連結</h2>
          <button type="button" onClick={() => addObjectListItem("headerLinks", { label: "", en: "", href: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-3">
          {form.headerLinks.map((item: any, index: number) => (
            <div key={`header-${index}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr_auto] gap-3 items-end">
              <TextInput label="中文" value={item.label} onChange={(e) => updateObjectList("headerLinks", index, "label", e.target.value)} />
              <TextInput label="英文" value={item.en} onChange={(e) => updateObjectList("headerLinks", index, "en", e.target.value)} />
              <TextInput label="連結" value={item.href} onChange={(e) => updateObjectList("headerLinks", index, "href", e.target.value)} />
              <button type="button" onClick={() => removeObjectListItem("headerLinks", index)} className="h-10 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Sitemap Links */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Footer Sitemap 連結</h2>
          <button type="button" onClick={() => addObjectListItem("footerSitemapLinks", { label: "", href: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-3">
          {form.footerSitemapLinks.map((item: any, index: number) => (
            <div key={`sitemap-${index}`} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <TextInput label="顯示文字" value={item.label} onChange={(e) => updateObjectList("footerSitemapLinks", index, "label", e.target.value)} />
              <TextInput label="連結" value={item.href} onChange={(e) => updateObjectList("footerSitemapLinks", index, "href", e.target.value)} />
              <button type="button" onClick={() => removeObjectListItem("footerSitemapLinks", index)} className="h-10 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Support Links */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Footer 支援連結</h2>
          <button type="button" onClick={() => addObjectListItem("footerSupportLinks", { label: "", href: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-3">
          {form.footerSupportLinks.map((item: any, index: number) => (
            <div key={`support-${index}`} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <TextInput label="顯示文字" value={item.label} onChange={(e) => updateObjectList("footerSupportLinks", index, "label", e.target.value)} />
              <TextInput label="連結" value={item.href} onChange={(e) => updateObjectList("footerSupportLinks", index, "href", e.target.value)} />
              <button type="button" onClick={() => removeObjectListItem("footerSupportLinks", index)} className="h-10 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-4">電子報區塊</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="電子報標題" value={form.newsletterTitle} onChange={(e) => updateField("newsletterTitle", e.target.value)} />
          <TextInput label="電子報按鈕文字" value={form.newsletterButtonText} onChange={(e) => updateField("newsletterButtonText", e.target.value)} />
        </div>
        <div className="mt-4">
          <TextArea label="電子報說明文" rows={3} value={form.newsletterDescription} onChange={(e) => updateField("newsletterDescription", e.target.value)} />
        </div>
      </div>
    </div>
  );
}
