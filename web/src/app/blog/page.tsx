"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { fallbackBlogPosts } from "../../lib/content-fallback";

type BlogPost = {
  id?: number;
  category: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  readTime: number;
  publishedAt: string;
};

export default function BlogList() {
  const [categories, setCategories] = useState(["ALL"]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(fallbackBlogPosts);    

  useEffect(() => {
    fetch("/api/blog-categories").then(r => r.json()).then(d => {
      if(Array.isArray(d)) setCategories(["ALL", ...d.map((c:any) => c.name)]);
    }).catch(()=>{});
  }, []);

  useEffect(() => {
    const params = activeCategory === "ALL"
      ? "/api/blog"
      : `/api/blog?category=${encodeURIComponent(activeCategory)}`;

    fetch(params)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.items)) {
          setBlogPosts(data.items);
        }
      })
      .catch(() => {});
  }, [activeCategory]);

  const filteredPosts = activeCategory === "ALL" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Banner */}
      <section className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/14 實戰原則blog/實戰原則banner.png"
            alt="Blog banner"
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
            BLOG
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-widest uppercase"
          >
            戰術部落格
          </motion.h1>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-300 border ${
                 activeCategory === cat 
                   ? 'bg-primary border-primary text-black' 
                   : 'bg-transparent border-neutral-700 text-gray-400 hover:border-primary hover:text-white'
               }`}
             >
               {cat}
             </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="group cursor-pointer flex flex-col h-full bg-neutral-950 border border-neutral-900 rounded-lg overflow-hidden hover:border-primary transition-all">
                    <div className="relative h-60 w-full overflow-hidden">
                       <Image 
                         src={post.imageUrl || "/assets/14 實戰原則blog/實戰原則cover-1.png"} 
                         alt={post.title} 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-700"
                       />
                       <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-xs font-bold text-primary tracking-wider">
                         {post.category}
                       </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                       <div className="flex items-center justify-between text-xs text-gray-500 mb-4 font-semibold tracking-wider">
                         <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                         <span>{post.readTime} min read</span>
                       </div>
                       <h3 className="text-2xl font-bold mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                         {post.title}
                       </h3>
                       <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                         {post.description}
                       </p>
                       <div className="flex items-center text-sm font-bold mt-auto group-hover:text-primary transition-colors">
                         READ MORE <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination placeholder */}
        <div className="flex justify-center items-center mt-20 space-x-2">
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
