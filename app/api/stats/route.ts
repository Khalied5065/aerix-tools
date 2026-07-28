import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data-stats.json");

// دالة لضمان وجود الملف وقراءته
function getStats() {
  try {
    if (!fs.existsSync(filePath)) {
      const initial = { totalVisits: 0, tokenToolUses: 0 };
      fs.writeFileSync(filePath, JSON.stringify(initial), "utf-8");
      return initial;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { totalVisits: 0, tokenToolUses: 0 };
  }
}

export async function GET() {
  const stats = getStats();
  return NextResponse.json(stats);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type } = body;
    const stats = getStats();

    if (type === "visit") {
      stats.totalVisits += 1;
    } else if (type === "token_use") {
      stats.tokenToolUses += 1;
    }

    fs.writeFileSync(filePath, JSON.stringify(stats, null, 2), "utf-8");
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update stats" }, { status: 500 });
  }
}2
