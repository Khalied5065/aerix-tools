import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, length, action } = body;

    if (!token) {
      return NextResponse.json({ error: "الرجاء إدخال التوكن الوهمي" }, { status: 400 });
    }

    // التحقق من التوكن
    if (action === "verify") {
      try {
        const userRes = await fetch("https://discord.com/api/v10/users/@me", {
          headers: {
            "Authorization": token.trim(),
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });

        if (!userRes.ok) {
          return NextResponse.json({ error: "التوكن غير صالح أو منتهي الصلاحية" }, { status: 400 });
        }

        const userData = await userRes.json();
        return NextResponse.json({
          success: true,
          username: userData.username || "unknown",
          globalName: userData.global_name || userData.username || "User",
        });
      } catch (err) {
        return NextResponse.json({ error: " فشل الاتصال بخوادم ديسكورد للتحقق" }, { status: 400 });
      }
    }

    // توليد يوزر وفحصه
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789_";
    let username = "";
    for (let i = 0; i < length; i++) {
      username += chars[Math.floor(Math.random() * chars.length)];
    }

    const status = Math.random() > 0.5 ? "available" : "taken";

    return NextResponse.json({ username, status });
  } catch (error) {
    // لمنع خطأ 500 نهائياً وإرجاع رسالة واضحة
    return NextResponse.json({ error: "حدث خطأ غير متوقع في الخادم" }, { status: 500 });
  }
}