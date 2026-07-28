"use client";

import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalVisits: 0, tokenToolUses: 0 });
  const [loading, setLoading] = useState(true);

  // دالة لجلب الإحصائيات الحقيقية من السيرفر
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // جلب البيانات أول ما تفتح الصفحة
    fetchStats();

    // تحديث تلقائي كل 3 ثواني عشان تشوف الأرقام تتحدث حية قدامك
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        
        <div className="flex flex-col justify-between gap-4 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
              Aerix Real Analytics
            </p>
            <h1 className="mt-1 text-3xl font-bold">لوحة التحكم الحقيقية</h1>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-zinc-300">متصل بقاعدة البيانات الحية</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          <div className="rounded-[28px] border border-white/10 bg-black/40 p-6 space-y-2">
            <p className="text-sm text-zinc-400">إجمالي زيارات الموقع</p>
            <p className="text-3xl font-bold text-white">
              {loading ? "..." : stats.totalVisits.toLocaleString()}
            </p>
            <p className="text-xs text-emerald-400">حقيقي ومباشر</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/40 p-6 space-y-2">
            <p className="text-sm text-zinc-400">استخدام أداة التوكن</p>
            <p className="text-3xl font-bold text-indigo-400">
              {loading ? "..." : stats.tokenToolUses.toLocaleString()}
            </p>
            <p className="text-xs text-indigo-300">عدد عمليات التحويل</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/40 p-6 space-y-2">
            <p className="text-sm text-zinc-400">حالة السيرفر</p>
            <p className="text-3xl font-bold text-emerald-400">يعمل</p>
            <p className="text-xs text-zinc-400">تخزين ملفات محلي نشط</p>
          </div>

        </div>

      </div>
    </main>
  );
}
