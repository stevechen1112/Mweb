"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fallbackCourses } from "@/lib/content-fallback";

type Course = {
  slug: string;
  titleZh: string;
  titleEn: string;
  bannerImage?: string | null;
  listImage?: string;
};

export default function ClassesList() {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.items) && data.items.length > 0) {
          setCourses(data.items);
        }
      })
      .catch(() => {});

    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Banner */}
      <section className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={settings?.classesBannerImageUrl || "/assets/3 課程列表/課程列表banner.png"}
            alt={settings?.classesBannerImageAlt || "Classes banner"}
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
            {settings?.classesBannerEyebrow || "CLASSES"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-widest uppercase"
          >
            {settings?.classesBannerTitle || "祈滕課程"}
          </motion.h1>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 px-4 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <Link href={`/classes/${course.slug}`} key={course.slug}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
                className="group relative bg-black rounded-lg overflow-hidden border border-neutral-800 hover:border-primary transition-all duration-300 cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={course.listImage || course.bannerImage || "/assets/3 課程列表/課程1.png"} 
                    alt={course.titleZh} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-wider">{course.titleZh}</h3>
                    <p className="text-primary text-xs font-bold tracking-widest uppercase">{course.titleEn}</p>
                    <div className="h-1 w-12 bg-primary mt-4 transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
