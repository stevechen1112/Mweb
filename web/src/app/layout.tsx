import type { Metadata } from "next";
import { genSekiGothic } from "./fonts";
import "./globals.css";
import { FrontLayout } from "@/components/FrontLayout";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const secondaryName = settings.siteNameEn.trim() || "QI-TENG";
  const title = `${settings.siteName} | ${secondaryName}`;
  const description = settings.footerDescription.trim() || "專業實戰原則、KRAV MAGA 與戰術訓練裝備平台";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${genSekiGothic.variable} h-full antialiased bg-black text-white`}
    >
      <body className="min-h-full flex flex-col font-genseki">
        <FrontLayout>{children}</FrontLayout>
      </body>
    </html>
  );
}

