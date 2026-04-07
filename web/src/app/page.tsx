"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { fallbackNewsPosts } from "@/lib/content-fallback";

type HomeNewsPost = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  publishedAt: string;
};

export default function Home() {
  const [newsList, setNewsList] = useState<HomeNewsPost[]>(fallbackNewsPosts.slice(0, 3));
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.items) && data.items.length > 0) {
          setNewsList(data.items.slice(0, 3));
        }
      })
      .catch(() => {});

    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSiteSettings(data))
      .catch(() => {});
  }, []);

  const featuredClasses = siteSettings?.homeFeaturedClasses ?? [
    { title: "實戰原則", imageUrl: "/assets/1 首頁/課程1.png", link: "/classes/1" },
    { title: "KRAV MAGA", imageUrl: "/assets/1 首頁/課程2.png", link: "/classes/2" },
    { title: "戰術應用", imageUrl: "/assets/1 首頁/課程3.png", link: "/classes/3" },
  ];
  const shopCards = siteSettings?.homeShopCards ?? [
    { title: "戰術裝備", imageUrl: "/assets/1 首頁/戰術裝備.png", buttonText: "SHOP NOW", link: "#" },
    { title: "訓練裝備", imageUrl: "/assets/1 首頁/訓練裝備.png", buttonText: "SHOP NOW", link: "#" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteSettings?.homeHeroImageUrl || "/assets/1 首頁/關於上方banner.png"}
            alt={siteSettings?.homeHeroImageAlt || "祈滕戰術企業"}
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-widest mb-6"
          >
            {siteSettings?.homeHeroTitle || "祈滕戰術企業"} <br className="md:hidden" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-300 mb-10 tracking-widest uppercase"
          >
            {siteSettings?.homeHeroSubtitle || "CHITENG TACTICAL CO."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href={siteSettings?.homeHeroButtonLink || "/about"}>
              <Button variant="primary" className="px-8 py-3 text-lg font-bold">
                {siteSettings?.homeHeroButtonText || "DISCOVER MORE"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT US */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-primary text-xl font-bold mb-2">{siteSettings?.homeAboutEyebrow || "ABOUT US"}</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 uppercase">
            {siteSettings?.homeAboutTitle || "Training & Tactical Solutions"}
          </h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {siteSettings?.homeAboutDescription || "祈滕戰術企業致力於提供頂級的實戰防衛訓練與高品質戰術裝備。我們的目標是讓每一位學員建立正確的安全防衛意識，掌握真實威脅情境下的應對能力，並提供最適合的後勤裝備支援。"}
          </p>
          <Link href={siteSettings?.homeAboutButtonLink || "/about"}>
            <Button variant="outline">{siteSettings?.homeAboutButtonText || "關於我們"}</Button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px]">
          <Image
            src={siteSettings?.homeAboutImageUrl || "/assets/1 首頁/關於.png"}
            alt={siteSettings?.homeAboutImageAlt || "About Us"}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* 3. OUR CLASSES */}
      <section className="py-24 bg-neutral-900 px-4 md:px-12">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-primary text-xl font-bold mb-2">{siteSettings?.homeClassesEyebrow || "OUR CLASSES"}</h2>
          <h3 className="text-3xl md:text-5xl font-bold uppercase">{siteSettings?.homeClassesTitle || "專業課程"}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredClasses.map((cls: any, i: number) => (
            <Link href={cls.link} key={i}>
              <div className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer">
                <Image src={cls.imageUrl} alt={cls.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-2xl font-bold">{cls.title}</h4>
                  <div className="h-1 w-12 bg-primary mt-4 transition-all duration-300 group-hover:w-full" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/classes">
            <Button variant="outline">查看所有課程</Button>
          </Link>
        </div>
      </section>

      {/* 4. SHOP & EQUIPMENT */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-xl font-bold mb-2">{siteSettings?.homeShopEyebrow || "SHOP"}</h2>
          <h3 className="text-3xl md:text-5xl font-bold uppercase">{siteSettings?.homeShopTitle || "裝備商城"}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shopCards.map((shop: any, index: number) => (
          <div key={index} className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg group">
            <Image src={shop.imageUrl} alt={shop.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h4 className="text-3xl font-bold tracking-wider mb-4 text-shadow-lg">{shop.title}</h4>
              <Link href={shop.link || "#"}><Button variant="primary">{shop.buttonText}</Button></Link>
            </div>
          </div>
          ))}
        </div>
      </section>

      {/* 5. LATEST NEWS */}
      <section className="py-24 bg-neutral-900 px-4 md:px-12">
         <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-primary text-xl font-bold mb-2">{siteSettings?.homeNewsEyebrow || "NEWS"}</h2>
          <h3 className="text-3xl md:text-5xl font-bold uppercase">{siteSettings?.homeNewsTitle || "最新消息"}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {newsList.map((news, i) => (
            <Link key={news.id ?? i} href={`/news/${news.id}`}>
              <div className="bg-black rounded-lg overflow-hidden border border-neutral-800 hover:border-primary transition-colors cursor-pointer group">
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={news.imageUrl || "/assets/1 首頁/news1.png"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-primary text-sm font-bold mb-2">
                    {new Date(news.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).toUpperCase()}
                  </p>
                  <h4 className="text-xl font-bold mb-4 line-clamp-2">{news.title}</h4>
                  <p className="text-sm text-gray-400 group-hover:text-primary transition-colors">閱讀更多 →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
