"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";

export default function Contact() {
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    lineId: "",
    email: "",
    category: "",
    courseOrProduct: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  React.useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", lineId: "", email: "", category: "", courseOrProduct: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">
        
        {/* 左側: 標題與圖片 */}
        <div className="space-y-12">
          <div>
             <motion.p
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-primary text-xl font-bold mb-2 tracking-widest uppercase"
             >
               {settings?.contactEyebrow || "CONTACT"}
             </motion.p>
             <motion.h1
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-4xl md:text-6xl font-bold tracking-widest uppercase"
             >
               {settings?.contactTitle || "聯絡我們"}
             </motion.h1>
          </div>
          
          <div className="relative h-[600px] w-full rounded-lg overflow-hidden hidden lg:block">
            <Image 
              src={settings?.contactImageUrl || "/assets/18 聯絡我們/contact photo.png"}
              alt={settings?.contactImageAlt || "Contact us"}
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* 右側: 表單 */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-12 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-gray-300">姓名 NAME <span className="text-primary">*</span></label>
                <input 
                  required
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-gray-300">電話 PHONE <span className="text-primary">*</span></label>
                <input 
                  required
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="lineId" className="text-sm font-bold text-gray-300">LINE ID</label>
                <input 
                  type="text" 
                  id="lineId" 
                  name="lineId" 
                  value={formData.lineId}
                  onChange={handleChange}
                  className="w-full bg-black border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-300">電子信箱 EMAIL <span className="text-primary">*</span></label>
                <input 
                  required
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-bold text-gray-300">留言分類 TYPE <span className="text-primary">*</span></label>
              <select 
                required
                id="category" 
                name="category" 
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="" disabled>請選擇分類</option>
                {(settings?.contactCategories || ["課程報名/諮詢", "裝備購買/諮詢", "商業合作", "其他"]).map((item: string) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="courseOrProduct" className="text-sm font-bold text-gray-300">課程/商品名稱 ITEM</label>
              <input 
                type="text" 
                id="courseOrProduct" 
                name="courseOrProduct" 
                value={formData.courseOrProduct}
                onChange={handleChange}
                className="w-full bg-black border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="例如：實戰原則課程 / 戰術腰帶"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-gray-300">詳細內容 MESSAGE <span className="text-primary">*</span></label>
              <textarea 
                required
                id="message" 
                name="message" 
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-black border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <Button 
                variant="primary" 
                className="w-full py-4 text-lg font-bold flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "發送中..." : "送出表單 SUBMIT"}
              </Button>
              
              {submitStatus === "success" && (
                <p className="text-green-500 text-center mt-4 font-bold">{settings?.contactSuccessMessage || "表單已成功送出！我們會盡快與您聯絡。"}</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 text-center mt-4">發生錯誤，請稍後再試。</p>
              )}
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}
