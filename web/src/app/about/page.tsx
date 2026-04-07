"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";

export default function About() {
  const [settings, setSettings] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  const introBlocks = settings?.aboutIntroBlocks ?? [
    { title: "民間高端訓練體系", description: "以KRAV MAGA作為核心骨幹，融入軍警實戰原則，專注於應對真實暴力威脅。祈滕戰術提供一般民眾能夠掌握，且具備高度實用性的防護技巧。" },
    { title: "軍警專業合作定位", description: "作為外部協訓單位，為軍方與執法單位補足「非制式情境」及「近身肉搏（CQB）」等高危險戰術情境的技術缺口，提升單位整體作戰效能。" },
  ];
  const principles = settings?.aboutPrinciples ?? [
    { imageUrl: "/assets/2 關於/系統設計原則1.png", title: "反應導向", description: "基於人體自然反應，縮短學習曲線" },
    { imageUrl: "/assets/2 關於/系統設計原則2.png", title: "高壓有效", description: "在心跳加速與腎上腺素激增下仍能操作" },
    { imageUrl: "/assets/2 關於/系統設計原則3.png", title: "實境模擬", description: "訓練情境設定於真實生活可能遇到的威脅" },
    { imageUrl: "/assets/2 關於/系統設計原則4.png", title: "法律相容", description: "動作選擇需符合防衛比例原則與法律框架" },
    { imageUrl: "/assets/2 關於/系統設計原則5.png", title: "持續進化", description: "隨威脅型態改變，不斷更新與優化技術" },
  ];
  const features = settings?.aboutSystemFeatures ?? ["高強度壓力抗性訓練", "戰術情境模擬", "CQB 近身肉搏", "器械防衛與奪取", "多對一威脅處理", "隨機應變能力"];
  const exchangeImages = settings?.aboutExchangeImages ?? [
    { imageUrl: "/assets/2 關於/國際交流1.png", alt: "國際交流 1" },
    { imageUrl: "/assets/2 關於/國際交流2.png", alt: "國際交流 2" },
    { imageUrl: "/assets/2 關於/國際交流3.png", alt: "國際交流 3" },
    { imageUrl: "/assets/2 關於/國際交流4.png", alt: "國際交流 4" },
  ];
  const foundationImages = settings?.aboutFoundationImages ?? [
    { imageUrl: "/assets/2 關於/國際體系基礎1.png", alt: "體系基礎 1" },
    { imageUrl: "/assets/2 關於/國際體系基礎2.png", alt: "體系基礎 2" },
    { imageUrl: "/assets/2 關於/國際體系基礎3.png", alt: "體系基礎 3" },
    { imageUrl: "/assets/2 關於/國際體系基礎4.png", alt: "體系基礎 4" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 1. 頁首 Banner (Top Banner) */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={settings?.aboutBannerImageUrl || "/assets/2 關於/關於banner.png"}
            alt={settings?.aboutBannerImageAlt || "About us banner"}
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary text-xl font-bold mb-2 tracking-widest uppercase"
          >
            {settings?.aboutBannerEyebrow || "ABOUT US"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-widest uppercase"
          >
            {settings?.aboutBannerTitle || "關於我們"}
          </motion.h1>
        </div>
      </section>

      {/* 2. 民間高端訓練體系 + 軍警合作 */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[600px] w-full hidden md:block">
          <Image 
            src="/assets/2 關於/texture bg.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-20 absolute -left-10 -top-10" 
          />
          <Image
            src={settings?.aboutCoachImageUrl || "/assets/2 關於/教練.png"}
            alt={settings?.aboutCoachImageAlt || "Coach"}
            fill
            className="object-contain relative z-10"
          />
        </div>
        <div className="space-y-8 relative z-20">
          {introBlocks.map((block: any, index: number) => (
          <div key={index}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider">{block.title}</h2>
            <div className="h-1 w-20 bg-primary mb-6" />
            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              {block.description}
            </p>
          </div>
          ))}
          <Link href={settings?.aboutPrimaryButtonLink || "/classes"}>
            <Button variant="primary" className="px-8 py-3">{settings?.aboutPrimaryButtonText || "了解課程規劃"}</Button>
          </Link>
        </div>
      </section>

      {/* 3. 系統設計原則 (Grid) */}
      <section className="py-24 bg-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-primary text-xl font-bold mb-2">PRINCIPLES</h2>
            <h3 className="text-4xl md:text-5xl font-bold uppercase mb-12">系統設計原則</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-center">
            {principles.map((principle: any, idx: number) => (
              <div key={idx} className="bg-black/50 p-6 rounded-lg border border-neutral-800 hover:border-primary transition-all group">
                <div className="relative h-24 w-24 mx-auto mb-6">
                   <Image src={principle.imageUrl} alt={principle.title} fill className="object-contain group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-xl font-bold mb-3">{principle.title}</h4>
                <p className="text-xs text-gray-400">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KRAV MAGA 戰術訓練系統 */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-xl font-bold mb-2">{settings?.aboutSystemEyebrow || "SYSTEM"}</h2>
          <h3 className="text-3xl md:text-5xl font-bold uppercase mb-6">{settings?.aboutSystemTitle || "KRAV MAGA 戰術訓練系統"}</h3>
          <div className="flex justify-center flex-wrap gap-4 max-w-4xl mx-auto">
             {features.map((feature: string, i: number) => (
               <span key={i} className="px-6 py-2 bg-neutral-800 rounded-full text-sm font-semibold border border-neutral-700">
                 <Image src="/assets/2 關於/check icon.png" alt="check" width={16} height={16} className="inline-block mr-2" />
                 {feature}
               </span>
             ))}
          </div>
        </div>
        <div className="relative w-full aspect-video md:aspect-[21/9] max-w-5xl mx-auto">
            <Image src={settings?.aboutSystemImageUrl || "/assets/2 關於/KRAV MAGA 戰術訓練系統.png"} alt={settings?.aboutSystemImageAlt || "戰術訓練系統圖表"} fill className="object-contain" />
        </div>
      </section>

      {/* 5. 國際交流與體系基礎 */}
      <section className="py-24 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* 左側: 國際交流 */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-8 uppercase flex items-center">
              <span className="w-10 h-1 bg-primary mr-4 inline-block"></span>
              {settings?.aboutExchangeTitle || "國際交流"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {exchangeImages.map((img: any, i: number) => (
                <div key={i} className="relative h-40 rounded-lg overflow-hidden border border-neutral-800 opacity-80 hover:opacity-100 transition-opacity">
                   <Image src={img.imageUrl} alt={img.alt || `國際交流 ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="mt-8 text-gray-400 leading-relaxed">
              {settings?.aboutExchangeText || "祈滕戰術定期與各國頂尖訓練機構進行技術交流，由教練群親赴海外受訓，將國際最新型態的威脅處置技術與反恐經驗引進國內。"}
            </p>
          </div>

          {/* 右側: 國際體系基礎 */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-8 uppercase flex items-center">
              <span className="w-10 h-1 bg-primary mr-4 inline-block"></span>
              {settings?.aboutFoundationTitle || "國際體系基礎"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
               {foundationImages.map((img: any, i: number) => (
                <div key={i} className="relative h-28 bg-white/5 rounded-lg flex justify-center items-center p-4 border border-neutral-800">
                   <Image src={img.imageUrl} alt={img.alt || `體系基礎 ${i + 1}`} fill className="object-contain p-4" />
                </div>
              ))}
            </div>
            <p className="mt-8 text-gray-400 leading-relaxed">
              {settings?.aboutFoundationText || "我們的技術立基於國際最具公信力的 Krav Maga 總部，確保所傳授的每一項動作皆經過實戰驗證，符合當代最高的防衛標準。"}
            </p>
          </div>
        </div>
      </section>

      {/* 6.能力運作模型 */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
         <h2 className="text-primary text-xl font-bold mb-2">{settings?.aboutModelEyebrow || "MODEL"}</h2>
         <h3 className="text-3xl md:text-5xl font-bold uppercase mb-12">{settings?.aboutModelTitle || "能力運作模型"}</h3>
         <div className="relative w-full aspect-square md:aspect-video max-w-3xl">
           <Image src={settings?.aboutModelImageUrl || "/assets/2 關於/能力運作模型.png"} alt={settings?.aboutModelImageAlt || "能力運作模型"} fill className="object-contain" />
         </div>
      </section>

    </main>
  );
}
