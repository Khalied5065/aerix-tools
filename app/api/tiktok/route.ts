import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { length } = await request.json();

    const chars = "abcdefghijklmnopqrstuvwxyz0123456789._";
    let username = "";
    for (let i = 0; i < length; i++) {
      username += chars[Math.floor(Math.random() * chars.length)];
    }

    const url = `https://www.tiktok.com/@${username}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      // Next.js fetch options لتجاوز التخزين المؤقت
      cache: 'no-store'
    });

    const html = await res.text();
    let status = "taken"; // مأخوذ

    if (html.includes(`"uniqueId":"${username}"`)) {
      status = "taken";
    } else if (
      html.includes("Couldn't find this account") ||
      html.includes("not found") ||
      res.status === 404
    ) {
      status = "available"; // متاح
    } else if (html.includes("captcha") || html.includes("verify")) {
      status = "reserved"; // محجوز أو حماية
    } else {
      // بناءً على رغبتك السابقة لو الكود 200 وما تبي لخبطة تيك توك، نقدر نعتبره متاح أو محجوز حسب رغبتك، هنا بنخليه يعتمد على الاستجابة الحقيقية
      status = res.status === 200 ? "available" : "taken";
    }

    return NextResponse.json({ username, status });
  } catch (error) {
    return NextResponse.json({ username: "error", status: "failed" });
  }
}