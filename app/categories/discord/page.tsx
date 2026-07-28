import Link from "next/link";

const options = [
  {
    title: "أدوات الصيد",
    description: "ابحث عن العناصر المتاحة بسرعة وراقب التغيرات اللحظية.",
    href: "/categories/discord/sniping",
  },
  {
    title: "اداه سحب التوكن",
    description: "ابحث عن العناصر المتاحة بسرعة وراقب التغيرات اللحظية.",
    href: "/categories/discord/token",
  }
];

export default function TiktokCategoryPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            ديسكورد 
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">اختر نوع الأداة المناسبة لك</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {options.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[24px] border border-white/10 bg-white/5 p-8 transition hover:border-violet-400/40 hover:bg-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-base leading-8 text-zinc-400">{item.description}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-violet-300">الانتقال إلى الصفحة</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

