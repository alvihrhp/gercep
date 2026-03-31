import { NextResponse } from "next/server";
import { sendWhatsApp } from "@/lib/fonnte";

export async function GET() {
  const to = process.env.RAFAEL_WA_NUMBER?.trim();

  if (!to) {
    return NextResponse.json(
      { success: false, message: "RAFAEL_WA_NUMBER belum diset di .env" },
      { status: 500 }
    );
  }

  const result = await sendWhatsApp({
    to,
    message: "✅ Test notifikasi Gercep berhasil! Fonnte connected.",
  });

  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}
