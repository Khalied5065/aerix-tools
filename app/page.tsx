"use client";

import Link from "next/link";
import { useEffect } from "react";

const highlights = [
  {
    title: "أدوات صيد ذكية",
    text: "تابع المتاح والمباع بدقة عالية في لحظات قصيرة.",
  },
  {
    title: "واجهة عربية مريحة",
    text: "تصميم RTL أنيق يغطي احتياجات المستخدمين العرب بالكامل.",
  },
  {
    title: "سرعة ووضوح",
    text: "تجربة سلسة مع تنظيم واضح للصفحات والأدوات.",
  },
];

export default function HomePage() {
  // إرسال إشارة للـ API لتسجيل زيارة حقيقية فور فتح الصفحة الرئيسية
  useEffect(() => {
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit" }),
    }).catch(() => {});
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.25),_transparent_30%)]" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24 lg:px-8">
        <div className="max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_0_80px_rgba(124,58,237,0.18)] backdrop-blur-xl sm:p-12">
          <p className="mb-4 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200">
            Aerixweb • منصة أدوات برمجية متقدمة
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            مرحبا بك في عالم الأدوات الذكية والواجهة الفاخرة
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-300 sm:text-xl">
            استكشف أدوات تيك توك المتقدمة، وابدأ رحلتك نحو تجربة أسرع وأقوى مع تصميم عربي أنيق ومخصص للRTL.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              ابدأ رحلتك ⚡
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
