"use client";

import { useSiteContent } from "../SiteContentContext";
import ImageUploadField from "@/components/ImageUploadField";
import { TextInput, TextArea } from "@/components/FormFields";

export default function HomePage() {
  const { form, updateField, updateObjectList, addObjectListItem, removeObjectListItem } = useSiteContent();
  if (!form) return null;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">Hero 區塊</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Hero 標題" value={form.homeHeroTitle} onChange={(e) => updateField("homeHeroTitle", e.target.value)} />
          <TextInput label="Hero 副標" value={form.homeHeroSubtitle} onChange={(e) => updateField("homeHeroSubtitle", e.target.value)} />
          <TextInput label="Hero 按鈕文字" value={form.homeHeroButtonText} onChange={(e) => updateField("homeHeroButtonText", e.target.value)} />
          <TextInput label="Hero 按鈕連結" value={form.homeHeroButtonLink} onChange={(e) => updateField("homeHeroButtonLink", e.target.value)} />
          <TextInput label="Hero 圖片 Alt" value={form.homeHeroImageAlt} onChange={(e) => updateField("homeHeroImageAlt", e.target.value)} />
          <div className="md:col-span-2">
            <ImageUploadField label="Hero 圖片" value={form.homeHeroImageUrl ?? ""} onChange={(url) => updateField("homeHeroImageUrl", url)} />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">首頁 About 區塊</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="眉標" value={form.homeAboutEyebrow} onChange={(e) => updateField("homeAboutEyebrow", e.target.value)} />
          <TextInput label="標題" value={form.homeAboutTitle} onChange={(e) => updateField("homeAboutTitle", e.target.value)} />
          <TextInput label="按鈕文字" value={form.homeAboutButtonText} onChange={(e) => updateField("homeAboutButtonText", e.target.value)} />
          <TextInput label="按鈕連結" value={form.homeAboutButtonLink} onChange={(e) => updateField("homeAboutButtonLink", e.target.value)} />
          <TextInput label="圖片 Alt" value={form.homeAboutImageAlt} onChange={(e) => updateField("homeAboutImageAlt", e.target.value)} />
          <div className="md:col-span-2">
            <ImageUploadField label="About 圖片" value={form.homeAboutImageUrl ?? ""} onChange={(url) => updateField("homeAboutImageUrl", url)} />
          </div>
        </div>
        <div className="mt-4">
          <TextArea label="首頁 About 說明文" rows={4} value={form.homeAboutDescription} onChange={(e) => updateField("homeAboutDescription", e.target.value)} />
        </div>
      </div>

      {/* Section Titles */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">區塊標題</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="課程區眉標" value={form.homeClassesEyebrow} onChange={(e) => updateField("homeClassesEyebrow", e.target.value)} />
          <TextInput label="課程區標題" value={form.homeClassesTitle} onChange={(e) => updateField("homeClassesTitle", e.target.value)} />
          <TextInput label="商城區眉標" value={form.homeShopEyebrow} onChange={(e) => updateField("homeShopEyebrow", e.target.value)} />
          <TextInput label="商城區標題" value={form.homeShopTitle} onChange={(e) => updateField("homeShopTitle", e.target.value)} />
          <TextInput label="消息區眉標" value={form.homeNewsEyebrow} onChange={(e) => updateField("homeNewsEyebrow", e.target.value)} />
          <TextInput label="消息區標題" value={form.homeNewsTitle} onChange={(e) => updateField("homeNewsTitle", e.target.value)} />
        </div>
      </div>

      {/* Featured Classes */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">精選課程卡片</h2>
          <button type="button" onClick={() => addObjectListItem("homeFeaturedClasses", { title: "", imageUrl: "", link: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-4">
          {form.homeFeaturedClasses.map((item: any, index: number) => (
            <div key={`class-card-${index}`} className="border border-neutral-800 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextInput label="標題" value={item.title} onChange={(e) => updateObjectList("homeFeaturedClasses", index, "title", e.target.value)} />
                <TextInput label="連結" value={item.link} onChange={(e) => updateObjectList("homeFeaturedClasses", index, "link", e.target.value)} />
              </div>
              <ImageUploadField label="卡片圖片" value={item.imageUrl ?? ""} onChange={(url) => updateObjectList("homeFeaturedClasses", index, "imageUrl", url)} />
              <div className="flex justify-end">
                <button type="button" onClick={() => removeObjectListItem("homeFeaturedClasses", index)} className="h-9 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shop Cards */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">商城卡片</h2>
          <button type="button" onClick={() => addObjectListItem("homeShopCards", { title: "", imageUrl: "", buttonText: "", link: "" })} className="text-xs text-neutral-400 hover:text-white transition">+ 新增</button>
        </div>
        <div className="space-y-4">
          {form.homeShopCards.map((item: any, index: number) => (
            <div key={`shop-card-${index}`} className="border border-neutral-800 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextInput label="標題" value={item.title} onChange={(e) => updateObjectList("homeShopCards", index, "title", e.target.value)} />
                <TextInput label="按鈕文字" value={item.buttonText} onChange={(e) => updateObjectList("homeShopCards", index, "buttonText", e.target.value)} />
                <TextInput label="連結" value={item.link} onChange={(e) => updateObjectList("homeShopCards", index, "link", e.target.value)} />
              </div>
              <ImageUploadField label="卡片圖片" value={item.imageUrl ?? ""} onChange={(url) => updateObjectList("homeShopCards", index, "imageUrl", url)} />
              <div className="flex justify-end">
                <button type="button" onClick={() => removeObjectListItem("homeShopCards", index)} className="h-9 px-3 rounded-lg border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-700 transition text-sm">刪除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
