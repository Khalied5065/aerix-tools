import Link from "next/link";

const categories = [
  {
    title: "تيك توك",
    description: "أدوات الصيد والعمليات السريعة مع واجهة احترافية.",
    href: "/categories/tiktok",
    accent: "from-violet-600 to-fuchsia-500",
  },
  {
    title: "ديسكورد",
    description: "أدوات الصيد والرسائل مع واجهة احترافية ومناسبة للـ RTL.",
    href: "/categories/discord",
    accent: "from-cyan-500 to-blue-600",
  },
    {
    title: "انستا",
    description: "أدوات الصيد والرسائل مع واجهة احترافية ومناسبة للـ RTL.",
    href: "/categories/instagram",
    accent: "from-cyan-500 to-blue-600",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            التصنيفات الرئيسية
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">اختر الفئة المناسبة لرحلتك</h1>
          <p className="mt-4 text-lg text-zinc-400">
            تصفح أقسام الأدوات بوضوح وسهولة، مع واجهة عملية ومناسبة للـ RTL.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[28px] border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className={`h-2 w-24 rounded-full bg-gradient-to-r ${item.accent}`} />
              <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-base leading-8 text-zinc-400">{item.description}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-200">
                افتح القسم ←
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
