"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSiteSettings(data))
      .catch(() => {});
  }, []);

  const rawLinks = siteSettings?.headerLinks ?? [
    { label: "首頁", en: "HOME", href: "/" },
    { label: "關於我們", en: "ABOUT", href: "/about" },
    { label: "課程列表", en: "CLASSES", href: "/classes" },
    { label: "最新消息", en: "NEWS", href: "/news" },
    { label: "部落格", en: "BLOG", href: "/blog" },
    { label: "聯絡我們", en: "CONTACT", href: "/contact" },
  ];
  const links = rawLinks.map((item: any) => ({
    name: item.label ?? item.name ?? "",
    en: item.en ?? "",
    path: item.href ?? item.path ?? "/",
  }));

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/50 py-3" : "bg-gradient-to-b from-black/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="relative z-50" onClick={() => setIsOpen(false)}>
          <Image 
            src={siteSettings?.logoUrl || "/assets/1 首頁/logo.png"}
            alt={siteSettings?.logoAlt || "祈滕 LOGO"}
            width={180} 
            height={48} 
            className="w-32 md:w-40 h-auto object-contain transition-transform hover:scale-105"
            priority
          />
        </Link>

        {/* 桌面版導覽列 */}
        <nav className="hidden lg:flex items-center space-x-1">
          {links.map((link: { name: string; en: string; path: string }) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname?.startsWith(link.path));
            return (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`relative px-4 py-2 group overflow-hidden`}
              >
                <div className="flex flex-col items-center justify-center relative z-10">
                  <span className={`text-xs font-bold tracking-widest transition-colors duration-300 ${isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"}`}>
                    {link.en}
                  </span>
                  <span className={`text-sm tracking-widest mt-0.5 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                    {link.name}
                  </span>
                </div>
                {/* 底部線條特效 */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ease-out ${isActive ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100"}`} />
              </Link>
            );
          })}
        </nav>

        {/* 桌面版右側圖示 (搜尋 / 會員 / 購物車) */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="text-white hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button className="text-white hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>
          <button className="text-white hover:text-primary transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="absolute -top-1.5 -right-2 bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </button>
        </div>

        {/* 手機版漢堡選單按鈕 */}
        <button 
          className="lg:hidden relative z-50 p-2 text-white hover:text-primary transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between items-center">
            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isOpen ? "rotate-45 translate-y-0.5" : ""}`} />
            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isOpen ? "-rotate-45 -translate-y-0.5" : ""}`} />
          </div>
        </button>

      </div>

      {/* 手機版滿版導覽列 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 min-h-screen bg-black/95 backdrop-blur-xl z-40 lg:hidden flex flex-col pt-24 px-8 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 flex-grow">
              {links.map((link: { name: string; en: string; path: string }, i: number) => {
                 const isActive = pathname === link.path || (link.path !== "/" && pathname?.startsWith(link.path));
                 return (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    key={link.path}
                  >
                    <Link 
                      href={link.path} 
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-4 border-b border-white/10 pb-4 ${isActive ? "text-primary" : "text-white"}`}
                    >
                      <span className="text-xl font-bold tracking-widest">{link.name}</span>
                      <span className="text-sm font-bold opacity-60 uppercase">{link.en}</span>
                    </Link>
                  </motion.div>
                 );
              })}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex justify-center space-x-8"
            >
              <button className="text-white hover:text-primary transition-colors text-sm flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                登入會員
              </button>
              <button className="text-white hover:text-primary transition-colors text-sm flex flex-col items-center gap-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                購物車 (0)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
