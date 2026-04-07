"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { fallbackNewsPosts } from "@/lib/content-fallback";

type NewsPost = {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  publishedAt: string;
};

export default function News() {
  const [newsList, setNewsList] = useState<NewsPost[]>(fallbackNewsPosts);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.items) && data.items.length > 0) {
          setNewsList(data.items);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Banner */}
      <section className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/13 最新消息/Rectangle 40.png"
            alt="News banner"
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
            NEWS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-widest uppercase"
          >
            最新消息
          </motion.h1>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsList.map((news, idx) => (
            <Link key={news.id ?? `${news.title}-${idx}`} href={`/news/${news.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
                className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden group cursor-pointer hover:border-primary transition-all h-full"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={news.imageUrl || "/assets/1 首頁/news1.png"}
                    alt={news.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <p className="text-primary text-sm font-bold tracking-widest mb-3">
                    {new Date(news.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).toUpperCase()}
                  </p>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {news.description}
                  </p>
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors flex items-center">
                    READ MORE <span className="ml-2">→</span>
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="flex justify-center items-center mt-16 space-x-2">
           <Button variant="outline" className="w-10 h-10 p-0 rounded-md border-neutral-700 hover:border-primary opacity-50">&lt;</Button>
           <Button variant="primary" className="w-10 h-10 p-0 rounded-md font-bold">1</Button>
           <Button variant="outline" className="w-10 h-10 p-0 rounded-md border-neutral-700 hover:border-primary hover:text-white">2</Button>
           <Button variant="outline" className="w-10 h-10 p-0 rounded-md border-neutral-700 hover:border-primary hover:text-white">3</Button>
           <span className="px-2 text-gray-500">...</span>
           <Button variant="outline" className="w-10 h-10 p-0 rounded-md border-neutral-700 hover:border-primary hover:text-white">&gt;</Button>
        </div>
      </section>

    </main>
  );
}
