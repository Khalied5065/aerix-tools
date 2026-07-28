"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DiscordTokenPage() {
  const [userId, setUserId] = useState("");
  const [encodedPrefix, setEncodedPrefix] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;

    if (pathname === "/tools/discord-token") {
      const container = document.body;
      if (container) {
        scriptElement = document.createElement("script");
        scriptElement.dataset.zone = "11440984";
        scriptElement.src = "https://al5sm.com/tag.min.js";
        container.appendChild(scriptElement);
      }
    }

    // تنظيف السكربت وأي آثار إعلانية فور مغادرة الصفحة
    return () => {
      if (scriptElement) {
        scriptElement.remove();
      }
      document.querySelectorAll('iframe[src*="al5sm.com"], script[src*="al5sm.com"]').forEach((el) => el.remove());
    };
  }, [pathname]);

  const handleEncode = (id: string) => {
    setUserId(id);
    if (!id.trim()) {
      setEncodedPrefix("");
      return;
    }
    try {
      const encoded = btoa(id.trim());
      setEncodedPrefix(encoded);
    } catch (err) {
      setEncodedPrefix("خطأ في الصيغة");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Discord Token
          </p>
          <h1 className="text-3xl font-bold">استخراج التوكن من الآيدي</h1>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-black/40 p-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold">أدخل معرف الحساب (User ID)</label>
            <input
              type="text"
              placeholder="مثال: 1486798608274559136"
              value={userId}
              onChange={(e) => handleEncode(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-indigo-500"
              dir="ltr"
            />
          </div>

          {encodedPrefix && (
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 space-y-2">
              <p className="text-xs font-semibold text-indigo-300">الجزء الأول من التوكن (Base64):</p>
              <p className="font-mono text-base break-all text-white select-all bg-black/40 p-3 rounded-xl border border-white/5" dir="ltr">
                {encodedPrefix}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
