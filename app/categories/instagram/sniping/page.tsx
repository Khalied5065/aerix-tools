import Link from "next/link";

export default function TiktokSnipingPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            أدوات صيد  انستا
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">ابدأ مع أداة الصيد السريعة</h1>
          <p className="mt-4 text-lg text-zinc-400">
            هذه الصفحة تمثل نقطة الدخول إلى تجربة الصيد السريع مع واجهة مخصصة وسهلة الاستخدام.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-600/20 via-black/50 to-cyan-500/15 p-8 shadow-[0_0_60px_rgba(124,58,237,0.15)]">
          <h2 className="text-2xl font-semibold">أداة الصيد السريعة</h2>
          <p className="mt-3 text-base leading-8 text-zinc-300">
            انقر أدناه لفتح واجهة الصيد التفاعلية الفعلية التي تعرض النتائج المباشرة للمتاح والمباع.
          </p>

          <Link
            href="/tools/instagram"
            className="mt-8 inline-flex items-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >
            افتح الأداة الآن
          </Link>
        </div>
      </div>
    </main>
  );
}
