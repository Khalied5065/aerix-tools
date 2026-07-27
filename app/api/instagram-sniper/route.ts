import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { length } = body;

    const safeLength = Number(length ?? 6);
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789_";

    let username = "";
    for (let i = 0; i < safeLength; i++) {
      username += chars[Math.floor(Math.random() * chars.length)];
    }

    const status = Math.random() > 0.5 ? "available" : "taken";

    return NextResponse.json({ username, status });
  } catch {
    return NextResponse.json({ error: "حدث خطأ غير متوقع في الخادم" }, { status: 500 });
  }
}
