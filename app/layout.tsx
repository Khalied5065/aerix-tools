import type { Metadata } from "next";
import { Cairo } from "next/font/google";
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
      </body>
    </html>
  );
}
