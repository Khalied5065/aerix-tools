import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script"; // 1. استيراد مكون السكريبت
import type { ReactNode } from "react";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Aerixweb | منصة أدوات برمجية",
  description: "منصة عربية متقدمة لأدوات تيك توك والبرمجيات",
  icons: {
    icon: "/vercal.png",
  },
  other: {
    "monetag": "a95930fa755c9d862d0762e3eba2f94a",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans min-h-screen bg-[#050505] text-white antialiased`}>
        {children}

        {/* 2. إضافة كود إعلان Monetag باستخدام Script */}
        <Script
          id="monetag-multitag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11432428',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
      </body>
    </html>
  );
}
