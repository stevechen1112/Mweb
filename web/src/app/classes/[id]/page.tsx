"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { getFallbackCourseBySlug } from "@/lib/content-fallback";

export default function ClassDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const classId = resolvedParams.id;

  const [course, setCourse] = useState(() => getFallbackCourseBySlug(classId));
  const [siteName, setSiteName] = useState("祈滕");

  useEffect(() => {
    setCourse(getFallbackCourseBySlug(classId));

    fetch(`/api/courses/${encodeURIComponent(classId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.item) {
          setCourse({
            ...data.item,
            bannerImage: data.item.bannerImage || getFallbackCourseBySlug(classId).bannerImage,
          });
        }
      })
      .catch(() => {});

    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSiteName(data.siteName || "祈滕"))
      .catch(() => {});
  }, [classId]);

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      {/* 1. Top Banner */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image src={course.bannerImage} alt="Class banner" fill className="object-cover opacity-60" priority sizes="100vw" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-primary text-xl font-bold mb-2 tracking-widest uppercase">
            {course.titleEn}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-bold tracking-widest uppercase">
            {course.titleZh}
          </motion.h1>
        </div>
      </section>

      {/* 2. 課程簡介 */}
      <section className="py-24 px-4 md:px-12 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-primary text-xl font-bold tracking-widest uppercase">INTRODUCTION</h2>
        <h3 className="text-3xl md:text-4xl font-bold">{course.subtitle}</h3>
        <div className="h-1 w-16 bg-primary mx-auto my-6" />
        <p className="text-gray-400 leading-relaxed text-lg text-left md:text-center">{course.intro}</p>
      </section>

      {/* 3. 適合對象 */}
      <section className="py-20 bg-neutral-900 border-y border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-widest">
            <span className="text-primary">TARGET</span> 適合對象
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.targets.map((target, idx) => (
              <div key={idx} className="flex items-start bg-black/40 p-6 rounded-lg border border-neutral-800">
                <span className="text-primary font-bold mr-4 text-xl shrink-0">0{idx + 1}</span>
                <p className="text-lg text-gray-300">{target}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 課程模組架構 */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-xl font-bold mb-2">MODULES</h2>
          <h3 className="text-3xl md:text-5xl font-bold uppercase">課程模組架構</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {course.modules.map((mod, idx) => (
            <div key={idx} className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl text-center group hover:border-primary transition-all">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-primary/10 border border-primary/30 text-primary text-4xl font-bold group-hover:bg-primary/20 transition-all">
                0{idx + 1}
              </div>
              <h4 className="text-2xl font-bold mb-4">{mod.title}</h4>
              <p className="text-gray-400">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="mt-12 bg-primary relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between text-black">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">準備好大改變自己了嗎？</h2>
            <p className="text-xl font-semibold opacity-90">{`立即聯絡${siteName}，安排最適合你的課程規劃。`}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-primary px-8 py-3 bg-transparent">
                詢問服務
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="primary" className="bg-black text-primary border-black hover:bg-neutral-900 px-8 py-3">
                立即報名
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}