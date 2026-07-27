import Link from "next/link";

const options = [
  {
    title: "أدوات الصيد",
    description: "ابدأ مع أداة صيد يوزرات الإنستغرام مباشرةً من هنا.",
    href: "/categories/instagram/sniping",
  },
  
];

export default function InstagramCategoryPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">
            إنستغرام
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">اختر الأداة المناسبة لك</h1>
          <p className="mt-4 text-lg text-zinc-400">
            هذه الصفحة تمثل نقطة دخول إلى أدوات الإنستغرام، ويمكنك إضافة المزيد لاحقًا بنفس الطريقة.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {options.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[24px] border border-white/10 bg-white/5 p-8 transition hover:border-pink-400/40 hover:bg-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-base leading-8 text-zinc-400">{item.description}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-pink-300">الانتقال إلى الصفحة</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
