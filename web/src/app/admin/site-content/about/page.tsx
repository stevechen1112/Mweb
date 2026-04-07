"use client";

import { useSiteContent } from "../SiteContentContext";
import ImageUploadField from "@/components/ImageUploadField";
import { TextInput, TextArea } from "@/components/FormFields";

export default function AboutPage() {
  const { form, updateField, updateObjectList, addObjectListItem, removeObjectListItem, updateStringList, addStringListItem, removeStringListItem } = useSiteContent();
  if (!form) return null;

  return (
    <div className="space-y-6">
      {/* Banner & Coach */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">Banner 與教練</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Banner 眉標" value={form.aboutBannerEyebrow} onChange={(e) => updateField("aboutBannerEyebrow", e.target.value)} />
          <TextInput label="Banner 標題" value={form.aboutBannerTitle} onChange={(e) => updateField("aboutBannerTitle", e.target.value)} />
          <TextInput label="Banner 圖片 Alt" value={form.aboutBannerImageAlt} onChange={(e) => updateField("aboutBannerImageAlt", e.target.value)} />
          <TextInput label="教練圖 Alt" value={form.aboutCoachImageAlt} onChange={(e) => updateField("aboutCoachImageAlt", e.target.value)} />
          <TextInput label="主按鈕文字" value={form.aboutPrimaryButtonText} onChange={(e) => updateField("aboutPrimaryButtonText", e.target.value)} />
          <TextInput label="主按鈕連結" value={form.aboutPrimaryButtonLink} onChange={(e) => updateField("aboutPrimaryButtonLink", e.target.value)} />
        </div>
        <div className="mt-4 space-y-4">
          <ImageUploadField label="Banner 圖片" value={form.aboutBannerImageUrl ?? ""} onChange={(url) => updateField("aboutBannerImageUrl", url)} />
          <ImageUploadField label="教練圖" value={form.aboutCoachImageUrl ?? ""} onChange={(url) => updateField("aboutCoachImageUrl", url)} />
        </div>
      </div>

      {/* Intro Blocks */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">前言區塊</h2>
          <button type="button" onClick={() => addObjectListItem("aboutIntroBlocks", { title: "", description: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-4">
          {form.aboutIntroBlocks.map((item: any, index: number) => (
            <div key={`intro-${index}`} className="border border-neutral-800 rounded-lg p-4 space-y-3">
              <TextInput label="標題" value={item.title} onChange={(e) => updateObjectList("aboutIntroBlocks", index, "title", e.target.value)} />
              <TextArea label="說明文" rows={4} value={item.description} onChange={(e) => updateObjectList("aboutIntroBlocks", index, "description", e.target.value)} />
              <div className="flex justify-end">
                <button type="button" onClick={() => removeObjectListItem("aboutIntroBlocks", index)} className="h-9 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Principles */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">設計原則卡片</h2>
          <button type="button" onClick={() => addObjectListItem("aboutPrinciples", { title: "", description: "", imageUrl: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-4">
          {form.aboutPrinciples.map((item: any, index: number) => (
            <div key={`principle-${index}`} className="border border-neutral-800 rounded-lg p-4 space-y-3">
              <TextInput label="標題" value={item.title} onChange={(e) => updateObjectList("aboutPrinciples", index, "title", e.target.value)} />
              <TextArea label="說明文" rows={3} value={item.description} onChange={(e) => updateObjectList("aboutPrinciples", index, "description", e.target.value)} />
              <ImageUploadField label="圖片" value={item.imageUrl ?? ""} onChange={(url) => updateObjectList("aboutPrinciples", index, "imageUrl", url)} />
              <div className="flex justify-end">
                <button type="button" onClick={() => removeObjectListItem("aboutPrinciples", index)} className="h-9 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">系統區塊</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="系統區眉標" value={form.aboutSystemEyebrow} onChange={(e) => updateField("aboutSystemEyebrow", e.target.value)} />
          <TextInput label="系統區標題" value={form.aboutSystemTitle} onChange={(e) => updateField("aboutSystemTitle", e.target.value)} />
          <TextInput label="系統圖 Alt" value={form.aboutSystemImageAlt} onChange={(e) => updateField("aboutSystemImageAlt", e.target.value)} />
        </div>
        <div className="mt-4">
          <ImageUploadField label="系統圖" value={form.aboutSystemImageUrl ?? ""} onChange={(url) => updateField("aboutSystemImageUrl", url)} />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs text-neutral-400">系統特點條列</label>
            <button type="button" onClick={() => addStringListItem("aboutSystemFeatures")} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
          </div>
          <div className="space-y-2">
            {form.aboutSystemFeatures.map((item: string, index: number) => (
              <div key={`feature-${index}`} className="flex gap-2 items-center">
                <input value={item} onChange={(e) => updateStringList("aboutSystemFeatures", index, e.target.value)} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500" />
                <button type="button" onClick={() => removeStringListItem("aboutSystemFeatures", index)} className="h-10 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exchange & Foundation */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">國際交流與體系基礎</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="國際交流標題" value={form.aboutExchangeTitle} onChange={(e) => updateField("aboutExchangeTitle", e.target.value)} />
          <TextInput label="國際體系基礎標題" value={form.aboutFoundationTitle} onChange={(e) => updateField("aboutFoundationTitle", e.target.value)} />
        </div>
        <div className="mt-4 space-y-4">
          <TextArea label="國際交流說明文" rows={4} value={form.aboutExchangeText} onChange={(e) => updateField("aboutExchangeText", e.target.value)} />
          <TextArea label="國際體系基礎說明文" rows={4} value={form.aboutFoundationText} onChange={(e) => updateField("aboutFoundationText", e.target.value)} />
        </div>
      </div>

      {/* Exchange Images */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">國際交流圖片</h2>
          <button type="button" onClick={() => addObjectListItem("aboutExchangeImages", { imageUrl: "", alt: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-4">
          {form.aboutExchangeImages.map((item: any, index: number) => (
            <div key={`exchange-${index}`} className="border border-neutral-800 rounded-lg p-4 space-y-3">
              <TextInput label="Alt" value={item.alt} onChange={(e) => updateObjectList("aboutExchangeImages", index, "alt", e.target.value)} />
              <ImageUploadField label="圖片" value={item.imageUrl ?? ""} onChange={(url) => updateObjectList("aboutExchangeImages", index, "imageUrl", url)} />
              <div className="flex justify-end">
                <button type="button" onClick={() => removeObjectListItem("aboutExchangeImages", index)} className="h-9 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Foundation Images */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">國際體系基礎圖片</h2>
          <button type="button" onClick={() => addObjectListItem("aboutFoundationImages", { imageUrl: "", alt: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-4">
          {form.aboutFoundationImages.map((item: any, index: number) => (
            <div key={`foundation-${index}`} className="border border-neutral-800 rounded-lg p-4 space-y-3">
              <TextInput label="Alt" value={item.alt} onChange={(e) => updateObjectList("aboutFoundationImages", index, "alt", e.target.value)} />
              <ImageUploadField label="圖片" value={item.imageUrl ?? ""} onChange={(url) => updateObjectList("aboutFoundationImages", index, "imageUrl", url)} />
              <div className="flex justify-end">
                <button type="button" onClick={() => removeObjectListItem("aboutFoundationImages", index)} className="h-9 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">能力模型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="能力模型眉標" value={form.aboutModelEyebrow} onChange={(e) => updateField("aboutModelEyebrow", e.target.value)} />
          <TextInput label="能力模型標題" value={form.aboutModelTitle} onChange={(e) => updateField("aboutModelTitle", e.target.value)} />
          <TextInput label="能力模型圖片 Alt" value={form.aboutModelImageAlt} onChange={(e) => updateField("aboutModelImageAlt", e.target.value)} />
        </div>
        <div className="mt-4">
          <ImageUploadField label="能力模型圖片" value={form.aboutModelImageUrl ?? ""} onChange={(url) => updateField("aboutModelImageUrl", url)} />
        </div>
      </div>
    </div>
  );
}
