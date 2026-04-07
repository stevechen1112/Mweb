"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fallbackNewsPosts } from "@/lib/content-fallback";

type NewsPost = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  publishedAt: string;
};

export default function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [post, setPost] = useState<NewsPost | null>(
    fallbackNewsPosts.find((p) => p.id === parseInt(id, 10)) ?? null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.item) setPost(data.item);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (!loading && !post) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary text-6xl font-bold mb-4">404</p>
          <p className="text-gray-400 mb-8">找不到此消息</p>
          <Link href="/news" className="text-white border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
            返回最新消息
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      {/* Banner */}
      <section className="relative h-[55vh] w-full flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={post?.imageUrl || "/assets/1 首頁/news1.png"}
            alt={post?.title || ""}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 pb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary text-sm font-bold tracking-widest mb-3 uppercase"
          >
            NEWS &nbsp;/&nbsp;{" "}
            {post
              ? new Date(post.publishedAt).toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            {post?.title}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300 text-xl leading-relaxed whitespace-pre-line">
            {post?.description}
          </p>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-neutral-800" />

        {/* Back & Share */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/news"
            className="inline-flex items-center text-sm font-bold tracking-widest text-gray-400 hover:text-primary transition-colors group"
          >
            <span className="mr-3 transition-transform group-hover:-translate-x-1">←</span>
            返回最新消息
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-bold tracking-widest uppercase">Share</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Other News */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pb-8">
        <h2 className="text-xl font-bold tracking-widest uppercase mb-8 text-white">
          <span className="text-primary">其他</span> 最新消息
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {fallbackNewsPosts
            .filter((p) => p.id !== parseInt(id, 10))
            .slice(0, 3)
            .map((p) => (
              <Link key={p.id} href={`/news/${p.id}`}>
                <div className="group border border-neutral-800 rounded-lg overflow-hidden hover:border-primary transition-colors">
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-primary text-xs font-bold mb-1">
                      {new Date(p.publishedAt).toLocaleDateString("zh-TW")}
                    </p>
                    <p className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {p.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
