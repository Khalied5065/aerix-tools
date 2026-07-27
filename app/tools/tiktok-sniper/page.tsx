"use client";

import { useState } from "react";

type ResultItem = {
  id: number;
  username: string;
  status: string;
};

export default function TiktokSniperPage() {
  const [count, setCount] = useState(10);
  const [length, setLength] = useState(5);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ResultItem[]>([]);
  
  const [stats, setStats] = useState({ available: 0, taken: 0, reserved: 0, failed: 0, checked: 0 });

  const startScan = async () => {
    setIsScanning(true);
    setResults([]);
    setStats({ available: 0, taken: 0, reserved: 0, failed: 0, checked: 0 });

    let checkedCount = 0;
    let av = 0, tk = 0, rs = 0, fd = 0;

    while (checkedCount < count) {
      try {
        const res = await fetch("/api/tiktok", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ length }),
        });

        const data = await res.json();
        checkedCount++;

        if (data.status === "available") av++;
        else if (data.status === "taken") tk++;
        else if (data.status === "reserved") rs++;
        else fd++;

        setStats({ available: av, taken: tk, reserved: rs, failed: fd, checked: checkedCount });

        const newItem: ResultItem = {
          id: checkedCount,
          username: data.username,
          status: data.status,
        };

        setResults((prev) => [newItem, ...prev]);
      } catch (err) {
        fd++;
      }

      // ديلاي بسيط بين الطلبات عشان ما يحظر IP السيرفر
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setIsScanning(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        
        {/* قسم التحكم */}
        <section className="w-full rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:w-[45%]">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            TikTok Scanner Bot Style
          </p>
          <h1 className="text-3xl font-bold">أداة فحص اليوزرات</h1>
          
          <div className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">عدد اليوزرات (الحد 20)</label>
                <input
                  type="number"
                  value={count}
                  max={20}
                  min={1}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">طول اليوزر (أقل شيء 4)</label>
                <input
                  type="number"
                  value={length}
                  min={4}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            {/* إحصائيات شبيهة بالـ Embed */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
              <div>
                <p className="text-xs text-zinc-400">تم الفحص</p>
                <p className="text-lg font-bold">{stats.checked}/{count}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-400">متاح</p>
                <p className="text-lg font-bold text-emerald-400">{stats.available}</p>
              </div>
              <div>
                <p className="text-xs text-rose-400">مأخوذ</p>
                <p className="text-lg font-bold text-rose-400">{stats.taken}</p>
              </div>
            </div>

            <button
              onClick={startScan}
              disabled={isScanning}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white transition disabled:opacity-50"
            >
              {isScanning ? `جاري الفحص... (${stats.checked}/${count})` : "بدء الفحص 🚀"}
            </button>
          </div>
        </section>

        {/* قسم النتائج الحية */}
        <section className="w-full rounded-[32px] border border-white/10 bg-black/40 p-8 lg:w-[55%]">
          <h2 className="text-2xl font-semibold mb-6">النتائج الحية</h2>
          <div className="h-[500px] space-y-3 overflow-y-auto pr-3">
            {results.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-2xl border px-4 py-4 ${
                  item.status === "available"
                    ? "border-emerald-400/30 bg-emerald-500/10"
                    : "border-rose-400/30 bg-rose-500/10"
                }`}
              >
                <div>
                  <p className="font-semibold text-white" dir="ltr">@{item.username}</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {item.status === "available" ? "متاح للتسجيل الفوري!" : "مستخدم مسبقاً"}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.status === "available" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                  {item.status === "available" ? "متاح" : "مأخوذ"}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}