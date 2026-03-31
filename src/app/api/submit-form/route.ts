import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { getGoogleServiceAccountCredentials, stripEnvQuotes } from "@/lib/server-env";
import { sendWhatsApp } from "@/lib/fonnte";
import { buildLeadNotification } from "@/lib/formatWAMessage";

const PAKET_PRICES: Record<string, string> = {
  xdeal: "Rp 750.000",
  xquick: "Rp 1.500.000",
  xpress: "Rp 3.000.000",
  xpriority: "Rp 5.000.000",
};

async function appendToSheet(data: Record<string, string>) {
  const { clientEmail, privateKey } = getGoogleServiceAccountCredentials();

  const serviceAccountAuth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheetId = stripEnvQuotes(process.env.GOOGLE_SHEET_ID);
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID belum diset");

  const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow({
    Timestamp: new Date().toISOString(),
    Nama: data.nama,
    WhatsApp: data.whatsapp,
    "Nama Usaha": data.namaUsaha,
    "Jenis Usaha": data.jenisUsaha,
    Deskripsi: data.deskripsi,
    "Produk & Harga": data.produk,
    Keunggulan: data.keunggulan,
    "Foto 1": data.fotoProduk1,
    "Foto 2": data.fotoProduk2,
    "Foto 3": data.fotoProduk3,
    "Logo URL": data.logoUrl,
    "Warna Mood": data.warnaMood,
    Tagline: data.tagline,
    "Referensi URL": data.referensiUrl,
    Catatan: data.catatan,
    Paket: data.paket,
    "Harga Paket": PAKET_PRICES[data.paket] ?? "",
  });
}

async function sendWANotif(data: Record<string, string>) {
  const to = process.env.RAFAEL_WA_NUMBER?.trim();
  if (!to) {
    console.warn("[submit-form] RAFAEL_WA_NUMBER belum diset, skip WA notif");
    return;
  }

  const message = buildLeadNotification({
    nama: data.nama,
    whatsapp: data.whatsapp,
    namaUsaha: data.namaUsaha,
    jenisUsaha: data.jenisUsaha,
    paket: data.paket,
    warnaMood: data.warnaMood,
  });

  const result = await sendWhatsApp({ to, message });
  if (!result.success) {
    console.warn("[submit-form] WA notification gagal:", result.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["nama", "whatsapp", "namaUsaha", "jenisUsaha", "deskripsi", "keunggulan", "paket"];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ success: false, error: `Field ${field} wajib diisi` }, { status: 400 });
      }
    }

    const data = {
      nama: body.nama,
      whatsapp: body.whatsapp,
      namaUsaha: body.namaUsaha,
      jenisUsaha: body.jenisUsaha,
      deskripsi: body.deskripsi,
      produk: (body.produk ?? "").toString() || "(tidak diisi)",
      keunggulan: body.keunggulan,
      fotoProduk1: (body.fotoProduk1 ?? "").toString(),
      fotoProduk2: (body.fotoProduk2 ?? "").toString(),
      fotoProduk3: (body.fotoProduk3 ?? "").toString(),
      logoUrl: (body.logoUrl ?? "").toString(),
      warnaMood: body.warnaMood ?? "",
      tagline: body.tagline ?? "",
      referensiUrl: body.referensiUrl ?? "",
      catatan: body.catatan ?? "",
      paket: body.paket,
    };

    await appendToSheet(data);
    await sendWANotif(data);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[submit-form]", err);
    const msg = err instanceof Error ? err.message : "";
    if (
      msg.includes("DECODER") ||
      msg.includes("OSSL") ||
      msg.includes("unsupported") ||
      msg.includes("OpenSSL") ||
      msg.includes("PRIVATE KEY")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Kunci Google tidak valid. Cara paling aman: di .env set GOOGLE_SERVICE_ACCOUNT_B64 = isi file JSON (base64 satu baris). Terminal: base64 -i credentials.json | tr -d '\\n'. Hapus GOOGLE_PRIVATE_KEY lama jika pakai B64.",
        },
        { status: 500 }
      );
    }
    if (msg.includes("GOOGLE_")) {
      return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
