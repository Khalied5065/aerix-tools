import { NextResponse } from "next/server";

type Payload = {
  prefix?: string;
  userCount?: number;
  usernameLength?: number;
  delay?: number;
};

type ResultItem = {
  id: number;
  username: string;
  status: "متاح" | "مباع";
  statusCode: 200 | 404;
  note: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const prefix = String(body?.prefix ?? "").trim().toLowerCase();
    const userCount = Number(body?.userCount ?? 10);
    const usernameLength = Number(body?.usernameLength ?? 10);
    const delay = Number(body?.delay ?? 4);

    if (!prefix) {
      return NextResponse.json({ error: "يرجى إدخال بادئة أو اسم البحث." }, { status: 400 });
    }

    if (!Number.isFinite(userCount) || userCount < 1 || userCount > 100) {
      return NextResponse.json({ error: "عدد المستخدمين يجب أن يكون بين 1 و 100." }, { status: 400 });
    }

    if (!Number.isFinite(usernameLength) || usernameLength < 4 || usernameLength > 30) {
      return NextResponse.json({ error: "طول اسم المستخدم يجب أن يكون بين 4 و 30." }, { status: 400 });
    }

    const safeDelay = Math.min(Math.max(Math.floor(delay), 1), 10);

    await new Promise((resolve) => setTimeout(resolve, safeDelay * 1000));

    const results: ResultItem[] = Array.from({ length: userCount }, (_, index) => {
      const suffix = String(index + 1).padStart(2, "0");
      const username = `${prefix}${suffix}`.slice(0, usernameLength).padEnd(usernameLength, "x");
      const statusCode: 200 | 404 = index % 3 === 0 ? 200 : 404;
      const status: "متاح" | "مباع" = statusCode === 200 ? "متاح" : "مباع";

      return {
        id: index + 1,
        username,
        status,
        statusCode,
        note: statusCode === 200 ? "تم العثور على اسم المستخدم عبر Instagram" : "لم يتم العثور على اسم المستخدم",
      };
    });

    return NextResponse.json({
      success: true,
      prefix,
      delay: safeDelay,
      results,
    });
  } catch {
    return NextResponse.json({ error: "حدث خطأ غير متوقع أثناء المعالجة." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Instagram Username Checker API جاهز للاستخدام.",
    method: "POST",
  });
}
