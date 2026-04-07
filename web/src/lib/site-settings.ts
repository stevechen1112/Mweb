import { prisma } from "./prisma";

export type NavLinkItem = {
  label: string;
  en: string;
  href: string;
};

export type SimpleLinkItem = {
  label: string;
  href: string;
};

export type HomeFeatureCard = {
  title: string;
  imageUrl: string;
  link: string;
};

export type ShopCard = {
  title: string;
  imageUrl: string;
  buttonText: string;
  link: string;
};

export type TextBlock = {
  title: string;
  description: string;
};

export type PrincipleItem = {
  title: string;
  description: string;
  imageUrl: string;
};

export type ImageItem = {
  imageUrl: string;
  alt: string;
};

export type SiteSettingsPayload = {
  siteName: string;
  siteNameEn: string;
  logoUrl: string | null;
  logoAlt: string;
  footerDescription: string;
  supportEmail: string;
  supportPhone: string;
  supportAddress: string;
  privacyPolicyUrl: string;
  termsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  lineUrl: string;
  headerLinks: NavLinkItem[];
  footerSitemapLinks: SimpleLinkItem[];
  footerSupportLinks: SimpleLinkItem[];
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeHeroButtonText: string;
  homeHeroButtonLink: string;
  homeHeroImageUrl: string | null;
  homeHeroImageAlt: string;
  homeAboutEyebrow: string;
  homeAboutTitle: string;
  homeAboutDescription: string;
  homeAboutButtonText: string;
  homeAboutButtonLink: string;
  homeAboutImageUrl: string | null;
  homeAboutImageAlt: string;
  homeClassesEyebrow: string;
  homeClassesTitle: string;
  homeFeaturedClasses: HomeFeatureCard[];
  homeShopEyebrow: string;
  homeShopTitle: string;
  homeShopCards: ShopCard[];
  homeNewsEyebrow: string;
  homeNewsTitle: string;
  aboutBannerEyebrow: string;
  aboutBannerTitle: string;
  aboutBannerImageUrl: string | null;
  aboutBannerImageAlt: string;
  aboutCoachImageUrl: string | null;
  aboutCoachImageAlt: string;
  aboutIntroBlocks: TextBlock[];
  aboutPrimaryButtonText: string;
  aboutPrimaryButtonLink: string;
  aboutPrinciples: PrincipleItem[];
  aboutSystemEyebrow: string;
  aboutSystemTitle: string;
  aboutSystemFeatures: string[];
  aboutSystemImageUrl: string | null;
  aboutSystemImageAlt: string;
  aboutExchangeTitle: string;
  aboutExchangeImages: ImageItem[];
  aboutExchangeText: string;
  aboutFoundationTitle: string;
  aboutFoundationImages: ImageItem[];
  aboutFoundationText: string;
  aboutModelEyebrow: string;
  aboutModelTitle: string;
  aboutModelImageUrl: string | null;
  aboutModelImageAlt: string;
  contactEyebrow: string;
  contactTitle: string;
  contactImageUrl: string | null;
  contactImageAlt: string;
  contactSuccessMessage: string;
  contactCategories: string[];
  classesBannerEyebrow: string;
  classesBannerTitle: string;
  classesBannerImageUrl: string | null;
  classesBannerImageAlt: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettingsPayload = {
  siteName: "祈滕",
  siteNameEn: "QI-TENG",
  logoUrl: "/assets/1 首頁/logo.png",
  logoAlt: "祈滕 LOGO",
  footerDescription:
    "祈滕提供專業的實戰原則訓練、KRAV MAGA 課程，以及經實戰認證的高品質戰術裝備。致力於培養學員在真實壓力下的生存與防禦能力。",
  supportEmail: "service@qiteng.com",
  supportPhone: "+886 (0)912 345 678",
  supportAddress: "",
  privacyPolicyUrl: "#",
  termsUrl: "#",
  facebookUrl: "#",
  instagramUrl: "#",
  youtubeUrl: "#",
  lineUrl: "#",
  headerLinks: [
    { label: "首頁", en: "HOME", href: "/" },
    { label: "關於我們", en: "ABOUT", href: "/about" },
    { label: "課程列表", en: "CLASSES", href: "/classes" },
    { label: "最新消息", en: "NEWS", href: "/news" },
    { label: "部落格", en: "BLOG", href: "/blog" },
    { label: "聯絡我們", en: "CONTACT", href: "/contact" },
  ],
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
  homeHeroTitle: "祈滕戰術企業",
  homeHeroSubtitle: "CHITENG TACTICAL CO.",
  homeHeroButtonText: "DISCOVER MORE",
  homeHeroButtonLink: "/about",
  homeHeroImageUrl: "/assets/1 首頁/關於上方banner.png",
  homeHeroImageAlt: "祈滕戰術企業",
  homeAboutEyebrow: "ABOUT US",
  homeAboutTitle: "Training & Tactical Solutions",
  homeAboutDescription:
    "祈滕戰術企業致力於提供頂級的實戰防衛訓練與高品質戰術裝備。我們的目標是讓每一位學員建立正確的安全防衛意識，掌握真實威脅情境下的應對能力，並提供最適合的後勤裝備支援。",
  homeAboutButtonText: "關於我們",
  homeAboutButtonLink: "/about",
  homeAboutImageUrl: "/assets/1 首頁/關於.png",
  homeAboutImageAlt: "About Us",
  homeClassesEyebrow: "OUR CLASSES",
  homeClassesTitle: "專業課程",
  homeFeaturedClasses: [
    { title: "實戰原則", imageUrl: "/assets/1 首頁/課程1.png", link: "/classes/1" },
    { title: "KRAV MAGA", imageUrl: "/assets/1 首頁/課程2.png", link: "/classes/2" },
    { title: "戰術應用", imageUrl: "/assets/1 首頁/課程3.png", link: "/classes/3" },
  ],
  homeShopEyebrow: "SHOP",
  homeShopTitle: "裝備商城",
  homeShopCards: [
    { title: "戰術裝備", imageUrl: "/assets/1 首頁/戰術裝備.png", buttonText: "SHOP NOW", link: "#" },
    { title: "訓練裝備", imageUrl: "/assets/1 首頁/訓練裝備.png", buttonText: "SHOP NOW", link: "#" },
  ],
  homeNewsEyebrow: "NEWS",
  homeNewsTitle: "最新消息",
  aboutBannerEyebrow: "ABOUT US",
  aboutBannerTitle: "關於我們",
  aboutBannerImageUrl: "/assets/2 關於/關於banner.png",
  aboutBannerImageAlt: "About us banner",
  aboutCoachImageUrl: "/assets/2 關於/教練.png",
  aboutCoachImageAlt: "Coach",
  aboutIntroBlocks: [
    {
      title: "民間高端訓練體系",
      description:
        "以KRAV MAGA作為核心骨幹，融入軍警實戰原則，專注於應對真實暴力威脅。祈滕戰術提供一般民眾能夠掌握，且具備高度實用性的防護技巧。",
    },
    {
      title: "軍警專業合作定位",
      description:
        "作為外部協訓單位，為軍方與執法單位補足「非制式情境」及「近身肉搏（CQB）」等高危險戰術情境的技術缺口，提升單位整體作戰效能。",
    },
  ],
  aboutPrimaryButtonText: "了解課程規劃",
  aboutPrimaryButtonLink: "/classes",
  aboutPrinciples: [
    { title: "反應導向", description: "基於人體自然反應，縮短學習曲線", imageUrl: "/assets/2 關於/系統設計原則1.png" },
    { title: "高壓有效", description: "在心跳加速與腎上腺素激增下仍能操作", imageUrl: "/assets/2 關於/系統設計原則2.png" },
    { title: "實境模擬", description: "訓練情境設定於真實生活可能遇到的威脅", imageUrl: "/assets/2 關於/系統設計原則3.png" },
    { title: "法律相容", description: "動作選擇需符合防衛比例原則與法律框架", imageUrl: "/assets/2 關於/系統設計原則4.png" },
    { title: "持續進化", description: "隨威脅型態改變，不斷更新與優化技術", imageUrl: "/assets/2 關於/系統設計原則5.png" },
  ],
  aboutSystemEyebrow: "SYSTEM",
  aboutSystemTitle: "KRAV MAGA 戰術訓練系統",
  aboutSystemFeatures: [
    "高強度壓力抗性訓練",
    "戰術情境模擬",
    "CQB 近身肉搏",
    "器械防衛與奪取",
    "多對一威脅處理",
    "隨機應變能力",
  ],
  aboutSystemImageUrl: "/assets/2 關於/KRAV MAGA 戰術訓練系統.png",
  aboutSystemImageAlt: "戰術訓練系統圖表",
  aboutExchangeTitle: "國際交流",
  aboutExchangeImages: [
    { imageUrl: "/assets/2 關於/國際交流1.png", alt: "國際交流 1" },
    { imageUrl: "/assets/2 關於/國際交流2.png", alt: "國際交流 2" },
    { imageUrl: "/assets/2 關於/國際交流3.png", alt: "國際交流 3" },
    { imageUrl: "/assets/2 關於/國際交流4.png", alt: "國際交流 4" },
  ],
  aboutExchangeText:
    "祈滕戰術定期與各國頂尖訓練機構進行技術交流，由教練群親赴海外受訓，將國際最新型態的威脅處置技術與反恐經驗引進國內。",
  aboutFoundationTitle: "國際體系基礎",
  aboutFoundationImages: [
    { imageUrl: "/assets/2 關於/國際體系基礎1.png", alt: "體系基礎 1" },
    { imageUrl: "/assets/2 關於/國際體系基礎2.png", alt: "體系基礎 2" },
    { imageUrl: "/assets/2 關於/國際體系基礎3.png", alt: "體系基礎 3" },
    { imageUrl: "/assets/2 關於/國際體系基礎4.png", alt: "體系基礎 4" },
  ],
  aboutFoundationText:
    "我們的技術立基於國際最具公信力的 Krav Maga 總部，確保所傳授的每一項動作皆經過實戰驗證，符合當代最高的防衛標準。",
  aboutModelEyebrow: "MODEL",
  aboutModelTitle: "能力運作模型",
  aboutModelImageUrl: "/assets/2 關於/能力運作模型.png",
  aboutModelImageAlt: "能力運作模型",
  contactEyebrow: "CONTACT",
  contactTitle: "聯絡我們",
  contactImageUrl: "/assets/18 聯絡我們/contact photo.png",
  contactImageAlt: "Contact us",
  contactSuccessMessage: "表單已成功送出！我們會盡快與您聯絡。",
  contactCategories: ["課程報名/諮詢", "裝備購買/諮詢", "商業合作", "其他"],
  classesBannerEyebrow: "CLASSES",
  classesBannerTitle: "祈滕課程",
  classesBannerImageUrl: "/assets/3 課程列表/課程列表banner.png",
  classesBannerImageAlt: "Classes banner",
};

function asArray<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown, fallback: string | null = null) {
  return typeof value === "string" ? value : fallback;
}

