"use client";

import { useSiteContent } from "../SiteContentContext";
import ImageUploadField from "@/components/ImageUploadField";
import { TextInput, TextArea } from "@/components/FormFields";

export default function GeneralPage() {
  const { form, updateField } = useSiteContent();
  if (!form) return null;

  return (
    <div className="space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">基本資訊</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="網站名稱" value={form.siteName} onChange={(e) => updateField("siteName", e.target.value)} />
          <TextInput label="網站英文名稱" value={form.siteNameEn} onChange={(e) => updateField("siteNameEn", e.target.value)} />
          <TextInput label="Logo Alt" value={form.logoAlt} onChange={(e) => updateField("logoAlt", e.target.value)} />
          <div className="md:col-span-2">
            <ImageUploadField label="Logo 圖片" value={form.logoUrl ?? ""} onChange={(url) => updateField("logoUrl", url)} />
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">社群連結</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Facebook 連結" value={form.facebookUrl} onChange={(e) => updateField("facebookUrl", e.target.value)} />
          <TextInput label="Instagram 連結" value={form.instagramUrl} onChange={(e) => updateField("instagramUrl", e.target.value)} />
          <TextInput label="YouTube 連結" value={form.youtubeUrl} onChange={(e) => updateField("youtubeUrl", e.target.value)} />
          <TextInput label="LINE 連結" value={form.lineUrl} onChange={(e) => updateField("lineUrl", e.target.value)} />
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-white mb-5">聯絡方式</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="客服 Email" value={form.supportEmail} onChange={(e) => updateField("supportEmail", e.target.value)} />
          <TextInput label="客服電話" value={form.supportPhone} onChange={(e) => updateField("supportPhone", e.target.value)} />
          <TextInput label="隱私權政策連結" value={form.privacyPolicyUrl} onChange={(e) => updateField("privacyPolicyUrl", e.target.value)} />
          <TextInput label="服務條款連結" value={form.termsUrl} onChange={(e) => updateField("termsUrl", e.target.value)} />
        </div>
        <div className="mt-4 space-y-4">
          <TextArea label="地址／補充聯絡資訊" rows={3} value={form.supportAddress} onChange={(e) => updateField("supportAddress", e.target.value)} />
          <TextArea label="Footer 公司簡介" rows={4} value={form.footerDescription} onChange={(e) => updateField("footerDescription", e.target.value)} />
        </div>
      </div>
    </div>
  );
}
