"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fallbackBlogPosts } from "@/lib/content-fallback";

type BlogPost = {
  id: number;
  category: string;
  title: string;
  description: string;
  content?: string | null;
  imageUrl?: string | null;
  readTime: number;
  publishedAt: string;
};

const categoryColor: Record<string, string> = {
  "實戰原則": "bg-red-900/30 text-red-400 border-red-800",
  "KRAV MAGA": "bg-orange-900/30 text-orange-400 border-orange-800",
  "戰術裝備": "bg-yellow-900/30 text-yellow-400 border-yellow-800",
  "訓練裝備": "bg-green-900/30 text-green-400 border-green-800",
};

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [post, setPost] = useState<BlogPost | null>(
    fallbackBlogPosts.find((p) => p.id === parseInt(id, 10)) ?? null
  );
  const [siteName, setSiteName] = useState("祈滕");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.item) setPost(data.item);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSiteName(data.siteName || "祈滕"))
      .catch(() => {});
  }, [id]);

  if (!loading && !post) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary text-6xl font-bold mb-4">404</p>
          <p className="text-gray-400 mb-8">找不到此文章</p>
          <Link href="/blog" className="text-white border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
            返回部落格
          </Link>
        </div>
      </main>
    );
  }

  const colorClass = categoryColor[post?.category ?? ""] ?? "bg-neutral-800 text-white border-neutral-700";
  const relatedPosts = fallbackBlogPosts.filter(
    (p) => p.id !== parseInt(id, 10) && p.category === post?.category
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      {/* Banner */}
      <section className="relative h-[60vh] w-full flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={post?.imageUrl || "/assets/14 實戰原則blog/實戰原則cover-1.png"}
            alt={post?.title || ""}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${colorClass}`}>
              {post?.category}
            </span>
            <span className="text-gray-400 text-sm">
              {post?.readTime} min read
            </span>
            <span className="text-gray-500 text-sm">
              {post
                ? new Date(post.publishedAt).toLocaleDateString("zh-TW", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            {post?.title}
          </motion.h1>
        </div>
      </section>

      {/* Article Body */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        {/* Lead paragraph */}
        <p className="text-xl text-gray-300 leading-relaxed mb-10 border-l-4 border-primary pl-6 italic">
          {post?.description}
        </p>

        {/* Main content */}
        {post?.content ? (
          <div className="text-gray-300 leading-relaxed text-lg space-y-6">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-white mt-12 mb-4">
                    {paragraph.replace(/\*\*/g, "")}
                  </h2>
                );
              }
              if (paragraph.includes("\n- ")) {
                const [intro, ...items] = paragraph.split("\n- ");
                return (
                  <div key={i}>
                    {intro && <p className="mb-3">{intro}</p>}
                    <ul className="space-y-2">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start">
                          <span className="text-primary mr-3 mt-1 shrink-0">▸</span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, "<strong class='text-white'>$1</strong>") }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/\*\*(.+?)\*\*/g, "<strong class='text-white font-bold'>$1</strong>"),
                  }}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-gray-300 leading-relaxed text-lg">{post?.description}</p>
        )}

        {/* Divider */}
        <div className="my-16 border-t border-neutral-800" />

        {/* Back & Share */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-bold tracking-widest text-gray-400 hover:text-primary transition-colors group"
          >
            <span className="mr-3 transition-transform group-hover:-translate-x-1">←</span>
            返回部落格
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
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 md:px-8 pb-8">
          <h2 className="text-xl font-bold tracking-widest uppercase mb-8">
            <span className="text-primary">相關</span> 文章
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`}>
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
                    <p className="text-primary text-xs font-bold mb-1">{p.category}</p>
                    <p className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {p.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 md:p-12 text-center">
          <p className="text-primary text-sm font-bold tracking-widest mb-3 uppercase">Join Us</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">對課程有興趣？</h3>
          <p className="text-gray-400 mb-8">
            {`立即聯絡${siteName}，安排課程諮詢或了解更多訓練資訊。`}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-black font-bold px-8 py-3 hover:bg-red-700 hover:text-white transition-colors"
          >
            聯絡我們
          </Link>
        </div>
      </section>
    </main>
  );
}
