"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Footer: React.FC = () => {
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSiteSettings(data))
      .catch(() => {});
  }, []);

  const settings = siteSettings ?? {
    siteName: "祈滕",
    siteNameEn: "QI-TENG",
    logoUrl: "/assets/1 首頁/logo.png",
    logoAlt: "祈滕 LOGO",
    footerDescription: "祈滕提供專業的實戰原則訓練、KRAV MAGA 課程，以及經實戰認證的高品質戰術裝備。致力於培養學員在真實壓力下的生存與防禦能力。",
    supportEmail: "service@qiteng.com",
    supportPhone: "+886 (0)912 345 678",
    supportAddress: "",
    facebookUrl: "#",
    instagramUrl: "#",
    youtubeUrl: "#",
    lineUrl: "#",
    privacyPolicyUrl: "#",
    termsUrl: "#",
    footerSitemapLinks: [
      { label: "HOME / 首頁", href: "/" },
      { label: "ABOUT / 關於我們", href: "/about" },
      { label: "CLASSES / 課程專區", href: "/classes" },
      { label: "NEWS / 最新消息", href: "/news" },
      { label: "BLOG / 專業部落格", href: "/blog" },
      { label: "CONTACT / 聯絡我們", href: "/contact" },
    ],
    footerSupportLinks: [
      { label: "TACTICAL GEARS / 戰術裝備", href: "#" },
      { label: "TRAINING GEARS / 訓練裝備", href: "#" },
      { label: "FAQ / 常見問題", href: "#" },
      { label: "RETURN POLICY / 退換貨政策", href: "#" },
      { label: "TERMS / 服務條款", href: "#" },
    ],
    newsletterTitle: "Newsletter",
    newsletterDescription: "訂閱電子報，獲取最新課程資訊與獨家戰術裝備優惠。",
    newsletterButtonText: "SUBSCRIBE",
  };

  const socialLinks = [
    { href: settings.facebookUrl, label: "Facebook", icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg> },
    { href: settings.instagramUrl, label: "Instagram", icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.16C15.2 2.16 15.58 2.17 16.89 2.23C18.12 2.29 18.79 2.5 19.24 2.68C19.83 2.91 20.26 3.19 20.71 3.63C21.15 4.08 21.43 4.5 21.66 5.1C21.84 5.54 22.05 6.22 22.11 7.45C22.17 8.76 22.18 9.14 22.18 12.33C22.18 15.53 22.17 15.91 22.11 17.22C22.05 18.45 21.84 19.13 21.66 19.57C21.43 20.17 21.15 20.59 20.71 21.04C20.26 21.49 19.83 21.76 19.24 21.99C18.79 22.17 18.12 22.38 16.89 22.44C15.58 22.5 15.2 22.5 12 22.5C8.8 22.5 8.42 22.5 7.11 22.44C5.88 22.38 5.21 22.17 4.76 21.99C4.17 21.76 3.74 21.49 3.29 21.04C2.85 20.59 2.57 20.17 2.34 19.57C2.16 19.13 1.95 18.45 1.89 17.22C1.83 15.91 1.82 15.53 1.82 12.33C1.82 9.14 1.83 8.76 1.89 7.45C1.95 6.22 2.16 5.54 2.34 5.1C2.57 4.5 2.85 4.08 3.29 3.63C3.74 3.19 4.17 2.91 4.76 2.68C5.21 2.5 5.88 2.29 7.11 2.23C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33 0.01 7.05 0.07C5.77 0.13 4.9 0.33 4.14 0.63C3.36 0.93 2.69 1.34 2.03 2.01C1.36 2.67 0.94 3.35 0.64 4.12C0.34 4.88 0.14 5.75 0.08 7.03C0.02 8.3 0 8.72 0 11.98C0 15.24 0.02 15.66 0.08 16.94C0.14 18.22 0.34 19.09 0.64 19.85C0.94 20.61 1.36 21.29 2.03 21.96C2.69 22.62 3.36 23.04 4.14 23.34C4.9 23.64 5.77 23.84 7.05 23.9C8.33 23.96 8.74 23.97 12 23.97C15.26 23.97 15.67 23.96 16.95 23.9C18.23 23.84 19.1 23.64 19.86 23.34C20.64 23.04 21.31 22.62 21.97 21.96C22.64 21.29 23.06 20.61 23.36 19.85C23.66 19.09 23.86 18.22 23.92 16.94C23.98 15.66 24 15.24 24 11.98C24 8.72 23.98 8.3 23.92 7.03C23.86 5.75 23.66 4.88 23.36 4.12C23.06 3.35 22.64 2.67 21.97 2.01C21.31 1.34 20.64 0.93 19.86 0.63C19.1 0.33 18.23 0.13 16.95 0.07C15.67 0.01 15.26 0 12 0ZM12 5.84C8.65 5.84 5.92 8.56 5.92 11.92C5.92 15.28 8.65 18 12 18C15.35 18 18.08 15.28 18.08 11.92C18.08 8.56 15.35 5.84 12 5.84ZM12 15.84C9.84 15.84 8.08 14.08 8.08 11.92C8.08 9.76 9.84 8 12 8C14.16 8 15.92 9.76 15.92 11.92C15.92 14.08 14.16 15.84 12 15.84ZM18.4 4.16C17.61 4.16 16.96 4.81 16.96 5.6C16.96 6.39 17.61 7.04 18.4 7.04C19.19 7.04 19.84 6.39 19.84 5.6C19.84 4.81 19.19 4.16 18.4 4.16Z"/></svg> },
    { href: settings.youtubeUrl, label: "YouTube", icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21.58 7.19C21.36 6.39 20.73 5.76 19.95 5.54C18.52 5.16 12 5.16 12 5.16C12 5.16 5.48 5.16 4.05 5.54C3.27 5.76 2.64 6.39 2.42 7.19C2 8.63 2 12 2 12C2 12 2 15.37 2.42 16.81C2.64 17.61 3.27 18.24 4.05 18.46C5.48 18.84 12 18.84 12 18.84C12 18.84 18.52 18.84 19.95 18.46C20.73 18.24 21.36 17.61 21.58 16.81C22 15.37 22 12 22 12C22 12 22 8.63 21.58 7.19ZM10 15V9L15.19 12L10 15Z"/></svg> },
    { href: settings.lineUrl, label: "LINE", icon: <span className="text-xs font-bold">LINE</span> },
  ];

  return (
    <footer className="bg-black border-t border-neutral-800 pt-20 pb-10 text-gray-400 font-sans tracking-wide">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 主要區塊 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Logo 與簡介 */}
          <div className="col-span-1 lg:col-span-1 flex flex-col items-start space-y-6">
            <Link href="/">
              <Image 
                src={settings.logoUrl || "/assets/1 首頁/logo.png"}
                alt={settings.logoAlt}
                width={200} 
                height={50} 
                className="w-40 h-auto object-contain opacity-90 transition-opacity hover:opacity-100" 
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              {settings.footerDescription}
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href || "#"} aria-label={item.label} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all duration-300">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 網站導覽 */}
          <div className="col-span-1 border-l border-neutral-800 pl-4 md:pl-8">
            <h4 className="text-white font-bold tracking-widest mb-6 lg:mb-8 text-lg uppercase">Sitemaps</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-neutral-400">
              {settings.footerSitemapLinks.map((item: { label: string; href: string }) => (
                <li key={`${item.label}-${item.href}`}><Link href={item.href} className="hover:text-primary transition-colors duration-300 block">{item.label}</Link></li>
              ))}
            </ul>
          </div>

           {/* 網站導覽 (產品與支援) */}
           <div className="col-span-1 border-l border-neutral-800 pl-4 md:pl-8">
            <h4 className="text-white font-bold tracking-widest mb-6 lg:mb-8 text-lg uppercase">Products & Support</h4>
             <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-neutral-400">
                {settings.footerSupportLinks.map((item: { label: string; href: string }) => (
                  <li key={`${item.label}-${item.href}`}><Link href={item.href} className="hover:text-primary transition-colors duration-300 block">{item.label}</Link></li>
                ))}
            </ul>
          </div>

          {/* 訂閱與聯絡 */}
          <div className="col-span-1 border-l border-neutral-800 pl-4 md:pl-8">
            <h4 className="text-white font-bold tracking-widest mb-6 lg:mb-8 text-lg uppercase">{settings.newsletterTitle}</h4>
            <p className="text-sm text-neutral-500 mb-6">{settings.newsletterDescription}</p>
            
            <form className="mb-8 relative flex">
              <input 
                type="email" 
                placeholder="YOUR EMAIL..." 
                className="w-full bg-neutral-900 border border-neutral-700 p-3 pr-12 text-sm text-white focus:outline-none focus:border-primary transition-colors rounded"
                required
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 bottom-0 px-4 text-white hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest"
              >
                {settings.newsletterButtonText}
              </button>
            </form>

            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-center space-x-3 group">
                <svg className="w-4 h-4 text-neutral-600 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                 <a href={`mailto:${settings.supportEmail}`} className="hover:text-white transition-colors">{settings.supportEmail}</a>
              </li>
              <li className="flex items-center space-x-3 group">
                <svg className="w-4 h-4 text-neutral-600 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{settings.supportPhone}</span>
              </li>
              {settings.supportAddress && (
                <li className="flex items-start space-x-3 group">
                  <svg className="w-4 h-4 text-neutral-600 group-hover:text-primary transition-colors mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2.5" strokeWidth="2" />
                  </svg>
                  <span>{settings.supportAddress}</span>
                </li>
              )}
            </ul>
          </div>
          
        </div>

        {/* 底部版權宣告區 */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs font-bold tracking-widest uppercase text-neutral-600">
          <p>© {new Date().getFullYear()} {settings.siteName} {settings.siteNameEn}. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
             <Link href={settings.privacyPolicyUrl || "#"} className="hover:text-white transition-colors">PRIVACY POLICY</Link>
             <Link href={settings.termsUrl || "#"} className="hover:text-white transition-colors">TERMS OF USE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
