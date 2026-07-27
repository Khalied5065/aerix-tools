"use client";

import { useState } from "react";

type ResultItem = {
  id: number;
  username: string;
  status: string;
};

export default function DiscordSniperPage() {
  const [token, setToken] = useState("");
  const [count, setCount] = useState(10);
  const [length, setLength] = useState(6);
  const [isScanning, setIsScanning] = useState(false);
  
  const [accountInfo, setAccountInfo] = useState<{ username: string; globalName: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [stats, setStats] = useState({ available: 0, taken: 0, checked: 0 });

  const startScan = async () => {
    if (!token) {
      setErrorMessage("الرجاء إدخال توكن الحساب الوهمي أولاً!");
      return;
    }

    setIsScanning(true);
    setResults([]);
    setAccountInfo(null);
    setErrorMessage(null);
    setStats({ available: 0, taken: 0, checked: 0 });

    try {
      // الخطوة 1: التحقق من التوكن أولاً
      const verifyRes = await fetch("/api/discord-sniper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "verify" }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        setErrorMessage(verifyData.error || "التوكن غير صالح أو غير حقيقي");
        setIsScanning(false);
        return;
      }

      setAccountInfo({
        username: verifyData.username,
        globalName: verifyData.globalName,
      });

    } catch (err) {
      setErrorMessage("حدث خطأ أثناء الاتصال بالخادم");
      setIsScanning(false);
      return;
    }

    // الخطوة 2: البدء بعملية الفحص التلقائي
    let checkedCount = 0;
    let av = 0, tk = 0;

    while (checkedCount < count) {
      try {
        const res = await fetch("/api/discord-sniper", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, length, action: "scan" }),
        });

        const data = await res.json();
        
        if (data.username) {
          checkedCount++;
          if (data.status === "available") av++;
          else tk++;

          setStats({ available: av, taken: tk, checked: checkedCount });

          const newItem: ResultItem = {
            id: checkedCount,
            username: data.username,
            status: data.status,
          };

          setResults((prev) => [newItem, ...prev]);
        }
      } catch (err) {
        console.error("خطأ في الفحص");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setIsScanning(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        
        {/* قسم التحكم */}
        <section className="w-full rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:w-[45%]">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Discord Token Sniper
          </p>
          <h1 className="text-3xl font-bold">أداة فحص ديسكورد</h1>
          
          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold">(لا تضع حسابك الاساسي)توكن الحساب الوهمي</label>
              <input
                type="password"
                placeholder="ضع التوكن هنا..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* رسالة الخطأ المصممة بنمط ديسكورد (Discord Embed Error Style) */}
            {errorMessage && (
              <div className="flex items-start gap-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white font-bold text-sm">✕</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-400">خطأ في المصادقة (Discord API)</p>
                  <p className="mt-1 text-sm text-rose-200">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* عرض رسالة تسجيل الدخول بنجاح مع علامة الصح */}
            {accountInfo && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-black font-bold">✓</span>
                <div>
                  <p className="text-xs text-emerald-300">تم التسجيل بالتوكن بنجاح</p>
                  <p className="font-semibold text-white" dir="ltr">@{accountInfo.username} ({accountInfo.globalName})</p>
                </div>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">عدد اليوزرات</label>
                <input
                  type="number"
                  value={count}
                  min={1}
                  max={50}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">طول اليوزر</label>
                <input
                  type="number"
                  value={length}
                  min={2}
                  max={32}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            {/* إحصائيات */}
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
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 px-5 py-3 font-semibold text-white transition disabled:opacity-50"
            >
              {isScanning ? `جاري العمل... (${stats.checked}/${count})` : "بدء الفحص 🚀"}
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