export function normalizeSiteSettings(record: Record<string, unknown> | null | undefined): SiteSettingsPayload {
  if (!record) return DEFAULT_SITE_SETTINGS;

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...record,
    logoUrl: asNullableString(record.logoUrl, DEFAULT_SITE_SETTINGS.logoUrl),
    logoAlt: asString(record.logoAlt, DEFAULT_SITE_SETTINGS.logoAlt),
    supportAddress: asString(record.supportAddress, DEFAULT_SITE_SETTINGS.supportAddress),
    privacyPolicyUrl: asString(record.privacyPolicyUrl, DEFAULT_SITE_SETTINGS.privacyPolicyUrl),
    termsUrl: asString(record.termsUrl, DEFAULT_SITE_SETTINGS.termsUrl),
    facebookUrl: asString(record.facebookUrl, DEFAULT_SITE_SETTINGS.facebookUrl),
    instagramUrl: asString(record.instagramUrl, DEFAULT_SITE_SETTINGS.instagramUrl),
    youtubeUrl: asString(record.youtubeUrl, DEFAULT_SITE_SETTINGS.youtubeUrl),
    lineUrl: asString(record.lineUrl, DEFAULT_SITE_SETTINGS.lineUrl),
    headerLinks: asArray(record.headerLinks, DEFAULT_SITE_SETTINGS.headerLinks),
    footerSitemapLinks: asArray(record.footerSitemapLinks, DEFAULT_SITE_SETTINGS.footerSitemapLinks),
    footerSupportLinks: asArray(record.footerSupportLinks, DEFAULT_SITE_SETTINGS.footerSupportLinks),
    homeHeroImageUrl: asNullableString(record.homeHeroImageUrl, DEFAULT_SITE_SETTINGS.homeHeroImageUrl),
    homeHeroImageAlt: asString(record.homeHeroImageAlt, DEFAULT_SITE_SETTINGS.homeHeroImageAlt),
    homeAboutImageUrl: asNullableString(record.homeAboutImageUrl, DEFAULT_SITE_SETTINGS.homeAboutImageUrl),
    homeAboutImageAlt: asString(record.homeAboutImageAlt, DEFAULT_SITE_SETTINGS.homeAboutImageAlt),
    homeFeaturedClasses: asArray(record.homeFeaturedClasses, DEFAULT_SITE_SETTINGS.homeFeaturedClasses),
    homeShopCards: asArray(record.homeShopCards, DEFAULT_SITE_SETTINGS.homeShopCards),
    aboutBannerImageUrl: asNullableString(record.aboutBannerImageUrl, DEFAULT_SITE_SETTINGS.aboutBannerImageUrl),
    aboutBannerImageAlt: asString(record.aboutBannerImageAlt, DEFAULT_SITE_SETTINGS.aboutBannerImageAlt),
    aboutCoachImageUrl: asNullableString(record.aboutCoachImageUrl, DEFAULT_SITE_SETTINGS.aboutCoachImageUrl),
    aboutCoachImageAlt: asString(record.aboutCoachImageAlt, DEFAULT_SITE_SETTINGS.aboutCoachImageAlt),
    aboutIntroBlocks: asArray(record.aboutIntroBlocks, DEFAULT_SITE_SETTINGS.aboutIntroBlocks),
    aboutPrinciples: asArray(record.aboutPrinciples, DEFAULT_SITE_SETTINGS.aboutPrinciples),
    aboutSystemFeatures: asArray(record.aboutSystemFeatures, DEFAULT_SITE_SETTINGS.aboutSystemFeatures),
    aboutSystemImageUrl: asNullableString(record.aboutSystemImageUrl, DEFAULT_SITE_SETTINGS.aboutSystemImageUrl),
    aboutSystemImageAlt: asString(record.aboutSystemImageAlt, DEFAULT_SITE_SETTINGS.aboutSystemImageAlt),
    aboutExchangeImages: asArray(record.aboutExchangeImages, DEFAULT_SITE_SETTINGS.aboutExchangeImages),
    aboutFoundationImages: asArray(record.aboutFoundationImages, DEFAULT_SITE_SETTINGS.aboutFoundationImages),
    aboutModelImageUrl: asNullableString(record.aboutModelImageUrl, DEFAULT_SITE_SETTINGS.aboutModelImageUrl),
    aboutModelImageAlt: asString(record.aboutModelImageAlt, DEFAULT_SITE_SETTINGS.aboutModelImageAlt),
    contactImageUrl: asNullableString(record.contactImageUrl, DEFAULT_SITE_SETTINGS.contactImageUrl),
    contactImageAlt: asString(record.contactImageAlt, DEFAULT_SITE_SETTINGS.contactImageAlt),
    contactCategories: asArray(record.contactCategories, DEFAULT_SITE_SETTINGS.contactCategories),
    classesBannerImageUrl: asNullableString(record.classesBannerImageUrl, DEFAULT_SITE_SETTINGS.classesBannerImageUrl),
    classesBannerImageAlt: asString(record.classesBannerImageAlt, DEFAULT_SITE_SETTINGS.classesBannerImageAlt),
  };
}

export async function getSiteSettings() {
  const existing = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (existing) {
    return normalizeSiteSettings(existing as unknown as Record<string, unknown>);
  }

  const created = await prisma.siteSettings.create({
    data: {
      id: 1,
      ...DEFAULT_SITE_SETTINGS,
    },
  });

  return normalizeSiteSettings(created as unknown as Record<string, unknown>);
}