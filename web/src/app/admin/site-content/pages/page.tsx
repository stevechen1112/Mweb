"use client";

import { useSiteContent } from "../SiteContentContext";
import ImageUploadField from "@/components/ImageUploadField";
import { TextInput, TextArea } from "@/components/FormFields";

export default function PagesPage() {
  const { form, updateField, updateStringList, addStringListItem, removeStringListItem } = useSiteContent();
  if (!form) return null;

  return (
    <div className="space-y-6">
      {/* Contact Page */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">聯絡頁設定</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="聯絡頁眉標" value={form.contactEyebrow} onChange={(e) => updateField("contactEyebrow", e.target.value)} />
          <TextInput label="聯絡頁標題" value={form.contactTitle} onChange={(e) => updateField("contactTitle", e.target.value)} />
          <TextInput label="聯絡頁圖片 Alt" value={form.contactImageAlt} onChange={(e) => updateField("contactImageAlt", e.target.value)} />
        </div>
        <div className="mt-4 space-y-4">
          <ImageUploadField label="聯絡頁圖片" value={form.contactImageUrl ?? ""} onChange={(url) => updateField("contactImageUrl", url)} />
          <TextArea label="聯絡頁成功訊息" rows={3} value={form.contactSuccessMessage} onChange={(e) => updateField("contactSuccessMessage", e.target.value)} />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs text-neutral-400">聯絡分類選項</label>
            <button type="button" onClick={() => addStringListItem("contactCategories")} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
          </div>
          <div className="space-y-2">
            {form.contactCategories.map((item: string, index: number) => (
              <div key={`contact-cat-${index}`} className="flex gap-2 items-center">
                <input value={item} onChange={(e) => updateStringList("contactCategories", index, e.target.value)} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" />
                <button type="button" onClick={() => removeStringListItem("contactCategories", index)} className="h-10 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Classes List Page */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">課程列表頁設定</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="課程列表頁眉標" value={form.classesBannerEyebrow} onChange={(e) => updateField("classesBannerEyebrow", e.target.value)} />
          <TextInput label="課程列表頁標題" value={form.classesBannerTitle} onChange={(e) => updateField("classesBannerTitle", e.target.value)} />
          <TextInput label="課程列表頁 Banner Alt" value={form.classesBannerImageAlt} onChange={(e) => updateField("classesBannerImageAlt", e.target.value)} />
        </div>
        <div className="mt-4">
          <ImageUploadField label="課程列表頁 Banner 圖片" value={form.classesBannerImageUrl ?? ""} onChange={(url) => updateField("classesBannerImageUrl", url)} />
        </div>
      </div>
    </div>
  );
}
